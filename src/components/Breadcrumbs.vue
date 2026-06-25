<script setup lang="ts">
import { computed } from 'vue';

export interface Breadcrumb {
  name: string;
  path: string;
}

// Parts of the breadcrumb that can be hidden on mobile via `hideOnMobile`.
export type BreadcrumbPart = 'suffix' | 'home' | 'separators' | 'trail';

interface Props {
  showBack?: boolean;
  textBack?: string;
  showHome?: boolean;
  breadcrumbs: Breadcrumb[];
  suffix?: string;
  titlePrefix?: string;
  hideOnMobile?: BreadcrumbPart[];
  withMicrodata?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showBack: false,
  textBack: 'Back',
  showHome: false,
  suffix: undefined,
  titlePrefix: '',
  // Default keeps the original behaviour: the suffix is hidden below `sm`.
  hideOnMobile: () => ['suffix'],
  withMicrodata: true,
});

const isLast = (index: number) => {
  return index === props.breadcrumbs.length - 1;
};

// Build the link title from the optional prefix, the crumb name and (on the
// last crumb) the suffix — empty parts are dropped so there are no stray spaces.
const getTitle = (name: string, last = false) =>
  [props.titlePrefix, name, last ? props.suffix : undefined].filter(Boolean).join(' ');

// Hides the given part below the `sm` breakpoint; the element's base display
// (flex/inline) is restored from `sm` up. Empty string = always visible.
const mobileHidden = (part: BreadcrumbPart) => (props.hideOnMobile.includes(part) ? 'max-sm:hidden' : '');

// Microdata attributes - only added when withMicrodata is true
const listMicrodata = computed(() =>
  props.withMicrodata
    ? {
        itemscope: true,
        itemtype: 'https://schema.org/BreadcrumbList',
      }
    : {}
);

const listItemMicrodata = computed(() =>
  props.withMicrodata
    ? {
        itemprop: 'itemListElement',
        itemscope: true,
        itemtype: 'https://schema.org/ListItem',
      }
    : {}
);
</script>

<template>
  <nav>
    <ul class="breadcrumbs-base">
      <li v-if="props.showBack" class="breadcrumb-item">
        <button class="breadcrumb-back-btn" :title="props.textBack" onclick="history.back()">
          <span class="block px-3" i-bx-bx-arrow-back />
        </button>
      </li>
    </ul>
    <ul class="breadcrumbs-base overflow-x-auto overflow-y-hidden sm:mr-12" v-bind="listMicrodata">
      <li v-if="props.showHome" class="breadcrumb-item" :class="mobileHidden('home')">
        <a
          href="/"
          class="breadcrumb-link flex items-center px-3 sm:px-0 py-4.25 sm:py-1 hover:text-brand-secondary whitespace-nowrap translate-y-0 text-sm my-auto"
          :title="props.textBack"
          v-bind="withMicrodata ? { itemprop: 'item' } : {}"
          i-carbon-home
        />
        <meta v-if="withMicrodata" itemprop="position" content="1" />
      </li>
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
        :class="mobileHidden('trail')"
        v-bind="listItemMicrodata"
      >
        <span
          v-if="index > 0 || props.showHome"
          class="text-gray-400 px-1 py-4.25 sm:py-1"
          :class="mobileHidden('separators')"
        >
          /
        </span>

        <a
          v-if="!isLast(index)"
          :href="crumb.path"
          class="breadcrumb-link"
          v-bind="withMicrodata ? { itemprop: 'item' } : {}"
          :title="getTitle(crumb.name)"
        >
          <strong class="font-normal" v-bind="withMicrodata ? { itemprop: 'name' } : {}">
            {{ crumb.name }}
          </strong>
        </a>
        <a
          v-else
          :href="crumb.path"
          class="breadcrumb-link breadcrumb-link-disabled"
          :title="getTitle(crumb.name, true)"
          v-bind="withMicrodata ? { itemprop: 'item' } : {}"
        >
          <span class="font-normal" v-bind="withMicrodata ? { itemprop: 'name' } : {}">
            <span v-html="crumb.name" />
            <b v-if="suffix" class="font-normal ml-1" :class="mobileHidden('suffix')">&nbsp;{{ suffix }}</b>
          </span>
        </a>

        <meta
          v-if="withMicrodata"
          itemprop="position"
          :content="String(props.showHome ? index + 2 : index + 1)"
        />
      </li>
    </ul>
  </nav>
</template>
