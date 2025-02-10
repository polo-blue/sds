<template>
    <div class="product-link" itemscope itemtype="https://schema.org/Product">
      <div :class="[
        bigTile ? 'product-link--big-tile' : 'product-thumb--plp product-thumb--carousel'
      ]">
        <!-- Slot na ProductImage z Astro -->
        <slot name="image">
          <img src="/1x1.png" class="bg-neutral-lightest/70" :alt="productName" />
        </slot>
      </div>
  
      <div :class="[bigTile ? '' : 'sm:pl-4']">
        <p v-if="price" class="block mb-2 font-600 font-headbold text-5">
          {{ price }}
        </p>
  
        <a 
          class="product-link--url"
          :href="url"
          itemprop="url"
          :title="productNumber"
          v-html="nameFormatted"
        />
  
        <ProductNumber 
          :productNumber="productNumber" 
          :copyDisabled="true" 
        />
        
        <template v-if="index !== null">
          <meta itemprop="position" :content="index.toString()" />
          <meta itemprop="name" :content="nameFormatted" />
        </template>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { ProductNumber } from 'spoko-design-system'
  import { removeSemicolon } from 'spoko-design-system'
  
  interface Props {
    productName: string
    productNumber: string
    url: string
    price?: string
    bigTile?: boolean
    index?: number
  }
  
  const props = withDefaults(defineProps<Props>(), {
    bigTile: false,
    index: null,
  })
  
  const nameFormatted = computed(() => {
    return removeSemicolon(props.productName.toString())
  })
  </script>