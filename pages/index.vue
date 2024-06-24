<script setup>
const { getPorts } = useStore();
const { getPortsState, datePort } = storeToRefs(useStore());

const windowWidth = useState("winWidth");

onBeforeMount(() => {
    datePort.value.time = "12:00";
});

onMounted(() => {
    getPorts();
});

useHead({
    title: "Онлайн-бронирование и продажа рейсов бизнес-авиации",
});
</script>

<template>
    <div class="l-wrapper">
        <section
            class="py-[70px] max-[640px]:py-[30px]"
            v-if="getPortsState.pending"
        >
            <shared-loader />
        </section>
        <section
            class="py-[70px] max-[640px]:py-[30px]"
            v-else-if="getPortsState.error.status"
        >
            <div class="w-full h-full flex items-center flex-col text-center justify-center">
                Ошибка при получении данных
                <br />
                Код ошибки
                <pre>{{ getPortsState.error.msg }}</pre>

                <a
                    href="javascript:void(0)"
                    @click="getPorts()"
                    class="mt-2 text-22 text-blue-200"
                >
                    Попробовать еще раз
                </a>
            </div>
        </section>
        <section
            v-else
            class="py-[70px] max-[640px]:py-[30px]"
        >
            <h1 class="text-20 font-medium uppercase text-white max-[640px]:px-2">поиск рейсов</h1>

            <div
                class="index-page grid h-[402px] grid-cols-[600px_1fr_1fr] gap-5 mt-5 overflow-hidden border border-transparent max-[1218px]:gap-2 max-[1000px]:grid-cols-[600px_1fr] max-[800px]:h-auto max-[800px]:grid-cols-1">
                <search-block class="c-hover hover:bg-[#1A1A1A]" />

                <!-- to="/pass-flights" -->
                <!-- c-hover hover:bg-[#1A1A1A] -->
                <nuxt-link
                    to="javascript:void(0)"
                    class="border border-white p-5 cursor-not-allowed max-[640px]:border-x-0"
                >
                    <article class="flex flex-col justify-between h-full max-[560px]:flex-row">
                        <div class="flex flex-col gap-2.5">
                            <h3 class="text-22 text-gray">Попутные рейсы</h3>
                            <p class="text-base text-gray leading-[18px] max-[560px]:hidden">
                                Особо выгодное предложение от авиакомпаний, которые совершают пустой перелет по вашему
                                маршруту
                            </p>
                        </div>

                        <div class="flex items-center justify-between">
                            <span class="text-22 text-gray leading-[24px]">Скоро</span>
                            <Icon
                                name="ArrowDown"
                                size="20"
                                stroke="#787878"
                            />
                        </div>
                    </article>
                </nuxt-link>

                <nuxt-link
                    v-if="windowWidth >= 1000 || windowWidth <= 800"
                    to="javascript:void(0)"
                    class="border border-white p-5 cursor-not-allowed max-[640px]:border-x-0"
                >
                    <article class="h-full flex flex-col justify-between max-[560px]:flex-row">
                        <div class="flex flex-col gap-2.5">
                            <h3 class="text-22 text-gray">По местам</h3>
                            <p class="text-base text-gray leading-[18px] max-[560px]:hidden">
                                Арендовать кресло в частном самолоете гораздо дешевле, чем взять в аренду самолет
                                целиком
                            </p>
                        </div>
                        <div class="flex items-center justify-between max-[560px]:gap-4">
                            <span class="text-22 text-gray leading-[24px]">Скоро</span>
                            <Icon
                                name="ArrowDown"
                                size="20"
                                stroke="#787878"
                            />
                        </div>
                    </article>
                </nuxt-link>
            </div>
        </section>
    </div>
</template>
