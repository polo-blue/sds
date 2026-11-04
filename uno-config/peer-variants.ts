export const peerSelectorClasses = [
  'peer-focus:text-blue-light',
  'peer-focus:dark:text-blue-lightest',
  'peer-focus:scale-75',
  'peer-focus:-translate-y-6',
  'peer-focus:-translate-y-4',
  'peer-focus:start-0',
  'peer-placeholder-shown:scale-100',
  'peer-placeholder-shown:translate-y-0',
  'peer-not-placeholder-shown:scale-75',
  'peer-not-placeholder-shown:-translate-y-6',
  'peer-not-placeholder-shown:-translate-y-4',
];

const peerSelectorMap: Record<string, (s: string) => string> = {
  'focus:': s => `.peer:focus ~ ${s}`,
  'hover:': s => `.peer:hover ~ ${s}`,
  'placeholder-shown:': s => `.peer:placeholder-shown ~ ${s}`,
  'not-placeholder-shown:': s => `.peer:not(:placeholder-shown) ~ ${s}`,
};

export const peerVariant = (matcher: string) => {
  if (!matcher.startsWith('peer-')) return matcher;
  const rest = matcher.slice(5);
  for (const [key, fn] of Object.entries(peerSelectorMap)) {
    if (rest.startsWith(key)) return { matcher: rest.slice(key.length), selector: fn };
  }
  return { matcher: rest, selector: (s: string) => `.peer:${rest} ~ ${s}` };
};
