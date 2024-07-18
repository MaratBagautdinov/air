<script setup>
  const props = defineProps({
    label: String,
    placeholder: String,
    required: Boolean,
    type: "tel" | "text" | "number",
    disabled: Boolean,
  });
  const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-2 mt-4">
    <span class="text-20">{{ label }}</span>
    <InputMask
      class="w-full p-4 text-black"
      :required="required"
      v-if="type === 'tel'"
      :type="type"
      id="phone"
      v-model="model"
      mask="+7 (999) 999 99-99"
      :disabled="disabled"
      :placeholder="placeholder"
    />
    <input
      v-else
      class="w-full p-4 text-black"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="model"
    />
  </div>
</template>