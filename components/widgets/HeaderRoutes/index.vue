<template>
  <WidgetsHeaderRoutesShimmer v-if="pendingHeaderRoutes || getPortsState.pending" />
  <div v-else-if="getPortsState.error.status"></div>
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
          v-for="(card, i) in listCards"
          :key="i"
          :class="`max-w-[300px] card-item p-3 ${nowCardID === card.id ? 'selected-card' : ''} `"
        >
          <NuxtLink
            @click.prevent="emit('setSimilarCard', card)"
            :to="{ path: `/flight/${card.id}` }"
          >
            <EntitiesCardRoutesMin :routes="card.routes" />
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>
  </template>
</template>

<script
  lang="ts"
  setup
>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import type { I_CardsFull, T_Card } from '~/types';
  import { getSimilarCardId } from "~/utils";

  const { listCards, getPortsState } = storeToRefs(useStore());
  const pendingHeaderRoutes = computed(() => {
    return !listCards.value.length;
  })

  const emit = defineEmits(['setSimilarCard'])
  const props = defineProps<{
    cardFull: I_CardsFull | T_Card | null
  }>();
  const nowCardID = computed(() => {
    return props.cardFull ? getSimilarCardId(props.cardFull, listCards.value) : '0';
  })
</script>

<style>
  .card-item.selected-card {
    background: #252525;
    border-radius: 8px;
  }

</style>