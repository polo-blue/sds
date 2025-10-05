<script setup lang="ts">
import type { PropType } from 'vue';
import Badge from './Badge.vue';

interface BadgeObject {
  slug: string;
  label: string;
  type?: string;
  color?: string;
  priority?: number;
}

const props = defineProps({
  badges: {
    type: Array as PropType<(string | BadgeObject)[]>,
    required: false,
    default() {
      return [];
    },
  },
});

// Helper function to get badge text (support both string and object format)
const getBadgeText = (badge: string | BadgeObject): string => {
  if (typeof badge === 'string') {
    return badge;
  }
  return badge.label || badge.slug || '';
};

// Helper function to get badge color from API or fallback to legacy logic
const getBadgeColor = (badge: string | BadgeObject): string => {
  // If badge is an object with color property, use it
  if (typeof badge === 'object' && badge.color) {
    return badge.color;
  }

  // Otherwise, use legacy logic based on text
  const text = getBadgeText(badge).toLowerCase();
  if (text.includes('gti')) {
    return 'bg-red-600';
  } else if (text.includes('motorsport') || text.includes('wrc')) {
    return 'bg-blue-wrc';
  }
  return 'bg-black';
};
</script>

<template>
  <div
    v-if="props.badges && props.badges.length > 0"
    class="absolute z-2"
  >
    <Badge
      v-for="(badge, index) in props.badges"
      :key="index"
      :badge="getBadgeText(badge)"
      :class="getBadgeColor(badge)"
    />
  </div>
</template>
