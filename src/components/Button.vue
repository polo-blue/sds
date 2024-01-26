<script setup lang="ts">
import { url } from "inspector";
import { defineProps } from "vue";

const props = defineProps<{
  url?: string;
  primary?: boolean;
  secondary?: boolean;
  text?: boolean;
  tag?: boolean;
}>();

const tag = url && url.length ? 'a' : 'button'

const classes = {
  "bg-lightBlue-500 border border-transparent font-medium hover:bg-lightBlue-600 inline-flex items-center justify-center md:px-10 md:py-2 md:text-lg px-8 py-3 rounded-full shadow text-base text-white": props.primary,
  "px-4 py-2 rounded-md transition-all shadow-sm hover:bg-opacity-80 font-medium text-blue-600 border-blue-500 border": props.secondary,
  "px-4 py-2 rounded-md transition-all shadow-sm hover:bg-opacity-80 font-medium text-blue-500 hover:bg-opacity-80 shadow-md": props.text,
  "bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 hover:border-blue-600": props.tag
};
</script>


<template>
  <component  :is="tag" :class="classes" :href="props.url">
    <slot></slot>
  </component>
</template>