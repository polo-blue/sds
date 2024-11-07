<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  colors: {
    type: Object as PropType<{id: number, slug: string, name: string}[]>,
    default: null,
    required: true,
  },
  small: {
    type: Boolean,
    required: false,
  },
  isPdp: {
    type: Boolean,
    required: false,
    default: false,
  },
  filterName: {
    type: String,
    required: false,
    default: 'Color'
  }
})

</script>

<template>
  <span v-for="(color, index) in colors" :key="index" class="product-color" :data-pagefind-filter="filterName">
    {{  color.name }}
  </span>
</template>

<style lang="scss">
.product-color:not(:last-child) {
  @apply mr-1;

  &:after {
    content: ','
  }
}
</style>
