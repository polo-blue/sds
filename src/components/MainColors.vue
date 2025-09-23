<script setup lang="ts">
import { colors } from './../../uno-config/theme/colors';

// Get color categories
const colorCategories = Object.entries(colors);
</script>

<template>
  <div class="flex flex-col space-y-12">
    <div
      v-for="[category, shades] in colorCategories"
      :key="category"
    >
      <h3 class="capitalize">
        {{ category }}
      </h3>
      <div class="grid grid-cols-3 md:grid-cols-9">
        <div
          v-for="(value, name) in shades"
          :key="name"
          class="mb-6"
        >
          <div
            class="h-12 transition-all"
            :style="`background: ${value}`"
          />
          <div class="text-sm flex flex-col text-center font-mono text-slate-500">
            <span>{{ name }}</span>
            <span class="uppercase text-xs">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
