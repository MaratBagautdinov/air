<script
    setup
    lang="ts"
>

    const { fromPort, toPort, passengerCount } = storeToRefs(useStore());
    const emits = defineEmits(["search"]);

    const increment = () => {
        passengerCount.value += 1;
    };

    const decrement = () => {
        if (passengerCount.value > 1) {
            passengerCount.value -= 1;
        }
    };

    const isSearchDisabled = computed(() => {
        return !fromPort.value || !toPort.value;
    });
</script>

<template>
    <div class="flex items-center justify-between max-[640px]:flex-col max-[640px]:gap-[30px] max-[640px]:px-2">
        <div class="flex items-center gap-5 max-[425px]:w-full max-[425px]:justify-between">
            <div class="w-[160px] max-[425px]:w-full">
                <span class="text-base text-white">
                    Кол. пассажиров: {{ passengerCount }}
                </span>
            </div>

            <div class="flex items-center gap-[6px]">
                <Icon
                    @click="increment"
                    name="Plus"
                    size="30"
                    class="cursor-pointer"
                />
                <Icon
                    @click="decrement"
                    name="Minus"
                    size="30"
                    class="cursor-pointer"
                />
            </div>
        </div>
        <shared-btn
            text="искать"
            :disabled="isSearchDisabled"
            @click="emits('search')"
        />
    </div>
</template>

<style scoped></style>
