// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    app: {
        head: {
            title: "NexaVM",
            htmlAttrs: {
                lang: "en",
            },
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
        },
        pageTransition: { name: "fade", mode: "out-in" },
    },

    css: [
        "~/assets/css/variables.css",
        "~/assets/css/app.css",
        "~/assets/css/fonts.css",
        "~/assets/css/transitions.css",
        "~/assets/css/main.css"
    ],
    modules: [
        "@nuxt/content",
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/image",
        "@nuxtjs/i18n",
        "@vueuse/nuxt",
        "reka-ui/nuxt",
        "@nuxt/icon",
        'nuxt-nodemailer',
    ],

    nodemailer: {
        from: '"NexaVM" <noreply@nexavm.com>',
        host: 'authsmtp.securemail.pro',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@nexavm.com',
            pass: '0z*RkCVQR%f^Y9RPc@',
        },
    },
    icon: {
        mode: 'svg',

        customCollections: [
            {
                prefix: "local",
                dir: "./app/assets/icons",
            },
        ],
    },

    i18n: {
        defaultLocale: "en",
        locales: [
            { code: "en", name: "English", file: "en.json" },
            { code: "it", name: "Italiano", file: "it.json" },
        ],
        strategy: "prefix_except_default",
    },

    fonts: {
        families: [
            {
                name: "Roboto+Flex:opsz,wght@8..144,100..1000&display=swap",
                provider: "google",
            },
        ],
    },
});
