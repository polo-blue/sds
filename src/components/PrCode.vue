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
  <span class="relative has-tooltip inline-block">
    <span
      data-pagefind-filter="PR-Code"
      class="btn-prcode"
      :class="[
        prcode.variant_category ? `btn-prcode--variant-${prcode.variant_category.toLowerCase()}` : '',
        { 'btn-prcode--pdp': isPdp }
      ]"
    >
      {{ prcode.code }}
    </span>

    <!-- Dynamic Tooltip with description from API -->
    <div v-if="props.prcode.description" class="tooltip">
      <div class="tooltip-content">
        {{ props.prcode.description }}
        <span v-if="props.prcode.group" class="tooltip-group">
          ({{ props.prcode.group }})
        </span>
      </div>
    </div>
  </span>
</template>

<style scoped>
/* Base PrCode Button Styles */
.btn-prcode {
  @apply inline-block relative cursor-default;
}

.btn-prcode--pdp {
  @apply mb-1;
}

/* Tooltip Styles - Similar to ProductEngine */
.tooltip {
  @apply invisible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50;
  @apply px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap;
  @apply bg-blue-darker text-white text-xs;
  @apply pointer-events-none;
  max-width: 300px;
  white-space: normal;
}

.has-tooltip:hover .tooltip {
  @apply visible;
}

.tooltip-content {
  @apply relative;
}

.tooltip-group {
  @apply ml-2 opacity-75 text-xs font-light;
}

/* Tooltip Arrow */
.tooltip::after {
  content: '';
  @apply absolute left-1/2 -translate-x-1/2 top-full;
  @apply border-4 border-transparent border-t-blue-darker;
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
