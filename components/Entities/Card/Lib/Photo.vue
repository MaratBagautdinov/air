<script
  setup
  lang="ts"
>

  import { TO_FROM } from "~/content";
  const { isBackLine } = storeToRefs(useStore());

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
</script>

<template>
  <div :class="`relative block photo-card-wrap`">
    <nuxt-img
      :src="useApiNajet() + salonPhoto"
      placeholder
      alt="aircraft-img"
      :class="`photo-card aspect-square  ${photoClass}`"
    />
    <nuxt-icon
      name="card-arrow"
      alt="card-arrow"
      :class="`photo-card-arrow photo-card-arrow--${planeRoute}`"
    />
  </div>
</template>

<style lang="scss">
  .h-\[70px\] {
    height: 70px;
  }

  .w-\[70px\] {
    width: 70px;
  }

  .photo-card {
    border-radius: 9.5%;
  }

  .card-item-lib-photo {
    transform: skew(-1.5deg);
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