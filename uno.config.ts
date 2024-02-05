// uno.config.ts
import {
    defineConfig,
   transformerVariantGroup,
   presetAttributify,
   presetIcons,
   presetTypography,
   presetUno,
   presetWebFonts,
   transformerDirectives,
  } from 'unocss'


// import transformerVariantGroup from '@unocss/transformer-variant-group'

// import presetWind from '@unocss/preset-wind';
// import presetUno from '@unocss/preset-uno';
// import presetAttributify from '@unocss/preset-attributify';
// import presetTypography from '@unocss/preset-typography';
// import presetWebFonts from '@unocss/preset-web-fonts';



export default defineConfig({
  // ...
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: [
    ['product-number','font-novamono content-center flex flex-wrap flex-col content-start pr-5 bg-white'],
    ['colon-after', 'after:content-[":"]'],
    ['headline','font-headlight font-bold	'],
    ['badge', 'px-1.5 py-px text-white text-xs mb-1 max-w-fit whitespace-nowrap'],
    ['img--overlay','after:(content-empty bg-black bg-opacity-[.03] absolute w-full h-full top-0)'],
    ['img--4/3', 'aspect-[4/3] relative object-cover bg-gray-100 h-auto max-w-full'],
    ['img--3/4', 'aspect-[3/4] relative object-cover bg-gray-100 h-auto max-w-full'],
    ['img--1/1', 'aspect-square relative object-cover bg-gray-100 h-auto max-w-full'],
    ['img--3/2', 'aspect-[3/2] relative object-cover bg-gray-100 h-auto max-w-full'],
    ['img--2/3', 'aspect-[2/3] relative object-cover bg-gray-100 h-auto max-w-full'],
    ['img--3/1', 'aspect-[3/1] relative object-cover bg-gray-100 h-auto max-w-full'],
    ['img--16/9', 'aspect-video relative object-cover bg-gray-100 h-auto max-w-full'],
    ['img--small', 'h-full w-60 sm:(w-22) xl:(w-30)'],
    ['img--medium', 'h-full w-60'],
    ['underline-on-hover', 'relative flex w-full bg-white pb-1 dark:bg-blue-901 after:absolute after:bg-lightBlue-500 after:w-[calc(100%-1rem)] after:left-0 after:h-px  after:top-[calc(100%-1px)] after:bottom-1 after:content-empty after:scale-x-0 after:transition-transform-300 after:origin-top-right hover:after:origin-top-left hover:after:scale-x-100'],
    ['carousel-product-tile', 'flex flex-wrap sm:flex-nowrap content-between w-64 min-w-64 lg:(w-28.57% min-w-28.57%) 2xl:(w-24.09% min-w-24.09%) relative'],
    ['btn-primary', 'bg-lightBlue-400 border border-transparent font-medium hover:bg-lightBlue-500 inline-flex items-center justify-center shadow text-base text-blue-700'],
    ['btn-primary-outline', 'border-lightBlue-500 border font-medium inline-flex items-center justify-center shadow text-base text-lightBlue-500 transition-all hover:(bg-lightBlue-500 text-white)'],
    ['btn-secondary', 'bg-gray-500 border border-transparent font-medium hover:bg-gray-600 inline-flex items-center justify-center shadow text-base text-white'],
    ['btn-secondary-outline', 'border-gray-500 border text-gray-500 font-medium inline-flex items-center justify-center shadow text-base hover:(text-white bg-gray-500)'],
    ['btn-tertiary', 'inline-flex border border-transparent items-center font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'],
    ['btn-tertiary-outline', 'inline-flex border items-center font-medium text-center text-blue-700 border-blue-700 transition-all hover:(bg-blue-700 text-white) focus:ring-4 focus:outline-none focus:ring-blue-300 '],
    ['btn-text', 'text-gray-400 border border-transparent hover:underline transition-all'],
    ['btn-tag', 'bg-blue-100 text-blue-800 font-medium mr-2 dark:bg-gray-700 dark:text-blue-400 border border-blue-400 hover:border-blue-600 justify-center'],
    ['btn-normal', 'md:px-10 md:py-2 md:text-lg px-8 py-3 whitespace-nowrap'],
    ['btn-sm', 'px-6 py-2 text-sm whitespace-nowrap	'],
    ['btn-xs', 'px-4 py-1 text-sm whitespace-nowrap	'],

    ['main','text-gray-700 dark:text-gray-200 dark:bg-blue-700 pt-24 sm:pt-14 relative'],
    ['nav','bg-white dark:bg-black absolute sm:fixed w-full top-0 z-40 sm:z-30 max-w-screen'],
    ['cat-menu','fixed bottom-[-4px] w-full z-10 border-t-1 border-gray-300 bg-white dark:bg-blue-900 text-center sm:(static z-auto border-t-none) sm:min-h-32'],
    ['cats-slide','transition duration-300 ease-linear mb-0.5 min-h-tile-mobile sm:(min-h-tile h-tile mb-2 p-3) text-black dark:text-white hover:(text-white even:bg-blue-600 odd:bg-lightBlue-500) cursor-pointer flex items-center flex-col justify-center transition ease-in-out duration-700 px-1.5 cursor-grab active:cursor-grabbing overflow-hidden'],
    ['cats-img','w-full h-8 md:h-icon group-hover:filter-invert dark:filter-invert relative'],
    ['subcat', 'whitespace-nowrap cursor-pointer text-light-blue-600 dark:text-lightBlue-500 hover:text-lightBlue-600 font-light mb-1 py-2 md:py-0'],
    ['product-row','bg-white flex flex-wrap  odd:(pr-2.5 pl-3.5 sm:px-0) even:(pl-2.5 pr-3.5 sm:px-0) w-1/2 sm:w-auto sm:grid sm:grid-cols-3 gap-x-1 gap-y-0 md:(grid-cols-product gap-x-4) justify-start content-start content-start  place-content-start py-4 pb-6 sm:pb-4'],
    ['product-row__photo','aspect-ratio-[4/3] mb-2 sm:mb-0 after:(content-empty bg-black bg-opacity-[.03] absolute w-full h-full top-0) w-100 col-span-1 row-span-3 max-w-full text-left overflow-hidden relative bg-gray-100 md:(col-span-1 row-span-1) box-content'], //filter drop-shadow-sm
    ['product-row__description', 'text-xs text-gray-900 dark:text-gray-300 leading-tight mt-2 font-textlight line-clamp-3 whitespace-normal md:(text-sm mt-0 font-textregular whitespace-pre-wrap)'],
    ['product-row__main', 'w-full sm:w-auto col-span-2 leading-none relative sm:pl-1 md:(pl-0 row-start-1 col-start-2 col-span-1)'],
    ['product-date', 'inline-block text-xxs md:text-xs leading-none mt-1 md:(mt-4 mb-1) mr-2'],
    ['detail-name', 'text-xs text-gray-900 dark:text-gray-300 leading-tight font-textlight line-clamp-3 whitespace-normal md:(text-sm whitespace-pre-wrap line-clamp-9 font-textregular)'],
    ['detail-row','text-sm mt-1 md:mt-4 mb-4 grid grid-cols-2 gap-4 sm:(grid-cols-details-desktop grid-flow-col auto-cols-max)'],
    ['product-thumb', 'h-full w-full object-cover object-center transform scale-100 group-hover:scale-110 absolute inset-0 will-change-transform bg-gray-100'],
    ['product-thumb--plp','aspect-ratio-[4/3] flex items-center flex justify-center mb-3 sm:mb-0 after:(content-empty bg-black bg-opacity-[.03] absolute w-full h-full top-0)'], //filter drop-shadow-sm
    ['product-link--related', 'relative flex w-full bg-white dark:bg-blue-901 after:absolute after:bg-lightBlue-500 after:w-full after:left-0 after:h-px after:-bottom-2 after:content-empty after:scale-x-0 after:transition-transform-300 after:origin-top-right hover:after:origin-top-left hover:after:scale-x-100'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:(opacity-100 text-teal-600)'],
    ['sidebar-title','font-headregular text-light-blue-500 text-xl md:(text-2xl px-4) mb-2 px-14 sm:px-3 flex items-center justify-center sm:justify-start py-3'],
    ['product-info','text-gray-400 text-xxs font-textlight leading-none mt-0.5 md:(mt-0 text-xs)'],
    ['product-button', 'text-blue-500 cursor-pointer text-base leading-none  inline-flex items-center justify-center w-8 h-8 min-w-8 transition-colors duration-150 bg-white dark:bg-blue-901 focus:(text-blue-500) hover:(text-blue-500)'],
    ['pdp-headline','text-2xl sm:text-4xl 2xl:text-5xl font-headlight mb-6 font-bold sm:font-normal pr-7 lg:pr-0 pt-0 leading-none'],
    ['pdp-detail-row','text-sm mt-1 md:mt-4 mb-4 grid grid-cols-2 sm:(grid-cols-details-desktop grid-flow-col auto-cols-max) gap-4'],
    ['pdp-slide','h-full bg-gray-100 aspect-[4/3] relative overflow-hidden border border-transparent'],
    ['slide-bg','scale-140 bg-center bg-no-repeat bg-contain h-full w-full absolute top-0 filter-blur overflow-hidden transform bg-gray-200 dark:bg-gray-700'],
    ['slide-img','cursor-zoom-in my-auto z-50 h-full max-w-screen-2xl object-center object-contain pointer-events-none'],
    ['slide-pic','w-full flex justify-end absolute top-0 bottom-0'],
    ['slide-thumb','bg-gray-100 aspect-[4/3] w-auto h-auto cursor-grab active:cursor-grabbing max-h-44'],
    ['slide-thumb__img','pointer-events-none pb-px h-full m-auto object-cover bg-white dark:bg-blue-901'],
    ['cat-card','p-4 text-base md:text-sm'],
    ['flag-ua', 'inline-block text-4xl w-6 h-3.5 min-w-[1.25rem] mr-3 bg-gradient-to-b stops-[#0057b7_50%,50%,#ffd700_100%]'],
    ['slimbanner','px-4 sm:px-8 py-3 flex items-center justify-center text-xs sm:text-base leading-none text-white relative'],
    ['similar-products','flex items-center space-y-4 gap-8 flex-wrap px-4 md:grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'],
    ['products-grid','flex w-full flex-nowrap items-center pr-4 md:grid grid-rows-1 overflow-hidden grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 max-h-[6rem]'],
    ['cat-link','whitespace-nowrap cursor-pointer text-blue-901 dark:text-white hover:text-lightBlue-400 font-light uppercase py-2 md:py-0'],
    ['plp-name','flex items-center leading-none font-headregular cursor-pointer sm:pr-6 md:pr-12'],
    ['plp-replacements','col-span-3 md:col-span-1 md:col-start-2 text-xs mt-3 md:mt-4'],
    ['product-code','text-blue-500 dark:text-lightBlue-500 mr-1 leading-none tracking-wide select-all '],
    ['code-formatted','font-novamono leading-none mt-0 relative text-xs'],
    ['btn-copy', 'leading-none opacity-10 hover:opacity-80 ml-auto w-6 h-6 -right-7 sm:(h-4 w-4 -right-5) absolute'],
    ['btn-copy-text','shadow-sm py-0.5 px-1 bg-gray-100 -ml-1 -mt-4 text-xxs whitespace-nowrap'],
    ['plp-icons','absolute top-0 -right-2 md:(top-0.5 right-0) w-12 bottom-auto flex justify-end text-sm'],
    ['plp-desc','hidden sm:block col-span-3 md:col-span-1 md:col-start-3 relative px-2 sm:px-0'],
    ['plp-materials', 'text-xs md:text-sm text-gray-900 dark:text-gray-300 leading-tight font-textlight md:font-textregular whitespace-normal md:whitespace-pre-wrap'],
    ['plp-b-desc','whitespace-pre-wrap text-xs md:text-sm font-textlight leading-4 md:leading-5'],
    ['carousel-tile', 'w-52 min-w-52 flex ml-1 lg:ml-1.5'],
    ['category-carousel__link', 'uppercase ml-auto px-4 text-xs flex items-center mt-3 hover:underline'],
    ['adsbygoogle', 'w-full text-center'],
    ['search-container', 'mb-2 sm:mb-0'],
    ['l-main', 'text-gray-700 dark:text-gray-200 pt-24 sm:pt-14 bg-white dark:bg-blue-901'],
    ['category-section', 'pb-4 w-full bg-white mb-4 overflow-x-hidden flex flex-wrap max-w-full'],
    ['number-secondary', 'block absolute inset-0 text-gray-400 select-all bg-white dark:bg-blue-901'],
    ['product-list', 'flex flex-wrap sm:block bg-white dark:bg-blue-901 sm:divide-y-1 sm:divide-solid divide-gray-200 dark:divide-white dark:divide-opacity-10 md:px-2 md:pl-4 mb-4 w-full bg-gray-100 dark:bg-gray-700 mb-auto'],
    ['btn-prcode', 'relative inline-block text-center leading-none px-1 py-0.5 mr-1 cursor-pointer font-mono border-solid border-1 border-gray-200 select-none text-gray-500 last:mr-0 not-last:mr-2 not-last:after:content-[+] after:(text-blue-700 absolute w-4 pl-0.5)']
  ],
  theme: {
    colors: {
      blue: {
        500: '#3b82f6',
        600: '#02307d',
        700: '#001e50',
        800: '#00437a',
        900: '#000f28',
        901: '#0c1a32',
        wrc: '#0000c8'
      },
      lightBlue: {
        400: '#00b0f0',
        500: '#0099da',
        600: '#0087c1',
        700: '#006ea6'
      },
      gray: {
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#b5bbc5',
        400: '#9ca3af',
        500: '#64748B'
      }
    },
    gridTemplateColumn: {
      16: 'repeat(16, minmax(0, 1fr))',
      product: '15rem 20rem minmax(15rem, 1fr) ',
      productGalleryDesktop: 'calc(100% - 14% - 0.9375rem) 14%',
      replacement: '6.25rem 12rem auto', // minmax(10rem, 1fr)
      'details-desktop': '12.5rem calc(100% - 12.5rem - 1rem)'
    },
    height: {
      'tile': ' 104px',
      'tile-mobile': ' 78px',
      'sidebar': 'calc(100vh - 5.125rem)',
      'full-mobile': 'calc(var(--vh, 1vh) * 100)',
      icon: '46px',
    },
    filter: {
      blur: 'blur(5px)',
    },
    backgroundSize: {
      full: '100% 100%',
    },
    maxHeight: {
      icon: '46px',
      sidebar: 'calc(100vh - 5.125rem)',
    },
    minHeight: {
      'tile': ' 104px',
      'tile-mobile': ' 78px',
    },
    scale: ['group-hover'],
    cursor: {
      'zoom-in': 'zoom-in',
    },
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2400px',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      'print': { 'raw': 'print' },
    },
    fontSize: {
      xxs: '.625rem',
    },
    aspectRatio: {
      '4/3': '4 / 3',
    },
  },
  presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        warn: true,
        prefix: 'i-',
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
          // ...
        },
      }),
      // presetTypography(),
      presetWebFonts({
        fonts: {
          sans: [{
            name: 'vw_textregular',
            provider: 'none'
          }],
          novamono: [{
            name: 'Nova Mono',
            provider: 'none'
          }],
          mono: [{
              name: 'Nova Mono',
              provider: 'none'
            }],
          headlight: [{
            name: 'vw_headlight',
            provider: 'none'
          }],
          headregular: [{
            name: 'vw_headregular',
            provider: 'none'
          }],
          headbold: [{
            name: 'vw_headbold',
            provider: 'none'
          }],
          textlight: [{
            name: 'vw_textlight',
            provider: 'none'
          }],
          textregular: [{
            name: 'vw_textregular',
            provider: 'none'
          }],
          textbold: [{
            name: 'vw_textbold',
            provider: 'none'
          }]
        }
    })
  ]
})