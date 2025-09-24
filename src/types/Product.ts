import type { Color, EngineType, MaterialsObject } from './common';

export interface Replacement {
  date: string | null;
  info: string | null;
  number: string;
  prcodes: string[] | null;
  manufacturer: string | null;
}

export interface DetailList {
  name: string;
  id: string;
  value: string | number[] | Color[];
  translated: boolean;
  icon: boolean | null;
  isArrayValue: boolean | null;
}

export interface ImportantDetail {
  name: string;
  id: string;
  value: string | number[];
  translated: boolean;
  icon: boolean | null;
  isArrayValue: boolean | null;
}

export interface Detail {
  name: string;
  value: string | number[];
  translated: boolean;
  icon: boolean | null;
  isArrayValue: boolean | null;
}

export interface DetailObject {
  importantDetails: ImportantDetail[];
  list: DetailList[];
  checklist: DetailList[];
}

export interface Image {
  id: number;
  path: string;
}

export interface ImageObject {
  id: number;
  path: string;
}

export interface Product {
  id: number;
  number: string;
  info: string | null;
  date: string | null;
  prcodes: string[] | null;
  engines: string[] | null;
  engine_type: EngineType[] | null;
  manufacturer: string[] | null;
  manufacturer_number: string | null;
  related: string[] | null;
  color_ids: string[] | null;
  position: string[] | null;
  model: string[] | null;
  replacement: Replacement[] | null;
  details: DetailList[] | null;
  photo: string;
  files: number[] | null;
  images: Image[] | null;
  category_id: number;
  hand_drive: number | null;
  materials: MaterialsObject[] | null;
  sort: number;
  created_at: string;
  updated_at: string;
}


export interface ProductImage {
  title: string;
  alt: string;
  link: string;
  style?: string;
  __typename: string;
}