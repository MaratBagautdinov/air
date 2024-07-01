<script setup>

    const { passengerCount } = storeToRefs(useStore());

    const increment = () => {
        passengerCount.value += 1;
        debounceSearch()
    };

    const decrement = () => {
        if (passengerCount.value > 1) {
            passengerCount.value -= 1;
            debounceSearch()
        }
    };

    const emit = defineEmits(['handleSearch'])
    const router = useRouter();
    const debounceTimeout = ref(0)
    const debounceSearch = () => {
        if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
        debounceTimeout.value = setTimeout(async () => {
          emit('handleSearch')
        }, 3000);
    }
</script>

<template>

    <div class="flex items-center">
        <div class="flex items-center gap-2">
            <div class="">
                <span class="text-base text-white">
                    Кол. пассажиров {{ passengerCount }}
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
    </div>
</template>

<style scoped></style>
