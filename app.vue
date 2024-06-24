<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup>
const windowWidth = useState("winWidth", () => ref(window.innerWidth));
const handleResize = () => {
    windowWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});
</script>
