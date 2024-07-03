<script
  setup
  lang="ts"
>
  const { isFilterOpened, getPortsState } = storeToRefs(useStore());
  const route = useRoute()
</script>

<template>
  <div :class="(getPortsState.pending || route.params.slug === '2') ? 'shimmer pr-2' : 'pr-2'">
    <button
      @click="isFilterOpened = !isFilterOpened"
      :class="`flex items-center gap-2 cursor-pointer`"
    >
      <span>Фильтры</span>
      <Icon
        name="Filter"
        size="30"
        class=""
      />
    </button>
    <WidgetsFilterMobile />
  </div>
</template>

<style scoped></style>
