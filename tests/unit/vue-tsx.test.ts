import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import ts from 'typescript';

/**
 * `astro check` types every .vue file through the TSX that @astrojs/vue's editor integration
 * generates for it (patched in `patches/@astrojs__vue.patch`). When that TSX breaks, the
 * component loses its default export (an error in index.ts) or, worse, silently falls back to
 * untyped props, so callers' prop errors are no longer reported. Check the TSX directly.
 */
const require = createRequire(import.meta.url);
const { toTSX } = require('@astrojs/vue/editor') as { toTSX: (code: string, className: string) => string };

const UNTYPED_FALLBACK = 'PropsWithHTMLAttributes<Record<string, any>>';

const components = readdirSync('src', { recursive: true, encoding: 'utf8' })
  .filter(file => file.endsWith('.vue'))
  .map(file => join('src', file))
  .filter(file => /\bdefineProps\b/.test(readFileSync(file, 'utf8')));

function hasDefaultExport(sourceFile: ts.SourceFile): boolean {
  return sourceFile.statements.some(
    statement =>
      ts.isExportAssignment(statement) ||
      (ts.canHaveModifiers(statement) &&
        (ts.getModifiers(statement) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword))
  );
}

test('found the Vue components that declare props', () => {
  assert.ok(components.length > 20, `only ${components.length} components with defineProps found`);
});

for (const file of components) {
  test(`${file}: astro check sees a default export with typed props`, () => {
    const tsx = toTSX(readFileSync(file, 'utf8'), 'Component');
    const { diagnostics = [] } = ts.transpileModule(tsx, {
      fileName: 'component.tsx',
      reportDiagnostics: true,
      compilerOptions: { jsx: ts.JsxEmit.Preserve },
    });
    const syntaxErrors = diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
    assert.deepEqual(syntaxErrors, [], 'the generated TSX does not parse');

    const sourceFile = ts.createSourceFile(
      'component.tsx',
      tsx,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    );
    assert.ok(hasDefaultExport(sourceFile), 'the generated TSX has no default export');
    assert.ok(!tsx.includes(UNTYPED_FALLBACK), 'defineProps was not extracted, so its props are untyped');
  });
}
