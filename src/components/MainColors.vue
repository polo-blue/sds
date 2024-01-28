<script setup lang="ts">
import { COLORS } from "../design.config";

const colorNames = Object.keys(COLORS);
</script>

<template>
  <div class="flex flex-col space-y-12">
    <div v-for="name in colorNames" :key="name">
      <h3 class="capitalize">{{ name }}</h3>
      <div class="grid grid-cols-3 md:grid-cols-9">
        <div v-for="color in COLORS[name]" :key="color" class="mb-6">
          <div class="h-12 transition-all" :style="`background: ${color.value}`"></div>
          <div class="text-sm flex flex-col text-center font-mono text-slate-500">
            <span>{{ color.name }}</span>
            <span class="uppercase text-xs">{{ color.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

