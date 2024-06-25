<script
  setup
  lang="ts"
>
  import type { T_Date, T_SearchDate, T_TIME } from '~/types';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  const props = defineProps<{
    dates: T_Date[]
    times: T_TIME[]
    submit: () => void
  }>()

  const dateFull = defineModel<T_SearchDate>()
  const customPosition = () => ({ top: 0, left: -280 });
</script>

<template>
  <div
    class="border-y border-white py-[10px] px-2 flex"
    v-if="dateFull"
  >
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
          @click="dateFull.date.full = date.full"
          class="flex flex-col w-fit"
        >
          <span
            :class="{ 'text-orange': dateFull?.date.full.getDate() === date.full.getDate() }"
            class="text-18 whitespace-nowrap group-hover:text-orange c-hover"
          >
            {{ date.formattedDate }}
          </span>
          <span class="text-12 text-gray">{{ date.day }}</span>
        </div>
      </SwiperSlide>
    </Swiper>
    <vue-date-picker
      min
      v-model="dateFull.date.full"
      :min-date="getNextDateFull(new Date(), 1)"
      locale="ru"
      auto-apply
      dark
      no-today
      disable-year-select
      hide-offset-dates
      :enable-time-picker="false"
      :alt-position="customPosition"
    >
      <template #trigger>
        <Icon
          name="Calendar"
          size="30"
        />
      </template>
    </vue-date-picker>
  </div>
  <div
    class="border-b border-white py-[10px] px-2 mb-6 w-[99vw]"
    v-if="dateFull"
  >
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
          @click="dateFull.time = time"
          :class="{ 'text-orange': dateFull.time === time }"
          class="c-hover text-18 hover:text-orange"
        >
          {{ time }}
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>