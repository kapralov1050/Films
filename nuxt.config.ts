// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  pages: true,

  css: ['~/assets/scss/main.scss'],
  
  components: [
    { path: '~/components', extensions: ['.vue'] } // автоматический импорт компонентов из папки
  ],

  imports: {
    autoImport: true // автоматический импорт composables (по умолчанию включен)
  },
  modules: ['@element-plus/nuxt', '@pinia/nuxt' ],
  
})
