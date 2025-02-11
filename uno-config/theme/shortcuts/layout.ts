// shortcuts/layout.ts
import { 
  COLORS, 
  LAYOUT, 
  IMAGE_STYLES, 
  TYPOGRAPHY,
  TRANSITIONS,
  aspectRatios 
} from './constants'

// Generate image shortcuts dynamically
const imageShortcuts = Object.entries(aspectRatios).map(([ratio, aspect]) => [
  `img--${ratio}`,
  `${aspect} ${IMAGE_STYLES.base}`
])

export const layoutShortcuts = [
  // Main Layout
  ['l-main', `text-slate-dark ${LAYOUT.spacing.topPadding} ${COLORS.bgWhite}`],
  ['main', `text-slate-dark ${COLORS.textNeutralLight} ${COLORS.bgDark} ${LAYOUT.spacing.topPadding} ${LAYOUT.position.relative}`],
  ['nav', `${COLORS.bgWhite} ${COLORS.bgDark} ${LAYOUT.position.absolute} sm:fixed w-full top-0 z-41 mx-auto ${LAYOUT.spacing.containerPadding} pt-1 h-24 ${LAYOUT.flex.between} flex-wrap sm:(flex-nowrap pt-0 h-14) max-w-screen print-hidden`],

  // View Toggles
  ['view-grid', 'lg:flex-wrap'],
  ['view-list', 'lg:flex-col divide-y-1 divide-solid divide-neutral-lighter'],

  // Containers
  ['products-container', 'products-wrapper'],
  ['products-wrapper', `${LAYOUT.flex.wrap} ${COLORS.bgWhite} mb-4 w-full mb-auto md:(pl-4 px-2 -mt-3)`],
  ['product-list', 'sm:block products-wrapper'],
  ['products-grid', `${LAYOUT.flex.alignCenter} w-full flex-nowrap pr-4 md:grid grid-rows-1 overflow-hidden ${LAYOUT.grid.cols2} lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 max-h-[6rem]`],
  ['similar-products', `${LAYOUT.flex.center} space-y-4 gap-8 flex-wrap px-4 md:grid ${LAYOUT.grid.cols2} lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5`],
  ['similar-section', `${COLORS.bgWhite} w-full drop-shadow-xl`],
  ['search-container', 'mb-2 sm:mb-0'],

  // Category Menu
  ['cat-menu', `fixed h-21 bottom-[-6px] w-full z-10 border-t-1 border-neutral-light ${COLORS.bgWhite} dark:bg-blue-darkest text-center sm:(static z-auto border-t-none h-28)`],
  ['cat-card', 'p-4 text-base break-inside-avoid-column'],
  ['cat-name', 'mt-2 h-[2em] text-xs leading-none group-hover:filter-invert 3xl:text-3.25'],
  ['cats-slide', `${TRANSITIONS.base} mb-0.5 min-h-tile-mobile sm:(min-h-tile h-tile mb-2 p-3) text-black ${COLORS.textNeutralLight} hover:(text-white even:bg-blue-medium odd:bg-accent-light) cursor-pointer ${LAYOUT.flex.colCenter} px-1.5 cursor-grab active:cursor-grabbing overflow-hidden`],
  ['cats-img', `max-w-full h-8 md:h-icon ${IMAGE_STYLES.objectContain} w-full left-0 right-0 top-0 bottom-0`],

  // Sidebars and Navigation
  ['sidebar-title', `font-headregular text-accent-light text-xl md:(text-2xl px-4) mb-2 px-14 sm:px-3 ${LAYOUT.flex.center} sm:justify-start py-3`],
  ['subcat', 'text-3.75 block cursor-pointer text-blue-darker hover:(text-accent-default underline) md:mb-1 py-2 md:py-0'],
  ['subsubcat', 'pl-2'],

  // Headers and Banners
  ['headline', TYPOGRAPHY.headline.bold],
  ['headline-light', TYPOGRAPHY.headline.light],
  ['slimbanner', `px-4 sm:px-8 ${LAYOUT.flex.center} text-xs sm:text-base leading-none ${LAYOUT.position.relative} bg-gray-50 z-2 px-4 py-3 sm:(text-base px-8) text-blue-darker print-hidden`],

  // Image Shortcuts
  ...imageShortcuts,
  ['img--small', `h-full w-60 sm:(w-22) xl:(w-30) ${IMAGE_STYLES.base}`],
  ['img--medium', `h-full w-60 ${IMAGE_STYLES.base}`],

  // Utility Classes
  ['close-light', 'before:bg-white after:bg-white'],
  ['close-dark', 'before:bg-black after:bg-black'],
  ['colon-after', 'after:content-[":"]'],
  ['adsbygoogle', 'w-full text-center'],
  ['underline-on-hover', `${LAYOUT.position.relative} ${LAYOUT.flex.base} w-full ${COLORS.bgWhite} pb-1 after:absolute after:w-[calc(100%-1rem)] after:left-0 after:h-px after:top-[calc(100%-1px)] after:bottom-1 after:content-empty after:scale-x-0 after:transition-transform-300 after:origin-top-right hover:after:origin-top-left hover:after:scale-x-100`],
  ['cat-link', `cursor-pointer text-accent-deepBlue ${COLORS.textNeutralLight} hover:(text-brand-secondary underline) uppercase py-2 md:py-0`],
];