<script
  lang="ts"
  setup
>
  import type { T_Card } from '~/types';

  const { isBackLine, passengerCount, fromPort, toPort, datePort, dateBack, listCardsFilterd } = storeToRefs(useStore());
  const { setListCards, setDateBack, setDatePort } = useStore();
  const routesViewType = ref('sep')

  const route = useRoute()
  const { pending, refresh } = useLazyFetch(useApiCora() + `requests/${route.params.slug}`, {
    onResponse: ({ response }) => {
      const res = response._data
      if (!res.cards) return
      setListCards(res.cards);
      passengerCount.value = res.query.pax_there;

      fromPort.value = useFindByIcao(res.query.departure_airport) ?? null;
      toPort.value = useFindByIcao(res.query.arrival_airport) ?? null;

      setDatePort(setDate(new Date(res.query.departure_date_there)))
      datePort.value.time = useFormatTime(res.query.departure_date_there);
      if (res.query.departure_date_back) {
        isBackLine.value = true
        setDateBack(setDate(new Date(res.query.departure_date_back)))
        dateBack.value.time = useFormatTime(res.query.departure_date_back);
      }
    },
  });
</script>

<template>
  <template v-if="listCardsFilterd && listCardsFilterd.length > 0">
    <template v-if="routesViewType === 'sep'">
      <EntitiesCardRoutesSeparate
        v-for="card in listCardsFilterd"
        :key="card.id"
        :card
      />
    </template>
    <template v-if="routesViewType === 'merge'">
      <EntitiesCardRoutesMerge
        v-for="card in listCardsFilterd"
        :key="card.id"
        :card
      />
    </template>
  </template>

  <div
    v-else
    class="w-full h-full flex items-center flex-col text-center justify-center"
  >
    <span class="text-22"> Ничего не найдено.</span>
  </div>
</template>