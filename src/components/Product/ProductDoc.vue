<script lang="ts" setup>
const props = defineProps({
  file: {
    type: Object,
    default: null,
    required: true,
  },
  locale: {
    type: String,
    default: 'en',
    required: false,
  },
});
</script>

<template>
  <li v-if="props.file">
    <a
      :href="`${locale !== 'en' ? `/${locale}` : ''}/docs/${props.file.name}/`"
      :title="props.file.path"
      class="flex items-center hover:underline underline-offset-2 hover:underline-1"
    >
      <div
        i-system-uicons-document-justified
        class="text-blue-lightest dark:text-accent-light"
      />
      <span>{{ props.file.name }}</span>
    </a>
  </li>
</template>
