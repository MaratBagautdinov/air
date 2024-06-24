<script
  lang="ts"
  setup
>
  import type { T_Card } from '~/types';

  const { listCardsFilterd } = storeToRefs(useStore());
  const routesViewType = ref('sep')

</script>

<template>
  <template v-if="listCardsFilterd && listCardsFilterd.length > 0">
    <template v-if="routesViewType === 'sep'">
      <EntitiesCardRoutesSeparate
        v-for="card in listCardsFilterd"
        :key="card.id"
        :card
      />
    </template>
    <template v-if="routesViewType === 'merge'">
      <EntitiesCardRoutesMerge
        v-for="card in listCardsFilterd"
        :key="card.id"
        :card
      />
    </template>
  </template>

  <div
    v-else
    class="w-full h-full flex items-center flex-col text-center justify-center"
  >
    <span class="text-22"> Ничего не найдено.</span>
  </div>
</template>