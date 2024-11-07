<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
    required: true,
  },
})
</script>

<template>
  <h1 class="pdp-headline select-all">
    {{ props.name }}
  </h1>
</template>
