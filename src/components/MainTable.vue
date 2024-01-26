<template>
  <table class="table-auto text-left border bg-white shadow-md">
    <thead class="bg-slate-800 text-white">
      <tr class="border">
        <th class="px-4 py-2">id</th>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border" v-for="row in tableData" :key="row">
        <td class="px-4 py-2" v-for="key in Object.keys(row)" :key="key">
          {{ row[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const tableData = [
  {
    id: 1,
    name: "Lorem Ipsum",
    email: "lorem@email.com",
  },
  {
    id: 2,
    name: "Chuck Norris",
    email: "ipsum@email.com",
  },
  {
    id: 3,
    name: "Ipsum Lorem",
    email: "lorem@email.com",
  }
];
</script>

<style scoped></style>
