export interface ProductImage {
  path: string;
}

export interface BaseProduct {
  id: string | number;
  number: string;
  photo: string | null;
  price_pln?: number;
}

export interface ShopProduct extends BaseProduct {
  images: ProductImage[];
  slug: string;
  name_pl: string;
  name_en: string;
}

export interface CatalogProduct extends BaseProduct {
  photo: string | null;
}

export type Product = ShopProduct | CatalogProduct;

export interface ProductLinkProps {
  productId: string;
  bigTile?: boolean;
  locale: string;
  index?: number | null;
  loading?: 'lazy' | 'eager';
  isShopProduct?: boolean;
}
