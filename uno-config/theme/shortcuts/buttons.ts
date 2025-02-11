// shortcuts/buttons.ts
import { BUTTON_STYLES, TRANSITIONS, LAYOUT, COLORS } from './constants'

const { base, sizes, variants, hover } = BUTTON_STYLES

export const buttonShortcuts = [
    // Base buttons
    ['btn', `px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:(cursor-default bg-gray-600 opacity-50)`],
    ['icon-btn', `text-[0.9em] inline-block cursor-pointer select-none opacity-75 ${TRANSITIONS.base} hover:(opacity-100 text-teal-600)`],

    // Primary buttons
    ['btn-primary', `${base.layout} ${base.text} ${variants.primary.solid}`],
    ['btn-primary-outline', `${base.layout} ${base.text} ${variants.primary.outline} ${TRANSITIONS.base}`],
    
    // Secondary buttons
    ['btn-secondary', `${base.layout} ${base.text} ${variants.secondary.solid}`],
    ['btn-secondary-outline', `${base.layout} ${base.text} ${variants.secondary.outline}`],
    
    // Tertiary buttons
    ['btn-tertiary', `${base.layout} ${base.text} ${variants.tertiary.solid}`],
    ['btn-tertiary-outline', `${base.layout} border ${base.text} ${variants.tertiary.outline} ${TRANSITIONS.base}`],
    
    // Utility buttons
    ['btn-text', `text-neutral-dark border border-transparent hover:underline ${TRANSITIONS.base}`],
    ['btn-tag', `bg-blue-ultralight text-blue-darker font-medium mr-2 dark:bg-neutral-darker dark:text-blue-light border border-blue-default hover:border-blue-medium ${LAYOUT.flex.center}`],
    
    // Size variants
    ['btn-normal', sizes.normal],
    ['btn-sm', sizes.sm],
    ['btn-xs', sizes.xs],

    // Hover variants
    ['btn-white-hover', hover.white],
    ['btn-light-hover', hover.light],
    ['btn-medium-hover', hover.medium],
    ['btn-dark-hover', hover.dark],

    // Special buttons
    ['btn-copy', `leading-none opacity-10 hover:opacity-80 ml-auto w-6 h-6 -right-7 sm:(h-4 w-4 -right-5) ${LAYOUT.position.absolute}`],
    ['btn-copy-text', 'shadow-sm py-0.5 px-1 bg-gray-100 -ml-1 -mt-4 text-xxs whitespace-nowrap'],
    ['btn-prcode', `${LAYOUT.position.relative} inline-block text-center leading-none px-1 py-0.5 mr-1 cursor-pointer font-mono border-solid border-1 border-gray-200 select-none text-gray-500 last:mr-0 not-last:mr-2 not-last:after:content-[+] after:(text-blue-darker ${LAYOUT.position.absolute} w-4 pl-0.5)`]
];