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
})
</script>

<template>
  <div class="relative flex bg-vw " :class="props.small ? 'md:min-h-xs' : 'md:min-h-md'">
    <div class="max-w-7xl mx-auto my-auto">
      <div class="py-8 lg:w-full"
        :class="props.small ? 'sm:py-12 md:py-14 lg:py-16 xl:py-20' : 'sm:py-16 md:py-20 lg:py-28 xl:py-32'">
        <header class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <!-- sm:pt-12  md:pt-16 lg:pt-20 xl:pt-28 -->
          <div class="text-center">
            <h1 class="text-3xl  tracking-tight sm:(text-4xl pt-0) md:text-5xl lg:text-6xl  font-headlight text-white">
              <slot name="intro" />
            </h1>
            <slot name="subtitle" />
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center" v-if="hasSlot('cta')">
              <div>
                <slot name="cta" />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.bg-vw {
  background: radial-gradient(circle at 50% 85%,
      #00437A 0%,
      #001E50 100%)
}
</style>