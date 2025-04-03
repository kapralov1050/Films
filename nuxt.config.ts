// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  pages: true,

  css: ['~/assets/scss/main.scss'],

  image: {
    inject: true,
    format: ['webp', 'avif'],
    quality: 90,
    screens: {
      mobile: 320,
      tablet: 640,
      desktop: 1024
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables.scss" as *;
            @use "~/assets/scss/mixins.scss" as *;
          `
        }
      }
    }
  },
  
  components: [
    { path: '~/components', extensions: ['.vue'] } 
  ],

  imports: {
    autoImport: true 
  },
  
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],
})