import { expect, type Locator, type Page, test } from '@playwright/test';

/**
 * Regression tests for ProductGallery accessibility (issue #457).
 *
 * Bugs: opening the lightbox left focus on the clicked slide, closing it lost
 * focus, Tab was not kept inside the dialog, the active main slide had no
 * `aria-current`, and JS-driven scrolling stayed smooth under
 * `prefers-reduced-motion: reduce`.
 */

const PAGE = '/components/product-gallery/';
// First demo: the basic multi-image gallery
const GALLERY = '[data-product-gallery]';

const slide = (gallery: Locator, index: number) =>
  gallery.locator(`[data-gallery-slider] [data-index="${index}"]`);

async function openFromFirstSlide(page: Page, gallery: Locator) {
  const dialog = gallery.locator('[data-gallery-dialog]');
  await slide(gallery, 0).focus();
  await page.keyboard.press('Enter');
  await expect(dialog).toHaveAttribute('open', '');
  return dialog;
}

test.describe('ProductGallery a11y', () => {
  let gallery: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    gallery = page.locator(GALLERY).first();
    // Wait until the auto-init has wired the gallery up
    await expect(gallery).toHaveAttribute('data-sds-gallery-bound', '1');
  });

  test('marks the active main slide with aria-current', async ({ page }) => {
    await expect(slide(gallery, 0)).toHaveAttribute('aria-current', 'true');

    await gallery.locator('[data-gallery-slider]').focus();
    await page.keyboard.press('ArrowRight');

    await expect(slide(gallery, 1)).toHaveAttribute('aria-current', 'true');
    await expect(slide(gallery, 0)).not.toHaveAttribute('aria-current', /.*/);
  });

  test('moves focus into the dialog, traps Tab, and returns focus on close', async ({ page }) => {
    const dialog = await openFromFirstSlide(page, gallery);
    await expect(dialog.locator('[data-dialog-close]')).toBeFocused();

    // Cycle well past the number of controls both ways — focus must never leave the dialog
    for (const [key, presses] of [
      ['Tab', 25],
      ['Shift+Tab', 5],
    ] as const) {
      for (let i = 0; i < presses; i++) {
        await page.keyboard.press(key);
        expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
      }
    }

    await page.keyboard.press('Escape');
    await expect(dialog).not.toHaveAttribute('open', '');
    await expect(slide(gallery, 0)).toBeFocused();
  });

  test('returns focus to the slide navigated to inside the dialog', async ({ page }) => {
    const dialog = await openFromFirstSlide(page, gallery);

    await page.keyboard.press('ArrowRight');
    await expect(dialog.locator('[data-dialog-current]')).toHaveText('2');

    await dialog.locator('[data-dialog-close]').click();
    await expect(slide(gallery, 1)).toBeFocused();
  });

  test('keeps focus in the dialog when the focused Next arrow disables at the last image', async ({
    page,
  }) => {
    const dialog = await openFromFirstSlide(page, gallery);
    const total = await gallery.locator('[data-gallery-slider] [data-index]').count();
    const next = dialog.locator('[data-dialog-next]');

    await next.focus();
    for (let i = 1; i < total; i++) {
      await page.keyboard.press('Enter');
      await expect(dialog.locator('[data-dialog-current]')).toHaveText(String(i + 1));
    }

    await expect(next).toBeDisabled();
    // Focus moved to the Previous arrow instead of falling to <body>…
    await expect(dialog.locator('[data-dialog-prev]')).toBeFocused();
    // …so dialog keyboard navigation still works
    await page.keyboard.press('ArrowLeft');
    await expect(dialog.locator('[data-dialog-current]')).toHaveText(String(total - 1));
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('scrolls instantly instead of smoothly', async ({ page }) => {
      const slider = gallery.locator('[data-gallery-slider]');

      // Record every scrollIntoView behavior the gallery requests
      const behaviors = await page.evaluateHandle(() => {
        const calls: string[] = [];
        const original = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function (arg?: boolean | ScrollIntoViewOptions) {
          if (typeof arg === 'object') calls.push(String(arg.behavior));
          return original.call(this, arg);
        };
        return calls;
      });

      await slider.focus();
      await page.keyboard.press('ArrowRight');

      const recorded = await behaviors.jsonValue();
      expect(recorded.length).toBeGreaterThan(0);
      expect(recorded.every(b => b === 'instant')).toBe(true);
      await expect(slider).toHaveCSS('scroll-behavior', 'auto');
    });
  });
});
