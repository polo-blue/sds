<script lang="ts" setup>
import type { PropType } from 'vue';
import PrCode from './PrCode.vue';

interface PrCodeObject {
  id?: number;
  code: string;
  group?: string;
  description?: string;
  variant_category?: string;
}

defineProps({
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

// Static mapping of PR codes to variant categories
// Based on database migration from PR_CODE_REFACTORING_2025_10_27.md
const variantCategoryMap: Record<string, string> = {
  // GTI
  '2JD': 'GTI',
  '1ZD': 'GTI',
  '1KV': 'GTI',
  '0NH': 'GTI',
  '1ZR': 'GTI',
  // WRC
  E5M: 'WRC',
  '1KD': 'WRC',
  '1ZP': 'WRC',
  '2JQ': 'WRC',
  TA2: 'WRC',
  // CROSS
  '2JK': 'CROSS',
  // BLUEGT
  '2JE': 'BLUEGT',
  // BLUEMOTION
  '2JZ': 'BLUEMOTION',
  '7L6': 'BLUEMOTION',
  // R_LINE
  '2JP': 'R_LINE',
};

// Get variant category for a code (check map, fallback to passed value)
const getVariantCategory = (code: string, fallback?: string): string | undefined => {
  return variantCategoryMap[code] || fallback;
};
</script>

<template>
  <span v-for="(prcode, index) in prcodes" :key="prcode?.id || index" class="not-last:mr-1">
    <template v-if="prcode?.code">
      <PrCode v-if="!prcode.code.includes('+')" :prcode="prcode" :isPdp="isPdp" />
      <span v-else class="inline-flex items-center gap-1">
        <template v-for="(code, idx) in prcode.code.split('+')" :key="idx">
          <span v-if="idx > 0" class="text-sm opacity-75">+</span>
          <PrCode
            :prcode="{
              code: code.trim(),
              group: prcode.group,
              description: null,
              variant_category: getVariantCategory(code.trim(), prcode.variant_category),
            }"
            :isPdp="isPdp"
          />
        </template>
      </span>
    </template>
  </span>
</template>
