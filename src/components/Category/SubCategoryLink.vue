<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: null,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
    required: true,
  },
})
</script>

<template>
  <a
    v-if="!props.active"
    class="w-full block text-base hover:(bg-gray-50 sm:bg-inherit) font-medium text-gray-300 pr-2 py-2 text-left pl-6 sm:(pr-3 text-sm w-auto) md:(py-0.5 pr-4)"
  >
    {{ props.text }}
</a>
  <div
    v-else
    class="w-full text-base hover:(bg-gray-50 sm:bg-inherit) font-medium pr-2 py-2 pl-6 sm:(w-auto pr-3 text-sm) md:(py-0.5 pr-4) s-active"
  >
    {{ props.text }}
  </div>
</template>
