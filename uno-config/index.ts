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

import { shortcuts } from './theme/shortcuts';
import { theme } from './theme';

// Static imports for all icon collections (prevents Vite module runner issues)
import antDesignIcons from '@iconify-json/ant-design/icons.json';
import biIcons from '@iconify-json/bi/icons.json';
import bxIcons from '@iconify-json/bx/icons.json';
import carbonIcons from '@iconify-json/carbon/icons.json';
import circleFlagsIcons from '@iconify-json/circle-flags/icons.json';
import eiIcons from '@iconify-json/ei/icons.json';
import elIcons from '@iconify-json/el/icons.json';
import eosIcons from '@iconify-json/eos-icons/icons.json';
import etIcons from '@iconify-json/et/icons.json';
import flowbiteIcons from '@iconify-json/flowbite/icons.json';
import fluentIcons from '@iconify-json/fluent/icons.json';
import fluentEmojiIcons from '@iconify-json/fluent-emoji/icons.json';
import icIcons from '@iconify-json/ic/icons.json';
import iconParkOutlineIcons from '@iconify-json/icon-park-outline/icons.json';
import laIcons from '@iconify-json/la/icons.json';
import lucideIcons from '@iconify-json/lucide/icons.json';
import materialSymbolsLightIcons from '@iconify-json/material-symbols-light/icons.json';
import mdiIcons from '@iconify-json/mdi/icons.json';
import notoV1Icons from '@iconify-json/noto-v1/icons.json';
import octiconIcons from '@iconify-json/octicon/icons.json';
import phIcons from '@iconify-json/ph/icons.json';
import simpleIcons from '@iconify-json/simple-icons/icons.json';
import systemUiconsIcons from '@iconify-json/system-uicons/icons.json';
import uilIcons from '@iconify-json/uil/icons.json';
import vscodeIcons from '@iconify-json/vscode-icons/icons.json';
import streamlineFreehandColorIcons from '@iconify-json/streamline-freehand-color/icons.json';

// List of peer selectors we want to preserve during build
const peerSelectorClasses = [
  // Focus state classes
  'peer-focus:text-blue-light',
  'peer-focus:dark:text-blue-lightest',
  'peer-focus:scale-75',
  'peer-focus:-translate-y-6',
  'peer-focus:-translate-y-4',
  'peer-focus:start-0',
  
  // Placeholder shown classes
  'peer-placeholder-shown:scale-100',
  'peer-placeholder-shown:translate-y-0',
  
  // Not placeholder shown classes
  'peer-not-placeholder-shown:scale-75',
  'peer-not-placeholder-shown:-translate-y-6',
  'peer-not-placeholder-shown:-translate-y-4',
];

interface CustomConfig extends Partial<UserConfig> {
  shortcuts?: UserShortcuts;
  theme?: Partial<typeof theme>;
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
      ...(customConfig.shortcuts || {})
    },
    theme: {
      ...theme,
      ...(customConfig.theme || {})
    },
    // Enhanced variants to better handle peer selectors
    variants: [
      // Add specific peer variant support
      (matcher) => {
        if (!matcher.startsWith('peer-'))
          return matcher;
        
        const peerVariant = matcher.slice(5);
        const selectorMap = {
          'focus:': (s) => `.peer:focus ~ ${s}`,
          'hover:': (s) => `.peer:hover ~ ${s}`,
          'placeholder-shown:': (s) => `.peer:placeholder-shown ~ ${s}`,
          'not-placeholder-shown:': (s) => `.peer:not(:placeholder-shown) ~ ${s}`,
        };
        
        // Check for nested variants like 'peer-focus:text-blue'
        for (const [key, selectorFn] of Object.entries(selectorMap)) {
          if (peerVariant.startsWith(key)) {
            return {
              matcher: peerVariant.slice(key.length),
              selector: selectorFn,
            };
          }
        }
        
        // Default peer handling
        return {
          matcher: peerVariant,
          selector: (s) => `.peer:${peerVariant} ~ ${s}`,
        };
      },
    ],
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

      // All peer selectors from the list (needed for floating labels)
      ...peerSelectorClasses,
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
              if (cls) result.add(cls);
            });
          }

          // For .astro files, extract from dynamic class bindings
          if (id && id.endsWith('.astro')) {
            const dynamicClassRegex = /class:\w+\s*=\s*["'`]([^"'`]+)["'`]/g;
            while ((match = dynamicClassRegex.exec(code)) !== null) {
              match[1].split(/\s+/).forEach(cls => {
                if (cls) result.add(cls);
              });
            }
          }

          return result;
        },
      },
    ],
    // IMPORTANT: All of these presets are required for proper functioning
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        warn: true,
        prefix: 'i-',
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        collections: {
          // All icon collections with static imports to prevent Vite module runner issues
          'ant-design': antDesignIcons,
          'bi': biIcons,
          'bx': bxIcons,
          'carbon': carbonIcons,
          'circle-flags': circleFlagsIcons,
          'ei': eiIcons,
          'el': elIcons,
          'eos-icons': eosIcons,
          'et': etIcons,
          'flowbite': flowbiteIcons,
          'fluent': fluentIcons,
          'fluent-emoji': fluentEmojiIcons,
          'ic': icIcons,
          'icon-park-outline': iconParkOutlineIcons,
          'la': laIcons,
          'lucide': lucideIcons,
          'material-symbols-light': materialSymbolsLightIcons,
          'mdi': mdiIcons,
          'noto-v1': notoV1Icons,
          'octicon': octiconIcons,
          'ph': phIcons,
          'simple-icons': simpleIcons,
          'system-uicons': systemUiconsIcons,
          'uil': uilIcons,
          'vscode-icons': vscodeIcons,
          'streamline-freehand-color': streamlineFreehandColorIcons,
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
          *,*::before,*::after{box-sizing:border-box}
          html{line-height:1.5;-webkit-text-size-adjust:100%}
          body{margin:0;font-family:vw_textregular,system-ui,sans-serif}
        `
      }
    ],

    ...customConfig
  });
}

export * from './theme';
export * from './theme/shortcuts';