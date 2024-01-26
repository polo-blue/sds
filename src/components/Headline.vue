<script setup lang="ts">
import type { PropType } from 'vue'


const props = defineProps({
  as: {
    type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span'>,
    default: null,
    required: true,
  },
  textSize: {
    type:  String as PropType<'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'>,
    required: false,
    default: null
  }
})

</script>

<template>
  <component
    :is="props.as" class="mb-2.5 flex sm:block md:flex items-center leading-none" :class="props.textSize ? `text-${props.textSize}` : 'text-xl'"
  >
    <!-- default -->
    <slot />

  </component>
</template>