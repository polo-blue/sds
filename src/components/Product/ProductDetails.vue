<script lang="ts" setup>
import type { PropType } from 'vue'
import type { DetailList, DetailObject } from '../../types/index'
import ProductDetailName from './ProductDetailName.vue'
import {getTranslation} from "../../utils/text"
// import ProductColors from "@components/Product/ProductColors.vue"

const props = defineProps({
  details: {
    type: Array as PropType<DetailList[]> | null,
    default: null,
    required: false,
  },
  small: {
    type: Boolean,
    required: false,
  },
  colors: {
    type: Array as PropType<string[] | null>,
    default: null,
    required: false,
  },
  locale: {
    type: String,
    default: 'en',
    required: false,
  },
})

</script>

<template>
  <template v-for="(detail, index) in details" :key="index" class="" v-if="details && details.length">
    <!-- PDP PAGE - PRODUCT ROW -->
    <!-- <pre>{{  JSON.stringify(details) }}</pre> -->
    <li v-if="props.small" class="text-xs md:text-sm text-slate-darkest dark:text-neutral-light leading-tight font-textlight md:font-textregular">

      <span v-if="detail.id" class="inline-block mr-1 items--0">
        {{ getTranslation(`detail.${detail.id}`) }}:
      </span>

      <span v-if="detail.translated" :class="detail.id ? 'font-semibold' : ''" class="items--1">
        {{ detail.value }}
      </span>

      <div v-else-if="detail.value !== undefined && detail.id === 'color' && detail.isArrayValue" class="items--2 inline-block">
          <span class="comma" v-for="(color, indexColor) in detail.value" :key="indexColor">
            {{ color['name'] }}
          </span>
      </div>

      <span v-else-if="detail.id !== 'paint-marks' && !detail.isArrayValue" class="items--3">
        {{ locale === 'en' ? String(detail.value).replace(/,/g, '.') : String(detail.value) }}
      </span>
      
      <span v-else-if="detail.id && detail.id === 'paint-marks'" class="items items--4">
        {{  detail.value }}
        <!-- <span v-for="(mark, index2) in JSON.parse(String(detail.value))" :key="index2" class="item">
          {{ mark[0] }} x <span>{{ getTranslation(`color.${mark[1]}`) }}</span>
        </span> -->
      </span>

    </li>

    <div v-else class="text-sm mt-1 md:mt-4 mb-4 grid grid-cols-2
    sm:(grid-cols-details-desktop grid-flow-col auto-cols-max) gap-4">
      <!-- PRODUCT CARD -->
      <ProductDetailName v-if="detail.id" :text="getTranslation(`detail.${detail.id}`)" />
      <div v-if="detail.value"
        class="leading-4 flex items-end">

        <span v-if="detail.translated && !detail.isArrayValue" :class="detail.id === 'light-function' ? 'whitespace-pre-line' : ''">
          {{ getTranslation(`detail.value.${detail.value}`) }}
        </span>

        <span v-else-if="detail.id !== 'paint-marks' && !detail.isArrayValue" class="">
          {{ detail.value }}
        </span>

        <span v-else-if="detail.value !== undefined && detail.id === 'for-exterior-colour' && detail.isArrayValue" class="">
          <div v-for="(color, indexColor) in JSON.parse(String(detail.value))" :key="indexColor">
            <span class="font-mono">{{ color }}</span> - {{ getTranslation(`colorCodes.${color}`)  }}
          </div>
        </span>
        
        <span v-else-if="detail.id && detail.id === 'paint-marks'" class="items">
          <span v-for="(mark, index) in JSON.parse(String(detail.value))" :key="index" class="item">
            {{ mark[0] }} x <span>{{ getTranslation(`color.${mark[1]}`) }}</span>
          </span>
        </span>
        <ul v-else-if="detail.id && detail.isArrayValue" class="items">
          <li v-for="(d, index3) in JSON.parse(String(detail.value))" :key="index3" class="item">
            · {{ d }}
          </li>
        </ul>
      </div>
    </div>
  </template>
</template>
