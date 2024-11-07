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
    class="category-link"
    :class="!props.active ? '' : 'active'"
  >
    {{ props.text }}
  </a>
</template>
