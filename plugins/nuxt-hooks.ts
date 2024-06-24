export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("app:beforeMount", () => { });
    nuxtApp.hook("app:mounted", () => {
        useStore().setCurrency(localStorage.getItem("currency") ?? 'RUB');
        useStore().getPorts();
    });
    nuxtApp.hook("app:error", (err) => {
        console.log("hook app:error", err);
    });
    nuxtApp.hook("app:error:cleared", (er) => {
        console.log("hook app:error:cleared", er);
    });
    nuxtApp.hook("app:data:refresh", (er) => {
        // where calls refreshNuxtData
    });
    nuxtApp.hook("vue:error", (er) => {
        console.log("hook vue:error", er);
    });
});
