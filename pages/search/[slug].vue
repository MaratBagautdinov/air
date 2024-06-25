<script
  setup
  lang="ts"
>
  const { isBackLine, getPortsState, errorText, listCardsFilterd, toPort, fromPort } = storeToRefs(useStore());
  const { setListCards, sendPorts } = useStore();

  const windowWidth = useState<number>("winWidth");

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
  const route = useRoute()
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
          <WidgetsErrorBlock v-if="getPortsState.error.msg">
            <div class="flex items-center gap-[10px]">
              <div class="text-[30px] font-bold">{{ fromPort?.name_rus }}</div>
              <span class="text-[30px] font-bold">-</span>
              <div class="text-[30px] font-bold">{{ toPort?.name_rus }}</div>
            </div>
            <div class="text-lg">
              {{
                getPortsState.error.msg
              }}
            </div>
          </WidgetsErrorBlock>
          <WidgetsCardListSearch v-else />
        </ul>
      </section>

    </div>
  </div>
</template>

<style scoped></style>
