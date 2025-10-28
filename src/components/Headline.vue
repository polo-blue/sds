<script setup lang="ts">
import { computed, useAttrs } from 'vue';

const attrs = useAttrs();

interface HeadlineProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
  class?: string;
  fontFamily?: 'head' | 'text' | 'novamono' | 'mono';
  fontWeight?: 'light' | 'regular' | 'bold' | 'light-bold' | 'light-thin';
  underline?: boolean | 'center';
  defaultSize?: string;
  noFlexLayout?: boolean;
  noMargin?: boolean;
  noLeading?: boolean;
}

const props = withDefaults(defineProps<HeadlineProps>(), {
  as: 'span',
  class: '',
  fontFamily: 'head',
  fontWeight: 'regular',
  underline: false,
  defaultSize: 'text-inherit',
  noFlexLayout: false,
  noMargin: false,
  noLeading: false,
});

const typographyClass = computed(() => {
  const { fontFamily, fontWeight } = props;

  if (fontFamily === 'novamono' || fontFamily === 'mono') {
    return `font-${fontFamily}`;
  }

  if (fontFamily === 'head') {
    const weightMap = {
      light: 'headline-light',
      bold: 'headline-bold',
      'light-bold': 'headline-light-bold',
      'light-thin': 'headline-light-thin',
      regular: 'headline',
    };
    return weightMap[fontWeight] || 'headline';
  }

  if (fontFamily === 'text') {
    return `font-text${fontWeight}`;
  }

  return 'headline';
});

const underlineClass = computed(() => {
  if (props.underline === true) return 'headline--underline';
  if (props.underline === 'center') return 'headline--underline-center';
  return '';
});

const layoutClass = computed(() => {
  // Centered underline needs block + text-center
  if (props.underline === 'center') return 'block text-center';

  // Default flex layout for icon alignment (unless disabled)
  if (!props.noFlexLayout) {
    return 'flex sm:block md:flex items-center';
  }

  return '';
});

const computedClasses = computed(() => {
  const baseClasses = [];

  // Conditionally add base classes
  if (!props.noMargin) baseClasses.push('mb-2.5');
  if (!props.noLeading) baseClasses.push('leading-none');

  const sizeClasses = props.class || props.defaultSize;

  return `${baseClasses.join(' ')} ${typographyClass.value} ${sizeClasses} ${underlineClass.value} ${layoutClass.value}`.trim();
});
</script>

<template>
  <component :is="as" :class="computedClasses" v-bind="attrs">
    <slot />
  </component>
</template>

<style>
.headline--underline {
  @apply relative pb-4;

  &:after {
    @apply content-empty absolute left-0 bottom-0;
    height: 3px;
    width: 55px;
    background-color: var(--headline-underline-accent, var(--clr-primary-400));
  }

  &:before {
    @apply content-empty absolute left-0 bottom-px h-px;
    width: 95%;
    max-width: 255px;
    background-color: var(--headline-underline-base, #64748b);
  }
}

.headline--underline-center {
  @apply relative pb-4;

  &:before {
    @apply content-empty absolute left-1/2 bottom-px h-px;
    width: 95%;
    max-width: 255px;
    background-color: var(--headline-underline-base, #64748b);
    transform: translateX(-50%);
  }

  &:after {
    @apply content-empty absolute bottom-0;
    height: 3px;
    width: 55px;
    background-color: var(--headline-underline-accent, var(--clr-primary-400));
    left: calc(50% - min(47.5%, 127.5px));
  }
}
</style>
