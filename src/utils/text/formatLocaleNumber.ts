/* Format numbers like details data: liters, measuring etc. */

export default function formatLocaleNumber(number: number ) {
  // For English-only design system, always use dot notation
  return String(number).replace(/,/g, '.');
}