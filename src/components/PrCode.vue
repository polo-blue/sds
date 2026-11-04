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

defineProps({
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
      { 'btn-prcode--pdp': isPdp },
    ]"
    :data-sds-tooltip="prcode.description || undefined"
    data-sds-tooltip-offset="12"
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
  @apply text-red-700 dark:text-red-400;
}

/* WRC/R - Blue */
.btn-prcode--variant-wrc {
  @apply text-blue-700 dark:text-blue-400;
}

/* CROSS - Orange */
.btn-prcode--variant-cross {
  /* Darkened from #f3881d (2.5:1) to meet WCAG 1.4.3 on white */
  color: #b45309;
}

:global(.dark) .btn-prcode--variant-cross {
  color: #fb923c;
}

/* BlueGT - Accent Dark */
.btn-prcode--variant-bluegt {
  @apply text-accent-dark dark:text-sky-400;
}

/* Bluemotion - Accent Light */
.btn-prcode--variant-bluemotion {
  @apply text-sky-700 dark:text-sky-300;
}

/* R-Line - Default styling with possible future customization */
.btn-prcode--variant-r_line {
  @apply text-gray-800 dark:text-gray-300;
}
</style>
