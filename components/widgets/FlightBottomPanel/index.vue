<script
  lang="ts"
  setup
>
  import type { T_Currency } from "@/types";
  import queryString from "query-string";

  const props = defineProps<{
    finalPrice: string
  }>()
  const route = useRoute()
  const setNextCurrencyFilter = () => {
    const to: {
      'RUB': T_Currency,
      'USD': T_Currency,
      'EUR': T_Currency,
    } = {
      'RUB': 'USD',
      'USD': 'EUR',
      'EUR': 'RUB',
    }
    useStore().setCurrency(to[currencyFilter.value])
  };
  const { currencyFilter } = storeToRefs(useStore());
  const { toPort, fromPort } = storeToRefs(useStore());
  function stringToHTML(str: string): HTMLDivElement {
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  };
  const socialLinksText = `Weltall-avia: https://weltall.aero/ \r\n\r\nМаршрут ${fromPort.value?.city_rus} - ${toPort.value?.city_rus}: ${document.location.href}`;
  const socialLinks: { icon: string, href: string, label: string }[] = [
    {
      label: "Telegram",
      icon: 'telegram',
      href: `https://telegram.me/share/url?url=${socialLinksText}`
    },
    {
      label: "Whatsapp",
      icon: 'whatsapp',
      href: `https://api.whatsapp.com/send/?text=${socialLinksText}`
    },
    {
      label: "Mail",
      icon: 'mail',
      href: `mailto:?` + queryString.stringify({
        subject: `Список возможных маршрутов ${fromPort.value?.city_rus} - ${toPort.value?.city_rus}`,
        body: (socialLinksText)
      })
    }
  ]
  const isOpenSidebar = defineModel<boolean>("isOpenSidebar")
</script>

<template>
  <div class="fixed left-0 right-0 z-[100] bg-[#121212] bottom-0 w-full">
    <div class="l-wrapper">
      <div
        class="flex items-center justify-between border-y border-white py-[30px] max-[640px]:px-2 max-[500px]:flex-col max-[500px]:gap-[20px] max-[500px]:py-[20px]"
      >
        <span
          class="text-[45px] text-white cursor-pointer"
          @click="setNextCurrencyFilter()"
        >
          {{ finalPrice }}</span>
        <div class="flex gap-10 align-middle justify-center pannel-botom">
          <div class="social-links-wrap flex items-center gap-5">
            <span>Поделиться: </span>
            <div class="social-links-list flex gap-5">
              <NuxtLink
                target="_blank"
                class="social-link-item cursor-pointer"
                v-for="social in socialLinks"
                :to="social.href"
              >
                <nuxt-icon :name="`social/${social.icon}`" />
              </NuxtLink>
            </div>
          </div>
          <shared-btn
            @click="isOpenSidebar = true"
            text="отправить заявку"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  a.social-link-item {
    height: fit-content;
    opacity: .7;
    transition: .3s;
  }

  .social-link-item img {
    color: #ffffff
  }

  @media (max-width:920px) {

    .pannel-botom {
      flex-direction: column;
    }
  }

  a.social-link-item svg {
    width: 40px;
    height: 40px;
  }

  a.social-link-item:hover {
    opacity: 1;
  }
</style>