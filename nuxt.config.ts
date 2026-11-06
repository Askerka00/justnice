import tailwindcss from "@tailwindcss/vite";

const prerenderRoutes = [
  '/',
  '/brands/zeekr',
  '/brands/lixiang',
  '/brands/byd',
  '/brands/geely-monjaro',
  '/brands/changan',
  '/brands/toyota-china',
  '/brands/deepal',
  '/brands/tank',
  '/brands/hongqi',
  '/brands/chevrolet-monza',
  '/brands/hyundai-kia',
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
        { name: 'google-site-verification', content: '8SC6DHDD0rc0_IKD_7cy8muEYWuTrMav6TxsogKTkW8' },
        { name: 'yandex-verification', content: '72bce816922a2b27' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'author', content: 'JUSTNICE AutoTech Almaty' },
        { name: 'keywords', content: 'русификация авто алматы, русификация zeekr 001 алматы, русификация lixiang l9 алматы, прошивка geely monjaro алматы, русификация byd song plus алматы, русификация changan алматы, русификация тойота камри 80 алматы, установка 2gis и яндекс навигатор алматы' },
        { name: 'geo.region', content: 'KZ-ALA' },
        { name: 'geo.placename', content: 'Алматы' },
        { property: 'og:site_name', content: 'JUSTNICE — Профессиональная русификация китайских авто в Алматы' },
        { property: 'og:locale', content: 'ru_KZ' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://justnice.me/images/hero-car.jpg' },
        { property: 'og:image:width', content: '1376' },
        { property: 'og:image:height', content: '768' },
        { property: 'og:image:alt', content: 'JUSTNICE AutoTech — Русификация китайских авто в Алматы' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://justnice.me/images/hero-car.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap' }
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-4VXRH1FJX6',
          async: true
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-4VXRH1FJX6');`
        }
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
