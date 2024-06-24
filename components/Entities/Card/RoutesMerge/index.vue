<script
  setup
  lang="ts"
>
  import type { RoutesEntity, T_Card, T_Price } from "~/types";
  const { isBackLine } = storeToRefs(useStore());

  const props = defineProps<{
    card: T_Card
  }>()
  let articleClass = computed(() => {
    return useState<number>("winWidth").value > 640 ?
      "flex gap-[31px] justify-between first:pb-[30px]"
      :
      "flex gap-[20px] items-center first:pb-[15px]"
  })
  let infoClass = computed(() => {
    return useState<number>("winWidth").value > 640 ?
      "flex w-full justify-between"
      :
      "flex gap-[10px] justify-between flex-col"
  })
  const plane = ref<RoutesEntity>(props.card.routes[0])

  const sumRoutesPrices: T_Price = props.card.routes.reduce((acc, cur) => {
    if (cur === null) return acc;
    return {
      rub: acc.rub + cur.price.rub,
      eur: acc.eur + cur.price.eur,
      usd: acc.usd + cur.price.usd,
    }
  }, {
    rub: 0,
    eur: 0,
    usd: 0
  })

</script>


<template>
  <li
    :key="card.id"
    class="last:pb-0 last:border-b-0 pb-[40px] border-b border-white max-[640px]:border-b-0 max-[640px]:pb-[14px]"
  >
    <nuxt-link
      :to="{ path: `/flight/${card.id}` }"
      class="flex-col"
    >
      <article
        v-if="plane"
        :class="articleClass"
      >
        <EntitiesCardLibPhoto
          :salonPhoto="plane.aircraft_picture_urls?.salon"
          :planeRoute="isBackLine ? 'both' : 'none'"
        />

        <div :class="infoClass">
          <EntitiesCardLibInfo
            :aircraft_class="plane.aircraft_class"
            :aircraft_type="plane.aircraft_type"
            :legs="plane.legs"
          />

          <EntitiesCardLibOffer
            :avatar="plane.aircraft_picture_urls.avatar"
            :price="sumRoutesPrices"
            :aircraft_year_of_creation="plane.aircraft_year_of_creation"
            :max_pax="plane.max_pax"
          />
        </div>
      </article>
      <div v-else>
        Рейсы не найдены
      </div>
    </nuxt-link>
  </li>
</template>
