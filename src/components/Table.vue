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
        <th
          v-for="(thead, index) in theads"
          :key="index"
          class="px-4 py-2 font-semibold"
        >
          {{ capitalizeFirstLetter(thead) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in props.data"
        :key="index"
        class="border"
      >
        <td
          v-for="key in Object.keys(row)"
          :key="key"
          class="px-4 py-2"
        >
          {{ row[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
