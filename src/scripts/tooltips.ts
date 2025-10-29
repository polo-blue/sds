import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import '../styles/tippy-theme.css';

/**
 * Global Tooltip Initializer
 * Automatically enhances all elements with data-tippy-content attribute
 * Works with static HTML - perfect for SEO and Astro static pages
 */

function initTooltips() {
  // Destroy existing tooltips to avoid duplicates
  document.querySelectorAll('[data-tippy-content]').forEach((el: any) => {
    if (el._tippy) {
      el._tippy.destroy();
    }
  });

  // Initialize tooltips for all elements with data-tippy-content
  tippy('[data-tippy-content]', {
    theme: 'sds',
    placement: 'top',
    arrow: true,
    animation: 'shift-away',
    duration: [200, 150],
    maxWidth: 280,
    allowHTML: true, // Allow HTML content for rich tooltips
  });
}

// Initialize on page load
if (typeof window !== 'undefined') {
  // Initial load
  document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    // Reinitialize after a short delay to catch Vue components
    setTimeout(initTooltips, 100);
  });

  // Reinitialize on Astro page transitions (for View Transitions)
  document.addEventListener('astro:page-load', () => {
    initTooltips();
    // Reinitialize after a short delay to catch Vue components
    setTimeout(initTooltips, 100);
  });
}
