// shortcuts/components.ts

import { ASPECT_RATIO } from './constants'

export const componentShortcuts = [
  // Product related
  ['product-row', 'bg-white flex flex-wrap odd:(pr-2.5 pl-3.5 sm:px-0) even:(pl-2.5 pr-3.5 sm:px-0) w-1/2 sm:w-auto sm:grid sm:grid-cols-3 gap-x-1 gap-y-0 md:(grid-cols-product gap-x-4) justify-start content-start content-start place-content-start py-4 pb-6 sm:pb-4'],
  ['product-row__photo', `${ASPECT_RATIO} mb-2 sm:mb-0 after:(content-empty bg-black bg-opacity-[.03] absolute w-full h-full top-0) w-100 col-span-1 row-span-3 max-w-full text-left overflow-hidden relative bg-neutral-lightest md:(col-span-1 row-span-1) box-content`],
  ['product-row__description', 'text-xs text-slate-darkest dark:text-neutral-light leading-tight mt-2 font-textlight line-clamp-3 whitespace-normal md:(text-sm mt-0 font-textregular whitespace-pre-wrap)'],
  ['product-row__main', 'w-full sm:w-auto col-span-2 leading-none relative sm:pl-1 md:(pl-0 row-start-1 col-start-2 col-span-1)'],
  ['product-number', 'font-novamono content-center flex flex-wrap flex-col content-start pr-5 bg-white'],
  ['p-number', 'inline-flex leading-none relative'],
  ['tooltip', 'invisible absolute'],
  ['has-tooltip', 'hover:(visible z-50)'],
  ['product-code', 'text-blue-light mr-1 leading-none tracking-wide select-all'],
  ['product-info', 'text-slate-light text-xxs font-textlight leading-none mt-0.5 md:(mt-0 text-xs)'],
  ['product-date', 'inline-block text-xxs md:text-xs leading-none mt-1 md:(mt-4 mb-1) mr-2'],
  ['product-thumb', 'h-full w-full object-cover object-center transform scale-100 group-hover:scale-110 absolute inset-0 will-change-transform bg-neutral-lightest'],
  ['product-thumb--plp', `${ASPECT_RATIO} flex items-center flex justify-center mb-3 sm:mb-0 after:(content-empty bg-black bg-opacity-[.03] absolute w-full h-full top-0)`],
  ['product-link--related', 'relative flex w-full bg-white dark:bg-accent-deepBlue after:absolute after:bg-accent-light after:w-full after:left-0 after:h-px after:-bottom-2 after:content-empty after:scale-x-0 after:transition-transform-300 after:origin-top-right hover:after:origin-top-left hover:after:scale-x-100'],
  ['product-model', 'font-400'],
  ['product-button', 'text-blue-500 cursor-pointer text-base leading-none inline-flex items-center justify-center w-8 h-8 min-w-8 transition-colors duration-150 bg-white dark:bg-accent-deepBlue focus:(text-blue-500) hover:(text-blue-500)'],

  // Category related
  ['category-section', 'pb-4 w-full bg-white mb-4 overflow-x-hidden flex flex-wrap max-w-full'],
  ['category-tile', 'flex-wrap sm:flex-nowrap content-between w-64 min-w-64 lg:(w-28.57% min-w-28.57%) 2xl:(w-24.09% min-w-24.09%) 3xl:(w-19.60% min-w-19.60%) flex ml-1 lg:ml-1.5 first:ml-4'],
  ['category-toggler', 'sm:bg-opacity-20 pt-1 flex-inline items-center justify-center hover:text-light-blue-500 text-neutral-light hover:text-blue-500 px-4 leading-7 pb-0.5 md:pl-0'],
  ['category-link', 'w-full sm:w-auto text-neutral-default hover:(bg-gray-50 sm:bg-inherit) py-2 sm:py-0 text-lg font-medium text-left px-3 block sm:(text-base leading-4 mb-1.5) md:(px-4 py-1 table-cell)'],
  ['category-carousel__link', 'uppercase ml-auto px-4 text-xs flex items-center mt-3 hover:underline'],

  // Navigation
  ['nav-link', 'text-slate-light hover:bg-blue-darker hover:text-white px-3 py-3.5 md:py-1 rounded-full text-sm font-medium'],
  ['btn-navigation', 'bg-white drop-shadow-md rounded-full border flex items-center justify-center w-1/2 h-12 bottom-1 z-2 md:(bg-white/90 text-inherit hover:(text-light-blue-500 bg-white))'],
  ['btn-navigation__active', 'border border-transparent md:(border-neutral-lighter focus:ring-0) font-medium text-white bg-blue-darker hover:bg-accent-darker focus:ring-2 focus:outline-none focus:ring-blue-300'],

  // Carousel
  ['carousel-tile', 'w-52 min-w-52 flex ml-1 lg:ml-1.5'],
  ['carousel-product-tile', 'flex flex-wrap sm:flex-nowrap content-between w-64 min-w-64 lg:(w-28.57% min-w-28.57%) 2xl:(w-24.09% min-w-24.09%) relative'],
  ['carousel-item', 'w-full w-full group-hover:filter-invert relative flex flex-col'],
  ['carousel-big', 'shadow-[inset_0_10px_60px_-15px_rgba(0,0,0,0.1)] w-full h-full'],

  // PDP (Product Detail Page)
  ['pdp-headline', 'text-2xl mb-4 sm:(font-normal mb-6 text-4xl) lg:pr-0 2xl:text-5xl font-headbold text-black font-bold pr-7 pt-0 leading-none'],
  ['pdp-detail-row', 'text-sm mt-1 md:mt-4 mb-4 grid grid-cols-2 sm:(grid-cols-details-desktop grid-flow-col auto-cols-max) gap-4'],
  ['pdp-slider-thumb', 'block h-22.5 w-31 min-w-31 mb-2'],

  // PLP (Product List Page)
  ['plp-name', 'flex items-center leading-none font-headregular cursor-pointer sm:pr-6 md:pr-12'],
  ['plp-desc', 'hidden sm:block col-span-3 md:col-span-1 md:col-start-3 relative px-2 sm:px-0'],
  ['plp-materials', 'text-xs md:text-sm text-slate-darkest dark:text-neutral-light leading-tight font-textlight md:font-textregular whitespace-normal md:whitespace-pre-wrap'],
  ['plp-b-desc', 'pb-4 bg-white text-base flex flex-wrap mt-6'],
  ['plp-icons', 'absolute top-0 -right-2 md:(top-0.5 right-0) w-12 bottom-auto flex justify-end text-sm'],
  ['plp-replacements', 'col-span-3 md:col-span-1 md:col-start-2 text-xs mt-3 md:mt-4'],


  // Miscellaneous
  ['flag-ua', 'inline-block text-4xl w-6 h-3.5 min-w-[1.25rem] mr-3 bg-gradient-to-b stops-[#0057b7_50%,50%,#ffd700_100%]'],
  ['engine-info', 'absolute z-20 inline-block w-56 text-xs font-light text-slate-light transition-opacity duration-300 bg-white border border-neutral-lighter rounded-lg shadow-sm dark:text-neutral-default dark:border-slate-default dark:bg-slate-darker bottom-full mb-2 invisible opacity-0 group-hover:(opacity-100 visible -left-full before:left-9) before:(absolute w-0 h-0 -bottom-3 border-l-transparent border-r-transparent border-t-neutral-lightest dark:border-t-slate-dark border-l-10 border-r-10 border-t-10 content-empty)'],
  ['engine-code', 'underline decoration-dotted underline-offset-4 py-0.5 decoration-neutral-light group-hover:(decoration-blue-500 dark:decoration-accent-light)'],
  ['number-secondary', 'block absolute inset-0 text-slate-light select-all bg-white dark:bg-accent-deepBlue'],
  ['code-formatted', 'leading-none mt-0 relative text-xs'],

  // Badges
  ['badge', 'px-1.5 py-px text-white text-xs mb-1 max-w-fit whitespace-nowrap'],


  ['detail-name', 'text-gray-900 leading-tight font-textlight line-clamp-3 whitespace-normal md:(whitespace-pre-wrap line-clamp-9 font-textregular)'],
  ['detail-row', 'text-sm mt-1 md:mt-4 mb-4 grid grid-cols-2 gap-4 sm:(grid-cols-details-desktop grid-flow-col auto-cols-max)'],
  ['slide-bg', 'scale-140 bg-center bg-no-repeat bg-contain h-full w-full absolute top-0 filter-blur overflow-hidden transform bg-gray-200 dark:bg-gray-700'],
  ['slide-img', 'cursor-zoom-in my-auto z-50 h-full max-w-screen-2xl object-center object-contain pointer-events-none'],
  ['slide-pic', 'w-full flex justify-end absolute top-0 bottom-0'],
  ['slide-thumb', `block bg-gray-100 ${ASPECT_RATIO} w-30 h-22.5 cursor-grab active:cursor-grabbing`],
  ['slide-thumb__img', 'pointer-events-none pb-px h-22.5 w-30 m-auto object-cover bg-white dark:bg-blue-901'],
  ['product-carousel', 'flex-wrap content-between w-64 min-w-64 flex ml-1 first:ml-4'],
  ['pdp-slide', `h-full bg-gray-100 ${ASPECT_RATIO} relative overflow-hidden border border-transparent`],
  ['product-link', 'relative flex w-full bg-white after:(absolute bg-lightBlue-500 w-[calc(100%-1rem)] left-0 h-px top-[calc(100%-1px)] bottom-1 content-empty scale-x-0 transition-transform-300 origin-top-right) hover:after:(origin-top-left scale-x-100)'],
  ['number-big', 'text-3.75 mr-2 mt-2 mb-0 sm:mt-0'],
  ['product-thumb--related', `w-22 min-w-22 xl:w-30 xl:min-w-30 h-auto object-contain object-top bg-gray-100 ${ASPECT_RATIO} relative`],
  ['product-thumb--carousel', `w-60 min-w-60 sm:w-22 sm:min-w-22 xl:w-30 xl:min-w-30 h-auto object-contain object-top bg-gray-100 ${ASPECT_RATIO} relative`]

];