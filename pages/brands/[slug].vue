<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

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
  features: string[]
}> = {
  'zeekr': {
    name: 'Zeekr',
    title: 'Русификация Zeekr 001, 007, 7X, 009, X в Алматы — Прошивка Zeekr OS 2026',
    metaDesc: 'Профессиональная русификация Zeekr 001/007/7X в Алматы. Перевод приборки, центрального экрана и проекции HUD. Навигатор 2GIS и Яндекс с камерами Сергек.',
    h1: 'Русификация Zeekr',
    summary: 'Официальные программные пакеты для Zeekr 001, 007, 7X, X и 009. Без потери заводской гарантии и стабильности автопилота NZP.',
    models: ['Zeekr 001 (Рестайл и Дорестайл)', 'Zeekr 007', 'Zeekr 7X', 'Zeekr X', 'Zeekr 009'],
    chipset: 'Qualcomm Snapdragon 8155 / 8295',
    timeHours: '1.5 – 2 часа',
    basePrice: 180000,
    features: [
      'Полный перевод центрального дисплея, приборной панели и HUD проекции',
      'Официальный Яндекс Навигатор и 2GIS со звуковыми подсказками',
      'Предупреждения о скоростных камерах «Сергек» и полосах Bus Lane',
      'Синхронизация часового пояса Алматы (UTC+5)',
      'Сохранение работы массажа, настроек пневмоподвески и автопарковки',
      'Гарантия 12 месяцев с бесплатным обновлением при OTA-релизах'
    ]
  },
  'lixiang': {
    name: 'LiXiang (Li Auto)',
    title: 'Русификация LiXiang L6, L7, L8, L9 в Алматы — Полный перевод дисплеев',
    metaDesc: 'Адаптация LiXiang L6/L7/L8/L9 в Алматы. Перевод 3-х дисплеев (включая потолочный экран), навигация 2GIS и Яндекс с камерами «Сергек».',
    h1: 'Русификация LiXiang',
    summary: 'Комплексная программная локализация мультимедийной системы Li Auto. Русификация экранчика на руле, пассажирского монитора и развлекательного потолочного экрана.',
    models: ['LiXiang L6 Pro / Max', 'LiXiang L7 Pro / Max / Ultra', 'LiXiang L8 Pro / Max', 'LiXiang L9 Max / Ultra'],
    chipset: 'Dual Qualcomm Snapdragon 8155 / 8295',
    timeHours: '2 – 2.5 часа',
    basePrice: 220000,
    features: [
      'Перевод всех дисплеев (приборка, центральный, пассажирский, потолочный)',
      'Официальный 2GIS Алматы с предупреждением о камерах контроля скорости',
      'Яндекс Навигатор с голосовым сопровождением Алисы',
      'Установка YouTube, Kinopoisk и интернет-радио',
      'Синхронизация времени с часовым поясом Алматы (UTC+5)',
      'Гарантия 12 месяцев на программное обеспечение'
    ]
  },
  'byd': {
    name: 'BYD',
    title: 'Русификация BYD Song Plus, Champion, Han, Seal в Алматы — DiLink 4.0/5.0',
    metaDesc: 'Русификация планшета BYD Song Plus, Han, Seal, Tang в Алматы. Разблокировка установки любых приложений (APK), Яндекс Карты, 2GIS, Waze, YouTube, Spotify и беспроводной CarPlay.',
    h1: 'Русификация BYD',
    summary: 'Локализация поворотного планшета DiLink для всей линейки гибридов и электрокаров BYD. Установка навигации с поддержкой дорожных камер Казахстана.',
    models: ['BYD Song Plus DM-i / EV', 'BYD Song Champion', 'BYD Han EV', 'BYD Seal', 'BYD Destroyer 05', 'BYD Tang'],
    chipset: 'Qualcomm Snapdragon 665 / 690 / DiLink 5.0',
    timeHours: '45 – 60 минут',
    basePrice: 55000,
    features: [
      'Полная русификация поворотного экрана и меню настроек',
      'Активация магазина приложений и свободная установка APK',
      'Установка 2GIS, Яндекс Навигатор, Spotify, YouTube Music',
      'Беспроводной Apple CarPlay и Android Auto',
      'Сохранение управления кондиционером и режимами езды',
      'Быстрая прошивка без разбора передней панели'
    ]
  },
  'geely-monjaro': {
    name: 'Geely Monjaro',
    title: 'Русификация Geely Monjaro, Coolray, Atlas в Алматы — Galaxy OS',
    metaDesc: 'Качественная русификация Geely Monjaro и Coolray в Алматы. Перевод всех трех экранов торпедо, русский голосовой ассистент, Яндекс Навигатор, четные частоты FM радио.',
    h1: 'Русификация Geely Monjaro и Coolray',
    summary: 'Фирменная прошивка для китайских Geely Monjaro и Coolray. Полная адаптация всех трех дисплеев передней панели с установкой навигации и русского голосового помощника.',
    models: ['Geely Monjaro (все комплектации)', 'Geely Coolray 2023–2026', 'Geely Atlas Pro / Boyue L', 'Geely Preface'],
    chipset: 'Qualcomm 8155 / Geely Galaxy OS',
    timeHours: '1 – 1.5 часа',
    basePrice: 65000,
    features: [
      'Перевод всех 3-х дисплеев передней консоли на чистый русский язык',
      'Голосовой помощник на русском языке (открытие люка, климат)',
      'Яндекс Навигатор и 2GIS на экране приборной панели',
      'Европейская сетка FM-радио (четные частоты)',
      'Сохранение 100% дилерской гарантии'
    ]
  },
  'changan': {
    name: 'Changan',
    title: 'Русификация Changan UNI-K, UNI-V, UNI-T в Алматы — Smart Cockpit',
    metaDesc: 'Прошивка и русификация Changan UNI-K, UNI-V, CS55 Plus в Алматы. Установка 2GIS, Яндекс Навигатора, CarPlay без потери дилерской гарантии за 45 минут.',
    h1: 'Русификация Changan UNI-серии',
    summary: 'Безопасная адаптация головного устройства Changan UNI-K, UNI-V, UNI-T и CS55. Полный русский язык в меню и приборной панели, Яндекс и 2GIS.',
    models: ['Changan UNI-K', 'Changan UNI-V', 'Changan UNI-T', 'Changan CS55 Plus / CS75 Plus'],
    chipset: 'Changan Smart Cockpit OS',
    timeHours: '40 – 60 минут',
    basePrice: 45000,
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
    h1: 'Русификация Toyota Camry 80 (КНР)',
    summary: 'Перепрошивка головных устройств и щитков приборов для китайских версий Toyota Camry 80, RAV4, Wildlander и Frontlander. Полноценная русификация и адаптация параметров.',
    models: ['Toyota Camry 80 (2024–2026)', 'Toyota RAV4 / Wildlander', 'Toyota Frontlander', 'Lexus RX / NX (КНР)'],
    chipset: 'Denso / Toyota Smart Connect',
    timeHours: '1.5 часа',
    basePrice: 160000,
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
  <div class="py-20 bg-white">
    <div class="container-audi">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs color-gray mb-10">
        <NuxtLink to="/" class="hover:text-black transition-colors">Главная</NuxtLink>
        <span>/</span>
        <span class="text-black font-medium">{{ currentBrand.name }}</span>
      </div>

      <!-- Hero for Brand -->
      <div class="border border-black p-8 md:p-14 mb-16 bg-[#fafafa]">
        <div class="max-w-4xl">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">
            Специализация {{ currentBrand.name }}
          </span>
          <h1 class="title-md text-black mt-3 mb-4">
            {{ currentBrand.h1 }}
          </h1>
          <p class="text-lg text-[#555555] font-light leading-relaxed mb-8">
            {{ currentBrand.summary }}
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-[#e5e5e5] text-xs">
            <div>
              <p class="color-gray uppercase font-medium">Чипсет</p>
              <p class="text-black font-medium text-sm mt-1">{{ currentBrand.chipset }}</p>
            </div>
            <div>
              <p class="color-gray uppercase font-medium">Время работы</p>
              <p class="text-black font-medium text-sm mt-1">{{ currentBrand.timeHours }}</p>
            </div>
            <div>
              <p class="color-gray uppercase font-medium">Стоимость</p>
              <p class="text-black font-bold text-base mt-1">от {{ currentBrand.basePrice.toLocaleString('ru-RU') }} тг</p>
            </div>
          </div>

          <div class="mt-8 btn-group">
            <a
              :href="whatsappBrandUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-black-primary"
            >
              <span>Записаться в WhatsApp</span>
              <span class="ml-2">→</span>
            </a>
            <NuxtLink to="/calculator" class="btn btn-black-default">
              <span>Конфигуратор стоимости</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Models & Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div class="border border-[#dedede] p-8">
          <h3 class="text-xl font-medium text-black mb-6">Поддерживаемые модификации</h3>
          <ul class="space-y-3">
            <li
              v-for="model in currentBrand.models"
              :key="model"
              class="flex items-center justify-between p-3.5 border border-[#eeeeee] text-sm"
            >
              <span class="font-medium text-black">{{ model }}</span>
              <span class="text-xs text-[#808080] font-light">Доступно</span>
            </li>
          </ul>
        </div>

        <div class="border border-[#dedede] p-8">
          <h3 class="text-xl font-medium text-black mb-6">Комплекс оснащения</h3>
          <ul class="space-y-3">
            <li
              v-for="feat in currentBrand.features"
              :key="feat"
              class="flex items-start gap-3 p-3.5 border border-[#eeeeee] text-xs text-[#444444] font-light"
            >
              <span class="text-[#f50537] font-bold">✓</span>
              <span>{{ feat }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
