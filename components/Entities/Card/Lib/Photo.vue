<script
  setup
  lang="ts"
>

  import { TO_FROM } from "~/content";

  const props = defineProps<{
    salonPhoto: string,
    planeRoute: 'to' | 'from' | 'both' | 'none'
    maxW: string
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
      ? `w-[${props.maxW}px] h-[${props.maxW}px]`
      : "w-full h-full max-w-[100px] block"
  })
  let labelClass = computed(() => {
    return useState<number>("winWidth").value > 640
      ? "left-[10px] top-[10px] text-center w-[85px] text-[14px]"
      : "absolute left-[4px] top-[4px] text-center w-[65px] text-[12px]"
  })
</script>

<template>
  <div :class="`relative block max-w-[${maxW}px] min-w-fit photo-card-wrap `">
    <nuxt-img
      :src="useApiNajet() + salonPhoto"
      placeholder
      alt="aircraft-img"
      :class="`photo-card aspect-square overflow-hidden ${photoClass}`"
    />
    <nuxt-icon
      name="card-arrow"
      alt="card-arrow"
      :class="`photo-card-arrow photo-card-arrow--${planeRoute}`"
    />
  </div>
</template>

<style lang="scss">
  .photo-card {
    width: fit-content;
    border-radius: 9.5%;
  }


  .photo-card-arrow {
    position: absolute;
    height: 100%;
    width: fit-content;
    display: block;
    top: 0;

    svg {
      height: 100%;
      width: auto;
    }

    &--from {
      right: -1px;
    }

    &--to {
      left: -1px;
      transform: scale(-1, -1);
    }

    &--none {
      display: none;
    }

  }

  .nuxt-icon.nuxt-icon--fill,
  .nuxt-icon.nuxt-icon--fill * {
    fill: auto !important;
  }
</style>