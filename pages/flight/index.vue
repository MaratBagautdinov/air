<script
  setup
  lang="ts"
>
  import type { I_CardsFull, T_Card, T_STATE_ENTITY } from '~/types';

  const { listCards, getPortsState, passengerCount, fromPort, toPort, datePort, dateBack, currencyFilter, isBackLine } = storeToRefs(useStore());
  const { sendPorts, setDatePort, setDateBack, setListCards } = useStore();
  const route = useRoute();
  const detailRoutesID = ref<string | string[]>(route.params.slug);
  useHead({
    title: "Информация о рейсе",
  });
  useFetch<I_CardsFull>(useApiCora() + `cards/${route.params.slug}`, {
    lazy: true,
    key: "get-detail",
    onRequest: () => {
      cardFull.value = {
        entity: null,
        error: {
          msg: '',
          status: false,
        },
        pending: true
      }
    },
    onResponse: async ({ response }) => {
      const res = response._data
      cardFull.value = {
        entity: res,
        error: {
          msg: '',
          status: false,
        },
        pending: false
      }
      passengerCount.value = res.query.pax_there;

      fromPort.value = useFindByIcao(res.query.departure_airport) ?? null;
      toPort.value = useFindByIcao(res.query.arrival_airport) ?? null;

      setDatePort(setDate(new Date(res.query.departure_date_there)));
      datePort.value.time = useFormatTime(res.query.departure_date_there);
      if (res.query.departure_date_back) {
        isBackLine.value = true
        setDateBack(setDate(new Date(res.query.departure_date_back)));
        dateBack.value.time = useFormatTime(res.query.departure_date_back);
      }
      if (listCards.value.length === 0) {
        await sendPorts().then((res) => {
          setListCards(res.cards);
        });
      }
    },
  });
  const cardFull = ref<T_STATE_ENTITY<I_CardsFull | T_Card | null>>({
    entity: null,
    error: {
      msg: '',
      status: false,
    },
    pending: false
  })

  const handleSearch = async () => {
    if (!cardFull.value?.entity) return null
    const res = await sendPorts();
    setListCards(res.cards);
    const newCardID = getSimilarCardId(cardFull.value?.entity, res.cards)
    if (!newCardID) return null
    const cardNew = await $fetch<I_CardsFull>(useApiCora() + `cards/${newCardID}`)
    cardFull.value = {
      entity: cardNew,
      error: {
        msg: '',
        status: false,
      },
      pending: false
    }
    await useRouter().replace(`/flight/${newCardID}`)
  }
  const setSimilarCard = async (card: T_Card) => {
    cardFull.value = {
      entity: card,
      error: {
        msg: '',
        status: false,
      },
      pending: false
    }
    const cardNew = await $fetch<I_CardsFull>(useApiCora() + `cards/${card.id}`)
    cardFull.value = {
      entity: cardNew,
      error: {
        msg: '',
        status: false,
      },
      pending: false
    }
    await useRouter().replace(`/flight/${card.id}`)
  }
</script>

<template>
  <div class="l-wrapper">
    <section class="py-[70px] max-[640px]:py-[30px] relative">
      <search-header />
      <WidgetsHeaderRoutes
        v-if="cardFull?.entity"
        :cardFull="cardFull.entity"
        @setSimilarCard="setSimilarCard"
      />
      <NuxtPage
        v-if="cardFull.entity"
        :card="cardFull.entity"
        @handleSearchBack="handleSearch"
      />
    </section>
  </div>
</template>
