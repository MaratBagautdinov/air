<template>
    <SearchDateSelect
        :noText="true"
        v-model="isOpened"
        :date="datePort"
        @select-date="setDatePort"
        @select-time="(time) => { datePort.time = time }"
    />
</template>

<script lang="ts" setup>
const { datePort, isBackLine } = storeToRefs(useStore());
const { setDatePort } = useStore();

const isOpened = ref<boolean>(false);

// watch([isBackLine], () => {
//     if (isBackLine.value === false) {
//         isOpened.value = true
//     }
// })
</script>

<style></style>