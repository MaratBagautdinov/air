// sidebar for market assembly or in others
import VueSidePanel from "vue3-side-panel";
import "vue3-side-panel/dist/vue3-side-panel.css";
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueSidePanel);
});
