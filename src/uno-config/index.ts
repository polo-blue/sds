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