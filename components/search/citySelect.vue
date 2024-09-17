<script
  setup
  lang="ts"
>
  import type { T_Port, T_PortType } from "~/types";
  import { TO_FROM } from "~/content";

  const { selectPort, sendPorts, setListCards } = useStore();
  const { toPort, fromPort, getPortsState } = storeToRefs(useStore());

  const props = defineProps<{
    lineType: T_PortType
  }>()
  const port = {
    'to': toPort,
    'from': fromPort
  }[props.lineType]
  const portReferse = {
    'from': toPort,
    'to': fromPort
  }[props.lineType]

  const isOpened = ref(false);

  const openFromSearch = () => {
    isOpened.value = true;
  };

  const searchQuery = ref("");

  const filteredFromList = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return getPortsState.value.entity;
    return getPortsState.value.entity?.filter((item) => {
      return item?.name_rus?.toLowerCase().includes(query) || item?.city_rus?.toLowerCase().includes(query);
    });
  });

  const highlightText = (text: string) => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts
      .map((part) => (part.toLowerCase() === query ? `<b style="color: #FF8562;">${part}</b>` : part))
      .join("");
  };

  const pickPort = async (portNew: T_Port) => {


    if ((port.value?.name && portReferse.value?.name) && (portReferse.value?.name === portNew.name || port.value?.name === portNew.name)) {
      return
    }
    selectPort(props.lineType, portNew);
    isOpened.value = false;
    if (useRoute().path !== '/') {
      await useRouter().replace(`/search/2`)
      await sendPorts().then((res) => {
        setListCards(res.cards)
        useRouter().replace({ path: "/search/" + res.id });
      })
    }
  };
  type textReplacer = {
    to: string,
    from: string
  }

  const [to, from] = TO_FROM
  const texts: { [key: string]: textReplacer; } = {
    title: { to, from },
    select: {
      to: 'Выбрать аэропорт прилета',
      from: 'Выбрать аэропорт вылета'
    },
  }

</script>

<template>
  <div class="from-block flex flex-col gap-4 h-full w-full p-2">
    <span class="">{{ texts.title[lineType] }}</span>

    <button
      v-if="!port"
      @click="openFromSearch"
      class="flex-col flex text-left gap-5"
    >
      <span class="text-22 uppercase">{{ texts.select[lineType] }}</span>
      <Icon
        name="ArrowDown"
        stroke="#FF8562"
        size="20"
      />
    </button>

    <div
      v-else
      @click="openFromSearch"
      class="citySelect-card w-full justify-between flex flex-col gap-[6px] cursor-pointer"
    >
      <div>
        <span class="text-22 line-clamp-1">{{ port?.name_rus }}</span>
        <span class="text-18 text-gray line-clamp-1">{{ port?.city_rus }}</span>
      </div>
      <div>
        <span class="block text-orange">{{ port?.iata }}</span>
        <span class="block text-orange">{{ port?.icao }}</span>
      </div>
    </div>

    <transition name="slide-up bg-black h-full">
      <div
        v-if="isOpened"
        class=" pt-0 absolute inset-0 z-50 w-full h-full box-border"
      >
        <div
          class="bg-dark p-5 max-[920px]:pr-1 max-[920px]:pl-1 pb-0 h-full max-h-[100vh] grid grid-rows-[auto_1fr] gap-2 box-border"
        >
          <div class="sticky top-0 bg-dark w-full">
            <div class="form-head w-full flex justify-between">
              <span>{{ texts.title[lineType] }}</span>
              <span
                class="close-btn cursor-pointer"
                @click="isOpened = false"
              >
                <NuxtIcon name="close" />
              </span>
            </div>
            <div class="mt-[10px]">
              <input
                type="text"
                class="pb-[3px] border-b border-gray outline-none bg-transparent w-full text-20 font-thin"
                placeholder="Введите название города или аэропорт"
                v-model="searchQuery"
              />
            </div>
          </div>
          <div
            class="overflow-hidden h-[90vh] pb-5 w-full"
            v-if="filteredFromList && filteredFromList.length > 0"
          > 
            <ul class="bg-dark grid grid-cols-3 gap-[32px_8px] max-[640px]:grid-cols-2  overflow-y-scroll h-full ">
              <template v-for="(item, i) in filteredFromList">
                <li
                  v-if="item !== null"
                  :key="i"
                  :aria-disabled="(portReferse?.name === item.name) || (port?.name === item.name)"
                  :title="portReferse?.name === item.name
                    ? 'Аэропорт вылета не может совпадать с аэропортом назначения.'
                    : (port?.name === item.name)
                      ? 'Аэропорт уже выбран'
                      : item.name_rus"
                  :class="`flex flex-col gap-[6px] cursor-pointer rounded-xl p-[5px] c-hover hover:bg-[#1A1A1A]`"
                  @click="(portReferse?.name === item.name) || (port?.name === item.name) ? () => { } : pickPort(item)"
                >
                  <div>
                    <span
                      class="text-22 line-clamp-1"
                      v-html="highlightText(item.name_rus)"
                    />
                    <span
                      class="text-18 text-gray line-clamp-1"
                      v-html="highlightText(item.city_rus)"
                    />
                  </div>
                  <div>
                    <span class="block text-orange">{{ item.iata }}</span>
                    <span class="block text-orange">{{ item.icao }}</span>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div
            v-else
            class="flex items-center justify-center mt-7"
          >
            <span class="text-22">Ничего не найдено</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
  [aria-disabled=true] {
    opacity: .5;
    cursor: auto;

    &:hover {
      background: unset;
    }
  }

  @media (max-width: 920px) {
    .citySelect-card {
      width: 100vw;
      height: 100%;
      padding: 0;
    }
  }

</style>
