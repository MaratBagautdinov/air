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
      ? props.planeRoute === 'none' ? 'aspect-square' : 'aspect-square-03'
      : "w-full h-full block"
  })
</script>

<template>
  <div :class="`relative block overflow-hidden box-border photo-card-wrap ${photoClass}`">
    <nuxt-img
      :src="useApiNajet() + salonPhoto"
      placeholder
      alt="aircraft-img"
      :class="`photo-card scale-[0.99] ${photoClass}`"
    />
    <nuxt-icon
      name="card-arrow"
      alt="card-arrow"
      :class="`photo-card-arrow h-full scale-[0.996] photo-card-arrow--${planeRoute}`"
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

  .card-arrow-back {
    color: inherit;
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

  .aspect-square-03 {
    aspect-ratio: 1.03 / 1;
  }
</style>