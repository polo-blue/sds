const LIQUIDS_PATTERN = /^(\w{1})(\w{3})(\w{3})(.*)$/;
const WHEELS_EMBLEMS_PATTERN = /^(\w{3})(\w{3})(\w{3})(.*)(\w{3})$/;
const ACCESSORIES_MATS_PATTERN = /^(\w{3})(\w{3})(\w{3})(\w{1})(.*)$/;
const OTHER_PARTS_PATTERN = /(\w{3})/g;

const isLetter = (char: string): boolean => char.toLowerCase() !== char.toUpperCase();

interface FormattedNumbers {
  standard: string;
  dot: string;
  dash: string;
}

export default function useFormatProductNumber(productNumber: string | null): { formattedNumbers: FormattedNumbers | null } {
  if (!productNumber) return { formattedNumbers: null };

  const formatProductNumber = (number: string, separator: string): string => {
    let formatted = number;

    if (isLetter(number[0]) && !isLetter(number[1]) && number.length === 9) {
      formatted = formatted.replace(LIQUIDS_PATTERN, `$1${separator}$2${separator}$3${separator}$4`);
    } else if (number.length >= 13) {
      formatted = formatted.replace(WHEELS_EMBLEMS_PATTERN, `$1${separator}$2${separator}$3${separator}$4${separator}$5`);
    } else if (number.length > 12) {
      formatted = formatted.replace(ACCESSORIES_MATS_PATTERN, `$1${separator}$2${separator}$3${separator}$4${separator}$5`);
    } else {
      formatted = formatted.replace(OTHER_PARTS_PATTERN, `$1${separator}`);
    }

    return formatted
      .replace(' ', separator)
      .replace(/[^a-zA-Z0-9]$/, ''); // Remove the end trailing separator
  };

  const formattedNumbers: FormattedNumbers = {
    standard: formatProductNumber(productNumber, '\u00A0'),
    dot: formatProductNumber(productNumber, '.'),
    dash: formatProductNumber(productNumber, '-')
  };

  return { formattedNumbers };
}