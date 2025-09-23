# Spoko Design System

![Version](https://img.shields.io/github/package-json/v/polo-blue/sds)

SDS is the easiest way to start websites with simple design system. Since Astro is compatible with many frameworks, you can import your components and document them right in the markdown files.
The project is still in the development phase, use at your own risk ;-)
#
Please feel free to fork it, edit it and let me know what do you think about it.



| title       | Introduction                   |
|-------------|--------------------------------|
| description | Docs intro                     |
| layout      | ../../layouts/MainLayout.astro |


## Getting started

### Installation

```js
pnpm add spoko-design-system
```

or just clone the repository.



### Example:
- https://sds.spoko.space/

#

Most of the components from this repository can be seen in my projects:

- https://catalog.polo.blue/
- https://polo.blue
- https://polo6r.pl


### Features
- ⚡️[Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/) - born with fastness
- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine
- 😃 [astro-icon](https://github.com/natemoo-re/astro-icon) - for local icons, sprites and `@iconify-json/*` sets
- 🍔 [astro-navbar](https://github.com/surjithctly/astro-navbar) -  fully responsive and accessible headless navigation bar
- 🔎 [astro-pagefind](https://github.com/shishkin/astro-pagefind) - Astro integration for Pagefind static site search
- 🗒 [astrojs/mdx](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/) - markdown support
- 📦 [Playform compression](https://github.com/Playform/compress) - compression utilities to your Astro project
- 📲 [PWA](https://github.com/vite-pwa/astro) - Zero-config PWA Integration for Astro
- 🏷️ [astro-meta-tags](https://github.com/patrick91/astro-meta-tags) - Meta Tags inside for Astro Dev Toolbar
- 🖨 Static-site generation (SSG)
- 🎡 [Swiper](https://github.com/nolimits4web/swiper) - modern mobile touch slider with hardware accelerated transitions and amazing native behavior
- 🌠 [View Transitions API](https://docs.astro.build/en/guides/view-transitions/#full-site-view-transitions-spa-mode) - [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition) - makes it easy to change the DOM in a single step, while creating an animated transition between the two states. It's available in Chrome 111+ ([more details](https://developer.chrome.com/docs/web-platform/view-transitions?hl=en))
- ☁️ Deploy on Netlify

### Icon Collections

The design system includes carefully curated icon collections from Iconify:

- 🎨 [Material Design Icons](https://icon-sets.iconify.design/mdi/) - comprehensive icon set for UI elements
- 🚗 [Ant Design Icons](https://icon-sets.iconify.design/ant-design/) - clean outlined icons
- 📱 [Bootstrap Icons](https://icon-sets.iconify.design/bi/) - simple and consistent icons
- 🎯 [Boxicons](https://icon-sets.iconify.design/bx/) - high quality web icons
- 🌍 [Carbon Icons](https://icon-sets.iconify.design/carbon/) - IBM's design language icons
- 🎪 [Lucide Icons](https://icon-sets.iconify.design/lucide/) - beautiful & consistent icon toolkit
- 🎨 [Streamline Freehand Color](https://icon-sets.iconify.design/streamline-freehand-color/) - hand-drawn style colored icons
- 📟 [VS Code Icons](https://icon-sets.iconify.design/vscode-icons/) - file type and technology icons
- 🏢 [Simple Icons](https://icon-sets.iconify.design/simple-icons/) - brand icons for popular services
- ⚡ [Fluent UI Icons](https://icon-sets.iconify.design/fluent/) - Microsoft's design system icons

See the complete list and configuration in [`icon.config.ts`](./icon.config.ts).

### Adding new sections

Although it's not required, you can create folders for new sections.

To show the section on the left side navigation, add it to the navigation config file at `src/config.ts`.


```js
export const SIDEBAR = [
    { text: "Core", header: true },
    { text: "Introduction", link: "/core/introduction" },
    ...,
    { text: "Components", header: true },
    { text: "Buttons", link: "/components/jumbotron" },
    ...,
    { text: "New section", header: true },
    { text: "New component", link: "/new-section/new-component.md" },
];
```

### Adding new pages

To add new pages just create an .astro or markdown file in `src/pages/[section]/my-page.mdx`. Remember to add it to the navigation config in `src/config.ts` so it shows up in the left side navigation.

You're free to organize the pages however you want.

### Customizing Core section (colors, typography, shadows...)

If you want to customize the default colors, typography or shadows you can find the configuration file at uno.config.ts`.  I think I have prepared enough shades of blue ;-)

Feel free to add new pages to the Core section


### Customizing the page layout

You can find the css for the pages in `src/styles/content.css`.


### Adding your components

Astro is great for design systems because it allows you to import components from different frameworks like react, vue or svelte.

To get started check how the `MainButton` component is used in the `src/pages/buttons.mdx` file.

You can import your component library or create your own and document it easily.


### `.component-preview` utility

There's a class called `.component-preview` that you can use to wrap your component in a grid, and it will look like this:

<div class="component-preview">
    <button class="text-white bg-blue-lightest px-4 py-2 rounded-md">Your component</button>
</div>


### Have fun!

Spoko Design System template was made in Poland by **[@spoko.space](https://spoko.space)** for personal and commercial use.
