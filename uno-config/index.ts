// uno-config/index.ts
import type { UserConfig, UserShortcuts } from 'unocss'
import { defineConfig } from 'unocss';

// REQUIRED IMPORTS: These imports are used in the createSdsConfig function
// Removing or commenting out any of these will break the UnoCSS configuration
import {
  transformerDirectives,   // Used in transformers array
  transformerVariantGroup, // Used in transformers array
  presetAttributify,       // Used in presets array
  presetIcons,             // Used in presets array with specific configuration
} from 'unocss';

// These presets must be imported explicitly to be used in the configuration
import presetUno from '@unocss/preset-uno';             // Primary UnoCSS preset
import presetTypography from '@unocss/preset-typography'; // Typography preset
import presetWebFonts from '@unocss/preset-web-fonts';    // Web fonts preset

import { shortcuts } from './theme/shortcuts/index.ts';
import { theme } from './theme/index.ts';
import { generatePalette, defaultPalette, type PaletteInput } from './palette-generator.ts';
import { peerSelectorClasses, peerVariant } from './peer-variants.ts';

// Icon collections are loaded lazily via dynamic import (see `iconCollections`
// in the presetIcons config below). They are deliberately NOT statically
// imported: static imports inline every collection's `icons.json` (hundreds of
// MB across 26 collections) into this single module. On Vite 8's module runner
// that produces an inline sourcemap larger than V8's max string length
// (0x1fffffe8 ≈ 536M chars), which crashes the build under Astro 7. Each loader
// must use a literal specifier so the bundler can statically resolve the chunk.


interface CustomConfig extends Partial<UserConfig> {
  shortcuts?: UserShortcuts;
  theme?: Partial<typeof theme>;
  /** Brand colors for palette generation. When provided, replaces the default blue palette. */
  palette?: PaletteInput;
}

/**
 * Creates a UnoCSS configuration with Spoko Design System defaults
 * 
 * IMPORTANT: This function requires all the imported UnoCSS presets and transformers.
 * Do not remove any imports at the top of this file as they are necessary for
 * proper functioning of the UnoCSS configuration.
 * 
 * @param customConfig - Optional custom configuration to merge with defaults
 * @returns Complete UnoCSS configuration
 */
export function createSdsConfig(customConfig: CustomConfig = {}) {
  const { palette, ...restConfig } = customConfig;
  const resolvedColors = palette ? generatePalette(palette) : defaultPalette;
  const resolvedTheme = {
    ...theme,
    colors: resolvedColors,
    ...(restConfig.theme || {}),
  };

  return defineConfig({
    // Optimizations for static builds
    ...(process.env.NODE_ENV === 'production' && {
      inspector: false,
      hmr: false,
    }),

    // Transform directives and variant groups
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
    shortcuts: {
      ...shortcuts,
      ...(restConfig.shortcuts || {})
    },
    theme: resolvedTheme,
    variants: [peerVariant],
    // Optimized safelist for static Astro builds
    safelist: [
      // Layout and grid classes that might be used dynamically
      'md:grid-cols-product',

      // Component-specific classes for static generation
      'breadcrumb-link-disabled',
      'breadcrumb-link',
      'breadcrumb-item',
      'features-list-caption',
      'features-list-ul',
      'features-list-item',
      'category-link-base',
      'category-link-active',

      // Essential peer and input classes
      'peer',
      'resize-none',
      'origin-top-left',
      'transform-gpu',

      // Dark mode toggle icons
      'i-lucide-moon',
      'i-lucide-sun',

      // Dynamic icons from ProductDetailsList component
      'i-lucide-book-text',
      'i-lucide-link',
      'i-simple-icons-youtube',
      'i-simple-icons-vimeo',

      // Language flags for Translations component (dynamic Vue classes)
      'i-circle-flags:en',
      'i-circle-flags:pl',

      // All peer selectors from the list (needed for floating labels)
      ...peerSelectorClasses,

      // Custom safelist from consumer config
      ...(customConfig.safelist || []),
    ],
    // Optimized extractors for static Astro builds
    extractors: [
      {
        name: 'astro-static',
        extract({ code, id }) {
          const result = new Set();

          // Only extract from class attributes to prevent false positives
          const classRegex = /class(?:Name)?=["'`]([^"'`]+)["'`]/g;
          let match;
          while ((match = classRegex.exec(code)) !== null) {
            match[1].split(/\s+/).forEach(cls => {
              // Only add classes that don't look like malformed icon names
              // Filter out patterns like i-lucide-link-Validate, i-simple-icons-youtube-case, etc.
              if (cls && !cls.match(/^i-(lucide|simple-icons|mdi|ant-design|bi|bx|carbon|el|eos-icons|fluent|flowbite|la|octicon|uil|icon-park-outline|ph|ic|material-symbols-light|et|system-uicons|vscode-icons|streamline-freehand-color)-\w+-(case|return|if|const|Validate|items|validatedItems|Grouping|function|switch|default)/i) && !cls.includes('Grouping')) {
                result.add(cls);
              }
            });
          }

          // For .astro files, extract from dynamic class bindings
          if (id && id.endsWith('.astro')) {
            const dynamicClassRegex = /class:\w+\s*=\s*["'`]([^"'`]+)["'`]/g;
            while ((match = dynamicClassRegex.exec(code)) !== null) {
              match[1].split(/\s+/).forEach(cls => {
                if (cls && !cls.match(/^i-(lucide|simple-icons|mdi|ant-design|bi|bx|carbon|el|eos-icons|fluent|flowbite|la|octicon|uil|icon-park-outline|ph|ic|material-symbols-light|et|system-uicons|vscode-icons|streamline-freehand-color)-\w+-(case|return|if|const|Validate|items|validatedItems|Grouping|function|switch|default)/i) && !cls.includes('Grouping')) {
                  result.add(cls);
                }
              });
            }
          }

          // For .vue files, extract from :class bindings (dynamic classes)
          if (id && id.endsWith('.vue')) {
            // Match :class="[...]" or :class="{...}" or :class="'...'"
            const vueClassRegex = /:class=["'`]([^"'`]+)["'`]/g;
            while ((match = vueClassRegex.exec(code)) !== null) {
              // Extract class names from ternary expressions and string literals
              const classContent = match[1];
              // Match quoted strings inside the expression (e.g., 'i-circle-flags:en')
              const quotedStrings = classContent.match(/['"]([^'"]+)['"]/g);
              if (quotedStrings) {
                quotedStrings.forEach(quoted => {
                  const cls = quoted.replace(/['"]/g, '').trim();
                  if (cls && !cls.includes('?') && !cls.includes(':') || cls.startsWith('i-')) {
                    // Split by spaces in case multiple classes
                    cls.split(/\s+/).forEach(c => {
                      if (c && c.length > 1) {
                        result.add(c);
                      }
                    });
                  }
                });
              }
            }
          }

          return result;
        },
      },
    ],
    // IMPORTANT: All of these presets are required for proper functioning
    presets: [
      presetUno({ dark: 'class' }),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        warn: false, // Disabled to prevent false positives from JS code scanning
        prefix: 'i-',
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        // Lazy async loaders: each collection resolves to its own dynamic-import
        // chunk instead of being inlined into this module (see the import note
        // at the top of the file). Specifiers must be string literals so the
        // bundler can statically resolve each chunk.
        collections: {
          'ant-design': () => import('@iconify-json/ant-design/icons.json').then((m) => m.default),
          'bi': () => import('@iconify-json/bi/icons.json').then((m) => m.default),
          'bx': () => import('@iconify-json/bx/icons.json').then((m) => m.default),
          'carbon': () => import('@iconify-json/carbon/icons.json').then((m) => m.default),
          'circle-flags': () => import('@iconify-json/circle-flags/icons.json').then((m) => m.default),
          'ei': () => import('@iconify-json/ei/icons.json').then((m) => m.default),
          'el': () => import('@iconify-json/el/icons.json').then((m) => m.default),
          'eos-icons': () => import('@iconify-json/eos-icons/icons.json').then((m) => m.default),
          'et': () => import('@iconify-json/et/icons.json').then((m) => m.default),
          'flowbite': () => import('@iconify-json/flowbite/icons.json').then((m) => m.default),
          'fluent': () => import('@iconify-json/fluent/icons.json').then((m) => m.default),
          'fluent-emoji': () => import('@iconify-json/fluent-emoji/icons.json').then((m) => m.default),
          'ic': () => import('@iconify-json/ic/icons.json').then((m) => m.default),
          'icon-park-outline': () => import('@iconify-json/icon-park-outline/icons.json').then((m) => m.default),
          'la': () => import('@iconify-json/la/icons.json').then((m) => m.default),
          'lucide': () => import('@iconify-json/lucide/icons.json').then((m) => m.default),
          'material-symbols-light': () => import('@iconify-json/material-symbols-light/icons.json').then((m) => m.default),
          'mdi': () => import('@iconify-json/mdi/icons.json').then((m) => m.default),
          'noto-v1': () => import('@iconify-json/noto-v1/icons.json').then((m) => m.default),
          'octicon': () => import('@iconify-json/octicon/icons.json').then((m) => m.default),
          'ph': () => import('@iconify-json/ph/icons.json').then((m) => m.default),
          'simple-icons': () => import('@iconify-json/simple-icons/icons.json').then((m) => m.default),
          'system-uicons': () => import('@iconify-json/system-uicons/icons.json').then((m) => m.default),
          'uil': () => import('@iconify-json/uil/icons.json').then((m) => m.default),
          'vscode-icons': () => import('@iconify-json/vscode-icons/icons.json').then((m) => m.default),
          'streamline-freehand-color': () => import('@iconify-json/streamline-freehand-color/icons.json').then((m) => m.default),
        }
      }),
      presetTypography(),
      presetWebFonts({
        provider: 'none',
        fonts: theme.fontFamily
      })
    ],

    // Additional optimizations for static Astro builds
    preflights: [
      {
        getCSS: () => `
          /* Optimized base styles for static builds */
          *,*::before,*::after{box-sizing:border-box;border-width:0;border-style:solid}
          html{line-height:1.5;-webkit-text-size-adjust:100%}
          body{margin:0;font-family:vw_textregular,system-ui,sans-serif}
        `
      }
    ],

    ...restConfig
  });
}

export * from './theme/index.ts';
export * from './theme/shortcuts/index.ts';
export { generatePalette, defaultPalette, type PaletteInput } from './palette-generator.ts';
export { generateTokensCSS } from './token-exporter.ts';