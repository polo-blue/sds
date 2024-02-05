<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  as: {
    type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span'>,
    default: 'span',
    required: true,
  },
  textSize: {
    type: String as PropType<'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'>,
    required: false,
    default: null
  },
  underline: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <component :is="props.as" class="mb-2.5 flex sm:block md:flex items-center leading-none"
    :class="`headline ${props.textSize ? `text-${props.textSize}` : 'text-xl'} ${props.underline ? 'headline--underline' : ''}`">
    <slot />
  </component>
</template>

<style lang="scss">
.headline--underline {
  @apply relative pb-4;

  &:after {
    @apply content-empty absolute left-0 bottom-0;
    height: 3px;
    width: 55px;
    background-color: var(--primary);
  }

  &:before {
    @apply content-empty absolute left-0 bottom-px h-px;
    width: 95%;
    max-width: 255px;
    background-color: #64748b
  }
}
</style>
