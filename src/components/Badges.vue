<script setup lang="ts">
import type { PropType } from 'vue'
import Badge from "./Badge.vue"

const props = defineProps({
  badges: {
    type: Array as PropType<string[]>,
    required: false,
    default() {
      return []
    },
  },
})
</script>

<template>
  <div v-if="(props.badges && props.badges.length > 0)" class="absolute z-2">
    <Badge v-for="(badge, index) in props.badges" :key="index" :badge="badge"
      :class="(badge.toLocaleLowerCase().includes('gti') ? 'bg-red-600' : badge.toLocaleLowerCase().includes('motorsport') ? 'bg-blue-wrc' : 'bg-black')" />
  </div>
</template>
