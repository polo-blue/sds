import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { extractProps, loadComponentSource } from '../../src/utils/docs/extractProps.ts';

const byName = (props: { name: string }[]) => Object.fromEntries(props.map(p => [p.name, p]));

test('astro: interface Props with JSDoc, unions, optional/required and destructuring defaults', () => {
  const source = `---
interface Props {
  /** Visible heading */
  title: string;
  /** Button size */
  size?: 'sm' | 'md' |
    'lg';
  count?: number;
  /**
   * Show the close button.
   * @default true
   */
  closable?: boolean;
  class?: string;
  [key: string]: any;
}

const { title, size = 'md', count = 3, class: className = '' } = Astro.props;
---
<div class={className}>{title}</div>
`;
  const { props, warnings } = extractProps(source, 'Card.astro');
  assert.deepEqual(warnings, []);
  assert.deepEqual(
    props.map(p => p.name),
    ['title', 'size', 'count', 'closable', 'class']
  );
  const p = byName(props);
  assert.deepEqual(p.title, { name: 'title', type: 'string', required: true, default: undefined, description: 'Visible heading', deprecated: undefined });
  assert.equal(p.size.type, "'sm' | 'md' | 'lg'");
  assert.equal(p.size.required, false);
  assert.equal(p.size.default, "'md'");
  assert.equal(p.count.default, '3');
  assert.equal(p.closable.description, 'Show the close button.');
  assert.equal(p.closable.default, 'true');
  assert.equal(p.class.default, "''");
});

test('astro: no Props interface yields no props', () => {
  assert.deepEqual(extractProps('---\nconst year = 2026;\n---\n<p>{year}</p>', 'Copyright.astro').props, []);
});

test('astro: extends clause is reported, local members still listed', () => {
  const { props, warnings } = extractProps('---\ninterface Props extends Base { a?: string }\n---\n', 'X.astro');
  assert.deepEqual(props.map(p => p.name), ['a']);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /extends Base/);
});

test('vue: defineProps<T>() with withDefaults, @internal hidden', () => {
  const source = `<script setup lang="ts">
interface InputProps {
  /** Field label */
  label: string;
  type?: 'text' | 'email';
  /** @internal */
  debugId?: string;
}
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
});
</script>
<template><input /></template>`;
  const p = byName(extractProps(source, 'Input.vue').props);
  assert.deepEqual(Object.keys(p), ['label', 'type']);
  assert.equal(p.label.required, true);
  assert.equal(p.label.description, 'Field label');
  assert.equal(p.type.default, "'text'");
});

test('vue: defineProps with a type alias and an inline type literal', () => {
  const alias = `<script setup lang="ts">
type Props = { tone?: 'info' | 'warn' };
defineProps<Props>();
</script>`;
  assert.equal(extractProps(alias, 'A.vue').props[0].type, "'info' | 'warn'");
  const inline = `<script setup lang="ts">
defineProps<{ open: boolean }>();
</script>`;
  assert.deepEqual(extractProps(inline, 'B.vue').props.map(p => [p.name, p.type, p.required]), [['open', 'boolean', true]]);
});

test('vue: imported props type is reported', () => {
  const source = `<script setup lang="ts">
import type { Shared } from './types';
defineProps<Shared>();
</script>`;
  const { props, warnings } = extractProps(source, 'C.vue');
  assert.deepEqual(props, []);
  assert.match(warnings[0], /`Shared` is not declared/);
});

test('vue: runtime-object defineProps', () => {
  const source = `<script setup lang="ts">
import type { PropType } from 'vue';
const props = defineProps({
  /** Badge text */
  badge: { type: String, required: false, default: '' },
  value: { type: [String, Number], required: true },
  items: { type: Array as PropType<string[]>, default: () => [] },
  options: { type: Object, default: () => ({ dense: true }) },
  tags: { type: Array, default() { return ['a']; } },
  format: { type: Function, default: (v: string) => { console.info(v); return v; } },
  /** @deprecated use \`variant\` */
  legacy: Boolean,
});
</script>`;
  const p = byName(extractProps(source, 'Badge.vue').props);
  assert.deepEqual(p.badge, { name: 'badge', type: 'string', required: false, description: 'Badge text', default: "''" });
  assert.equal(p.value.type, 'string | number');
  assert.equal(p.value.required, true);
  assert.equal(p.items.type, 'string[]');
  assert.equal(p.items.default, '[]');
  assert.equal(p.options.default, '{ dense: true }');
  assert.equal(p.tags.default, "['a']");
  assert.equal(p.format.type, 'function');
  assert.match(p.format.default ?? '', /^\(v: string\) =>/);
  assert.equal(p.legacy.type, 'boolean');
  assert.equal(p.legacy.deprecated, true);
});

test('real source: Button.vue lists the hover props and skips the index signature', () => {
  const source = readFileSync(new URL('../../src/components/Button.vue', import.meta.url), 'utf8');
  const names = extractProps(source, 'Button.vue').props.map(p => p.name);
  for (const name of ['primary', 'href', 'whiteHover', 'lightHover', 'mediumHover', 'darkHover']) {
    assert.ok(names.includes(name), `missing ${name}`);
  }
  assert.ok(!names.some(n => n.includes('key')));
});

test('real source: Badges.vue factory default and PropType type', () => {
  const source = readFileSync(new URL('../../src/components/Badges.vue', import.meta.url), 'utf8');
  const [badges] = extractProps(source, 'Badges.vue').props;
  assert.equal(badges.type, '(string | BadgeObject)[]');
  assert.equal(badges.default, '[]');
});

test('real source: Badge.vue runtime props are extracted', () => {
  const source = readFileSync(new URL('../../src/components/Badge.vue', import.meta.url), 'utf8');
  assert.deepEqual(extractProps(source, 'Badge.vue').props.map(p => p.name), ['badge', 'class']);
});

test('loadComponentSource resolves paths and throws for a missing component', async () => {
  const files = { '/src/components/Button.vue': async () => 'src' };
  assert.equal(await loadComponentSource(files, 'Button.vue'), 'src');
  assert.equal(await loadComponentSource(files, './Button.vue'), 'src');
  await assert.rejects(loadComponentSource(files, 'Nope.vue'), /no component at src\/components\/Nope\.vue/);
});
