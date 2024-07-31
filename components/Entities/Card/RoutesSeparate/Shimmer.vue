<template>
  <li
    v-if="winWidth > 800"
    data-v-c03a4a04=""
    class="flex flex-col gap-3 last:pb-0 last:border-b-0 pb-[40px] max-[640px]:border-b-0 max-[640px]:pb-[14px] cards-item"
  >
    <div
      data-v-c03a4a04=""
      class="flex-col flex gap-[15px]"
      v-for="i in isBackLine ? [1, 2] : [1]"
    >
      <article
        data-v-c03a4a04=""
        class="flex gap-[31px] justify-between"
      >
        <div
          data-v-c03a4a04=""
          class="relative block w-[220px] h-[220px] photo-card-wrap card-item-lib-photo shimmer"
        >
        </div>
        <div
          data-v-c03a4a04=""
          class="flex w-full justify-between"
        >
          <div
            data-v-c03a4a04=""
            class="flex flex-col justify-between"
          >
            <div>
              <h3 class="text-30 font-light uppercase mb-[10px] shimmer">Hawker 700</h3><span
                class="uppercase text-18 text-gray shimmer"
              >Midsize jet</span>
            </div><!--v-if-->
            <div class="flex gap-4 flex-col">
              <div class="flex items-center gap-4">
                <div class="flex flex-col gap-1">
                  <span class="text-light shimmer">Внуково</span><span class="text-gray shimmer">Москва</span><span
                    class="text-gray shimmer"
                  >12:00</span>
                </div>
                <div class="flex flex-col gap-1"><span class="text-light shimmer">Сочи</span><span
                    class="text-gray shimmer"
                  >Адлер</span><span class="text-gray shimmer">15:41</span></div>
              </div>
            </div>
          </div>
          <div
            data-v-c03a4a04=""
            class="flex flex-col justify-between text-end"
          >
            <h3 class="text-30 font-light uppercase shimmer">3&nbsp;000&nbsp;270&nbsp;₽</h3>
            <div class="flex gap-4 align-bottom shimmer">
              <div class="shimmer w-[200px] h-[50px]"></div>
              <div class="flex items-center justify-end gap-[40px]"><span class="text-18 text-gray">1986</span><span
                  class="text-18 text-gray"
                >8 мест</span></div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </li>
  <li
    v-else
    data-v-c03a4a04=""
    class="last:pb-0 last:border-b-0 pb-[40px] border-b border-white max-[640px]:border-b-0 max-[640px]:pb-[14px] cards-item"
  >
    <div
      data-v-c03a4a04=""
      class="flex-col"
      v-for="i in isBackLine ? [1, 2] : [1]"
    >
      <article
        data-v-c03a4a04=""
        class="flex gap-[20px] items-center first:pb-[15px]"
      >
        <div
          data-v-c03a4a04=""
          class="relative block max-w-[220px] min-w-fit photo-card-wrap card-item-lib-photo "
        >
          <div class="photo-card aspect-square overflow-hidden w-[100px] h-[100px] block shimmer"></div>
        </div>
        <div
          data-v-c03a4a04=""
          class="card-item-r flex gap-[10px] justify-between flex-col"
        >
          <div
            data-v-c03a4a04=""
            class="flex flex-col justify-between"
          >
            <div>
              <h3 class="text-14 font-light uppercase shimmer">Hawker 800</h3><span
                class="uppercase text-12 text-gray shimmer"
              >Mid-size jet</span>
            </div><!--v-if--><!--v-if-->
          </div>
          <div
            data-v-c03a4a04=""
            class="flex h-full gap-[20px] justify-between"
          >
            <h3 class="text-16 font-light uppercase shimmer">21&nbsp;664&nbsp;€</h3>
            <div class="flex gap-4 align-bottom flex-col-reverse"><!--v-if-->
              <div class="flex items-center justify-end gap-[40px]"><span
                  class="text-14 text-gray shimmer">1992</span><span class="text-14 text-gray shimmer">8 мест</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </li>
</template>

<script
  lang="ts"
  setup
>
  const winWidth = useState<number>("winWidth")
  const { isBackLine } = storeToRefs(useStore());
</script>

<style>

  @media (max-width:920px) {}
</style>