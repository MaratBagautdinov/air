<script
  setup
  lang="ts"
>
  import type { T_Date, T_SearchDate, T_TIME } from '~/types';

  const props = defineProps<{
    dates: T_Date[]
    times: T_TIME[]
    isOpened: boolean
    submit: () => void
  }>()
  const dateFull = defineModel<T_SearchDate>()
  const customPosition = () => ({ top: -20, left: -280 });
</script>

<template>
  <transition name="slide-up">
    <div
      v-if="isOpened && dateFull"
      class="p-5 absolute top-[-1px] left-[-1px] z-50 w-[770px] border border-white h-[399px] bg-dark max-[754px]:h-auto max-[754px]:w-full"
    >
      <div>
        <div>
          <span class="">Дата вылета</span>
          <ul class="relative flex gap-[18px] mt-3">
            <li
              v-for="(date, i) in dates"
              :key="date.date"
              @click="dateFull.date.full = date.full"
              class="flex flex-col group"
            >
              <span
                :class="{ 'text-orange': dateFull?.date.full.getDate() === date.full.getDate() }"
                class="text-22 whitespace-nowrap group-hover:text-orange c-hover"
              >
                {{ date.formattedDate }}
              </span>
              <span class="text-gray">{{ date.day }}</span>
            </li>
            <li>
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
            </li>
          </ul>
        </div>

        <div class="mt-5">
          <span>Время вылета</span>
          <ul class="grid grid-cols-8 gap-[16px] mt-3 max-[754px]:grid-cols-6">
            <li
              v-for="time in times"
              :key="time"
              @click="dateFull.time = time"
              :class="{ 'text-orange': dateFull?.time === time }"
              class="c-hover text-22 hover:text-orange transpe"
            >
              {{ time }}
            </li>
          </ul>
        </div>

        <div class="mt-4 flex items-center justify-center">
          <shared-btn
            @click="submit"
            text="применить"
          />
        </div>
      </div>
    </div>
  </transition>
</template>