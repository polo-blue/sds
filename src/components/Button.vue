<script setup lang="ts">
import { useAttrs } from 'vue';

interface ButtonProps {
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
  /** Legacy no-op — all SDS buttons are rounded by default via shortcut */
  rounded?: boolean;
  /** Opt-out — forces sharp corners with `!rounded-none` */
  sharp?: boolean;
  whiteHover?: boolean;
  lightHover?: boolean;
  mediumHover?: boolean;
  darkHover?: boolean;
  circle?: boolean;
  [key: string]: any; // To allow additional props
}

const props = defineProps<ButtonProps>();

// Check if we should add a default mediumHover for tertiary
const shouldAddDefaultMediumHover =
  props.tertiary ||
  (props.tertiaryOutline && !props.whiteHover && !props.lightHover && !props.mediumHover && !props.darkHover);

const tag = props.href && props.href.length ? 'a' : 'button';

// All SDS button shortcuts (btn-primary / -secondary / -tertiary / -text / -tag)
// bake `rounded-full` into the base layout. Pass `:sharp="true"` to override.
// `rounded` is kept as a back-compat no-op — Vue coerces missing boolean props
// to false so we can't reliably detect explicit `false`, hence the separate
// `sharp` prop for the opt-out.

const classes = {
  'btn-primary': props.primary,
  'btn-primary-outline': props.primaryOutline,
  'btn-secondary': props.secondary,
  'btn-secondary-outline': props.secondaryOutline,
  'btn-tertiary': props.tertiary,
  'btn-tertiary-outline': props.tertiaryOutline,
  'btn-text': props.text,
  'btn-tag': props.tag,
  'btn-sm': props.medium,
  'btn-xs': props.small,
  'btn-normal': !props.small && !props.medium,
  '!rounded-none': props.sharp,
  'btn-circle': props.circle,
  'btn-white-hover': props.whiteHover,
  'btn-light-hover': props.lightHover,
  'btn-medium-hover': props.mediumHover || shouldAddDefaultMediumHover,
  'btn-dark-hover': props.darkHover,
};

const attrs = useAttrs();
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    v-bind="attrs"
    :href="props.href"
    :title="props.title ? props.title : null"
  >
    <slot />
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

/* Circle button styles */
.btn-circle.btn-normal {
  @apply w-12;
}

.btn-circle.btn-sm {
  @apply w-9.5;
}

.btn-circle.btn-xs {
  @apply w-7;
}

.btn-circle svg {
  margin: 0;
}
</style>
