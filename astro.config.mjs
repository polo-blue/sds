import { defineConfig, sharpImageService } from "astro/config";
import { iconConfig } from './icon.config';
import vue from "@astrojs/vue";
import mdx from '@astrojs/mdx';
import UnoCSS from '@unocss/astro';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import AstroPWA from '@vite-pwa/astro';
import metaTags from "astro-meta-tags";

import { createSdsConfig } from './uno-config';

const unoConfig = createSdsConfig();

// https://astro.build/config
export default defineConfig({
  site: "https://sds.spoko.space/",
  server: {
    port: 1234
  },
  image: {
    service: sharpImageService(),
    domains: ["placehold.co", "api.polo.blue", "polo.blue", "media.istockphoto.com", "freepik.com", "img.freepik.com", "polo6r.pl"]
  },
  integrations: [
    // Enable Vue to support Vue3 components
    vue(), 
    mdx(), 
    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg', 'brands/*.svg', 'fonts/*.woff2', 'fonts/*.svg', 'vw.svg', 'polo.blue.svg', 'spoko.space.svg'],
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
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\//]
      },
      experimental: {
        directoryAndTrailingSlashHandler: true
      }
    }), 
    UnoCSS({
      injectReset: true,
      ...unoConfig
    }),
    icon(iconConfig), 
    metaTags(),
    (await import("@playform/inline")).default(),
    pagefind(), 
    sitemap()
  ]
});