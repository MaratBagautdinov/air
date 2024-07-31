<script
  setup
  lang="ts"
>

  import type { AircraftPictureUrls, RoutesEntity, T_Price } from "~/types";

  const { listCards, getPortsState, currencyFilter, isFilterOpened } = storeToRefs(useStore());
  const props = defineProps<{
    aircraft_year_of_creation: RoutesEntity['aircraft_year_of_creation'],
    price: T_Price | null,
    max_pax: RoutesEntity['max_pax'],
    avatar: AircraftPictureUrls['avatar']
    isShimmner?: boolean
  }>()
  const formatPrice = (price: T_Price | null) => {
    if (price === null) return ''
    return priceFormat(price[getLoverCurrency(currencyFilter.value)], currencyFilter.value)
  };
  const windowWidth = useState<number>('winWidth')
  let offerClass = computed(() => {
    return useState<number>("winWidth").value > 640 ?
      "flex flex-col justify-between text-end"
      :
      "flex h-full gap-[20px] justify-between flex-col"
  })
  let fontClass = computed(() => {
    return useState<number>("winWidth").value > 640 ?
      18 : 14
  })
</script>

<template>
  <div :class="offerClass">
    <h3 :class="`text-${windowWidth > 640 ? 30 : 16} direct font-light uppercase`">{{ formatPrice(price) }}</h3>
    <div :class="`flex gap-4 align-bottom ${windowWidth > 1000 ? '' : 'flex-col-reverse'}`">
      <nuxt-img
        v-if="!isShimmner && !isFilterOpened && avatar && windowWidth > 640"
        loading="lazy"
        alt="aircraft-img"
        :class="`w-[200px]`"
        :src="useApiNajet() + avatar"
      />
      <div
        :class="`w-[200px]`"
        v-else
      ></div>
      <div class="flex items-center justify-end max-[640px]:justify-start gap-[40px]">
        <span :class="`text-${fontClass} text-gray`">{{ aircraft_year_of_creation }}</span>
        <span :class="`text-${fontClass} text-gray`">
          {{ max_pax }}
          {{ getWordEnd(max_pax, ["мест", "место", "места"]) }}
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @media (max-width:920px) {
    h3 {
      font-size: large;
    }
  }
</style>