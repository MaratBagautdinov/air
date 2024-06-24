import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// Используется в сертификатах не удалять
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("vue-date-picker", VueDatePicker);
});
