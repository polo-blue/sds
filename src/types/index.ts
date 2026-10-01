/// <reference types="vite/client" />

// Re-export all types from modular files
export * from './product';
export * from './category';
export * from './common';
// catalog.ts also declares Product and ProductImage; import those from './catalog' directly
export type { BaseProduct, ShopProduct, CatalogProduct, ProductLinkProps } from './catalog';
