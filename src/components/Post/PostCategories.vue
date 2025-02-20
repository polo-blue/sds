<script setup lang="ts">
interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  link: string;
}

interface Props {
  category: Category;
  active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  active: false
});
</script>

<template>
  <a
    :href="props.category.link"
    class="category-link"
    :class="{ 'active': props.active }"
    :title="props.category.description || props.category.name"
  >
    {{ props.category.name }}
  </a>
</template>

<style>
.category-link {
  @apply text-sm sm:text-base text-accent-lightest uppercase hover:text-blue-500 transition-colors;
}

.category-link.active {
  @apply text-blue-500;
}
</style>