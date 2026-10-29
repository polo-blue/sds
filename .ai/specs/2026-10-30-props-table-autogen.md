# PropsTable: generate prop references from component source

## 📝 TLDR

Docs authors keep a hand-written `data` array next to every `<PropsTable>`. It drifts from the component it documents: `buttons.mdx` lists `rounded`/`sharp` but leaves out `whiteHover`, `lightHover`, `mediumHover` and `darkHover`, which `Button.vue` declares. **Proposed:** `PropsTable.astro` gets an optional `source` prop that names a component file. At build time it reads that file, pulls the prop declarations and their JSDoc comments out of it, and renders the existing table with a link to the file on GitHub. The current `data` prop stays as it is.

## 📝 Problem Statement

- 26 component docs pages (`src/pages/components/*.mdx`, 31 usages) render `<PropsTable data={[…]} />` from literal arrays. Nothing ties those arrays to the component source, so a new prop or a changed default is invisible in the docs until someone notices.
- Concrete drift today: `Button.vue` declares `whiteHover`, `lightHover`, `mediumHover` and `darkHover`, and `buttons.mdx` does not document any of them.
- Issue #452 asks for: TS interface parsing, JSDoc descriptions, boolean/string/number/union/optional support, a semantic table, a GitHub source link, and coverage of "all components in `src/components/`".

The codebase declares props in three ways, and "all components" has to cover each of them:

| Declaration form | Example | Count (approx.) |
|---|---|---|
| Astro `interface Props { … }` + `Astro.props` destructuring (defaults in the destructuring) | `Card.astro` | 28 files |
| Vue `defineProps<T>()` with a local interface, optionally `withDefaults(…)` | `Button.vue` | 11 files |
| Vue runtime object `defineProps({ name: { type: Boolean, default: … } })` | `Badge.vue`, `FeaturesList.vue` | 17 files |

## 📝 Proposed Solution

1. A pure extraction utility, `src/utils/docs/extractProps.ts`: `extractProps(sourceText, fileName) → PropDefinition[]`. It parses the source with the **TypeScript compiler API**. `typescript` is already a devDependency; `astro check` and the type-aware tooling use it.
   - `.astro`: take the frontmatter between the leading `---` fences, find `interface Props`, and read defaults from the destructuring of `Astro.props` (`const { size = 'md' } = Astro.props`).
   - `.vue`: take the `<script setup lang="ts">` block. For `defineProps<X>()`, resolve the local interface or type alias `X`, with defaults from `withDefaults(defineProps<X>(), { … })`. For a runtime object, map each entry's `type`, `required` and `default` (Phase 2).
   - Each member produces `{ name, type, required, default?, description }`. `type` is the member's type annotation as written (`'sm' | 'md' | 'lg'`, `boolean`, `string | number`). `required` is the absence of `?`. `description` is the JSDoc comment body. A JSDoc `@default` tag wins over a default read from code.
   - Index signatures (`[key: string]: any`) and members tagged `@internal` are skipped.
2. `PropsTable.astro` accepts `source?: string`, a path relative to `src/components/` (for example `Button.vue` or `Product/ProductTile.astro`). It loads the file through a **lazy** Vite raw glob, `import.meta.glob('/src/components/**/*.{astro,vue}', { query: '?raw', import: 'default' })`, and calls the loader only when `source` is set. That loader, `extractProps` and `typescript` are all imported dynamically on that branch. When only `data` is set, nothing new is loaded and the behaviour stays byte-identical. This works in dev and in the SSG build, does not depend on `process.cwd()`, and reloads when the component changes.
3. Below the table it renders a `Source:` link to `https://github.com/polo-blue/sds/blob/main/src/components/{source}`. The base URL is a constant next to the utility, and an optional `sourceUrl` prop overrides it.

**Alternatives considered**

- `vue-component-meta` / `vue-docgen-api`: these resolve imported and extended types properly, but they add a dependency, cover only Vue (28 Astro components would still need a parser), and are slow at build. Rejected for now; `extractProps` keeps the same output shape, so swapping one in later stays local to the utility.
- A regex parser: no dependency, but it breaks on multi-line unions, nested generics and comments. Rejected.
- A prebuild script that writes JSON: an extra build step and a generated artifact to keep in sync. The raw glob keeps the work inside Astro's build. Rejected.

## 📝 Architecture

- **New:** `src/utils/docs/extractProps.ts` (pure, no Astro or Vite imports, unit-testable under Node).
- **Changed:** `src/components/PropsTable.astro`, which gains the optional `source` and `sourceUrl` props and the glob lookup. The `data` contract is unchanged.
- **Consumers:** the 26 docs pages, migrated page by page (Phase 3, follow-up PRs). `PropsTable.astro` is not in the `index.ts` barrel. It is reachable through the `./components/*` subpath, so `BACKWARD_COMPATIBILITY.md` §3 applies: only additive optional props are allowed, and none of them is breaking.
- **`source` is docs-site only.** The glob is root-relative, so in a consuming project it would resolve against *their* `src/`. Consumers keep using `data`, and the component's doc comment and the docs page say so. `typescript` stays a devDependency, and because it is dynamically imported only on the `source` branch, the `data`-only path that consumers use never loads it. There is no new peer dependency.

## 📝 UI/UX

The table markup and classes (`table-base`, `table-header`, `table-row`, `table-cell`) stay as they are. Additions:

- A `<caption class="sr-only">Props of {ComponentName}</caption>`, so screen readers announce what the table is about. This is the "semantic HTML table" from the issue.
- Below the table, a muted `Source: src/components/Button.vue` link opening GitHub (`target="_blank" rel="noopener"`, with an `aria-label` that says it opens a new tab, following the WCAG 2.2 conventions from #522).
- Union types longer than the column wraps at `|`, using `break-words` on the type `<code>`.
- A prop without JSDoc renders `—` in the description cell, the same way a missing default renders now.

## 📝 Edge Cases & Failure Scenarios

- **`source` not found in the glob:** the build fails with `PropsTable: no component at src/components/{source}`. A silently empty table would hide the mistake, so the build has to stop.
- **The file declares no props it can recognise:** the build logs a warning naming the file and the table renders an empty-state row, "No props declared". The build does not fail, because components such as `Copyright.astro` really have no props.
- **The interface is imported or extends another type** (`interface Props extends BaseProps`): only the members written in the file are listed, and the warning names the unresolved heritage clause. Resolving types across files is out of scope (see the alternatives).
- **Multi-line JSDoc:** lines are joined with spaces and inline markdown backticks are kept as written. `@default` and `@deprecated` are read as tags; deprecated props get a "deprecated" badge next to their name.
- **Both `data` and `source` passed:** `data` rows override the extracted row with the same `name` and add rows it does not match. This is the escape hatch for slots or props whose types the parser cannot express.
- **Runtime-object `defineProps` with constructor arrays** (`type: [String, Number]`) map to `string | number`. A function default (`default: () => []`) is shown as written, as source text.

## 📝 Risks & Impact Review

- **Low reversibility cost:** the change is additive and optional. Removing the `source` prop and going back to `data` arrays rolls it back completely.
- **Build time:** about 60 small files parsed once per build with `ts.createSourceFile` (no type checker or program). The cost is negligible.
- **Docs accuracy moves into component source:** descriptions now live as JSDoc in `src/components/*`. Phase 3 changes comments in published component files. Comments are not part of the props contract, so this is not a breaking change, but it does produce semantic-release patch bumps (`docs:` commits).

## 📋 Phasing

- **Phase 1:** extraction for Astro `interface Props` and Vue `defineProps<T>()` / `withDefaults`; the `source` and `sourceUrl` props, the source link and the caption on `PropsTable`; `buttons.mdx` migrated as the reference page. Shippable on its own.
- **Phase 2:** runtime-object `defineProps({ … })` support (the 17 Vue components), plus the `@deprecated` badge.
- **Phase 3 (follow-up PRs, not part of the implementation PR for this spec):** the remaining docs pages migrated to `source`, with their hand-written descriptions moved into JSDoc. This is a content migration across many published files, deployable separately once Phases 1–2 ship.

## 📋 Implementation Plan

### Phase 1: TS-interface extraction and `source` prop

1. Add `src/utils/docs/extractProps.ts` with the `PropDefinition` type (moved out of `PropsTable.astro` and re-imported there) and `extractProps(source, fileName)` handling Astro frontmatter `interface Props` and destructuring defaults. Add `tests/unit/extract-props.test.ts` (Node `node:test`, run through a new `test:unit` script, `node --test tests/unit/`), covering optional/required, union, boolean/string/number, a JSDoc description, a destructuring default, `@default` override and a skipped index signature.
2. Extend `extractProps` to Vue `<script setup lang="ts">`: `defineProps<X>()` resolved to a local interface or type alias, plus `withDefaults` defaults. Add unit tests using a fixture shaped like `Button.vue`.
3. `PropsTable.astro`: optional `source` and `sourceUrl` props, the raw-glob lookup, merging of `data` overrides, a build error when the source is missing, the empty-state row, the sr-only caption and the GitHub source link. The `data`-only path keeps rendering identically.
4. Migrate `buttons.mdx` to `<PropsTable source="Button.vue" />`, with the existing descriptions moved into JSDoc in `Button.vue`. Add a unit test that runs `extractProps` on the real `src/components/Button.vue` and asserts that `whiteHover`, `lightHover`, `mediumHover` and `darkHover` are present and that `[key: string]` is absent. Add a unit test for the missing-source error (put the lookup-and-throw in a small exported helper so it is testable without Astro). Then run `pnpm build` and the validation gate.

### Phase 2: runtime-object `defineProps`

5. Support `defineProps({ … })` object literals: constructor-to-type mapping, `required`, `default` (literal or source text) and JSDoc on properties. Unit tests with fixtures shaped like `Badge.vue` and `FeaturesList.vue`.
6. Add the `@deprecated` tag badge. Unit test plus one migrated page (`badges.mdx`).

### Phase 3: migrate the docs pages (follow-up PRs)

Each batch adds a unit test that runs `extractProps` over the migrated components' real source files and asserts a non-empty prop list, so a parser regression shows up as a failing test instead of an empty table.

7. Migrate the Astro-component docs pages (card, carousel, copyright, drawer, hand-drive, image, jumbotron, menu-drawer, modal, navbar, post-header, product-tile, toggle, …) to `source`, moving their descriptions into JSDoc. Build after each batch.
8. Migrate the Vue-component docs pages (badges, breadcrumbs, details-list, features-list, headline, input, pr-code, product-*, quote, slimbanner, table). Remove the `data` arrays the source now fully covers, and keep `data` only for overrides.

## Resolved assumptions (autonomous defaults)

| # | Question | Default chosen | Rationale |
|---|---|---|---|
| Q1 | Parser: TypeScript compiler API, or a dedicated docgen library (`vue-component-meta`)? | TypeScript compiler API (`ts.createSourceFile`, no type checker) | Already a devDependency, so no new dependency; it covers Astro and Vue with one code path. A library swap stays local to `extractProps`. |
| Q2 | Should "works for all components" include the 17 Vue components with runtime-object `defineProps`? | Yes, as Phase 2 | The acceptance criterion names all components. Splitting it into a phase keeps Phase 1 small and shippable. |
| Q3 | Replace the `data` prop, or add `source` beside it? | Add an optional, docs-site-only `source`; keep `data` (also as per-row override) | `PropsTable` is reachable via the `./components/*` subpath, so `BACKWARD_COMPATIBILITY.md` §3 forbids removing props. Dynamic imports keep consumers' `data` path unchanged. Additive is fully reversible. |
| Q4 | Migrate the existing 26 docs pages, or only new ones? | Migrate them all in Phase 3, as follow-up PRs after the implementation PR | That is what fixes the drift the issue exists for. The changes are comments only, and keeping them separate keeps the implementation PR reviewable. |
| Q5 | Resolve imported or `extends`-ed types across files? | No, only members declared in the file, with a build warning | Cross-file resolution needs a full type-checker program, which is a bigger and slower build surface. It is deferred. |
| Q6 | Where do defaults come from? | Code defaults (Astro destructuring, `withDefaults`, runtime `default`), overridden by a JSDoc `@default` tag | The source of truth stays the code, and authors still have an escape hatch. |
| Q7 | Split into separate specs? | No: one spec, but Phase 3 ships as follow-up PRs | Extraction is useless without the rendering prop, and the prop is useless without extraction. The page migration is separately deployable, so it gets its own PRs. |
