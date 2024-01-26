
<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  lang: {
    type: String
  },
  translations: {
    type: Object as PropType<{ uri: string | null, title: string | null, name: string | null } | null>
  }
});
</script>

<template>
  <div
    data-pagefind-ignore
    v-if="props.translations !== null && props.translations.uri">
    <a aria-label="Change language"
    type="button" 
    :href="translations.uri" 
    :title="translations.name ? translations.name : translations.title" 
    :class="[lang === 'en' ? 'i-circle-flags:en' : '', lang === 'pl' ? 'i-circle-flags:pl' : '', 'w-5 hover:rotate--3']" />
  </div>
</template>


