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
  active: false,
});
</script>

<template>
  <a
    :href="props.category.link"
    class="category-link-base"
    :class="{ 'category-link-active': props.active }"
    :title="props.category.description || props.category.name"
  >
    {{ props.category.name }}
  </a>
</template>

<!-- No <style> section - all styles are now UnoCSS shortcuts -->
