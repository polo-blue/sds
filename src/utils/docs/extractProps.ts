import ts from 'typescript';

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
export function extractProps(source: string, fileName: string): ExtractResult {
  const warnings: string[] = [];
  const script = fileName.endsWith('.astro') ? astroFrontmatter(source) : vueScript(source);
  if (script === null) return { props: [], warnings };

  const sf = ts.createSourceFile(fileName + '.ts', script, ts.ScriptTarget.Latest, true);
  const props = fileName.endsWith('.astro')
    ? fromAstro(sf, warnings, fileName)
    : fromVue(sf, warnings, fileName);
  return { props, warnings };
}

function astroFrontmatter(source: string): string | null {
  const match = /^\s*---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  return match ? match[1] : null;
}

function vueScript(source: string): string | null {
  const match = /<script\b[^>]*\bsetup\b[^>]*>([\s\S]*?)<\/script>/.exec(source);
  return match ? match[1] : null;
}

function fromAstro(sf: ts.SourceFile, warnings: string[], fileName: string): PropDefinition[] {
  const decl = findTypeDeclaration(sf, 'Props');
  if (!decl) return [];
  const defaults = new Map<string, string>();
  visit(sf, node => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isObjectBindingPattern(node.name) &&
      node.initializer &&
      node.initializer.getText(sf) === 'Astro.props'
    ) {
      for (const el of node.name.elements) {
        if (!el.initializer) continue;
        const key = el.propertyName ?? el.name;
        defaults.set(key.getText(sf), el.initializer.getText(sf));
      }
    }
  });
  return fromTypeDeclaration(sf, decl, defaults, warnings, fileName);
}

function fromVue(sf: ts.SourceFile, warnings: string[], fileName: string): PropDefinition[] {
  let call: ts.CallExpression | undefined;
  let defaultsArg: ts.Expression | undefined;
  visit(sf, node => {
    if (call || !ts.isCallExpression(node)) return;
    const callee = node.expression.getText(sf);
    if (callee === 'withDefaults' && node.arguments[0] && ts.isCallExpression(node.arguments[0])) {
      call = node.arguments[0];
      defaultsArg = node.arguments[1];
    } else if (callee === 'defineProps') {
      call = node;
    }
  });
  if (!call) return [];

  const typeArg = call.typeArguments?.[0];
  if (typeArg) {
    const defaults = new Map<string, string>();
    if (defaultsArg && ts.isObjectLiteralExpression(defaultsArg)) {
      for (const p of defaultsArg.properties) {
        if (ts.isPropertyAssignment(p)) defaults.set(propName(p.name, sf), p.initializer.getText(sf));
      }
    }
    if (ts.isTypeLiteralNode(typeArg)) return fromMembers(sf, typeArg.members, defaults);
    const decl = findTypeDeclaration(sf, typeArg.getText(sf));
    if (!decl) {
      warnings.push(`${fileName}: props type \`${typeArg.getText(sf)}\` is not declared in this file`);
      return [];
    }
    return fromTypeDeclaration(sf, decl, defaults, warnings, fileName);
  }

  const arg = call.arguments[0];
  if (arg && ts.isObjectLiteralExpression(arg)) return fromRuntimeObject(sf, arg);
  return [];
}

type TypeDeclaration = ts.InterfaceDeclaration | ts.TypeAliasDeclaration;

function findTypeDeclaration(sf: ts.SourceFile, name: string): TypeDeclaration | undefined {
  return sf.statements.find(
    (s): s is TypeDeclaration =>
      (ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s)) && s.name.text === name
  );
}

function fromTypeDeclaration(
  sf: ts.SourceFile,
  decl: TypeDeclaration,
  defaults: Map<string, string>,
  warnings: string[],
  fileName: string
): PropDefinition[] {
  if (ts.isInterfaceDeclaration(decl)) {
    for (const clause of decl.heritageClauses ?? []) {
      warnings.push(
        `${fileName}: \`${clause.getText(sf)}\` is not resolved; only members declared here are listed`
      );
    }
    return fromMembers(sf, decl.members, defaults);
  }
  if (ts.isTypeLiteralNode(decl.type)) return fromMembers(sf, decl.type.members, defaults);
  warnings.push(`${fileName}: \`${decl.name.text}\` is not an object type literal`);
  return [];
}

function fromMembers(
  sf: ts.SourceFile,
  members: ts.NodeArray<ts.TypeElement>,
  defaults: Map<string, string>
): PropDefinition[] {
  const props: PropDefinition[] = [];
  for (const member of members) {
    // Index signatures (`[key: string]: any`) and methods are not props.
    if (!ts.isPropertySignature(member)) continue;
    const name = propName(member.name, sf);
    const doc = readJsDoc(member);
    if (doc.internal) continue;
    props.push({
      name,
      type: member.type ? normalizeType(member.type.getText(sf)) : 'unknown',
      required: !member.questionToken,
      default: doc.default ?? defaults.get(name),
      description: doc.description,
      deprecated: doc.deprecated || undefined,
    });
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

function fromRuntimeObject(sf: ts.SourceFile, obj: ts.ObjectLiteralExpression): PropDefinition[] {
  const props: PropDefinition[] = [];
  for (const p of obj.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    const name = propName(p.name, sf);
    const doc = readJsDoc(p);
    if (doc.internal) continue;
    const prop: PropDefinition = { name, type: 'unknown', required: false, description: doc.description };

    if (ts.isObjectLiteralExpression(p.initializer)) {
      for (const opt of p.initializer.properties) {
        if (!ts.isPropertyAssignment(opt) && !ts.isMethodDeclaration(opt)) continue;
        const key = propName(opt.name, sf);
        if (ts.isMethodDeclaration(opt)) {
          if (key === 'default') prop.default = factoryValue(opt, sf);
          continue;
        }
        if (key === 'type') prop.type = runtimeType(opt.initializer, sf);
        else if (key === 'required') prop.required = opt.initializer.kind === ts.SyntaxKind.TrueKeyword;
        else if (key === 'default') prop.default = factoryValue(opt.initializer, sf);
      }
    } else {
      // Shorthand: `name: String` or `name: [String, Number]`.
      prop.type = runtimeType(p.initializer, sf);
    }

    if (doc.default !== undefined) prop.default = doc.default;
    if (doc.deprecated) prop.deprecated = true;
    props.push(prop);
  }
  return props;
}

// Object/array defaults are factories in Vue; show the value they return, not the function.
function factoryValue(node: ts.Node, sf: ts.SourceFile): string {
  if (ts.isArrowFunction(node) && !ts.isBlock(node.body)) return unwrapParens(node.body).getText(sf);
  const body =
    ts.isMethodDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)
      ? node.body
      : undefined;
  if (body && ts.isBlock(body) && body.statements.length === 1) {
    const [statement] = body.statements;
    if (ts.isReturnStatement(statement) && statement.expression) return statement.expression.getText(sf);
  }
  return node.getText(sf);
}

function unwrapParens(expr: ts.Expression): ts.Expression {
  return ts.isParenthesizedExpression(expr) ? unwrapParens(expr.expression) : expr;
}

function runtimeType(expr: ts.Expression, sf: ts.SourceFile): string {
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

interface JsDocInfo {
  description: string;
  default?: string;
  deprecated: boolean;
  internal: boolean;
}

function readJsDoc(node: ts.Node): JsDocInfo {
  const info: JsDocInfo = { description: '', deprecated: false, internal: false };
  const doc = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc).at(-1);
  if (!doc) return info;

  info.description = commentText(doc.comment);
  for (const tag of doc.tags ?? []) {
    const tagName = tag.tagName.text;
    if (tagName === 'default') info.default = commentText(tag.comment) || undefined;
    else if (tagName === 'deprecated') info.deprecated = true;
    else if (tagName === 'internal') info.internal = true;
  }
  return info;
}

function commentText(comment: string | ts.NodeArray<ts.JSDocComment> | undefined): string {
  if (!comment) return '';
  const text = typeof comment === 'string' ? comment : comment.map(c => c.text).join('');
  return text.replace(/\s+/g, ' ').trim();
}

function propName(name: ts.PropertyName, sf: ts.SourceFile): string {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return name.getText(sf);
}

function normalizeType(type: string): string {
  return type.replace(/\s+/g, ' ').replace(/^\| /, '').trim();
}

/**
 * Look up a component's raw source in a lazy `import.meta.glob` map, keyed by
 * `/src/components/...` paths. `source` is relative to `src/components/`.
 */
export async function loadComponentSource(
  files: Record<string, () => Promise<string>>,
  source: string
): Promise<string> {
  const key = '/src/components/' + source.replace(/^\.?\//, '');
  const load = files[key];
  if (!load) throw new Error(`PropsTable: no component at src/components/${source}`);
  return load();
}

function visit(node: ts.Node, fn: (node: ts.Node) => void): void {
  fn(node);
  ts.forEachChild(node, child => visit(child, fn));
}
