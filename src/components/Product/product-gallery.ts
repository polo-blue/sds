/**
 * ProductGallery — scroll-snap slider + dialog lightbox
 *
 * Tiny JS layer (~2-3 KB) on top of CSS scroll-snap:
 * - IntersectionObserver for active slide tracking
 * - Thumbnail sync (click → scrollIntoView)
 * - Arrow navigation (scrollBy)
 * - Dialog open/close with zoom + pan
 */

export function initProductGallery(root: HTMLElement) {
  const slider = root.querySelector<HTMLElement>('[data-gallery-slider]');
  if (!slider) return;

  const slides = slider.querySelectorAll<HTMLElement>('[data-index]');
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  // Elements
  const counterCurrent = root.querySelector<HTMLElement>('[data-gallery-current]');
  const prevBtn = root.querySelector<HTMLButtonElement>('[data-gallery-prev]');
  const nextBtn = root.querySelector<HTMLButtonElement>('[data-gallery-next]');
  const thumbsContainer = root.querySelector<HTMLElement>('[data-gallery-thumbs]');
  const thumbButtons = thumbsContainer?.querySelectorAll<HTMLButtonElement>('[data-thumb-index]');

  // Dialog elements
  const dialog = root.querySelector<HTMLDialogElement>('[data-gallery-dialog]');
  const dialogSlider = dialog?.querySelector<HTMLElement>('[data-dialog-slider]');
  const dialogCurrent = dialog?.querySelector<HTMLElement>('[data-dialog-current]');
  const dialogClose = dialog?.querySelector<HTMLButtonElement>('[data-dialog-close]');
  const dialogPrev = dialog?.querySelector<HTMLButtonElement>('[data-dialog-prev]');
  const dialogNext = dialog?.querySelector<HTMLButtonElement>('[data-dialog-next]');
  const dialogThumbs = dialog?.querySelectorAll<HTMLButtonElement>('[data-thumb-index]');

  let activeIndex = 0;

  // ── Slide tracking via IntersectionObserver ──

  function createSlideObserver(container: HTMLElement, onActiveChange: (index: number) => void) {
    const observer = new IntersectionObserver(
      entries => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.5 &&
            (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio)
          ) {
            bestEntry = entry;
          }
        }
        if (bestEntry) {
          const index = Number((bestEntry.target as HTMLElement).dataset.index);
          if (!isNaN(index)) onActiveChange(index);
        }
      },
      { root: container, threshold: 0.5 }
    );

    container.querySelectorAll<HTMLElement>('[data-index]').forEach(slide => {
      observer.observe(slide);
    });

    return observer;
  }

  // Main slider observer
  createSlideObserver(slider, index => {
    activeIndex = index;
    updateCounter(counterCurrent, index);
    updateThumbs(thumbButtons, index);
    updateArrows(prevBtn, nextBtn, index, totalSlides);
  });

  // ── Counter ──

  function updateCounter(el: HTMLElement | null | undefined, index: number) {
    if (el) el.textContent = String(index + 1);
  }

  // ── Thumbnails ──

  function updateThumbs(buttons: NodeListOf<HTMLButtonElement> | undefined, index: number) {
    if (!buttons) return;
    buttons.forEach(btn => {
      const isActive = Number(btn.dataset.thumbIndex) === index;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
      // Scroll active thumb into view
      if (isActive) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    });
  }

  function scrollToSlide(container: HTMLElement, index: number) {
    const slide = container.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // Thumb clicks → scroll main slider
  thumbButtons?.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.thumbIndex);
      scrollToSlide(slider, index);
    });
  });

  // ── Mouse drag-to-scroll ──

  initDragScroll(slider);
  if (thumbsContainer) initDragScroll(thumbsContainer, true);

  // ── Arrow navigation ──

  function updateArrows(
    prev: HTMLButtonElement | null | undefined,
    next: HTMLButtonElement | null | undefined,
    index: number,
    total: number
  ) {
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === total - 1;
  }

  prevBtn?.addEventListener('click', () => {
    scrollToSlide(slider, Math.max(0, activeIndex - 1));
  });

  nextBtn?.addEventListener('click', () => {
    scrollToSlide(slider, Math.min(totalSlides - 1, activeIndex + 1));
  });

  // Keyboard navigation on main slider
  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToSlide(slider, Math.max(0, activeIndex - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToSlide(slider, Math.min(totalSlides - 1, activeIndex + 1));
    }
  });

  // ── Dialog (fullscreen lightbox) ──

  if (!dialog || !dialogSlider) return;

  let dialogObserver: IntersectionObserver | null = null;
  let dialogActiveIndex = 0;
  let savedOverflow = '';

  // Open dialog on slide click or Enter/Space (but not after drag)
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      // Skip if this click was the end of a drag gesture
      if (slider.dataset.wasDragged === '1') return;
      openDialog(Number(slide.dataset.index));
    });
    slide.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDialog(Number(slide.dataset.index));
      }
    });
  });

  function preloadDialogImages(centerIndex: number) {
    if (!dialogSlider) return;
    // Eagerly load the current, previous, and next full-res images
    for (let i = centerIndex - 1; i <= centerIndex + 1; i++) {
      if (i < 0 || i >= totalSlides) continue;
      const img = dialogSlider.querySelector<HTMLImageElement>(`[data-index="${i}"] [data-zoom-img]`);
      if (img && img.loading === 'lazy') {
        img.loading = 'eager';
      }
    }
  }

  function openDialog(startIndex: number) {
    if (!dialog || !dialogSlider || dialog.open) return;

    // Temporarily disable snap + smooth scroll so the dialog opens at the correct slide
    dialogSlider.style.scrollSnapType = 'none';
    dialogSlider.style.scrollBehavior = 'auto';

    dialog.showModal();
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Preload full-res images around the starting slide
    preloadDialogImages(startIndex);

    // Scroll to the clicked image instantly (must happen after layout)
    const targetSlide = dialogSlider.querySelector<HTMLElement>(`[data-index="${startIndex}"]`);
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: 'auto', inline: 'center' });
    }

    // Re-enable snap after scroll position is set
    requestAnimationFrame(() => {
      dialogSlider.style.scrollSnapType = '';
      dialogSlider.style.scrollBehavior = '';
    });

    dialogActiveIndex = startIndex;
    updateCounter(dialogCurrent, startIndex);
    updateThumbs(dialogThumbs, startIndex);
    updateArrows(dialogPrev, dialogNext, startIndex, totalSlides);

    // Start observing dialog slides
    if (!dialogObserver) {
      dialogObserver = createSlideObserver(dialogSlider, index => {
        dialogActiveIndex = index;
        updateCounter(dialogCurrent, index);
        updateThumbs(dialogThumbs, index);
        updateArrows(dialogPrev, dialogNext, index, totalSlides);
        preloadDialogImages(index);
      });
    }
  }

  function teardownDialog() {
    // Reset all zoom states
    dialog.querySelectorAll<HTMLElement>('[data-zoom-container]').forEach(resetZoom);

    // Disconnect slide observer to stop tracking invisible slides
    if (dialogObserver) {
      dialogObserver.disconnect();
      dialogObserver = null;
    }

    document.body.style.overflow = savedOverflow;

    // Sync main slider to dialog position
    scrollToSlide(slider, dialogActiveIndex);
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
  }

  // Runs on both explicit close and native Escape
  dialog.addEventListener('close', teardownDialog);

  dialogClose?.addEventListener('click', closeDialog);

  // Close on backdrop click
  dialog.addEventListener('click', e => {
    if (e.target === dialog) closeDialog();
  });

  // Dialog arrow navigation
  dialogPrev?.addEventListener('click', () => {
    scrollToSlide(dialogSlider!, Math.max(0, dialogActiveIndex - 1));
  });

  dialogNext?.addEventListener('click', () => {
    scrollToSlide(dialogSlider!, Math.min(totalSlides - 1, dialogActiveIndex + 1));
  });

  // Dialog thumbnail clicks
  dialogThumbs?.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.thumbIndex);
      scrollToSlide(dialogSlider!, index);
    });
  });

  // Keyboard navigation in dialog
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToSlide(dialogSlider!, Math.max(0, dialogActiveIndex - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToSlide(dialogSlider!, Math.min(totalSlides - 1, dialogActiveIndex + 1));
    }
  });

  // ── Drag-to-scroll on dialog slider + thumbnails ──

  initDragScroll(dialogSlider);
  const dialogThumbsContainer = dialog.querySelector<HTMLElement>('[data-dialog-thumbs]');
  if (dialogThumbsContainer) initDragScroll(dialogThumbsContainer, true);

  // ── Zoom + Pan ──

  dialog.querySelectorAll<HTMLElement>('[data-zoom-container]').forEach(container => {
    initZoom(container);
  });
}

// ── Mouse drag-to-scroll ──
// Desktop mouse-drag support. Touch uses native scroll.
// On release, browser's native scroll-snap handles the snap animation.

function initDragScroll(container: HTMLElement, freeScroll = false) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasMoved = false;
  let pointerId: number | null = null;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let resetTimer: ReturnType<typeof setTimeout> | null = null;

  function resetStyles() {
    container.style.cursor = '';
    container.style.userSelect = '';
    container.style.scrollBehavior = '';
    container.style.scrollSnapType = '';
  }

  // Block native image/link drag inside the container
  container.addEventListener('dragstart', e => {
    e.preventDefault();
  });

  container.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.pointerType === 'touch') return;

    isDown = true;
    hasMoved = false;
    pointerId = e.pointerId;
    if (resetTimer !== null) {
      clearTimeout(resetTimer);
      resetTimer = null;
    }
    startX = e.clientX;
    scrollLeft = container.scrollLeft;
    lastX = e.clientX;
    lastTime = Date.now();
    velocity = 0;
    container.dataset.wasDragged = '0';
  });

  container.addEventListener('pointermove', e => {
    if (!isDown) return;

    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) velocity = (e.clientX - lastX) / dt;
    lastX = e.clientX;
    lastTime = now;

    const walk = e.clientX - startX;

    if (Math.abs(walk) > 5) {
      if (!hasMoved) {
        hasMoved = true;
        // Set pointer capture only once drag threshold is exceeded,
        // so simple clicks still reach child elements
        if (pointerId !== null) {
          try {
            container.setPointerCapture(pointerId);
          } catch {
            /* pointer capture may not be supported */
          }
        }
        container.style.scrollSnapType = 'none';
        container.style.scrollBehavior = 'auto';
        container.style.cursor = 'grabbing';
        container.style.userSelect = 'none';
        container.dataset.wasDragged = '1';
      }
      container.scrollLeft = scrollLeft - walk;
    }
  });

  container.addEventListener('pointerup', () => {
    if (!isDown) return;
    isDown = false;

    if (pointerId !== null) {
      try {
        container.releasePointerCapture(pointerId);
      } catch {
        /* pointer may already be released */
      }
      pointerId = null;
    }

    if (!hasMoved) {
      resetStyles();
      return;
    }

    container.style.cursor = '';
    container.style.userSelect = '';

    if (freeScroll) {
      // Free scroll (thumbnails) — just restore styles, stay where released
      resetStyles();
    } else {
      // Snap mode (slides) — snap to nearest or next/prev slide
      const w = container.clientWidth;
      const dragDist = container.scrollLeft - scrollLeft;
      const dragRatio = Math.abs(dragDist) / w;
      const speed = Math.abs(velocity);

      const shouldChange = dragRatio > 0.15 || speed > 0.3;
      const currentIndex = Math.round(scrollLeft / w);
      let targetIndex = currentIndex;

      if (shouldChange) {
        targetIndex =
          dragDist > 0
            ? Math.min(currentIndex + 1, container.children.length - 1)
            : Math.max(currentIndex - 1, 0);
      }

      container.style.scrollBehavior = 'smooth';
      container.scrollLeft = targetIndex * w;
      resetTimer = setTimeout(() => {
        resetStyles();
        resetTimer = null;
      }, 350);
    }
  });

  container.addEventListener('pointercancel', () => {
    isDown = false;
    hasMoved = false;
    resetStyles();
  });

  // Also reset on lostpointercapture as safety net
  container.addEventListener('lostpointercapture', () => {
    if (isDown) {
      isDown = false;
      hasMoved = false;
      resetStyles();
    }
  });

  // Window-level cleanup for mouse released outside the slider
  // (before pointer capture is acquired at the drag threshold)
  window.addEventListener('pointerup', () => {
    if (isDown) {
      isDown = false;
      hasMoved = false;
      resetStyles();
    }
  });

  // Prevent click after drag
  container.addEventListener(
    'click',
    e => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        requestAnimationFrame(() => {
          hasMoved = false;
        });
      }
    },
    true
  );
}

// ── Zoom implementation ──
// Click to zoom in (scale 2.5x) centered on click point.
// Mouse-move pans proportionally. Click again to zoom out.
// GPU-accelerated via transform: scale() + translate().

const ZOOM_SCALE = 2.5;

// WeakMap to store cleanup functions for zoom containers
const zoomCleanups = new WeakMap<HTMLElement, () => void>();

function initZoom(container: HTMLElement) {
  const img = container.querySelector<HTMLImageElement>('[data-zoom-img]');
  if (!img) return;

  let isZoomed = false;

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  function zoomIn(clientX: number, clientY: number) {
    isZoomed = true;
    container.classList.add('is-zoomed');

    const rect = img.getBoundingClientRect();
    // Set transform-origin to click point (relative to image), clamped to 0–100%
    const originX = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    const originY = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100);
    img.style.transformOrigin = `${originX}% ${originY}%`;
    img.style.transform = `scale(${ZOOM_SCALE})`;
  }

  function zoomOut() {
    isZoomed = false;
    container.classList.remove('is-zoomed');
    img.style.transform = 'scale(1)';
    container.removeEventListener('mousemove', onMouseMove);
  }

  // Mouse-move panning: move the transform-origin proportionally to cursor position
  function onMouseMove(e: MouseEvent) {
    if (!isZoomed) return;
    const rect = img.getBoundingClientRect();
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 0, 100);
    img.style.transformOrigin = `${x}% ${y}%`;
  }

  // Store cleanup so resetZoom can remove the mousemove listener
  zoomCleanups.set(container, () => {
    isZoomed = false;
    container.removeEventListener('mousemove', onMouseMove);
  });

  // Track touch timestamps to avoid touch-generated clicks triggering zoom
  let lastTouchTime = 0;
  container.addEventListener(
    'touchstart',
    () => {
      lastTouchTime = Date.now();
    },
    { passive: true }
  );
  container.addEventListener(
    'touchend',
    () => {
      lastTouchTime = Date.now();
    },
    { passive: true }
  );

  container.addEventListener('click', e => {
    // Ignore touch-generated clicks — mobile uses double-tap instead
    if (Date.now() - lastTouchTime < 500) return;

    // Ignore clicks that are the end of a drag gesture (from parent slider)
    const parentSlider = container.closest<HTMLElement>('[data-dialog-slider], [data-gallery-slider]');
    if (parentSlider?.dataset.wasDragged === '1') return;

    if (isZoomed) {
      zoomOut();
    } else {
      zoomIn(e.clientX, e.clientY);
      container.addEventListener('mousemove', onMouseMove);
    }
  });

  // Mouse wheel zoom
  container.addEventListener(
    'wheel',
    e => {
      if (e.deltaY < 0 && !isZoomed) {
        e.preventDefault();
        zoomIn(e.clientX, e.clientY);
        container.addEventListener('mousemove', onMouseMove);
      } else if (e.deltaY > 0 && isZoomed) {
        e.preventDefault();
        zoomOut();
      }
    },
    { passive: false }
  );

  // Double-tap to zoom (mobile)
  let lastTap = 0;
  container.addEventListener(
    'touchend',
    e => {
      const now = Date.now();
      if (now - lastTap < 300) {
        e.preventDefault();
        if (isZoomed) {
          zoomOut();
        } else {
          const touch = e.changedTouches[0];
          zoomIn(touch.clientX, touch.clientY);
        }
      }
      lastTap = now;
    },
    { passive: false }
  );
}

function resetZoom(container: HTMLElement) {
  const img = container.querySelector<HTMLImageElement>('[data-zoom-img]');
  if (img) img.style.transform = '';
  container.classList.remove('is-zoomed');
  // Clean up mousemove listener if zoom was active
  zoomCleanups.get(container)?.();
}
