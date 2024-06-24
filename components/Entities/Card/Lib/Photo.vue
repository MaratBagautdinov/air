<script setup lang="ts">

import { TO_FROM } from "~/content";

const props = defineProps<{
  salonPhoto: string,
  planeRoute: 'to' | 'from' | 'both' | 'none'
}>();
const [to, from] = TO_FROM
const planeRouteLabelList = {
  'none': [],
  'to': [to],
  'from': [from],
  'both': [to, from]
}[props.planeRoute]

let photoClass = computed(() => {
  return useState<number>("winWidth").value > 640
    ? "w-[220px] h-[220px]"
    : "w-full h-full max-w-[100px] block"
})
let labelClass = computed(() => {
  return useState<number>("winWidth").value > 640
    ? "left-[10px] top-[10px] text-center w-[85px] text-[14px]"
    : "absolute left-[4px] top-[4px] text-center w-[65px] text-[12px]"
})
</script>

<template>
  <div class="relative block min-w-fit photo-card-wrap overvlow-hidden">
    <nuxt-img
      :src="useApiNajet() + salonPhoto"
      placeholder
      alt="aircraft-img"
      :class="`photo-card aspect-square ${photoClass}`"
    />
    <!-- <span :class="`absolute flex flex-col gap-1 ${labelClass}`">
      <div
        class="lineType-item bg-[#121212] py-[7px]"
        v-for="label in planeRouteLabelList"
      >
        {{ label }}
      </div>
    </span> -->
    <img
      src="/img/card-arrow.svg"
      alt="card-arrow"
      :class="`photo-card-arrow photo-card-arrow--${planeRoute}`"
    />
  </div>
</template>

<style lang="scss">
.photo-card {
  width: fit-content;
}

.photo-card-arrow {
  position: absolute;
  height: 100%;
  width: auto;
  display: block;
  top: 0;

  &--to {
    right: -2px;
  }

  &--from {
    left: -2px;
    transform: scale(-1, -1);
  }

  &--none {
    display: none;
  }
}
</style>