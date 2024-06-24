<script
  lang="ts"
  setup
>
  import type { RoutesEntity } from "~/types";

  const props = defineProps<{
    aircraft_type: RoutesEntity['aircraft_type'],
    aircraft_class: RoutesEntity['aircraft_class'],
    legs: RoutesEntity['legs'],
  }>()
  const windowWidth = useState<number>('winWidth')
  const legsEmpty = computed(() => props.legs?.filter((l) => !l.is_emptyleg))
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
      class="flex gap-4 flex-col"
      v-if="windowWidth > 640"
    >
      <EntitiesCardLibLeg
        v-for="(leg, i) in legsEmpty"
        :leg
        :key="i"
      />
    </div>
  </div>
</template>