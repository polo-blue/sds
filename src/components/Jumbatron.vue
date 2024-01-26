<template>
  <div class="relative bg-vw md:min-h-md">
    <div class="max-w-7xl mx-auto">
      <div class=" pb-8  sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
        <header class="mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
          <div class="text-center">
            <h1 class="text-2xl pt-6 sm:pt-0 sm:text-5xl md:text-6xl tracking-tight font-headlight text-white">
              <slot name="intro" />
              <!-- <span v-html="t('home.intro')"></span> -->
              <!-- <small class="block text-2xl">aaa</small> -->
            </h1>
            <slot name="subtitle" />
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
              <div>
                <slot name="cta" />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.bg-vw {
  background: radial-gradient(
      circle at 50% 85%,
      #00437A 0%,
      #001E50 100%
  )}
</style>