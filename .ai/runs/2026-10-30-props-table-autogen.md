# Execution plan: PropsTable auto-generated from component source

Source doc: .ai/specs/2026-10-30-props-table-autogen.md
Spec PR: #531
Issue: #452

## Goal

`<PropsTable source="Button.vue" />` renders the prop reference extracted from the component's TypeScript prop declarations and their JSDoc, with a link to the source file on GitHub. The existing `data` prop keeps working unchanged.

## Scope

- New `src/utils/docs/extractProps.ts`, a pure TypeScript-compiler-API parser for Astro `interface Props` and Vue `defineProps` (generic, `withDefaults`, runtime object).
- `src/components/PropsTable.astro`: optional `source` / `sourceUrl`, lazy raw glob, dynamic imports, sr-only caption, source link, deprecated badge.
- `buttons.mdx` migrated, with descriptions moved into JSDoc in `Button.vue`; `badges.mdx` migrated.
- Unit tests under `tests/unit/`, run with `node --test` through a new `test:unit` script.

## Non-goals

- Phase 3 of the spec (migrating the remaining docs pages) ships as follow-up PRs.
- Cross-file type resolution (`extends` and imported interfaces).
- Any change to `data`-only rendering or to the props of published components.

## Implementation Plan

### Phase 1: TS-interface extraction and `source` prop

1. Astro `interface Props` extraction plus unit tests.
2. Vue `defineProps<T>()` / `withDefaults` extraction plus unit tests.
3. `PropsTable.astro` gets `source`, the glob lookup, overrides, the error and empty states, the caption and the link.
4. Migrate `buttons.mdx` and add JSDoc to `Button.vue`, plus a real-source test.

### Phase 2: runtime-object `defineProps`

5. Runtime-object `defineProps({ … })` extraction plus unit tests.
6. `@deprecated` badge and the `badges.mdx` migration.

## Risks

- `typescript` is a devDependency. It is imported dynamically only on the `source` branch, so consumers on the `data` path are unaffected.
- The root-relative glob resolves against the consuming project, so `source` is documented as docs-site only.

## Progress

PR: #534

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: TS-interface extraction and `source` prop

- [x] 1.1 Astro interface Props extraction with unit tests — 4d1ba94
- [x] 1.2 Vue defineProps generic and withDefaults extraction — 4d1ba94
- [x] 1.3 PropsTable source prop, lookup, caption and link — 50e71cd, 72a051b
- [x] 1.4 Migrate buttons.mdx and JSDoc Button.vue — 7348fd2

### Phase 2: runtime-object defineProps

- [x] 2.1 Runtime-object defineProps extraction — 4d1ba94
- [x] 2.2 Deprecated badge and badges.mdx migration — 50e71cd, ffdbae2
