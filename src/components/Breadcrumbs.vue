<script setup lang="ts">
export interface Breadcrumb {
  name: string;
  path: string;
}

import type { PropType } from 'vue';

const props = defineProps({
  showBack: {
    type: Boolean,
    required: false,
  },
  textBack: {
    type: String,
    required: false,
    default: 'Back',
  },
  showHome: {
    type: Boolean,
    required: false,
  },
  breadcrumbs: {
    type: Array as PropType<Breadcrumb[]>,
    required: true,
  },
  productNumber: {
    type: String,
    required: false,
    default: null,
  },
});

const isLast = (index: number) => {
  return index === props.breadcrumbs.length - 1;
};
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
    <ul
      class="breadcrumbs-base overflow-x-auto overflow-y-hidden sm:mr-12"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li v-if="props.showHome" class="breadcrumb-item">
        <a
          href="/"
          class="breadcrumb-link flex items-center px-3 sm:px-0 py-4.25 sm:py-1 hover:text-brand-secondary whitespace-nowrap translate-y-0 text-sm my-auto"
          :title="props.textBack"
          itemprop="item"
          i-carbon-home
        >
        </a>
        <meta itemprop="position" content="1" />
      </li>
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <span v-if="index > 0 || props.showHome" class="text-gray-400 px-1 py-4.25 sm:py-1">/</span>

        <a
          v-if="!isLast(index)"
          :href="crumb.path"
          class="breadcrumb-link"
          itemprop="item"
          :title="`Polo 6R ${crumb.name}`"
        >
          <strong class="font-normal" itemprop="name">{{ crumb.name }}</strong>
        </a>
        <a
          v-else
          :href="crumb.path"
          class="breadcrumb-link breadcrumb-link-disabled"
          :title="`Polo 6R ${crumb.name} ${productNumber}`"
          itemprop="item"
        >
          <span class="font-normal" itemprop="name">
            <span v-html="crumb.name"></span>
            <b v-if="productNumber" class="hidden sm:inline font-normal ml-1"
              >&nbsp;{{ productNumber }}</b
            >
          </span>
        </a>

        <meta itemprop="position" :content="String(props.showHome ? index + 2 : index + 1)" />
      </li>
    </ul>
  </nav>
</template>
