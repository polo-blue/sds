// uno-config/theme/index.ts
import { colors } from './colors.ts';
import { typography } from './typography.ts';
import { breakpoints } from './breakpoints.ts';
import { dimensions } from './dimensions.ts';
import { effects } from './effects.ts';
import { gridTemplates } from './grid.ts';
import { container } from './container.ts';

export const theme = {
  colors,
  ...typography,
  ...dimensions,
  ...effects,
  gridTemplateColumn: gridTemplates.columns,
  breakpoints,
  screens: breakpoints,
  container,
};

export { colors } from './colors.ts';
export { typography } from './typography.ts';
export { breakpoints } from './breakpoints.ts';
export { dimensions } from './dimensions.ts';
export { effects } from './effects.ts';
export { gridTemplates } from './grid.ts';
export { container } from './container.ts';
