import { expect, test } from '@playwright/test';

/**
 * Regression test for the navbar dark-mode toggle.
 *
 * Bug: `setupDarkModeToggle()` in Header.astro ran three times (immediate call +
 * `astro:page-load` + `astro:after-swap`) with no guard, attaching multiple click
 * listeners to the same `#dark-mode-toggle` button. Each click toggled `.dark` an
 * even number of times, so the theme never visibly changed — switching to light
 * mode (or back) appeared broken.
 *
 * These tests assert that a single click flips the theme exactly once and that the
 * choice persists to localStorage and survives a reload.
 */

const TOGGLE = '#dark-mode-toggle';
// A docs page that uses MainLayout, where the navbar dark-mode toggle is rendered.
const PAGE = '/core/introduction/';
// Matches the `dark` class as a standalone token in the <html> class list.
const DARK_CLASS = /(^|\s)dark(\s|$)/;

test.describe('navbar dark-mode toggle', () => {
  // Force a deterministic starting point: emulate the light system preference so the
  // page boots in light mode regardless of the runner's OS settings.
  test.use({ colorScheme: 'light' });

  test.beforeEach(async ({ page }) => {
    // Each test runs in an isolated browser context with empty localStorage, so the
    // `colorScheme: 'light'` emulation above is enough to boot deterministically in
    // light mode — no manual storage reset needed (resetting here would also wipe the
    // value on reload and break the persistence test).
    await page.goto(PAGE);
    // Wait for the toggle to be wired before interacting.
    await expect(page.locator(TOGGLE)).toBeVisible();
  });

  test('starts in light mode', async ({ page }) => {
    await expect(page.locator('html')).not.toHaveClass(DARK_CLASS);
  });

  test('a single click switches to dark mode', async ({ page }) => {
    await page.locator(TOGGLE).click();

    await expect(page.locator('html')).toHaveClass(DARK_CLASS);
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');

    const stored = await page.evaluate(() => window.localStorage.getItem('sds-color-scheme'));
    expect(stored).toBe('dark');
  });

  test('clicking twice returns to light mode (the regression)', async ({ page }) => {
    const html = page.locator('html');

    await page.locator(TOGGLE).click();
    await expect(html).toHaveClass(DARK_CLASS);

    await page.locator(TOGGLE).click();
    // With the double-bind bug this stayed dark; one listener now flips it back.
    await expect(html).not.toHaveClass(DARK_CLASS);
    await expect(html).toHaveCSS('color-scheme', 'light');

    const stored = await page.evaluate(() => window.localStorage.getItem('sds-color-scheme'));
    expect(stored).toBe('light');
  });

  test('the chosen theme persists across a reload', async ({ page }) => {
    await page.locator(TOGGLE).click();
    await expect(page.locator('html')).toHaveClass(DARK_CLASS);

    await page.reload();
    await expect(page.locator('html')).toHaveClass(DARK_CLASS);
  });
});
