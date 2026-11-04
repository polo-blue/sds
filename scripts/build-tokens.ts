#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateTokensCSS } from '../uno-config/token-exporter.ts';
import type { PaletteInput } from '../uno-config/palette-generator.ts';

const OUTPUT = resolve(import.meta.dirname, '../src/styles/tokens.css');

function parseArgs(): PaletteInput | undefined {
  const args = Object.fromEntries(
    process.argv.slice(2)
      .filter(a => a.startsWith('--'))
      .map(a => a.slice(2).split('=') as [string, string])
  );
  return args.primary ? (args as PaletteInput) : undefined;
}

const palette = parseArgs();
writeFileSync(OUTPUT, generateTokensCSS(palette), 'utf8');
