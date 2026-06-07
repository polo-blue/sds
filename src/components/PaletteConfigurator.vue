<script setup lang="ts">
import { ref, computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { generatePalette } from '../../uno-config/palette-generator.ts';
import type { PaletteInput } from '../../uno-config/palette-generator.ts';

const primary = ref('#0040c5');
const secondary = ref('#00b0f0');
const accent = ref('');

const paletteInput = computed((): PaletteInput => {
  const input: PaletteInput = { primary: primary.value };
  if (secondary.value) input.secondary = secondary.value;
  if (accent.value) input.accent = accent.value;
  return input;
});

const palette = computed(() => {
  try {
    return generatePalette(paletteInput.value);
  } catch {
    return null;
  }
});

const colorGroups = computed(() => {
  if (!palette.value) return [];
  return Object.entries(palette.value).map(([group, shades]) => ({
    group,
    entries: Object.entries(shades as Record<string, string | undefined>).filter(
      (e): e is [string, string] => e[1] !== undefined
    ),
  }));
});

const cssVar = (group: string, name: string) =>
  group === 'system' ? `--color-${name}` : `--color-${group}-${name}`;

const exportCode = computed(() => {
  const { primary: p, secondary: s, accent: a } = paletteInput.value;
  const parts: string[] = [`primary: '${p}'`];
  if (s) parts.push(`secondary: '${s}'`);
  if (a) parts.push(`accent: '${a}'`);
  return `createSdsConfig({\n  ${parts.join(',\n  ')},\n})`;
});

const { copy, copied } = useClipboard({ copiedDuring: 2000 });
const copyConfig = () => copy(exportCode.value);
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-6 mb-10">
      <label class="flex flex-col gap-1.5">
        <span class="text-sm font-medium">
          Primary
          <span class="text-red-500">*</span>
        </span>
        <div class="flex items-center gap-2">
          <input
            type="color"
            v-model="primary"
            aria-label="Primary color picker"
            class="w-10 h-10 rounded cursor-pointer border-0 p-0"
          />
          <input
            type="text"
            v-model="primary"
            aria-label="Primary color hex value"
            class="font-mono text-sm border rounded px-2 py-1 w-24"
          />
        </div>
      </label>
      <label class="flex flex-col gap-1.5">
        <span class="text-sm font-medium">Secondary</span>
        <div class="flex items-center gap-2">
          <input
            type="color"
            v-model="secondary"
            aria-label="Secondary color picker"
            class="w-10 h-10 rounded cursor-pointer border-0 p-0"
          />
          <input
            type="text"
            v-model="secondary"
            aria-label="Secondary color hex value"
            placeholder="auto"
            class="font-mono text-sm border rounded px-2 py-1 w-24"
          />
        </div>
      </label>
      <label class="flex flex-col gap-1.5">
        <span class="text-sm font-medium">
          Accent
          <span class="text-xs text-gray-400">(optional)</span>
        </span>
        <div class="flex items-center gap-2">
          <input
            type="color"
            v-model="accent"
            aria-label="Accent color picker"
            class="w-10 h-10 rounded cursor-pointer border-0 p-0"
          />
          <input
            type="text"
            v-model="accent"
            aria-label="Accent color hex value"
            placeholder="#..."
            class="font-mono text-sm border rounded px-2 py-1 w-24"
          />
        </div>
      </label>
    </div>

    <div v-if="!palette" class="mb-8 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
      Invalid color value — enter a valid hex, rgb, or oklch color.
    </div>

    <div v-else class="space-y-8 mb-10">
      <div v-for="{ group, entries } in colorGroups" :key="group">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{{ group }}</h3>
        <div class="flex flex-wrap gap-3">
          <template v-for="[name, value] in entries" :key="name">
            <div class="flex flex-col items-center gap-1">
              <div
                class="w-12 h-12 rounded-lg shadow-sm border border-black/10"
                :style="`background: ${value}`"
                :title="`${cssVar(group, name)}: ${value}`"
              />
              <span class="text-xs text-gray-500 text-center leading-tight max-w-12">{{ name }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="rounded-lg overflow-hidden border border-gray-700">
      <div class="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span class="text-gray-300 text-sm font-mono">uno.config.ts</span>
        <button
          type="button"
          @click="copyConfig"
          class="text-xs px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium"
        >
          {{ copied ? '✓ Copied' : 'Copy' }}
        </button>
      </div>
      <pre
        class="bg-gray-900 p-4 overflow-x-auto"
      ><code class="text-gray-200 text-sm">{{ exportCode }}</code></pre>
    </div>
  </div>
</template>
