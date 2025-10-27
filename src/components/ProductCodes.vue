<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';
import PrCode from './PrCode.vue';

interface PrCodeObject {
  id?: number;
  code: string;
  group?: string;
  description?: string;
  variant_category?: string;
}

const props = defineProps({
  prcodes: {
    type: Array as PropType<PrCodeObject[]>,
    default: () => [],
    required: true,
  },
  isPdp: {
    type: Boolean,
    default: false,
    required: false,
  },
});

// Sort PR codes by code
const sortedCodes = computed(() => {
  return [...props.prcodes].sort((a, b) => a.code.localeCompare(b.code));
});
</script>

<template>
  <span
    v-for="(prcode, index) in sortedCodes"
    :key="prcode.id || index"
    class="not-last:mr-1"
  >
    <!-- Handle normal PR codes -->
    <PrCode
      v-if="!prcode.code.includes('+')"
      :prcode="prcode"
      :isPdp="isPdp"
    />

    <!-- Handle combined PR codes like "1KD+2JP" -->
    <span v-else>
      <PrCode
        v-for="(code, idx) in prcode.code.split('+')"
        :key="idx"
        :prcode="{
          code: code.trim(),
          group: prcode.group,
          description: null,
          variant_category: prcode.variant_category
        }"
        :isPdp="isPdp"
      />
    </span>
  </span>
</template>
