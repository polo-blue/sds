<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  showCloseButton: {
    type: Boolean,
    default: true,
    required: false,
  },
});
const isShow = ref(true);
const toggleVisibility = () => {
  isShow.value = !isShow.value;
};
</script>

<template>
  <div
    v-if="isShow"
    data-pagefind-ignore
    class="slimbanner"
  >
    <span
      class="inline-block text-4xl w-6 h-3.5 min-w-[1.25rem] mr-3 bg-gradient-to-b stops-[#0057b7_50%,50%,#ffd700_100%]"
    />
    <span class="leading-none"><span
                                 data-text="We stand with our friends and colleagues in Ukraine. To support Ukraine in their time of need visit "
                               />
      <a
        href="https://polo.blue/support-ukraine/"
        target="_blank"
        rel="noopener"
        title="Support Ukraine"
        class="underline underline-offset-2 hover:text-blue-wrc"
      >this page</a>.
    </span>

    <button
      v-if="props.showCloseButton"
      class="btn-close text-white"
      aria-label="Toggle"
      @click="toggleVisibility()"
    >
      <span class="close close-dark" />
    </button>
  </div>
  <div
    v-else
    data-pagefind-ignore
    class="px-4 sm:px-8 py-3 flex items-center justify-center text-xs sm:text-base leading-none text-white relative bg-black drop-shadow-md z-2"
  >
    <div class="tracking-widest leading-none">
      <span data-text="RUSSIA IS A" />
      <span
        class="underline decoration-red-600 decoration-1 underline-offset-3"
        data-text="TERRORIST"
      />
      <span data-text="STATE" />
    </div>
    <button
      v-if="props.showCloseButton"
      class="btn-close"
      aria-label="Toggle"
      @click="toggleVisibility()"
    >
      <span class="close close-light" />
    </button>
  </div>
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
