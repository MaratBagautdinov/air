// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: true },
    modules: ["nuxt-icon", "@pinia/nuxt", "@nuxt/image", "nuxt-swiper", "nuxt-primevue", "nuxt-icons"],
    // pinia: {
    //     storesDirs: ["./stores/**"],
    // },
    image: {
        format: ["webp"],
    },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    primevue: {
        options: {
            unstyled: true
        },
        components: {
            include: ['InputMask']
        }
    },
    runtimeConfig: {
        public: {
            apiBase: "https://site-api-weltall.najet.ru/api/",
            apiCora: "https://core.najet.ru/api/",
            apiNajet: "https://media.najet.ru",
        },
    },
    // typescript: {
    //     typeCheck: true
    // },
    imports: {
        autoImport: true
      },
    plugins: ["~/plugins/vuedatepicker", "~/plugins/nuxt-hooks", "~/plugins/side-panel"],
});
