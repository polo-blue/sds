<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  items: {
    type: Object as PropType<string[] | null>,
    default: null,
    required: true,
  },
  caption: {
    type: String as PropType<string | null>,
    default: null,
    required: false,
  },
});
</script>

<template>
  <h2 v-if="props.caption" class="features-list-caption">
    {{ props.caption }}
  </h2>
  <ul class="features-list-ul">
    <li v-for="(item, index) in props.items" :key="index" class="features-list-item">
      {{ item }}
    </li>
  </ul>
</template>
