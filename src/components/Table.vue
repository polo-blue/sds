<script setup lang="ts">
const props = defineProps<{
  data: string;
}>();

const theads = Object.keys(Object.values(props.data)[0]);

const capitalizeFirstLetter = (text: string) => {
  return text[0].toUpperCase() + text.slice(1);
};
</script>

<template>
  <table class="table-auto text-left border bg-white shadow-md">
    <thead class="bg-gray-500 text-white">
      <tr class="border">
        <th class="px-4 py-2 font-semibold" v-for="(thead, index) in theads" :key="index">
          {{ capitalizeFirstLetter(thead) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="border" v-for="row in props.data" :key="row">
        <td class="px-4 py-2" v-for="key in Object.keys(row)" :key="key">
          {{ row[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
