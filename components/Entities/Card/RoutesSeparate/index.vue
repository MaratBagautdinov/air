<script
  setup
  lang="ts"
>
  import type { T_Card } from "~/types";

  const { isBackLine } = storeToRefs(useStore());

  const props = defineProps<{
    card: T_Card
  }>()
  let infoClass = computed(() => {
    return useState<number>("winWidth").value > 640 ?
      "flex justify-between"
      :
      "flex gap-[10px] justify-between flex-col-reverse w-full"
  })
</script>


<template>
  <li
    :key="card.id"
    class="last:pb-0 last:border-b-0 pb-[40px] max-[640px]:border-b-0 max-[640px]:pb-[14px] cards-item flex gap-[22px] flex-col"
  >
    <template
      v-for="(plane, i) in card.routes"
      :key="i"
    >
      <nuxt-link
        v-if="plane"
        :to="{ path: `/flight/${card.id}` }"
        class="flex-col"
      >
        <article class="card-artcicle">

          <EntitiesCardLibPhoto
            :salonPhoto="plane.aircraft_picture_urls?.salon"
            :planeRoute="isBackLine ? (i === 0 ? 'to' : 'from') : 'none'"
            class="card-item-lib-photo text-[#0e0e0e]"
          />
          <div :class="`card-item-r ${infoClass}`">
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
    </template>
  </li>
</template>
<style scoped>

  .card-artcicle {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 30px
  }

  .cards-item {
    transform: skew(-3.5deg);
    background: #0e0e0e;
    border-radius: 15px;
    padding: 25px 35px;
    width: 98%;
  }

  @media (max-width: 920px) {
    .cards-item {
      padding: 15px;
    }

    .card-artcicle {
      grid-template-columns: 160px 1fr
    }
  }

  @media (max-width: 600px) {
    .card-artcicle {
      grid-template-columns: 100px 1fr
    }
  }
</style>