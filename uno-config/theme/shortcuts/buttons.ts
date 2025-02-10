// shortcuts/buttons.ts
export const buttonShortcuts = [

    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:(opacity-100 text-teal-600)'],

    // Primary buttons
    ['btn-primary', 'bg-accent-lightest border border-transparent hover:bg-accent-light inline-flex items-center justify-center shadow text-base text-blue-darker'],
    ['btn-primary-outline', 'border-accent-light border font-medium inline-flex items-center justify-center shadow text-base text-accent-default transition-all hover:(bg-accent-light text-white)'],
    
    // Secondary buttons
    ['btn-secondary', 'bg-neutral-dark border border-transparent hover:bg-neutral-darker inline-flex items-center justify-center shadow text-base text-white'],
    ['btn-secondary-outline', 'border-neutral-dark border text-neutral-dark font-medium inline-flex items-center justify-center shadow text-base hover:(text-white bg-neutral-dark)'],
    
    // Tertiary buttons
    ['btn-tertiary', 'inline-flex border border-transparent items-center font-medium text-center text-white bg-blue-darker hover:bg-accent-darker focus:ring-4 focus:outline-none focus:ring-blue-light'],
    ['btn-tertiary-outline', 'inline-flex border items-center font-medium text-center text-blue-darker border-blue-darker transition-colors focus:(ring-2 outline-none ring-blue-light)'],
    
    // Utility buttons
    ['btn-text', 'text-neutral-dark border border-transparent hover:underline transition-all'],
    ['btn-tag', 'bg-blue-ultralight text-blue-darker font-medium mr-2 dark:bg-neutral-darker dark:text-blue-light border border-blue-default hover:border-blue-medium justify-center'],
    
    // Size variants
    ['btn-normal', 'md:px-10 md:py-2 md:text-lg px-8 py-3 whitespace-nowrap'],
    ['btn-sm', 'px-6 py-2 text-sm whitespace-nowrap'],
    ['btn-xs', 'px-4 py-1 text-sm whitespace-nowrap'],

    // Hover variants
    ['btn-white-hover', 'hover:(text-blue-darker bg-white border-blue-darker)'],
    ['btn-light-hover', 'hover:(text-blue-darker bg-accent-lightest border-accent-lightest)'],
    ['btn-medium-hover', 'hover:(text-white bg-brand-primary border-brand-primary)'],
    ['btn-dark-hover', 'hover:(bg-blue-darker text-white border-blue-darker)'],

    ['btn-copy', 'leading-none opacity-10 hover:opacity-80 ml-auto w-6 h-6 -right-7 sm:(h-4 w-4 -right-5) absolute'],
    ['btn-copy-text', 'shadow-sm py-0.5 px-1 bg-gray-100 -ml-1 -mt-4 text-xxs whitespace-nowrap'],

    ['btn-prcode', 'relative inline-block text-center leading-none px-1 py-0.5 mr-1 cursor-pointer font-mono border-solid border-1 border-gray-200 select-none text-gray-500 last:mr-0 not-last:mr-2 not-last:after:content-[+] after:(text-blue-700 absolute w-4 pl-0.5)']
    
];