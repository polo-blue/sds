<script lang="ts" setup>
import type { PropType } from 'vue';

/*
    VAG group (VW/Audi/Skoda/Seat/Porsche/Bentley/Lamborghini/Ducati/Cupra/Scania/MAN) manufacturer PR-Code
*/

interface PrCodeObject {
  id?: number;
  code: string;
  group?: string;
  description?: string;
  variant_category?: string;
}

const props = defineProps({
  prcode: {
    type: Object as PropType<PrCodeObject>,
    required: true,
  },
  isPdp: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<template>
  <span
    data-pagefind-filter="PR-Code"
    class="btn-prcode"
    :class="[
      prcode.variant_category ? `btn-prcode--variant-${prcode.variant_category.toLowerCase()}` : '',
      { 'btn-prcode--pdp': isPdp }
    ]"
    :data-tippy-content="prcode.description || undefined"
  >
    {{ prcode.code }}
  </span>
</template>

<style scoped>
/* Base PrCode Styles */
.btn-prcode {
  @apply inline-block cursor-default;
  @apply px-1.5 py-0.5;
  @apply rounded;
}

.btn-prcode--pdp {
  @apply mb-1;
}

/* Semantic Variant Category Colors */
/* GTI - Red */
.btn-prcode--variant-gti {
  @apply text-red-600 dark:text-red-500;
}

/* WRC/R - Blue */
.btn-prcode--variant-wrc {
  @apply text-blue-600 dark:text-blue-500;
}

/* CROSS - Orange */
.btn-prcode--variant-cross {
  color: #f3881d;
}

/* BlueGT - Accent Dark */
.btn-prcode--variant-bluegt {
  @apply text-accent-dark dark:text-accent-dark;
}

/* Bluemotion - Accent Light */
.btn-prcode--variant-bluemotion {
  @apply text-accent-light dark:text-accent-light;
}

/* R-Line - Default styling with possible future customization */
.btn-prcode--variant-r_line {
  @apply text-gray-800 dark:text-gray-300;
}
</style>
