<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <label class="group text-left w-full max-w-xs flex flex-col">
    <span
      class="group-hover:text-blue-medium ml-2 text-slate-600 text-sm group-focus-within:text-blue-medium"
      >{{ props.label }}</span
    >
    <input
      class="group-hover:border-blue-lightest border px-4 py-2 transition-colors rounded-md w-full focus:ring focus:outline-none focus:border-blue-medium"
      type="text"
    />
  </label>
</template>
