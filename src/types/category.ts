export interface Breadcrumb {
  name: string;
  path: string;
}


export interface SubCategory {
  id: number;
  name: string;
  parent_id: number;
  title?: string;
  desc?: string;
  slug: string;
  sort: number | null;
  description?: string;
  hasProducts: boolean;
  photo?: string | null;
  children?: SubCategory[];
  seoTitle?: string;
}

export interface Category {
  id: number;
  parent_id: number | null;
  title?: string;
  slug: string;
  sort: number | null;
  description?: string;
  hasProducts: boolean;
  photo?: string | null;
  children: SubCategory[];
  seoTitle?: string;
}

export interface CatObject {
  id: number;
  name: string;
  desc: string;
  parent_id: number | null;
  title?: string;
  slug: string;
  sort?: number | null;
  description?: string;
  hasProducts: boolean;
  photo?: string | null;
  children: SubCategory[];
  seoTitle?: string;
}


export interface Link {
  path: string;
  name: string;
}