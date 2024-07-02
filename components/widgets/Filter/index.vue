<script
  setup
  lang="ts"
>
  import type { T_sortBy } from '~/types';

  const { isFilterOpened, sortBy, currencyFilter, aircraftTypeFilter, listCards, listCardsFilterd, getPortsState } = storeToRefs(useStore());
  const { setCurrency, setListCardsFilterd } = useStore();

  const setSortBy = (sortByNew: T_sortBy) => (sortBy.value = sortByNew);
  const setAircraftTypeFilter = (type: string) => {
    aircraftTypeFilter.value = aircraftTypeFilter.value === type ? '' : type
  };
  const handleFilterBtn = () => { isFilterOpened.value = false; };
  const aircraftTypes = computed(() => {
    const types: {
      label: string,
      img: string
    }[] = []
    listCards.value.forEach((card) => {
      card.routes?.forEach((route) => {
        if (!route || route === null) return;

        if (route.aircraft_type && !types.find((type) => type.label === route.aircraft_type)) {
          if (types.find(t => t.label === route.aircraft_class)) return;
          types.push({
            label: route.aircraft_class,
            img: useApiNajet() + route.aircraft_picture_urls.avatar
          })
        }
      })
    })
    return types
  })
  watch([sortBy, aircraftTypeFilter], setListCardsFilterd)
  const route = useRoute()
  const isShimmer = computed(() => (getPortsState.value.pending || route.params.slug === '2') ? 'shimmer' : '')
  const sectionClass = computed(() => `grid grid-cols-1 rounded-[10px] border border-[#777777] overflow-hidden ${isShimmer.value}`)
</script>

<template>
  <div v-if="isFilterOpened">
    <div
      class="text-nowrap rounded-[10px] w-[220px] top-[70px] right-0 z-50  border-[#777777]  max-[542px]:px-2 max-[542px]:py-[20px] max-[542px]:left-0 max-[542px]:w-full"
    >
      <div class="w-full max-[542px]:w-full">
        <div :class="sectionClass">
          <button
            @click="setSortBy('priceAsc')"
            class="border border-[#777777] py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
            :class="{ 'text-orange': sortBy === 'priceAsc' }"
          >
            Сначала недорогие
          </button>
          <button
            @click="setSortBy('priceDesc')"
            class="border border-[#777777] py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
            :class="{ 'text-orange': sortBy === 'priceDesc' }"
          >
            Сначала дорогие
          </button>
          <button
            @click="setSortBy('seats')"
            class="border border-[#777777] py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
            :class="{ 'text-orange': sortBy === 'seats' }"
          >
            По количеству мест
          </button>
          <button
            @click="setSortBy('year')"
            class="border border-[#777777] py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
            :class="{ 'text-orange': sortBy === 'year' }"
          >
            По году выпуска
          </button>
        </div>

        <div class="mt-10">
          <div :class="sectionClass">
            <button
              v-for="type in aircraftTypes"
              @click="setAircraftTypeFilter(type.label)"
              class="border border-[#777777] py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
              :class="{ 'text-orange': aircraftTypeFilter === type.label }"
            >
              <!-- <img
                :src="type.img"
                alt="type-fly-img"
              /> -->
              {{ type.label }}
            </button>
          </div>
        </div>

        <div class="mt-[40px]">
          <div :class="sectionClass">
            <button
              @click="setCurrency('RUB')"
              class="border border-[#777777] py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
              :class="{ 'text-orange': currencyFilter === 'RUB' }"
            >
              В рублях
            </button>
            <button
              @click="setCurrency('USD')"
              class="border border-[#777777] py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
              :class="{ 'text-orange': currencyFilter === 'USD' }"
            >
              В долларах
            </button>
            <button
              @click="setCurrency('EUR')"
              class="border border-[#777777] py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
              :class="{ 'text-orange': currencyFilter === 'EUR' }"
            >
              В евро
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>
