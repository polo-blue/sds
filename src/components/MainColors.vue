<script setup lang="ts">
/* global navigator, setTimeout */
import { ref } from 'vue';
import { colors } from './../../uno-config/theme/colors';

// Get color categories
const colorCategories = Object.entries(colors);

// Track copied state for visual feedback
const copiedItem = ref<string | null>(null);

const copyToClipboard = async (text: string, id: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copiedItem.value = id;
    setTimeout(() => {
      copiedItem.value = null;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const getColorClass = (category: string, name: string) => {
  // Generate Tailwind/UnoCSS class name
  const colorName = name === 'default' ? category : `${category}-${name}`;
  return colorName;
};
</script>

<template>
  <div class="flex flex-col space-y-12">
    <div v-for="[category, shades] in colorCategories" :key="category">
      <h3 class="capitalize text-xl font-bold mb-4">
        {{ category }}
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
        <div v-for="(value, name) in shades" :key="name" class="group relative">
          <!-- Color Swatch -->
          <button
            class="w-full h-10 rounded-lg shadow-md transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer relative overflow-hidden"
            :style="`background: ${value}`"
            :title="`Click to copy hex: ${value}`"
            @click="copyToClipboard(value, `${category}-${name}-hex`)"
          >
            <!-- Copied indicator -->
            <div
              v-if="copiedItem === `${category}-${name}-hex`"
              class="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-sm"
            >
              ✓ Copied!
            </div>
          </button>

          <!-- Color Info -->
          <div class="mt-2 space-y-1">
            <!-- Color Name -->
            <div class="text-sm font-medium text-gray-700 text-center">
              {{ name }}
            </div>

            <!-- Copy Buttons -->
            <div class="flex gap-1 text-xs font-mono">
              <!-- Copy Hex -->
              <button
                class="flex-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-600 hover:text-gray-900 relative"
                :title="`Copy hex: ${value}`"
                @click="copyToClipboard(value, `${category}-${name}-hex`)"
              >
                <span v-if="copiedItem === `${category}-${name}-hex`" class="text-green-600">✓</span>
                <span v-else class="uppercase text-xs">{{ value }}</span>
              </button>

              <!-- Copy Class Name (text-*) -->
              <button
                class="flex-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded transition-colors text-blue-700 hover:text-blue-900 relative"
                :title="`Copy class: text-${getColorClass(category, name)}`"
                @click="copyToClipboard(`text-${getColorClass(category, name)}`, `${category}-${name}-class`)"
              >
                <span v-if="copiedItem === `${category}-${name}-class`" class="text-green-600">✓</span>
                <span v-else>text-</span>
              </button>

              <!-- Copy Class Name (bg-*) -->
              <button
                class="flex-1 px-2 py-1 bg-purple-100 hover:bg-purple-200 rounded transition-colors text-purple-700 hover:text-purple-900 relative"
                :title="`Copy class: bg-${getColorClass(category, name)}`"
                @click="copyToClipboard(`bg-${getColorClass(category, name)}`, `${category}-${name}-bg`)"
              >
                <span v-if="copiedItem === `${category}-${name}-bg`" class="text-green-600">✓</span>
                <span v-else>bg-</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
