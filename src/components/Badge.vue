<script setup lang="ts">
const props = defineProps({
  badge: {
    type: String,
    required: true,
    default: '',
  },
  class: {
    type: String,
    required: true,
    default: 'bg-gray',
  },
})
</script>

<template>
  <div class="px-1.5 py-px text-white text-xs" :class="props.class">
    {{ props.badge }}
  </div>
</template>