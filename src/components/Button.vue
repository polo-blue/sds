<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  href?: string;
  title?: string;
  primary?: boolean;
  tertiary?: boolean;
  secondary?: boolean;
  text?: boolean;
  tag?: boolean;
  small?: boolean;
  medium?: boolean;
}>();

const tag = props.href && props.href.length ? 'a' : 'button'

const classes = {
  "btn-primary": props.primary,
  "btn-secondary": props.secondary,
  "btn-tertiary": props.tertiary,
  "btn-text": props.text,
  "btn-tag": props.tag,
  "btn-sm": props.medium,
  "btn-xs": props.small,
  "btn-normal": !props.small && !props.medium
};


</script>


<template>
  <component  :is="tag" :class="classes" :href="props.href" :title="props.title ? props.title : null">
    <slot></slot>
  </component>
</template>