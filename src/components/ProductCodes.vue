<script lang="ts" setup>
import type { PropType } from 'vue';
import PrCode from './PrCode.vue';

const props = defineProps({
  prcodes: {
    type: Array as PropType<string[] | null>,
    default: null,
    required: true,
  },
  isPdp: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const codes = props.prcodes || [];
const decodedCodes = codes ? codes.sort() : [];

const settings = {
  prcodes: decodedCodes,
};
</script>

<template>
  <span
    v-for="(prcode, index) in settings.prcodes"
    :key="index"
    class="not-last:mr-1"
  >
    <PrCode
      v-if="!String(prcode).includes('+')"
      :prcode="prcode"
    />
    <span v-else>
      <PrCode
        v-for="(splittedCode, index2) in String(prcode).split('+')"
        :key="index2"
        :prcode="splittedCode"
      />
    </span>
  </span>
</template>
