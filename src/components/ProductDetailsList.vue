<script setup lang="ts">
import { PropType } from "vue";
import ProductDetailName from "./ProductDetailName.vue";

interface TableItem {
  slug: string,
  name: string 
  value: unknown
}

const props = defineProps({
  items: {type: Array as PropType<TableItem[]>, default: () => []},
  caption: { type: String, default: null }
})

</script>

<template>
  <table class="details table-auto text-left bg-white">
    <caption v-if="!!$slots.caption || caption">
      <slot name="caption">{{ caption }}</slot>
    </caption>
    <colgroup>
      <col>
      <col>
    </colgroup>
    <tbody>
      <tr class="border" v-for="row, index in props.items" :key="index">
        <ProductDetailName as="th" :text="row.name" />
        <td>
          <slot
            :name="row.slug"
          >
           {{ row.value }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
  .details {
    border: none;
    box-shadow: none;

    td,
    tr,
    th {
      border: none;
      @apply leading-4 text-sm;
    }

    th {
      @apply pr-0
    }

    td {
      @apply relative;
    }
  }
</style>
