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
  label?: string; // Display name from API
  name?: string; // Alternative display name (used by individual link items)
  value: unknown; // Can be string, number, boolean, string array, or Link array
  type?: string; // 'links' for link arrays
  isGenericArray?: boolean; // for generic string arrays (e.g., position)
}

const props = defineProps({
  items: { type: Array as PropType<TableItem[]>, default: () => [] },
  caption: { type: String, default: null },
});

// Function to check if it's a links array (legacy grouped format)
const isLinksArray = (item: TableItem) => {
  return item.type === 'links' && Array.isArray(item.value);
};

// Function to check if it's an individual link item
// Backend sends: { id: 'blog', name: 'anchor', value: 'https://...', type: 'link' }
const isIndividualLink = (item: TableItem) => {
  return item.type === 'link' && typeof item.value === 'string';
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

// Extract YouTube video ID from URL
const getYoutubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

// Check if a grouped links item contains video links (YouTube or Vimeo)
const isVideoLinks = (item: TableItem) => {
  return item.type === 'links' && (item.id === 'youtube' || item.id === 'vimeo') && Array.isArray(item.value);
};

// Get thumbnail URL for a video link
const getVideoThumbnail = (link: Link): string | null => {
  if (link.type === 'youtube') {
    const videoId = getYoutubeVideoId(link.url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
  }
  // Vimeo thumbnails require API call — not available client-side
  return null;
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

        <!-- Video Links (YouTube/Vimeo) as tiles with thumbnails -->
        <td v-if="isVideoLinks(row)" class="details-table-cell">
          <div class="flex flex-col gap-3">
            <a
              v-for="(link, linkIndex) in row.value as Link[]"
              :key="linkIndex"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-start gap-3 no-underline text-inherit hover:text-[var(--clr-primary-400,#0099da)] group"
            >
              <div class="relative flex-shrink-0 w-28 aspect-video overflow-hidden bg-gray-100 rounded">
                <img
                  v-if="getVideoThumbnail(link)"
                  :src="getVideoThumbnail(link)!"
                  :alt="link.anchor"
                  width="240"
                  height="180"
                  loading="lazy"
                  class="w-full h-full object-cover"
                />
                <span class="i-lucide-play absolute inset-0 m-auto w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <span class="text-sm leading-snug pt-0.5 transition-colors duration-150">
                {{ link.anchor }}
              </span>
            </a>
          </div>
        </td>

        <!-- Other Links Array (blog, etc.) -->
        <td v-else-if="isLinksArray(row)" class="details-table-cell">
          <ul class="list-none p-0 m-0">
            <li
              v-for="(link, linkIndex) in row.value as Link[]"
              :key="linkIndex"
              class="mb-2 last:mb-0 flex items-start"
            >
              <span
                :class="[
                  getLinkIconClass(link.type),
                  'leading-none inline-block mr-2 w-4 min-w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5',
                ]"
              />
              <a :href="link.url" target="_blank" rel="noopener noreferrer" class="link-primary">
                {{ link.anchor }}
              </a>
            </li>
          </ul>
        </td>

        <!-- Individual Link (flat format: id=blog/youtube/vimeo, value=url, name=anchor) -->
        <td v-else-if="isIndividualLink(row)" class="details-table-cell">
          <div class="flex items-start">
            <span
              :class="[
                getLinkIconClass(row.id),
                'leading-none inline-block mr-2 w-4 min-w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5',
              ]"
            />
            <a :href="row.value as string" target="_blank" rel="noopener noreferrer" class="link-primary">
              {{ row.name || row.label || row.id }}
            </a>
          </div>
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
