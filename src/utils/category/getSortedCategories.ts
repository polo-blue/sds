import type { CatObject, SubCategory } from "@types/index";


// compareFn
export const getSortedCategories = (a: CatObject|SubCategory, b: CatObject|SubCategory) => {
  if (a.sort && b.sort)
    return (a.sort - b.sort)

  else
    return 0
}