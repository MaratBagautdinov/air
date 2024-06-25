<script
  setup
  lang="ts"
>
  const { isBackLine, getPortsState, errorText, listCardsFilterd, toPort, fromPort } = storeToRefs(useStore());
  const { setListCards, sendPorts } = useStore();

  const windowWidth = useState<number>("winWidth");

  const handleSearch = () => {
    sendPorts().then((res) => {
      setListCards(res.cards)
      useRouter().replace(`/search/${res.id}`)
    })
  }
  const route = useRoute()
  watch([isBackLine], handleSearch)
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

          <search-list-back-btn v-if="windowWidth >= 640" />
        </div>
      </div>

      <NuxtPage />

    </div>
  </div>
</template>

<style scoped></style>
