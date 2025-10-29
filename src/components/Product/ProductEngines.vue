<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';
import ProductEngine from './ProductEngine.vue';

/*
  ProductEngines wrapper component
  Displays a list of engine codes with tooltips
*/

interface Engine {
  id?: number;
  code: string;
  name?: string;
  info?: string | null;
  serie?: {
    value: string;
    label: string;
  } | number;
  type?: {
    value: string;
    translated: string;
    label: string;
  };
  power?: {
    kw: number;
    ps: number;
    ps_label: string;
    label: string;
  };
  date?: {
    value: string;
    label: string;
  };
  displacement?: {
    value: number;
    label: string;
  };
  compression_ratio?: {
    value: string | null;
    label: string;
  };
  valves?: {
    value: number | null;
    label: string;
  };
  euro?: {
    value: number;
    label: string;
  } | number;
  pivot?: any;

  // Backward compatibility
  kw?: number;
  ps?: number;
  cc?: number;
}

const props = defineProps({
  engines: {
    type: Array as PropType<Engine[]>,
    default: () => [],
    required: true,
  },
  isPdp: {
    type: Boolean,
    default: false,
    required: false,
  },
  translations: {
    type: Object as PropType<{
      power?: string;
      cc?: string;
      compressionRatio?: string;
      valves?: string;
      euro?: string;
      horsepowerUnit?: string;
    }>,
    default: () => ({
      power: 'Power',
      cc: 'CC',
      compressionRatio: 'C. Ratio',
      valves: 'Valves',
      euro: 'Euro',
      horsepowerUnit: 'PS',
    }),
    required: false,
  },
});

// Sort engines by code
const sortedEngines = computed(() => {
  if (!props.engines || !props.engines.length) return [];
  return [...props.engines].sort((a, b) => {
    return (a.code || '').localeCompare(b.code || '');
  });
});
</script>

<template>
  <div v-if="sortedEngines.length" class="engines-list inline-flex flex-wrap items-center gap-x-0.5">
    <ProductEngine
      v-for="(engine, index) in sortedEngines"
      :key="engine.id || index"
      :engine="engine"
      :show-comma="index !== sortedEngines.length - 1"
      :translations="translations"
    />
  </div>
</template>

<style scoped>
.engines-list {
  @apply leading-none;
}
</style>
