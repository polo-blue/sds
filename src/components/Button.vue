<script setup lang="ts">
import { useAttrs } from 'vue';

interface ButtonProps {
  /** Renders as `<a>` when provided */
  href?: string;
  /** Native title attribute */
  title?: string;
  /** Primary solid button style */
  primary?: boolean;
  /** Primary outline variant */
  primaryOutline?: boolean;
  /** Secondary solid button style */
  secondary?: boolean;
  /** Secondary outline variant */
  secondaryOutline?: boolean;
  /** Tertiary / ghost button style */
  tertiary?: boolean;
  /** Tertiary outline variant */
  tertiaryOutline?: boolean;
  /** Underline-on-hover text button */
  text?: boolean;
  /** Pill-shaped tag button */
  tag?: boolean;
  /** Extra-small size (`btn-xs`) */
  small?: boolean;
  /** Medium size (`btn-sm`) */
  medium?: boolean;
  /** Legacy no-op — all SDS buttons are rounded by default via shortcut. Use `sharp` to opt out. */
  rounded?: boolean;
  /** Opt-out — forces sharp corners with `!rounded-none` */
  sharp?: boolean;
  /** White hover state (`btn-white-hover`) */
  whiteHover?: boolean;
  /** Light hover state (`btn-light-hover`) */
  lightHover?: boolean;
  /** Medium hover state (`btn-medium-hover`); applied by default to `tertiary` and to `tertiaryOutline` without another hover prop */
  mediumHover?: boolean;
  /** Dark hover state (`btn-dark-hover`) */
  darkHover?: boolean;
  /** Equal width/height circle — for icon-only buttons. Always pass an `aria-label` too */
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
// Icon-only buttons (e.g. `circle`) need an accessible name: pass `aria-label`, it is forwarded via attrs.
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    v-bind="attrs"
    :href="props.href"
    :title="props.title ? props.title : null"
    :type="tag === 'button' ? (attrs.type ?? 'button') : undefined"
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
