# Tooltip System Documentation

## Overview

SDS includes a complete tooltip system built on [Tippy.js](https://atomiks.github.io/tippyjs/) with custom styling and automatic initialization.

## Features

- 🎨 Custom SDS theme matching design system colors
- ⚡ Performance-optimized delegation pattern
- 🔄 Automatic support for Astro View Transitions
- 🎯 Simple data-attribute API
- 📦 All dependencies bundled (no need to install tippy.js separately)

## Installation

**Option 1: Automatic initialization (recommended)**

Import the complete tooltip system in your layout's script tag:

```astro
---
// In your BaseLayout.astro or HeadCommon.astro
---

<head>
  <!-- ... other head elements -->
  <script src="/src/scripts/tooltips.ts"></script>
</head>
```

```ts
// In your /src/scripts/tooltips.ts
import 'spoko-design-system/scripts/tooltips';
```

**Option 2: Manual initialization**

If you need more control:

```ts
import { initTooltips } from 'spoko-design-system';

// Initialize tooltips manually
initTooltips();
```

## Usage

Add tooltips to any element using the `data-tippy-content` attribute:

```astro
<span data-tippy-content="This is a tooltip">
  Hover over me
</span>
```

### With HTML content

```astro
<span data-tippy-content="<strong>Bold text</strong> and <em>italic</em>">
  Rich tooltip
</span>
```

### Structured tooltips (like engine codes)

The system supports structured tooltips with headers and specs:

```astro
<span
  class="engine-code"
  data-tippy-content={tooltipHTML}
>
  CAYA
</span>
```

Where `tooltipHTML` can be generated using:

```ts
import { getEngineTooltipContent } from 'spoko-design-system';

const tooltipHTML = getEngineTooltipContent(engine, translations);
```

## Components with built-in tooltips

These SDS components automatically include tooltip functionality:

- `<ProductEngine>` - Engine codes with detailed specs
- `<ProductEngines>` - List of engine codes
- `<ProductCodes>` - PR codes (when descriptions are available)

## Styling

The tooltip theme uses SDS design tokens:

- Background: `neutral-lightest` (#f3f4f6)
- Text: `slate-darkest` (#1e293b)
- Border: `neutral-lighter` (#e5e7eb)
- Header (engine tooltips): `accent-deepBlue` (#001e50)

To customize, override the `.tippy-box[data-theme~='sds']` class in your project.

## Dependencies

SDS includes `tippy.js` as a dependency, so your project **does not need to install it separately**.

If your project already has `tippy.js` installed, you can safely remove it:

```bash
pnpm remove tippy.js
```

## Technical Details

### Delegation Pattern

The tooltip system uses Tippy.js's delegation pattern for optimal performance:

- Single event listener on `body`
- Targets all `[data-tippy-content]` elements
- No need to re-initialize when DOM changes
- Works with dynamically added content

### Astro View Transitions

The system automatically re-initializes on Astro page navigation:

```ts
document.addEventListener('astro:page-load', () => {
  initTooltips();
});
```

### Configuration

Default configuration (in `src/scripts/tooltips.ts`):

```ts
{
  target: '[data-tippy-content]',
  allowHTML: true,
  theme: 'sds',
  placement: 'top',
  arrow: true,
  animation: 'shift-away',
  duration: [200, 150],
  maxWidth: 280
}
```

## Troubleshooting

### Tooltips not showing

1. Verify the script is imported in your layout
2. Check that elements have `data-tippy-content` attribute
3. Ensure content is not empty or "undefined"
4. Check browser console for errors

### Double tooltips or conflicts

If you see duplicate tooltips:

1. Make sure you're only importing the tooltip script once
2. Don't call `initTooltips()` manually if using auto-initialization
3. Remove any local tippy.js installations that might conflict

### Styling not applied

1. Verify SDS theme CSS is imported (included in script import)
2. Check CSS specificity - SDS uses `!important` for some properties
3. Ensure your build process handles CSS imports from node_modules

## Examples

### Basic tooltip

```astro
<button data-tippy-content="Click to save">
  Save
</button>
```

### Engine code tooltip

```astro
---
import { ProductEngine } from 'spoko-design-system';

const engine = {
  code: 'CAYA',
  name: '1.6 TDI',
  power: { kw: 55, ps: 75, ps_label: 'PS', label: 'Power' },
  displacement: { value: 1598, label: 'Displacement' },
  euro: { value: 5, label: 'Standard' }
};
---

<ProductEngine engine={engine} />
```

### Custom structured tooltip

```astro
<span data-tippy-content={`
  <div class="tooltip-header">
    <strong>Custom Header</strong>
  </div>
  <div class="tooltip-specs">
    <div class="tooltip-row">
      <span class="tooltip-label">Label:</span>
      <span class="tooltip-value">Value</span>
    </div>
  </div>
`}>
  Custom tooltip
</span>
```

## Migration from standalone Tippy.js

If migrating from a direct Tippy.js implementation:

1. Remove `tippy.js` from package.json
2. Remove local tooltip initialization code
3. Import SDS tooltip script: `import 'spoko-design-system/scripts/tooltips'`
4. Update elements to use `data-tippy-content` instead of manual initialization
5. Update custom styles to target `.tippy-box[data-theme~='sds']`

## Support

For issues or feature requests, please open an issue at:
https://github.com/polo-blue/sds/issues
