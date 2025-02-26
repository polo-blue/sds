// uno-config\theme\shortcuts\inputs.ts
// Complete shortcuts for Input component with floating labels support

export const inputShortcuts = [
  // Base input - core class for the input without peer selectors
  ['input-base', 'block w-full text-4.5 text-blue-medium border-0 border-b-1 border-neutral-light appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-lightest focus:outline-none focus:ring-0 focus:border-blue-medium'],
  
  // Base label - basic styles for the label without transformations and states
  ['input-label-base', 'absolute text-sm text-slate-light dark:text-neutral-default origin-top-left transform-gpu transition-all duration-300 ease-in-out'],
  
  // Base placeholders
  ['input-placeholder', 'placeholder:text-slate-light dark:placeholder:text-neutral-default placeholder:opacity-60'],
  
  // Variant-specific container classes
  ['input-wrapper-standard', 'relative z-0'],
  ['input-wrapper-filled', 'relative'],
  
  // Input variants - styling without peer selectors
  ['input-standard', 'py-2.5 px-0 bg-transparent'],
  ['input-filled', 'rounded-t-lg px-2.5 pb-2.5 pt-5 bg-gray-50 dark:bg-gray-700'],
  
  // LABELS - positioning without transforms
  ['input-label-standard', 'top-3 -z-10'],
  ['input-label-filled', 'top-4 z-10 start-2.5'],
  
  // Focus state transformations - explicitly defined
  ['input-label-focus-color', 'peer-focus:text-blue-light peer-focus:dark:text-blue-lightest'],
  ['input-label-focus-scale', 'peer-focus:scale-75'],
  ['input-label-focus-translate-standard', 'peer-focus:-translate-y-6'],
  ['input-label-focus-translate-filled', 'peer-focus:-translate-y-4'],
  
  // Placeholder state transformations
  ['input-label-placeholder', 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'],
  
  // Not-placeholder-shown state transformations
  ['input-label-filled-standard', 'peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-6'],
  ['input-label-filled-filled', 'peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-4'],
  
  // Standard input states - complete shortcuts for specific states
  ['input-label-standard-state', 'input-label-focus-color input-label-focus-scale input-label-focus-translate-standard input-label-placeholder input-label-filled-standard'],
  ['input-label-filled-state', 'input-label-focus-color input-label-focus-scale input-label-focus-translate-filled input-label-placeholder input-label-filled-filled'],
  
  // Input types
  ['input-textarea', 'resize-none'],
  
  // Input sizes
  ['input-sm', 'text-sm'],
  ['input-md', 'text-base'],
  ['input-lg', 'text-lg py-3'],
  
  // Label sizes
  ['input-label-sm', 'text-xs'],
  ['input-label-md', 'text-sm'],
  ['input-label-lg', 'text-base'],
  
  // Status classes
  ['input-error', 'border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400'],
  ['input-label-error', 'text-red-500 dark:text-red-400'],
  ['input-error-message', 'mt-1 text-xs text-red-500 dark:text-red-400'],
  
  ['input-success', 'border-green-500 focus:border-green-500 dark:border-green-400 dark:focus:border-green-400'],
  ['input-label-success', 'text-green-500 dark:text-green-400'],
  ['input-success-message', 'mt-1 text-xs text-green-500 dark:text-green-400'],
];