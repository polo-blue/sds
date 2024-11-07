/* Format numbers like details data: liters, measuring etc. */

import i18next from "i18next";

export default function formatLocaleNumber(number: number ) {
  return  i18next.language === 'en' ? String(number).replace(/,/g, '.') : String(number);
}