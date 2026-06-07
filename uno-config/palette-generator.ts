import { parse, converter } from 'culori';
import type { Colors } from './theme/colors';

const toOklch = converter('oklch');
const MAX_CHROMA = 0.37;

const PRIMARY_SHADES = [
  { name: 'ultralight', l: 0.93, cRatio: 0.155 },
  { name: 'lightest',   l: 0.62, cRatio: 0.912 },
  { name: 'light',      l: 0.57, cRatio: 1.150 },
  { name: 'default',    l: 0.51, cRatio: 1.000 },
  { name: 'medium',     l: 0.34, cRatio: 0.675 },
  { name: 'darker',     l: 0.25, cRatio: 0.480 },
  { name: 'darkest',    l: 0.17, cRatio: 0.282 },
] as const;

const ACCENT_SHADES = [
  { name: 'light',    l: 0.65, cRatio: 1.000 },
  { name: 'medium',   l: 0.59, cRatio: 1.105 },
  { name: 'default',  l: 0.59, cRatio: 0.909 },
  { name: 'dark',     l: 0.51, cRatio: 0.846 },
  { name: 'darker',   l: 0.38, cRatio: 0.776 },
  { name: 'deepBlue', l: 0.22, cRatio: 0.357 },
] as const;

// Neutrals: fixed low C, only H follows primary (tinted grays)
const NEUTRAL_SHADES = [
  { name: 'lightest', l: 0.97, c: 0.003 },
  { name: 'lighter',  l: 0.93, c: 0.006 },
  { name: 'light',    l: 0.79, c: 0.016 },
  { name: 'default',  l: 0.71, c: 0.019 },
  { name: 'dark',     l: 0.56, c: 0.018 },
  { name: 'darker',   l: 0.45, c: 0.026 },
] as const;

const SLATE_SHADES = [
  { name: 'light',    l: 0.55, c: 0.041 },
  { name: 'default',  l: 0.45, c: 0.037 },
  { name: 'dark',     l: 0.37, c: 0.039 },
  { name: 'darkest',  l: 0.28, c: 0.037 },
] as const;

const SYSTEM_COLORS: Colors['system'] = {
  success: 'oklch(70% 0.149 163)',
  warning: 'oklch(84% 0.164 84)',
  error:   'oklch(64% 0.208 25)',
  info:    'oklch(62% 0.188 260)',
};

const STATE_COLORS: Colors['state'] = {
  overlay:  'oklch(0% 0 0 / 0.06)',
  disabled: 'oklch(0% 0 0 / 0.12)',
};

function fmt(l: number, c: number, h: number): string {
  return `oklch(${Math.round(l * 100)}% ${c.toFixed(3)} ${Math.round(h)})`;
}

function parseColor(input: string): { l: number; c: number; h: number } | null {
  const parsed = parse(input);
  if (!parsed) return null;
  const ok = toOklch(parsed);
  if (!ok || ok.h == null) return null;
  return { l: ok.l ?? 0, c: ok.c ?? 0, h: ok.h };
}

function buildShadedPalette<T>(
  shades: ReadonlyArray<{ name: string; cRatio: number; l: number }>,
  h: number,
  refC: number,
  minC: number,
): T {
  const c = Math.max(refC, minC);
  return Object.fromEntries(
    shades.map(s => [s.name, fmt(s.l, Math.min(c * s.cRatio, MAX_CHROMA), h)])
  ) as T;
}

function buildFixedChromaPalette<T>(
  shades: ReadonlyArray<{ name: string; c: number; l: number }>,
  h: number,
): T {
  return Object.fromEntries(shades.map(s => [s.name, fmt(s.l, s.c, h)])) as T;
}

export interface PaletteInput {
  /** Brand primary color (hex, rgb, oklch, hsl, etc.) */
  primary: string;
  /** Brand secondary color — defaults to primary H + 30° */
  secondary?: string;
  /** Accent color — defaults to secondary */
  accent?: string;
}

/**
 * Generates a full SDS-compatible color palette from brand color inputs.
 *
 * Extracts H+C from each input via OKLCH, applies the SDS shade profile
 * (fixed L per shade, C scaled proportionally), and tints neutrals with the
 * primary hue. System and state colors are always fixed (semantic, not brand).
 *
 * @example
 * generatePalette({ primary: '#2563eb' })
 * generatePalette({ primary: '#7c3aed', secondary: '#db2777' })
 */
export function generatePalette(input: PaletteInput): Colors {
  const primary = parseColor(input.primary);
  if (!primary) throw new Error(`[SDS] Invalid primary color: "${input.primary}"`);

  const secondary = input.secondary
    ? parseColor(input.secondary) ?? (() => { throw new Error(`[SDS] Invalid secondary color: "${input.secondary}"`); })()
    : { ...primary, h: (primary.h + 30) % 360 };

  const accent = input.accent
    ? parseColor(input.accent) ?? (() => { throw new Error(`[SDS] Invalid accent color: "${input.accent}"`); })()
    : secondary;

  return {
    brand: {
      primary:   fmt(primary.l,   primary.c,   primary.h),
      secondary: fmt(secondary.l, secondary.c, secondary.h),
    },
    blue:    buildShadedPalette<Colors['blue']>(PRIMARY_SHADES, primary.h, primary.c, 0.05),
    accent:  buildShadedPalette<Colors['accent']>(ACCENT_SHADES, accent.h, accent.c, 0.04),
    neutral: buildFixedChromaPalette<Colors['neutral']>(NEUTRAL_SHADES, primary.h),
    slate:   buildFixedChromaPalette<Colors['slate']>(SLATE_SHADES, primary.h),
    system:  SYSTEM_COLORS,
    state:   STATE_COLORS,
  };
}

export const defaultPalette: Colors = {
  brand: {
    primary:   'oklch(44% 0.213 263)',
    secondary: 'oklch(71% 0.149 234)',
  },
  blue: {
    ultralight: 'oklch(93% 0.032 256)',
    lightest:   'oklch(62% 0.188 260)',
    light:      'oklch(57% 0.237 260)',
    default:    'oklch(51% 0.206 260)',
    medium:     'oklch(34% 0.139 261)',
    darker:     'oklch(25% 0.099 259)',
    darkest:    'oklch(17% 0.058 256)',
    wrc:        'oklch(38% 0.261 264)',
  },
  accent: {
    light:    'oklch(65% 0.143 238)',
    medium:   'oklch(59% 0.158 248)',
    default:  'oklch(59% 0.130 238)',
    dark:     'oklch(51% 0.121 241)',
    darker:   'oklch(38% 0.111 251)',
    deepBlue: 'oklch(22% 0.051 261)',
  },
  neutral: {
    lightest: 'oklch(97% 0.003 265)',
    lighter:  'oklch(93% 0.006 265)',
    light:    'oklch(79% 0.016 261)',
    default:  'oklch(71% 0.019 261)',
    dark:     'oklch(56% 0.018 233)',
    darker:   'oklch(45% 0.026 257)',
  },
  slate: {
    light:    'oklch(55% 0.041 257)',
    default:  'oklch(45% 0.037 257)',
    dark:     'oklch(37% 0.039 257)',
    darkest:  'oklch(28% 0.037 260)',
  },
  system: SYSTEM_COLORS,
  state:  STATE_COLORS,
};
