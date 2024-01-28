<script lang="ts" setup>
/*
     VAG group (VW/Audi/Skoda/Seat/Porsche/Bentley/Lamborghini/Ducati/Cupra/Scania/MAN) manufacturer PR-Code
*/

import type { PropType } from 'vue'

const props = defineProps({
    prcode: {
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
</script>

<template>
    <span data-pagefind-filter="PR-Code" class="btn-prcode "
        :class="`btn-prcode--${props.prcode} ${props.isPdp ? ' btn-prcode--pdp' : ''}`">
        {{ props.prcode }}
    </span>
</template>

<style lang="scss" scoped>
.btn-prcode {

    &--pdp {
        @apply mb-1
    }

    &:before {
        @apply rounded-2 shadow-sm py-0.5 px-2 bg-gray-100 whitespace-nowrap text-xs dark:text-black dark:bg-lightBlue-500 text-center z-50;

        display: none;
        position: absolute;
        top: -10px;
        transform: translateY(-50%) translateX(-50%);
        left: 50%;
    }

    &:hover:before {
        display: block;
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
    &--E5M,

    // emblems/stickers
    &--1KD,

    //brakes
    &--1ZP,

    //brakes
    &--2JQ,

    //bumpers / engine parts
    &--TA2 {
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