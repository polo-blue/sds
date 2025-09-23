<script lang="ts" setup>
/*
     VAG group (VW/Audi/Skoda/Seat/Porsche/Bentley/Lamborghini/Ducati/Cupra/Scania/MAN) manufacturer PR-Code
*/

import type { PropType } from 'vue';

const props = defineProps({
  prcode: {
    type: String,
    default: null,
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
    :class="`btn-prcode--${props.prcode} ${props.isPdp ? ' btn-prcode--pdp' : ''}`"
  >
    {{ props.prcode }}
  </span>
</template>

<style>
.btn-prcode--pdp {
  @apply mb-1;
}

.btn-prcode::before {
  @apply rounded-2 shadow-sm py-0.5 px-2 bg-gray-100 whitespace-nowrap text-xs dark:text-black dark:bg-accent-light text-center z-50;
  display: none;
  position: absolute;
  top: -10px;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
}

.btn-prcode:hover::before {
  display: block;
}

.btn-prcode--2JK {
  color: #f3881d;
}

.btn-prcode--2JK::before {
  content: 'CROSS';
}

.btn-prcode--1LR::before,
.btn-prcode--1ZG::before,
.btn-prcode--1ZJ::before {
  content: '⌀ 256 mm';
}

.btn-prcode--1KD::before,
.btn-prcode--1ZP::before,
.btn-prcode--1ZR::before {
  content: '⌀ 310 mm';
}

.btn-prcode--1ZD::before,
.btn-prcode--1ZC::before,
.btn-prcode--1LN::before {
  content: '⌀ 288 mm; LUCAS';
}

.btn-prcode--2JZ {
  @apply text-accent-light;
}

.btn-prcode--2JZ::before {
  content: 'Bluemotion';
}

.btn-prcode--7L6 {
  @apply text-accent-light;
}

.btn-prcode--7L6::before {
  content: 'Bluemotion (CFWA + start-stop)';
}

.btn-prcode--1KK::before,
.btn-prcode--1KT::before,
.btn-prcode--1KV::before,
.btn-prcode--1LV::before,
.btn-prcode--2EJ::before {
  content: '⌀ 230 mm';
}

.btn-prcode--2JE {
  @apply text-accent-dark;
}

.btn-prcode--2JE::before {
  content: 'BlueGT';
}

.btn-prcode--2JP::before {
  content: 'R-Line';
}

.btn-prcode--E5M,
.btn-prcode--1KD,
.btn-prcode--1ZP,
.btn-prcode--2JQ,
.btn-prcode--TA2 {
  color: blue;
}

.btn-prcode--E5M::before,
.btn-prcode--1KD::before,
.btn-prcode--1ZP::before,
.btn-prcode--2JQ::before,
.btn-prcode--TA2::before {
  content: 'R WRC Street';
}

.btn-prcode--1KV,
.btn-prcode--1ZD,
.btn-prcode--1ZR,
.btn-prcode--0NH,
.btn-prcode--2JD {
  color: red;
}

.btn-prcode--1KV::before,
.btn-prcode--1ZD::before,
.btn-prcode--1ZR::before,
.btn-prcode--0NH::before,
.btn-prcode--2JD::before {
  content: 'GTI';
}
</style>
