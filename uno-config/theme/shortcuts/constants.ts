// Aspect ratios configuration
export const aspectRatios = {
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
  '3/2': 'aspect-[3/2]',
  '2/3': 'aspect-[2/3]',
  '3/1': 'aspect-[3/1]',
  '16/9': 'aspect-video',
} as const

// Theme colors
export const COLORS = {
  bgWhite: 'bg-white',
  bgDark: 'dark:bg-accent-deepBlue',
  textSlate: 'text-slate-500',
  textNeutralLight: 'dark:text-neutral-light',
  textSlateDark: 'text-slate-darkest',
  bgNeutralLightest: 'bg-neutral-lightest',
} as const

// Image styles
export const IMAGE_STYLES = {
  base: 'relative object-cover bg-neutral-lightest h-auto max-w-full',
  overlay: 'after:(content-empty bg-black bg-opacity-[.03] absolute w-full h-full top-0)',
  objectContain: 'object-contain object-center',
  aspectBase: aspectRatios['4/3'],
} as const

// Common layout properties
export const LAYOUT = {
  flex: {
    base: 'flex',
    center: 'flex items-center justify-center',
    alignCenter: 'flex items-center',
    justifyCenter: 'flex justify-center',
    between: 'flex items-center justify-between',
    wrap: 'flex flex-wrap',
    nowrap: 'flex-nowrap',
    col: 'flex flex-col',
    colCenter: 'flex flex-col items-center',
    start: 'flex items-start',
    end: 'flex items-end',
    justifyEnd: 'flex justify-end',
    alignEnd: 'flex items-end',
  },
  spacing: {
    topPadding: 'pt-24 sm:pt-14',
    containerPadding: 'px-4',
  },
  grid: {
    cols2: 'grid-cols-2',
    cols3: 'grid-cols-3',
    cols4: 'grid-cols-4',
    product: 'grid-cols-product',
  },
  position: {
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
  },
} as const

// Common transitions
export const TRANSITIONS = {
  base: 'transition-all duration-100 ease-linear',
  transform: 'transition-transform-300',
  hover: 'transition duration-100 ease-in-out',
} as const

// Button base styles
export const BUTTON_STYLES = {
  base: {
    layout: 'inline-flex items-center justify-center',
    text: 'text-base font-medium text-center leading-4.5',
    transition: 'transition-all duration-200 ease-in-out',
  },
  sizes: {
    normal: 'md:px-10 md:py-2 md:text-lg px-8 py-3 whitespace-nowrap h-12',
    sm: 'px-6 py-2 text-sm whitespace-nowrap h-9.5',
    xs: 'px-4 py-1 text-sm whitespace-nowrap ',
  },
  variants: {
    primary: {
      solid: 'bg-brand-secondary border border-transparent hover:bg-accent-light text-blue-darker shadow',
      outline: 'border-accent-light border text-accent-default hover:(bg-accent-light text-white)',
    },
    secondary: {
      solid: 'bg-neutral-dark border border-transparent hover:bg-neutral-darker text-white shadow',
      outline: 'border-neutral-dark border text-neutral-dark hover:(text-white bg-neutral-dark)',
    },
    tertiary: {
      solid: 'bg-blue-darker hover:bg-accent-darker text-white focus:(ring-4 outline-none ring-blue-light)',
      outline: 'border-blue-darker text-blue-darker focus:(ring-2 outline-none ring-blue-light)',
    },
  },
  hover: {
    white: 'hover:(text-blue-darker bg-white border-blue-darker)',
    light: 'hover:(text-blue-darker bg-brand-secondary border-brand-secondary)',
    medium: 'hover:(text-white bg-brand-primary border-brand-primary)',
    dark: 'hover:(bg-blue-darker text-white border-blue-darker)',
  },
} as const

// Common typography styles
export const TYPOGRAPHY = {
  headline: {
    base: 'font-headlight',
    bold: 'font-headlight font-bold',
    light: 'font-headlight font-300 tracking-tight',
  },
  text: {
    xs: 'text-3',
    sm: 'text 3.5',
    base: 'text-4',
    lg: 'text-4.5',
  },
} as const

// Product specific styles (merged PRODUCT_STYLES and PRODUCT_CONSTANTS)
export const PRODUCT_STYLES = {
  thumb: {
    base: 'h-full w-full object-cover object-center transform scale-100 group-hover:scale-110 absolute inset-0 will-change-transform bg-neutral-lightest',
    container: `${aspectRatios['4/3']} ${LAYOUT.flex.alignCenter} mb-3 sm:mb-0 ${IMAGE_STYLES.overlay}`,
  },
  link: {
    base: 'relative flex w-full bg-white after:(absolute bg-accent-light w-[calc(100%-1rem)] left-0 h-px top-[calc(100%-1px)] bottom-1 content-empty scale-x-0 transition-transform-300 origin-top-right) hover:after:(origin-top-left scale-x-100)',
    url: 'font-light leading-none mb-2 pr-4 line-clamp-2 h-[2em]',
    urlOverlay: 'before:(content-empty absolute left-0 right-4 h-full top-0)',
    bigTile: `${aspectRatios['4/3']} ${LAYOUT.flex.center} mb-3 w-60 min-w-60 h-auto object-contain object-top bg-gray-50 relative ${IMAGE_STYLES.overlay}`,
  },
  image: {
    base: `${aspectRatios['4/3']} ${IMAGE_STYLES.base} ${IMAGE_STYLES.overlay}`,
    small: `${aspectRatios['4/3']} ${IMAGE_STYLES.base} ${IMAGE_STYLES.overlay} w-22 h-auto`,
    large: `${aspectRatios['4/3']} ${IMAGE_STYLES.base} ${IMAGE_STYLES.overlay} w-60 h-auto`,
  },
  description: {
    base: `text-xs ${COLORS.textSlateDark} ${COLORS.textNeutralLight} leading-tight font-textlight line-clamp-3 whitespace-normal`,
    md: 'md:(text-sm mt-0 font-textregular whitespace-pre-wrap)',
  },
  sizes: {
    small: 'w-22 min-w-22',
    medium: 'w-30 min-w-30',
    large: 'w-60 min-w-60',
  },
} as const