// shortcuts/product.ts
import { PRODUCT_CONSTANTS, IMAGE_STYLES, aspectRatios } from './constants'

const { link } = PRODUCT_CONSTANTS

export const productShortcuts = [
  // Product links
  ['product-link--url', `${link.url} ${link.urlOverlay}`],
  ['product-link--big-tile', link.bigTile],
  
  // Product images
  ['product-image', `${aspectRatios['4/3']} ${IMAGE_STYLES.base} ${IMAGE_STYLES.overlay}`],
  ['product-image--small', `${aspectRatios['4/3']} ${IMAGE_STYLES.base} ${IMAGE_STYLES.overlay} w-22 h-auto`],
  ['product-image--large', `${aspectRatios['4/3']} ${IMAGE_STYLES.base} ${IMAGE_STYLES.overlay} w-60 h-auto`],
];