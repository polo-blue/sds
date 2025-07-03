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
  fontFamily: {
    type: String as PropType<'head' | 'text' | 'novamono' | 'mono'>,
    required: false,
    default: 'head'
  },
  fontWeight: {
    type: String as PropType<'light' | 'regular' | 'bold' | 'light-bold' | 'light-thin'>,
    required: false,
    default: 'regular'
  },
  underline: {
    type: Boolean,
    required: false,
    default: false
  }
})

// Generate the typography class based on font family and weight
const getTypographyClass = (): string => {
  const family = props.fontFamily
  const weight = props.fontWeight
  
  // Handle special cases for mono fonts
  if (family === 'novamono' || family === 'mono') {
    return `font-${family}`
  }
  
  // For head family, generate specific classes
  if (family === 'head') {
    if (weight === 'light') return 'headline-light'
    if (weight === 'bold') return 'headline-bold'
    if (weight === 'light-bold') return 'headline-light-bold'
    if (weight === 'light-thin') return 'headline-light-thin'
    return 'headline' // for regular weight
  }
  
  // For text family, generate appropriate class
  if (family === 'text') {
    return `font-text${weight}`
  }
  
  // Default fallback
  return 'headline'
}

const typographyClass = getTypographyClass()
</script>

<template>
  <component :is="props.as" class="mb-2.5 flex sm:block md:flex items-center leading-none"
    :class="`${typographyClass} ${props.textSize ? `text-${props.textSize}` : 'text-xl'} ${props.underline ? 'headline--underline' : ''}`">
    <slot />
  </component>
</template>

<style>
.headline--underline {
  @apply relative pb-4;

  &:after {
    @apply content-empty absolute left-0 bottom-0;
    height: 3px;
    width: 55px;
    background-color: var(--clr-primary-400);
  }

  &:before {
    @apply content-empty absolute left-0 bottom-px h-px;
    width: 95%;
    max-width: 255px;
    background-color: #64748b
  }
}
</style>