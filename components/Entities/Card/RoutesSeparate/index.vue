<script
  setup
  lang="ts"
>
  import type { T_Card, T_Price } from "~/types";
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
</script>


<template>
  <li
    :key="card.id"
    class="last:pb-0 last:border-b-0 pb-[40px] border-b border-white max-[640px]:border-b-0 max-[640px]:pb-[14px] "
  >
    <nuxt-link
      :to="{ path: `/flight/${card.id}` }"
      v-for="(plane, i) in card.routes"
      :key="i"
      class="flex-col"
    >
      <article
        v-if="plane"
        :class="articleClass"
      >
        <EntitiesCardLibPhoto
          :salonPhoto="plane.aircraft_picture_urls?.salon"
          :planeRoute="isBackLine ? (i === 0 ? 'to' : 'from') : 'none'"
          :maxW="'220'"
          class="card-item-lib-photo"
        />
        <div :class="infoClass">
          <EntitiesCardLibInfo
            :aircraft_class="plane.aircraft_class"
            :aircraft_type="plane.aircraft_type"
            :leg="plane.legs.find((l) => !l.is_emptyleg)"
            :planeRoute="(i === 0 ? 'to' : 'from')"
          />
          <EntitiesCardLibOffer
            :avatar="plane.aircraft_picture_urls.avatar"
            :price="i === 0 ? sumRoutesPrices(card.routes) : null"
            :aircraft_year_of_creation="plane.aircraft_year_of_creation"
            :max_pax="plane.max_pax"
          />
        </div>
      </article>
    </nuxt-link>
  </li>
</template>
<style scoped>
  .card-item-lib-photo {
    background: #121212;
  }
</style>