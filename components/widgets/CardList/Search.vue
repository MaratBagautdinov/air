<script
  lang="ts"
  setup
>
  const { listCardsFilterd, getPortsState, toPort, fromPort } = storeToRefs(useStore());

</script>

<template>
  <template v-if="listCardsFilterd && listCardsFilterd.length > 0">
    <EntitiesCardRoutesSeparate
      v-for="card in listCardsFilterd"
      :key="card.id"
      :card
    />
  </template>
  <WidgetsErrorBlock v-else>
    <div
      class="flex items-center gap-[10px]"
      v-if="toPort?.city_rus && fromPort?.city_rus"
    >
      <div class="text-[30px] font-bold">{{ fromPort?.city_rus }}</div>
      <span class="text-[30px] font-bold">-</span>
      <div class="text-[30px] font-bold">{{ toPort?.city_rus }}</div>
    </div>
    <div class="text-lg">
      К сожалению, на заданный период времени все воздушные суда авиакомпании
      забронированы.<br> Попробуйте выбрать другие даты или Вы можете обратиться к нам по
      адресу <br> charter@weltall.ru или по телефону +7 (495) 129-29-04 и мы подберем Вам
      необходимый вариант.
    </div>
  </WidgetsErrorBlock>
</template>