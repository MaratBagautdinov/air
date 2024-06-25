<script
  setup
  lang="ts"
>
  const { isBackLine, getPortsState, passengerCount, datePort, dateBack, errorText, listCardsFilterd, toPort, fromPort } = storeToRefs(useStore());
  const { setListCards, setDateBack, setDatePort, sendPorts } = useStore();

  const windowWidth = useState<number>("winWidth");
  const route = useRoute()

  getPortsState.value.pending = true;
  getPortsState.value.error.status = false;
  getPortsState.value.error.msg = '';
  const { data, refresh } = useLazyFetch(useApiCora() + `requests/${route.params.slug}`, {
    key: Date.now().toString(),
    onResponse: ({ response }) => {
      const res = response._data
      getPortsState.value.pending = false;
      if (res.error) {
        getPortsState.value.error.status = true;
        getPortsState.value.error.msg = res.error.text;
      }
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
  const handleSearchBack = () => {
    sendPorts().then((res) => {
      setListCards(res.cards)
      useRouter().replace(`/search/${res.id}`)
    })
  }
</script>

<template>
  <div class="l-wrapper">
    <div class="py-[70px] relative max-[640px]:py-[30px]">

      <div
        v-if="windowWidth <= 640"
        class="border-b border-white pb-[18px] px-2 flex items-center justify-between"
      >
        <span class="text-24">
          {{ listCardsFilterd.length }}
          {{ getWordEnd(listCardsFilterd.length, ["вариантов", "вариант", "варианта"]) }}
        </span>
        <search-list-back-btn />
      </div>

      <search-header />

      <div
        class="py-[20px] border-b border-white flex items-center justify-between max-[640px]:px-2 max-[640px]:w-full max-[640px]:border-b-0"
      >
        <span
          v-if="windowWidth >= 640"
          :class="`text-24 ${(getPortsState.pending || route.params.slug === '2') ? 'shimmer' : ''}`"
        >
          {{ listCardsFilterd.length }}
          {{ getWordEnd(listCardsFilterd.length, ["вариантов", "вариант", "варианта"]) }}
        </span>

        <div class="flex items-center gap-[50px] max-[640px]:w-full max-[640px]:justify-between">
          <search-list-passenger-count />

          <search-list-filter-list />

          <search-list-back-btn @handleSearchBack="handleSearchBack" />
        </div>
      </div>

      <NuxtPage />

    </div>
  </div>
</template>

<style scoped></style>
