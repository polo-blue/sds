<script setup lang="ts">
defineProps<{
 text: string
 active: boolean
}>()
</script>

<template>
 <component 
   :is="active ? 'div' : 'a'"
   :class="[
     'w-full block text-base font-medium py-2 pl-6 pr-2 hover:(bg-gray-50 sm:bg-inherit)',
     'sm:(w-auto text-sm pr-3) md:(py-0.5 pr-4)',
     active ? 's-active' : 'text-gray-300'
   ]"
 >
   {{ text }}
 </component>
</template>
