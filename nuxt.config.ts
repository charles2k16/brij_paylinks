// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig( {
  devtools: { enabled: true },
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  modules: [ '@element-plus/nuxt' ],
  css: [
    '~/assets/css/element/index.scss',
    '~/assets/css/index.scss',
    'element-plus/theme-chalk/display.css'
  ],
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
  },
} )
