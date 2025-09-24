// uno-config/theme/index.ts
import { colors } from './colors';
import { typography } from './typography';
import { breakpoints } from './breakpoints';
import { dimensions } from './dimensions';
import { effects } from './effects';
import { gridTemplates } from './grid';
import { container } from './container';

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

export { colors } from './colors';
export { typography } from './typography';
export { breakpoints } from './breakpoints';
export { dimensions } from './dimensions';
export { effects } from './effects';
export { gridTemplates } from './grid';
export { container } from './container';