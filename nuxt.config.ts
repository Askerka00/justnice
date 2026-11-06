import tailwindcss from "@tailwindcss/vite";

const prerenderRoutes = [
  '/',
  '/brands/zeekr',
  '/brands/lixiang',
  '/brands/byd',
  '/brands/geely-monjaro',
  '/brands/changan',
  '/brands/toyota-china',
  '/calculator',
  '/sitemap.xml',
  '/robots.txt'
];

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#000000' },
        { name: 'author', content: 'JUSTNICE AutoTech Almaty' },
        { name: 'geo.region', content: 'KZ-ALA' },
        { name: 'geo.placename', content: 'Алматы' },
        { name: 'geo.position', content: '43.238949;76.889709' },
        { name: 'ICBM', content: '43.238949, 76.889709' },
        { property: 'og:site_name', content: 'JUSTNICE — Профессиональная русификация китайских авто в Алматы' },
        { property: 'og:locale', content: 'ru_KZ' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap' }
      ]
    }
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: prerenderRoutes
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
