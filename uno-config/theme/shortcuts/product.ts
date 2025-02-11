// shortcuts/product.ts
import { PRODUCT_STYLES } from './constants'

const { link, image } = PRODUCT_STYLES

export const productShortcuts = [
  // Product links
  ['product-link--url', `${link.url} ${link.urlOverlay}`],
  ['product-link--big-tile', link.bigTile],
  
  // Product images
  ['product-image', image.base],
  ['product-image--small', image.small],
  ['product-image--large', image.large],
];