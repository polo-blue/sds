<script setup lang="ts">
interface Engine {
  id: number | string;
  name: string;
}

const props = withDefaults(defineProps<{
  engines: Engine[];
}>(), {
  engines: () => []
});
</script>

<template>
  <ul v-if="engines.length" class="engine-types">
    <li 
      v-for="(engine, index) in engines" 
      :key="engine.id"
      class="engine-type"
      :class="{ 'with-comma': index !== engines.length - 1 }"
    >
      {{ engine.name }}
    </li>
  </ul>
</template>

<style lang="scss">
.engine-types {
  @apply flex flex-wrap items-center;
}

.engine-type {
  @apply inline-block;

  &.with-comma {
    @apply mr-1;
    
    &:after {
      content: ',';
    }
  }
}
</style>