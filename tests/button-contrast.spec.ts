import { expect, test, type Page } from '@playwright/test';
import { createGenerator } from 'unocss';
import { createSdsConfig } from '../uno-config/index.ts';
import { BUTTON_STYLES } from '../uno-config/theme/shortcuts/constants.ts';
import { contrastRatio } from './helpers/contrast.ts';

/**
 * Text contrast of every SDS button shortcut (WCAG 1.4.3, 4.5:1), at rest and on hover,
 * in light and dark mode.
 *
 * The colours are read from a real browser, not from the shortcut strings: which of
 * `dark:text-*` and `hover:text-*` wins is decided by the generated CSS, and that is exactly
 * how `btn-primary-outline` ended up with sky-300 text on accent-light in dark mode.
 *
 * Every measurement is attached to the test result as `measurements`.
 */

const MIN_RATIO = 4.5;

const VARIANTS = [
  'btn',
  ...Object.keys(BUTTON_STYLES.variants).flatMap((name) => [`btn-${name}`, `btn-${name}-outline`]),
  'btn-text',
  'btn-tag',
  'btn-prcode',
];

// The hover modifiers can be put on any variant (`Button.vue` has a prop for each).
const HOVER_MODIFIERS = ['', ...Object.keys(BUTTON_STYLES.hover).map((name) => `btn-${name}-hover`)];

// The pages a button sits on: outline and text buttons take their background from here.
const SURFACES = {
  light: ['bg-white', 'bg-neutral-lightest'],
  dark: ['bg-slate-darkest', 'bg-accent-deepBlue'],
};

const CASES = VARIANTS.flatMap((variant) =>
  HOVER_MODIFIERS.map((modifier) => ({ variant, modifier, id: `${variant}__${modifier}` })),
);

const BUTTONS = CASES.map(
  ({ variant, modifier, id }) => `<p><button id="${id}" class="${variant} ${modifier}">Label</button></p>`,
).join('');

async function buildPageCss() {
  const generator = await createGenerator(createSdsConfig());
  const classes = new Set([...VARIANTS, ...HOVER_MODIFIERS, ...Object.values(SURFACES).flat()]);
  const { css } = await generator.generate(classes, { preflights: false, safelist: false });
  // What the reset gives a real page; without it a `<button>` keeps the browser's grey fill.
  // Transitions off, so a hover is read at its final colour.
  return `
    *, ::before, ::after { box-sizing: border-box; border: 0 solid; transition: none !important; }
    button { background: transparent; color: inherit; font: inherit; }
    ${css}
  `;
}

const toHex = (rgb: number[]) => `#${rgb.map((byte) => byte.toString(16).padStart(2, '0')).join('')}`;

/** Reads the sRGB bytes the browser paints for the text and for everything behind it. */
async function measure(page: Page, id: string) {
  const { color, background } = await page.evaluate((elementId) => {
    const context = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
    context.canvas.width = 1;
    context.canvas.height = 1;

    const paint = (css: string, under: number[]) => {
      context.fillStyle = `rgb(${under.join(' ')})`;
      context.fillRect(0, 0, 1, 1);
      context.fillStyle = css;
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
    };

    const element = document.getElementById(elementId)!;
    const chain: HTMLElement[] = [];
    for (let node: HTMLElement | null = element; node; node = node.parentElement) {
      chain.unshift(node);
    }
    const background = chain.reduce(
      (under, node) => paint(getComputedStyle(node).backgroundColor, under),
      [255, 255, 255],
    );
    return { color: paint(getComputedStyle(element).color, background), background };
  }, id);

  return {
    color: toHex(color),
    background: toHex(background),
    // Rounded down, so 4.499 cannot pass as 4.5.
    ratio: Math.floor(contrastRatio(color, background) * 100) / 100,
  };
}

test('every button keeps 4.5:1 text contrast at rest and on hover', async ({ page }, testInfo) => {
  const css = await buildPageCss();
  const measurements = [];

  for (const [mode, surfaces] of Object.entries(SURFACES)) {
    for (const surface of surfaces) {
      await page.setContent(
        `<html class="${mode}"><head><style>${css}</style></head><body class="${surface}">${BUTTONS}</body></html>`,
      );

      for (const { variant, modifier, id } of CASES) {
        const base = { variant, modifier, mode, surface };
        await page.mouse.move(0, 0);
        measurements.push({ ...base, state: 'rest', ...(await measure(page, id)) });
        await page.locator(`#${id}`).hover({ force: true });
        measurements.push({ ...base, state: 'hover', ...(await measure(page, id)) });
      }
    }
  }

  await testInfo.attach('measurements', {
    body: JSON.stringify(measurements, null, 2),
    contentType: 'application/json',
  });

  const failures = measurements
    .filter(({ ratio }) => ratio < MIN_RATIO)
    .map(
      ({ variant, modifier, mode, surface, state, color, background, ratio }) =>
        `${[variant, modifier].filter(Boolean).join(' + ')} (${mode}, ${surface}, ${state}): ` +
        `${color} on ${background} = ${ratio}:1`,
    );
  expect(failures).toEqual([]);
});
