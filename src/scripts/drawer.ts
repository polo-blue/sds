const _cleanups = new Map<string, () => void>();

export function initDrawer(drawerId: string): void {
  _cleanups.get(drawerId)?.();
  _cleanups.delete(drawerId);

  const root = document.getElementById(drawerId);
  if (!root) return;

  const panel = root.querySelector<HTMLElement>('[data-drawer-panel]');
  const trigger = document.querySelector<HTMLElement>(`[aria-controls="${drawerId}"]`);
  let returnFocus: HTMLElement | null = null;
  let hideTimer: ReturnType<typeof setTimeout> | undefined;

  function open() {
    clearTimeout(hideTimer);
    root!.removeAttribute('hidden');
    void root!.offsetWidth; // force reflow so CSS transition fires
    root!.classList.add('open');
    document.body.classList.add('drawer-open');
    trigger?.setAttribute('aria-expanded', 'true');
    returnFocus = document.activeElement as HTMLElement;
    panel?.focus({ preventScroll: true });
  }

  function close() {
    root!.classList.remove('open');
    document.body.classList.remove('drawer-open');
    trigger?.setAttribute('aria-expanded', 'false');
    returnFocus?.focus({ preventScroll: true });
    returnFocus = null;
    // Wait for CSS transition to finish before hiding
    const ms = (parseFloat(getComputedStyle(panel ?? root!).transitionDuration) || 0.3) * 1000 + 50;
    hideTimer = setTimeout(() => {
      if (!root!.classList.contains('open')) root!.setAttribute('hidden', '');
    }, ms);
  }

  const ac = new AbortController();
  const { signal } = ac;

  trigger?.addEventListener('click', open, { signal });
  root.querySelectorAll('[data-drawer-close]').forEach(el => el.addEventListener('click', close, { signal }));
  document.addEventListener(
    'keydown',
    e => {
      if (e.key === 'Escape' && root!.classList.contains('open')) close();
    },
    { signal }
  );

  _cleanups.set(drawerId, () => {
    ac.abort();
    clearTimeout(hideTimer);
  });
}
