<template>
    <div class="border px-[22px] py-5 border-white flex flex-col relative max-[640px]:border-x-0 max-[640px]:px-0">
        <div class="grid grid-cols-3 gap-2 h-full pb-5 max-[640px]:grid-cols-2 max-[640px]:gap-y-[40px]">
            <SearchCitySelect line-type="from" />
            <SearchCitySelect line-type="to" />
            <SearchDateSelect
                :date="datePort"
                @select-date="setDatePort"
                @select-time="(time) => { datePort.time = time }"
            />
        </div>
        <search-bottom-info
            @search="handleSearch"
            class="border-t border-light pt-5 max-[640px]:pt-2 max-[640px]:border-t-0"
        />
    </div>
</template>

<script setup lang="ts">
const { sendPorts, setDatePort } = useStore();
const { datePort } = storeToRefs(useStore());
const handleSearch = async () => {
    navigateTo({
        path: `/search/`,
    })
    await sendPorts().then((res) => {
        if (res.error) {
            alert(res.error.text)
            return
        } else {
            useRouter().replace(`/search/${res.id}`)
        }
    })
};

</script>


<style scoped></style>
