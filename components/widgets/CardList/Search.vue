<script
  lang="ts"
  setup
>
  import type { T_Card } from '~/types';

  const { isBackLine, passengerCount, fromPort, toPort, datePort, dateBack, listCardsFilterd, getPortsState } = storeToRefs(useStore());
  const { setListCards, setDateBack, setDatePort, sendPorts } = useStore();
  const routesViewType = ref('sep')

  const route = useRoute()
  const { refresh } = useLazyFetch(useApiCora() + `requests/${route.params.slug}`, {
    key: Date.now().toString(),
    onResponse: ({ response }) => {
      const res = response._data
      console.log(route.params.slug, res);
      if (!res.cards) return
      setListCards(res.cards);
      passengerCount.value = res.query.pax_there;

      fromPort.value = useFindByIcao(res.query.departure_airport) ?? null;
      toPort.value = useFindByIcao(res.query.arrival_airport) ?? null;

      setDatePort(setDate(new Date(res.query.departure_date_there)))
      datePort.value.time = useFormatTime(res.query.departure_date_there);
      if (res.query.departure_date_back) {
        setDateBack(setDate(new Date(res.query.departure_date_back)))
        dateBack.value.time = useFormatTime(res.query.departure_date_back);
      }
    },
  });
</script>

<template>
  <template v-if="listCardsFilterd && listCardsFilterd.length > 0">
    <EntitiesCardRoutesSeparate
      v-for="card in listCardsFilterd"
      :key="card.id"
      :card
    />
  </template>

  <div
    v-else
    class="w-full h-full flex items-center flex-col text-center justify-center"
  >
    <span class="text-22"> Ничего не найдено.</span>
  </div>
</template>