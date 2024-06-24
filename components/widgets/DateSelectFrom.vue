<template>
    <SearchDateSelect
        v-if="dateBack && dateBack?.date && dateBack.time && isBackLine"
        :noText="true"
        v-model="isOpened"
        :date="dateBack"
        @select-date="setDateBack"
        @select-time="(time) => { dateBack.time = time }"
    />
</template>

<script lang="ts" setup>
const { dateBack, isBackLine } = storeToRefs(useStore());
const { setDateBack } = useStore();

const isOpened = ref<boolean>(false);

// watch([isBackLine], () => {
//     if (isBackLine.value === true) {
//         isOpened.value = true
//     }
// })
</script>

<style></style>