<template>
  <div
    class="relative flex"
    title="FUCK PUTIN! FUCK RUZZIA!"
  >
    <div
      i-mdi:tank
      class="inline-block bg-ukraine mr-1 mt-0.5"
    />
    <div
      i-mdi:tank
      class="inline-block bg-ukraine mr-1 mt-0.5"
    />
    <div
      i-mdi:tank
      class="inline-block bg-ukraine mr-5 mt-0.5"
    />
    <div class="relative">
      <div
        class="inline-block absolute"
        i-noto-v1:flag-for-flag-russia
      />
      <div
        i-emojione:fire
        class="inline-block absolute -mt-1 animate-ping animate-pulseR"
      />
    </div>
    <div class="absolute left-0 animate-bull animate-bull--1 -mt-1">
      <div
        i-mdi:bullet
        class="rotate-90 inline-block bg-yellow"
      />
    </div>
    <div class="absolute left-0 animate-bull animate-bull animate-bull--2 -mt-1">
      <div
        i-mdi:bullet
        class="rotate-90 inline-block bg-yellow"
      />
    </div>
    <div class="absolute left-0 animate-bull animate-bull--3 -mt-1">
      <div
        i-mdi:bullet
        class="rotate-90 inline-block bg-yellow"
      />
    </div>
  </div>
</template>

<style>
.bg-ukraine {
  background: linear-gradient(180deg, #0066cc 56%, #ffcc00 44%);
}

.animate-bull {
  top: -2px;
  animation-iteration-count: infinite;
}

.animate-bull--1 {
  animation-duration: 2s;
  animation-name: AnimateBull1;
}

.animate-bull--2 {
  animation-duration: 1.332s;
  animation-name: AnimateBull2;
  animation-delay: 1s;
}

.animate-bull--3 {
  animation-duration: 0.666s;
  animation-name: AnimateBull3;
  animation-delay: 2s;
}

@keyframes AnimateBull1 {
  0% {
    transform: translate(14px, 0px);
  }
  100% {
    transform: translate(86px, 0px);
  }
}

@keyframes AnimateBull2 {
  0% {
    transform: translate(38px, 0px);
  }
  100% {
    transform: translate(80px, 0px);
  }
}

@keyframes AnimateBull3 {
  0% {
    transform: translate(62px, 0px);
  }
  100% {
    transform: translate(88px, 0px);
  }
}
</style>
