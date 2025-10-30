<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  as: {
    type: String as PropType<'th' | 'td' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span'>,
    default: 'div',
    required: true,
  },
  text: {
    type: String,
    default: '',
    required: true,
  },
  styles: {
    type: String,
    default: '',
    required: false,
  },
});
</script>

<template>
  <component :is="props.as" class="font-bold detail-name w-full sm:w-50 flex 2xl:w-64">
    <span :class="styles && styles.length ? styles : 'mt-auto'">
      <b class="bg-white z-1 colon-after pr-1">{{ props.text }}</b>
    </span>
  </component>
</template>

<style>
.detail-name {
  @apply overflow-hidden relative;

  span {
    @apply block bg-white relative z-10 pr-1.5 w-full;

    &:before {
      /* // order: 2; */
      @apply text-gray-300 absolute select-none border-b border-gray-200 w-full -z-1 absolute content-empty left-0;
      height: 1em;
      white-space: nowrap;
      font-weight: 100;
      bottom: 2px;
      flex: 1;
    }
  }
}
</style>
