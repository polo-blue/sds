import { defineConfig, sharpImageService } from "astro/config";
import vue from "@astrojs/vue";
import mdx from '@astrojs/mdx';
import UnoCSS from '@unocss/astro';
// import Compress from "astro-compress";
// https://github.com/yassinedoghri/astro-i18next#readme
import astroI18next from "astro-i18next";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import AstroPWA from '@vite-pwa/astro';
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  site: "https://sds.spoko.space/",
  server: {
    port: 1234
  },
  image: {
    service: sharpImageService(),
    domains: ["placehold.co", "api.polo.blue", "polo.blue", "media.istockphoto.com", "img.freepik.com"]
  },
  integrations: [
  // Enable Vue to support Vue3 components.
  vue(), mdx(), astroI18next(), AstroPWA({
    mode: 'production',
    base: '/',
    scope: '/',
    includeAssets: ['favicon.svg', 'safari-pinned-tab.svg', 'brands/*.svg', 'fonts/*.woff2', 'fonts/*.svg', 'vw.svg', 'polo.blue.svg', 'spoko.space.svg'],
    // add this to cache all the static assets in the public folder
    // includeAssets: [
    //   "**/*",
    // ],
    registerType: 'autoUpdate',
    manifest: {
      name: 'Spoko Design System',
      short_name: 'SDS',
      description: 'SDS PWA app description',
      categories: ['multimedia'],
      screenshots: [{
        "src": "pwa-512x512.png",
        "sizes": "512x512",
        "platform": "windows",
        "label": "SDS"
      }],
      theme_color: '#001e50',
      icons: [{
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      }, {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }, {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}']
      // globPatterns: ["**/*"],             // add this to cache all the imports
    },
    devOptions: {
      enabled: false,
      navigateFallbackAllowlist: [/^\//]
    },
    experimental: {
      directoryAndTrailingSlashHandler: true
    }
  }), UnoCSS({
    injectReset: true
  }), icon({
    include: {
      // mdi: ["*"], // (Default) Loads entire Material Design Icon set
      mdi: ["npm", "github", "facebook", "instagram", "post-it-note-edit-outline", "car-hatchback", "car-door", "car-side", "car-windshield-outline", "car-light-alert", "car-tire-alert", "car-light-dimmed", "car-light-fog", "car-light-high", "car-parking-lights", "car-esp", "car-brake-abs", "car-horn", "engine-outline", "fan", "fan-off", "air-conditioner", "coolant-temperature", "car-brake-alert", "car-traction-control", "card-text-outline", "fuel", "oil", "hazard-lights", "credit-card-outline"],
      "ant-design": ["menu-fold-outlined", "menu-unfold-outlined", "menu-outlined", "cluster-outlined", "audit-outlined", "build-twotone", "home-outlined", "close-outlined"],
      bi: ["envelope-open", "credit-card", "qr-code", "list-check", "list-task", "text-indent-left", "text-indent-right", "tag", "tags", "x"],
      bx: ["arrow-back", "check", "detail", "file", "car", "credit-card", "barcode", "qr"],
      carbon: ["language", "checkmark", "home", "dicom-overlay"],
      el: ["star-empty", "star", "heart-empty", "heart", "map-marker", "fire", "quote-right", "qrcode", "car", "indent-left", "indent-right", "ok"],
      'eos-icons': ["three-dots-loading", "bubble-loading", "loading", "installing"],
      fluent: ["share-android-24-regular", "checkmark-24-filled", "tag-24-regular", "tag-multiple-24-regular"],
      "fluent-emoji": ["cookie", "construction", "warning", "wrench"],
      la: ["arrow-right", "arrow-left", "car", "car-side"],
      octicon: ["chevron-left-24", "x-24", "alert-24", "graph-24", "comment-24", "comment-discussion-24", "clock-24", "star-24", "star-fill-24", "file-media-24", "heart-24", "heart-fill-24", "project-roadmap-24", "location-24", "info-24", "mark-github-16"],
      uil: ["map-marker", "envelope", "phone", "tag-alt"],
      "simple-icons": ["ebay", "allegro", "volkswagen", "audi", "skoda", "seat", "whatsapp", "x", "facebook", "messenger", "instagram", "telegram"],
      "icon-park-outline": ["shopping-bag", "comment", "comments", "tag-one"],
      flowbite: ["arrow-left-outline", "arrow-right-outline", "angle-left-outline", "angle-right-outline", "chevron-left-outline", "chevron-right-outline", "map-location-outline", "map-pin-alt-solid", "x-outline", "messages-outline", "arrow-down-to-bracket-outline", "check-outline"]
    }
  }),   //   CSS: true,
  //   HTML: {
  //     caseSensitive: true,
  //     collapseBooleanAttributes: true,
  //     collapseInlineTagWhitespace: false,
  //     collapseWhitespace: true,
  //     conservativeCollapse: false,
  //     continueOnParseError: false,
  //     customAttrAssign: [],
  //     customAttrCollapse: "",
  //     customAttrSurround: [],
  //     customEventAttributes: [/^on[a-z]{3,}$/],
  //     decodeEntities: false,
  //     html5: true,
  //     ignoreCustomComments: [],
  //     ignoreCustomFragments: [],
  //     includeAutoGeneratedTags: true,
  //     keepClosingSlash: true,
  //     maxLineLength: null,
  //     minifyCSS: true,
  //     minifyJS: true,
  //     minifyURLs: false,
  //     preserveLineBreaks: false,
  //     preventAttributesEscaping: false,
  //     processConditionalComments: true,
  //     processScripts: ["module"],
  //     quoteCharacter: "",
  //     removeAttributeQuotes: true,
  //     removeComments: false,
  //     removeEmptyAttributes: false,
  //     removeEmptyElements: false,
  //     removeOptionalTags: false,
  //     removeRedundantAttributes: true,
  //     removeScriptTypeAttributes: true,
  //     removeStyleLinkTypeAttributes: true,
  //     removeTagWhitespace: true,
  //     sortAttributes: true,
  //     sortClassName: true,
  //     trimCustomFragments: false,
  //     useShortDoctype: false
  //   },
  //   Image: false,
  //   JavaScript: true,
  //   SVG: true
  // }),
  metaTags(),
  (await import("@playform/inline")).default(),
  pagefind(), 
  sitemap()
]
});