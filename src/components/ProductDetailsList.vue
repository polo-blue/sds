<script setup lang="ts">
import { PropType } from "vue";
import ProductDetailName from "./ProductDetailName.vue";

interface TableItem {
  id: string,
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
      <tr v-for="row, index in props.items" :key="index">
        <ProductDetailName as="th" :text="row.name" />
        <slot :name="row.id">
          <td>{{ row.value }}</td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  .details {
    @apply border-none shadow-none w-full md:w-auto
    box-shadow: none;

    col {
      @apply w-1/2 md:w-auto;

    }

    tr {
      @apply border-none;
    }

    tr,
    th {
      @apply leading-none text-3.5 py-2 border-none xl:(py-4) 3xl:(text-4);
    }

    th {
      @apply px-0;
    }

    td {
      @apply relative;
    }
  }
</style>
