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

1. A pure extraction utility, `src/utils/docs/extractProps.ts`: `async extractProps(sourceText, fileName) → { props: PropDefinition[], warnings: string[] }`. It parses the script with the **TypeScript compiler API** (`ts.createSourceFile`, no type checker).
   - **Parsers are build-time only.** `typescript` and `@vue/compiler-sfc` are devDependencies. `extractProps` loads them on first call through **non-literal** dynamic imports (`import(/* @vite-ignore */ name)`), so a bundler that reaches this module from a consumer's build never tries to resolve them; only the docs build, which actually runs the code, loads them.
   - `.astro`: take the frontmatter between the leading `---` fences, find a local `interface Props` / `type Props`, and read defaults from the top-level destructuring of `Astro.props` (`const { size = 'md', class: className = '' } = Astro.props`).
   - `.vue`: take the `<script setup>` block with `@vue/compiler-sfc`'s `parse()`, so attribute order (`<script lang="ts" setup>`), a preceding plain `<script>` block, and `</script>` inside strings are handled. Only top-level statements are scanned for `defineProps` / `withDefaults(defineProps(…), …)`.
     - `defineProps<X>()`: resolve the local interface or type alias `X` (or an inline type literal). `withDefaults` factories are unwrapped (`() => ['suffix']` → `['suffix']`) except for function-typed props, whose default is the function itself. A `boolean` prop with no default shows `false`, Vue's implicit cast.
     - Runtime object `defineProps({ … })` (Phase 2): map `type` constructors (`String` → `string`, `[String, Number]` → `string | number`), read the generic from `X as PropType<T>` (so `Object as PropType<Item[]>` → `Item[]`), and take `required` and `default` (object/array factories unwrapped the same way; `Boolean` without a default → `false`).
   - Each member produces `PropDefinition = { name, type, required?, default?, description, deprecated? }`. `type` is the annotation as written (`'sm' | 'md' | 'lg'`, `boolean`, `string | number`), whitespace-normalized. `required` is the absence of `?`. `description` is the JSDoc body. JSDoc tags: `@default` wins over a default read from code, `@deprecated` sets `deprecated: true`, `@internal` hides the prop.
   - Index signatures (`[key: string]: any`) and methods are skipped.
   - `mergeProps(extracted, data)`: hand-written `data` rows override extracted rows field by field when the `name` matches (including `deprecated`) and are appended when it does not.
2. `PropsTable.astro` makes `data` optional (`data?: PropDefinition[]`, default `[]`) and accepts `source?: string`, a path relative to `src/components/` (for example `Button.vue` or `Product/ProductTile.astro`; a leading `./` is accepted). It loads the file through a **lazy** Vite raw glob, `import.meta.glob('/src/components/**/*.{astro,vue}', { query: '?raw', import: 'default' })`, and calls the loader only when `source` is set; `extractProps`, `mergeProps` and the site config are imported dynamically on that branch too. Existing `data` callers stay compatible: with `data` only, nothing new is loaded and no caption or source link is added. With neither prop, the table renders its empty-state row. This works in dev and in the SSG build, does not depend on `process.cwd()`, and reloads when the component changes.
3. With `source`, below the table it renders a `Source:` link to `https://github.com/{SITE.github}/blob/main/src/components/{source}`, built from `SITE.github` in `src/config.ts` (the same value the header's GitHub link uses). An optional `sourceUrl` prop overrides it.

**Alternatives considered**

- `vue-component-meta` / `vue-docgen-api`: these resolve imported and extended types properly, but they add a dependency, cover only Vue (28 Astro components would still need a parser), and are slow at build. Rejected for now; `extractProps` keeps the same output shape, so swapping one in later stays local to the utility.
- A regex parser: no dependency, but it breaks on multi-line unions, nested generics and comments. Rejected.
- A prebuild script that writes JSON: an extra build step and a generated artifact to keep in sync. The raw glob keeps the work inside Astro's build. Rejected.

## 📝 Architecture

- **New:** `src/utils/docs/extractProps.ts` (pure, no Astro or Vite imports, unit-testable under Node).
- **Changed:** `src/components/PropsTable.astro`, which gains the optional `source` and `sourceUrl` props and the glob lookup, and makes `data` optional. Existing `data` callers remain compatible.
- **Consumers:** the 26 docs pages, migrated page by page (Phase 3, follow-up PRs). `PropsTable.astro` is not in the `index.ts` barrel. It is reachable through the `./components/*` subpath, so `BACKWARD_COMPATIBILITY.md` §3 applies: only additive optional props are allowed, and making a required prop optional is non-breaking.
- **`source` is docs-site only.** The glob is root-relative, so in a consuming project it would resolve against *their* `src/`. Consumers keep using `data`, and the component's doc comment says so.
- **No dependency leaks into consumers.** `typescript` and `@vue/compiler-sfc` stay devDependencies and are reached only through non-literal dynamic imports inside `extractProps` (see Proposed Solution). A consumer that bundles `PropsTable.astro` therefore never has to resolve them, even though `extractProps.ts` ships in the package's `src/`. Verified by a Vite SSR build of `extractProps.ts` with both modules aliased to a nonexistent path: it still bundles, and the output keeps both as runtime-only `import()` calls. A test on a packed tarball installed into a separate consumer project (no direct `typescript`) has not been run. It is the stronger check and is worth adding before the component is promoted for consumer use. There is no new runtime or peer dependency.

## 📝 UI/UX

The table markup and classes (`table-base`, `table-header`, `table-row`, `table-cell`) stay as they are. Additions, all on the `source` path only unless stated:

- A `<caption class="sr-only">Props of {ComponentName}</caption>`, so screen readers announce what the table is about. This is the "semantic HTML table" from the issue. It is rendered only with `source`, so `data`-only tables get no new markup.
- Below the table, a muted `Source: src/components/Button.vue` link opening GitHub (`target="_blank" rel="noopener noreferrer"`). The visible text and the accessible name use the normalized path; the accessible name is `{path} (opens in a new tab)`, so the label contains the visible text (WCAG 2.5.3) and works with a custom `sourceUrl`.
- Inline backtick spans in descriptions (`` `btn-xs` ``) render as `<code>`.
- A "deprecated" badge next to props marked `@deprecated` (both paths, since `data` rows may set `deprecated`).
- Both paths: long union types wrap, using `break-words` on the type `<code>`, and an empty description renders `—`, the same way a missing default does.

## 📝 Edge Cases & Failure Scenarios

- **`source` not found in the glob:** the build fails with `PropsTable: no component at src/components/{source}`. A silently empty table would hide the mistake, so the build has to stop.
- **The file declares no props it can recognise:** the build logs a warning naming the file and the table renders an empty-state row, "No typed props found" (or "No props declared" when neither `source` nor `data` is given). The build does not fail, because components such as `Copyright.astro` really have no props.
- **The props type is imported, untyped or extends another type:** an Astro component that uses `Astro.props` without a local `Props` type (`Jumbotron.astro` imports it, `Date.astro` is untyped) logs `no local Props type; imported or untyped props are not listed`. A Vue `defineProps<X>()` whose `X` is not declared in the file logs the same kind of warning. For `interface Props extends BaseProps`, only the members written in the file are listed and the warning names the heritage clause. Resolving types across files is out of scope (see the alternatives); `data` rows fill the gap.
- **Multi-line JSDoc:** lines are joined with spaces. `@default`, `@deprecated` and `@internal` are read as tags. JSDoc must sit on its own line(s) above the member; a comment on the same line as the opening `{` of an inline type literal is not attached by the TypeScript parser.
- **Both `data` and `source` passed:** `mergeProps` applies `data` rows over the extracted row with the same `name` and appends rows it does not match. This is the escape hatch for slots or props whose types the parser cannot express.
- **Runtime-object `defineProps` defaults:** object/array factories (`default: () => []`, `default() { return ['a'] }`) show the value they return. A multi-statement function body, or the default of a `Function`-typed prop, is shown as source text.

## 📝 Risks & Impact Review

- **Low reversibility cost:** the change is additive and optional. Removing the `source` prop and going back to `data` arrays rolls it back completely.
- **Build time:** about 60 small files parsed once per build with `ts.createSourceFile` (no type checker or program). The cost is negligible.
- **Docs accuracy moves into component source:** descriptions now live as JSDoc in `src/components/*`. Phase 3 changes comments in published component files. Comments are not part of the props contract, so this is not a breaking change, but it does produce semantic-release patch bumps (`docs:` commits).

## 📋 Phasing

- **Phase 1:** extraction for Astro `interface Props` and Vue `defineProps<T>()` / `withDefaults`; the `source` and `sourceUrl` props, the source link and the caption on `PropsTable`; `buttons.mdx` migrated as the reference page. Shippable on its own.
- **Phase 2:** runtime-object `defineProps({ … })` support (the 17 Vue components), plus the `@deprecated` badge.
- **Phase 3 (follow-up PRs, not part of the implementation PR for this spec):** the remaining docs pages migrated to `source`, with their hand-written descriptions moved into JSDoc. This is a content migration across many published files, deployable separately once Phases 1–2 ship.

## 📋 Implementation Plan

> **Delivery status:** Phases 1 and 2 shipped in #534 (`feat/props-table-autogen`). This section and the ones above describe what that PR implements, including the changes from its review (consumer-safe parser loading, `@vue/compiler-sfc`, `PropType`, factory defaults, boolean defaults). Phase 3 is still open.

### Phase 1: TS-interface extraction and `source` prop

1. Add `src/utils/docs/extractProps.ts` with the `PropDefinition` type (moved out of `PropsTable.astro` and re-imported there as a type-only import) and `extractProps(source, fileName)` handling Astro frontmatter `interface Props` and destructuring defaults. Add `tests/unit/extract-props.test.ts` (Node `node:test`, run through a new `test:unit` script, `node --test "tests/unit/*.test.ts"`), covering optional/required, union, boolean/string/number, a JSDoc description, a destructuring default, `@default` override and a skipped index signature.
2. Extend `extractProps` to Vue `<script setup lang="ts">`: `defineProps<X>()` resolved to a local interface or type alias, plus `withDefaults` defaults. Add unit tests using a fixture shaped like `Button.vue`.
3. `PropsTable.astro`: optional `source` and `sourceUrl` props, the raw-glob lookup, merging of `data` overrides, a build error when the source is missing, the empty-state row, the sr-only caption and the GitHub source link. The `data`-only path keeps rendering identically.
4. Migrate `buttons.mdx` to `<PropsTable source="Button.vue" />`, with the existing descriptions moved into JSDoc in `Button.vue`. Add a unit test that runs `extractProps` on the real `src/components/Button.vue` and asserts that `whiteHover`, `lightHover`, `mediumHover` and `darkHover` are present and that `[key: string]` is absent. Add a unit test for the missing-source error (put the lookup-and-throw in a small exported helper so it is testable without Astro). Then run `pnpm build` and the validation gate.

### Phase 2: runtime-object `defineProps`

5. Support `defineProps({ … })` object literals: constructor-to-type mapping, `PropType<T>` generics, `required`, `default` (factories unwrapped) and JSDoc on properties. Unit tests with fixtures shaped like `Badge.vue`, `Badges.vue` and `FeaturesList.vue`, plus runs against the real `Badge.vue` and `Badges.vue`.
6. Add the `@deprecated` tag badge. Unit test plus one migrated page (`badges.mdx`).

### Phase 3: migrate the docs pages (follow-up PRs)

Each batch adds a unit test that runs `extractProps` over the migrated components' real source files and asserts a non-empty prop list, so a parser regression shows up as a failing test instead of an empty table.

7. Migrate the Astro-component docs pages (card, carousel, copyright, drawer, hand-drive, image, jumbotron, menu-drawer, modal, navbar, post-header, product-tile, toggle, …) to `source`, moving their descriptions into JSDoc. Build after each batch.
8. Migrate the Vue-component docs pages (badges, breadcrumbs, details-list, features-list, headline, input, pr-code, product-*, quote, slimbanner, table). Remove the `data` arrays the source now fully covers, and keep `data` only for overrides.

## Resolved assumptions (autonomous defaults)

| # | Question | Default chosen | Rationale |
|---|---|---|---|
| Q1 | Parser: TypeScript compiler API, or a dedicated docgen library (`vue-component-meta`)? | TypeScript compiler API (`ts.createSourceFile`, no type checker), with `@vue/compiler-sfc` only to locate `<script setup>` | Both are already devDependencies, so no new dependency; one code path covers Astro and Vue. A library swap stays local to `extractProps`. |
| Q2 | Should "works for all components" include the 17 Vue components with runtime-object `defineProps`? | Yes, as Phase 2 | The acceptance criterion names all components. Splitting it into a phase keeps Phase 1 small and shippable. |
| Q3 | Replace the `data` prop, or add `source` beside it? | Add an optional, docs-site-only `source`; keep `data`, now optional (also as per-row override) | `PropsTable` is reachable via the `./components/*` subpath, so `BACKWARD_COMPATIBILITY.md` §3 forbids removing props. Non-literal dynamic imports keep the parsers out of consumers' builds. Additive is fully reversible. |
| Q4 | Migrate the existing 26 docs pages, or only new ones? | Migrate them all in Phase 3, as follow-up PRs after the implementation PR | That is what fixes the drift the issue exists for. The changes are comments only, and keeping them separate keeps the implementation PR reviewable. |
| Q5 | Resolve imported or `extends`-ed types across files? | No, only members declared in the file, with a build warning | Cross-file resolution needs a full type-checker program, which is a bigger and slower build surface. It is deferred. |
| Q6 | Where do defaults come from? | Code defaults (Astro destructuring, `withDefaults`, runtime `default`), overridden by a JSDoc `@default` tag | The source of truth stays the code, and authors still have an escape hatch. |
| Q7 | Split into separate specs? | No: one spec, but Phase 3 ships as follow-up PRs | Extraction is useless without the rendering prop, and the prop is useless without extraction. The page migration is separately deployable, so it gets its own PRs. |
