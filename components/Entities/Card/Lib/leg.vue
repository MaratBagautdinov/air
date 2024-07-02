<template>
    <div class="flex items-center gap-4">
        <EntitiesCardLibLegRoute
            :date="leg.start_date"
            :airport_icao="leg.departure_airport"
            :isOtherPort="otherPorts.includes(leg.departure_airport)"
            :isOtherTime="otherTimes.includes(leg.start_date)"
        />
        <EntitiesCardLibLegRoute
            :date="leg.end_date"
            :airport_icao="leg.arrival_airport"
            :isOtherPort="otherPorts.includes(leg.arrival_airport)"
            :isOtherTime="otherTimes.includes(leg.start_date)"
        />
    </div>
</template>

<script
    lang="ts"
    setup
>
    import type { LegsEntity } from '~/types';
    const props = defineProps<{
        leg: LegsEntity,
        planeRoute: 'to' | 'from',
        otherPorts: LegsEntity['departure_airport'][],
        otherTimes: LegsEntity['start_date'][]
    }>()
</script>
