<script setup lang="ts">
import ProductDetailName from "./ProductDetailName.vue";
const props = defineProps<{
  value: {name: string, value: string}[];
}>();

</script>

<template>
  <table class="details table-auto text-left bg-white">
    <tbody>
      <tr class="border" v-for="row, index in props.value" :key="index">
        <ProductDetailName as="th" :text="row.name" />
        <td>{{ row.value }}</td>
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
  }
</style>
