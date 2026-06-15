// shortcuts/index.ts
import type { UserShortcuts } from 'unocss'
import { buttonShortcuts } from './buttons.ts';
import { layoutShortcuts } from './layout.ts';
import { componentShortcuts } from './components.ts';
import { cardShortcuts } from './cards.ts';
import { productShortcuts } from './product.ts';
import { jumbotronShortcuts } from './jumbotron.ts';
import { inputShortcuts } from './inputs.ts';

const convertToShortcuts = (shortcuts: string[][]): UserShortcuts => {
  return Object.fromEntries(shortcuts.map(([name, value]) => [name, value]));
};

export const shortcuts: UserShortcuts = {
  ...convertToShortcuts(buttonShortcuts),
  ...convertToShortcuts(layoutShortcuts),
  ...convertToShortcuts(componentShortcuts),
  ...convertToShortcuts(cardShortcuts),
  ...convertToShortcuts(productShortcuts),
  ...convertToShortcuts(jumbotronShortcuts),
  ...convertToShortcuts(inputShortcuts),
};
