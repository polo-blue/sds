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

<style lang="scss" scoped>
.btn-prcode {
  @apply relative inline-block leading-none px-1 py-0.5 mr-1 cursor-pointer font-mono border-solid border-1 border-gray-200 select-none text-gray-500 last:mr-0 dark:border-white dark:border-opacity-10 dark:text-gray-300 dark:bg-white dark:bg-opacity-30 not-last:mr-2 not-last:after:content-[+] dark:after:text-white/50 after:pl-0.5 after:text-blue-700 after:absolute after:w-4 text-center;

  &--pdp {
    @apply mb-1
  }

  &:before {
    @apply rounded-2 shadow-sm py-0.5 px-2 bg-gray-100 whitespace-nowrap text-xs dark:text-black  dark:bg-lightBlue-500;

    display: none;
    position: absolute;
    text-align: center;
    // bottom: 100%;
    top: -10px;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    z-index: 50;
  }

  &:hover:before {
    display:block;
  }

  &--2JK {
    color: #f3881d;
    &:before {
      content: 'CROSS';
    }
  }

  &--1LR,
  &--1ZG,
  &--1ZJ {
     &:before {
      content: '⌀ 256 mm';
    }
  }

  &--1KD,
  &--1ZP,
  &--1ZR {
    &:before {
      content: '⌀ 310 mm';
    }
  }

  &--1ZD,
  &--1ZC,
  &--1LN {
    &:before {
      content: '⌀ 288 mm; LUCAS';
    }
  }

  &--2JZ {
    @apply: text-lightBlue-500;
    &:before {
      content: 'Bluemotion';
    }
  }

  &--7L6 {
    @apply: text-lightBlue-500;
    &:before {
      content: 'Bluemotion (CFWA + start-stop)';
    }
  }

  &--1KK,
  &--1KT,
  &--1KV,
  &--1LV,
  &--2EJ {
    &:before {
      content: '⌀ 230 mm';
    }
  }

  &--2JE {
    @apply text-lightBlue-700;

    &:before {
      content: 'BlueGT';
    }
  }

  &--2JP {
     &:before {
      content: 'R-Line';
    }
  }

  // WRC Street R
  &--E5M, // emblems/stickers
  &--1KD, //brakes
  &--1ZP, //brakes
  &--2JQ,//bumpers
  &--TA2 { //engine parts
    color: blue;
    &:before {
      content: 'R WRC Street';
    }
  }

  // GTI
  &--1KV,
  &--1ZD,
  &--1ZR,
  &--0NH,
  &--2JD {
    color: red;
     &:before {
      content: 'GTI';
    }
  }

}
</style>
