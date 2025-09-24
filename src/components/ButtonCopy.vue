<script lang="ts" setup>
import { useClipboard } from '@vueuse/core';

const props = defineProps({
  productNumber: {
    type: String,
    default: null,
    required: true,
  },
  tooltipClasses: {
    type: String,
    required: false,
    default: '',
  },
  texts: {
    type: Object as PropType<{ copy: string; copied: string }>,
    required: true,
    default: {
      copy: 'copy',
      copied: 'copied',
    },
  },
});
const source = props.productNumber;
const { copy, copied, isSupported } = useClipboard({ source, legacy: true });
</script>

<template>
  <button :aria-label="texts.copy" class="btn-copy has-tooltip" @click="copy()">
    <span
      :class="`tooltip rounded-full btn-copy-text ${tooltipClasses}`"
      :data-text="!copied ? texts.copy : texts.copied"
    />
    <span i-ph-copy-simple-light class="leading-none w-full h-full" />
  </button>
</template>
