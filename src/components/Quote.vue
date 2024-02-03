<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  as: {
    type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span'>,
    default: 'div',
    required: true,
  },
  text: {
    type: String,
    default: '',
    required: true,
  }
})
</script>

<template>
  <component :is="props.as"
    class="px-8 sm:px-8 mx-4 sm:mx-6 lg:max-w-4xl drop-shadow-primary text-2xl md:text-4xl lg:text-4.5xl relative font-light after:left-0 after:content-empty after:rounded-3xl after:top-0 after:absolute after:h-full after:border-solid after:border-[var(--primary)] after:border-l-3 after:-z-10">
      {{ props.text }}
    </component>
</template>
