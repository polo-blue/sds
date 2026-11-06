import { readdirSync, readFileSync } from 'node:fs';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { contrastRatio } from './helpers/contrast.ts';

/**
 * PropsTable: tables generated from component source (`source` prop) and the
 * unchanged hand-written path (`data` prop).
 *
 * - Buttons and Badges render from `Button.vue` / `Badges.vue`, so the table must list
 *   every declared prop (including the hover props the old hand-written array missed),
 *   carry an accessible caption and link to the source file.
 * - Every other docs page still passes `data` and must keep rendering a plain table:
 *   no caption, no source link, one row per hand-written entry.
 */

const REPO = 'https://github.com/polo-blue/sds/blob/main/src/components/';
const PAGES_DIR = new URL('../src/pages/components/', import.meta.url);

/** Docs pages whose every `<PropsTable>` is `data`-only, with the number of rows each declares. */
const dataOnlyPages = readdirSync(PAGES_DIR)
  .filter(file => file.endsWith('.mdx'))
  .map(file => ({ file, text: readFileSync(new URL(file, PAGES_DIR), 'utf8') }))
  .filter(({ text }) => text.includes('<PropsTable') && !text.includes('source='))
  .map(({ file, text }) => ({
    path: `/components/${file.replace(/\.mdx$/, '')}/`,
    // Each table is `data={[ ... ]}`; count `name:` keys per table.
    rowsPerTable: [...text.matchAll(/<PropsTable\s+data=\{\[([\s\S]*?)\]\}\s*\/>/g)].map(
      m => (m[1].match(/\bname:\s*['"`]/g) ?? []).length
    ),
  }));

async function propsTable(page: Page, component: string): Promise<Locator> {
  const table = page.getByRole('table', { name: `Props of ${component}` });
  await expect(table).toBeVisible();
  return table;
}

async function rowsByName(table: Locator): Promise<Record<string, string[]>> {
  const rows = await table
    .locator('tbody tr')
    .evaluateAll(trs =>
      trs.map(tr =>
        [...tr.querySelectorAll('td')].map(td => (td.textContent ?? '').replace(/\s+/g, ' ').trim())
      )
    );
  return Object.fromEntries(
    rows.map(cells => [cells[0].replace(/\s*\*$/, '').replace(/\s*deprecated$/i, ''), cells])
  );
}

/** Lowest WCAG contrast ratio of a cell's text against its effective (first opaque ancestor) background. */
async function minContrast(table: Locator): Promise<number> {
  const pairs = await table.evaluate(el => {
    // Computed colors may be oklch(); paint one pixel to get sRGB + alpha regardless of syntax.
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
    const rgb = (c: string) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    };
    const background = (node: Element | null): number[] => {
      for (; node; node = node.parentElement) {
        const c = rgb(getComputedStyle(node).backgroundColor);
        if (c[3] > 0.5) return c;
      }
      return [255, 255, 255];
    };
    return [...el.querySelectorAll('th, td, td code')]
      .filter(cell => (cell.textContent ?? '').trim())
      .map(cell => [rgb(getComputedStyle(cell).color), background(cell)]);
  });
  return Math.min(...pairs.map(([text, background]) => contrastRatio(text, background)));
}

test.describe('PropsTable generated from source', () => {
  test('Buttons lists every prop declared in Button.vue', async ({ page }) => {
    await page.goto('/components/buttons/');
    const table = await propsTable(page, 'Button');
    const rows = await rowsByName(table);

    expect(Object.keys(rows)).toHaveLength(19);
    for (const hover of ['whiteHover', 'lightHover', 'mediumHover', 'darkHover']) {
      expect(rows[hover], `${hover} row`).toEqual([
        hover,
        'boolean',
        'false',
        expect.stringMatching(/hover state/),
      ]);
    }
    expect(rows.href.slice(0, 3)).toEqual(['href', 'string', '—']);
    expect(rows.primary.slice(1, 3)).toEqual(['boolean', 'false']);
    // The index signature `[key: string]: any` is not a prop.
    expect(Object.keys(rows).some(name => name.includes('key'))).toBe(false);
    // No prop is required, so no required marker is rendered.
    await expect(table.locator('[title="required"]')).toHaveCount(0);
  });

  test('Buttons descriptions render backtick spans as inline code', async ({ page }) => {
    await page.goto('/components/buttons/');
    const table = await propsTable(page, 'Button');
    const descriptions = table.locator('tbody td:last-child');

    await expect(descriptions.filter({ hasText: '`' })).toHaveCount(0);
    await expect(table.locator('tbody tr', { hasText: 'small' }).locator('td:last-child code')).toHaveText(
      'btn-xs'
    );
  });

  test('Buttons links to Button.vue on GitHub with an accessible name', async ({ page }) => {
    await page.goto('/components/buttons/');
    const link = page.getByRole('link', { name: 'src/components/Button.vue (opens in a new tab)' });

    await expect(link).toHaveText('src/components/Button.vue');
    await expect(link).toHaveAttribute('href', `${REPO}Button.vue`);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('Badges renders the runtime-object prop with its PropType and factory default', async ({ page }) => {
    await page.goto('/components/badges/');
    const rows = await rowsByName(await propsTable(page, 'Badges'));

    expect(rows).toEqual({
      badges: ['badges', '(string | BadgeObject)[]', '[]', expect.stringMatching(/^Array of badge labels/)],
    });
    await expect(page.getByRole('link', { name: /^src\/components\/Badges\.vue/ })).toHaveAttribute(
      'href',
      `${REPO}Badges.vue`
    );
  });
});

test.describe('PropsTable with hand-written data (unchanged path)', () => {
  test('found the data-only pages to check', () => {
    expect(dataOnlyPages.length).toBeGreaterThan(15);
  });

  for (const { path, rowsPerTable } of dataOnlyPages) {
    test(`${path} keeps plain tables`, async ({ page }) => {
      await page.goto(path);
      // PropsTable tables only: pages like /components/table/ also demo other `table-base` tables.
      const tables = page
        .locator('table.table-base')
        .filter({ has: page.locator('thead th:first-child', { hasText: /^Prop$/ }) });

      await expect(tables).toHaveCount(rowsPerTable.length);
      for (const [i, expectedRows] of rowsPerTable.entries()) {
        await expect(tables.nth(i).locator('tbody tr')).toHaveCount(expectedRows);
      }
      await expect(tables.locator('caption')).toHaveCount(0);
      await expect(
        page.getByRole('link', { name: /\(opens in a new tab\)$/ }).filter({ hasText: 'src/components/' })
      ).toHaveCount(0);
    });
  }
});

test.describe('PropsTable presentation', () => {
  for (const scheme of ['light', 'dark'] as const) {
    test(`text contrast meets WCAG AA in ${scheme} mode`, async ({ page }) => {
      await page.addInitScript(s => localStorage.setItem('sds-color-scheme', s), scheme);
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto('/components/buttons/');
      const html = page.locator('html');
      if (scheme === 'dark') await expect(html).toHaveClass(/(^|\s)dark(\s|$)/);
      else await expect(html).not.toHaveClass(/(^|\s)dark(\s|$)/);

      const table = await propsTable(page, 'Button');
      expect(await minContrast(table)).toBeGreaterThanOrEqual(4.5);

      await page.getByRole('heading', { name: 'Props Reference' }).scrollIntoViewIfNeeded();
      await table.locator('..').screenshot({ path: test.info().outputPath(`buttons-props-${scheme}.png`) });
    });
  }

  test('at 320px the table scrolls inside its container, not the page', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/components/buttons/');
    const table = await propsTable(page, 'Button');
    const wrapper = table.locator('..');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, 'page-level horizontal overflow (px)').toBeLessThanOrEqual(0);
    expect(await wrapper.evaluate(el => getComputedStyle(el).overflowX)).toBe('auto');

    await wrapper.screenshot({ path: test.info().outputPath('buttons-props-320.png') });
  });
});
