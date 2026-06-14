/**
 * Drawer behavior — event-delegated, no per-instance setup needed.
 * Drawers added to the DOM at any time (SSR, hydration, dynamic insert)
 * Just Work as long as they expose `.sds-drawer[id]` + `[data-drawer-panel]`
 * markup and the trigger uses `aria-controls="<drawer-id>"`.
 *
 * Provides:
 *  - click trigger / click backdrop / click [data-drawer-close] to toggle
 *  - Escape closes the topmost open drawer
 *  - focus trap inside the open panel (Tab + Shift+Tab cycle)
 *  - focus returns to the trigger on close
 *  - body.drawer-open scroll lock while any drawer is open
 *  - aria-expanded synced on the trigger
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([type="hidden"]):not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const _triggerFor = new WeakMap<HTMLElement, HTMLElement>();
const _returnFocusFor = new WeakMap<HTMLElement, HTMLElement>();
const _hideTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();
let _bound = false;

function open(root: HTMLElement, trigger?: HTMLElement | null): void {
  const existing = _hideTimers.get(root);
  if (existing) clearTimeout(existing);

  root.removeAttribute('hidden');
  void root.offsetWidth; // force reflow so CSS transition fires
  root.classList.add('open');
  document.body.classList.add('drawer-open');

  if (trigger) {
    _triggerFor.set(root, trigger);
    trigger.setAttribute('aria-expanded', 'true');
  }
  _returnFocusFor.set(root, document.activeElement as HTMLElement);

  const panel = root.querySelector<HTMLElement>('[data-drawer-panel]');
  panel?.focus({ preventScroll: true });
}

function close(root: HTMLElement): void {
  root.classList.remove('open');

  if (!document.querySelector('.sds-drawer.open')) {
    document.body.classList.remove('drawer-open');
  }

  const trigger = _triggerFor.get(root);
  trigger?.setAttribute('aria-expanded', 'false');

  const returnTo = _returnFocusFor.get(root);
  returnTo?.focus({ preventScroll: true });
  _returnFocusFor.delete(root);

  const panel = root.querySelector<HTMLElement>('[data-drawer-panel]');
  const ms = (parseFloat(getComputedStyle(panel ?? root).transitionDuration) || 0.3) * 1000 + 50;
  const t = setTimeout(() => {
    if (!root.classList.contains('open')) root.setAttribute('hidden', '');
  }, ms);
  _hideTimers.set(root, t);
}

function findDrawerById(id: string): HTMLElement | null {
  // Defensive: heading anchor IDs from rehype-slug can collide with drawer
  // IDs (e.g. `<h2 id="full-menu">` next to `<Drawer id="full-menu">`).
  // `document.getElementById` returns the first match — scan all matches and
  // return the one that's actually a .sds-drawer.
  const matches = document.querySelectorAll<HTMLElement>(`[id="${CSS.escape(id)}"]`);
  for (const el of matches) {
    if (el.classList.contains('sds-drawer')) return el;
  }
  return null;
}

function findDrawerFor(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const trigger = target.closest<HTMLElement>('[aria-controls]');
  if (!trigger) return null;
  const id = trigger.getAttribute('aria-controls');
  if (!id) return null;
  return findDrawerById(id);
}

function bindGlobalListeners(): void {
  if (_bound) return;
  _bound = true;

  // Trigger click — toggles open
  document.addEventListener('click', e => {
    const drawer = findDrawerFor(e.target);
    if (drawer) {
      e.preventDefault();
      if (drawer.classList.contains('open')) close(drawer);
      else open(drawer, (e.target as Element).closest<HTMLElement>('[aria-controls]'));
      return;
    }

    // Close click — any [data-drawer-close] inside or referencing a drawer
    if (!(e.target instanceof Element)) return;
    const closer = e.target.closest('[data-drawer-close]');
    if (closer) {
      const parentDrawer = closer.closest<HTMLElement>('.sds-drawer.open');
      if (parentDrawer) close(parentDrawer);
    }
  });

  // Escape — close the topmost open drawer
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const open = document.querySelectorAll<HTMLElement>('.sds-drawer.open');
      const topmost = open[open.length - 1];
      if (topmost) {
        e.preventDefault();
        close(topmost);
      }
      return;
    }

    // Focus trap — keep Tab inside the open panel
    if (e.key === 'Tab') {
      const opens = document.querySelectorAll<HTMLElement>('.sds-drawer.open');
      const drawer = opens[opens.length - 1];
      if (!drawer) return;
      const panel = drawer.querySelector<HTMLElement>('[data-drawer-panel]');
      if (!panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        el => !el.hasAttribute('disabled') && el.offsetParent !== null
      );
      if (!focusable.length) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/**
 * Public init — kept for back-compat with consumers that explicitly call it
 * (e.g. polo.blue's wp-lightbox.ts). New code can simply render the markup;
 * `bindGlobalListeners()` runs automatically on module import.
 */
export function initDrawer(_drawerId?: string): void {
  bindGlobalListeners();
}

bindGlobalListeners();
