<script
  setup
  lang="ts"
>
  import type { I_CardsFull, T_Card } from "~/types";
  const { currencyFilter } = storeToRefs(useStore());
  const props = defineProps<{
    card: I_CardsFull & T_Card
  }>();
  const finalPrice = computed(() => {
    const merge_price = props.card?.routes?.reduce((prevVal, route) => {
      if (!route) return prevVal;
      return prevVal + route?.price[getLoverCurrency(currencyFilter.value)]
    }, 0)
    return priceFormat(Number(merge_price), currencyFilter.value);
  });


  const emit = defineEmits(['handleSearchBack'])
  const isOpenSidebar = defineModel<boolean>("isOpenSidebar")
</script>

<template>
  <div class="relative card-full w-full min-h-20">
    <div
      v-if="card"
      class="border-t mb-[140px] max-[640px]:px-2 max-[500px]:mb-[220px]"
    >
      <template v-for="(route, i) in card.routes">
        <EntitiesRouteFull
          v-if="route"
          :route
          :datetime_local="card.datetime_local"
          :lineType="i"
          :key="route.flight_id"
          @handleSearchBack="emit('handleSearchBack')"
        />
      </template>

      <WidgetsFlightBottomPanel
        :finalPrice
        v-model:isOpenSidebar="isOpenSidebar"
      />
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
