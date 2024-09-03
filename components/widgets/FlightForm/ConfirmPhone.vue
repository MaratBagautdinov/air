<template>
  <div>

    <form
      v-if="!formState.sended"
      @submit.prevent="handleConfirmPhone"
    >
      <span class="text-34">Подтверждение номера</span>

      <InputRow
        label="Номер телефона"
        placeholder="Номер телефона"
        type="tel"
        v-model="userData.phone"
        :required="true"
        :disabled="true"
      />
      <InputRow
        label="Код подтверждения"
        placeholder="Код подтверждения"
        type="string"
        v-model="userData.code"
        :required="true"
      />
      <div class="w-full mt-6">
        <shared-btn
          text="Подтвердить номер"
          class="w-full"
          type="submit"
        />
      </div>
      <p
        style="color: orangered"
        class="text-20 pt-3"
        v-if="formState.error = true"
      >
        {{ formState.msg ?? 'Ошибка подтверждения' }}
      </p>
    </form>
    <div
      v-else
      class="w-full h-full text-34"
    >
      Заявка успешно отправлена
    </div>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import InputRow from '~/components/shared/InputRow.vue';

  const props = defineProps<{
    phone: string;
  }>()
  const userData = ref({
    phone: props.phone,
    code: ""
  });

  const formState = ref({
    pending: false,
    sended: false,
    error: false,
    msg: ''
  });
  const route = useRoute();
  const handleConfirmPhone = async () => {
    formState.value.sended = false;
    formState.value.pending = true;
    formState.value.msg = '';
    try {
      const res = await $fetch<{
        error: string
        status: number
      } | {
        access_token: string
        need_data: boolean
        refresh_token: string
      }>(useApiUrl() + "auth/confirm_sms", {
        method: "POST",
        body: {
          phone: userData.value.phone,
          code: userData.value.code,
        },
      });

      if ('access_token' in res) {
        formState.value.sended = true;
        const confirmRes = await $fetch(useApiUrl() + "pre-orders", {
          method: "POST",
          body: {
            access_token: res.access_token,
            card_id: route.params.slug,
          },
        });
        console.log(confirmRes)
      } else {
        formState.value.error = true;
        formState.value.msg = 'Не верный код';
      }
    } catch (e) {
      console.error(e);
      formState.value.error = true;
      formState.value.msg = 'Не верный код';
    } finally {
      formState.value.pending = false;
    }
  };
</script>

<style></style>