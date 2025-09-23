<script setup lang="ts">
import { computed, useAttrs } from 'vue';

interface InputProps {
  id?: string;
  name?: string;
  label: string;
  variant?: 'filled' | 'standard';
  type?: string;
  modelValue?: string | number;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  error?: string | boolean;
  success?: string | boolean;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  [key: string]: any;
}

const props = withDefaults(defineProps<InputProps>(), {
  id: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  name: undefined,
  variant: 'standard',
  type: 'text',
  modelValue: '',
  required: false,
  rows: 3,
  placeholder: ' ', // space for "floating label"
  error: false,
  success: false,
  size: 'md',
  class: '',
});

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur']);

// Handle external attrs
const attrs = useAttrs();

// Compute wrapper class - uses existing shortcut
const wrapperClass = computed(() => `input-wrapper-${props.variant}`);

// Compute input classes - uses shortcuts
const inputClass = computed(() => {
  const classes = ['input-base', 'input-placeholder', `input-${props.variant}`];

  // Add size class
  if (props.size) classes.push(`input-${props.size}`);

  // Add textarea class if needed
  if (props.type === 'textarea') classes.push('input-textarea');

  // Add status classes
  if (props.error) classes.push('input-error');
  else if (props.success) classes.push('input-success');

  // Add custom classes
  if (props.class) classes.push(props.class);

  return classes.join(' ');
});

// Compute label classes - using optimized shortcuts
const labelClass = computed(() => {
  const classes = [
    // Base label style
    'input-label-base',

    // Position styling
    `input-label-${props.variant}`,

    // State styling - contains all transformations for the specific variant
    `input-label-${props.variant}-state`,
  ];

  // Add size class
  if (props.size) classes.push(`input-label-${props.size}`);

  // Add status classes
  if (props.error) classes.push('input-label-error');
  else if (props.success) classes.push('input-label-success');

  return classes.join(' ');
});

// Event handlers
const handleInput = (event: globalThis.Event) => {
  const target = event.target as globalThis.HTMLInputElement | globalThis.HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  emit('input', event);
};

const handleFocus = (event: globalThis.FocusEvent) => emit('focus', event);
const handleBlur = (event: globalThis.FocusEvent) => emit('blur', event);
</script>

<template>
  <div :class="wrapperClass">
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :name="name || id"
      :rows="rows"
      :required="required"
      :class="inputClass + ' peer'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      v-bind="attrs"
    ></textarea>

    <input
      v-else
      :type="type"
      :id="id"
      :name="name || id"
      :required="required"
      :class="inputClass + ' peer'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      v-bind="attrs"
    />

    <label :for="id" :class="labelClass" style="transform-origin: top left">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div v-if="error && typeof error === 'string'" class="input-error-message">
      {{ error }}
    </div>

    <div v-if="success && typeof success === 'string'" class="input-success-message">
      {{ success }}
    </div>
  </div>
</template>
