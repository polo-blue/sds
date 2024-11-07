import type { CatObject  } from "@types/index";

import i18next, { t } from "i18next";
import { getApiCategories } from "@utils/api/getCategories";
import { getSortedCategories } from "@utils/category/getSortedCategories";

// Retrieve main categories:
export const getMainCategoryList = async (locale: string = 'en'): Promise<CatObject[]> => {
  // Set the selected language
  await i18next.changeLanguage(locale);

  // Fetch categories from API
  const categories = await getApiCategories();

  // Map categories with translations
  const translatedCategories = categories.map((category) => {
    const name = t(`cat.${category.slug}.name`);
    const desc = i18next.exists(`cat.${category.slug}.desc`)
      ? t(`cat.${category.slug}.desc`)
      : '';

    if (!desc) {
      console.warn('No category description', category.slug, i18next.language);
    }

    return { ...category, name, desc };
  });

  // Sort and return processed categories
  return translatedCategories.sort(getSortedCategories);
};
