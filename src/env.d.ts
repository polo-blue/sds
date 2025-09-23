/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
