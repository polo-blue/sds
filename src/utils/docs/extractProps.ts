import type * as TS from 'typescript';
import type { parse as ParseSfc } from '@vue/compiler-sfc';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
  deprecated?: boolean;
}

export interface ExtractResult {
  props: PropDefinition[];
  warnings: string[];
}

/**
 * Extract the prop reference of an Astro or Vue component from its source text.
 *
 * Supports Astro `interface Props` (defaults from the `Astro.props` destructuring),
 * Vue `defineProps<T>()` with a local interface/type alias (defaults from `withDefaults`),
 * and Vue runtime-object `defineProps({ ... })`. JSDoc above a prop becomes its
 * description; `@default` overrides a default read from code; `@internal` hides it.
 */
export async function extractProps(source: string, fileName: string): Promise<ExtractResult> {
  await loadParsers();
  const isAstro = fileName.endsWith('.astro');
  const script = isAstro ? astroFrontmatter(source) : parseSfc(source).descriptor.scriptSetup?.content;
  if (!script) return { props: [], warnings: [] };

  const warnings: string[] = [];
  const sf = ts.createSourceFile(fileName + '.ts', script, ts.ScriptTarget.Latest, true);
  const props = isAstro ? fromAstro(sf, warnings) : fromVue(sf, warnings);
  return { props, warnings: warnings.map(w => `${fileName}: ${w}`) };
}

let ts: typeof TS;
let parseSfc: typeof ParseSfc;

/**
 * Both parsers are devDependencies used only by the docs build. They are imported through
 * non-literal specifiers so a consumer's bundler never tries to resolve them when this module
 * is reachable (via `PropsTable.astro`) but never runs.
 */
async function loadParsers(): Promise<void> {
  if (ts) return;
  const [typescriptName, sfcName] = ['typescript', '@vue/compiler-sfc'];
  const [tsModule, sfcModule] = await Promise.all([
    import(/* @vite-ignore */ typescriptName),
    import(/* @vite-ignore */ sfcName),
  ]);
  ts = tsModule.default ?? tsModule;
  parseSfc = sfcModule.parse ?? sfcModule.default.parse;
}

/** Normalize a `source` path (relative to `src/components/`), dropping a leading `./` or `/`. */
export function normalizeSource(source: string): string {
  return source.replace(/^\.?\//, '');
}

/**
 * Look up a component's raw source in a lazy `import.meta.glob` map, keyed by
 * `/src/components/...` paths. `source` is relative to `src/components/`.
 */
export async function loadComponentSource(
  files: Record<string, () => Promise<string>>,
  source: string
): Promise<string> {
  const load = files['/src/components/' + normalizeSource(source)];
  if (!load) throw new Error(`PropsTable: no component at src/components/${source}`);
  return load();
}

/** Hand-written rows override extracted rows by `name`; rows with no extracted match are appended. */
export function mergeProps(extracted: PropDefinition[], overrides: PropDefinition[]): PropDefinition[] {
  const byName = new Map(overrides.map(row => [row.name, row]));
  const merged = extracted.map(prop => ({ ...prop, ...byName.get(prop.name) }));
  const names = new Set(extracted.map(prop => prop.name));
  return merged.concat(overrides.filter(row => !names.has(row.name)));
}

function astroFrontmatter(source: string): string | undefined {
  return /^\s*---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1];
}

/** Initializers and expression statements at the top level of the script — where props are declared. */
function topLevelExpressions(sf: TS.SourceFile): TS.Expression[] {
  return sf.statements.flatMap(s => {
    if (ts.isExpressionStatement(s)) return [s.expression];
    if (ts.isVariableStatement(s))
      return s.declarationList.declarations.flatMap(d => (d.initializer ? [d.initializer] : []));
    return [];
  });
}

function fromAstro(sf: TS.SourceFile, warnings: string[]): PropDefinition[] {
  const decl = findTypeDeclaration(sf, 'Props');
  if (!decl) {
    if (sf.text.includes('Astro.props'))
      warnings.push('no local `Props` type; imported or untyped props are not listed');
    return [];
  }
  const defaults = new Map<string, string>();
  for (const s of sf.statements) {
    if (!ts.isVariableStatement(s)) continue;
    for (const d of s.declarationList.declarations) {
      if (!ts.isObjectBindingPattern(d.name) || d.initializer?.getText(sf) !== 'Astro.props') continue;
      for (const el of d.name.elements) {
        if (el.initializer)
          defaults.set((el.propertyName ?? el.name).getText(sf), el.initializer.getText(sf));
      }
    }
  }
  return fromTypeDeclaration(sf, decl, name => defaults.get(name), warnings);
}

function fromVue(sf: TS.SourceFile, warnings: string[]): PropDefinition[] {
  let call: TS.CallExpression | undefined;
  let defaultsArg: TS.Expression | undefined;
  for (const expr of topLevelExpressions(sf)) {
    if (!ts.isCallExpression(expr)) continue;
    const callee = expr.expression.getText(sf);
    const [first, second] = expr.arguments;
    if (callee === 'withDefaults' && first && ts.isCallExpression(first)) {
      [call, defaultsArg] = [first, second];
      break;
    }
    if (callee === 'defineProps') {
      call = expr;
      break;
    }
  }
  if (!call) return [];

  const typeArg = call.typeArguments?.[0];
  if (!typeArg) {
    const arg = call.arguments[0];
    return arg && ts.isObjectLiteralExpression(arg) ? fromRuntimeObject(sf, arg) : [];
  }

  const defaultNodes = new Map<string, TS.Expression>();
  if (defaultsArg && ts.isObjectLiteralExpression(defaultsArg)) {
    for (const p of defaultsArg.properties) {
      if (ts.isPropertyAssignment(p)) defaultNodes.set(propName(p.name, sf), p.initializer);
    }
  }
  // withDefaults wraps object/array defaults in factories (but a function-typed prop's default is the
  // function itself); a boolean prop with no default is cast to `false` by Vue.
  const defaults: DefaultLookup = (name, type) => {
    const node = defaultNodes.get(name);
    if (!node) return type === 'boolean' ? 'false' : undefined;
    return type.includes('=>') ? node.getText(sf) : factoryValue(node, sf);
  };
  if (ts.isTypeLiteralNode(typeArg)) return fromMembers(sf, typeArg.members, defaults);
  const decl = findTypeDeclaration(sf, typeArg.getText(sf));
  if (decl) return fromTypeDeclaration(sf, decl, defaults, warnings);
  warnings.push(`props type \`${typeArg.getText(sf)}\` is not declared in this file`);
  return [];
}

type TypeDeclaration = TS.InterfaceDeclaration | TS.TypeAliasDeclaration;

/** Default value for a prop, given its name and declared type. */
type DefaultLookup = (name: string, type: string) => string | undefined;

function findTypeDeclaration(sf: TS.SourceFile, name: string): TypeDeclaration | undefined {
  return sf.statements.find(
    (s): s is TypeDeclaration =>
      (ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s)) && s.name.text === name
  );
}

function fromTypeDeclaration(
  sf: TS.SourceFile,
  decl: TypeDeclaration,
  defaults: DefaultLookup,
  warnings: string[]
): PropDefinition[] {
  if (ts.isInterfaceDeclaration(decl)) {
    for (const clause of decl.heritageClauses ?? []) {
      warnings.push(`\`${clause.getText(sf)}\` is not resolved; only members declared here are listed`);
    }
    return fromMembers(sf, decl.members, defaults);
  }
  if (ts.isTypeLiteralNode(decl.type)) return fromMembers(sf, decl.type.members, defaults);
  warnings.push(`\`${decl.name.text}\` is not an object type literal`);
  return [];
}

function fromMembers(
  sf: TS.SourceFile,
  members: TS.NodeArray<TS.TypeElement>,
  defaults: DefaultLookup
): PropDefinition[] {
  const props: PropDefinition[] = [];
  for (const member of members) {
    // Index signatures (`[key: string]: any`) and methods are not props.
    if (!ts.isPropertySignature(member)) continue;
    const name = propName(member.name, sf);
    const type = member.type ? normalizeType(member.type.getText(sf)) : 'unknown';
    const prop = withDoc(member, {
      name,
      type,
      required: !member.questionToken,
      default: defaults(name, type),
      description: '',
    });
    if (prop) props.push(prop);
  }
  return props;
}

const CONSTRUCTOR_TYPES: Record<string, string> = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Array: 'array',
  Object: 'object',
  Function: 'function',
  Date: 'Date',
};

function fromRuntimeObject(sf: TS.SourceFile, obj: TS.ObjectLiteralExpression): PropDefinition[] {
  const props: PropDefinition[] = [];
  for (const p of obj.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    const prop: PropDefinition = {
      name: propName(p.name, sf),
      type: 'unknown',
      required: false,
      description: '',
    };

    if (ts.isObjectLiteralExpression(p.initializer)) {
      for (const opt of p.initializer.properties) {
        if (!ts.isPropertyAssignment(opt) && !ts.isMethodDeclaration(opt)) continue;
        const key = propName(opt.name, sf);
        const value = ts.isMethodDeclaration(opt) ? opt : opt.initializer;
        if (key === 'default') prop.default = factoryValue(value, sf);
        else if (ts.isMethodDeclaration(value)) continue;
        else if (key === 'type') prop.type = runtimeType(value, sf);
        else if (key === 'required') prop.required = value.kind === ts.SyntaxKind.TrueKeyword;
      }
    } else {
      // Shorthand: `name: String` or `name: [String, Number]`.
      prop.type = runtimeType(p.initializer, sf);
    }
    if (prop.type === 'boolean' && prop.default === undefined) prop.default = 'false';

    const documented = withDoc(p, prop);
    if (documented) props.push(documented);
  }
  return props;
}

// Object/array defaults are factories in Vue; show the value they return, not the function.
function factoryValue(node: TS.Node, sf: TS.SourceFile): string {
  const body =
    ts.isMethodDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)
      ? node.body
      : undefined;
  if (!body) return node.getText(sf);
  if (!ts.isBlock(body)) return stripParens(body).getText(sf);
  if (body.statements.length === 1) {
    const [statement] = body.statements;
    if (ts.isReturnStatement(statement) && statement.expression) return statement.expression.getText(sf);
  }
  return node.getText(sf);
}

function stripParens(expr: TS.Expression): TS.Expression {
  return ts.isParenthesizedExpression(expr) ? stripParens(expr.expression) : expr;
}

function runtimeType(expr: TS.Expression, sf: TS.SourceFile): string {
  // `type: Array as PropType<Item[]>` — the PropType argument is the precise type.
  if (ts.isAsExpression(expr)) {
    const t = expr.type;
    if (ts.isTypeReferenceNode(t) && t.typeName.getText(sf) === 'PropType' && t.typeArguments?.[0]) {
      return normalizeType(t.typeArguments[0].getText(sf));
    }
    return runtimeType(expr.expression, sf);
  }
  if (ts.isArrayLiteralExpression(expr)) return expr.elements.map(e => runtimeType(e, sf)).join(' | ');
  const text = expr.getText(sf);
  return CONSTRUCTOR_TYPES[text] ?? text;
}

/** Apply the node's JSDoc to a prop: description, `@default` override, `@deprecated`; `@internal` drops it. */
function withDoc(node: TS.Node, prop: PropDefinition): PropDefinition | undefined {
  const doc = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc).at(-1);
  if (!doc) return prop;

  prop.description = commentText(doc.comment);
  for (const tag of doc.tags ?? []) {
    const tagName = tag.tagName.text;
    if (tagName === 'internal') return undefined;
    if (tagName === 'deprecated') prop.deprecated = true;
    else if (tagName === 'default') prop.default = commentText(tag.comment) || prop.default;
  }
  return prop;
}

function commentText(comment: string | TS.NodeArray<TS.JSDocComment> | undefined): string {
  if (!comment) return '';
  const text = typeof comment === 'string' ? comment : comment.map(c => c.text).join('');
  return text.replace(/\s+/g, ' ').trim();
}

function propName(name: TS.PropertyName, sf: TS.SourceFile): string {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return name.getText(sf);
}

function normalizeType(type: string): string {
  return type.replace(/\s+/g, ' ').replace(/^\| /, '').trim();
}
