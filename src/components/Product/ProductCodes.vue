<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  prcodes: {
    type: Object as PropType<string[] | null>,
    default: null,
    required: true,
  },
  isPdp: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const codes = props.prcodes || []
const decodedCodes = codes ? codes.sort() : []

const settings = {
  prcodes: decodedCodes,
}
</script>

<template>
 
 <span
    v-for="(prcode, index) in settings.prcodes"
    :key="index"
    class="not-last:mr-1"
  >
    <span data-pagefind-filter="PR-Code"
      v-if="!String(prcode).includes('+')"
      class="btn-prcode "
      :class="`btn-prcode--${prcode}`"
    >
      {{ prcode }}
    </span>
    <span v-else >
      <span v-for="(splittedCode, index2) in String(prcode).split('+')" :key="index2" class="btn-prcode" :class="`btn-prcode--${splittedCode} ${isPdp ? ' btn-prcode--pdp' : ''}` " data-pagefind-filter="PR-Code">
        {{ splittedCode }}
      </span>
    </span>
  </span>

</template>

<style  scoped>
.btn-prcode {
  @apply relative inline-block leading-none px-1 py-0.5 mr-1 cursor-pointer font-mono border-solid border-1 border-gray-200 select-none text-gray-500 last:mr-0 dark:border-white dark:border-opacity-10 dark:text-gray-300 dark:bg-white dark:bg-opacity-30 not-last:mr-2 not-last:after:content-[+] dark:after:text-white/50 after:pl-0.5 after:text-blue-darker after:absolute after:w-4 text-center;
}

.btn-prcode--pdp {
  @apply mb-1;
}

.btn-prcode::before {
  @apply rounded-2 shadow-sm py-0.5 px-2 bg-gray-100 whitespace-nowrap text-xs dark:text-black dark:bg-accent-light;
  display: none;
  position: absolute;
  text-align: center;
  top: -10px;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
  z-index: 50;
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

.btn-prcode--1LR,
.btn-prcode--1ZG,
.btn-prcode--1ZJ {
  &::before {
    content: '⌀ 256 mm';
  }
}

.btn-prcode--1KD,
.btn-prcode--1ZP,
.btn-prcode--1ZR {
  &::before {
    content: '⌀ 310 mm';
  }
}

.btn-prcode--1ZD,
.btn-prcode--1ZC,
.btn-prcode--1LN {
  &::before {
    content: '⌀ 288 mm; LUCAS';
  }
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

.btn-prcode--1KK,
.btn-prcode--1KT,
.btn-prcode--1KV,
.btn-prcode--1LV,
.btn-prcode--2EJ {
  &::before {
    content: '⌀ 230 mm';
  }
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
