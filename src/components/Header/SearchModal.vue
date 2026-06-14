<template>
  <dialog
    ref="dialogRef"
    class="sds-search-dialog fixed inset-0 z-100 pt-[10vh] px-4 pb-4 max-sm:px-2 max-sm:pt-4 w-full h-full border-none bg-transparent overflow-visible"
    @click="onBackdropClick"
    @close="onClose"
  >
    <div
      class="max-w-160 mx-auto bg-white dark:bg-slate-darkest rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] max-sm:max-h-[85vh] max-sm:rounded-lg border border-slate-200 dark:border-slate-dark"
      @click.stop
    >
      <!-- Search input -->
      <div class="border-b border-slate-200 dark:border-slate-dark">
        <div class="flex items-center gap-3 px-4 py-3.5">
          <svg
            class="shrink-0 text-slate-400 dark:text-neutral-light"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="8.5" cy="8.5" r="5.5" />
            <line x1="13" y1="13" x2="18" y2="18" stroke-linecap="round" />
          </svg>
          <input
            ref="inputRef"
            v-model="query"
            type="search"
            placeholder="Search components and docs…"
            aria-label="Search docs"
            class="sds-search-input flex-1 border-none outline-none bg-transparent text-base text-slate-900 dark:text-neutral-lighter leading-relaxed placeholder:text-slate-400 dark:placeholder:text-neutral-light"
            @input="onSearch"
            @keydown="onInputKeydown"
          />
          <button
            v-if="query"
            type="button"
            class="shrink-0 border-none bg-transparent text-xs text-slate-500 dark:text-neutral-light cursor-pointer rounded px-2 py-1 transition-colors hover:text-slate-900 hover:bg-slate-100 dark:hover:text-neutral-lighter dark:hover:bg-slate-dark"
            @click="clearSearch"
          >
            Clear
          </button>
          <button
            type="button"
            class="shrink-0 flex items-center justify-center w-7 h-7 border-none bg-transparent text-slate-500 dark:text-neutral-light cursor-pointer rounded transition-colors hover:text-slate-900 hover:bg-slate-100 dark:hover:text-neutral-lighter dark:hover:bg-slate-dark"
            aria-label="Close search"
            @click="closeDialog"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <line x1="4" y1="4" x2="14" y2="14" />
              <line x1="14" y1="4" x2="4" y2="14" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Results -->
      <div class="overflow-y-auto flex-1 min-h-0">
        <div v-if="loading" class="py-8 px-4 text-center text-slate-500 dark:text-neutral-light text-sm">
          Searching…
        </div>
        <div
          v-else-if="query && !results.length && searchDone"
          class="py-8 px-4 text-center text-slate-500 dark:text-neutral-light text-sm"
        >
          No results found
        </div>
        <div v-else-if="!query" class="py-6 px-4 text-center text-slate-500 dark:text-neutral-light text-sm">
          Start typing to search components and docs…
        </div>

        <ul v-if="query && results.length" class="list-none m-0 p-2">
          <li v-for="(result, index) in results" :key="result.url || index">
            <a
              :href="result.url"
              class="search-result-link block p-3 rounded-lg no-underline text-inherit transition-colors"
              :class="[
                index === activeIndex
                  ? 'bg-slate-100 dark:bg-slate-dark'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-dark',
              ]"
              @click="closeDialog"
            >
              <span
                class="search-result-title block font-textbold text-[0.95rem] text-slate-900 dark:text-neutral-lighter leading-snug"
                v-html="result.meta?.title || result.url"
              />
              <span
                v-if="result.excerpt"
                class="search-result-excerpt block mt-1 text-[0.85rem] text-slate-500 dark:text-neutral-light leading-relaxed line-clamp-2"
                v-html="result.excerpt"
              />
              <span v-if="result.sub_results?.length" class="flex gap-2 mt-1 flex-wrap">
                <span
                  v-for="sub in result.sub_results.slice(0, 2)"
                  :key="sub.url"
                  class="sds-search-tag text-[0.75rem] font-textbold px-2 py-0.5 rounded"
                  v-html="sub.title"
                />
              </span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div
        class="flex justify-between items-center px-4 py-2 border-t border-slate-200 dark:border-slate-dark text-xs text-slate-500 dark:text-neutral-light"
      >
        <span class="max-sm:hidden flex items-center gap-3">
          <span class="flex items-center gap-1">
            <kbd
              class="text-[0.65rem] font-mono px-1.5 py-0.5 border border-slate-300 dark:border-slate-dark rounded-sm bg-slate-50 dark:bg-slate-darkest leading-none"
            >
              ↵
            </kbd>
            select
          </span>
          <span class="flex items-center gap-1">
            <kbd
              class="text-[0.65rem] font-mono px-1.5 py-0.5 border border-slate-300 dark:border-slate-dark rounded-sm bg-slate-50 dark:bg-slate-darkest leading-none"
            >
              ↑
            </kbd>
            <kbd
              class="text-[0.65rem] font-mono px-1.5 py-0.5 border border-slate-300 dark:border-slate-dark rounded-sm bg-slate-50 dark:bg-slate-darkest leading-none"
            >
              ↓
            </kbd>
            navigate
          </span>
          <span class="flex items-center gap-1">
            <kbd
              class="text-[0.65rem] font-mono px-1.5 py-0.5 border border-slate-300 dark:border-slate-dark rounded-sm bg-slate-50 dark:bg-slate-darkest leading-none"
            >
              ESC
            </kbd>
            close
          </span>
        </span>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

interface PagefindResultData {
  url?: string;
  excerpt?: string;
  meta?: { title?: string };
  sub_results?: Array<{ url?: string; title?: string }>;
  id?: string;
}

const dialogRef = ref<HTMLDialogElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const query = ref('');
const results = ref<PagefindResultData[]>([]);
const loading = ref(false);
const searchDone = ref(false);
const activeIndex = ref(-1);

let pagefind: any = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let searchId = 0;

async function initPagefind() {
  if (pagefind) return;
  try {
    const pagefindPath = `${window.location.origin}/pagefind/pagefind.js`;
    pagefind = await import(/* @vite-ignore */ pagefindPath);
    await pagefind.init();
  } catch (e) {
    console.warn('Pagefind not available (expected in dev mode):', e);
  }
}

async function onSearch() {
  if (debounceTimer) clearTimeout(debounceTimer);

  const q = query.value.trim();
  if (!q) {
    results.value = [];
    searchDone.value = false;
    loading.value = false;
    activeIndex.value = -1;
    return;
  }

  loading.value = true;
  const currentSearchId = ++searchId;

  debounceTimer = setTimeout(async () => {
    if (!pagefind) await initPagefind();
    if (!pagefind || currentSearchId !== searchId) {
      loading.value = false;
      return;
    }

    try {
      const search = await pagefind.search(q);
      if (currentSearchId !== searchId) return;

      const loaded = await Promise.all(
        search.results.slice(0, 10).map((r: any) => r.data().then((data: any) => ({ ...data, id: r.id })))
      );

      if (currentSearchId !== searchId) return;

      results.value = loaded;
      searchDone.value = true;
      activeIndex.value = -1;
    } catch (e) {
      if (currentSearchId !== searchId) return;
      console.error('Search error:', e);
      results.value = [];
      searchDone.value = true;
    }
    loading.value = false;
  }, 200);
}

function onInputKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (results.value.length) {
      activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1);
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (results.value.length) {
      activeIndex.value = Math.max(activeIndex.value - 1, 0);
    }
  } else if (e.key === 'Enter' && activeIndex.value >= 0 && results.value[activeIndex.value]) {
    e.preventDefault();
    const url = results.value[activeIndex.value].url;
    if (url) {
      closeDialog();
      window.location.href = url;
    }
  }
}

function clearSearch() {
  if (debounceTimer) clearTimeout(debounceTimer);
  searchId++;
  query.value = '';
  results.value = [];
  searchDone.value = false;
  loading.value = false;
  activeIndex.value = -1;
  inputRef.value?.focus();
}

function openDialog() {
  if (dialogRef.value?.open) return;
  dialogRef.value?.showModal();
  nextTick(() => {
    inputRef.value?.focus();
    initPagefind();
  });
}

function closeDialog() {
  dialogRef.value?.close();
}

function onClose() {
  if (debounceTimer) clearTimeout(debounceTimer);
  searchId++;
  query.value = '';
  results.value = [];
  searchDone.value = false;
  loading.value = false;
  activeIndex.value = -1;
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === dialogRef.value) closeDialog();
}

function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (dialogRef.value?.open) closeDialog();
    else openDialog();
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  window.addEventListener('sds-open-search', openDialog);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
  window.removeEventListener('sds-open-search', openDialog);
});

defineExpose({ openDialog, closeDialog });
</script>

<style scoped>
.sds-search-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.sds-search-input::-webkit-search-cancel-button {
  display: none;
}

/* Pagefind <mark> highlights — high contrast against light/dark slate backgrounds */
:deep(mark) {
  background: #fde047; /* yellow-300 */
  color: #1c1917; /* stone-900 — strong dark on bright yellow */
  padding: 1px 3px;
  border-radius: 3px;
  font-weight: 600;
}

:global(html.dark) :deep(mark) {
  background: #facc15; /* yellow-400 — still vivid on slate-darkest */
  color: #0f172a; /* slate-950 */
}

/* Sub-result tag pills — solid bg for high contrast in both themes */
.sds-search-tag {
  background: theme('colors.blue.medium');
  color: #fff;
  border: 1px solid theme('colors.blue.medium');
}

:global(html.dark) .sds-search-tag {
  background: theme('colors.blue.light');
  color: #0f172a;
  border-color: theme('colors.blue.light');
}

/* In case Pagefind injects <mark> inside the tag text, override its background */
.sds-search-tag :deep(mark) {
  background: rgba(255, 255, 255, 0.4);
  color: inherit;
}

:global(html.dark) .sds-search-tag :deep(mark) {
  background: rgba(0, 0, 0, 0.3);
  color: inherit;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
