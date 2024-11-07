<script lang="ts" setup>
import type { Model } from 'types/index';
import type { PropType } from 'vue';

const props = defineProps({
  carModel: {
    type: Object as PropType<Model>,
    required: true,
  },
})

</script>
<template>
  <strong class="product-model" :data-pagefind-filter="`model:${props.carModel.name}`">{{ props.carModel.name }}</strong>
</template>
<style lang="scss">
.product-model:not(:last-child) {
  @apply mr-1;

  &:after {
    content: ','
  }
}
</style>
