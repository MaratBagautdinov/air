<template>
  <div v-if="route">
    <div class="mt-[40px] flex items-center justify-between">
      <div class="flex items-center gap-3 max-[520px]:flex-col max-[520px]:gap-1">
        <span
          v-if="isBackLine"
          class="route-type"
        >{{ TO_FROM[lineType] }}</span>
        <div class="flex items-center gap-10 max-[520px]:flex-col max-[520px]:gap-1 ">
          <h1 class="text-34 max-[460px]:text-22 h-fit">{{ route?.aircraft_type }}</h1>
          <span class="text-34 max-[460px]:text-22">{{ formatDateFromIso(route?.departure_date_local) }}</span>
        </div>
      </div>

      <search-list-back-btn
        v-if="lineType === 0"
        @handleSearchBack="emit('handleSearchBack')"
      />
    </div>

    <div class="mt-[30px] flex w-full gap-[30px] max-[1321px]:gap-[20px] max-[1321px]:flex-col max-[460px]:mt-[20px]">
      <div
        v-if="windowWidth >= 1321"
        class="max-w-[400px] w-full pt-[40px] px-5 pb-6 border border-white"
      >
        <nuxt-img
          class="mx-auto"
          :src="useApiNajet() + route?.aircraft_picture_urls?.avatar"
        />

        <div class="mt-4 text-center">
          <span class="text-18 uppercase">
            {{ formatDuration(route?.departure_date_local, route?.arrival_date_local) }}
          </span>
        </div>

        <div class="w-full h-[1px] bg-white my-8"></div>

        <span class="text-gray text-14 uppercase text-center w-full block">
          Технические характеристики
        </span>

        <ul class="grid grid-cols-2 gap-5 mt-7">
          <li class="flex flex-col">
            <span class="text-30">{{ route?.characteristics?.flying_range }} км</span>
            <span class="text-gray text-14">Дальность полёта</span>
          </li>
          <li class="flex flex-col">
            <span class="text-30">{{ route?.characteristics.cruising_speed }} км/ч </span>
            <span class="text-gray text-14">Крейсерская скорость</span>
          </li>
          <li class="flex flex-col">
            <span class="text-30">{{ route?.max_pax }} мест</span>
            <span class="text-gray text-14">Вместимость салона</span>
          </li>
          <li class="flex flex-col">
            <span class="text-30">{{ route?.aircraft_year_of_creation }}</span>
            <span class="text-gray text-14"> Год выпуска самолета</span>
          </li>
        </ul>

        <div class="mt-8 flex flex-col">
          <span class="">Предложение: №{{ route?.number }}</span>
          <span :class="`text-14 text-gray leading-[16px] ${!datetime_local ? 'shimmer' : ''}`">
            Информация является актуальной на {{ datetime_local ? testFOrmat(datetime_local) : '' }}. При
            необходимости свяжитесь с оператором по телефону: +7 (495) 129-29-04, назовите номер
            предложения для быстрой идентификации.
          </span>
        </div>
      </div>
      <div
        v-else
        class="flex items-center justify-between w-full"
      >
        <div class="mt-4 text-center">
          <span class="text-18 uppercase max-[460px]:text-12">
            {{ formatDuration(route?.departure_date_local, route?.arrival_date_local) }}
          </span>
        </div>
        <nuxt-img
          class="max-[460px]:w-[120px]"
          :src="useApiNajet() + route?.aircraft_picture_urls?.avatar"
        />
      </div>

      <div
        class="relative max-w-[750px] w-full max-[1321px]:max-w-full"
        v-if="gallery?.gallery"
      >
        <Swiper
          :navigation="{
            disabledClass: 'opacity-50',
          }"
          :modules="[SwiperPagination, SwiperNavigation]"
          :slides-per-view="1"
          :pagination="true"
        >
          <SwiperSlide
            class=""
            v-for="(img, i) in gallery?.gallery"
            :key="i"
          >
            <nuxt-img
              :src="useApiNajet() + img.image"
              loading="lazy"
              format="webp"
              alt="img-aircraft"
              class="aspect-[125/97] w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div
        v-if="windowWidth <= 1321"
        class="w-full"
      >
        <span class="text-gray uppercase w-full block"> Технические характеристики </span>

        <ul class="grid grid-cols-2 gap-[10px] mt-2">
          <li class="flex flex-col">
            <span class="text-20">{{ route?.characteristics?.flying_range }} км</span>
            <span class="text-gray text-12">Дальность полёта</span>
          </li>
          <li class="flex flex-col">
            <span class="text-20">{{ route?.characteristics.cruising_speed }} км/ч </span>
            <span class="text-gray text-12">Крейсерская скорость</span>
          </li>
          <li class="flex flex-col">
            <span class="text-20">{{ route?.max_pax }} мест</span>
            <span class="text-gray text-12">Вместимость салона</span>
          </li>
          <li class="flex flex-col">
            <span class="text-20">{{ route?.aircraft_year_of_creation }}</span>
            <span class="text-gray text-12">Год выпуска самолета</span>
          </li>
        </ul>

        <div class="mt-8 flex flex-col">
          <span class="">Предложение: №{{ route?.number }}</span>
          <span :class="`text-14 text-gray leading-[16px] ${!datetime_local ? 'shimmer' : ''}`">
            Информация является актуальной на {{ datetime_local ? testFOrmat(datetime_local) : '' }}. При
            необходимости свяжитесь с оператором по телефону: +7 (495) 129-29-04, назовите номер
            предложения для быстрой идентификации.
          </span>
        </div>
      </div>
    </div>

    <div class="mt-[60px]">
      <span class="text-gray uppercase w-full block min-[640px]:hidden mb-[20px]">Схема салона</span>
      <ul class="grid grid-cols-2 max-w-[600px] gap-x-16 gap-y-[10px] max-[500px]:grid-cols-1">
        <li class="flex item-center justify-between w-full">
          <span class="text-18 text-gray">Высота салона</span>
          <span class="text-18 text-white">{{ route?.characteristics?.cabin_height }} м</span>
        </li>
        <li class="flex item-center justify-between w-full">
          <span class="text-18 text-gray">Размах крыльев</span>
          <span class="text-18 text-white">{{ route?.characteristics?.wing_span }} м</span>
        </li>
        <li class="flex item-center justify-between w-full">
          <span class="text-18 text-gray">Длинна салона</span>
          <span class="text-18 text-white">{{ route?.characteristics?.cabin_length }} м</span>
        </li>
        <li class="flex item-center justify-between w-full">
          <span class="text-18 text-gray">Высота самолета</span>
          <span class="text-18 text-white">{{ route?.characteristics?.fuselage_height }} м</span>
        </li>
        <li class="flex item-center justify-between w-full">
          <span class="text-18 text-gray">Ширина салона</span>
          <span class="text-18 text-white">{{ route?.characteristics?.interior_width }} м</span>
        </li>
        <li class="flex item-center justify-between w-full">
          <span class="text-18 text-gray">Длинна самолета</span>
          <span class="text-18 text-white">{{ route?.characteristics?.fuselage_length }} м</span>
        </li>
      </ul>
    </div>

    <div class="mt-[80px] mx-auto max-[500px]:mt-[40px]">
      <nuxt-img
        :src="useApiNajet() + route?.aircraft_picture_urls?.seats"
        alt="salon-img"
        loading="lazy"
        format="webp"
        class="mx-auto"
      />
    </div>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import { TO_FROM } from '~/content';
  import type { I_CardsFull, RoutesEntity, T_FlightImages } from '~/types';
  const props = defineProps<{
    route: RoutesEntity
    datetime_local: I_CardsFull['datetime_local'] | null | undefined
    lineType: number
  }>()
  const { isBackLine } = storeToRefs(useStore());
  const gallery = await $fetch<T_FlightImages>(

    useApiNajet() + "/api/images/" + props.route.aircraft,
    {
      headers: {
        Accept: "application/json"
      },
    }
  );
  const emit = defineEmits(['handleSearchBack'])
  const testFOrmat = (isoDate: string) => {
    try {
      let date = new Date(isoDate);
      const day = date.getUTCDate().toString().padStart(2, "0");
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const year = date.getUTCFullYear();
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");

      return `${day}.${month}.${year}, ${hours}:${minutes}`;

    } catch (error) {
      console.log(error)
    }

  };

  const windowWidth = useState<number>("winWidth");
</script>

<style>
  .route-type {
    background: rgba(255, 255, 255, 0.1);
    padding: 5px 10px;
    border-radius: 8px;
  }
</style>