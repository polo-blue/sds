<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ElementTag } from '../../types/common';

const props = defineProps({
  as: {
    type: String as PropType<ElementTag>,
    default: 'div',
    required: false,
  },
  text: {
    type: String,
    default: '',
    required: true,
  },
  styles: {
    type: String,
    default: '',
    required: false,
  },
});
</script>

<template>
  <component :is="props.as" class="font-bold detail-name w-full sm:w-50 flex">
    <span class="colon-after" :class="styles && styles.length ? styles : 'mt-auto'">
      {{ props.text }}
    </span>
  </component>
</template>
