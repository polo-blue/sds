// shortcuts/jumbotron.ts
import { COLORS, LAYOUT, TRANSITIONS, IMAGE_STYLES } from './constants'

export const jumbotronShortcuts = [
  // Base styles
  ['jumbotron-layout', 'relative w-full'],
  ['jumbotron-container', 'mx-auto px-3.5 md:px-8'],
  
  // Text styles
  ['jumbotron-text', 'text-white line-clamp-3'],
  ['jumbotron-title', 'font-headlight leading-tight'],
  
  // Title variants
  ['jumbotron-title-default', 'text-3xl sm:(text-4xl pt-0) md:text-5xl lg:text-6xl'],
  ['jumbotron-title-hero', 'text-3xl sm:text-4xl md:text-5xl xl:text-6xl mt-1'],
  ['jumbotron-title-post', 'text-2xl mb-1 sm:text-3xl md:(text-4xl mb-3) xl:text-6xl mt-1'],
  ['jumbotron-title-split', 'text-3xl md:(text-4xl mb-3) xl:text-11 mt-1'],
  
  // Content containers
  ['jumbotron-content', 'relative z-[2] flex flex-col gap-4'],
  ['jumbotron-content-centered', 'items-center justify-center text-center'],
  
  // Header variants
  ['jumbotron-header-base', 'w-full justify-center flex items-center'],
  ['jumbotron-header-post', `pt-11 bg-blue-darkest relative min-h-[50vh]`],
  ['jumbotron-header-split', 'md:(grid grid-cols-2) pb-4 mb-8'],
  
  // Image containers
  ['jumbotron-image', 'w-full h-full object-cover'],
  ['jumbotron-image-wrapper', 'absolute inset-0 overflow-hidden'],
  ['jumbotron-image-split', 'relative shadow-xl md:(mt-4 max-h-112 -ml-4)'],
  
  // Metadata
  ['jumbotron-meta', 'order-3 flex items-center gap-1 text-gray-100'],
  ['jumbotron-categories', 'order-1'],
  ['jumbotron-author', 'text-sm'],
  
  // Responsive containers
  ['jumbotron-container-sm', 'md:min-h-xs sm:py-12 md:py-14 lg:py-16 xl:py-20'],
  ['jumbotron-container-lg', 'md:min-h-md sm:py-16 md:py-20 lg:py-28 xl:py-32'],
  
  // Utility classes
  ['jumbotron-overlay', 'bg-gradient-to-r from-blue-900 to-transparent opacity-90'],
  ['jumbotron-z-base', 'z-[2]'],
];