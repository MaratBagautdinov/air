<script
  setup
  lang="ts"
>
  import type { I_CardsFull } from "~/types";
  const { listCards, passengerCount, fromPort, toPort, datePort, dateBack, currencyFilter, isBackLine } = storeToRefs(useStore());
  const { sendPorts, setDatePort, setDateBack, setListCards } = useStore();
  const props = defineProps<{
    cardId: string
  }>();
  const emits = defineEmits(['update:setDetailRoutesID', 'update:setCardFull'])
  const {
    data,
    pending,
    error,
  } = useFetch<I_CardsFull>(useApiCora() + `cards/${props.cardId}`, {
    lazy: true,
    key: "get-detail",
    onResponse: async ({ response }) => {
      const res = response._data
      emits('update:setCardFull', res)

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
      await sendPorts().then((res) => {
        setListCards(res.cards);
      });
    },
  });
  const finalPrice = computed(() => {
    const merge_price = data.value?.routes?.reduce((prevVal, route) => {
      if (!route) return prevVal;
      return prevVal + route?.price[getLoverCurrency(currencyFilter.value)]
    }, 0)
    return priceFormat(Number(merge_price), currencyFilter.value);
  });

  watch([isBackLine], async () => {
    if (data.value) {
      const res = await sendPorts();
      const newCardID = getSimularCardId(data.value, res.cards)
      if (!newCardID) return null
      emits('update:setDetailRoutesID', newCardID)
      useRouter().replace(`/flight/${newCardID}`)
    }
  })
  const isOpenSidebar = ref<boolean>(false);

  const route = useRoute();
</script>

<template>
  <div class="relative card-full w-full min-h-20">
    <template v-if="pending">
      <div class="w-full py-[40px] grid gap-6 border-t ">
        <div class="flex justify-between">
          <ul class="items-center gap-[30px] flex">
            <li class="w-[250px] shimmer h-[60px]"></li>
            <li class="w-[250px] shimmer h-[60px]"></li>
          </ul>
          <div class="w-[180px] shimmer h-[60px]"></div>
        </div>
        <ul class="items-center gap-[30px] grid grid-cols-[1fr,2fr]">
          <li class="w-full shimmer h-[350px]"></li>
          <li class="w-full shimmer h-[350px]"></li>
        </ul>
      </div>
    </template>
    <template v-else-if="error">
      <div class="w-full h-full flex items-center flex-col text-center justify-center">
        Ошибка при получении данных
        <br />
        Код ошибки
        <pre>{{ error }}</pre>

        <a
          :href="route.fullPath"
          class="mt-2 text-22 text-blue-200"
        >
          Попробовать еще раз
        </a>
      </div>
    </template>
    <div
      v-else-if="data"
      class="border-t mb-[140px] max-[640px]:px-2 max-[500px]:mb-[220px]"
    >
      <template v-for="(route, i) in data.routes">
        <EntitiesRouteFull
          v-if="route"
          :route
          :datetime_local="data.datetime_local"
          :lineType="i"
          :key="route.flight_id"
        />
      </template>

      <WidgetsFlightBottomPanel
        :finalPrice
        v-model:isOpenSidebar="isOpenSidebar"
      />
      <WidgetsFlightForm v-model:isOpenSidebar="isOpenSidebar" />
    </div>
  </div>
</template>

<style scoped>
  .checkbox {
    background-color: transparent;
    width: 16px;
    height: 16px;
    border: 1px solid #787878;
    accent-color: transparent;
  }
</style>
