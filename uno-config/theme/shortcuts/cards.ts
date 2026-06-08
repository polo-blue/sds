const ALERT_BASE = 'flex items-start gap-3 px-4 py-3 rounded-lg text-sm border';

export const cardShortcuts = [
  ['card', 'bg-white dark:bg-slate-darker rounded-xl shadow-md overflow-hidden'],
  ['card-hover', 'card transition-all duration-300 hover:(scale-105 shadow-xl)'],
  ['card-body', 'p-5 flex flex-col gap-3'],
  ['card-footer', 'px-5 pb-5 flex items-center justify-between gap-3'],
  ['card-image', 'w-full h-auto object-cover'],

  // Alert / notification banners — pure CSS, no JS
  ['alert', ALERT_BASE],
  ['alert-info', `${ALERT_BASE} bg-system-info/10 text-system-info border-system-info/25 dark:(bg-system-info/15 border-system-info/35)`],
  ['alert-success', `${ALERT_BASE} bg-system-success/10 text-system-success border-system-success/25 dark:(bg-system-success/15 border-system-success/35)`],
  ['alert-error', `${ALERT_BASE} bg-system-error/10 text-system-error border-system-error/25 dark:(bg-system-error/15 border-system-error/35)`],
  // system-warning yellow has insufficient contrast on white — use slate-dark for text; in dark mode switch to neutral-lighter
  ['alert-warning', `${ALERT_BASE} bg-system-warning/10 text-slate-dark border-system-warning/30 dark:(bg-system-warning/15 text-neutral-lighter border-system-warning/40)`],
];
