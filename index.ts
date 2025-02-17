// Do not write code directly here, instead use the `src` folder!
// Then, use this file to export everything you want your user to access.

// src/index.ts

// Vue Components
export { default as FuckRussia } from './src/components/FuckRussia.vue';
export { default as FlagPL } from './src/components/flags/FlagPL.vue';
export { default as Badges } from './src/components/Badges.vue';
export { default as SlimBanner } from './src/components/SlimBanner.vue';
export { default as Jumbotron } from './src/components/Jumbotron.astro';
export { default as Button } from './src/components/Button.vue';
export { default as Breadcrumbs } from './src/components/Breadcrumbs.vue';
export { default as ProductDetailsList } from './src/components/ProductDetailsList.vue';
export { default as FeaturesList } from './src/components/FeaturesList.vue';
export { default as ProductCodes } from './src/components/ProductCodes.vue';
export { default as ProductEngineType } from './src/components/Product/ProductEngineType.vue';
export { default as ProductButton } from './src/components/Product/ProductButton.vue';
export { default as ProductColors } from './src/components/Product/ProductColors.vue';
export { default as ProductDetailName } from './src/components/Product/ProductDetailName.vue';
// export { default as ProductDetails } from './src/components/Product/ProductDetails.vue';
export { default as ProductDoc } from './src/components/Product/ProductDoc.vue';
export { default as ProductModel } from './src/components/Product/ProductModel.vue';
export { default as ProductModels } from './src/components/Product/ProductModels.vue';
export { default as ProductName } from './src/components/Product/ProductName.vue';
export { default as ProductPositions } from './src/components/Product/ProductPositions.vue';
export { default as ProductNumber } from './src/components/Product/ProductNumber.astro';
export { default as ProductLink } from './src/components/Product/ProductLink.vue';
// export { default as ProductCarousel } from './src/components/Product/ProductCarousel.astro';
export { default as LanguageSuggestion } from './src/components/LanguageSuggestion.astro';

export { default as CategoryLink } from './src/components/Category/CategoryLink.vue';
export { default as CategorySidebarToggler } from './src/components/Category/CategorySidebarToggler.vue';
export { default as SubCategoryLink } from './src/components/Category/SubCategoryLink.vue';

// Astro Components
export { default as Copyright } from './src/components/Copyright.astro'; 
export { default as HandDrive } from './src/components/HandDrive.astro';
export { default as Faq } from './src/components/Faq.astro';
export { default as FaqItem } from './src/components/FaqItem.astro';
export { default as ButtonCopy } from './src/components/ButtonCopy.astro'; // Add this line

export { default as ProductImage } from './src/components/Product/ProductImage.astro';

export { default as CategoryDetails } from './src/components/Category/CategoryDetails.astro';
export { default as CategoryTile } from './src/components/Category/CategoryTile.astro';


// Utils: Product
export { default as getPriceFormatted } from './src/utils/product/getPriceFormatted';
export { default as getProductChecklist } from './src/utils/product/getProductChecklist';

// Utils: SEO
export { default as getShorterDescription } from './src/utils/seo/getShorterDescription';

// Utils: Text

export { text2paragraphs, countWords, firstSentence, removeSemicolon } from './src/utils/text';
export { default as formatDate } from './src/utils/text/formatDate';
export { default as formatLocaleNumber } from './src/utils/text/formatLocaleNumber';
export { default as formatPad } from './src/utils/text/formatPad';
export { default as getNumberFormatted } from './src/utils/text/getNumberFormatted';
export { default as getTranslatedLink } from './src/utils/text/getTranslatedLink';
