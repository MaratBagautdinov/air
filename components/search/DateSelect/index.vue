<script
  setup
  lang="ts"
>
  import type { T_Date, T_SearchDate, T_TIME } from "~/types";
  const { sendPorts, setListCards, getQuery } = useStore();
  const { isBackLine, needSearch } = storeToRefs(useStore());


  const props = defineProps<{
    date: T_SearchDate
    noText?: boolean
    onSelectTime: (time: T_TIME) => void
    onSelectDate: (date: T_Date) => void
  }>()
  const dateFull = ref<T_SearchDate>({ date: { ...props.date.date }, time: props.date.time });
  const daysCountBetween = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  const times = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
  const dates = computed(() => {
    const result: T_Date[] = []; // пикаем выбранную дату как дефолтную
    const daysCountBetweenNowAndSelected = daysCountBetween(dateFull.value.date.full, new Date());
    const firstI = (daysCountBetweenNowAndSelected < 2 ? 0 : daysCountBetweenNowAndSelected - 2);
    for (let i = firstI; i <= (firstI + 7); i++) {
      const date = getNextDateFull(new Date(), 1);
      date.setDate(date.getDate() + i);
      result.push(setDate(date));
    }

    return result;
  });
  const windowWidth = useState<number>("winWidth");
  const isOpened = defineModel<boolean>()
  const close = () => {
    isOpened.value = false
    dateFull.value = ({ date: { ...props.date.date }, time: props.date.time });
  }
  const submit = async () => {
    props.onSelectDate(setDate(dateFull.value.date.full));
    props.onSelectTime(dateFull.value.time);
    isOpened.value = false
    await useRouter().replace(`/search/2`)
    if (useRoute().fullPath !== '/') {
      await sendPorts().then((res) => {
        setListCards(res.cards)
        useRouter().replace({ path: "/search/" + res.id });
      })
    }
  }
  watch(dateFull, () => {
    needSearch.value = (dateFull.value.date.full.getDate() != props.date.date.full.getDate()) || (dateFull.value.time != props.date.time)
  }, {
    deep: true
  })
</script>

<template>
  <div class="flex flex-col gap-5 cursor-pointer date-wrap">
    <span
      v-if="!props.noText"
      class="max-[640px]:text-20 max-[640px]:uppercase max-[640px]:px-2 max-[640px]:hidden"
    >Когда</span>
    <div
      v-if="windowWidth >= 640"
      @click="useRoute().path !== (`/search/2`) ? isOpened = true : null"
      class="flex flex-col"
    >
      <span class="text-22">{{ date.date.formattedDate }}</span>
      <span class="text-22 text-gray">в {{ date.time }}</span>
    </div>
    <SearchDateSelectSwiper
      v-else
      :dates="dates.slice(0, Math.round(windowWidth / 100))"
      :times
      :submit
      v-model="dateFull"
    />
    <SearchDateSelectPop
      :dates
      :times
      :isOpened="isOpened ?? false"
      :submit
      :close
      v-model="dateFull"
    />
  </div>
</template>

<style>
  @media (max-width: 640px) {
    .date-wrap {
      grid-column: 1 / 3;
    }
  }
</style>