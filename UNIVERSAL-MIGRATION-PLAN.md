# SDS Universal Migration Plan

## Goal

Move SDS from "Astro+Vue bundled together" to a **framework-agnostic core + thin per-framework wrappers**. Result: any project can consume SDS without pulling frameworks it doesn't use (no React when you're on Astro, no Vue when you're on React, no Astro when you're plain HTML).

Existing consumers (catalog.polo.blue, polo.blue, etc.) MUST keep working through every phase. No big-bang rename.

---

## Target architecture

```
spoko-design-system/
  uno-config/           ← UnoCSS preset            (framework-free)
  icons/                ← icon config              (framework-free)
  styles/
    base/               ← base/typography/reset    (CSS only, already shipped)
    tokens.css          ← CSS variables            (already shipped)
    sds.css             ← pre-built recipes        (NEW — issue #9 from roadmap)
  scripts/              ← vanilla TS init funcs    (initDrawer, initToggle, initModal, …)
  astro/                ← thin <script>-free wrappers     peer: astro
    Button.astro
    Toggle.astro
    Drawer.astro
    …
  vue/                  ← thin Vue 3 wrappers              peer: vue
    Button.vue
    Toggle.vue
    Drawer.vue
    …
  react/                ← thin React wrappers (future)     peer: react
    Button.tsx
    Toggle.tsx
    Drawer.tsx
    …
  utils/                ← pure TS helpers           (framework-free)
    formatLocaleNumber.ts
    removeSemicolon.ts
    …
```

**Three layers, separated by concern:**

| Layer | What lives here | Framework deps |
| --- | --- | --- |
| **CSS layer** (`styles/`, `uno-config/`) | All visual styling — recipe classes, tokens, variants via `data-*` attributes | None |
| **Behavior layer** (`scripts/`) | All interactive logic — event wiring, focus management, state — exported as `initX(root: HTMLElement, opts?)` functions | None |
| **Wrapper layer** (`astro/`, `vue/`, `react/`) | Markup + framework idioms (slots/props/v-model/JSX). Render the markup, call `initX(rootRef)` in lifecycle hook | One peer |

The same CSS recipes and `initX` script power all three wrappers — write once, wrap thrice.

---

## Key principles

1. **CSS is the universal API.** A consumer with only HTML + `sds.css` gets a working SDS look — Flowbite-style.
2. **State via attributes, not framework.** `data-look="pill"`, `aria-checked`, `.is-active` are the source of truth — CSS reacts to them, frameworks set them. No `:class="{ active: foo }"` lock-in.
3. **Behavior via `initX(root)` vanilla TS.** Each interactive component exports one init function. Wrappers call it in `onMounted` / `useEffect` / `<script>`. The same function works in plain HTML pages that don't load any framework.
4. **Peer deps, never deps.** `vue`, `astro`, `react` move to `peerDependencies` with `optional: true`. Consumer installs only their framework.
5. **Subpath imports, no barrel.** New code uses `spoko-design-system/astro/Button.astro` or `spoko-design-system/vue/Button.vue`. The root `index.ts` barrel is kept for back-compat for a deprecation window, but stops being expanded.

---

## Worked example — Toggle refactored

### Before (current)
```
src/components/Toggle.astro       ← markup + CSS + JS in one file
```

### After
```
src/scripts/toggle.ts             ← initToggle(root, opts)  — vanilla TS, owns all behavior
src/styles/recipes/toggle.css     ← .sds-toggle-*, [data-look="pill"] {…}, focus-visible
src/astro/Toggle.astro            ← ~30 lines: markup + `<script>import {initToggle} from '../scripts/toggle'</script>`
src/vue/Toggle.vue                ← ~40 lines: <template>, useTemplateRef, onMounted → initToggle
src/react/Toggle.tsx              ← ~40 lines: useRef + useEffect → initToggle
```

#### `scripts/toggle.ts` — single source of truth for behavior
```ts
export interface ToggleOptions {
  onChange?: (detail: { value?: string; checked: boolean }) => void;
}

export function initToggle(root: HTMLElement, opts: ToggleOptions = {}) {
  const variant = root.dataset.variant; // 'switch' | 'segmented'
  // wire click/keyboard/aria — exactly the logic that's in Toggle.astro <script> today
  // returns a cleanup function for frameworks that need it
  return () => { /* removeEventListener etc. */ };
}
```

#### `vue/Toggle.vue` — wrapper
```vue
<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from 'vue';
import { initToggle } from '../scripts/toggle';
import '../styles/recipes/toggle.css';

const props = defineProps<{ variant?: 'switch' | 'segmented'; look?: string; current?: string }>();
const emit = defineEmits<{ change: [{ value?: string; checked: boolean }] }>();
const root = useTemplateRef('root');
let cleanup: (() => void) | undefined;

onMounted(() => { cleanup = initToggle(root.value!, { onChange: d => emit('change', d) }); });
onUnmounted(() => cleanup?.());
</script>

<template>
  <div ref="root" :data-variant="variant" :data-look="look" :data-current="current">
    <slot />
  </div>
</template>
```

#### Same script powers a React or plain-HTML consumer
```tsx
// React
const ref = useRef<HTMLDivElement>(null);
useEffect(() => initToggle(ref.current!, { onChange: d => setVal(d.value) }), []);

// Plain HTML
<script type="module">
  import { initToggle } from 'spoko-design-system/scripts/toggle';
  document.querySelectorAll('[data-sds-toggle]').forEach(el => initToggle(el));
</script>
```

---

## Migration phases

### Phase 0 — Inventory & freeze (1 day)
- Tag every existing component as **static** (no JS) or **interactive** (needs script split)
- From catalog inventory: interactive components = Button, Faq, ProductGallery, tooltips. Plus already-split: Drawer, Modal, Toggle, Navbar.
- Freeze `index.ts` barrel additions — new components only land via subpaths from Phase 1 onward
- Snapshot dependents: catalog, polo.blue, blog.polo.blue, spoko.space, uper.pl — note exact imports each uses

### Phase 1 — Establish new tree, keep old (1–2 weeks)
- Add new top-level dirs: `src/astro/`, `src/vue/`, `src/react/` (empty), `src/scripts/`, `src/styles/recipes/`
- Update `package.json` exports map:
  ```jsonc
  "exports": {
    ".": "./index.ts",                                          // legacy barrel
    "./uno-config":      "./uno-config/index.ts",               // existing
    "./icons":           "./icon.config.ts",                    // existing
    "./styles/*":        "./src/styles/*",                      // existing
    "./scripts/*":       "./src/scripts/*",                     // existing
    "./utils/*":         "./src/utils/*",                       // NEW
    "./astro/*":         "./src/astro/*",                       // NEW
    "./vue/*":           "./src/vue/*",                         // NEW
    "./react/*":         "./src/react/*",                       // NEW (placeholder)
    "./components/*":    "./src/components/*"                   // legacy, alias of /astro/* until Phase 4
  }
  ```
- Move framework deps to peer:
  ```jsonc
  "peerDependencies": {
    "vue":    ">=3.5",
    "astro":  ">=5.0",
    "react":  ">=18"
  },
  "peerDependenciesMeta": {
    "vue":   { "optional": true },
    "astro": { "optional": true },
    "react": { "optional": true }
  }
  ```
  (Keep `vue`, `astro` in `devDependencies` for the docs site itself.)
- Verify catalog still builds with new package without changes (the legacy barrel + `./components/*` still work)

### Phase 2 — Split interactive components first (2–3 weeks)
Order by usage and complexity:

| # | Component | Current | New scripts file | New wrappers |
| --- | --- | --- | --- | --- |
| 1 | Drawer | `src/components/Drawer.astro` + `src/scripts/drawer.ts` already exists | nothing to do | add `src/vue/Drawer.vue`, move `Drawer.astro` → `src/astro/Drawer.astro` |
| 2 | Modal | `src/components/Modal.astro` | extract → `src/scripts/modal.ts` | astro + vue wrappers |
| 3 | Toggle | `src/components/Toggle.astro` | extract → `src/scripts/toggle.ts` | astro + vue wrappers |
| 4 | Navbar | `src/components/Navbar.astro` | no script — pure markup | astro + vue wrappers |
| 5 | **Button** ⭐ | `src/components/Button.vue` | none (CSS-only) | add `src/astro/Button.astro`, keep vue — hottest cross-consumer component (used in catalog + polo.blue, 10+ sites) |
| 6 | **Input** ⭐ | `src/components/Input.vue` | none (CSS-only) | add `src/astro/Input.astro`, keep vue — paired with Button in form-heavy consumer files |
| 7 | Tooltips | `src/scripts/tooltips.ts` exists | nothing to do | wrap in astro/vue if useful |
| 8 | ProductGallery | uses `scripts/product-gallery.ts` | nothing to do | move astro file to `src/astro/Product/` |
| 9 | Faq / FaqItem | mix astro + vue | extract → `src/scripts/faq.ts` | astro + vue wrappers |

Each split = 1 PR, conventional commit. Old files at `src/components/*` stay as **re-export shims** so catalog still works:

```astro
---
// src/components/Toggle.astro (Phase 2 — shim)
export * from '../astro/Toggle.astro';
---
<Toggle {...Astro.props}><slot /></Toggle>
```

### Phase 3 — Split static (markup-only) components (1 week)
The bulk: Headline, Copyright, Jumbotron, Breadcrumbs, Badges, HandDrive, ProductImage, ProductNumber, ProductCodes, ProductEngines, ProductDetailName, CategoryLink, SubCategoryLink, FeaturesList, ProductDetailsList, etc.

For each:
- Move file from `src/components/*` to `src/astro/*` or `src/vue/*` based on current extension
- If a markup-only Astro component is used in a Vue context (or vice versa), generate the other wrapper — cheap because no behavior
- Replace at `src/components/*` with a 1-line re-export shim

### Phase 4 — React wrappers (2 weeks, after Phases 1–3)
- For every component in `src/scripts/*`, hand-write `src/react/X.tsx` (`useRef` + `useEffect(() => initX(ref.current!))`)
- For markup-only, hand-write `src/react/X.tsx` (just JSX with the same recipe classes)
- Add `peerDependencies.react`, types
- First consumer: a new throwaway example app in `examples/react/`

### Phase 5 — Barrel deprecation (after consumers migrate)
- Mark `index.ts` re-exports with `@deprecated` JSDoc — IDE warns consumers to migrate to subpaths
- Sweep catalog (and other consumers) — rewrite each `from 'spoko-design-system'` → `from 'spoko-design-system/astro/X'` or `/vue/X`. Codemod via jscodeshift or simple regex script
- Once all known consumers migrated, drop `index.ts` (major version bump)

### Phase 6 — Pre-built CSS distribution (parallel to Phase 5)
- `pnpm build:css` produces `dist/sds.css` (compiled UnoCSS recipes + tokens)
- Ship in npm: `import 'spoko-design-system/styles/sds.css'`
- Plain HTML/Python/email consumers: link CDN copy, use class names directly
- Required for "no framework needed" promise (Issue #9 from roadmap)

---

## Per-component classification

From catalog's actual usage + SDS source. Status legend:
- **S** = static markup, no script
- **I** = interactive (needs script split)
- **U** = utility (no UI, pure TS)

| Component | Kind | Current location | Target |
| --- | --- | --- | --- |
| Button | S | `components/Button.vue` | `vue/Button.vue` + `astro/Button.astro` |
| Headline | S | `components/Headline.astro` | `astro/Headline.astro` |
| Copyright | S | `components/Copyright.astro` | `astro/Copyright.astro` |
| Jumbotron | S | `components/Jumbotron.astro` | `astro/Jumbotron.astro` |
| Card | S | `components/Card.astro` | `astro/Card.astro` |
| Breadcrumbs | S | `components/Breadcrumbs.vue` | `vue/Breadcrumbs.vue` + `astro/Breadcrumbs.astro` |
| Badges | S | `components/Badges.vue` | `vue/Badges.vue` + `astro/Badges.astro` |
| Table | S | `components/Table.vue` | `vue/Table.vue` + `astro/Table.astro` |
| Input | S | `components/Input.vue` | `vue/Input.vue` + `astro/Input.astro` |
| HandDrive | S | `components/HandDrive.astro` | `astro/HandDrive.astro` |
| ProductImage | S | `components/Product/…` | `astro/Product/ProductImage.astro` |
| ProductNumber | S | `components/Product/…` | `astro/Product/ProductNumber.astro` |
| ProductCodes | S | `components/Product/…` | `astro/Product/ProductCodes.astro` |
| ProductEngines | S | `components/Product/…` | `astro/Product/ProductEngines.astro` |
| ProductDetailName | S | `components/Product/…` | `astro/Product/ProductDetailName.astro` + `vue/Product/ProductDetailName.vue` |
| FeaturesList | S | `components/FeaturesList.astro` | `astro/FeaturesList.astro` |
| CategoryLink | S | `components/Category/…` | `astro/Category/CategoryLink.astro` |
| SubCategoryLink | S | `components/Category/…` | `astro/Category/SubCategoryLink.astro` |
| Faq, FaqItem | I | `components/Faq*.astro` | `scripts/faq.ts` + astro + vue wrappers |
| ProductGallery | I | `components/Product/ProductGallery.astro` + `scripts/product-gallery.ts` | `astro/Product/ProductGallery.astro` (script already split) |
| Drawer | I | `components/Drawer.astro` + `scripts/drawer.ts` | `astro/Drawer.astro` + `vue/Drawer.vue` |
| Modal | I | `components/Modal.astro` | `scripts/modal.ts` + astro + vue wrappers |
| Toggle | I | `components/Toggle.astro` | `scripts/toggle.ts` + astro + vue wrappers |
| Navbar | S | `components/Navbar.astro` | `astro/Navbar.astro` + `vue/Navbar.vue` |
| tooltips | I (global) | `scripts/tooltips.ts` | unchanged, already correct |
| formatLocaleNumber | U | `utils/text/…` | `utils/text/formatLocaleNumber.ts` |
| removeSemicolon | U | `utils/text/…` | `utils/text/removeSemicolon.ts` |

**Stats:**
- Interactive components needing script extract: **4** (Modal, Toggle, Faq, … Drawer already done)
- Static components needing only move + shim: **~20**
- Effort estimate: ~3 weeks total dev time across phases 1–3

---

## Consumer inventory (snapshot — Phase 0)

Real import surface scanned on 2026-06-13. Every path listed here MUST keep resolving through Phases 1–4. Phase 5 codemod rewrites barrel imports only — every other subpath stays stable across the whole migration.

### catalog.polo.blue

| Subpath | Caller files | Notes |
| --- | --- | --- |
| `/uno-config` | `astro.config.mjs`, `uno.config.ts` | Already stable |
| `/icons` | `astro.config.mjs` | Already stable |
| `/styles/base/typography`, `/styles/base/base` | `src/styles/main.css` (CSS `@import`) | Already stable |
| `/scripts/tooltips` (side-effect) | `src/scripts/tooltips.ts` | Already stable |
| `/scripts/product-gallery` (named: `initProductGallery`) | `src/components/Product/ProductSlider.astro` | Already stable |
| `/components/Product/ProductGallery.astro` | `src/components/Product/ProductSlider.astro` | Direct subpath — already correct shape |
| Root barrel | ~24 Astro files + 1 Vue (`ProductDetailsList.vue`) | Migrates in Phase 5 |
| Barrel utility exports | `removeSemicolon`, `formatLocaleNumber` | Move to `/utils/text/*` |

**21 distinct components consumed.** All Astro except one Vue consumer.

### polo.blue

| Subpath | Caller files | Notes |
| --- | --- | --- |
| `/uno-config` | `astro.config.mjs` | Already stable |
| `/icons` | `astro.config.mjs` | Already stable |
| `/scripts/tooltips` (side-effect) | `src/scripts/tooltips.ts` | Already stable |
| `/scripts/product-gallery` (named: `initProductGallery`) | `src/scripts/wp-lightbox.ts` | Already stable |
| **`/components/Product/product-gallery.css`** (raw CSS asset) | `src/scripts/wp-lightbox.ts` | ⚠ Raw CSS-as-asset path — MUST preserve through every phase |
| Root barrel | 10 Astro files + 1 Vue (`FormReply.vue`) | Migrates in Phase 5 |

**6 distinct components consumed:** `Button`, `Input`, `Headline`, `Jumbotron`, `Breadcrumbs`, `ProductNumber`. No utility imports.

### Cross-consumer takeaways

- **Button + Input are the hottest interactive components** across both consumers — they each appear in 4+ files of polo.blue alone. Phase 2 should split them early.
- **Vue surface = 2 files total** (`ProductDetailsList.vue` in catalog, `FormReply.vue` in polo.blue). The `vue/*` wrapper tree starts almost empty — only Button + Input need a Vue wrapper on day one.
- **Raw CSS sub-asset path** (`/components/Product/product-gallery.css`) is a new constraint surfaced by polo.blue. Whatever new structure we adopt, `Product/product-gallery.css` must keep resolving — easiest is to declare it explicitly in the exports map:
  ```jsonc
  "./components/Product/product-gallery.css": "./src/astro/Product/product-gallery.css"
  ```
- **`/scripts/tooltips`** is consumed by both catalog and polo.blue as a side-effect import (`import 'spoko-design-system/scripts/tooltips'`). It already auto-binds to `[data-tippy-content]`. Keep this contract — don't refactor it into an `initTooltips(root)` function without a back-compat alias.
- **No utility consumer in polo.blue** — only catalog uses `removeSemicolon` / `formatLocaleNumber`. Means the `/utils/*` migration breaks only one consumer; small blast radius.
- Both consumers pin `spoko-design-system@^1.38.x`, so semver-minor releases reach them automatically — Phase 1–4 work lands transparently.

### Verification target — Phase 1 done when:

1. `cd C:/Users/spoko/www/catalog.polo.blue && pnpm i && pnpm build` succeeds, bundle SHA matches pre-migration
2. `cd C:/Users/spoko/www/polo.blue && pnpm i && pnpm build` succeeds, bundle SHA matches pre-migration
3. `iconConfig`, `createSdsConfig` resolve unchanged
4. All 8 stable subpaths listed above still resolve

---

## Compatibility strategy

### What stays working immediately (catalog, polo.blue, etc.)
- `from 'spoko-design-system'` (barrel) — works through Phase 5
- `from 'spoko-design-system/components/Drawer.astro'` — aliased to `/astro/Drawer.astro` in exports map
- `from 'spoko-design-system/scripts/tooltips'` — unchanged path
- `from 'spoko-design-system/uno-config'` — unchanged
- `from 'spoko-design-system/styles/base/typography'` — unchanged

### What's the migration ask on consumers
Eventually (Phase 5):
```diff
- import { Button, Jumbotron } from 'spoko-design-system';
+ import Button from 'spoko-design-system/astro/Button.astro';
+ import Jumbotron from 'spoko-design-system/astro/Jumbotron.astro';
```

Codemod for catalog: ~1 hour to rewrite the 24 barrel imports.

---

## Release strategy

- **Semantic-release stays as-is.** Every Phase 1–3 PR is a `feat` (MINOR bump) or `chore` (no release). No breaking changes through Phase 4.
- **Phase 5 ships a major** (drop `index.ts` barrel + `./components/*` alias) — coordinated with all known consumers. Communicate via CHANGELOG + GitHub release notes.
- Each component split lands as one PR with: new files in new tree, shim in old tree, no consumer-visible change. CI passes if catalog/polo.blue example builds still succeed.

---

## Verification per phase

| Phase | Done when |
| --- | --- |
| 0 | This document committed; consumer import map snapshotted in `MIGRATION-CONSUMERS.md` |
| 1 | New dirs exist; new exports declared; `pnpm i` in catalog succeeds; `pnpm build` in catalog produces identical output to before |
| 2 | All interactive components have `scripts/X.ts` + `astro/X.astro` + `vue/X.vue`; shim in `components/X.astro` re-exports; docs page demos work in both Vue and Astro variants side-by-side |
| 3 | All components moved to new tree; `src/components/` contains only shims |
| 4 | `examples/react/` builds and renders the same look as `examples/astro/` |
| 5 | All listed consumers (catalog, polo.blue, …) migrated to subpath imports; `index.ts` removed; major version published |
| 6 | `dist/sds.css` published in npm; Python/HTML example loads it and renders a button + card correctly |

---

## Open questions

1. **Versioning model.** Stay single-package with semantic-release, or split into `@sds/core` + `@sds/vue` + `@sds/react` workspaces? Recommendation: **stay single-package** — overhead of multi-package release isn't worth it given ~20 components.

2. **TypeScript types per framework.** Vue + React have different prop shapes (`onClick` vs `@click`). Each wrapper file owns its own types — `scripts/toggle.ts` exports a framework-neutral `ToggleOptions` that both consume.

3. **Tree-shaking.** With subpath exports + ESM, every consumer's bundler only pulls what's imported. Vite handles this already — verify with `pnpm build` in catalog (bundle size diff before/after) at end of Phase 1.

4. **Vue + Astro coexistence in one project.** A consumer like catalog (Astro + a few Vue islands) will install both `astro` and `vue` peers — that's expected, no change.

5. **React SSR.** React wrappers must work in both CSR (Next.js client component) and SSR (Next.js server component, after Phase 6 once SSR-safe init is verified). Plan: ship wrappers as `'use client'` first, add server variants later if demand exists.
