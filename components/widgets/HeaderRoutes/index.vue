<template>
  <template v-if="pendingHeaderRoutes || !cardFull">
    <div class="w-full py-[40px]">
      <ul class="flex items-center gap-[30px]">
        <li class="w-[260px] shimmer h-[70px]"></li>
        <li class="w-[260px] shimmer h-[70px]"></li>
      </ul>
    </div>
  </template>
  <template v-else>
    <div
      v-if="listCards && listCards.length > 0"
      class="py-[40px] max-[640px]:px-2 max-[640px]:py-[20px]"
    >
      <Swiper
        :navigation="{
          disabledClass: 'opacity-50',
        }"
        :modules="[SwiperNavigation]"
        :slides-per-view="'auto'"
        class="l-header-routes-swiper"
      >
        <SwiperSlide
          v-for="(route, i) in listCards"
          :key="i"
          :class="`max-w-[300px]  p-3 ${nowCardID === route.id ? 'selected-card' : ''} `"
        >
          <NuxtLink
            @click.prevent="setDetailRoutesID(route.id)"
            :to="{ path: `/flight/${route.id}` }"
          >
            <template
              v-for="(plane, i) in route.routes"
              :key="i"
            >
              <div v-if="plane">
                <div class="flex items-center gap-[10px]">
                  <nuxt-img
                    v-if="plane?.aircraft_picture_urls?.salon"
                    :src="useApiNajet() + plane?.aircraft_picture_urls?.salon"
                    placeholder
                    alt="aircraft-img"
                    class="aspect-square w-full h-full max-w-[70px]"
                  />
                  <div class="flex flex-col">
                    <span class="block"> {{ plane?.aircraft_type }}</span>
                    <span class="block text-[12px] text-gray">
                      {{ plane?.aircraft_class }}
                    </span>
                    <div class="flex items-center gap-[20px] mt-[7px]">
                      <span class="text-[14px]">{{
                        priceFormat(plane?.price[getLoverCurrency(currencyFilter)], currencyFilter) }}</span>
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
            </template>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { I_CardsFull } from '~/types';

const { currencyFilter, listCards } = storeToRefs(useStore());
const pendingHeaderRoutes = computed(() => {
  return !listCards.value.length;
})
const props = defineProps<{
  setDetailRoutesID: (cardID: string) => void
  cardFull: I_CardsFull | null
}>();
const nowCardID = computed(() => {
  return props.cardFull ? getSimularCardId(props.cardFull, listCards.value) : '0';
})
</script>

<style>
.selected-card {
  background: #ebebeb;
  color: #000;
}
</style>