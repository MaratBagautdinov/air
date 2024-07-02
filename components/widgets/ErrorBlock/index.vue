<template>
    <div class="l-wrapper err-wrap">
        <slot />
        <NuxtLink
            href="/"
            class="bg-white mt-2 text-22 text-dark p-[5px] px-5 rounded-[6px]"
        >
            Вернуться на главную страницу
        </NuxtLink>

        <div
            @click="handleSearch"
            class="bg-white mt-2 text-22 text-dark p-[5px] px-5 rounded-[6px] cursor-pointer"
        >
            Повторить поиск
        </div>
    </div>
</template>

<script
    lang="ts"
    setup
>
    const { sendPorts, setListCards } = useStore();
    const handleSearch = async () => {
        navigateTo({
            path: `/search/2`,
        })
        await sendPorts().then((res) => {
            setListCards(res.cards)
            useRouter().replace(`/search/${res.id}`)
        })
    };
</script>

<style>
    h1 {
        font-size: x-large;
    }

    .err-wrap {
        display: flex;
        align-items: center;
        gap: 30px;
        flex-direction: column;
        /* border: #fff 1px solid; */
        color: #fff;
        padding: 50px 20px;
    }
</style>