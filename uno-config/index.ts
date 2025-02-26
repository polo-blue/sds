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
    // safelist section with transform origin classes
    safelist: [
      // Existing safelist items
      'md:grid-cols-product',

      // Base classes
      'input-base',
      'input-label-base',

      // Variants
      'input-standard',
      'input-filled',
      'input-label-standard',
      'input-label-filled',
      'input-wrapper-standard',
      'input-wrapper-filled',

      // Sizes
      'input-sm',
      'input-md',
      'input-lg',
      'input-label-sm',
      'input-label-md',
      'input-label-lg',

      // Special types
      'input-textarea',

      // Status classes
      'input-error',
      'input-label-error',
      'input-error-message',
      'input-success',
      'input-label-success',
      'input-success-message',

      // Essential transform classes
      'origin-top-left',
      'transform-gpu',
      'translate-y-0',
      '-translate-y-4',
      '-translate-y-6',

      // Critical arbitrary selectors (all needed ones)
      '[&:focus~label]:text-blue-light',
      '[&:focus~label]:dark:text-blue-lightest',
      '[&:focus~label]:scale-75',
      '[&:focus~label]:-translate-y-6',
      '[&:focus~label]:-translate-y-4',
      '[&:focus~label]:start-0',
      '[&:placeholder-shown~label]:scale-100',
      '[&:placeholder-shown~label]:translate-y-0',
      '[&:not(:placeholder-shown)~label]:scale-75',
      '[&:not(:placeholder-shown)~label]:-translate-y-6',
      '[&:not(:placeholder-shown)~label]:-translate-y-4',
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