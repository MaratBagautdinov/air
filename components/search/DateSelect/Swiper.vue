<script
  setup
  lang="ts"
>
  import type { T_Date, T_SearchDate, T_TIME } from '~/types';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  const props = defineProps<{
    dates: T_Date[],
    times: T_TIME[]
    searchDate: T_SearchDate
    onSelectTime: (time: T_TIME) => void
    onSelectDate: (date: T_Date) => void
    setDateHandler: (fn: () => void) => void
  }>()

</script>

<template>
  <div class="border-y border-white py-[10px] px-2">
    <Swiper
      :slides-per-view="'auto'"
      :space-between="20"
    >
      <SwiperSlide
        class="!w-auto"
        v-for="(date, i) in dates"
        :key="i"
      >
        <div
          @click="onSelectDate(date)"
          class="flex flex-col w-fit"
        >
          <span
            :class="{ 'text-orange': searchDate.date.date === date.date }"
            class="text-18 whitespace-nowrap group-hover:text-orange c-hover"
          >
            {{ date.formattedDate }}
          </span>
          <span class="text-12 text-gray">{{ date.day }}</span>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  <div class="border-b border-white py-[10px] px-2">
    <Swiper
      :slides-per-view="'auto'"
      :space-between="20"
    >
      <SwiperSlide
        class="!w-auto"
        v-for="(time, i) in times"
        :key="i"
      >
        <div
          @click="onSelectTime(time)"
          :class="{ 'text-orange': searchDate.time === time }"
          class="c-hover text-18 hover:text-orange"
        >
          {{ time }}
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>