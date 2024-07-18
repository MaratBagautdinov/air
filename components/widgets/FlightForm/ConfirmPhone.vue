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
        type="number"
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
  });
  const handleConfirmPhone = async () => {
    formState.value.sended = false;
    formState.value.pending = true;

    try {
      const res = await $fetch(useApiUrl() + "auth/confirm_sms", {
        method: "POST",
        body: {
          phone: userData.value.phone,
          code: userData.value.code,
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

<style></style>