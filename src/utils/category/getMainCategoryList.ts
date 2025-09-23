import type { CatObject  } from "@types/index";

import { getApiCategories } from "@utils/api/getCategories";
import { getSortedCategories } from "@utils/category/getSortedCategories";

// Retrieve main categories:
export const getMainCategoryList = async (locale: string = 'en'): Promise<CatObject[]> => {
  // Fetch categories from API
  const categories = await getApiCategories();

  // Use category data directly (English only)
  const processedCategories = categories.map((category) => {
    return {
      ...category,
      name: category.name || category.slug,
      desc: category.desc || ''
    };
  });

  // Sort and return processed categories
  return processedCategories.sort(getSortedCategories);
};
