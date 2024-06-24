<script setup>
    const props = defineProps({
        text: {
            type: String,
            default: "Кнопка",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    });
</script>

<template>
    <button
        class="btn"
        :disabled="props.disabled"
    >{{ props.text }}</button>
</template>

<style scoped>
    .btn {
        @apply uppercase border border-white px-8 py-3.5 text-14 text-white transition-all duration-500 hover:bg-white hover:text-dark;
    }

    .btn:disabled {
        @apply opacity-50 hover:text-current hover:bg-transparent cursor-not-allowed;
    }
</style>
