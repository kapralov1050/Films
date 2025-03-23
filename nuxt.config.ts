// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  pages: true,

  css: ['~/assets/scss/main.scss'],
  
  components: [
    { path: '~/components', extensions: ['.vue'] } 
  ],

  imports: {
    autoImport: true 
  },
  
  modules: ['@element-plus/nuxt', '@pinia/nuxt' ],
})
