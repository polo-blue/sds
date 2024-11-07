<script lang="ts" setup>

import type { Position } from 'types/index'
import type { PropType } from 'vue';
const props = defineProps({
  positions: {
    type: Object as PropType<Position[]>,
    default: null,
    required: true,
  },
  locale: {
    type: String,
    default: null,
    required: false,
  }
})

</script>

<template>
  <span v-for="(position) in positions" :key="position.sort" class="product-position">
    {{  position.name }}
  </span>
</template>

<style lang="scss">
.product-position:not(:last-child) {
  // @apply mr-1;
  margin-right: 0.25rem;

  &:after {
    content: ','
  }
}
</style>
