// uno-config/theme/index.ts
import { colors } from './colors';
import { typography } from './typography';
import { breakpoints } from './breakpoints';
import { dimensions } from './dimensions';
import { effects } from './effects';
import { gridTemplates } from './grid';

export const theme = {
  colors,
  ...typography,
  ...dimensions,
  ...effects,
  gridTemplateColumns: {
    ...gridTemplates.columns
  },
  breakpoints,
  screens: breakpoints,
};

export {
  colors,
  typography,
  breakpoints,
  dimensions,
  effects,
  gridTemplates,
};