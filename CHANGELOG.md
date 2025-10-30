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
