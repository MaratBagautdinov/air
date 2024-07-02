<script
  lang="ts"
  setup
>
  import { TO_FROM } from "~/content";
  import type { LegsEntity, RoutesEntity } from "~/types";
  const { fromPort, toPort, datePort, dateBack } = storeToRefs(useStore());
  const props = defineProps<{
    aircraft_type: RoutesEntity['aircraft_type'],
    aircraft_class: RoutesEntity['aircraft_class'],
    leg?: LegsEntity,
    planeRoute: 'to' | 'from'
  }>()
  const windowWidth = useState<number>('winWidth')
  const otherPorts = computed(() => {
    if (!props.leg) return [];

    const arr = [];
    const { departure_airport, arrival_airport } = props.leg;

    if (props.planeRoute === 'to') {
      if (departure_airport !== fromPort.value?.icao) {
        arr.push(departure_airport);
      }

      if (arrival_airport !== toPort.value?.icao) {
        arr.push(arrival_airport);
      }
    }
    else if (props.planeRoute === 'from') {
      if (arrival_airport !== fromPort.value?.icao) {
        arr.push(arrival_airport);
      }

      if (departure_airport !== toPort.value?.icao) {
        arr.push(departure_airport);
      }
    }

    return arr;
  });
  const otherTimes = computed(() => {
    if (!props.leg) return [];

    const arr = [];
    const { start_date } = props.leg;

    if (props.planeRoute === 'to') {
      if (start_date !== `${datePort.value.date.date}T${datePort.value.time}:00Z`) {
        arr.push(start_date);
      }
    }
    else if (props.planeRoute === 'from') {
      if (start_date !== `${dateBack.value.date.date}T${dateBack.value.time}:00Z`) {
        arr.push(start_date);
      }
    }

    return arr;
  });
</script>

<template>
  <div class="flex flex-col justify-between">
    <div>
      <h3 :class="`text-${windowWidth > 640 ? 30 : 14} font-light uppercase`">
        {{ aircraft_type }}
      </h3>
      <span :class="`uppercase text-${windowWidth > 640 ? 18 : 12} text-gray`">
        {{ aircraft_class }}
      </span>
    </div>
    <div
      class="bg-orange text-black flex align-middle rounded-md text-center justify-center p-[3px] text-[13px]"
      v-if="otherPorts.length > 0"
    >Другой аэропорт</div>
    <div
      class="bg-orange text-black flex align-middle rounded-md text-center justify-center p-[3px] text-[13px]"
      v-if="otherTimes.length > 0"
    >Другое время</div>
    <div
      class="flex gap-4 flex-col"
      v-if="windowWidth > 640"
    >
      <EntitiesCardLibLeg
        v-if="leg"
        :planeRoute
        :otherPorts
        :otherTimes
        :leg
      />
    </div>
  </div>
</template>