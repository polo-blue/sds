/**
 * Global tooltip delegation script for SDS
 * Uses Tippy.js delegation pattern for performance
 * Handles tooltips for:
 * - Engine codes (.engine-code)
 * - PR codes (.btn-prcode)
 * - Any other elements with data-tippy-content
 */

import { delegate } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import '../styles/tippy-theme.css';

/**
 * Initialize tooltips with delegation pattern
 * Call this once in your layout after page load
 */
export function initTooltips() {
  // Delegate to body for all tooltip targets
  delegate('body', {
    target: '[data-tippy-content]', // Any element with data-tippy-content
    allowHTML: true,
    theme: 'sds',
    placement: 'top',
    arrow: true,
    animation: 'shift-away',
    duration: [200, 150],
    maxWidth: 280,
    // Only show tooltip if there's actual content
    onShow(instance) {
      const content = instance.props.content;
      if (!content || content === '' || content === 'undefined') {
        return false;
      }
    },
  });
}

// Auto-initialize on Astro page load (for View Transitions)
if (typeof document !== 'undefined') {
  document.addEventListener('astro:page-load', () => {
    initTooltips();
  });

  // Fallback for non-Astro or initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTooltips();
    });
  } else {
    initTooltips();
  }
}
