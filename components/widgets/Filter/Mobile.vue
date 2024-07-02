<script
    setup
    lang="ts"
>
    import type { T_sortBy } from '~/types';

    const { isFilterOpened, sortBy, currencyFilter, aircraftTypeFilter, listCards, listCardsFilterd, getPortsState } = storeToRefs(useStore());
    const { setCurrency, setListCardsFilterd } = useStore();

    const setSortBy = (sortByNew: T_sortBy) => (sortBy.value = sortByNew);
    const setAircraftTypeFilter = (type: string) => {
        aircraftTypeFilter.value = aircraftTypeFilter.value === type ? '' : type
    };
    const handleFilterBtn = () => { isFilterOpened.value = false; };
    const aircraftTypes = computed(() => {
        const types: {
            label: string,
            img: string
        }[] = []
        listCards.value.forEach((card) => {
            card.routes?.forEach((route) => {
                if (!route || route === null) return;

                if (route.aircraft_type && !types.find((type) => type.label === route.aircraft_type)) {
                    if (types.find(t => t.label === route.aircraft_class)) return;
                    types.push({
                        label: route.aircraft_class,
                        img: useApiNajet() + route.aircraft_picture_urls.avatar
                    })
                }
            })
        })
        return types
    })
    watch([sortBy, aircraftTypeFilter], setListCardsFilterd)
    const route = useRoute()
</script>

<template>
    <transition name="slide-up">
        <div
            v-if="isFilterOpened"
            class="left-0 px-[20px] py-[30px] absolute top-[70px] right-0 z-50 border border-white bg-dark max-[542px]:px-2 max-[542px]:py-[20px] max-[542px]:left-0 max-[542px]:w-full"
        >
            <div class="w-full">
                <div class="grid grid-cols-2">
                    <button
                        @click="setSortBy('priceAsc')"
                        class="border border-white py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
                        :class="{ 'text-orange': sortBy === 'priceAsc' }"
                    >
                        Сначала недорогие
                    </button>
                    <button
                        @click="setSortBy('priceDesc')"
                        class="border border-white py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
                        :class="{ 'text-orange': sortBy === 'priceDesc' }"
                    >
                        Сначала дорогие
                    </button>
                    <button
                        @click="setSortBy('seats')"
                        class="border border-white py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
                        :class="{ 'text-orange': sortBy === 'seats' }"
                    >
                        По количеству мест
                    </button>
                    <button
                        @click="setSortBy('year')"
                        class="border border-white py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
                        :class="{ 'text-orange': sortBy === 'year' }"
                    >
                        По году выпуска
                    </button>
                </div>

                <div class="mt-10">
                    <span class="text-30">Класс</span>
                    <div class="grid grid-cols-3">
                        <button
                            v-for="type in aircraftTypes"
                            @click="setAircraftTypeFilter(type.label)"
                            class="group flex flex-col justify-between c-hover hover:bg-white/20 gap-[50px] px-[23px] py-[30px] border max-[542px]:px-1 max-[542px]:py-[20px]"
                            :class="{ 'text-orange': aircraftTypeFilter === type.label }"
                        >
                            <img
                                class="max-[542px]:w-full"
                                :src="type.img"
                                alt="type-fly-img"
                            />
                            <span class="text-18 c-hover group-hover:text-orange max-[542px]:text-[14px]">{{
                                type.label }}</span>
                        </button>
                    </div>
                </div>

                <div class="mt-[40px]">
                    <div class="grid grid-cols-3">
                        <button
                            @click="setCurrency('RUB')"
                            class="border border-white py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
                            :class="{ 'text-orange': currencyFilter === 'RUB' }"
                        >
                            В рублях
                        </button>
                        <button
                            @click="setCurrency('USD')"
                            class="border border-white py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
                            :class="{ 'text-orange': currencyFilter === 'USD' }"
                        >
                            В долларах
                        </button>
                        <button
                            @click="setCurrency('EUR')"
                            class="border border-white py-4 px-2 text-center text-18 c-hover hover:text-orange max-[542px]:text-[14px]"
                            :class="{ 'text-orange': currencyFilter === 'EUR' }"
                        >
                            В евро
                        </button>
                    </div>
                </div>

                <div class="mt-[40px]">
                    <button
                        @click="handleFilterBtn"
                        class="gap-4 flex items-center mx-auto"
                    >
                        <span class="text-30">
                            {{ listCardsFilterd.length }}
                            {{ getWordEnd(listCardsFilterd.length, ["вариант", "вариантов", "варианта"]) }}</span>
                        <Icon
                            name="ArrowDown"
                            size="20"
                            class="rotate-[270deg]"
                            stroke="#FF8562"
                        />
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped></style>