<template>
  <a :href="href" class="category-link" :class="{ active: active }">
    {{ text }}
  </a>
</template>

<script>
export default {
  name: 'CategoryLink',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
};
</script>
