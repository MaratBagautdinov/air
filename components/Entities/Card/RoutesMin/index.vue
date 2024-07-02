<template>
  <div class="pb-[8px] flex gap-[10px] flex-col">
    <div
      v-for="(plane, i) in routes"
      :key="i"
    >
      <div v-if="plane">
        <div class="grid grid-cols-[70px,1fr] items-center gap-[10px]">
          <EntitiesCardLibPhoto
            :salonPhoto="plane.aircraft_picture_urls?.salon"
            :planeRoute="(i === 0 ? 'to' : 'from')"
            :class="isSelected ? 'text-[#252525]' : 'text-[#121212]'"
          />
          <div class="flex flex-col">
            <span class="block text-white"> {{ plane?.aircraft_type }}</span>
            <span class="block text-[12px] text-gray">
              {{ plane?.aircraft_class }}
            </span>
            <div class="flex items-center gap-[20px] mt-[7px]">
              <span class="text-[14p] text-gray">
                {{ plane?.aircraft_year_of_creation }}
              </span>
              <span class="text-[14p] text-gray">
                {{ plane?.max_pax }}
                {{ getWordEnd(plane?.max_pax, ["мест", "место", "места"]) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <span class="text-[14px]">{{
    priceFormat(sumRoutesPrices(routes)[getLoverCurrency(currencyFilter)], currencyFilter) }}</span>
</template>

<script
  lang="ts"
  setup
>
  import type { T_Card } from '~/types';

  const { currencyFilter } = storeToRefs(useStore());
  defineProps<{
    routes: T_Card['routes']
    isSelected: boolean
  }>()
</script>

<style></style>