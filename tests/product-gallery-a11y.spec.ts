import { expect, type Locator, type Page, test } from '@playwright/test';

/**
 * Regression tests for ProductGallery accessibility (issue #457).
 *
 * Bugs: opening the lightbox left focus on the clicked slide, closing it lost
 * focus, Tab was not kept inside the dialog, the active main slide had no
 * `aria-current`, and JS-driven scrolling stayed smooth under
 * `prefers-reduced-motion: reduce`.
 *
 * Also: slide width was only re-measured on window resize, so a gallery whose
 * container settled later showed part of the next slide, and focus rings were
 * clipped by the slider.
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

// Resizes the gallery on its own: no window resize event fires
const shrink = (gallery: Locator) =>
  gallery.evaluate(el => {
    el.style.width = '300px';
  });

async function expectOneSlideWide(gallery: Locator) {
  const width = await gallery.locator('[data-gallery-slider]').evaluate(el => el.clientWidth);
  await expect
    .poll(() => slide(gallery, 0).evaluate(el => el.getBoundingClientRect().width))
    .toBe(width);
}

// Labels of the controls whose outline an overflow-clipping ancestor would cut off
function clippedFocusRings(root: Locator, selector: string) {
  return root.evaluate((el, controlSelector) => {
    const clipped: string[] = [];
    for (const control of el.querySelectorAll<HTMLElement>(controlSelector)) {
      control.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
      control.focus();
      const style = getComputedStyle(control);
      const spread = parseFloat(style.outlineOffset) + parseFloat(style.outlineWidth);
      const box = control.getBoundingClientRect();
      for (let a = control.parentElement; a; a = a.parentElement) {
        if (getComputedStyle(a).overflowX !== 'visible') {
          const clip = a.getBoundingClientRect();
          if (
            box.left - spread < clip.left - 0.5 ||
            box.right + spread > clip.right + 0.5 ||
            box.top - spread < clip.top - 0.5 ||
            box.bottom + spread > clip.bottom + 0.5
          ) {
            clipped.push(control.getAttribute('aria-label') ?? control.className);
            break;
          }
        }
        if (a === el) break;
      }
    }
    return clipped;
  }, selector);
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

  test("draws focus rings inside the gallery's clipping containers", async ({ page }) => {
    // Puts the page in keyboard modality so focus() matches :focus-visible
    await page.keyboard.press('Tab');
    expect(
      await clippedFocusRings(
        gallery,
        '[data-gallery-slider], [data-gallery-slider] [data-index], [data-gallery-thumbs] [data-thumb-index]'
      )
    ).toEqual([]);

    const dialog = await openFromFirstSlide(page, gallery);
    expect(
      await clippedFocusRings(
        dialog,
        '[data-dialog-close], [data-dialog-slider], [data-dialog-thumbs] [data-thumb-index]'
      )
    ).toEqual([]);
  });

  test('re-measures slides when the gallery resizes without a window resize', async () => {
    await shrink(gallery);
    await expectOneSlideWide(gallery);
  });

  test('keeps the active slide in place when the gallery resizes', async ({ page }) => {
    const slider = gallery.locator('[data-gallery-slider]');
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await expect(slide(gallery, 1)).toHaveAttribute('aria-current', 'true');
    await page.keyboard.press('ArrowRight');
    await expect(slide(gallery, 2)).toHaveAttribute('aria-current', 'true');

    await shrink(gallery);

    await expect
      .poll(() =>
        slider.evaluate(el => {
          const active = el.querySelector('[data-index="2"]')!.getBoundingClientRect();
          return Math.abs(active.left - el.getBoundingClientRect().left);
        })
      )
      .toBeLessThan(1);
    await expect(slide(gallery, 2)).toHaveAttribute('aria-current', 'true');
  });

  test.describe('on a narrow viewport', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('shows exactly one slide', async () => {
      const slider = gallery.locator('[data-gallery-slider]');
      expect(await slider.evaluate(el => el.clientWidth)).toBeLessThan(375);
      await expectOneSlideWide(gallery);
    });
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
