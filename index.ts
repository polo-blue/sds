// Do not write code directly here, instead use the `src` folder!
// Then, use this file to export everything you want your user to access.

// import MyComponent from './src/src/MyComponent.astro';



// export default MyComponent;


// src/index.ts

// Vue Components
export { default as FuckRussia } from './src/components/FuckRussia.vue';
export { default as FlagPL } from './src/components/flags/FlagPL.vue';
export { default as Badges } from './src/components/Badges.vue';
export { default as SlimBanner } from './src/components/SlimBanner.vue';
export { default as Jumbatron } from './src/components/Jumbatron.vue';
export { default as Button } from './src/components/Button.vue';
export { default as Breadcrumbs } from './src/components/Breadcrumbs.vue';
export { default as ProductDetailsList } from './src/components/ProductDetailsList.vue';
export { default as FeaturesList } from './src/components/FeaturesList.vue';
export { default as ProductCodes } from './src/components/ProductCodes.vue';
export { default as ProductEngineType } from './src/components/Product/ProductEngineType.vue';
export { default as ProductButton } from './src/components/Product/ProductButton.vue';

export { default as CategoryLink } from './src/components/Category/CategoryLink.vue';
export { default as CategorySidebarToggler } from './src/components/Category/CategorySidebarToggler.vue';
export { default as SubCategoryLink } from './src/components/Category/SubCategoryLink.vue';

// Astro Components
export { default as Copyright } from './src/components/Copyright.astro';
export { default as HandDrive } from './src/components/HandDrive.astro';
export { default as Faq } from './src/components/Faq.astro';
export { default as FaqItem } from './src/components/FaqItem.astro';
export { default as ProductNumber } from './src/components/Product/ProductNumber.astro';
export { default as ProductImage } from './src/components/Product/ProductImage.astro';

export { default as CategoriesCarousel } from './src/components/Category/CategoriesCarousel.astro';
export { default as CategoriesSidebar } from './src/components/Category/CategoriesSidebar.astro';
export { default as CategoryDetails } from './src/components/Category/CategoryDetails.astro';
export { default as CategorySection } from './src/components/Category/CategorySection.astro';

// Utils: Product
export { default as getPriceFormatted } from './src/utils/product/getPriceFormatted';
export { default as getProductChecklist } from './src/utils/product/getProductChecklist';

// Utils: SEO
export { default as getShorterDescription } from './src/utils/seo/getShorterDescription';

// Utils: Text
export { default as formatDate } from './src/utils/text/formatDate';
export { default as formatLocaleNumber } from './src/utils/text/formatLocaleNumber';
export { default as formatPad } from './src/utils/text/formatPad';
export { default as getNumberFormatted } from './src/utils/text/getNumberFormatted';
export { default as getTranslatedLink } from './src/utils/text/getTranslatedLink';


