<script setup lang="ts">
import { PropType, computed } from 'vue';
import ProductDetailName from './ProductDetailName.vue';

interface Link {
  type: string;
  url: string;
  anchor: string;
}

interface TableItem {
  id: string;
  label: string; // Display name from API
  value: unknown; // Can be string, number, boolean, string array, or Link array
  type?: string; // 'links' for link arrays
  isGenericArray?: boolean; // for generic string arrays (e.g., position)
}

const props = defineProps({
  items: { type: Array as PropType<TableItem[]>, default: () => [] },
  caption: { type: String, default: null },
});

// Function to check if it's a links array from new API
const isLinksArray = (item: TableItem) => {
  return item.type === 'links' && Array.isArray(item.value);
};

// Function to check if it's a generic array (e.g., for position)
const isGenericArray = (item: TableItem) => {
  return item.isGenericArray && Array.isArray(item.value);
};

// Function to check if value is HTML string (fallback)
const isHtmlValue = (value: unknown): boolean => {
  return typeof value === 'string' && (value.includes('<span') || value.includes('<br>'));
};

// Function for specifying header text
const getHeaderText = (row: TableItem) => {
  return (
    row.label ||
    row.id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
};

// Function to determine the icon class for a link type
const getLinkIconClass = (linkType: string) => {
  const type = linkType.toLowerCase();
  switch (type) {
    case 'blog':
      return 'i-lucide-book-text';
    case 'youtube':
      return 'i-simple-icons-youtube';
    case 'vimeo':
      return 'i-simple-icons-vimeo';
    default:
      return 'i-lucide-link';
  }
};

// Validate items
const validatedItems = computed(() => {
  if (!Array.isArray(props.items)) {
    console.warn('ProductDetailsList: items prop is not an array:', props.items);
    return [];
  }
  return props.items;
});
</script>

<template>
  <table class="details-table">
    <caption v-if="!!$slots.caption || caption">
      <slot name="caption">
        {{ caption }}
      </slot>
    </caption>
    <colgroup>
      <col class="details-table-col" />
      <col class="details-table-col" />
    </colgroup>
    <tbody>
      <tr v-for="(row, index) in validatedItems" :key="index" class="details-table-row">
        <ProductDetailName as="th" :text="getHeaderText(row)" class="details-table-header" />

        <!-- Links Array -->
        <td v-if="isLinksArray(row)" class="details-table-cell">
          <ul class="list-none p-0 m-0">
            <li
              v-for="(link, linkIndex) in row.value as Link[]"
              :key="linkIndex"
              class="mb-2 last:mb-0 flex items-center"
            >
              <span
                :class="[
                  getLinkIconClass(link.type),
                  'leading-none inline-block mr-2 w-4 min-w-4 h-4 text-gray-400',
                ]"
              />
              <a :href="link.url" target="_blank" rel="noopener noreferrer" class="link-primary">
                {{ link.anchor }}
              </a>
            </li>
          </ul>
        </td>

        <!-- Generic String Array -->
        <td v-else-if="isGenericArray(row)" class="details-table-cell">
          <ul class="list-none p-0 m-0">
            <li
              v-for="(item, itemIndex) in row.value as string[]"
              :key="itemIndex"
              class="flex items-start gap-2 mb-1 last:mb-0 leading-relaxed"
            >
              <span class="text-gray-500 font-bold flex-shrink-0 mt-0.5">·</span>
              <span class="text-gray-700 dark:text-gray-300 text-sm">{{ item }}</span>
            </li>
          </ul>
        </td>

        <!-- HTML Value -->
        <td v-else-if="isHtmlValue(row.value)" class="details-table-cell" v-html="row.value" />

        <!-- Slot or Default Value -->
        <slot v-else :name="row.id">
          <td class="details-table-cell">
            {{ row.value }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
