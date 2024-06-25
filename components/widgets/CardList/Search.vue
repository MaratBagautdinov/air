<script
  lang="ts"
  setup
>
  import type { T_Card } from '~/types';

  const { isBackLine, passengerCount, fromPort, toPort, datePort, dateBack, listCardsFilterd, getPortsState } = storeToRefs(useStore());
  const { setListCards, setDateBack, setDatePort, sendPorts } = useStore();
  const routesViewType = ref('sep')

  const route = useRoute()

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