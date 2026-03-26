## [1.37.4](https://github.com/polo-blue/sds/compare/v1.37.3...v1.37.4) (2026-03-26)

## [1.37.3](https://github.com/polo-blue/sds/compare/v1.37.2...v1.37.3) (2026-03-26)

## [1.37.2](https://github.com/polo-blue/sds/compare/v1.37.1...v1.37.2) (2026-03-26)

## [1.37.1](https://github.com/polo-blue/sds/compare/v1.37.0...v1.37.1) (2026-03-26)

## [1.37.0](https://github.com/polo-blue/sds/compare/v1.36.1...v1.37.0) (2026-03-26)

### Features

* add updateTooltipContent export and migrate ButtonCopy to SDS tooltip ([#414](https://github.com/polo-blue/sds/issues/414)) ([d6d7f28](https://github.com/polo-blue/sds/commit/d6d7f289c4d8a1ce28b7b00df9dad8d45612f20a))

## [1.36.1](https://github.com/polo-blue/sds/compare/v1.36.0...v1.36.1) (2026-03-24)

## [1.36.0](https://github.com/polo-blue/sds/compare/v1.35.1...v1.36.0) (2026-03-24)

### Features

* add interactive tooltip mode ([#410](https://github.com/polo-blue/sds/issues/410)) ([473a586](https://github.com/polo-blue/sds/commit/473a5869a765af1b347b2e909f4019bacf3255fd))

## [1.35.1](https://github.com/polo-blue/sds/compare/v1.35.0...v1.35.1) (2026-03-24)

### Bug Fixes

* tooltip listeners lost after Astro View Transitions ([#409](https://github.com/polo-blue/sds/issues/409)) ([4fe9dd4](https://github.com/polo-blue/sds/commit/4fe9dd4d80a15edad47c277c233fb153072a2619))

## [1.35.0](https://github.com/polo-blue/sds/compare/v1.34.26...v1.35.0) (2026-03-24)

### ⚠ BREAKING CHANGES

* data-tippy-content attribute renamed to data-sds-tooltip.
Consumers must update their templates and remove tippy.js dependency.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

* fix: prevent listener duplication on View Transitions, remove dead file

- Don't reset `initialized` in cleanup() — document.body persists
  across Astro View Transitions, so existing event listeners continue
  to work on swapped content without re-attachment
- Delete unused tippy-theme.css (replaced by sds-tooltip.css)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

* fix: validate data-sds-tooltip-placement attribute value

Validate placement attribute against known Floating UI placements
instead of casting directly. Falls back to 'top' for invalid values.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

### Features

* replace tippy.js with Floating UI for tooltip system ([#408](https://github.com/polo-blue/sds/issues/408)) ([8ef2226](https://github.com/polo-blue/sds/commit/8ef2226fa3409a7925f0ac3a5cc7d783c6d51585))

## [1.34.17](https://github.com/polo-blue/sds/compare/v1.34.16...v1.34.17) (2026-03-23)

### Bug Fixes

* add gap to tooltip header to prevent badge overlap ([344f61c](https://github.com/polo-blue/sds/commit/344f61c7280489d89fff657c61a52438df906b37))

## [1.34.16](https://github.com/polo-blue/sds/compare/v1.34.15...v1.34.16) (2026-03-22)

### Bug Fixes

* use pointer-events:none on gallery images instead of ::before overlay ([fb77b2e](https://github.com/polo-blue/sds/commit/fb77b2e5b5dabdcd11159d355058a51fc97601a0))

## [1.34.15](https://github.com/polo-blue/sds/compare/v1.34.14...v1.34.15) (2026-03-22)

### Bug Fixes

* add flex-shrink-0 and bg to gallery slides to prevent bleed ([548c1ce](https://github.com/polo-blue/sds/commit/548c1cec35005040444dbefc696357abf3e10f19))
* pixel-perfect slide widths via CSS variable (prevents subpixel bleed) ([d609b86](https://github.com/polo-blue/sds/commit/d609b86d40c2656741642a1f7d7f95513c9753ae))
* prevent multi-slide skip on mobile swipe ([0e01c1c](https://github.com/polo-blue/sds/commit/0e01c1c4db02b60b0dd95a2b32fbca122f7313e9))
* use object-contain instead of object-cover on gallery slides ([3b1fd5d](https://github.com/polo-blue/sds/commit/3b1fd5d0506b7d727f943b3229fa79b7638f8990))
* use scroll-snap-align start to prevent subpixel slide bleed ([2ef6944](https://github.com/polo-blue/sds/commit/2ef69441a471dd7ae1134ed397926240187d9e25))

## [1.34.14](https://github.com/polo-blue/sds/compare/v1.34.13...v1.34.14) (2026-03-19)

### Bug Fixes

* add border-width and border-style reset to preflight ([f90d747](https://github.com/polo-blue/sds/commit/f90d74773163b8fbb6b67d9bb285e931bff09cd9))
* add border-width and border-style reset to preflight ([6372262](https://github.com/polo-blue/sds/commit/6372262fd8d4840c0b3871c690550d39e77a3e38))

## [1.34.12](https://github.com/polo-blue/sds/compare/v1.34.11...v1.34.12) (2026-03-19)

### Bug Fixes

* scope scrollbar styles to body only ([#394](https://github.com/polo-blue/sds/issues/394)) ([32bed55](https://github.com/polo-blue/sds/commit/32bed55b58120b5eceb806a6af804f911b78cc59))

## [1.34.11](https://github.com/polo-blue/sds/compare/v1.34.10...v1.34.11) (2026-03-19)

### Bug Fixes

* prevent gallery thumbnail scrollIntoView from scrolling page ([#391](https://github.com/polo-blue/sds/issues/391)) ([d55fa92](https://github.com/polo-blue/sds/commit/d55fa92390324e5df561ecac30a56ae553b4dce7))

## [1.34.9](https://github.com/polo-blue/sds/compare/v1.34.8...v1.34.9) (2026-03-18)

### Bug Fixes

* remove global scroll-behavior: smooth from html ([#390](https://github.com/polo-blue/sds/issues/390)) ([bdaeb4a](https://github.com/polo-blue/sds/commit/bdaeb4a45b703896e5ba3dc65f177174d89d3ff4))

## [1.34.8](https://github.com/polo-blue/sds/compare/v1.34.7...v1.34.8) (2026-03-17)

### Bug Fixes

* **ProductGallery:** remove fixed width/height on dialog zoom img to prevent overflow ([a24e4f5](https://github.com/polo-blue/sds/commit/a24e4f59deca0d04b854c3fd37676e495df46be4))

## [1.34.7](https://github.com/polo-blue/sds/compare/v1.34.6...v1.34.7) (2026-03-17)

### Bug Fixes

* **ProductGallery:** clear transform-origin on zoom out and dialog close ([833fc60](https://github.com/polo-blue/sds/commit/833fc60fd23517427ebd41bf91915519a5fb73d6))
* **ProductGallery:** prevent dialog overflow after View Transitions ([f794d17](https://github.com/polo-blue/sds/commit/f794d173ffe30a703d0f91dbdb76faa9e8b68c23))
* **ProductGallery:** remove static transform-origin, use explicit max constraints on zoom img ([33658f3](https://github.com/polo-blue/sds/commit/33658f3430975864931a94c36e8befabe6382bf7))

## [1.34.6](https://github.com/polo-blue/sds/compare/v1.34.5...v1.34.6) (2026-03-17)

### Bug Fixes

* **ProductGallery:** use border-color instead of opacity for thumbnails ([1e4be46](https://github.com/polo-blue/sds/commit/1e4be4608c33969d8ab919d913bb352cccf3398a))

## [1.34.5](https://github.com/polo-blue/sds/compare/v1.34.4...v1.34.5) (2026-03-17)

### Bug Fixes

* **ProductGallery:** dialog topbar as transparent overlay with hover reveal ([44eb728](https://github.com/polo-blue/sds/commit/44eb728330db7a588992e6de0eb80315b59a0535))

## [1.34.4](https://github.com/polo-blue/sds/compare/v1.34.3...v1.34.4) (2026-03-17)

### Bug Fixes

* **ProductGallery:** hide disabled dialog arrows, improve active visibility ([855d016](https://github.com/polo-blue/sds/commit/855d01609c13e17812c4c8f97f49cc29701580fb))

## [1.34.3](https://github.com/polo-blue/sds/compare/v1.34.2...v1.34.3) (2026-03-17)

### Bug Fixes

* **ProductGallery:** constrain dialog image height to viewport (no vertical scroll) ([cc64848](https://github.com/polo-blue/sds/commit/cc64848ee16340a6785fc40746fe47210f7d26c6))

## [1.34.2](https://github.com/polo-blue/sds/compare/v1.34.1...v1.34.2) (2026-03-17)

### Bug Fixes

* **ProductGallery:** improve dialog arrow and thumbnail visibility ([42a85d2](https://github.com/polo-blue/sds/commit/42a85d270202d62951497ca07f6b571d93a484a3))

## [1.34.1](https://github.com/polo-blue/sds/compare/v1.34.0...v1.34.1) (2026-03-17)

### Bug Fixes

* set btn-navigation to 44px (h-11 w-11) ([b178474](https://github.com/polo-blue/sds/commit/b178474575a3624adc35cdb3d168a9c248bf3205))

## [1.34.0](https://github.com/polo-blue/sds/compare/v1.33.5...v1.34.0) (2026-03-17)

### ⚠ BREAKING CHANGES

* **ProductGallery:** ProductGallery no longer self-initializes. Consumers must
add their own <script> importing initProductGallery.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

### Features

* **ProductGallery:** separate script from template for Astro 6 compat ([c1caf9d](https://github.com/polo-blue/sds/commit/c1caf9dcd4c98cd7d408014ca1354a651f1bd4bf))

## [1.33.5](https://github.com/polo-blue/sds/compare/v1.33.4...v1.33.5) (2026-03-17)

### Bug Fixes

* **ProductGallery:** use arrowStyle chevrons in dialog navigation ([7720753](https://github.com/polo-blue/sds/commit/77207538b859cc6dc533eebcef196d0d416081a0))

## [1.33.4](https://github.com/polo-blue/sds/compare/v1.33.3...v1.33.4) (2026-03-17)

### Bug Fixes

* **ProductGallery:** slide-in arrows from sides on hover ([eb25e43](https://github.com/polo-blue/sds/commit/eb25e435111b8fc3cec7328ea0444676084579f5))

## [1.33.3](https://github.com/polo-blue/sds/compare/v1.33.2...v1.33.3) (2026-03-17)

### Bug Fixes

* **ProductGallery:** hide pagination counter until hover ([db3cedd](https://github.com/polo-blue/sds/commit/db3cedde7672d084858e43b8349e7ee9517e98d9))

## [1.33.2](https://github.com/polo-blue/sds/compare/v1.33.1...v1.33.2) (2026-03-17)

### Bug Fixes

* **ProductGallery:** center pagination counter with rounded-full pill style ([c246fe9](https://github.com/polo-blue/sds/commit/c246fe9e4137376a6a18f37aa359eb36d5e27231))

## [1.33.1](https://github.com/polo-blue/sds/compare/v1.33.0...v1.33.1) (2026-03-17)

### Bug Fixes

* **ProductGallery:** reduce gallery arrow buttons to 44px (w-11 h-11) ([771f427](https://github.com/polo-blue/sds/commit/771f427d2d30e3da2073afd61ead7f874079ff73))

## [1.33.0](https://github.com/polo-blue/sds/compare/v1.32.1...v1.33.0) (2026-03-17)

### Features

* **ProductGallery:** add arrowStyle prop with chevron variants ([c38a93d](https://github.com/polo-blue/sds/commit/c38a93d41044ebdf232ee22c1d7b93a5a488ca02))

## [1.32.1](https://github.com/polo-blue/sds/compare/v1.32.0...v1.32.1) (2026-03-17)

### Bug Fixes

* **ProductGallery:** reduce pagination counter height on desktop ([d337dfe](https://github.com/polo-blue/sds/commit/d337dfeafca87322bbe677d3e0c928f8336b2521))

## [1.32.0](https://github.com/polo-blue/sds/compare/v1.31.0...v1.32.0) (2026-03-17)

### Features

* **ProductGallery:** use btn-gallery-arrow shortcut for navigation ([4bbb527](https://github.com/polo-blue/sds/commit/4bbb5276d5bbffb4a272254cca333ab44a6a4abc))

## [1.31.0](https://github.com/polo-blue/sds/compare/v1.30.1...v1.31.0) (2026-03-17)

### Features

* upgrade to Astro 6 and update all dependencies ([41da8e9](https://github.com/polo-blue/sds/commit/41da8e900afacb7a6c97f54795c1d540ff852fb4))

### Bug Fixes

* add .nvmrc for Netlify to use Node 22 (required by Astro 6) ([d02994b](https://github.com/polo-blue/sds/commit/d02994b3f787fa26928d0f68b03724aeb09ce108))
* **ProductGallery:** add explicit initial state sync on init ([370fac9](https://github.com/polo-blue/sds/commit/370fac94aaa308a34b42c03e9e17b104d03955d1))
* add netlify.toml with NODE_VERSION=22 for Astro 6 ([623d36a](https://github.com/polo-blue/sds/commit/623d36a46f08baa6eb4d1493db94b8a4d4055fc3))
* **ci:** align pnpm version in deploy workflow with package.json ([56dbed8](https://github.com/polo-blue/sds/commit/56dbed8aeb4afe3f69d0b8e97be9ad1089bead80))
* **deps:** align unocss version in devDependencies to 66.6.6 ([40e3302](https://github.com/polo-blue/sds/commit/40e3302b447bc1ad01a5902251aa92549a3b718d))
* disable @playform/inline — strips responsive CSS in Astro 6 ([aa9fbb6](https://github.com/polo-blue/sds/commit/aa9fbb6f1f566a982bf029127c131c8d029edc56))
* **ProductGallery:** flatten CSS nesting for Astro scoped styles ([e01308d](https://github.com/polo-blue/sds/commit/e01308d398779877e8af73bed15362bbad222209))
* move CSS import to frontmatter for Astro 6 compatibility ([0c42d62](https://github.com/polo-blue/sds/commit/0c42d629aa67ca2500e4600e0b2acc69e9f85b7d))
* **ProductGallery:** unify arrow navigation style between gallery and zoom ([f6e99d3](https://github.com/polo-blue/sds/commit/f6e99d3e3318a2557e4c3c1d4f59f6cd10155803))
* **ProductGallery:** use opacity instead of translate for arrow reveal ([9696f12](https://github.com/polo-blue/sds/commit/9696f1203294eceb26f172a25b00934c4ee4e762))

## [1.30.1](https://github.com/polo-blue/sds/compare/v1.30.0...v1.30.1) (2026-03-11)

### Bug Fixes

* **deps:** update unocss monorepo to v66.6.6 ([f69a7da](https://github.com/polo-blue/sds/commit/f69a7da9caf311fee8ce47311675ee7a3597ed61))

## [1.30.0](https://github.com/polo-blue/sds/compare/v1.29.0...v1.30.0) (2026-03-11)

### Features

* add ProductGallery to sidebar navigation ([8503c88](https://github.com/polo-blue/sds/commit/8503c88da2eba1049f8344025679e0ff276e7406))

### Bug Fixes

* add drag-to-scroll in dialog and prevent zoom on drag ([c1ffee9](https://github.com/polo-blue/sds/commit/c1ffee93dacd42f24fe6f151e05e79dd5cc4015b))
* clear drag timeout on re-entry, add window pointerup cleanup ([0f07629](https://github.com/polo-blue/sds/commit/0f07629f5bfbb56e59f0513df0d443da95e27556))
* move setPointerCapture to drag threshold to restore click events ([21c8d1d](https://github.com/polo-blue/sds/commit/21c8d1de49f73ff77e37eb640654e9dc8719472f))
* open dialog at correct slide by disabling snap during initial scroll ([9b520f0](https://github.com/polo-blue/sds/commit/9b520f09242a6275e326a7f3c6aa75edcdd3162c))

## [1.29.0](https://github.com/polo-blue/sds/compare/v1.28.2...v1.29.0) (2026-03-10)

### Features

* add ProductGallery component with CSS scroll-snap slider and zoom ([6e4926b](https://github.com/polo-blue/sds/commit/6e4926b798c668fa22c52db6db79596b8f309195))

### Bug Fixes

* add cursor-zoom-out to UnoCSS theme ([890f281](https://github.com/polo-blue/sds/commit/890f281b4e64e3674ee7bb105c2d7f4f9d835343))
* add keyboard navigation to main slider and reduce thumb scrollbar padding ([bbf949c](https://github.com/polo-blue/sds/commit/bbf949c62e224c07005394a65c38ceae6aea1756))
* add prefers-reduced-motion and improve aria-labels with image.alt ([c47945b](https://github.com/polo-blue/sds/commit/c47945bc851607d8ad60b1a70412520146f767dc))
* address all review comments on ProductGallery PR ([6134f50](https://github.com/polo-blue/sds/commit/6134f50d7539995003168f5d9d7b01a229114ac5))
* address Copilot re-review comments ([0795a2c](https://github.com/polo-blue/sds/commit/0795a2cb100577c353613c28008dd83fba2638b7))
* address Copilot re-review feedback on gallery and eslint config ([56edbb1](https://github.com/polo-blue/sds/commit/56edbb15e38609829897ffaee5c7165ef43e7a70))

## [1.28.2](https://github.com/polo-blue/sds/compare/v1.28.1...v1.28.2) (2026-03-08)

### ⚠ BREAKING CHANGES

* ButtonCopy, CategoryDetails, and LanguageSuggestion
are no longer available from the barrel import. Use direct subpath
imports instead:
  import ButtonCopy from 'spoko-design-system/components/ButtonCopy.astro'
  import CategoryDetails from 'spoko-design-system/components/Category/CategoryDetails.astro'
  import LanguageSuggestion from 'spoko-design-system/components/LanguageSuggestion.astro'

### Bug Fixes

* remove Astro components with <script> tags from barrel file ([36f36c2](https://github.com/polo-blue/sds/commit/36f36c2316aeb0a6248f4fe62450d730e9f9dac8))

## [1.28.1](https://github.com/polo-blue/sds/compare/v1.28.0...v1.28.1) (2026-03-07)

### Bug Fixes

* **homepage:** reduce CLS with font preloading and layout stabilization ([32d08f5](https://github.com/polo-blue/sds/commit/32d08f5b84c8b17f209073eaab7e6030f9dc53f9))

## [1.28.0](https://github.com/polo-blue/sds/compare/v1.27.3...v1.28.0) (2026-03-04)

### Features

* **ProductDetailsList:** support individual link items in comprehensive ([459aae7](https://github.com/polo-blue/sds/commit/459aae745cc11c73ab4574cfa3d7f22f34ac7aed))

## [1.27.3](https://github.com/polo-blue/sds/compare/v1.27.2...v1.27.3) (2026-03-04)

### Bug Fixes

* **ButtonCopy:** prevent double-click race condition and View Transitions duplicate listeners ([3a3456d](https://github.com/polo-blue/sds/commit/3a3456d4a267330a2090801260ab0ccbea704a38))

## [1.27.2](https://github.com/polo-blue/sds/compare/v1.27.1...v1.27.2) (2026-03-03)

### Bug Fixes

* change font-display from fallback to swap for all fonts ([874fa35](https://github.com/polo-blue/sds/commit/874fa35b05ccb65f55768f0bab4268fac77c92ca))

## [1.27.1](https://github.com/polo-blue/sds/compare/v1.27.0...v1.27.1) (2026-03-03)

### ⚠ BREAKING CHANGES

* ButtonCopy is no longer rendered automatically when `big` prop is set.
Use the `after-number` slot to add ButtonCopy on PDP pages.

### Code Refactoring

* remove ButtonCopy from ProductNumber ([96c80b5](https://github.com/polo-blue/sds/commit/96c80b5ee1919b43418dfd27f43c2b2b78e33224))

## [1.27.0](https://github.com/polo-blue/sds/compare/v1.26.4...v1.27.0) (2026-02-25)

### Features

* add 2-column grid layout for view-list on 4xl screens ([5e692d0](https://github.com/polo-blue/sds/commit/5e692d0aa9d954fe4a714b193fc829ca8b139766))

### Bug Fixes

* add md:block to view-list shortcut ([d30a715](https://github.com/polo-blue/sds/commit/d30a715d38bb82f1ea65b4ad9e1c508fdf372621))

## [1.26.4](https://github.com/polo-blue/sds/compare/v1.26.3...v1.26.4) (2026-02-23)

### Bug Fixes

* restore product-thumb--related, add product-thumb--tile ([#346](https://github.com/polo-blue/sds/issues/346)) ([18cd582](https://github.com/polo-blue/sds/commit/18cd58261a12b631d8de70c664d6fd7e8fc50056))

## [1.26.3](https://github.com/polo-blue/sds/compare/v1.26.2...v1.26.3) (2026-02-23)

## [1.26.2](https://github.com/polo-blue/sds/compare/v1.26.1...v1.26.2) (2026-02-23)

### Bug Fixes

* **nav:** increase nav-link padding for better touch targets ([841d154](https://github.com/polo-blue/sds/commit/841d15400af0ebdbde14e9e03306a9e361266173))

## [1.26.1](https://github.com/polo-blue/sds/compare/v1.26.0...v1.26.1) (2026-02-22)

### Bug Fixes

* **CategoryDetails:** prevent sidebar flash during view transitions ([597dceb](https://github.com/polo-blue/sds/commit/597dceb0b1e0dfc8b404d63f63bb75b4a236d191))

## [1.26.0](https://github.com/polo-blue/sds/compare/v1.25.1...v1.26.0) (2026-02-04)

### Features

* **a11y:** add aria-expanded to sidebar toggle button ([ae737e3](https://github.com/polo-blue/sds/commit/ae737e39d2fca57edca87171ea4d730c9cee33c3))

## [1.25.1](https://github.com/polo-blue/sds/compare/v1.25.0...v1.25.1) (2026-01-19)

### Bug Fixes

* **CategoryDetails:** prevent horizontal page scroll on mobile ([e922d7f](https://github.com/polo-blue/sds/commit/e922d7f3876bea195bba47a4cfefb1efd73cae84))

## [1.25.0](https://github.com/polo-blue/sds/compare/v1.24.3...v1.25.0) (2026-01-18)

### ⚠ BREAKING CHANGES

* **colors:** Color values changed from HEX to OKLCH format. Projects using
raw color values from theme may need to update. CSS variable --clr-* removed.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Features

* **colors:** migrate color system from HEX to OKLCH ([d95551a](https://github.com/polo-blue/sds/commit/d95551a4f9124bace33885dbd7aef5cd82235111))

## [1.24.3](https://github.com/polo-blue/sds/compare/v1.24.2...v1.24.3) (2026-01-18)

### Bug Fixes

* **Breadcrumbs:** remove explicit class prop to restore Vue attribute fallthrough ([aeb614b](https://github.com/polo-blue/sds/commit/aeb614b703a39b812a60cf7c769f19f44a57d8e0))

## [1.24.2](https://github.com/polo-blue/sds/compare/v1.24.1...v1.24.2) (2026-01-13)

### Bug Fixes

* improve TypeScript types for Breadcrumbs and Jumbotron ([d671a1a](https://github.com/polo-blue/sds/commit/d671a1ab1851f7e0eb138863a7a9dd05be9bea8e))

## [1.24.1](https://github.com/polo-blue/sds/compare/v1.24.0...v1.24.1) (2025-12-22)

### Bug Fixes

* **uno-config:** add circle-flags to safelist and Vue :class extractor ([672086a](https://github.com/polo-blue/sds/commit/672086a55b021eaa1ef30807068f7e1f645d39f2))

## [1.24.0](https://github.com/polo-blue/sds/compare/v1.23.2...v1.24.0) (2025-12-16)

### Features

* export useFormatProductNumber utility ([4e585e4](https://github.com/polo-blue/sds/commit/4e585e4bf500049f1ab8e325ae7a0daa6dd2ade6))

## [1.23.2](https://github.com/polo-blue/sds/compare/v1.23.1...v1.23.2) (2025-12-16)

### Bug Fixes

* **category:** add itemprop url to CategoryTile link ([1f4831d](https://github.com/polo-blue/sds/commit/1f4831de8551395509c74dac7fe7b883f5a2d4d7))

## [1.23.1](https://github.com/polo-blue/sds/compare/v1.23.0...v1.23.1) (2025-12-15)

### Bug Fixes

* **header:** correct WPHeader microdata and improve semantics ([a37a26e](https://github.com/polo-blue/sds/commit/a37a26ef62a29e3e327076d715e2989102e4d60b))

## [1.23.0](https://github.com/polo-blue/sds/compare/v1.22.0...v1.23.0) (2025-12-15)

### Features

* **breadcrumbs:** add withMicrodata prop to control Schema.org rendering ([0ca52cc](https://github.com/polo-blue/sds/commit/0ca52cccb90a30f532cdb381e428480f59a6d433))

## [1.22.0](https://github.com/polo-blue/sds/compare/v1.21.1...v1.22.0) (2025-12-15)

### Features

* **category:** add withMicrodata prop to control Schema.org rendering ([95c96cd](https://github.com/polo-blue/sds/commit/95c96cd71ec15a233432abec2d0c0f109ccd8f5d))

## [1.21.1](https://github.com/polo-blue/sds/compare/v1.21.0...v1.21.1) (2025-12-15)

### Bug Fixes

* **category:** correct SiteNavigationElement microdata structure to expose URLs ([e73b18b](https://github.com/polo-blue/sds/commit/e73b18ba01e870234e3103b6658ff6893d831877))

## [1.21.0](https://github.com/polo-blue/sds/compare/v1.20.1...v1.21.0) (2025-12-15)

### Features

* **category:** enhance CategoriesCarousel with Schema.org microdata ([903d81b](https://github.com/polo-blue/sds/commit/903d81b24c80d44f118e79c5496e9ea928b0e171))

## [1.20.1](https://github.com/polo-blue/sds/compare/v1.20.0...v1.20.1) (2025-12-15)

## [1.20.0](https://github.com/polo-blue/sds/compare/v1.19.0...v1.20.0) (2025-12-14)

### Features

* **category:** add microdata and update dependencies ([f5eadf3](https://github.com/polo-blue/sds/commit/f5eadf370bec9e8ef9ad2934e714302cd3e5d24d))

## [1.19.0](https://github.com/polo-blue/sds/compare/v1.18.1...v1.19.0) (2025-12-10)

### Features

* **Jumbotron:** update typography and add bold font styling ([f759405](https://github.com/polo-blue/sds/commit/f7594051ea024af5e404a7d4dd255c4f033d4323))

## [1.18.1](https://github.com/polo-blue/sds/compare/v1.18.0...v1.18.1) (2025-12-08)

### Bug Fixes

* correct case sensitivity in CallToAction export path ([9aeb7d3](https://github.com/polo-blue/sds/commit/9aeb7d3876430c68983d62fdafe476c9290d341b))

## [1.18.0](https://github.com/polo-blue/sds/compare/v1.17.0...v1.18.0) (2025-12-07)

### Features

* **icons:** add bi:arrow-right-short icon ([edf3039](https://github.com/polo-blue/sds/commit/edf30393b8594cd50848aa7b38e0a84d2cc43a87))

## [1.17.0](https://github.com/polo-blue/sds/compare/v1.16.2...v1.17.0) (2025-12-07)

### Features

* **Jumbotron:** add split and slim props to PostSplit variant ([831969f](https://github.com/polo-blue/sds/commit/831969ff0a3bacdfde8eeb0d33b84d518bff836f))

## [1.16.2](https://github.com/polo-blue/sds/compare/v1.16.1...v1.16.2) (2025-12-07)

### Bug Fixes

* **Jumbotron:** make align prop work correctly in PostSplit variant ([9e0f7df](https://github.com/polo-blue/sds/commit/9e0f7df15666c7af54c9709b6fe36f4845afaebd))

## [1.16.1](https://github.com/polo-blue/sds/compare/v1.16.0...v1.16.1) (2025-12-07)

### Bug Fixes

* **jumbotron:** restore original PostSplit padding and layout ([f4a7dea](https://github.com/polo-blue/sds/commit/f4a7dea75b5d10586f42a0d2cb0e5dade961d134))

## [1.16.0](https://github.com/polo-blue/sds/compare/v1.15.0...v1.16.0) (2025-12-07)

### Features

* **Jumbotron:** add small prop to Hero variant ([70f9280](https://github.com/polo-blue/sds/commit/70f9280a4ed8d167cd3ae16ceaebb544a99de85e))

## [1.15.0](https://github.com/polo-blue/sds/compare/v1.14.2...v1.15.0) (2025-12-07)

### Features

* **Jumbotron:** add imageClass prop for responsive image sizing ([56d6392](https://github.com/polo-blue/sds/commit/56d6392721eb3bd7509d5b064cb00d4b81aa6d9c))

## [1.14.2](https://github.com/polo-blue/sds/compare/v1.14.1...v1.14.2) (2025-12-07)

### Bug Fixes

* **jumbotron:** make description margin conditional per variant ([6c8e59d](https://github.com/polo-blue/sds/commit/6c8e59d813aa512f210503f4ac9facfb3f9b23d6))

## [1.14.1](https://github.com/polo-blue/sds/compare/v1.14.0...v1.14.1) (2025-12-07)

### Bug Fixes

* **jumbotron:** fix description order in PostSplit variant ([679a45e](https://github.com/polo-blue/sds/commit/679a45e3b7be9e39dd65691edf61bc5564136881))

## [1.14.0](https://github.com/polo-blue/sds/compare/v1.13.3...v1.14.0) (2025-12-07)

### Features

* **jumbotron:** add description prop to PostSplit variant ([e1dca7a](https://github.com/polo-blue/sds/commit/e1dca7adec632a06253012b8bbe3f04b2d0cca24))

## [1.13.3](https://github.com/polo-blue/sds/compare/v1.13.2...v1.13.3) (2025-12-06)

### Bug Fixes

* **jumbotron:** remove xl:container from split-container ([9267b66](https://github.com/polo-blue/sds/commit/9267b6686cb4b00160a3ade4cfa26e81bc4f03ac))

## [1.13.2](https://github.com/polo-blue/sds/compare/v1.13.1...v1.13.2) (2025-12-06)

### Bug Fixes

* **jumbotron:** remove padding from split-container ([7f50a45](https://github.com/polo-blue/sds/commit/7f50a4580299b06ce7d37a6591b4efa874309ff2))

## [1.13.1](https://github.com/polo-blue/sds/compare/v1.13.0...v1.13.1) (2025-12-06)

### Bug Fixes

* **jumbotron:** remove ml-auto from split-content and add align prop docs ([43b4924](https://github.com/polo-blue/sds/commit/43b49244843d3cd9bb202ead0330d7f76737c120))

## [1.13.0](https://github.com/polo-blue/sds/compare/v1.12.1...v1.13.0) (2025-12-06)

### Features

* **jumbotron:** add align prop to PostSplit variant ([b3bd696](https://github.com/polo-blue/sds/commit/b3bd6967fca48eea0ca11d225c320e210bcf749e))

## [1.12.1](https://github.com/polo-blue/sds/compare/v1.12.0...v1.12.1) (2025-12-06)

### Bug Fixes

* **jumbotron:** add overflow-hidden and right alignment to split-image ([2545a89](https://github.com/polo-blue/sds/commit/2545a89bbc01bd262cbd4a56346ba3cca9ead619))

## [1.12.0](https://github.com/polo-blue/sds/compare/v1.11.5...v1.12.0) (2025-12-06)

### Features

* **jumbotron:** add imageWidth, imageHeight and fullWidth props to post-split variant ([6d6ce17](https://github.com/polo-blue/sds/commit/6d6ce17ae7ce3ec444fbce3f4bda0aec57eb2d05))

## [1.11.5](https://github.com/polo-blue/sds/compare/v1.11.4...v1.11.5) (2025-11-19)

### Bug Fixes

* **ci:** prevent concurrent GitHub Pages deployments ([7691c41](https://github.com/polo-blue/sds/commit/7691c417006711b3ec7b47300bbcc81abd303d3e))

## [1.11.4](https://github.com/polo-blue/sds/compare/v1.11.3...v1.11.4) (2025-11-19)

### Bug Fixes

* **sonar:** disable coverage requirements for design system ([8ce765b](https://github.com/polo-blue/sds/commit/8ce765bb55960a05f9e1f6ca29ef32e5d2d2cc63))

## [1.11.3](https://github.com/polo-blue/sds/compare/v1.11.2...v1.11.3) (2025-11-17)

## [1.11.2](https://github.com/polo-blue/sds/compare/v1.11.1...v1.11.2) (2025-10-30)

## [1.11.1](https://github.com/polo-blue/sds/compare/v1.11.0...v1.11.1) (2025-10-30)

### Bug Fixes

* **ProductEngine:** remove manual quote escaping causing double-encoding ([dfa196d](https://github.com/polo-blue/sds/commit/dfa196d812cd40e1b476bd28d814d2b158449d3c))

## [1.11.0](https://github.com/polo-blue/sds/compare/v1.10.0...v1.11.0) (2025-10-30)

### Features

* **tooltips:** export scripts and bundle CSS with tooltips ([57bdcf8](https://github.com/polo-blue/sds/commit/57bdcf8750bc763c9a7fb2f928aecfaa17cf4a34))

## [1.10.0](https://github.com/polo-blue/sds/compare/v1.9.3...v1.10.0) (2025-10-30)

### Features

* add commitlint and common issue checks to pre-commit ([20a2378](https://github.com/polo-blue/sds/commit/20a237883bd45dac8d80682ac003c54d06177037))

## [1.9.3](https://github.com/polo-blue/sds/compare/v1.9.2...v1.9.3) (2025-10-30)

### Bug Fixes

* auto-fix lint warnings and update eslint config ([dbead26](https://github.com/polo-blue/sds/commit/dbead26efdaaee60a9fc5764885ea4f4039040cc))

## [1.9.2](https://github.com/polo-blue/sds/compare/v1.9.1...v1.9.2) (2025-10-30)

### Bug Fixes

* improve prettier config and add comprehensive pre-commit checks ([847641e](https://github.com/polo-blue/sds/commit/847641e17566fa85a1fa5466b87a7028ae3287bb))

## [1.9.1](https://github.com/polo-blue/sds/compare/v1.9.0...v1.9.1) (2025-10-30)

### ⚠ BREAKING CHANGES

* ProductEngine and ProductEngines are now Astro components

Replace Vue components with Astro for better performance and SEO:
- Convert ProductEngine.vue to ProductEngine.astro (SSR-friendly)
- Convert ProductEngines.vue to ProductEngines.astro
- Add getEngineTooltipContent utility for tooltip generation
- Create global tooltip delegation script for performance
- Add tippy.js CSS to main.css (tippy.css + tippy-theme.css)

Benefits:
- Engine codes now in HTML for SEO (no client-side hydration)
- 1 global script handles all tooltips via delegation pattern
- Tooltips created on-demand when hovered (not on mount)
- Works for both engine codes and PR codes
- Massive performance improvement on pages with many engines

Migration:
- Remove client:load directive from ProductEngines usage
- Import and call initTooltips() in your layout
- ProductEngine/ProductEngines now pure Astro (no Vue)

### Code Refactoring

* migrate ProductEngine from Vue to Astro with tooltip delegation ([b3589cc](https://github.com/polo-blue/sds/commit/b3589cc75da9cbf514bcffce2d06a8a36d67012e))

## [1.9.0](https://github.com/polo-blue/sds/compare/v1.8.1...v1.9.0) (2025-10-29)

### Features

* **homepage:** refactor to use config-driven loops and responsive typography ([d97c659](https://github.com/polo-blue/sds/commit/d97c659e0e30d0a79234d8868371edac290608cf))

## [1.8.1](https://github.com/polo-blue/sds/compare/v1.8.0...v1.8.1) (2025-10-29)

### Bug Fixes

* **UnoCSS:** restore shortcuts functionality by re-enabling default extractors ([a9021a1](https://github.com/polo-blue/sds/commit/a9021a1c47cc1de0210d099bb9d9f61a6672228b))

## [1.8.0](https://github.com/polo-blue/sds/compare/v1.7.0...v1.8.0) (2025-10-29)

### Features

* **Headline:** add responsive design support and advanced features ([254d5d3](https://github.com/polo-blue/sds/commit/254d5d30f8eff673a48343270f0f23eb39ab7f95))

## [1.7.0](https://github.com/polo-blue/sds/compare/v1.6.0...v1.7.0) (2025-10-29)

### Features

* add Tippy.js tooltips with ProductEngine components and API-driven translations ([eb18a17](https://github.com/polo-blue/sds/commit/eb18a171a3e5d80889f64a645d82767898561764))

## [1.6.0](https://github.com/polo-blue/sds/compare/v1.5.3...v1.6.0) (2025-10-28)

### Features

* add accent.medium color ([#0082d6](https://github.com/polo-blue/sds/issues/0082d6)) to theme palette ([0cb1f3b](https://github.com/polo-blue/sds/commit/0cb1f3b095a745a4991e5062af5ee5d5679297c7)), closes [#0099da](https://github.com/polo-blue/sds/issues/0099da) [#0087c1](https://github.com/polo-blue/sds/issues/0087c1)

## [1.5.3](https://github.com/polo-blue/sds/compare/v1.5.2...v1.5.3) (2025-10-28)

### Bug Fixes

* remove brackets from combined PR code display ([aabb786](https://github.com/polo-blue/sds/commit/aabb78618f994dadac50605b708455ffbb5f21e5))

## [1.5.2](https://github.com/polo-blue/sds/compare/v1.5.1...v1.5.2) (2025-10-28)

### Bug Fixes

* improve combined PR code display and color handling ([e9bb13d](https://github.com/polo-blue/sds/commit/e9bb13d5500ba5ef0be527bf79b75e14fc49e6fe))

## [1.5.1](https://github.com/polo-blue/sds/compare/v1.5.0...v1.5.1) (2025-10-27)

### Bug Fixes

* remove deprecated Husky shebang for v10 compatibility ([c7addfb](https://github.com/polo-blue/sds/commit/c7addfb1834eb480ead83b3d275977b47683a94a))

## [1.5.0](https://github.com/polo-blue/sds/compare/v1.4.4...v1.5.0) (2025-10-27)

### Features

* refactor PR code components with dynamic tooltips and semantic categories ([27a776c](https://github.com/polo-blue/sds/commit/27a776c3e306f12cd69de49c33cb80521dac0090))

### Bug Fixes

* remove client-side sorting and simplify PR code components ([73b9760](https://github.com/polo-blue/sds/commit/73b9760f91505cf3f62e7a3549bc090622c10c94))
* remove computed variantClass and simplify PrCode component ([924aada](https://github.com/polo-blue/sds/commit/924aadae2699369eac850c9b18ba40f8f3193c91))
* update MDX examples and add defensive checks to ProductCodes ([4d8db14](https://github.com/polo-blue/sds/commit/4d8db14c329131556191c6863b9b9e852599d428))

## [1.4.4](https://github.com/polo-blue/sds/compare/v1.4.3...v1.4.4) (2025-10-26)

### Bug Fixes

* resolve vite-plugin-pwa peer dependency warning and update theme constants ([502f684](https://github.com/polo-blue/sds/commit/502f6846c12ef600213559d304336691e8953dd0))

## [1.4.3](https://github.com/polo-blue/sds/compare/v1.4.2...v1.4.3) (2025-10-26)

## [1.4.2](https://github.com/polo-blue/sds/compare/v1.4.1...v1.4.2) (2025-10-25)

### Bug Fixes

* resolve UnoCSS icon loading errors and add missing icons ([b5cb48f](https://github.com/polo-blue/sds/commit/b5cb48f06c03b616adce28efb36438411038574b))

## [1.4.1](https://github.com/polo-blue/sds/compare/v1.4.0...v1.4.1) (2025-10-20)

## [1.4.0](https://github.com/polo-blue/sds/compare/v1.3.7...v1.4.0) (2025-10-20)

### Features

* enhance components with flexible layouts and click-to-copy functionality ([3dfa718](https://github.com/polo-blue/sds/commit/3dfa718f7f4355c0beed4032e84d01a2c2c4a547))

## [1.3.7](https://github.com/polo-blue/sds/compare/v1.3.6...v1.3.7) (2025-10-08)

### Bug Fixes

* simplify CategoryDetails to use API paths directly ([28831c9](https://github.com/polo-blue/sds/commit/28831c9284c5e9ff484f7e51947cec95b2f41427))

## [1.3.6](https://github.com/polo-blue/sds/compare/v1.3.5...v1.3.6) (2025-10-07)

### Bug Fixes

* update CategoryDetails component ([1583a65](https://github.com/polo-blue/sds/commit/1583a65c10e7f38e1edfce79ac3bb90ab62fb29b))

## [1.3.5](https://github.com/polo-blue/sds/compare/v1.3.4...v1.3.5) (2025-10-07)

### Bug Fixes

* remove unused baseURL variable ([c0259f7](https://github.com/polo-blue/sds/commit/c0259f7c9ed0367c18e0c2dbfa34903d28abe49c))

## [1.3.4](https://github.com/polo-blue/sds/compare/v1.3.3...v1.3.4) (2025-10-07)

### Bug Fixes

* resolve Prettier parsing errors in CategoryDetails component ([75b309f](https://github.com/polo-blue/sds/commit/75b309f94dd77fe9cdf941f0f21ec1ec63e34dfc))

## [1.3.3](https://github.com/polo-blue/sds/compare/v1.3.2...v1.3.3) (2025-10-07)

### Bug Fixes

* prevent double rendering of links array with slot fallback ([ac7ec23](https://github.com/polo-blue/sds/commit/ac7ec2349b2098912ed27a303a7502c9a1c63678))

## [1.3.2](https://github.com/polo-blue/sds/compare/v1.3.1...v1.3.2) (2025-10-07)

## [1.3.1](https://github.com/polo-blue/sds/compare/v1.3.0...v1.3.1) (2025-10-05)

## [1.3.0](https://github.com/polo-blue/sds/compare/v1.2.2...v1.3.0) (2025-10-05)

### Features

* add Claude Code GitHub Action workflow ([eba488f](https://github.com/polo-blue/sds/commit/eba488fe781ebb3e7676dc7e6dfd30cf3130798a))

## [1.2.2](https://github.com/polo-blue/sds/compare/v1.2.1...v1.2.2) (2025-10-05)

## [1.2.1](https://github.com/polo-blue/sds/compare/v1.2.0...v1.2.1) (2025-10-05)

### Bug Fixes

* use pnpm/action-setup in all workflows for proper pnpm installation ([e4d8686](https://github.com/polo-blue/sds/commit/e4d868688214097350ac0a0bc9524660f8892013))

## [1.2.0](https://github.com/polo-blue/sds/compare/v1.1.17...v1.2.0) (2025-10-05)

### Features

* update icons and improve homepage layout ([d67ebc7](https://github.com/polo-blue/sds/commit/d67ebc7a0d9ab7f715f98893c9c13f3780e3e05b))

### Bug Fixes

* apply enhanced pnpm setup to release workflow ([f633630](https://github.com/polo-blue/sds/commit/f633630a504c9babfb26db455d49d806ec0ff208))
* correct GitHub Actions deploy workflow YAML syntax ([4cd8e12](https://github.com/polo-blue/sds/commit/4cd8e1281a16899ca758f93c8492cce632a29110))
* disable Jekyll processing for Astro GitHub Pages ([474f08b](https://github.com/polo-blue/sds/commit/474f08b25c0f3364136a54331ff830814fa2a4de))
* enhance pnpm setup with fallback installation ([6266f19](https://github.com/polo-blue/sds/commit/6266f1966fdd96946012355230dcd37b5889833f))
* improve pnpm PATH handling in release workflow ([e3c15de](https://github.com/polo-blue/sds/commit/e3c15de7df68df4fd22aa522f7247c1b8f3babaa))
* improve Vue components formatting and fix key issues ([b971bf2](https://github.com/polo-blue/sds/commit/b971bf2541fcf572a733618ebedfe423d7d02009))
* refine gitignore to preserve team VS Code settings ([6c98b10](https://github.com/polo-blue/sds/commit/6c98b10f031c2d11ea312bbacb5337a8cb61a61e))
* resolve pnpm executable error in code-quality workflow ([5a43ab8](https://github.com/polo-blue/sds/commit/5a43ab818412f058ee6fcd5fbc589109fae85301))
* resolve pnpm issues in deploy and release workflows ([464e29e](https://github.com/polo-blue/sds/commit/464e29ed728109450b70d987aac1e33d7cb4bb5b))
* resolve SonarCloud pnpm executable error ([8569495](https://github.com/polo-blue/sds/commit/85694952b80e51a480f3b76f91c9301460613bae))
* revert to enhanced pnpm setup in release workflow ([61d398e](https://github.com/polo-blue/sds/commit/61d398ea1736aee3bf5d734bb2a0119ae8a65ab9))
* simplify pnpm installation across all workflows ([863c77c](https://github.com/polo-blue/sds/commit/863c77ccc22cb6924385bb22a5de7576bd400dee))
* support badge objects from API ([d1fffc4](https://github.com/polo-blue/sds/commit/d1fffc4a04fce373ca4518dd22ebd22a11de4e4a))
* use corepack for pnpm setup in release workflow ([e08a090](https://github.com/polo-blue/sds/commit/e08a090de316ce5040c43b0f328db9a08922fd63))
* use direct pnpm installation in release workflow ([2e47c51](https://github.com/polo-blue/sds/commit/2e47c51e0f0b9356d92b9bca81aba4c7ad11cd7b))
* use pnpm/action-setup for proper pnpm installation in release workflow ([3b24b69](https://github.com/polo-blue/sds/commit/3b24b69db681ac2380e93a71f2d7bdcc0d939e2a))

## [1.1.17](https://github.com/polo-blue/sds/compare/v1.1.16...v1.1.17) (2025-09-23)

## [1.1.16](https://github.com/polo-blue/sds/compare/v1.1.15...v1.1.16) (2025-09-23)

### Bug Fixes

* apply prettier formatting to resolve CI formatting issues ([a95d274](https://github.com/polo-blue/sds/commit/a95d2740358fa6941055f8957a40936a3175fa3e))

## [1.1.15](https://github.com/polo-blue/sds/compare/v1.1.14...v1.1.15) (2025-09-23)

### Bug Fixes

* resolve majority of ESLint warnings ([54c4b7f](https://github.com/polo-blue/sds/commit/54c4b7f611301523ef61359cd62e818026033549))

## [1.1.14](https://github.com/polo-blue/sds/compare/v1.1.13...v1.1.14) (2025-09-23)

### Bug Fixes

* use props.label in MainInput.vue template to resolve unused props error ([abd1e7b](https://github.com/polo-blue/sds/commit/abd1e7b724873b005d0cf5274af4aa189653c94a))

## [1.1.13](https://github.com/polo-blue/sds/compare/v1.1.12...v1.1.13) (2025-09-23)

### Bug Fixes

* apply prettier formatting to ProductDetails.vue ([4b4c508](https://github.com/polo-blue/sds/commit/4b4c508ea86c050bc8af398484469f172cdea5b8))

## [1.1.12](https://github.com/polo-blue/sds/compare/v1.1.11...v1.1.12) (2025-09-23)

### Bug Fixes

* restore normal console usage and add browser globals to ESLint config ([b8863af](https://github.com/polo-blue/sds/commit/b8863af8ec11266c8d612ea28129423a51d0a2d7))

## [1.1.11](https://github.com/polo-blue/sds/compare/v1.1.10...v1.1.11) (2025-09-23)

### Bug Fixes

* resolve remaining ESLint errors ([f95095f](https://github.com/polo-blue/sds/commit/f95095feea0d8e72f41dea10660d942d3b6a02f7))

## [1.1.10](https://github.com/polo-blue/sds/compare/v1.1.9...v1.1.10) (2025-09-23)

### Bug Fixes

* apply prettier formatting to PrCode.vue ([7de045c](https://github.com/polo-blue/sds/commit/7de045c0749153c1e1301e2223cbbcd18483cd23))

## [1.1.9](https://github.com/polo-blue/sds/compare/v1.1.8...v1.1.9) (2025-09-23)

### Bug Fixes

* resolve critical ESLint errors in Vue components ([b95d043](https://github.com/polo-blue/sds/commit/b95d04384c9c676c2caeab1118c5ac7934498340))

## [1.1.8](https://github.com/polo-blue/sds/compare/v1.1.7...v1.1.8) (2025-09-23)

### Bug Fixes

* update ESLint configuration to properly parse Vue files ([0eb941a](https://github.com/polo-blue/sds/commit/0eb941a37002c80753f1324c30873888cfe62f70))

## [1.1.7](https://github.com/polo-blue/sds/compare/v1.1.6...v1.1.7) (2025-09-23)

### Bug Fixes

* remove unnecessary escape characters in text.ts ([f1ae714](https://github.com/polo-blue/sds/commit/f1ae7145d86a7b4df1976ba850650fc390624667))

## [1.1.6](https://github.com/polo-blue/sds/compare/v1.1.5...v1.1.6) (2025-09-23)

### Bug Fixes

* apply prettier formatting to resolve code style issues ([d9247d2](https://github.com/polo-blue/sds/commit/d9247d2b8809f87ea35777329ba5146b308d809b))

## [1.1.5](https://github.com/polo-blue/sds/compare/v1.1.4...v1.1.5) (2025-09-23)

### Bug Fixes

* resolve additional ESLint warnings and improve type safety ([87ab770](https://github.com/polo-blue/sds/commit/87ab770b0c2e6c33a5936ec693b59e859481857e))

## [1.1.4](https://github.com/polo-blue/sds/compare/v1.1.3...v1.1.4) (2025-09-23)

### Bug Fixes

* remove unused variables and improve TypeScript types ([db637f6](https://github.com/polo-blue/sds/commit/db637f6829bb2a23342a35d8041e803d4c9ad9c4))

## [1.1.3](https://github.com/polo-blue/sds/compare/v1.1.2...v1.1.3) (2025-09-23)

### Bug Fixes

* resolve Astro syntax errors in components ([18003e7](https://github.com/polo-blue/sds/commit/18003e78558a1dbc8f34d0e4faed6183eaaa80cb))

## [1.1.2](https://github.com/polo-blue/sds/compare/v1.1.1...v1.1.2) (2025-09-23)

### Bug Fixes

* add Prettier Astro plugin and format most files ([19e776d](https://github.com/polo-blue/sds/commit/19e776df1bed0ded35ca9b287db266b653ecb1ae))

## [1.1.1](https://github.com/polo-blue/sds/compare/v1.1.0...v1.1.1) (2025-09-23)

### Bug Fixes

* update SonarCloud workflow to use non-deprecated action ([0523ea3](https://github.com/polo-blue/sds/commit/0523ea3e4e236a4bb2d972b5bb9090df33d72c50))

## [1.1.0](https://github.com/polo-blue/sds/compare/v1.0.1...v1.1.0) (2025-09-23)

### Features

* add SonarCloud and ESLint/Prettier code quality workflows ([349ad03](https://github.com/polo-blue/sds/commit/349ad034e4ca90c73d77927dfe8e6b66bde3fd37))

## [1.0.1](https://github.com/polo-blue/sds/compare/v1.0.0...v1.0.1) (2025-09-23)

### Bug Fixes

* improve design system and add icon collections documentation ([007c465](https://github.com/polo-blue/sds/commit/007c46522f48bad8d0a04fbe811066edf6c3c78f))
* remove invalid vscode-icons to resolve build errors ([ab1fea5](https://github.com/polo-blue/sds/commit/ab1fea51182b35159953ae0005bb8c226fe14e9d))
* update icons and improve UnoCSS extractor ([aca7861](https://github.com/polo-blue/sds/commit/aca786103a56f5a180a15d6db044068bab596f62))

## 1.0.0 (2025-09-23)

### Features

* add automated semantic-release with HandDrive component improvements ([dd5f138](https://github.com/polo-blue/sds/commit/dd5f138636d90b3d0932c67c51afd39e42fab35a))

### Bug Fixes

* add missing conventional-changelog-conventionalcommits dependency ([ad4f47b](https://github.com/polo-blue/sds/commit/ad4f47b47f5de6f684bdbea84a839f5d5642cb62))
* add updated pnpm-lock.yaml for semantic-release dependencies ([9ac21c9](https://github.com/polo-blue/sds/commit/9ac21c9150f8cfc997767d7c302a999d92b2fb01))
* correct semantic-release version and update lockfile ([dbee5ef](https://github.com/polo-blue/sds/commit/dbee5efbadcfc4dde616ca163ff496ecffd3f15a))
* update pnpm version in GitHub Actions to match package.json ([2b25473](https://github.com/polo-blue/sds/commit/2b25473148265e85660209ba457a0aea0c190dcd))
