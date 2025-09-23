<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
    required: true,
  },
  styles: {
    type: String,
    default: '',
    required: false,
  },
});
</script>

<template>
  <div class="font-bold detail-name w-full sm:w-50 flex">
    <span
      class="colon-after"
      :class="styles && styles.length ? styles : 'mt-auto'"
    >
      {{ props.text }}
    </span>
  </div>
</template>
