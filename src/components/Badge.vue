<script setup lang="ts">
const props = defineProps({
  badge: {
    type: String,
    required: false,
    default: '',
  },
  class: {
    type: String,
    required: false,
    default: 'bg-gray',
  },
});
</script>

<template>
  <div
    class="badge"
    :class="props.class"
  >
    {{ props.badge }}
  </div>
</template>
