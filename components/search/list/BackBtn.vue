<script setup>
    const { getPortsState, isBackLine } = storeToRefs(useStore());

    const emit = defineEmits(['handleSearchBack'])

</script>

<template>
    <div>
        <label
            class="flex items-center gap-2 cursor-pointer"
            :class="{ 'opacity-50 pointer-events-none': getPortsState.pending }"
            for="check"
        >
            <input
                v-model="isBackLine"
                class="checkbox"
                id="check"
                type="checkbox"
                @change="emit('handleSearchBack')"
            />
            <span class="flex">Обратный рейс</span>
        </label>
    </div>
</template>

<style scoped>
    .checkbox {
        background-color: transparent;
        width: 16px;
        height: 16px;
        border: 1px solid #787878;
        accent-color: transparent;
    }
</style>
