<script setup lang="ts">

export interface Breadcrumb {
  name: string,
  path: string
}

import type { PropType } from 'vue'

const props = defineProps({
  showBack: {
    type: Boolean,
    required: false,
  },
  textBack: {
    type: String,
    required: false,
    default: 'Back'
  },
  showHome: {
    type: Boolean,
    required: false,
  },
  breadcrumbs: {
    type: Object as PropType<Breadcrumb[]>,
    required: true
  },
  productNumber: {
    type: String,
    required: false,
    default: null
  }
})

const isLast = (index: Number) => {
  return index === props.breadcrumbs.length - 1
}
</script>

<template>
  <nav>
    <ul class="breadcrumbs flex items-center p-0 leading-none	">
      <li v-if="props.showBack" class="breadcrumb-item flex">
        <button
          class="breadcrumb-link flex items-center px-3 sm:px-0 py-4.25 sm:py-1 hover:text-accent-light whitespace-nowrap  my-auto"
          :title="props.textBack" onclick="history.back()">
          <span class="block px-3" i-bx-bx-arrow-back />
        </button>
      </li>
    </ul>
    <ul class="breadcrumbs flex items-center p-0 overflow-x-auto overflow-y-hidden sm:mr-12 leading-none	" itemscope
      itemtype="https://schema.org/BreadcrumbList">
      <li v-if="props.showHome" class="breadcrumb-item flex">
        <a href="/"
          class="breadcrumb-link flex items-center px-3 sm:px-0 py-4.25 sm:py-1 hover:text-brand-secondary whitespace-nowrap translate-y-0 text-sm my-auto px-3"
          :title="textBack" itemprop="item" i-carbon-home>
        </a>
        <meta itemprop="position" content="1">
      </li>
      <li v-for="(crumb, index) in  breadcrumbs" :key="index" class="breadcrumb-item flex" itemprop="itemListElement"
        itemscope itemtype="https://schema.org/ListItem">
        <a v-if="!isLast(index)" :href="crumb.path" class="breadcrumb-link whitespace-nowrap py-4.25 sm:py-1 px-1"
          itemprop="item" :title="`Polo 6R ${crumb.name}`">
          <strong class="font-normal" itemprop="name">{{ crumb.name }}</strong>
        </a>
        <a v-else :href="crumb.path"
          class="breadcrumb-link breadcrumb-link--disabled whitespace-nowrap pointer-events-none py-4.25 sm:py-1 px-1"
          :title="`Polo 6R ${crumb.name} ${productNumber}`">
          <strong class="font-normal" itemprop="name" v-html="crumb.name" /> <b>{{ productNumber }}</b>
        </a>
        <meta itemprop="position" :content="String(props.showHome ? index + 2 : index + 1)">
      </li>
    </ul>
  </nav>
</template>

<style scoped>.breadcrumbs {
  list-style: none;
  font-size: 0.875rem;
}

.breadcrumb-item + .breadcrumb-item::before {
  @apply py-4.25 sm:py-1 px-1;
  display: inline-block;
  padding-right: .5rem;
  color: #bdbdbd;
  content: "/";
}

.breadcrumb-item b {
  @apply hidden sm:inline font-normal;
}

.breadcrumb-link {
  border: 0;
  cursor: pointer;
}

.breadcrumb-link--disabled {
  cursor: default;
}

.breadcrumb-link--disabled:hover {
  color: inherit;
}

</style>
