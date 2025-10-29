<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import type { PropType } from 'vue';
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import '../../styles/tippy-theme.css';

/*
  VAG group (VW/Audi/Skoda/Seat/Porsche/Bentley/Lamborghini/Ducati/Cupra/Scania/MAN) manufacturer Engine Code
  Displays engine code with detailed tooltip showing: name, power, displacement, dates, etc.
*/

interface Engine {
  id?: number;
  code: string;
  name?: string;
  info?: string | null;
  serie?: {
    value: string;
    label: string;
  };
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
  };
  pivot?: any;

  // Backward compatibility - old flat structure
  kw?: number;
  ps?: number;
  cc?: number;
  c_ratio?: string | null;
}

const props = defineProps({
  engine: {
    type: Object as PropType<Engine>,
    required: true,
  },
  showComma: {
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
      horsepowerUnit?: string; // 'PS' for German, 'KM' for Polish, 'HP' for English
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

const engineRef = ref<HTMLElement | null>(null);
let tippyInstance: Instance | null = null;

// Helper to get series value (supports both old and new API)
const getSerieValue = (): string => {
  if (props.engine.serie && typeof props.engine.serie === 'object') {
    return props.engine.serie.value;
  }
  // Backward compatibility - old API
  const serie = props.engine.serie as any;
  if (!serie) return '';
  return serie === 3 ? 'EA288' : serie === 2 ? 'EA189' : `Serie ${serie}`;
};

// Generate tooltip HTML content
const getTooltipContent = () => {
  // Header section
  let headerContent = `<strong>${props.engine.name || props.engine.code}</strong>`;
  if (props.engine.info) {
    headerContent += ` <span class="info">${props.engine.info}</span>`;
  }
  const serieValue = getSerieValue();
  if (serieValue) {
    headerContent += `<div class="series-badge">${serieValue}</div>`;
  }

  const header = `<div class="tooltip-header">${headerContent}</div>`;

  // Specs rows
  const rows = [];

  // Power (supports both new and old API structure)
  const power = props.engine.power;
  const oldKw = props.engine.kw;
  const oldPs = props.engine.ps;

  if (power || oldKw || oldPs) {
    const powerValues = [];
    const kw = power?.kw || oldKw;
    const ps = power?.ps || oldPs;
    const psLabel = power?.ps_label || props.translations.horsepowerUnit;
    const powerLabel = power?.label || props.translations.power;

    if (kw) powerValues.push(`${kw} kW`);
    if (ps) powerValues.push(`${ps} ${psLabel}`);

    if (powerValues.length) {
      rows.push(`<div class="tooltip-row"><span class="tooltip-label">${powerLabel}:</span><span class="tooltip-value">${powerValues.join(' / ')}</span></div>`);
    }
  }

  // Displacement (CC)
  const displacement = props.engine.displacement;
  const oldCc = props.engine.cc;

  if (displacement || oldCc) {
    const ccValue = displacement?.value || oldCc;
    const ccLabel = displacement?.label || props.translations.cc;

    if (ccValue) {
      rows.push(`<div class="tooltip-row"><span class="tooltip-label">${ccLabel}:</span><span class="tooltip-value">${ccValue} cm³</span></div>`);
    }
  }

  // Euro standard
  const euro = props.engine.euro;

  if (euro && typeof euro === 'object') {
    if (euro.value) {
      rows.push(`<div class="tooltip-row"><span class="tooltip-label">${euro.label}:</span><span class="tooltip-value">Euro ${euro.value}</span></div>`);
    }
  } else if (euro) {
    // Backward compatibility - old API
    rows.push(`<div class="tooltip-row"><span class="tooltip-label">${props.translations.euro}:</span><span class="tooltip-value">Euro ${euro}</span></div>`);
  }

  const specsContent = rows.length
    ? `<div class="tooltip-specs">${rows.join('')}</div>`
    : '';

  return header + specsContent;
};

onMounted(() => {
  if (engineRef.value) {
    tippyInstance = tippy(engineRef.value, {
      content: getTooltipContent(),
      allowHTML: true,
      theme: 'sds',
      placement: 'top',
      arrow: true,
      animation: 'shift-away',
      duration: [200, 150],
      maxWidth: 280,
    });
  }
});

onUnmounted(() => {
  if (tippyInstance) {
    tippyInstance.destroy();
  }
});
</script>

<template>
  <span
    ref="engineRef"
    class="engine-code"
    :class="`engine-code-${engine.code}`"
  >
    {{ engine.code }}<span v-if="showComma">,</span>
  </span>
</template>

<style scoped>
/* Engine Code Styles */
.engine-code {
  @apply inline-block mr-1;
  @apply underline decoration-dotted underline-offset-4 py-0.5;
  @apply decoration-neutral-light cursor-default;
  @apply transition-colors duration-200;
}

.engine-code:hover {
  @apply decoration-blue-darker dark:decoration-blue-light;
}

/* Semantic Engine Code Colors */
/* GTI Engines - Red */
.engine-code-CAVE,
.engine-code-CTHE,
.engine-code-DAJA,
.engine-code-DAYB {
  @apply text-red-600 dark:text-red-500;
}

/* WRC R Engine - Blue */
.engine-code-CDLJ {
  @apply text-blue-600 dark:text-blue-500;
}

/* Special Blue Engines */
.engine-code-CPTA,
.engine-code-CZEA {
  @apply text-blue-700 dark:text-blue-600;
}
</style>
