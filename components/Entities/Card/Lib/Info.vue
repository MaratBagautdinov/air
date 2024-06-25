<script
  lang="ts"
  setup
>
  import { TO_FROM } from "~/content";
  import type { LegsEntity, RoutesEntity } from "~/types";
  const { fromPort, toPort } = storeToRefs(useStore());
  const props = defineProps<{
    aircraft_type: RoutesEntity['aircraft_type'],
    aircraft_class: RoutesEntity['aircraft_class'],
    leg?: LegsEntity,
    planeRoute: 'to' | 'from'
  }>()
  const windowWidth = useState<number>('winWidth')
  const otherPorts = computed(() => {
    let arr: string[] = []
    if (!props.leg) return arr

    switch (props.planeRoute) {
      case 'to': {
        if (props.leg.departure_airport !== fromPort.value.icao) {
          arr.push(props.leg.departure_airport)
        }
        if ((props.leg.arrival_airport !== toPort.value?.icao)) {
          arr.push(props.leg.arrival_airport)
        }
        break;
      }
      case 'from': {
        if (props.leg.arrival_airport !== fromPort.value.icao) {
          arr.push(props.leg.arrival_airport)
        }
        if ((props.leg.departure_airport !== toPort.value?.icao)) {
          arr.push(props.leg.departure_airport)
        }
        break;
      }
    }
    return arr
  })
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
      class="flex gap-4 flex-col"
      v-if="windowWidth > 640"
    >
      <EntitiesCardLibLeg
        v-if="leg"
        :planeRoute
        :otherPorts
        :leg
      />
    </div>
  </div>
</template>