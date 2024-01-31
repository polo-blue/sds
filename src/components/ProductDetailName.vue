<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
    required: true,
  },
  styles: {
    type: String,
    default: '',
    required: false,
  }
})
</script>

<template>
  <div class="font-bold detail-name w-full sm:w-50 flex">
    <span class="colon-after" :class="styles && styles.length ? styles : 'mt-auto'">
      {{ props.text }}
    </span>
  </div>
</template>


<style lang="scss">
.detail-name {
  @apply overflow-hidden relative;

    span {
      @apply bg-white dark:bg-blue-901 relative z-10 pr-1.5;
    }

    &:after {
      // order: 2;
      @apply text-gray-300 absolute select-none border-b border-gray-200 dark:border-gray-600 w-full;
      height: 1em;
      white-space: nowrap;
      font-weight: 100;
      bottom: 3px;
      left: 0;
      flex: 1;
      content: '';
      position:absolute;
    
  }
}

</style>