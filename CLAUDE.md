# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Spoko Design System (SDS)** is an Astro-based design system with Vue 3 components and UnoCSS for styling. It's published as `spoko-design-system` on npm and serves as both a documentation site and a component library. The project uses automated semantic-release for version management and publishing.

## Common Commands

### Development
```bash
pnpm dev           # Start development server on port 1234
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
```bash
pnpm semantic-release  # Manual release (usually automated via CI)
pnpm prepublishOnly    # Runs build before publish (automatic)
```

## Architecture

### Dual-Purpose Structure
This project serves two purposes simultaneously:
1. **Documentation Site**: Astro-based documentation at https://sds.spoko.space/
2. **npm Package**: Component library exported via `index.ts` at project root

**Key Principle**: Components must work in BOTH contexts:
- As part of the Astro documentation site (in `src/`)
- As importable npm package components (exported from root `index.ts`)

### Component Exports Pattern
Components are exported from root `index.ts`, NOT from `src/`:
```typescript
// ✅ Correct
export { default as Button } from './src/components/Button.vue';

// ❌ Wrong
export { default as Button } from './components/Button.vue';
```

### UnoCSS Configuration System

**Critical**: UnoCSS config is split across two locations:

1. **Root `uno.config.ts`**: Simple wrapper that imports the main config
```typescript
import { createSdsConfig } from './uno-config';
export default createSdsConfig();
```

2. **`uno-config/` directory**: Main configuration system
   - `uno-config/index.ts`: Core config with `createSdsConfig()` function
   - `uno-config/theme/`: Theme definitions (colors, typography, breakpoints, etc.)
   - `uno-config/theme/shortcuts/`: Component shortcuts organized by category

**When modifying UnoCSS**:
- Theme changes: Modify files in `uno-config/theme/`
- Shortcut additions: Add to appropriate file in `uno-config/theme/shortcuts/`
- Never edit root `uno.config.ts` directly
- The `createSdsConfig()` function can be imported by consumers to extend the config

### Icon System

Icons use two separate but coordinated systems:

1. **UnoCSS Icons** (in `uno-config/index.ts`):
   - Static imports for all icon JSON files
   - Used via `i-{collection}-{name}` classes (e.g., `i-lucide-car`)
   - All collections statically imported to prevent Vite module runner issues

2. **astro-icon** (in `icon.config.ts`):
   - Configured via `iconConfig` export
   - Lists specific icons to include from each collection
   - Used in Astro components via `<Icon name="collection:icon" />`

**Adding new icons**:
1. Add icon name to `icon.config.ts` in the appropriate collection's array
2. Icon is automatically available in both UnoCSS (class) and astro-icon (component)

### Navigation & Sidebar

Site navigation is configured in `src/config.ts`:
- `SITE`: Site metadata (title, description, social links)
- `SIDEBAR`: Array of navigation items with `text`, `link`, and optional `header` flag
- Headers create section dividers in the left sidebar
- Links are relative to site root (e.g., `/core/introduction/`)

### TypeScript Paths

Three main path aliases defined in `tsconfig.json`:
- `@components/*` → `src/components/*`
- `@utils/*` → `src/utils/*`
- `@types/*` → `src/types/*`

### Component Organization

Components are split by framework and purpose:

**Vue Components** (`.vue`):
- Interactive components with state
- Examples: `Button.vue`, `Input.vue`, `ProductDetailsList.vue`

**Astro Components** (`.astro`):
- Static or mostly-static components
- Examples: `Jumbotron.astro`, `Copyright.astro`, `HandDrive.astro`

**Component Subdirectories**:
- `components/Product/`: Product-related components
- `components/Category/`: Category management components
- `components/Post/`: Blog/post components
- `components/Jumbotron/variants/`: Jumbotron variations (Hero, Post, PostSplit, Default)

### Utilities Organization

Utilities are organized by domain in `src/utils/`:
- `text/`: Text formatting (formatDate, getNumberFormatted, etc.)
- `product/`: Product-related utilities (getPriceFormatted, getProductChecklist)
- `seo/`: SEO helpers (getShorterDescription)
- `api/`: API interaction utilities
- `category/`: Category management utilities

Root `src/utils/text.ts` exports common text utilities (text2paragraphs, countWords, etc.)

### Theme System

Theme is modular in `uno-config/theme/`:
- `colors.ts`: Complete color palette (blue shades, accent, neutral, slate, system)
- `typography.ts`: Font families, sizes, weights
- `breakpoints.ts`: Responsive breakpoints
- `dimensions.ts`: Spacing, sizing scales
- `effects.ts`: Shadows, borders, transitions
- `grid.ts`: Grid template configurations
- `container.ts`: Container max-widths and padding

Design constants are duplicated in `src/design.config.ts` for documentation pages showing colors, typography, shadows, and fonts.

### Shortcuts System

UnoCSS shortcuts are organized by component type in `uno-config/theme/shortcuts/`:
- `buttons.ts`: Button variants and states
- `inputs.ts`: Form input styling with floating labels
- `layout.ts`: Container, grid, and layout shortcuts
- `components.ts`: Breadcrumbs, features lists, category links
- `product.ts`: Product-specific component shortcuts
- `jumbotron.ts`: Jumbotron variants
- `constants.ts`: Shared constants used across shortcuts

## Semantic Release & Commit Conventions

This project uses automated semantic-release. **All commits MUST follow conventional commits format**:

```
<type>[optional scope]: <description>
```

**Commit Types**:
- `feat`: New feature → MINOR version bump (0.1.0)
- `fix`: Bug fix → PATCH version bump (0.0.1)
- `perf`, `refactor`, `style`, `docs`: → PATCH version bump
- `test`, `ci`, `chore`: → No release

**Breaking Changes**: Add `BREAKING CHANGE:` footer → MAJOR version bump (1.0.0)

**Examples**:
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

## Development Guidelines

### Adding New Components

1. Create component in appropriate location:
   - Vue: `src/components/ComponentName.vue`
   - Astro: `src/components/ComponentName.astro`

2. Export from root `index.ts`:
   ```typescript
   export { default as ComponentName } from './src/components/ComponentName.vue';
   ```

3. Add documentation page in `src/pages/components/component-name.mdx`

4. Add to navigation in `src/config.ts`:
   ```typescript
   { text: 'Component Name', link: '/components/component-name/' }
   ```

### Adding UnoCSS Shortcuts

1. Identify appropriate shortcuts file in `uno-config/theme/shortcuts/`
2. Add shortcut as `[name, classes]` tuple array entry
3. Shortcuts automatically available as classes
4. Use `.component-preview` class in docs to wrap component examples in grid

### Working with Astro Integration

- Astro config in `astro.config.mjs` loads:
  - Vue integration for `.vue` components
  - UnoCSS with SDS config
  - MDX for markdown pages
  - PWA support via vite-pwa
  - Pagefind for search
  - Sitemap generation

- Layouts in `src/layouts/`:
  - `MainLayout.astro`: Standard page layout with sidebar
  - `Layout.astro`: Base HTML layout

### Path Resolution

When importing:
- Use TypeScript paths (`@components/`, `@utils/`, `@types/`)
- Root imports in `index.ts` use `./src/` prefix
- Component imports within `src/` use aliases or relative paths

### Testing Icons

Before using an icon, verify it's in `icon.config.ts`:
- Check `include` object for the collection
- Icon must be listed in array for that collection
- Use helper functions: `isIconIncluded()`, `getIncludedIcons()`

## Package Configuration

- **Entry point**: `index.ts` (root level)
- **Exports**:
  - `.`: Main component exports
  - `./styles/*`: Direct style imports
  - `./icons`: Icon configuration
  - `./icon-collections`: Icon collection list
  - `./uno-config`: UnoCSS config for consumers

- **Engines**: Node >= 22.17.0, pnpm >= 10.16.1
- **Package manager**: pnpm (v10.17.1)

## Important Notes

- Server runs on port 1234 (not default 4321)
- Build output goes to `dist/`
- Development artifacts in `.astro/` and `dev-dist/`
- Image domains whitelisted: placehold.co, polo.blue, img.freepik.com, polo6r.pl
- PWA manifest configured for "Spoko Design System"
- Compression and inlining enabled for production builds
