// shortcuts/layout.ts
export const layoutShortcuts = [
    // Main Layout
    ['l-main', 'text-slate-dark pt-24 sm:pt-14 bg-white'],
    ['main', 'text-slate-dark dark:text-neutral-lighter dark:bg-blue-darker pt-24 sm:pt-14 relative'],
    ['nav', 'bg-white dark:bg-black absolute sm:fixed w-full top-0 z-41 mx-auto px-4 pt-1 h-24 flex shadow-md justify-between items-center flex-wrap sm:(flex-nowrap pt-0 h-14) max-w-screen print-hidden'],
  
    // View Toggles
    ['view-grid', 'grid grid-cols-2'],
    ['view-list', 'flex flex-col gap-4'],
  
    // Containers
    ['products-container', 'products-wrapper'],
    ['products-wrapper', 'bg-white sm:(divide-y-1 divide-solid) divide-neutral-lighter mb-4 w-full mb-auto md:(pl-4 px-2 -mt-3)'],
    ['product-list', 'flex flex-wrap sm:block products-wrapper'],
    ['products-grid', 'flex w-full flex-nowrap items-center pr-4 md:grid grid-rows-1 overflow-hidden grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 max-h-[6rem]'],
    ['similar-products', 'flex items-center space-y-4 gap-8 flex-wrap px-4 md:grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'],
    ['similar-section', 'bg-white w-full drop-shadow-xl'],
    ['search-container', 'mb-2 sm:mb-0'],
  
    // Category Menu
    ['cat-menu', 'fixed h-21 bottom-[-6px] w-full z-10 border-t-1 border-neutral-light bg-white dark:bg-blue-darkest text-center sm:(static z-auto border-t-none h-28)'],
    ['cat-card', 'p-4 text-base break-inside-avoid-column'],
    ['cat-name', 'mt-2 h-[2em] text-xs leading-none group-hover:filter-invert 3xl:text-3.25'],
    ['cats-slide', 'transition duration-300 ease-linear mb-0.5 min-h-tile-mobile sm:(min-h-tile h-tile mb-2 p-3) text-black dark:text-white hover:(text-white even:bg-blue-medium odd:bg-accent-light) cursor-pointer flex items-center flex-col justify-center transition ease-in-out duration-700 px-1.5 cursor-grab active:cursor-grabbing overflow-hidden'],
    ['cats-img', 'max-w-full h-8 md:h-icon object-contain object-center w-full left-0 right-0 top-0 bottom-0'],
  
    // Sidebars and Navigation
    ['sidebar-title', 'font-headregular text-light-blue-500 text-xl md:(text-2xl px-4) mb-2 px-14 sm:px-3 flex items-center justify-center sm:justify-start py-3'],
    ['subcat', 'text-3.75 block cursor-pointer text-light-blue-darker hover:(text-accent-default underline) md:mb-1 py-2 md:py-0'],
    ['subsubcat', 'pl-2'],
  
    // Headers and Banners
    ['headline', 'font-headlight font-bold'],
    ['headline-light', 'font-headlight font-300 tracking-tight'],
    ['slimbanner', 'px-4 sm:px-8 flex items-center justify-center text-xs sm:text-base leading-none relative bg-gray-50 z-2 px-4 py-3 sm:(text-base px-8) text-blue-darker print-hidden'],
  
    // Image Styles
    ['img--overlay', 'after:(content-empty bg-black bg-opacity-[.03] absolute w-full h-full top-0)'],
    ['img--4/3', 'aspect-[4/3] relative object-cover bg-neutral-lightest h-auto max-w-full'],
    ['img--3/4', 'aspect-[3/4] relative object-cover bg-neutral-lightest h-auto max-w-full'],
    ['img--1/1', 'aspect-square relative object-cover bg-neutral-lightest h-auto max-w-full'],
    ['img--3/2', 'aspect-[3/2] relative object-cover bg-neutral-lightest h-auto max-w-full'],
    ['img--2/3', 'aspect-[2/3] relative object-cover bg-neutral-lightest h-auto max-w-full'],
    ['img--3/1', 'aspect-[3/1] relative object-cover bg-neutral-lightest h-auto max-w-full'],
    ['img--16/9', 'aspect-video relative object-cover bg-neutral-lightest h-auto max-w-full'],
    ['img--small', 'h-full w-60 sm:(w-22) xl:(w-30)'],
    ['img--medium', 'h-full w-60'],
  
    // Utility
    ['close-light', 'before:bg-white after:bg-white'],
    ['close-dark', 'before:bg-black after:bg-black'],
    ['colon-after', 'after:content-[":"]'],
    ['adsbygoogle', 'w-full text-center'],

    ['underline-on-hover', 'relative flex w-full bg-white pb-1 after:absolute after:bg-lightBlue-55000 after:w-[calc(100%-1rem)] after:left-0 after:h-px after:top-[calc(100%-1px)] after:bottom-1 after:content-empty after:scale-x-0 after:transition-transform-300 after:origin-top-right hover:after:origin-top-left hover:after:scale-x-100'],
    ['cat-link', 'cursor-pointer text-blue-901 dark:text-white hover:(text-lightBlue-400 underline) uppercase py-2 md:py-0'],

  ];