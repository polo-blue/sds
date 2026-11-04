/**
 * ProductGallery auto-init — import once per page (or in a shared layout):
 *   import 'spoko-design-system/scripts/product-gallery-auto';
 *
 * Every ProductGallery root pushes itself onto `window.__sdsGalleryQueue`
 * from a tiny inline script. This module drains that queue, replaces `push`
 * so galleries rendered later initialize at once, and rescans the page after
 * Astro view-transition swaps. initProductGallery is idempotent, so the
 * overlap between the queue and the scans is harmless.
 */

import { initProductGallery } from '../components/Product/product-gallery';

declare global {
  interface Window {
    __sdsGalleryQueue?: HTMLElement[];
  }
}

function init(root: HTMLElement) {
  if (root.isConnected) initProductGallery(root);
}

function scan() {
  document.querySelectorAll<HTMLElement>('[data-product-gallery]').forEach(initProductGallery);
}

const queue = window.__sdsGalleryQueue ?? [];
queue.splice(0).forEach(init);
queue.push = (...roots) => {
  roots.forEach(init);
  return queue.length;
};
window.__sdsGalleryQueue = queue;

scan();
document.addEventListener('astro:page-load', scan);
