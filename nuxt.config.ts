// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://api.example.com/',
    },
  },
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  modules: [
    '@element-plus/nuxt',
    '@nuxt/image',
    'nuxt-icon',
    '@pinia/nuxt'
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
