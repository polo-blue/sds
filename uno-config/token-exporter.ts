import { generatePalette, defaultPalette, type PaletteInput } from './palette-generator.ts';
import type { Colors } from './theme/colors.ts';
import { typography } from './theme/typography.ts';

// Palette groups that follow the uniform --color-{group}-{shade} naming
const PALETTE_GROUPS = ['brand', 'blue', 'accent', 'neutral', 'slate', 'state'] as const;

function colorsToVars(colors: Colors): string[] {
  const vars: string[] = [];

  for (const group of PALETTE_GROUPS) {
    vars.push(`\n  /* ${group} */`);
    for (const [shade, value] of Object.entries(colors[group])) {
      if (value !== undefined) vars.push(`  --color-${group}-${shade}: ${value};`);
    }
  }

  // system colors intentionally omit the group prefix for ergonomics (--color-success, not --color-system-success)
  vars.push('\n  /* system */');
  for (const [name, value] of Object.entries(colors.system)) {
    vars.push(`  --color-${name}: ${value};`);
  }

  return vars;
}

function typographyToVars(): string[] {
  const vars: string[] = ['\n  /* typography */'];
  for (const [name, families] of Object.entries(typography.fontFamily)) {
    vars.push(`  --font-family-${name}: ${families.join(', ')};`);
  }
  for (const [name, size] of Object.entries(typography.fontSize)) {
    vars.push(`  --font-size-${name}: ${size};`);
  }
  return vars;
}

export function generateTokensCSS(palette?: PaletteInput): string {
  const colors = palette ? generatePalette(palette) : defaultPalette;

  const lines = [
    '/* SDS Design Tokens — auto-generated, do not edit manually */',
    '/* Run: pnpm build:tokens to regenerate */',
    '',
    ':root {',
    ...colorsToVars(colors),
    ...typographyToVars(),
    '}',
    '',
  ];

  return lines.join('\n');
}
