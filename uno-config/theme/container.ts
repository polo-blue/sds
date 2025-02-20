// uno-config/theme/container.ts
import { breakpoints } from './breakpoints';

export const container = {
  center: true,
  padding: {
     DEFAULT: '1rem' // 16px for all breakpoints.
    // sm: '1rem',
    // md: '2rem',
    // lg: '3rem',
    // xl: '4rem',
    // '2xl': '5rem',
    // '3xl': '5rem',
    // '4xl': '5rem',
  },
  maxWidth: {
    sm: breakpoints.sm,
    md: breakpoints.md,
    lg: breakpoints.lg,
    xl: breakpoints.xl,
    '2xl': breakpoints['2xl'],
    // For larger breakpoints, keep the 2xl width
    '3xl': breakpoints['2xl'],
    '4xl': breakpoints['2xl'],
  },
};