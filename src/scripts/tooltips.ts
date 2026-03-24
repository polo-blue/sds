/**
 * SDS Tooltip Engine
 * Powered by Floating UI — replaces tippy.js
 *
 * Uses event delegation on document.body for performance.
 * Handles tooltips for any element with [data-sds-tooltip] attribute.
 *
 * Supported attributes:
 * - data-sds-tooltip        — HTML content to display
 * - data-sds-tooltip-placement — placement override (default: 'top')
 */

import { computePosition, autoUpdate, offset, flip, shift, arrow, type Placement } from '@floating-ui/dom';
import '../styles/sds-tooltip.css';

const SELECTOR = '[data-sds-tooltip]';
const OFFSET = 8;
const ARROW_SIZE = 8;
const SHIFT_PADDING = 5;
const SHOW_DELAY = 80;
const HIDE_DELAY = 60;

let tooltipEl: HTMLElement | null = null;
let arrowEl: HTMLElement | null = null;
let contentEl: HTMLElement | null = null;
let cleanupAutoUpdate: (() => void) | null = null;
let currentTarget: HTMLElement | null = null;
let showTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;
let initialized = false;

const OPPOSITE_SIDE: Record<string, string> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

const VALID_PLACEMENTS = new Set<Placement>([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
]);

function getPlacement(target: HTMLElement): Placement {
  const attr = target.getAttribute('data-sds-tooltip-placement');
  return attr && VALID_PLACEMENTS.has(attr as Placement) ? (attr as Placement) : 'top';
}

function getOrCreateTooltip(): {
  tooltip: HTMLElement;
  arrow: HTMLElement;
  content: HTMLElement;
} {
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'sds-tooltip';
    tooltipEl.setAttribute('role', 'tooltip');

    contentEl = document.createElement('div');
    contentEl.className = 'sds-tooltip-content';

    arrowEl = document.createElement('div');
    arrowEl.className = 'sds-tooltip-arrow';

    tooltipEl.appendChild(contentEl);
    tooltipEl.appendChild(arrowEl);
    document.body.appendChild(tooltipEl);
  }
  return { tooltip: tooltipEl, arrow: arrowEl!, content: contentEl! };
}

function updatePosition(target: HTMLElement, tooltip: HTMLElement, arrowElement: HTMLElement) {
  const placement = getPlacement(target);

  computePosition(target, tooltip, {
    placement,
    middleware: [offset(OFFSET), flip(), shift({ padding: SHIFT_PADDING }), arrow({ element: arrowElement })],
  }).then(({ x, y, placement: finalPlacement, middlewareData }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
    tooltip.setAttribute('data-placement', finalPlacement);

    // Arrow positioning
    const arrowData = middlewareData.arrow;
    const side = OPPOSITE_SIDE[finalPlacement.split('-')[0]];

    Object.assign(arrowElement.style, {
      left: arrowData?.x != null ? `${arrowData.x}px` : '',
      top: arrowData?.y != null ? `${arrowData.y}px` : '',
      right: '',
      bottom: '',
      [side]: `${-(ARROW_SIZE / 2)}px`,
    });
  });
}

export function showTooltip(target: HTMLElement) {
  const html = target.getAttribute('data-sds-tooltip');
  if (!html || html === 'undefined') return;

  // Cancel pending hide
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }

  // If already showing this target, skip
  if (currentTarget === target) return;

  const { tooltip, arrow: arrowElement, content } = getOrCreateTooltip();

  content.innerHTML = html;
  tooltip.style.display = 'block';
  currentTarget = target;

  // Start auto-updating position
  cleanupAutoUpdate?.();
  cleanupAutoUpdate = autoUpdate(target, tooltip, () => {
    updatePosition(target, tooltip, arrowElement);
  });

  // Animate in
  requestAnimationFrame(() => {
    tooltip.setAttribute('data-visible', '');
  });
}

export function hideTooltip() {
  if (!tooltipEl || !currentTarget) return;

  tooltipEl.removeAttribute('data-visible');
  currentTarget = null;

  cleanupAutoUpdate?.();
  cleanupAutoUpdate = null;

  // Hide after opacity transition
  setTimeout(() => {
    if (tooltipEl && !currentTarget) {
      tooltipEl.style.display = '';
    }
  }, 150);
}

function handleMouseEnter(e: Event) {
  const target = (e.target as HTMLElement).closest?.(SELECTOR);
  if (!(target instanceof HTMLElement)) return;

  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }

  if (showTimer) clearTimeout(showTimer);
  showTimer = setTimeout(() => {
    showTooltip(target);
    showTimer = null;
  }, SHOW_DELAY);
}

function handleMouseLeave(e: Event) {
  const target = (e.target as HTMLElement).closest?.(SELECTOR);
  if (!(target instanceof HTMLElement)) return;

  if (showTimer) {
    clearTimeout(showTimer);
    showTimer = null;
  }

  hideTimer = setTimeout(() => {
    hideTooltip();
    hideTimer = null;
  }, HIDE_DELAY);
}

function handleFocusIn(e: Event) {
  const target = (e.target as HTMLElement).closest?.(SELECTOR);
  if (target instanceof HTMLElement) showTooltip(target);
}

function handleFocusOut(e: Event) {
  const target = (e.target as HTMLElement).closest?.(SELECTOR);
  if (target instanceof HTMLElement) hideTooltip();
}

/**
 * Initialize tooltip delegation.
 * Safe to call multiple times — only attaches listeners once.
 */
export function initTooltips() {
  if (initialized) return;
  initialized = true;

  document.body.addEventListener('mouseenter', handleMouseEnter, true);
  document.body.addEventListener('mouseleave', handleMouseLeave, true);
  document.body.addEventListener('focusin', handleFocusIn, true);
  document.body.addEventListener('focusout', handleFocusOut, true);
}

function cleanup() {
  hideTooltip();
  tooltipEl?.remove();
  tooltipEl = null;
  arrowEl = null;
  contentEl = null;
  // Don't reset `initialized` — document.body persists across View Transitions,
  // so existing event listeners continue to work on swapped content.
}

// Astro View Transitions support
if (typeof document !== 'undefined') {
  document.addEventListener('astro:page-load', () => {
    initTooltips();
  });

  document.addEventListener('astro:before-swap', () => {
    cleanup();
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
