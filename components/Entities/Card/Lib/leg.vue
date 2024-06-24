<template>
    <div class="flex items-center gap-4">
        <EntitiesCardLibLegRoute
            :date="leg.start_date"
            :airport_icao="leg.departure_airport"
        />
        <EntitiesCardLibLegRoute
            :date="leg.end_date"
            :airport_icao="leg.arrival_airport"
        />
    </div>
</template>

<script
    lang="ts"
    setup
>
    import type { LegsEntity } from '~/types';

    const props = defineProps<{
        leg: LegsEntity
    }>()
</script>
