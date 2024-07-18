<script
  lang="ts"
  setup
>

  import InputRow from "~/components/shared/InputRow.vue";
  const isOpenSidebar = defineModel<boolean>("isOpenSidebar")

  const userData = ref({
    name: "",
    mail: "",
    phone: "",
  });

  const formState = ref({
    pending: false,
    sended: false,
    error: false,
  });
  const handleOrderRoute = async () => {
    formState.value.sended = false;
    formState.value.pending = true;

    try {
      const res = await $fetch<{ its_new_user: boolean }>(useApiUrl() + "auth/send_login_sms", {
        method: "POST",
        body: {
          phone: userData.value.phone,
          its_legal: true,
          url: `https://air-api.na4u.ru/flight/${useRoute().params.slug}`,
          name: userData.value.name,
          email: userData.value.mail,
        },
      });

      if (res) {
        formState.value.sended = true;
      }
    } catch (e) {
      console.error(e);
      formState.value.error = true;
    } finally {
      formState.value.pending = false;
    }
  };
</script>

<template>
  <VueSidePanel
    z-index="10000"
    v-model="isOpenSidebar"
  >
    <div
      class="w-[700px] px-[50px] py-[70px] min-h-full bg-[#121212] max-[768px]:w-full max-[768px]:max-w-[500px] max-[640px]:px-[10px] max-[640px]:py-[40px]"
    >
      <div v-if="formState.pending">
        <shared-loader />
      </div>
      <div
        v-else-if="formState.error"
        class="relative"
      >
        <div class="w-full h-full flex flex-col gap-4">
          <span class="text-30 max-[640px]:text-20">
            При отправке заявки что-то пошло не так, попробуйте ещё раз</span>

          <button
            class="text-18"
            @click="formState.error = false"
          >Повторить еще раз</button>
        </div>
      </div>
      <div v-else>
        <form
          v-if="!formState.sended"
          class="h-full"
          @submit.prevent="handleOrderRoute"
        >
          <span class="text-34">Бронирование перелета</span>

          <InputRow
            label="Как к Вам обращаться?"
            placeholder="Ваше имя"
            type="text"
            v-model="userData.name"
            :required="true"
          />
          <InputRow
            label="Электронная почта"
            placeholder="Ваша почта"
            type="mail"
            v-model="userData.mail"
            :required="true"
          />
          <InputRow
            label="Номер телефона"
            placeholder="Номер телефона"
            type="tel"
            v-model="userData.phone"
            :required="true"
          />
          <div class="mt-5">
            <span class="text-18">
              На указанный адрес электронной почты, вы получите подтверждение получения заявки. После
              обработки заказа, на этот же адрес Вам будут направлены: договор фрахта воздушного
              судна, ссылка на оплату или счет и другие необходимые документы.
            </span>
          </div>

          <div class="mt-5 flex gap-4">
            <input
              class="checkbox mt-1"
              type="checkbox"
              required
            />
            <span class="text-16">
              Я ознакомлен(а) и принимаю
              <span class="underline">Условия использования персональных данных,</span>
              <span class="underline">Правила Сервиса NAJET,</span>
              <span class="underline">Компенсации за отказ от перевозки</span>
              и
              <span class="underline">Правила перелета пассажиров Авиакомпан ии.</span>
            </span>
          </div>

          <div class="w-full mt-6">
            <shared-btn
              text="заказать"
              class="w-full"
              type="submit"
            />
          </div>
        </form>
        <div
          v-else
          class="w-full h-full"
        >
          <WidgetsFlightFormConfirmPhone :phone="userData.phone" />
        </div>
      </div>
    </div>
  </VueSidePanel>
</template>