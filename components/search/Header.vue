<script
  setup
  lang="ts"
>
  import type { T_Date } from "~/types.js";
  const { fromPort, toPort, dateBack, datePort, isBackLine } = storeToRefs(useStore());
  const { sendPorts, setDateBack, setDatePort, setListCards } = useStore();

  const router = useRouter();


</script>

<template>
  <header
    class="grid grid-cols-3 border-b border-white  max-[640px]:grid-cols-2 max-[640px]:overflow-hidden max-[640px]:border-b-0"
  >
    <div
      class="flex items-center justify-between gap-1 pt-[20px] pb-[40px] max-[640px]:pt-[10px] pr-[20px] max-[640px]:px-2 max-[450px]:items-start max-[450px]:flex-col max-[450px]:pb-[20px]"
    >
      <SearchCitySelect line-type="from" />
    </div>

    <div
      class="flex items-center justify-between gap-1 px-[20px] max-[640px]:pt-[10px] pt-[20px] pb-[40px] border-x border-white max-[640px]:px-2 max-[640px]:border-x-0 max-[450px]:flex-col max-[450px]:items-start max-[450px]:pb-[20px]"
    >
      <SearchCitySelect line-type="to" />
    </div>

    <div
      class="flex items-center justify-between gap-1 pl-[20px] pt-[20px] pb-[40px] max-[640px]:col-span-2 max-[640px]:px-0 max-[640px]:pb-0"
    >
      <div class="flex flex-col">
        <span class="max-[640px]:text-20 max-[640px]:uppercase max-[640px]:px-2 text-[#FFFFFF5E] max-[640px]:hidden">
          Туда
        </span>
        <WidgetsDateSelectTo />
      </div>
      <div
        class="flex flex-col"
        v-if="isBackLine"
      >
        <span class="max-[640px]:text-20 max-[640px]:uppercase max-[640px]:px-2 text-[#FFFFFF5E] max-[640px]:hidden">
          Обратно
        </span>
        <WidgetsDateSelectFrom />
      </div>
    </div>
  </header>
</template>

<style>
  @media (min-width:920px) {
    .citySelect-card {
      flex-direction: row;
    }
  }


</style>
