/// <reference types="vite/client" />

export interface Breadcrumb {
  name: string,
  path: string
}


export interface Navigation {
  currentIndex: number | null
  prev: Product | null
  next: Product | null
}

export interface ResponsiveImage {
  media: string
  src: string
}

export interface SubCategory {
  id: number
  name: string
  parent_id: number
  title?: string
  desc?: string
  slug: string
  sort: number | null
  description?: string
  hasProducts: boolean
  photo?: string | null
  children?: SubCategory[]
  seoTitle?: string
}

export interface Category {
  id: number
  parent_id: number | null
  title?: string
  slug: string
  sort: number | null
  description?: string
  hasProducts: boolean
  photo?: string | null
  children: SubCategory[]
  seoTitle?: string
}

export interface CatObject {
  id: number
  name: string
  desc: string
  parent_id: number | null
  title?: string
  slug: string
  sort?: number | null
  description?: string
  hasProducts: boolean
  photo?: string | null
  children: SubCategory[]
  seoTitle?: string
}

export interface CatLevels {
  lvl1: Category|CatObject | null
  lvl2: CatObject | null
  lvl3: CatObject | null
}
export interface CatInfo {
  category: CatObject | null
  subcategory: CatObject | null
  subsubcategory: CatObject | null
}

export interface Replacement {
  date: string | null
  info: string | null
  number: string
  prcodes: string[] | null
  manufacturer: string | null
}

export interface Color {
  id: Number
  slug: String
  name?: String
}

export interface DetailList {
  name: string
  id: string
  value: string | number[] | Color[]
  translated: boolean
  icon: boolean | null
  isArrayValue: boolean | null
}

export interface importantDetail {
  name: string
  id: string
  value: string | number[]
  translated: boolean
  icon: boolean | null
  isArrayValue: boolean | null
}

export interface Detail {
  name: string
  value: string | number[]
  translated: boolean
  icon: boolean | null
  isArrayValue: boolean | null
}

export interface DetailObject {
  importantDetails: importantDetail[]
  list: DetailList[],
  checklist: DetailList[]
}


export interface Image {
  id: number
  path: string
}

export interface ImageType {
  id: number
  path: string
}

export interface ImageApi {
  id: number
  slug: string
  path: string
}

export interface ImageObject {
  id: number
  path: string
}

export interface ProductFile {
  id: number
  name: string
  slug: string
  path: string
  type: number
}

export interface Product {
  id: number
  number: string
  info: string | null
  date: string | null
  prcodes: string[] | null
  engines: string[] | null
  engine_type: EngineType[] | null
  manufacturer: string[] | null
  manufacturer_number: string | null
  related: string[] | null
  color_ids: string[] | null
  position: string[] | null
  model: string[] | null
  replacement: Replacement[] | null
  details: DetailList[] | null
  photo: string
  files: number[] | null
  images: Image[] | null
  category_id: number
  hand_drive: number | null
  materials: MaterialsObject[] | null
  sort: number
  created_at: string
  updated_at: string
}

export interface MaterialsObject {
  name: string,
  list: Material[]
}


export interface Product2FullSearch {
  number: string
  category_id: number
  photo: string
  hand_drive: number | null
  manufacturer: string[] | null
  date: string | null
  text: string
  details: DetailList[] | null
}

export interface Link {
  path: String
  name: String
}
export interface EngineType {
  id: Number
  type: String
}

export interface Model {
  id: Number
  slug: String
  sort: Number
  name: String
}

export interface Material {
  id: Number
  name: String
  slug: String
  sort: Number | null
  value?: String | null
}

export interface ProductImage {
  title: string
  alt: string
  link: string
  style?: string
  __typename: string
}

export interface Position {
  id: number
  slug: string
  sort: number
  name: string
}

export interface Hreflang {
  rel: 'alternate' | 'canonical'
  href: string
  hreflang: 'en' | 'pl' | 'x-default'
}
