<template>
  <template v-if="pendingHeaderRoutes">
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
          v-for="(card, i) in listCards"
          :key="i"
          :class="`max-w-[300px] card-item p-3 ${nowCardID === card.id ? 'selected-card' : ''} `"
        >
          <NuxtLink
            @click.prevent="emit('update:setDetailRoutesID', card.id)"
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
  import type { I_CardsFull } from '~/types';

  const { listCards } = storeToRefs(useStore());
  const pendingHeaderRoutes = computed(() => {
    console.log(!listCards.value.length, !props.cardFull);
    return !listCards.value.length;
  })

  const emit = defineEmits(['update:setDetailRoutesID'])
  const props = defineProps<{
    cardFull: I_CardsFull | null
  }>();
  const nowCardID = computed(() => {
    return props.cardFull ? getSimularCardId(props.cardFull, listCards.value) : '0';
  })
</script>

<style>
  .card-item.selected-card {
    background: #252525;
    border-radius: 8px;
  }

</style>