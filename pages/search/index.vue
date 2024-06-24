<script setup>

const windowWidth = useState("winWidth");

useHead({
  title: "Онлайн-бронирование и продажа рейсов бизнес-авиации",
});
</script>

<template>
  <div class="l-wrapper search-page">
    <div class="grid h-[130px] grid-cols-3 gap-3 mt-[20px]">
      <div class="h-full shimmer w-full"></div>
      <div class="h-full shimmer w-full"></div>
      <div class="h-full shimmer w-full"></div>
    </div>
    <div class="grid h-[60px] grid-cols-4 gap-3 mt-[20px]">
      <div class="h-full shimmer w-full"></div>
      <div class="h-full shimmer w-full"></div>
      <div class="h-full shimmer w-full"></div>
      <div class="h-full shimmer w-full"></div>
    </div>
    <section class="py-[70px] relative max-[640px]:py-[30px]">
      <ul class="flex flex-col gap-[40px] max-[640px]:px-2 max-[640px]:gap-[14px]">
        <!-- v-for="i in 3" :key="i" -->
        <li
          class="h-full pb-[40px] border-b border-white"
          v-for="i in [1, 2]"
        >
          <div class="shimmer-wrapper">
            <template v-if="windowWidth >= 640">
              <article class="flex justify-between">
                <div class="flex gap-[31px]">
                  <div class="shimmer w-[220px] h-[220px]"></div>
                  <div class="flex flex-col justify-between">
                    <div class="shimmer w-[220px] h-[70px]"></div>
                    <div class="shimmer w-[60px] h-[60px]"></div>
                  </div>
                </div>
                <div class="flex flex-col justify-between text-end">
                  <div class="shimmer w-[120px] h-[30px] mb-2 self-end"></div>
                  <div class="shimmer w-[220px] h-[100px]"></div>
                </div>
              </article>
            </template>
            <template v-else>
              <div class="flex items-center gap-[10px]">
                <div class="shimmer w-[90px] h-[90px]"></div>
                <div class="flex flex-col justify-between">
                  <span class="block shimmer w-[150px] h-[25px]"></span>

                  <div class="flex items-center gap-[20px] mt-[7px] shimmer w-full h-[24px]"></div>
                </div>
              </div>
            </template>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
