<script setup lang="ts">
import { PropType } from "vue";
import ProductDetailName from "./ProductDetailName.vue";

interface TableItem {
  id: string;
  name: string;
  value: unknown;
  translated?: boolean;
  icon?: boolean;
}

const props = defineProps({
  items: { type: Array as PropType<TableItem[]>, default: () => [] },
  caption: { type: String, default: null }
});

// Funkcja do sprawdzania, czy wartość jest linkiem
const isLink = (id: string) => {
  return ['blog', 'youtube', 'vimeo'].includes(id);
};

// Funkcja do określania tekstu nagłówka
const getHeaderText = (row: TableItem) => {
  // Dla bloga, używamy id zamiast name
  if (row.id === 'blog') {
    return row.id.charAt(0).toUpperCase() + row.id.slice(1); // "Blog" z dużej litery
  }
  
  // Dla innych typów, używamy name
  return row.name;
};
</script>

<template>
  <table class="details table-auto text-left bg-white">
    <caption v-if="!!$slots.caption || caption">
      <slot name="caption">{{ caption }}</slot>
    </caption>
    <colgroup>
      <col>
      <col>
    </colgroup>
    <tbody>
      <tr v-for="row, index in props.items" :key="index">
        <!-- Używamy funkcji getHeaderText do określenia, co wyświetlić w nagłówku -->
        <ProductDetailName as="th" :text="getHeaderText(row)" />
        
        <!-- Specjalna obsługa dla linków -->
        <td v-if="isLink(row.id)" class="link-cell">
          <a :href="row.value as string" target="_blank" rel="noopener noreferrer" class="link-primary">
            {{ row.name }} <!-- row.name zawiera tekst anchora dla linków -->
          </a>
        </td>
        
        <!-- Standardowe sloty dla innych typów -->
        <slot v-else :name="row.id">
          <td>{{ row.value }}</td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.details {
  @apply border-none shadow-none w-full md:w-auto;
  box-shadow: none;

  col {
    @apply w-1/2 md:w-auto;
  }

  tr {
    @apply border-none;
  }

  tr,
  th {
    @apply leading-none text-3.5 py-2 border-none xl:(py-4) 3xl:(text-4);
  }

  th {
    @apply px-0;
  }

  td {
    @apply relative;
  }
}

.link-primary {
  @apply text-blue-600 hover:text-blue-800 hover:underline;
}
</style>