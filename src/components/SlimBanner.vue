<script lang="ts" setup>
/* global localStorage */
import { ref, onMounted } from 'vue';

const props = defineProps({
  // Primary state (visible by default)
  message: {
    type: String,
    default:
      'We stand with our friends and colleagues in Ukraine. To support Ukraine in their time of need visit',
  },
  linkText: {
    type: String,
    default: 'this page',
  },
  linkUrl: {
    type: String,
    default: 'https://polo.blue/support-ukraine/',
  },
  linkTitle: {
    type: String,
    default: '',
  },

  // Toggle state (shows when close button is clicked)
  toggleMessage: {
    type: String,
    default: '',
  },
  toggleBgClass: {
    type: String,
    default: 'bg-black',
  },
  toggleTextClass: {
    type: String,
    default: 'text-white',
  },

  // Close button
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  closeButtonAriaLabel: {
    type: String,
    default: 'Toggle',
  },

  // Show flag icon (Ukraine flag by default)
  showIcon: {
    type: Boolean,
    default: false,
  },
  iconClass: {
    type: String,
    default:
      'inline-block text-4xl w-6 h-3.5 min-w-[1.25rem] mr-3 bg-gradient-to-b stops-[#0057b7_50%,50%,#ffd700_100%]',
  },

  // LocalStorage persistence
  persistClose: {
    type: Boolean,
    default: false,
  },
  storageKey: {
    type: String,
    default: 'slimbanner-closed',
  },
  // Expiration in days (0 = never expires)
  expirationDays: {
    type: Number,
    default: 30,
  },
});

const isShow = ref(true);
const isHidden = ref(false);

// Check localStorage on mount
onMounted(() => {
  if (props.persistClose && typeof window !== 'undefined') {
    const stored = localStorage.getItem(props.storageKey);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const now = new Date().getTime();

        // Check if expired
        if (props.expirationDays > 0 && data.expires && now > data.expires) {
          // Expired, remove from storage
          localStorage.removeItem(props.storageKey);
        } else if (data.closed) {
          // Still valid, keep hidden
          isHidden.value = true;
        }
      } catch {
        // Invalid data, remove it
        localStorage.removeItem(props.storageKey);
      }
    }
  }
});

const toggleVisibility = () => {
  isShow.value = !isShow.value;
};

const closePermanently = () => {
  isHidden.value = true;

  if (props.persistClose && typeof window !== 'undefined') {
    const data = {
      closed: true,
      timestamp: new Date().getTime(),
      expires:
        props.expirationDays > 0 ? new Date().getTime() + props.expirationDays * 24 * 60 * 60 * 1000 : null,
    };
    localStorage.setItem(props.storageKey, JSON.stringify(data));
  }
};
</script>

<template>
  <template v-if="!isHidden">
    <div v-if="isShow" data-pagefind-ignore class="slimbanner">
      <slot name="icon">
        <span v-if="props.showIcon" :class="props.iconClass" />
      </slot>

      <span class="leading-none inline-flex">
        <slot>
          <span :data-text="props.message"></span>
          <a
            v-if="props.linkUrl"
            :href="props.linkUrl"
            target="_blank"
            rel="noopener"
            :title="props.linkTitle || props.linkText"
            class="underline underline-offset-2 hover:text-blue-wrc ml-1.5"
            :data-text="props.linkText"
          ></a>
          <span v-if="props.linkUrl" data-text="."></span>
        </slot>
      </span>

      <button
        v-if="props.showCloseButton && (props.toggleMessage || props.persistClose)"
        class="btn-close text-white"
        :aria-label="props.closeButtonAriaLabel"
        @click="props.persistClose ? closePermanently() : toggleVisibility()"
      >
        <span class="close close-dark" />
      </button>
    </div>
    <div
      v-else-if="props.toggleMessage"
      data-pagefind-ignore
      :class="`px-4 sm:px-8 py-3 flex items-center justify-center text-xs sm:text-base leading-none relative drop-shadow-md z-2 ${props.toggleBgClass} ${props.toggleTextClass}`"
    >
      <div class="tracking-widest leading-none">
        <slot name="toggle">
          {{ props.toggleMessage }}
        </slot>
      </div>
      <button
        v-if="props.showCloseButton"
        class="btn-close"
        :aria-label="props.closeButtonAriaLabel"
        @click="props.persistClose ? closePermanently() : toggleVisibility()"
      >
        <span :class="props.toggleTextClass === 'text-white' ? 'close close-light' : 'close close-dark'" />
      </button>
    </div>
  </template>
</template>

<style>
.btn-close {
  @apply ml-3 relative w-5 h-5;
}

.close {
  @apply absolute top-0 left-0 opacity-50 transition-opacity duration-200;
}

.btn-close:hover .close {
  @apply opacity-100;
}

.close:before,
.close:after {
  position: absolute;
  left: 0.5rem;
  content: ' ';
  height: 1.25rem;
  width: 2px;
}

.close:before {
  transform: rotate(45deg);
}

.close:after {
  transform: rotate(-45deg);
}
</style>
