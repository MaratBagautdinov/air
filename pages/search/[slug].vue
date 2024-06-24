<script setup lang="ts">
const { isBackLine, getPortsState, passengerCount, fromPort, toPort, datePort, dateBack, listCardsFilterd } = storeToRefs(useStore());
const { setListCards, setDateBack, setDatePort, sendPorts } = useStore();

const windowWidth = useState<number>("winWidth");

onMounted(() => {
  setTimeout(() => {
    getPortsState.value.pending = false;
  }, 200);
});
const handleSearch = () => {
  navigateTo({
    path: `/search/`,
  })
  sendPorts().then((res) => {
    setListCards(res.cards)
    useRouter().replace(`/search/${res.id}`)
    getPortsState.value.pending = false
  })
}
watch([isBackLine], handleSearch)
const route = useRoute();

const { pending, error, refresh } = useLazyFetch(useApiCora() + `requests/${route.params.slug}`, {
  onResponse: ({ response }) => {
    const res = response._data
    console.log(res);
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
  <div class="l-wrapper">
    <div class="py-[70px] relative max-[640px]:py-[30px]">
      <div v-if="pending">
        <ul class="flex flex-col gap-[40px] max-[640px]:px-2 max-[640px]:gap-[14px]">
          <!-- v-for="i in 3" :key="i" -->
          <li class="last:pb-0 last:border-b-0 h-full pb-[40px] border-b border-white">
            <div class="shimmer-wrapper">
              <template v-if="windowWidth >= 640">
                <article class="flex justify-between">
                  <div class="flex gap-[31px]">
                    <div class="shimmer w-[220px] h-[220px]"></div>
                    <div class="flex flex-col justify-between">
                      <div class="shimmer w-[220px] h-[70px]"></div>
                      <div class="shimmer w-[60px] h-[60px]"></div>
                    </div>
                  </div>
                  <div class="flex flex-col justify-between text-end">
                    <div class="shimmer w-[120px] h-[30px] mb-2 self-end"></div>
                    <div class="shimmer w-[220px] h-[100px]"></div>
                  </div>
                </article>
              </template>
              <template v-else>
                <div class="flex items-center gap-[10px]">
                  <div class="shimmer w-[90px] h-[90px]"></div>
                  <div class="flex flex-col justify-between">
                    <span class="block shimmer w-[150px] h-[25px]"></span>

                    <div class="flex items-center gap-[20px] mt-[7px] shimmer w-full h-[24px]"></div>
                  </div>
                </div>
              </template>
            </div>
          </li>
        </ul>
      </div>
      <template v-else-if="error">
        <div class="w-full h-full flex items-center flex-col text-center justify-center">
          Ошибка при получении данных
          <br />
          Код ошибки
          <div class="mt-2 text-22 text-blue-200">
            Попробовать еще раз
          </div>
          <NuxtLink
            href="/"
            class="bg-white mt-2 text-22 text-dark pd-3 px-5 rounded-full"
          >
            Вернуться на главную страницу
          </NuxtLink>
        </div>
      </template>
      <template v-else>
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

        <search-header :refresh="refresh" />

        <div
          class="py-[20px] border-b border-white flex items-center justify-between max-[640px]:px-2 max-[640px]:w-full max-[640px]:border-b-0"
        >
          <span
            v-if="windowWidth >= 640"
            class="text-24"
          >
            {{ listCardsFilterd.length }}
            {{ getWordEnd(listCardsFilterd.length, ["вариантов", "вариант", "варианта"]) }}
          </span>

          <div class="flex items-center gap-[50px] max-[640px]:w-full max-[640px]:justify-between">
            <search-list-passenger-count />

            <search-list-filter-list />

            <search-list-back-btn v-if="windowWidth >= 640" />
          </div>
        </div>

        <section class="py-[60px] max-[640px]:py-[30px] max-[640px]:pt-0">
          <ul class="flex flex-col gap-[40px] max-[640px]:px-2 max-[640px]:gap-[14px]">
            <WidgetsCardListSearch />
          </ul>
        </section>
      </template>

    </div>
  </div>
</template>

<style scoped></style>
