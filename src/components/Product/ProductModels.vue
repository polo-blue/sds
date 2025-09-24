<script lang="ts" setup>
import type { PropType } from 'vue';

const props = defineProps({
  modelIds: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
    required: true,
  },
});
</script>

<template>
  <div
    inline-flex
    flex-wrap
    max-w-max
  >
    <span
      v-for="(modelId, index) in props.modelIds"
      :key="index"
      class="product-model block"
    >
      <ProductModel :id="modelId" />
    </span>
  </div>
</template>

<style>
.product-model:not(:last-child) {
  @apply mr-1;

  &:after {
    content: ',';
  }
}
</style>
