<script
  setup
  lang="ts"
>

  import type { AircraftPictureUrls, RoutesEntity, T_Price } from "~/types";

  const { listCards, getPortsState, currencyFilter } = storeToRefs(useStore());
  const props = defineProps<{
    aircraft_year_of_creation: RoutesEntity['aircraft_year_of_creation'],
    price: T_Price | null,
    max_pax: RoutesEntity['max_pax'],
    avatar: AircraftPictureUrls['avatar']
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
      "flex h-full gap-[20px] justify-between flex-row-reverse"
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
        v-if="avatar && windowWidth > 640"
        loading="lazy"
        alt="aircraft-img"
        class="w-[200px]"
        :src="useApiNajet() + avatar"
      />
      <div class="flex items-center justify-end gap-[40px]">
        <span :class="`text-${fontClass} text-gray`">{{ aircraft_year_of_creation }}</span>
        <span :class="`text-${fontClass} text-gray`">
          {{ max_pax }}
          {{ getWordEnd(max_pax, ["мест", "место", "места"]) }}
        </span>
      </div>
    </div>
  </div>
</template>