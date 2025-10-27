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
</script>

<template>
  <span
    v-for="(prcode, index) in prcodes"
    :key="prcode?.id || index"
    class="not-last:mr-1"
  >
    <!-- Skip invalid entries -->
    <template v-if="prcode?.code">
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
    </template>
  </span>
</template>
