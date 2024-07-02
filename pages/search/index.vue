<script
  setup
  lang="ts"
>
  const { isBackLine, getPortsState, passengerCount, datePort, dateBack, errorText, listCardsFilterd, toPort, fromPort, needSearch } = storeToRefs(useStore());
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
  const handleSearch = () => {
    sendPorts().then((res) => {
      setListCards(res.cards)
      useRouter().replace(`/search/${res.id}`)
    })
  }
</script>

<template>
  <div class="l-wrapper">
    <div class="py-[70px] relative max-[640px]:py-[30px]">
      <search-header />

      <div
        class="count_and_filter py-[20px] border-b border-white flex items-center justify-between max-[640px]:pt-0 max-[640px]:px-2 max-[640px]:w-full max-[640px]:border-b-0"
      >
        <span
          :class="` flex justify-between count-bl text-24 ${(getPortsState.pending || route.params.slug === '2') ? 'shimmer' : ''}`"
        >
          <div>
            {{ listCardsFilterd.length }}
            {{ getWordEnd(listCardsFilterd.length, ["вариантов", "вариант", "варианта"]) }}
          </div>
          <div
            v-if="needSearch"
            class="search-btn"
            @click="handleSearch"
          >

          </div>
        </span>

        <div class="flex items-center gap-[50px] max-[640px]:w-full max-[640px]:justify-between head-bottom">
          <search-list-passenger-count @handleSearch="handleSearch" />

          <search-list-filter-list />

          <search-list-back-btn @handleSearchBack="handleSearch" />
        </div>
      </div>

      <NuxtPage />

    </div>
  </div>
</template>

<style lang="scss">

  @media (max-width:920px) {
    .head-bottom {
      gap: 8px;
      flex-direction: column;
    }

    .search-btn {
      font-size: large;
      color: #424242;
      padding: 5px 15px;
      background-color: aliceblue;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      width: 80px;

      &::before {
        position: absolute;
        content: 'Искать';
        display: block;
        height: fit-content;
        width: fit-content;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 10;
        color: #424242
      }

      &::after {
        position: absolute;
        content: '';
        display: block;
        background: linear-gradient(90deg, rgba(178, 173, 251, 0) 0%, rgb(252, 223, 206) 47%, rgba(218, 218, 218, 0) 100%);
        transform: rotate(3deg);
        height: 120%;
        width: 120%;
        top: -5%;
        transition: .3s;
        animation-name: toRight;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        z-index: 0;
      }
    }

    @keyframes toRight {

      0%,
      100% {
        left: -120%;
      }

      50% {
        left: 100%;
      }
    }

    .head-bottom>* {
      border: 1px solid #424242;
      width: 100%;
      align-items: center;
      padding: 1rem;
      border-radius: 6px;
    }

    .count_and_filter {
      flex-direction: column;

      .count-bl {
        width: 100%;
        padding: 10px;
        margin-bottom: 1rem
      }
    }
  }
</style>
