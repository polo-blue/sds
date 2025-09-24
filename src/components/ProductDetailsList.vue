<script setup lang="ts">
import { PropType, computed } from 'vue';
import ProductDetailName from './ProductDetailName.vue';

interface ColorCode {
  code: string;
  name: string;
}

interface TableItem {
  id: string;
  name: string;
  value: unknown; // Może być string, number, boolean, array (ColorCode[] lub string[])
  translated?: boolean;
  icon?: boolean;
  isArrayValue?: boolean;
  isColorArray?: boolean; // dla product.colors (color_ids)
  isPaintMarks?: boolean; // dla product.paint_marks_text
  isGenericArray?: boolean; // dla ogólnych tablic stringów (np. position)
  isForExteriorColour?: boolean; // Ta flaga będzie ustawiana przez getProductDetails na true, jeśli 'value' jest tablicą
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
  caption: { type: String, default: null },
});

// Function to check if a value is a link
const isLink = (id: string) => {
  return ['blog', 'youtube', 'vimeo'].includes(id);
};

// Function to check if it's a color array (for 'color_ids' field from product.colors)
// This will still apply to the 'color' detail if its value is an array of ColorCode objects
const isColorArray = (item: TableItem) => {
  const colorIds = ['color', 'thread-color']; // lista ID które są kolorami
  return (item.isColorArray || colorIds.includes(item.id)) && Array.isArray(item.value);
};

// Function to check if it's paint marks (value is now a string from API)
const isPaintMarks = (item: TableItem) => {
  return item.isPaintMarks && typeof item.value === 'string';
};

// Function to check if it's a generic array (e.g., for position)
const isGenericArray = (item: TableItem) => {
  return item.isGenericArray && Array.isArray(item.value);
};

// ✅ Zaktualizowana funkcja: Sprawdzamy ID i czy value jest faktycznie tablicą ColorCode[]
const isForExteriorColour = (item: TableItem) => {
  return item.id === 'for-exterior-colour' && Array.isArray(item.value);
};

// Function to check if value is HTML string (fallback)
const isHtmlValue = (value: unknown): boolean => {
  return typeof value === 'string' && (value.includes('<span') || value.includes('<br>'));
};

// Function for specifying header text
const getHeaderText = (row: TableItem | GroupedLink) => {
  if (row.id === 'blog') {
    return row.id.charAt(0).toUpperCase() + row.id.slice(1);
  }
  // Użyj `name` z obiektu `TableItem`, jeśli istnieje, w przeciwnym razie sformatuj `id`.
  return 'name' in row
    ? row.name
    : row.id
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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
  // ✅ Add validation to ensure props.items is an array
  if (!Array.isArray(props.items)) {
    console.warn('ProductDetailsList: items prop is not an array:', props.items);
    return [];
  }

  const result: (TableItem | GroupedLink)[] = [];
  const linkGroups = new Map<string, GroupedLink>();

  // Process all elements
  for (const item of props.items) {
    // If it's a link (blog, youtube, vimeo)
    if (isLink(item.id)) {
      // Add a link to the relevant group
      if (!linkGroups.has(item.id)) {
        linkGroups.set(item.id, {
          id: item.id,
          links: [],
        });
      }

      // Add link to the relevant group
      linkGroups.get(item.id)?.links.push({
        name: item.name,
        value: item.value as string,
      });
    } else {
      // If it's not a link, add it normally to the results
      result.push(item);
    }
  }

  // Add all link groups at the end
  for (const group of linkGroups.values()) {
    result.push(group);
  }

  return result;
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
      <col class="details-table-col">
      <col class="details-table-col">
    </colgroup>
    <tbody>
      <tr
        v-for="(row, index) in groupedItems"
        :key="index"
        class="details-table-row"
      >
        <ProductDetailName
          as="th"
          :text="getHeaderText(row)"
          class="details-table-header"
        />

        <td
          v-if="'links' in row"
          class="details-table-cell"
        >
          <ul class="list-none p-0 m-0">
            <li
              v-for="(link, linkIndex) in row.links"
              :key="linkIndex"
              class="mb-2 last:mb-0 flex items-center"
            >
              <span
                :class="[
                  getLinkIconClass(row.id),
                  'leading-none inline-block mr-2 w-4 min-w-4 h-4 text-gray-400',
                ]"
              />
              <a
                :href="link.value"
                target="_blank"
                rel="noopener noreferrer"
                class="link-primary"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </td>

        <td
          v-else-if="'id' in row && isColorArray(row)"
          class="details-table-cell"
        >
          <ul class="list-none p-0 m-0">
            <li
              v-for="(colorItem, colorIndex) in row.value as ColorCode[]"
              :key="colorIndex"
              class="flex items-center gap-1 mb-1 last:mb-0"
            >
              <template v-if="colorItem.code">
                <code class="font-mono text-sm">
                  {{ colorItem.code }}
                </code>
                <span class="text-gray-400">-</span>
              </template>
              <span class="text-gray-700 dark:text-gray-300">{{ colorItem.name }}</span>
            </li>
          </ul>
        </td>

        <td
          v-else-if="'id' in row && isPaintMarks(row)"
          class="details-table-cell"
        >
          <span class="text-gray-700 dark:text-gray-300">{{ row.value }}</span>
        </td>

        <td
          v-else-if="'id' in row && isForExteriorColour(row)"
          class="details-table-cell"
        >
          <ul class="list-none p-0 m-0">
            <li
              v-for="(colorEntry, colourIndex) in row.value as ColorCode[]"
              :key="colourIndex"
              class="flex items-center gap-1 mb-1 last:mb-0"
            >
              <template v-if="colorEntry.code">
                <code class="font-mono text-sm">
                  {{ colorEntry.code }}
                </code>
                <span class="text-gray-400">-</span>
              </template>
              <span class="text-gray-700 dark:text-gray-300">{{ colorEntry.name }}</span>
            </li>
          </ul>
        </td>

        <td
          v-else-if="'id' in row && isGenericArray(row)"
          class="details-table-cell"
        >
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

        <td
          v-else-if="'id' in row && isHtmlValue(row.value)"
          class="details-table-cell"
          v-html="row.value"
        />

        <slot
          v-else-if="'id' in row"
          :name="row.id"
        >
          <td class="details-table-cell">
            {{ row.value }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
