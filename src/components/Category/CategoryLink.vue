<template>
    <div class="text-light-blue-400 uppercase text-base z-3 relative w-full">
      <template v-if="categories">
        <template v-for="(category, index) in categories" :key="category.uri">
          
            class="term-link text-sm sm:text-base"
            :class="{ 'before:content-empty before:w-px before:h-2.5 before:bg-gray-300 before:mx-2.5 before:inline-block before:relative': index > 0 }"
            :href="category.uri"
          >
            {{ category.name }}
          </a>
        </template>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategoryLink',
    props: {
      categories: {
        type: Array,
        default: () => []
      }
    }
  }
  </script>