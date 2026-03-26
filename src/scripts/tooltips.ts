/**
 * SDS Tooltip Engine
 * Powered by Floating UI — replaces tippy.js
 *
 * Uses event delegation on document (capture phase) for performance.
 * Handles tooltips for any element with [data-sds-tooltip] attribute.
 *
 * Supported attributes:
 * - data-sds-tooltip             — HTML content to display
 * - data-sds-tooltip-placement   — placement override (default: 'top')
 * - data-sds-tooltip-offset      — distance in px between trigger and tooltip (default: 8)
 * - data-sds-tooltip-interactive — allow hovering over tooltip (for clickable links)
 */

import { computePosition, autoUpdate, offset, flip, shift, arrow, type Placement } from '@floating-ui/dom';
import '../styles/sds-tooltip.css';

const SELECTOR = '[data-sds-tooltip]';
const OFFSET = 8;
const ARROW_SIZE = 13;
const SHIFT_PADDING = 5;
const SHOW_DELAY = 80;
const HIDE_DELAY = 60;
const INTERACTIVE_HIDE_DELAY = 150;

let tooltipEl: HTMLElement | null = null;
let arrowEl: HTMLElement | null = null;
let contentEl: HTMLElement | null = null;
let cleanupAutoUpdate: (() => void) | null = null;
let currentTarget: HTMLElement | null = null;
let showTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;
let initialized = false;
let isInteractive = false;

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

function getOffset(target: HTMLElement): number {
  const attr = target.getAttribute('data-sds-tooltip-offset');
  if (!attr) return OFFSET;
  const val = parseInt(attr, 10);
  return Number.isFinite(val) ? val : OFFSET;
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
  const offsetPx = getOffset(target);

  computePosition(target, tooltip, {
    placement,
    middleware: [
      offset(offsetPx),
      flip(),
      shift({ padding: SHIFT_PADDING }),
      arrow({ element: arrowElement }),
    ],
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

  // Interactive mode: allow hovering over tooltip for clickable content
  isInteractive = target.hasAttribute('data-sds-tooltip-interactive');
  tooltip.classList.toggle('sds-tooltip--interactive', isInteractive);

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

/**
 * Update tooltip content for a target element.
 * If the tooltip is currently visible for this target, updates the displayed content immediately.
 */
export function updateTooltipContent(target: HTMLElement, html: string) {
  target.setAttribute('data-sds-tooltip', html);
  if (currentTarget === target && contentEl) {
    contentEl.innerHTML = html;
  }
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
  const el = e.target as HTMLElement;

  // Hovering over the tooltip itself — cancel pending hide
  if (isInteractive && tooltipEl && (el === tooltipEl || tooltipEl.contains(el))) {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    return;
  }

  const target = el.closest?.(SELECTOR);
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
  const el = e.target as HTMLElement;

  // Leaving the tooltip itself — schedule hide
  if (isInteractive && tooltipEl && (el === tooltipEl || tooltipEl.contains(el))) {
    hideTimer = setTimeout(() => {
      hideTooltip();
      hideTimer = null;
    }, INTERACTIVE_HIDE_DELAY);
    return;
  }

  const target = el.closest?.(SELECTOR);
  if (!(target instanceof HTMLElement)) return;

  if (showTimer) {
    clearTimeout(showTimer);
    showTimer = null;
  }

  const delay = isInteractive ? INTERACTIVE_HIDE_DELAY : HIDE_DELAY;
  hideTimer = setTimeout(() => {
    hideTooltip();
    hideTimer = null;
  }, delay);
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

  // Use `document` instead of `document.body` — Astro View Transitions
  // replace the <body> element during swap, which would lose listeners.
  // `document` persists across navigations.
  document.addEventListener('mouseenter', handleMouseEnter, true);
  document.addEventListener('mouseleave', handleMouseLeave, true);
  document.addEventListener('focusin', handleFocusIn, true);
  document.addEventListener('focusout', handleFocusOut, true);
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
