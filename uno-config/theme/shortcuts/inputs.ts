// shortcuts/inputs.ts

export const inputShortcuts = [
  // Base input styles
  ['input-base', 'block w-full text-4.5 text-blue-medium border-0 border-b-1 border-neutral-light appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-lightest focus:outline-none focus:ring-0 focus:border-blue-medium'],
  
  // Base label styles with optimized transform settings
  ['input-label-base', 'absolute text-sm text-slate-light dark:text-neutral-default origin-top-left transform-gpu transition-all duration-300 ease-in-out'],
  
  // We're going back to direct arbitrary selectors in the input component
  // since the grouped selectors seem to be causing issues with the focus behavior
  
  // Variant styles for labels - position only, no transforms
  ['input-label-standard', 'top-3 -z-10'],
  ['input-label-filled', 'top-4 z-10 start-2.5'],
  
  // Container styles
  ['input-wrapper-standard', 'relative z-0'],
  ['input-wrapper-filled', 'relative'],
  
  // Input variant styles
  ['input-standard', 'py-2.5 px-0 bg-transparent'],
  ['input-filled', 'rounded-t-lg px-2.5 pb-2.5 pt-5 bg-gray-50 dark:bg-gray-700'],
  
  // Special input types
  ['input-textarea', 'resize-none'],
  
  // Size variants
  ['input-sm', 'text-sm'],
  ['input-md', 'text-base'],
  ['input-lg', 'text-lg py-3'],
  ['input-label-sm', 'text-xs'],
  ['input-label-md', 'text-sm'],
  ['input-label-lg', 'text-base'],
  
  // Status styles - grouped logically
  ['input-error', 'border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400'],
  ['input-label-error', 'text-red-500 dark:text-red-400'],
  ['input-error-message', 'mt-1 text-xs text-red-500 dark:text-red-400'],
  
  ['input-success', 'border-green-500 focus:border-green-500 dark:border-green-400 dark:focus:border-green-400'],
  ['input-label-success', 'text-green-500 dark:text-green-400'],
  ['input-success-message', 'mt-1 text-xs text-green-500 dark:text-green-400'],
];