/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
    defaultLocale: "en",
    locales: ["en", "pl"],
    i18next: {
        // debug is convenient during development to check for missing keys
        debug: true,
        initImmediate: false,
        // backend: {
        //   loadPath: './src/locales/{{lng}}.yml',
        // },
        detection: {}, // Default detection settings
      },
      i18nextPlugins: {
        fsBackend: 'i18next-fs-backend',
        LanguageDetector: 'i18next-browser-languagedetector',
      },
  };