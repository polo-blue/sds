<script setup lang="ts">
import ProductDetailName from "./ProductDetailName.vue";
const props = defineProps<{
  data: string;
}>();

const theads = Object.keys(Object.values(props.data)[0])



</script>

<template>
  <table class="details table-auto text-left bg-white w-full max-w-[800px]">
    <tbody>
      <tr class="border" v-for="row in props.data" :key="row">
        <ProductDetailName as="th" :text="row.name" />
        <td>{{ row.data }}</td>
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
  }
</style>
