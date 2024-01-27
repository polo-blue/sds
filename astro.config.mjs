import { defineConfig, sharpImageService } from "astro/config";
// import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import mdx from '@astrojs/mdx';
import UnoCSS from '@unocss/astro';

// https://github.com/yassinedoghri/astro-i18next#readme
import astroI18next from "astro-i18next";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://spoko-design-system.netlify.app",
  server: {
    port: 1234
  },
  image: {
    service: sharpImageService(),
    domains: ["api.polo.blue", "polo.blue", "media.istockphoto.com", "img.freepik.com"]
  },
  integrations: [
  // Enable Preact to support Preact JSX components.
  vue(),
  // tailwind(),
  mdx(), astroI18next(), UnoCSS({
    injectReset: true
  }), icon(
    {
      include: {
        // mdi: ["*"], // (Default) Loads entire Material Design Icon set
        mdi: ["facebook", "instagram", "post-it-note-edit-outline"], // Loads only Material Design Icon's "account" SVG
        'ant-design': ["menu-fold-outlined", "menu-unfold-outlined", "menu-outlined", "cluster-outlined", "audit-outlined", "build-twotone" ],
        bi: ["envelope-open", "credit-card"],
        bx: ["arrow-back"],
      'noto-1': ["letter-s"],
        carbon: ["language", "checkmark", "home", "dicom-overlay"],
        el: ["star-empty", "star"],
        'eos-icons': ["three-dots-loading"],
        fluent: ["share-android-24-regular"],
        'fluent-emoji': ["cookie"],
        la: ["arrow-right", "arrow-left"],
        octicon: ["chevron-left-24", "x-24"],
        uil: ["map-marker", "envelope", "phone"],
        'circle-flags': ["uk", "pl", "ua" ],
        ph: ["cat-thin", "copy-simple-light"]
      }
    }
  )]
});