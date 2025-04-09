<script setup lang="ts">
import { PropType, computed } from "vue";
import ProductDetailName from "./ProductDetailName.vue";

interface TableItem {
  id: string;
  name: string;
  value: unknown;
  translated?: boolean;
  icon?: boolean;
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

//  Function for checking whether a value is a link
const isLink = (id: string) => {
  return ['blog', 'youtube', 'vimeo'].includes(id);
};

// Function for specifying header text
const getHeaderText = (row: TableItem | GroupedLink) => {
  //  For the blog, we use id instead of name
  if (row.id === 'blog') {
    return row.id.charAt(0).toUpperCase() + row.id.slice(1); // "Blog" z dużej litery
  }
  
  // For other types, we use name (if it is GroupedLink, there is no name)
  return 'name' in row ? row.name : row.id.charAt(0).toUpperCase() + row.id.slice(1);
};

//  Function to determine the icon class for a link type
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
      
      // Dodajemy link do odpowiedniej grupy
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
  <table class="details table-auto text-left bg-white">
    <caption v-if="!!$slots.caption || caption">
      <slot name="caption">{{ caption }}</slot>
    </caption>
    <colgroup>
      <col>
      <col>
    </colgroup>
    <tbody>
      <tr v-for="row, index in groupedItems" :key="index">
        <!-- We use the getHeaderText function to specify the header text -->
        <ProductDetailName as="th" :text="getHeaderText(row)" />
        
        <!-- Handling link groups -->
        <td v-if="'links' in row" class="link-cell">
          <ul class="list-none p-0 m-0">
            <li v-for="(link, linkIndex) in row.links" :key="linkIndex" class="mb-2 last:mb-0 flex items-center">
              <span :class="[getLinkIconClass(row.id), 'leading-none inline-block mr-2 w-4 h-4 text-gray-400']" />
              <a :href="link.value" target="_blank" rel="noopener noreferrer" class="link-primary">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </td>
        
        <!--  Support for standard types -->
        <slot v-else-if="'id' in row" :name="row.id">
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