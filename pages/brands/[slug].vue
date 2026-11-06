<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { CAR_MODELS } from '~/data/autoData'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const brandMap: Record<string, {
  name: string
  title: string
  metaDesc: string
  h1: string
  summary: string
  models: string[]
  chipset: string
  timeHours: string
  basePrice: number
  simPrice: number
  masterAccountPrice: number
  features: string[]
}> = {
  'zeekr': {
    name: 'Zeekr',
    title: 'Русификация Zeekr 001, 007, 7X, 009, X в Алматы — Прошивка Zeekr OS 2026',
    metaDesc: 'Профессиональная русификация Zeekr 001/007/7X в Алматы. Перевод приборки, центрального экрана и проекции HUD. Впайка слота Nano-SIM 4G, привязка мастер-аккаунта и навигатор с камерами Сергек.',
    h1: 'Русификация и телематика Zeekr в Алматы',
    summary: 'Полная программная адаптация Zeekr OS 5.x / 6.x для Zeekr 001, 007, 7X, X и 009. Без потери дилерской гарантии и стабильности систем автопилота NZP.',
    models: ['Zeekr 001 (Рестайл и Дорестайл)', 'Zeekr 007', 'Zeekr 7X', 'Zeekr X', 'Zeekr 009'],
    chipset: 'Qualcomm Snapdragon 8155 / 8295',
    timeHours: '1.5 – 2 часа',
    basePrice: 180000,
    simPrice: 85000,
    masterAccountPrice: 60000,
    features: [
      'Полный перевод центрального дисплея, приборной панели и HUD проекции',
      'Официальный Яндекс Навигатор и 2GIS со звуковыми подсказками',
      'Выносной слот под сим-карту в бардачок (Nano-SIM любого оператора РК)',
      'Мастер-аккаунт на номер РК: дистанционный климат и цифровой ключ',
      'Сохранение работы массажа, настроек пневмоподвески и автопарковки',
      'Гарантия 12 месяцев с бесплатным обновлением при OTA-релизах'
    ]
  },
  'lixiang': {
    name: 'LiXiang (Li Auto)',
    title: 'Русификация LiXiang L6, L7, L8, L9 в Алматы — Впайка SIM и Мастер-аккаунт',
    metaDesc: 'Адаптация LiXiang L6/L7/L8/L9 в Алматы. Перевод 3-х дисплеев (включая потолочный экран), вывод слота под SIM-карту 4G, мастер-аккаунт на казахстанский номер и YouTube/Кинопоиск.',
    h1: 'Русификация и адаптация LiXiang L6, L7, L8, L9 в Алматы',
    summary: 'Комплексная локализация мультимедийной системы Li Auto. Русификация приборного экранчика на руле, пассажирского монитора и развлекательного потолочного экрана.',
    models: ['LiXiang L6 Pro / Max', 'LiXiang L7 Pro / Max / Ultra', 'LiXiang L8 Pro / Max', 'LiXiang L9 Max / Ultra'],
    chipset: 'Dual Qualcomm Snapdragon 8155 / 8295',
    timeHours: '2 – 2.5 часа',
    basePrice: 220000,
    simPrice: 95000,
    masterAccountPrice: 75000,
    features: [
      'Перевод всех дисплеев (приборка, центральный, пассажирский, потолочный)',
      'Активация слота SIM-карты 4G без повреждения проводки',
      'Мастер-аккаунт Li Auto на номер РК для приложения Li Auto App',
      'Установка 2GIS, Яндекс Музыка, YouTube, Kinopoisk',
      'Синхронизация времени с часовым поясом Алматы (UTC+5)',
      'Гарантия 12 месяцев на программное обеспечение'
    ]
  },
  'byd': {
    name: 'BYD',
    title: 'Русификация BYD Song Plus, Champion, Han, Seal в Алматы — DiLink 4.0/5.0',
    metaDesc: 'Русификация планшета BYD Song Plus, Han, Seal, Tang в Алматы. Разблокировка установки любых приложений (APK), Яндекс Карты, 2GIS, Waze, YouTube, Spotify и беспроводной CarPlay.',
    h1: 'Русификация и разблокировка BYD в Алматы',
    summary: 'Локализация поворотного планшета DiLink для всей линейки гибридов и электрокаров BYD. Установка навигации с поддержкой дорожных камер Казахстана.',
    models: ['BYD Song Plus DM-i / EV', 'BYD Song Champion', 'BYD Han EV', 'BYD Seal', 'BYD Destroyer 05', 'BYD Tang'],
    chipset: 'Qualcomm Snapdragon 665 / 690 / DiLink 5.0',
    timeHours: '45 – 60 минут',
    basePrice: 55000,
    simPrice: 45000,
    masterAccountPrice: 30000,
    features: [
      'Полная русификация поворотного экрана и меню настроек',
      'Активация магазина приложений и свободная установка APK',
      'Установка 2GIS, Яндекс Навигатор, Spotify, YouTube Music',
      'Беспроводной Apple CarPlay и Android Auto',
      'Работает как от встроенного модема, так и от раздачи с телефона',
      'Сохранение управления кондиционером и режимами езды'
    ]
  },
  'geely-monjaro': {
    name: 'Geely Monjaro',
    title: 'Русификация Geely Monjaro, Coolray, Atlas в Алматы — Galaxy OS',
    metaDesc: 'Качественная русификация Geely Monjaro и Coolray в Алматы. Перевод всех трех экранов торпедо, русский голосовой ассистент, Яндекс Навигатор, четные частоты FM радио.',
    h1: 'Русификация Geely Monjaro и Coolray в Алматы',
    summary: 'Фирменная прошивка для китайских Geely Monjaro и Coolray. Полная адаптация всех трех дисплеев передней панели с установкой навигации и русского голосового помощника.',
    models: ['Geely Monjaro (все комплектации)', 'Geely Coolray 2023–2026', 'Geely Atlas Pro / Boyue L', 'Geely Preface'],
    chipset: 'Qualcomm 8155 / Geely Galaxy OS',
    timeHours: '1 – 1.5 часа',
    basePrice: 65000,
    simPrice: 50000,
    masterAccountPrice: 0,
    features: [
      'Перевод всех 3-х дисплеев передней консоли на чистый русский язык',
      'Голосовой помощник на русском языке (открытие люка, климат)',
      'Яндекс Навигатор и 2GIS на экране приборной панели',
      'Европейская сетка FM-радио (четные частоты)',
      'Возможность вывода отдельного слота под сим-карту в бардачок'
    ]
  },
  'changan': {
    name: 'Changan',
    title: 'Русификация Changan UNI-K, UNI-V, UNI-T в Алматы — Smart Cockpit',
    metaDesc: 'Прошивка и русификация Changan UNI-K, UNI-V, CS55 Plus в Алматы. Установка 2GIS, Яндекс Навигатора, CarPlay без потери дилерской гарантии за 45 минут.',
    h1: 'Русификация Changan UNI-серии в Алматы',
    summary: 'Безопасная адаптация головного устройства Changan UNI-K, UNI-V, UNI-T и CS55. Полный русский язык в меню и приборной панели, Яндекс и 2GIS.',
    models: ['Changan UNI-K', 'Changan UNI-V', 'Changan UNI-T', 'Changan CS55 Plus / CS75 Plus'],
    chipset: 'Changan Smart Cockpit OS',
    timeHours: '40 – 60 минут',
    basePrice: 45000,
    simPrice: 40000,
    masterAccountPrice: 0,
    features: [
      'Русификация приборной панели и мультимедиа',
      'Установка 2GIS и Яндекс с отображением камер Сергек',
      'Активация Apple CarPlay и Android Auto',
      'Выполнение работ без разбора передней панели салона',
      '100% сохранение заводской дилерской гарантии'
    ]
  },
  'toyota-china': {
    name: 'Toyota & Lexus (КНР)',
    title: 'Русификация Toyota Camry 80, RAV4, Wildlander (Китай) в Алматы',
    metaDesc: 'Русификация новых китайских Toyota Camry 80, RAV4 и Wildlander в Алматы. Европейская шкала приборов, км/ч, цельсии, четные FM частоты и русское меню.',
    h1: 'Русификация Toyota Camry 80 и RAV4 (КНР) в Алматы',
    summary: 'Перепрошивка головных устройств и щитков приборов для китайских версий Toyota Camry 80, RAV4, Wildlander и Frontlander. Полноценная русификация и адаптация параметров.',
    models: ['Toyota Camry 80 (2024–2026)', 'Toyota RAV4 / Wildlander', 'Toyota Frontlander', 'Lexus RX / NX (КНР)'],
    chipset: 'Denso / Toyota Smart Connect',
    timeHours: '1.5 часа',
    basePrice: 160000,
    simPrice: 70000,
    masterAccountPrice: 0,
    features: [
      'Полный перевод приборной панели и экрана мультимедиа',
      'Перевод единиц измерения: км/ч, литры/100км, температура в °C',
      'Европейская сетка FM-радиостанций',
      'Стабильная работа без конфликтов с системами безопасности Toyota Safety Sense',
      'Гарантия 12 месяцев на работу прошивки'
    ]
  }
}

const currentBrand = computed(() => {
  const s = slug.value
  return brandMap[s] || brandMap['zeekr']
})

const whatsappBrandUrl = computed(() => {
  const text = `Здравствуйте! Интересует русификация ${currentBrand.value.name} в Алматы. Подскажите детали и время записи?`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

useHead({
  title: computed(() => currentBrand.value.title),
  meta: [
    {
      name: 'description',
      content: computed(() => currentBrand.value.metaDesc)
    }
  ]
})
</script>

<template>
  <div class="py-16 px-6 max-w-7xl mx-auto">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-xs text-gray-400 mb-8">
      <NuxtLink to="/" class="hover:text-cyan-400">Главная</NuxtLink>
      <span>/</span>
      <span class="text-gray-400">Марки авто</span>
      <span>/</span>
      <span class="text-gray-200">{{ currentBrand.name }}</span>
    </div>

    <!-- Hero for Brand -->
    <div class="relative rounded-3xl border border-white/10 bg-[#0E1116] p-8 md:p-14 overflow-hidden mb-16 shadow-2xl">
      <div class="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]"></div>

      <div class="max-w-3xl relative z-10">
        <span class="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-400/10 px-3.5 py-1.5 rounded-full border border-cyan-400/20">
          Специализация по марке {{ currentBrand.name }}
        </span>
        <h1 class="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight leading-tight">
          {{ currentBrand.h1 }}
        </h1>
        <p class="text-gray-300 mt-4 text-base md:text-lg leading-relaxed">
          {{ currentBrand.summary }}
        </p>

        <!-- Quick Meta -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-xs">
          <div>
            <p class="text-gray-500 uppercase font-medium">Процессор / Платформа</p>
            <p class="text-white font-semibold mt-1">{{ currentBrand.chipset }}</p>
          </div>
          <div>
            <p class="text-gray-500 uppercase font-medium">Время работы</p>
            <p class="text-white font-semibold mt-1">{{ currentBrand.timeHours }}</p>
          </div>
          <div>
            <p class="text-gray-500 uppercase font-medium">Базовая стоимость</p>
            <p class="text-cyan-400 font-bold mt-1 text-sm">от {{ currentBrand.basePrice.toLocaleString('ru-RU') }} ₸</p>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-4">
          <a
            :href="whatsappBrandUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-emerald-500 transition-all"
          >
            Записаться на русификацию {{ currentBrand.name }}
          </a>
          <NuxtLink
            to="/calculator"
            class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:border-cyan-400/30 transition-all"
          >
            Рассчитать точную стоимость
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Supported Models & Features -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
      <div class="rounded-3xl border border-white/5 bg-[#0B0D11] p-8">
        <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <span class="text-cyan-400">✦</span> Поддерживаемые модели {{ currentBrand.name }}
        </h3>
        <ul class="space-y-3">
          <li
            v-for="model in currentBrand.models"
            :key="model"
            class="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <span class="text-sm font-semibold text-gray-200">{{ model }}</span>
            <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Поддерживается</span>
          </li>
        </ul>
      </div>

      <div class="rounded-3xl border border-white/5 bg-[#0B0D11] p-8">
        <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <span class="text-cyan-400">✦</span> Что входит в комплекс адаптации
        </h3>
        <ul class="space-y-3">
          <li
            v-for="feat in currentBrand.features"
            :key="feat"
            class="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <span class="text-cyan-400 mt-0.5">✓</span>
            <span class="text-sm text-gray-300">{{ feat }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Other Brands Nav -->
    <div class="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center">
      <h4 class="text-xs uppercase font-bold tracking-wider text-gray-400 mb-4">Другие поддерживаемые бренды в лаборатории JUSTNICE</h4>
      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLink to="/brands/zeekr" class="px-4 py-2 rounded-xl border border-white/5 text-xs text-gray-300 hover:border-cyan-400 hover:text-white transition-all">Zeekr</NuxtLink>
        <NuxtLink to="/brands/lixiang" class="px-4 py-2 rounded-xl border border-white/5 text-xs text-gray-300 hover:border-cyan-400 hover:text-white transition-all">LiXiang</NuxtLink>
        <NuxtLink to="/brands/byd" class="px-4 py-2 rounded-xl border border-white/5 text-xs text-gray-300 hover:border-cyan-400 hover:text-white transition-all">BYD</NuxtLink>
        <NuxtLink to="/brands/geely-monjaro" class="px-4 py-2 rounded-xl border border-white/5 text-xs text-gray-300 hover:border-cyan-400 hover:text-white transition-all">Geely Monjaro</NuxtLink>
        <NuxtLink to="/brands/changan" class="px-4 py-2 rounded-xl border border-white/5 text-xs text-gray-300 hover:border-cyan-400 hover:text-white transition-all">Changan UNI</NuxtLink>
        <NuxtLink to="/brands/toyota-china" class="px-4 py-2 rounded-xl border border-white/5 text-xs text-gray-300 hover:border-cyan-400 hover:text-white transition-all">Toyota (КНР)</NuxtLink>
      </div>
    </div>
  </div>
</template>
