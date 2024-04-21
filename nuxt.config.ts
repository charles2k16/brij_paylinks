// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: 'https://uat-api.brij.money/api/v2',
    },
  },
  components: [
    { path: '~/components', pathPrefix: true }
  ],
  modules: [
    '@element-plus/nuxt',
    '@nuxt/image',
    'nuxt-icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'maz-ui/nuxt'
],
  css: [
    '~/assets/css/element/index.scss',
    '~/assets/css/index.scss',
    'element-plus/theme-chalk/display.css',
    '~/assets/css/main.css'
  ],
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
