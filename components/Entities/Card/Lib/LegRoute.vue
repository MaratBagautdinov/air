<template>
    <div class="flex flex-col">
        <span :class="isOtherPort ? 'text-orange' : 'text-light'">
            {{
                airport?.name_rus
            }}
        </span>
        <span class="text-gray">
            {{
                airport?.city_rus
            }}
        </span>
        <span :class="isOtherTime ? 'text-orange' : 'text-light'">{{ date }}</span>
    </div>
</template>

<script
    lang="ts"
    setup
>

    const props = defineProps<{
        date: string
        airport_icao: string,
        isOtherPort: boolean
        isOtherTime: boolean
    }>()

    const date = useFormatTime(props.date)
    const airport = useFindByIcao(props.airport_icao)
</script>

<style></style>