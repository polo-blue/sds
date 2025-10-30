<script setup lang="ts">
const props = defineProps({
  shadow: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<template>
  <button class="product-button" :class="props.shadow ? 'drop-shadow hover:(drop-shadow-md)' : ''">
    <slot />
  </button>
</template>
