// uno-config/index.ts
import type { UserConfig, UserShortcuts } from 'unocss'
import { defineConfig } from 'unocss';
import {
  transformerDirectives,
  transformerVariantGroup,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss';

import { shortcuts } from './theme/shortcuts';
import { theme } from './theme';

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

export function createSdsConfig(customConfig: CustomConfig = {}) {
  return defineConfig({
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
    // Comprehensive safelist with all needed classes
    safelist: [
      // Existing safelist items
      'md:grid-cols-product',
      
      // Base peer class
      'peer',
      
      // All input component classes from shortcuts
      'input-base',
      'input-label-base',
      'input-placeholder',
      'input-standard',
      'input-filled',
      'input-wrapper-standard',
      'input-wrapper-filled',
      'input-label-standard',
      'input-label-filled',
      
      // Label state shortcuts
      'input-label-focus-color',
      'input-label-focus-scale',
      'input-label-focus-translate-standard',
      'input-label-focus-translate-filled',
      'input-label-placeholder',
      'input-label-filled-standard',
      'input-label-filled-filled',
      'input-label-standard-state',
      'input-label-filled-state',
      
      // Input types
      'input-textarea',
      'resize-none',
      
      // Size variants
      'input-sm',
      'input-md',
      'input-lg',
      'input-label-sm',
      'input-label-md',
      'input-label-lg',
      
      // Status classes
      'input-error',
      'input-label-error',
      'input-error-message',
      'input-success',
      'input-label-success',
      'input-success-message',
      
      // Transform related classes
      'origin-top-left',
      'transform-gpu',
      'translate-y-0',
      '-translate-y-4',
      '-translate-y-6',
      'scale-75',
      'scale-100',
      
      // Every possible arbitrary selector used
      '[&:focus~label]:scale-75',
      '[&:focus~label]:-translate-y-4',
      '[&:focus~label]:-translate-y-6',
      '[&:focus~label]:text-blue-light',
      '[&:focus~label]:dark:text-blue-lightest',
      '[&:focus~label]:start-0',
      '[&:placeholder-shown~label]:scale-100',
      '[&:placeholder-shown~label]:translate-y-0',
      '[&:not(:placeholder-shown)~label]:scale-75',
      '[&:not(:placeholder-shown)~label]:-translate-y-4',
      '[&:not(:placeholder-shown)~label]:-translate-y-6',
      
      // Combinations of selectors
      'peer:focus:text-blue-light',
      'peer:focus:dark:text-blue-lightest',
      'peer:focus:scale-75',
      'peer:focus:-translate-y-4',
      'peer:focus:-translate-y-6',
      'peer:focus:start-0',
      'peer-placeholder-shown:scale-100',
      'peer-placeholder-shown:translate-y-0',
      'peer-not-placeholder-shown:scale-75',
      'peer-not-placeholder-shown:-translate-y-4',
      'peer-not-placeholder-shown:-translate-y-6',
      
      // With !important for good measure
      '[&:focus~label]:!scale-75',
      '[&:focus~label]:!-translate-y-4',
      '[&:focus~label]:!-translate-y-6',
      '[&:not(:placeholder-shown)~label]:!scale-75',
      '[&:not(:placeholder-shown)~label]:!-translate-y-4',
      '[&:not(:placeholder-shown)~label]:!-translate-y-6',
      
      // Direct css vars that might be used
      '--un-scale-x',
      '--un-scale-y',
      '--un-translate-y',
      
      // All peer selectors from the list
      ...peerSelectorClasses,
    ],
    // Custom extractors to ensure peer classes are preserved
    extractors: [
      {
        name: 'vue-astro',
        extract({ code }) {
          const result = new Set();
          
          // Extract all peer selectors in the code
          const peerRegex = /peer-([a-zA-Z0-9-]+:[a-zA-Z0-9-]+)/g;
          const peerMatches = code.match(peerRegex);
          if (peerMatches) {
            peerMatches.forEach(match => result.add(match));
          }
          
          // Add all known peer selectors
          peerSelectorClasses.forEach(cls => result.add(cls));
          
          return result;
        },
      },
    ],
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
      }),
      presetTypography(),
      presetWebFonts({
        provider: 'none',
        fonts: theme.fontFamily
      })
    ],
    ...customConfig
  });
}

export * from './theme';
export * from './theme/shortcuts';