<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  as: {
    type: String as PropType<'div' | 'td' | 'span' | 'h1' | 'h2' | 'h3'>,
    default: 'div',
    required: true,
  },
  number: {
    type: String,
    default: '',
    required: true,
  },
  class: {
    type: String,
    default: '',
    required: false,
  },
});
</script>

<template>
  <component :is="props.as" :class="props.class">
    {{ props.number }}
  </component>
</template>
