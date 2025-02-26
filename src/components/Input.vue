<script setup lang="ts">
import { computed, useAttrs } from 'vue';

interface InputProps {
  id?: string;
  name?: string;
  label: string;
  variant?: 'filled' | 'standard';
  type?: string; // HTMLInputElement['type'] | 'textarea'
  modelValue?: string | number; // For v-model compatibility
  required?: boolean;
  rows?: number; // rows for textarea
  placeholder?: string;
  error?: string | boolean;
  success?: string | boolean;
  size?: 'sm' | 'md' | 'lg'; // Size prop
  class?: string; // additional classes
  [key: string]: any; // To allow additional props
}

const props = withDefaults(defineProps<InputProps>(), {
  id: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  name: undefined,
  variant: 'standard',
  type: 'text',
  modelValue: '',
  required: false,
  rows: 3,
  placeholder: ' ', // space is important for "floating label"
  error: false,
  success: false,
  size: 'md',
  class: ''
});

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur']);

// Handle external attrs
const attrs = useAttrs();

// Compute wrapper class
const wrapperClass = computed(() => `input-wrapper-${props.variant}`);

// Compute input classes going back to direct arbitrary selectors
const inputClass = computed(() => {
  // Base classes
  const classes = ['input-base', `input-${props.variant}`];
  
  // Focus and placeholder behavior - using direct arbitrary selectors
  classes.push('[&:focus~label]:text-blue-light');
  classes.push('[&:focus~label]:dark:text-blue-lightest');
  classes.push('[&:focus~label]:scale-75');
  classes.push('[&:placeholder-shown~label]:scale-100');
  classes.push('[&:placeholder-shown~label]:translate-y-0');
  classes.push('[&:not(:placeholder-shown)~label]:scale-75');
  
  // Variant-specific behaviors
  if (props.variant === 'standard') {
    classes.push('[&:focus~label]:-translate-y-6');
    classes.push('[&:focus~label]:start-0');
    classes.push('[&:not(:placeholder-shown)~label]:-translate-y-6');
  } else if (props.variant === 'filled') {
    classes.push('[&:focus~label]:-translate-y-4');
    classes.push('[&:not(:placeholder-shown)~label]:-translate-y-4');
  }
  
  // Additional classes
  if (props.size) classes.push(`input-${props.size}`);
  if (props.type === 'textarea') classes.push('input-textarea');
  if (props.error) classes.push('input-error');
  else if (props.success) classes.push('input-success');
  if (props.class) classes.push(props.class);
  
  return classes.join(' ');
});

// Compute label classes - important: add -translate-y for initial state explicitly
const labelClass = computed(() => {
  // Base classes
  const classes = ['input-label-base', `input-label-${props.variant}`];
  
  // Explicitly add transform for initial state to ensure consistency
  if (props.variant === 'standard') {
    // Start in position and let focus/content move it
    classes.push('translate-y-0');
  } else if (props.variant === 'filled') {
    // Start in position and let focus/content move it
    classes.push('translate-y-0');
  }
  
  // Additional classes
  if (props.size) classes.push(`input-label-${props.size}`);
  if (props.error) classes.push('input-label-error');
  else if (props.success) classes.push('input-label-success');
  
  return classes.join(' ');
});

// Emit modelValue on input change
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  emit('input', event);
};

// Forward focus and blur events
const handleFocus = (event: FocusEvent) => emit('focus', event);
const handleBlur = (event: FocusEvent) => emit('blur', event);
</script>

<template>
  <div :class="wrapperClass">
    <!-- Textarea field -->
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :name="name || id"
      :rows="rows"
      :required="required"
      :class="inputClass"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      v-bind="attrs"
    ></textarea>
    
    <!-- Input field -->
    <input
      v-else
      :type="type"
      :id="id"
      :name="name || id"
      :required="required"
      :class="inputClass"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      v-bind="attrs"
    />
    
    <!-- Label with guaranteed correct transform origin -->
    <label
      :for="id"
      :class="labelClass"
      style="transform-origin: top left;"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <!-- Error message -->
    <div 
      v-if="error && typeof error === 'string'" 
      class="input-error-message"
    >
      {{ error }}
    </div>
    
    <!-- Success message -->
    <div 
      v-if="success && typeof success === 'string'" 
      class="input-success-message"
    >
      {{ success }}
    </div>
  </div>
</template>