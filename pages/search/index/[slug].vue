<template>
    <section class="py-[60px] max-[640px]:py-[30px] max-[640px]:pt-0 flex gap-2 transition-all">
        <ul class="flex flex-col gap-[40px] max-[640px]:px-2 max-[640px]:gap-[14px] w-full">
            <template v-if="getPortsState.pending || route.params.slug === '2'">
                <EntitiesCardRoutesSeparateShimmer />
                <EntitiesCardRoutesSeparateShimmer />
            </template>
            <WidgetsErrorBlock v-else-if="getPortsState.error.msg">
                <div class="flex items-center gap-[10px]">
                    <div class="text-[30px] font-bold">{{ fromPort?.city_rus }}</div>
                    <span class="text-[30px] font-bold">-</span>
                    <div class="text-[30px] font-bold">{{ toPort?.city_rus }}</div>
                </div>
                <div class="text-lg">
                    {{
                        getPortsState.error.msg
                    }}
                </div>
            </WidgetsErrorBlock>
            <WidgetsCardListSearch v-else />
        </ul>
        <!-- <WidgetsFilter v-if="windowWidth > 870" />
        <WidgetsFilterMobile v-else /> -->
    </section>
</template>

<script
    lang="ts"
    setup
>
    const windowWidth = useState<number>('winWidth')
    const { getPortsState, toPort, fromPort } = storeToRefs(useStore());
    const route = useRoute()

</script>

<style></style>