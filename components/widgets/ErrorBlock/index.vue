<template>
    <div class="l-wrapper err-wrap">
        <slot />
        <NuxtLink
            href="/"
            class="bg-white mt-2 text-22 text-dark p-[5px] px-5 rounded-[6px]"
        >
            Вернуться на главную страницу
        </NuxtLink>
    </div>
</template>

<script
    lang="ts"
    setup
>

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