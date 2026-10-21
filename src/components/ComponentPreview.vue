<script setup lang="ts">
import { ref, computed, nextTick, useId } from 'vue';
import { useClipboard } from '@vueuse/core';

interface Props {
  html?: string;
  vue?: string;
  astro?: string;
  previewClass?: string;
}

const props = defineProps<Props>();

type TabName = 'html' | 'vue' | 'astro';

const tabs = computed<TabName[]>(() => {
  const t: TabName[] = [];
  if (props.html) t.push('html');
  if (props.vue) t.push('vue');
  if (props.astro) t.push('astro');
  return t;
});

const activeTab = ref<TabName>(tabs.value[0] ?? 'html');

// Stable ids that tie each tab to the shared code panel (WAI-ARIA tabs pattern)
const uid = useId();
const tabId = (tab: TabName) => `${uid}-tab-${tab}`;
const panelId = `${uid}-panel`;
const tabRefs = ref<HTMLButtonElement[]>([]);

// Arrow keys / Home / End move between tabs; focus follows selection
async function onTabKeydown(event: KeyboardEvent, index: number) {
  const last = tabs.value.length - 1;
  const next =
    event.key === 'ArrowRight'
      ? index === last
        ? 0
        : index + 1
      : event.key === 'ArrowLeft'
        ? index === 0
          ? last
          : index - 1
        : event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? last
            : null;
  if (next === null) return;
  event.preventDefault();
  activeTab.value = tabs.value[next];
  await nextTick();
  tabRefs.value[next]?.focus();
}

const activeCode = computed<string>(() => {
  const code = props[activeTab.value];
  return code?.trim() ?? '';
});

function dedent(text: string): string {
  const lines = text.replace(/^\n+|\n+$/g, '').split('\n');
  const nonEmpty = lines.filter(l => l.trim());
  if (!nonEmpty.length) return text;
  const minIndent = Math.min(...nonEmpty.map(l => l.match(/^ */)![0].length));
  return lines.map(l => l.slice(minIndent)).join('\n');
}

// Split top-level elements while preserving multi-line opening tags.
// A line that's just an attribute (no `<tag>` or `</tag>` or `/>`) never flushes
// — otherwise every line of a wide <Component attr1 attr2 ... /> becomes a
// separate copyable chunk. We only flush when depth returns to 0 AND the
// current line actually terminates an element (close tag, self-close, or
// stand-alone `/>` finishing a multi-line open).
function splitByElements(text: string): string[] {
  const lines = text.split('\n');
  const out: string[] = [];
  let current: string[] = [];
  let depth = 0;

  const push = () => {
    const joined = current.join('\n').trim();
    if (joined) out.push(joined);
    current = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (depth === 0 && current.length) push();
      else if (current.length) current.push(line);
      continue;
    }

    current.push(line);

    // Single-line opening tag like <Tag> or <Tag attr="x"> (not self-closing)
    const opens = (trimmed.match(/<[A-Za-z][\w-]*(?:\s[^>]*)?(?<!\/)>/g) || []).length;
    // Closing tag </Tag>
    const closes = (trimmed.match(/<\/[A-Za-z][\w-]*>/g) || []).length;
    depth += opens - closes;

    // Does this line END an element on the page?
    const isCompleteSelfClose = /<[A-Za-z][\w-]*(?:\s[^>]*)?\/>/.test(trimmed);
    const isMultiLineSelfCloseTerminator = trimmed === '/>' || trimmed.endsWith('/>');
    const terminates = closes > 0 || isCompleteSelfClose || isMultiLineSelfCloseTerminator;

    if (depth <= 0 && terminates) {
      depth = 0;
      push();
    }
  }
  push();
  return out;
}

const chunks = computed<string[]>(() => {
  let remaining = activeCode.value;
  const result: string[] = [];

  // 1. Astro frontmatter (---\n...\n---)
  const fm = remaining.match(/^---\n[\s\S]*?\n---/);
  if (fm) {
    result.push(fm[0]);
    remaining = remaining.slice(fm[0].length).replace(/^\n+/, '');
  }

  // 2. Vue SFC <script> block
  const sc = remaining.match(/^<script[^>]*>[\s\S]*?<\/script>/);
  if (sc) {
    result.push(sc[0]);
    remaining = remaining.slice(sc[0].length).replace(/^\n+/, '');
  }

  // 3. Unwrap <template>...</template> for per-element splitting
  let body = remaining;
  const tpl = remaining.match(/^<template[^>]*>([\s\S]*)<\/template>\s*$/);
  if (tpl) {
    body = dedent(tpl[1]);
  }

  result.push(...splitByElements(body));
  return result.filter(Boolean);
});

const { copy: copyAll, copied: copiedAll } = useClipboard({ source: activeCode, legacy: true });

const copiedChunkIdx = ref<number | null>(null);

// Announced through a polite live region so the copy result is not visual-only (WCAG 4.1.3)
const copyStatus = computed(() =>
  copiedAll.value || copiedChunkIdx.value !== null ? 'Copied to clipboard' : ''
);
async function copyChunk(idx: number, text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  copiedChunkIdx.value = idx;
  setTimeout(() => {
    if (copiedChunkIdx.value === idx) copiedChunkIdx.value = null;
  }, 1500);
}
</script>

<template>
  <div class="my-6">
    <div class="component-preview" :class="previewClass">
      <slot />
    </div>
    <div
      v-if="tabs.length"
      class="rounded-b border border-t-0 border-neutral-lighter dark:border-slate-dark overflow-hidden -mt-px"
    >
      <div
        class="flex items-center bg-neutral-lightest dark:bg-slate-darkest px-3 gap-0.5 border-b border-neutral-lighter dark:border-slate-dark"
      >
        <div role="tablist" aria-label="Code examples" class="flex items-center gap-0.5">
          <button
            v-for="(tab, index) in tabs"
            :id="tabId(tab)"
            :key="tab"
            ref="tabRefs"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab"
            :aria-controls="panelId"
            :tabindex="activeTab === tab ? 0 : -1"
            class="px-3 py-2 text-xs font-medium uppercase tracking-wide transition-colors focus-visible:outline-offset-[-2px]"
            :class="
              activeTab === tab
                ? 'text-blue-medium dark:text-blue-ultralight border-b-2 border-blue-medium dark:border-blue-light -mb-px bg-white dark:bg-slate-dark'
                : 'text-slate-default dark:text-neutral-light hover:text-slate-darkest dark:hover:text-neutral-lighter'
            "
            @click="activeTab = tab"
            @keydown="onTabKeydown($event, index)"
          >
            {{ tab }}
          </button>
        </div>
        <button
          type="button"
          class="ml-auto text-xs px-2.5 py-1 rounded border border-neutral-lighter dark:border-slate-dark bg-white dark:bg-slate-dark hover:bg-neutral-lightest dark:hover:bg-slate-darkest transition-colors text-slate-default dark:text-neutral-lighter leading-none"
          @click="copyAll()"
        >
          {{ copiedAll ? '✓ Copied all' : 'Copy all' }}
        </button>
        <span class="sr-only" role="status">{{ copyStatus }}</span>
      </div>
      <div
        v-if="chunks.length > 1"
        :id="panelId"
        role="tabpanel"
        :aria-labelledby="tabId(activeTab)"
        class="bg-gray-900 divide-y divide-gray-800"
      >
        <div v-for="(chunk, idx) in chunks" :key="idx" class="relative group">
          <button
            type="button"
            aria-label="Copy snippet"
            class="absolute top-2 right-2 z-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 transition-opacity text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-100 leading-none"
            @click="copyChunk(idx, chunk)"
          >
            {{ copiedChunkIdx === idx ? '✓ Copied' : 'Copy' }}
          </button>
          <pre
            tabindex="0"
            class="p-4 pr-16 text-sm overflow-x-auto text-gray-100 m-0 leading-relaxed focus-visible:outline-offset-[-2px]"
          ><code class="font-mono">{{ chunk }}</code></pre>
        </div>
      </div>
      <pre
        v-else
        :id="panelId"
        role="tabpanel"
        :aria-labelledby="tabId(activeTab)"
        tabindex="0"
        class="focus-visible:outline-offset-[-2px] p-4 text-sm overflow-x-auto bg-gray-900 text-gray-100 m-0 leading-relaxed"
      ><code class="font-mono">{{ activeCode }}</code></pre>
    </div>
  </div>
</template>
