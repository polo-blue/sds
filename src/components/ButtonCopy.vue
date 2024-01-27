<script lang="ts" setup>

import { useClipboard } from "@vueuse/core";

import { Icon } from "@iconify/vue";
import { PropType } from "vue";

const props = defineProps({
    productNumber: {
        type: String,
        default: null,
        required: true,
    },
    copyDisabled: {
        type: Boolean,
        default: false,
        required: false,
    },
    tooltipClasses: {
        type: String,
        required: false,
        default: '',
    },
    texts: {
        type: Object as PropType<{ copy: String, copied: String }>,
        required: true,
        default: {
            copy: 'copy',
            copied: 'copied',
        }
    }
})
const source = props.productNumber;
const { copy, copied, isSupported } = useClipboard({ source });

</script>


<template>
    <button v-if="!props.copyDisabled && isSupported" :aria-label="texts.copy"
        class="btn-copy has-tooltip" @click="copy()">
        <span :class="`tooltip rounded-full btn-copy-text ${tooltipClasses}`" :data-text="!copied ? texts.copy : texts.copied" />
        <Icon icon="ph-copy-simple-light" class="leading-none w-full h-full" />
    </button>
</template>

<style>

.tooltip {
    @apply invisible absolute;
  }
  
  .has-tooltip:hover .tooltip {
      @apply visible z-50;
  }

</style>