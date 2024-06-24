<script setup lang="ts">
import type { I_CardsFull } from '~/types';

const { setListCards } = useStore();
const route = useRoute();
const detailRoutesID = ref<string | string[]>(route.params.slug);
useHead({
  title: "Информация о рейсе",
});
const setDetailRoutesID = (cardID: string) => {
  detailRoutesID.value = cardID
}
const cardFull = ref<I_CardsFull | null>(null)
</script>

<template>
  <div class="l-wrapper">
    <section class="py-[70px] max-[640px]:py-[30px] relative">
      <search-header />
      <WidgetsHeaderRoutes
        :cardFull
        :setDetailRoutesID
      />
      <NuxtPage
        v-if="detailRoutesID"
        :cardId="detailRoutesID"
        :setDetailRoutesID
        v-model="cardFull"
      />
    </section>
  </div>
</template>
