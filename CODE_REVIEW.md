# Code review rules

Review rules for the Spoko Design System (`spoko-design-system` on npm). They apply to human reviewers and to the `om-code-review` / `om-auto-review-pr` skills, which read this file automatically. `CLAUDE.md` holds the architecture background; `BACKWARD_COMPATIBILITY.md` lists the protected surfaces.

## Review priorities

Review in this order and stop treating lower items as blocking while a higher one is open:

1. **Correctness** — the component renders and behaves as documented in both contexts this repo serves: the Astro docs site (`src/pages/`) and the npm package consumed through `index.ts` and the subpath exports.
2. **Contracts** — no unannounced change to a surface listed in `BACKWARD_COMPATIBILITY.md` (exports, props, slots, UnoCSS shortcut names, theme tokens, `createSdsConfig()`).
3. **Accessibility** — WCAG 2.2 AA is the bar (see the checks below). A regression here is a blocker, not a nit.
4. **Security** — no `v-html` / `set:html` / `innerHTML` on consumer- or user-controlled strings without a reason in the PR; no secrets; no new remote origins outside the whitelisted image domains in `astro.config.mjs`.
5. **Quality** — conventions below, readable code, docs updated.

## Repo-specific checks

### Package and exports

- Components are exported from the root `index.ts` with `./src/...` paths, never from `src/`.
- **An `.astro` component with a `<script>` tag must not be exported from `index.ts`.** Astro hoists every exported component's script onto every consumer page ([withastro/astro#6906](https://github.com/withastro/astro/issues/6906)). Such components ship only through the `./components/*` subpath. Currently excluded: `ButtonCopy`, `CategoryDetails`, `LanguageSuggestion`. A PR adding a `<script>` to an already-exported component must move it out of the barrel (a breaking change — see `BACKWARD_COMPATIBILITY.md`).
- New components get a docs page in `src/pages/components/<name>.mdx` and a sidebar entry in `src/config.ts`.

### Styling (UnoCSS)

- Theme changes live in `uno-config/theme/`, shortcuts in `uno-config/theme/shortcuts/<category>.ts`. Never edit the root `uno.config.ts` wrapper.
- Colour changes to `uno-config/theme/colors.ts` must be mirrored in `src/design.config.ts` and the generated `src/styles/tokens.css` (`pnpm build:tokens`).
- Prefer theme tokens (`text-blue-medium`, `bg-accent-deepBlue`) over raw hex values; a raw colour needs a comment with its contrast ratio.
- Changing a shortcut changes every consumer that uses it — check the docs pages that render it in both light and dark mode.
- A white or light surface must set its own text colour (it is rendered inside dark mode too); every `text-*` colour class on themed content needs a `dark:` counterpart.

### Icons

- An icon used through `astro-icon` must be listed in `icon.config.ts` under its collection; UnoCSS `i-{collection}-{name}` classes need the collection imported in `uno-config/index.ts`.

### Accessibility (WCAG 2.2 AA)

- Text contrast ≥ 4.5:1 (≥ 3:1 for large text) and non-text contrast ≥ 3:1, in **both** colour schemes.
- Never remove the focus indicator: no `outline-none` / `focus:outline-none` without a `focus-visible:` replacement. The global ring is `:focus-visible` in `src/styles/base/base.css` (`--sds-focus-ring`, introduced in #522).
- Icon-only buttons and links have an accessible name (`aria-label`); decorative icons and images get `aria-hidden="true"` / `alt=""`. Visible text must be contained in the accessible name (2.5.3).
- Toggles expose state (`aria-pressed`, `aria-expanded`, `aria-checked`) and keep it in sync in their script; active links get `aria-current="page"`.
- Dynamic feedback (copied, search results, validation errors) goes through a `role="status"` / `role="alert"` region; form errors are tied to their field with `aria-describedby` + `aria-invalid`.
- Dialogs have an accessible name; native `<dialog>` with `showModal()` is preferred.
- Interactive targets are at least 24×24 CSS px (2.5.8).
- Animations respect `prefers-reduced-motion` and anything that moves or auto-dismisses can be paused or stops within 5 s.
- Repeated landmarks on one page have unique names.

### Vue and Astro components

- Vue: `<script setup lang="ts">` with typed props; interactive state lives in Vue components, static markup in Astro.
- Astro client scripts must be idempotent across View Transitions: guard with a `data-*-bound`/init flag and re-run on `astro:page-load` (see the dark-mode toggle regression in `tests/dark-mode-toggle.spec.ts`).
- `<button>` elements declare `type`; `Button.vue` defaults to `type="button"` (since #522), so a submit button must pass `type="submit"` explicitly.
- Code comments are in English.

### Commits and releases

- Conventional Commits are mandatory (`commitlint.config.js`); the type decides the semantic-release version bump. `feat` → minor, `fix`/`perf`/`refactor`/`style`/`docs` → patch, a `BREAKING CHANGE:` footer → major. A breaking change without that footer is a blocker.

## Validation gate

The PR must pass, in order: `pnpm run format:check`, `pnpm run lint`, `pnpm run check`, `pnpm run build` (mirrors `.github/workflows/code-quality.yml`). For behaviour covered by `tests/*.spec.ts`, run `pnpm test:e2e`.

## Severity guidance

| Severity | Examples |
|---|---|
| **Blocker** | Broken render or build; a protected surface changed without the `BACKWARD_COMPATIBILITY.md` path; a `<script>` component added to `index.ts`; a WCAG 2.2 AA regression (lost focus ring, contrast below the minimum, unnamed control); unsafe `v-html` on untrusted input. |
| **Major** | Missing `dark:` variant on new themed content; new component without docs page or sidebar entry; shortcut change not checked on its docs pages; non-idempotent client script. |
| **Minor** | Naming, comment wording, raw hex where a token exists, docs example drift. |
| **Nit** | Formatting Prettier did not catch, wording preferences. |
