<script lang="ts" setup>
const props = defineProps({
  modelIds: {
    type: Array,
    default: null,
    required: true,
  },
})

</script>

<template>
  <div inline-flex flex-wrap max-w-max>
    <span v-for="(modelId, index) in modelIds"
      :key="index"
      class="product-model block"
    >
      <ProductModel :id="modelId" />
    </span>
  </div>
</template>

<style lang="scss">
.product-model:not(:last-child) {
  @apply mr-1;

  &:after {
    content: ','
  }
}
</style>
