<script setup lang="ts">

const props = defineProps<{
  href?: string;
  title?: string;
  primary?: boolean;
  primaryOutline?: boolean;
  secondary?: boolean;
  secondaryOutline?: boolean;
  tertiary?: boolean;
  tertiaryOutline?: boolean;
  text?: boolean;
  tag?: boolean;
  small?: boolean;
  medium?: boolean;
  rounded?: boolean;
}>();

const tag = props.href && props.href.length ? 'a' : 'button'
const classes = {
  "btn-primary": props.primary,
  "btn-primary-outline": props.primaryOutline,
  "btn-secondary": props.secondary,
  "btn-secondary-outline": props.secondaryOutline,
  "btn-tertiary": props.tertiary,
  "btn-tertiary-outline": props.tertiaryOutline,
  "btn-text": props.text,
  "btn-tag": props.tag,
  "btn-sm": props.medium,
  "btn-xs": props.small,
  "btn-normal": !props.small && !props.medium,
  "rounded-full": props.rounded
};
</script>

<template>
  <component :is="tag" :class="classes" :href="props.href" :title="props.title ? props.title : null">
    <slot></slot>
  </component>
</template>

<style>
.btn-primary,
.btn-secondary {
  svg {
    color: #fff;
  }
}

.btn-tertiary {
  svg {
    color: var(--primary);
  }
}

</style>