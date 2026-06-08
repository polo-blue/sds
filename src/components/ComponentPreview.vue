<script setup lang="ts">
import { ref, computed } from 'vue';
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

const activeCode = computed<string>(() => {
  const code = props[activeTab.value as 'html' | 'vue' | 'astro'];
  return code?.trim() ?? '';
});

const { copy, copied } = useClipboard({ source: activeCode, legacy: true });
</script>

<template>
  <div>
    <div class="component-preview" :class="previewClass">
      <slot />
    </div>
    <div v-if="tabs.length" class="rounded-b border border-t-0 border-neutral-lighter overflow-hidden -mt-px">
      <div
        role="tablist"
        class="flex items-center bg-neutral-lightest px-3 gap-0.5 border-b border-neutral-lighter"
      >
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab"
          class="px-3 py-2 text-xs font-medium uppercase tracking-wide transition-colors"
          :class="
            activeTab === tab
              ? 'text-blue-medium border-b-2 border-blue-medium -mb-px bg-white'
              : 'text-slate-light hover:text-slate-default'
          "
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
        <button
          type="button"
          aria-label="Copy code"
          class="ml-auto text-xs px-2.5 py-1 rounded border border-neutral-lighter bg-white hover:bg-neutral-lightest transition-colors text-slate-default leading-none"
          @click="copy()"
        >
          {{ copied ? '✓ Copied' : 'Copy' }}
        </button>
      </div>
      <pre
        role="tabpanel"
        class="p-4 text-sm overflow-x-auto bg-gray-900 text-gray-100 m-0 leading-relaxed"
      ><code class="font-mono">{{ activeCode }}</code></pre>
    </div>
  </div>
</template>
