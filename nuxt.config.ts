// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-28',
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    '@nuxt/image'
  ],
  image: {
    provider: 'none'
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  css: ['~/assets/css/main.css'],
  googleFonts: {
    families: {
      Outfit: [300, 400, 500, 600, 700, 800],
      Heebo: [300, 400, 500, 600, 700, 800, 900],
      'DM Sans': [300, 400, 500, 600, 700],
    },
    display: 'swap'
  },
  devtools: { enabled: true },
  nitro: {
    routeRules: {
      '/**': { cors: true, headers: { 'access-control-allow-origin': '*' } }
    }
  }
})
