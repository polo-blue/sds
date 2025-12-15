# Spoko Design System

![Version](https://img.shields.io/github/package-json/v/polo-blue/sds)

**Spoko Design System (SDS)** is an Astro-based design system with Vue 3 components and UnoCSS for styling. It's published as `spoko-design-system` on npm and serves as both a documentation site and a component library.

Live documentation: https://sds.spoko.space/

The project is still in the development phase, use at your own risk ;-)

Please feel free to fork it, edit it and let me know what do you think about it.

## Requirements

- **Node.js**: >= 22.17.0
- **Package Manager**: pnpm >= 10.16.1 (v10.17.1 recommended)

## Dual-Purpose Architecture

This project serves two purposes simultaneously:

1. **Documentation Site**: Astro-based documentation at https://sds.spoko.space/
2. **npm Package**: Component library exportable as `spoko-design-system`

Components must work in BOTH contexts - as part of the Astro site and as importable npm package components.

## Getting Started

### Installation

Install as a package:

```bash
pnpm add spoko-design-system
```

Or clone the repository for development:

```bash
git clone https://github.com/polo-blue/sds.git
cd sds
pnpm install
```

### Development Commands

```bash
pnpm dev           # Start development server (runs on port 1234)
pnpm start         # Alias for dev
pnpm build         # Build production site
pnpm preview       # Preview production build
pnpm check         # Run Astro type checking
```

### Code Quality

```bash
pnpm lint          # Lint all source files
pnpm lint:fix      # Lint and auto-fix issues
pnpm format        # Format code with Prettier
pnpm format:check  # Check code formatting
```

### Publishing

This project uses automated **semantic-release** for version management and publishing.

```bash
pnpm semantic-release  # Manual release (usually automated via CI)
pnpm prepublishOnly    # Runs build before publish (automatic)
```

## Semantic Release & Commit Conventions

**All commits MUST follow conventional commits format:**

```
<type>[optional scope]: <description>
```

### Commit Types

- `feat`: New feature → MINOR version bump (0.1.0)
- `fix`: Bug fix → PATCH version bump (0.0.1)
- `perf`, `refactor`, `style`, `docs`: → PATCH version bump
- `test`, `ci`, `chore`: → No release

**Breaking Changes**: Add `BREAKING CHANGE:` footer → MAJOR version bump (1.0.0)

### Examples

```bash
feat(components): add Modal component with accessibility features
fix(Input): resolve floating label positioning
docs: update Button component examples
chore: update dependencies [skip ci]
```

On merge to `main`, GitHub Actions automatically:
1. Analyzes commits
2. Determines version bump
3. Updates package.json and CHANGELOG.md
4. Creates GitHub release
5. Publishes to npm

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/) - born with fastness
- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine
- 😃 [astro-icon](https://github.com/natemoo-re/astro-icon) - for local icons, sprites and `@iconify-json/*` sets
- 🍔 [astro-navbar](https://github.com/surjithctly/astro-navbar) - fully responsive and accessible headless navigation bar
- 🔎 [astro-pagefind](https://github.com/shishkin/astro-pagefind) - Astro integration for Pagefind static site search
- 🗒 [astrojs/mdx](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/) - markdown support
- 📦 [Playform compression](https://github.com/Playform/compress) - compression utilities to your Astro project
- 📲 [PWA](https://github.com/vite-pwa/astro) - Zero-config PWA Integration for Astro
- 🏷️ [astro-meta-tags](https://github.com/patrick91/astro-meta-tags) - Meta Tags inside for Astro Dev Toolbar
- 🖨 Static-site generation (SSG)
- 🎡 [Swiper](https://github.com/nolimits4web/swiper) - modern mobile touch slider with hardware accelerated transitions and amazing native behavior
- 🌠 [View Transitions API](https://docs.astro.build/en/guides/view-transitions/#full-site-view-transitions-spa-mode) - makes it easy to change the DOM in a single step, while creating an animated transition between the two states
- ☁️ Deploy on Netlify

## Icon System

The design system uses two separate but coordinated icon systems:

### 1. UnoCSS Icons (configured in `uno-config/index.ts`)
- Static imports for all icon JSON files
- Used via `i-{collection}-{name}` classes (e.g., `i-lucide-car`)

### 2. astro-icon (configured in `icon.config.ts`)
- Lists specific icons to include from each collection
- Used in Astro components via `<Icon name="collection:icon" />`

### Icon Collections

The design system includes carefully curated icon collections from Iconify:

- 🎨 [Material Design Icons](https://icon-sets.iconify.design/mdi/) - comprehensive icon set for UI elements
- 🚗 [Ant Design Icons](https://icon-sets.iconify.design/ant-design/) - clean outlined icons
- 📱 [Bootstrap Icons](https://icon-sets.iconify.design/bi/) - simple and consistent icons
- 🎯 [Boxicons](https://icon-sets.iconify.design/bx/) - high quality web icons
- 🌍 [Carbon Icons](https://icon-sets.iconify.design/carbon/) - IBM's design language icons
- 🎪 [Lucide Icons](https://icon-sets.iconify.design/lucide/) - beautiful & consistent icon toolkit
- 🎨 [Streamline Freehand Color](https://icon-sets.iconify.design/streamline-freehand-color/) - hand-drawn style colored icons
- 📟 [VS Code Icons](https://icon-sets.iconify.design/vscode-icons/) - file type and technology icons
- 🏢 [Simple Icons](https://icon-sets.iconify.design/simple-icons/) - brand icons for popular services
- ⚡ [Fluent UI Icons](https://icon-sets.iconify.design/fluent/) - Microsoft's design system icons

See the complete list and configuration in [`icon.config.ts`](./icon.config.ts).

### Adding New Icons

1. Add icon name to `icon.config.ts` in the appropriate collection's array
2. Icon is automatically available in both UnoCSS (class) and astro-icon (component)

## UnoCSS Configuration

**Important**: UnoCSS config is split across two locations:

1. **Root `uno.config.ts`**: Simple wrapper that imports the main config
2. **`uno-config/` directory**: Main configuration system
   - `uno-config/index.ts`: Core config with `createSdsConfig()` function
   - `uno-config/theme/`: Theme definitions (colors, typography, breakpoints, etc.)
   - `uno-config/theme/shortcuts/`: Component shortcuts organized by category

### When Modifying UnoCSS

- **Theme changes**: Modify files in `uno-config/theme/`
- **Shortcut additions**: Add to appropriate file in `uno-config/theme/shortcuts/`
- **Never edit** root `uno.config.ts` directly
- The `createSdsConfig()` function can be imported by consumers to extend the config

### Customizing Core (Colors, Typography, Shadows)

Theme files in `uno-config/theme/`:
- `colors.ts`: Complete color palette
- `typography.ts`: Font families, sizes, weights
- `breakpoints.ts`: Responsive breakpoints
- `dimensions.ts`: Spacing, sizing scales
- `effects.ts`: Shadows, borders, transitions
- `grid.ts`: Grid template configurations
- `container.ts`: Container max-widths and padding

Feel free to add new pages to the Core section in the documentation.

## Adding New Components

### 1. Create Component

Create component in appropriate location:
- Vue: `src/components/ComponentName.vue`
- Astro: `src/components/ComponentName.astro`

### 2. Export from Root

Export from root `index.ts` (note the `./src/` prefix):

```typescript
// ✅ Correct
export { default as ComponentName } from './src/components/ComponentName.vue';

// ❌ Wrong
export { default as ComponentName } from './components/ComponentName.vue';
```

### 3. Add Documentation

Add documentation page in `src/pages/components/component-name.mdx`

### 4. Add to Navigation

Add to navigation in `src/config.ts`:

```javascript
export const SIDEBAR = [
    { text: "Core", header: true },
    { text: "Introduction", link: "/core/introduction" },
    // ...
    { text: "Components", header: true },
    { text: "Component Name", link: "/components/component-name/" },
];
```

## Adding New Sections

Although it's not required, you can create folders for new sections.

To show the section on the left side navigation, add it to the navigation config file at `src/config.ts`:

```javascript
export const SIDEBAR = [
    { text: "Core", header: true },
    { text: "Introduction", link: "/core/introduction" },
    // ...
    { text: "Components", header: true },
    { text: "Buttons", link: "/components/buttons" },
    // ...
    { text: "New section", header: true },
    { text: "New component", link: "/new-section/new-component/" },
];
```

## Adding New Pages

To add new pages just create an `.astro` or `.mdx` file in `src/pages/[section]/my-page.mdx`. Remember to add it to the navigation config in `src/config.ts` so it shows up in the left side navigation.

You're free to organize the pages however you want.

## Component Preview Utility

There's a class called `.component-preview` that you can use to wrap your component in a grid:

```html
<div class="component-preview">
    <button class="text-white bg-blue-lightest px-4 py-2 rounded-md">Your component</button>
</div>
```

## Path Aliases

Three main path aliases defined in `tsconfig.json`:
- `@components/*` → `src/components/*`
- `@utils/*` → `src/utils/*`
- `@types/*` → `src/types/*`

## Package Exports

The package provides multiple export paths:

```javascript
import { Button, Input } from 'spoko-design-system'
import { createSdsConfig } from 'spoko-design-system/uno-config'
import { iconConfig } from 'spoko-design-system/icons'
```

Available exports:
- `.`: Main component exports
- `./styles/*`: Direct style imports
- `./icons`: Icon configuration
- `./icon-collections`: Icon collection list
- `./uno-config`: UnoCSS config for consumers

## Customizing Page Layout

You can find the css for the pages in `src/styles/content.css`.

## Examples

Documentation and live examples:
- https://sds.spoko.space/

Most of the components from this repository can be seen in production:
- https://catalog.polo.blue/
- https://polo.blue
- https://polo6r.pl

## Have Fun!

Spoko Design System template was made in Poland by **[@spoko.space](https://spoko.space)** for personal and commercial use.

## License

MIT
