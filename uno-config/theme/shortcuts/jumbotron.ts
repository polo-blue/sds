// shortcuts/jumbotron.ts
// import { COLORS, LAYOUT, TRANSITIONS, IMAGE_STYLES } from './constants'
import { breakpoints } from './../breakpoints';

export const jumbotronShortcuts = [
  // Default variant
  ['jumbotron-header-base', 'relative mx-auto my-auto w-full text-center py-8'],
  ['jumbotron-container-small', 'md:min-h-xs sm:py-12 md:py-14 lg:py-16 xl:py-20'],
  ['jumbotron-container-large', 'md:min-h-md sm:py-16 md:py-20 lg:py-28 xl:py-32'],
  [
    'jumbotron-title-default',
    'text-3xl headline-light text-white sm:(text-4xl pt-0) md:text-5xl lg:text-6xl',
  ],
  ['jumbotron-cta-wrapper', 'mt-5 sm:(mt-8 flex justify-center)'],

  // Hero variant
  ['jumbotron-hero-wrapper', 'relative w-full'],
  ['jumbotron-hero-image', 'absolute inset-0 w-full h-full'],
  ['jumbotron-hero-overlay', 'absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent opacity-90 z-1'],
  [
    'jumbotron-hero-container',
    'xl:container mx-auto px-3.5 md:px-8 py-8 h-56 sm:h-72 md:max-h-72 items-center flex',
  ],
  ['jumbotron-hero-header', 'relative z-10 text-white'],
  [
    'jumbotron-hero-title',
    'font-headlight text-3xl sm:text-4xl md:text-5xl xl:text-6xl mt-1 line-clamp-3 leading-tight',
  ],

  // Post variant
  ['jumbotron-post-header', 'post-header pt-11 w-full justify-center text-white z-2 relative'],
  [
    'jumbotron-post-heading',
    'heading text-white relative flex items-center justify-center mt-auto w-full z-[2]',
  ],
  [
    'jumbotron-post-container',
    `w-full sm:max-w-[${breakpoints.sm}] md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[${breakpoints['2xl']}] px-4 py-5 flex flex-col flex-wrap`,
  ],
  [
    'jumbotron-post-title',
    'font-headlight text-2xl mb-1 sm:text-3xl md:(text-4xl mb-3) xl:text-6xl mt-1 order-2 line-clamp-3 pb-1',
  ],

  // Metadata and categories
  ['jumbotron-meta', 'order-3 flex items-center text-gray-100'],
  ['jumbotron-categories', 'order-1 mt-4'],

  // Content styles
  ['jumbotron-description', 'mb-1 line-clamp-3 text-base sm:text-lg leading-none mt-4'],
  ['jumbotron-info', 'font-medium mb-4 line-clamp-1 text-base sm:text-lg mt-2'],

  // Post Split variant
  ['jumbotron-split-wrapper', 'w-full'],
  ['jumbotron-split-container', 'mx-auto'],
  ['jumbotron-split-header', 'w-full justify-center text-white z-2 mt-auto md:(grid grid-cols-2) pb-4 mb-8'],
  ['jumbotron-split-content', 'pl-4 pr-8 py-5 xl:(py-0 pl-0) flex flex-wrap'],
  [
    'jumbotron-split-title',
    'font-headlight text-3xl md:(text-4xl mb-3) xl:text-11 mt-1 order-2 line-clamp-3 pb-1 w-full',
  ],
  ['jumbotron-split-meta', 'order-3 flex items-center text-gray-100'],
  ['jumbotron-split-image-wrapper', 'relative -mb-8 md:(mt-4 -ml-4 mr-4) xl:(ml-0 mr-0)'],
  ['jumbotron-split-image', 'relative shadow-xl md:max-h-112 overflow-hidden md:ml-auto'],
  ['jumbotron-split-img', 'object-cover'],
];
