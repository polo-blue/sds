// Auto-init helper for the SDS docs page. Consumers (catalog, polo.blue)
// initialize ProductGallery manually — see ProductGallery.astro comment.
import { initProductGallery } from '../components/Product/product-gallery';

function bind() {
  document.querySelectorAll<HTMLElement>('[data-product-gallery]').forEach(root => {
    if (root.dataset.sdsGalleryBound === '1') return;
    root.dataset.sdsGalleryBound = '1';
    initProductGallery(root);
  });
}

bind();
document.addEventListener('astro:after-swap', bind);
