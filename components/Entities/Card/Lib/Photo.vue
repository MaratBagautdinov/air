<script
  setup
  lang="ts"
>

  import { TO_FROM } from "~/content";
  const { isBackLine } = storeToRefs(useStore());

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
      ? props.planeRoute === 'none' ? 'aspect-square-92' : 'aspect-square-03'
      : "w-full h-full block"
  })
</script>

<template>
  <div
    :class="`relative block box-border photo-card-wrap ${photoClass}`"
    :style="`background-image: url(${useApiNajet()}${salonPhoto})`"
  >
    <nuxt-icon
      name="card-arrow"
      alt="card-arrow"
      :class="`photo-card-arrow h-full scale-[1.005] photo-card-arrow--${planeRoute}`"
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    min-width: 100%;
    max-width: auto;
    max-height: 100%;
  }

  .card-arrow-back {
    color: inherit;
  }

  .card-item-lib-photo {
    transform: skew(-1.5deg);
  }

  .photo-card-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9.5%;
    background-size: cover;
    background-position: center;
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
      rotate: 180deg;
    }

    &--none {
      display: none;
    }

  }

  .nuxt-icon.nuxt-icon--fill,
  .nuxt-icon.nuxt-icon--fill * {
    fill: auto !important;
  }

  .aspect-square-03 {
    aspect-ratio: 1.03 / 1;
  }

  .aspect-square-92 {
    aspect-ratio: .92 / 1;
  }
</style>