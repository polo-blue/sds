// shortcuts/index.ts
import type { UserShortcuts } from 'unocss'
import { buttonShortcuts } from './buttons';
import { layoutShortcuts } from './layout';
import { componentShortcuts } from './components';
import { productShortcuts } from './product';

const convertToShortcuts = (shortcuts: string[][]): UserShortcuts => {
  return Object.fromEntries(shortcuts.map(([name, value]) => [name, value]));
};

export const shortcuts: UserShortcuts = {
  ...convertToShortcuts(buttonShortcuts),
  ...convertToShortcuts(layoutShortcuts),
  ...convertToShortcuts(componentShortcuts),
  ...convertToShortcuts(productShortcuts)
};