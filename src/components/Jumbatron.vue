<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots()
const hasSlot = (name) => {
  return !!slots[name];
}
const props = defineProps({
  small: {
    type: Boolean,
    default: null,
    required: false,
  },
  intro: {
    type: String,
    default: '',
    required: false,
  }
})
</script>

<template>
  <header class="relative flow content-grid bg-vw  mx-auto my-auto py-8 lg:w-full text-center"  :class="props.small ? 'md:min-h-xs sm:py-12 md:py-14 lg:py-16 xl:py-20' : 'md:min-h-md sm:py-16 md:py-20 lg:py-28 xl:py-32'">
      
        <slot name="intro">
          <h1 class="text-3xl headline-light text-white sm:(text-4xl pt-0) md:text-5xl lg:text-6xl " v-html="props.intro" />
        </slot>
   
      <slot name="subtitle" />
      <div class="mt-5 sm:(mt-8 flex justify-center)" v-if="hasSlot('cta')">
          <slot name="cta" />
      </div>
    </header>
</template>
<style>
.bg-vw {
  background: radial-gradient(circle at 50% 85%,
      #00437A 0%,
      #001E50 100%)
}
</style>