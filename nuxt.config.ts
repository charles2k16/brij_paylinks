// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig( {
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: 'https://api.brij.money/api/v2',
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
    'maz-ui/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss'
  ],
  colorMode:{
    classSuffix:'',
    preference: 'system',
    fallback: 'dark'
  },
  tailwindcss: {
    // cssPath: '~/assets/css/tailwind.css',
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: 0 }],
    configPath: 'tailwind.config',
    exposeConfig: false,
    config: {},
    // injectPosition:0,  s
    viewer: true,
  },
  css: [
    '~/assets/css/element/index.scss',
    '~/assets/css/index.scss',
    'element-plus/theme-chalk/display.css',
  ],
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
  },
} )
