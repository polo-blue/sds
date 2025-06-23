<script setup lang="ts">
import { PropType, computed } from "vue";
import ProductDetailName from "./ProductDetailName.vue";

interface ColorCode {
  code: string;
  name: string;
}

interface PaintMark {
  count: number;
  color: string;
}

interface TableItem {
  id: string;
  name: string;
  value: unknown;
  translated?: boolean;
  icon?: boolean;
  isArrayValue?: boolean;
  isColorArray?: boolean;
  isPaintMarks?: boolean;
  isGenericArray?: boolean;
}

interface GroupedLink {
  id: string;
  links: {
    name: string;
    value: string;
  }[];
}

const props = defineProps({
  items: { type: Array as PropType<TableItem[]>, default: () => [] },
  caption: { type: String, default: null }
});

// Function for checking whether a value is a link
const isLink = (id: string) => {
  return ['blog', 'youtube', 'vimeo'].includes(id);
};

// Function for checking if it's a color array
const isColorArray = (item: TableItem) => {
  return item.isColorArray && Array.isArray(item.value);
};

// Function for checking if it's paint marks
const isPaintMarks = (item: TableItem) => {
  return item.isPaintMarks && Array.isArray(item.value);
};

// Function for checking if it's a generic array
const isGenericArray = (item: TableItem) => {
  return item.isGenericArray && Array.isArray(item.value);
};

// Function to check if value is HTML string (fallback)
const isHtmlValue = (value: unknown): boolean => {
  return typeof value === 'string' && (value.includes('<span') || value.includes('<br>'));
};

// Function for specifying header text
const getHeaderText = (row: TableItem | GroupedLink) => {
  // For the blog, we use id instead of name
  if (row.id === 'blog') {
    return row.id.charAt(0).toUpperCase() + row.id.slice(1);
  }
  
  // For other types, we use name (if it is GroupedLink, there is no name)
  return 'name' in row ? row.name : row.id.charAt(0).toUpperCase() + row.id.slice(1);
};

// Function to determine the icon class for a link type
const getLinkIconClass = (linkId: string) => {
  switch (linkId) {
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

// Grouping of elements by id
const groupedItems = computed(() => {
  const result: (TableItem | GroupedLink)[] = [];
  const linkGroups = new Map<string, GroupedLink>();
  
  // We process all elements
  props.items.forEach(item => {
    // If it's a link (blog, youtube, vimeo)
    if (isLink(item.id)) {
      // Add a link to the relevant group
      if (!linkGroups.has(item.id)) {
        linkGroups.set(item.id, { 
          id: item.id, 
          links: [] 
        });
      }
      
      // Add link to the relevant group
      linkGroups.get(item.id)?.links.push({
        name: item.name,
        value: item.value as string
      });
    } else {
      // If it is not a link, we add it normally to the results
      result.push(item);
    }
  });
  
  // Add all link groups at the end
  linkGroups.forEach(group => {
    result.push(group);
  });
  
  return result;
});
</script>

<template>
  <table class="details-table">
    <caption v-if="!!$slots.caption || caption">
      <slot name="caption">{{ caption }}</slot>
    </caption>
    <colgroup>
      <col class="details-table-col">
      <col class="details-table-col">
    </colgroup>
    <tbody>
      <tr v-for="row, index in groupedItems" :key="index" class="details-table-row">
        <!-- We use the getHeaderText function to specify the header text -->
        <ProductDetailName 
          as="th" 
          :text="getHeaderText(row)" 
          class="details-table-header"
        />
        
        <!-- Handling link groups -->
        <td v-if="'links' in row" class="details-table-cell">
          <ul class="list-none p-0 m-0">
            <li v-for="(link, linkIndex) in row.links" :key="linkIndex" class="mb-2 last:mb-0 flex items-center">
              <span :class="[getLinkIconClass(row.id), 'leading-none inline-block mr-2 w-4 min-w-4 h-4 text-gray-400']" />
              <a :href="link.value" target="_blank" rel="noopener noreferrer" class="link-primary">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </td>
        
        <!-- Special handling for color arrays (already translated) -->
        <td v-else-if="'id' in row && isColorArray(row)" class="details-table-cell">
        <ul>
          <li v-for="(colorItem, colorIndex) in (row.value as ColorCode[])" :key="colorIndex" 
               class="flex items-center gap-2 mb-1 last:mb-0">
            <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono font-semibold">
              {{ colorItem.code }}
            </code>
            <span class="text-gray-400">-</span>
            <span class="text-gray-700 dark:text-gray-300">{{ colorItem.name }}</span>
          </li>
          </ul>
        </td>
        
        <!-- Special handling for paint marks (already translated) -->
        <td v-else-if="'id' in row && isPaintMarks(row)" class="details-table-cell">
          <span class="text-gray-700 dark:text-gray-300">{{ row.value }}</span>
        </td>
        
        <!-- Generic array handling (bullet list) -->
        <td v-else-if="'id' in row && isGenericArray(row)" class="details-table-cell">
          <ul class="list-none p-0 m-0">
            <li v-for="(item, itemIndex) in (row.value as string[])" :key="itemIndex" 
                class="flex items-start gap-2 mb-1 last:mb-0 leading-relaxed">
              <span class="text-gray-500 font-bold flex-shrink-0 mt-0.5">·</span>
              <span class="text-gray-700 dark:text-gray-300 text-sm">{{ item }}</span>
            </li>
          </ul>
        </td>
        
        <!-- Handling HTML values (fallback for already formatted HTML) -->
        <td v-else-if="'id' in row && isHtmlValue(row.value)" class="details-table-cell" v-html="row.value"></td>
        
        <!-- Support for standard types -->
        <slot v-else-if="'id' in row" :name="row.id">
          <td class="details-table-cell">{{ row.value }}</td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>