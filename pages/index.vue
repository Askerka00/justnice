<script setup lang="ts">
import { ref, computed } from 'vue'
import { CAR_MODELS, FAQS } from '~/data/autoData'

// State for interactive calculator
const selectedCarId = ref('zeekr-001')
const optLocalization = ref(true)
const optSim = ref(true)
const optMasterAccount = ref(false)
const optMobileService = ref(false)

const activeCar = computed(() => CAR_MODELS.find(c => c.id === selectedCarId.value) || CAR_MODELS[0]!)

const calculatedTotal = computed(() => {
  let sum = 0
  if (optLocalization.value) sum += activeCar.value.basePrice
  if (optSim.value) sum += activeCar.value.simPrice
  if (optMasterAccount.value) sum += activeCar.value.masterAccountPrice
  if (optMobileService.value) sum += 15000 // Выезд по Алматы

  // Скидка при выборе полного пакета
  if (optLocalization.value && optSim.value && optMasterAccount.value && activeCar.value.masterAccountPrice > 0) {
    sum -= 20000
  }
  return sum
})

const whatsappBookingUrl = computed(() => {
  const parts = [
    `Здравствуйте! Хочу русифицировать авто в Алматы:`,
    `• Автомобиль: ${activeCar.value.name}`,
    `• Русификация экранов: ${optLocalization.value ? 'Да' : 'Нет'}`,
    `• Впайка 4G SIM-карты: ${optSim.value ? 'Да' : 'Нет'}`,
    activeCar.value.masterAccountPrice > 0 ? `• Мастер-аккаунт: ${optMasterAccount.value ? 'Да' : 'Нет'}` : '',
    optMobileService.value ? `• С выездом мастера в Алматы` : `• Приеду в бокс`,
    `• Ориентировочная сумма: ${calculatedTotal.value.toLocaleString('ru-RU')} ₸.`,
    `Когда ближайшее свободное окно для записи?`
  ].filter(Boolean).join('\n')

  return `https://wa.me/77003003390?text=${encodeURIComponent(parts)}`
})

// Schema.org Structured Data
useHead({
  title: 'Русификация китайских авто в Алматы — Zeekr, LiXiang, BYD, Geely, Changan | JUSTNICE AutoTech',
  meta: [
    {
      name: 'description',
      content: 'Профессиональная русификация, впайка 4G SIM-карты и активация мастер-аккаунтов для Zeekr 001/007, LiXiang L7/L9, BYD, Geely Monjaro в Алматы. Сохранение дилерской гарантии, лицензионный 2GIS и Яндекс Навигатор с камерами Сергек.'
    },
    {
      name: 'keywords',
      content: 'русификация авто алматы, русификация китайских авто алматы, русификация zeekr алматы, русификация lixiang алматы, русификация byd алматы, прошивка китайских авто казахстан, сим карта zeekr алматы, мастер аккаунт lixiang казахстан'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AutoRepair',
        'name': 'JUSTNICE AutoTech — Русификация и телематика авто в Алматы',
        'image': 'https://justnice.me/favicon.svg',
        'url': 'https://justnice.me',
        'telephone': '+77003003390',
        'priceRange': '₸₸',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'пр. Абая / ул. Саина',
          'addressLocality': 'Алматы',
          'addressRegion': 'Алматинская область',
          'addressCountry': 'KZ'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 43.238949,
          'longitude': 76.889709
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '09:00',
          'closes': '21:00'
        }
      })
    }
  ]
})
</script>

<template>
  <div class="relative min-h-screen bg-[#08090A] text-gray-100 overflow-x-hidden">
    <!-- Glow Highlights Background -->
    <div class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent blur-[140px]"></div>
    <div class="pointer-events-none absolute top-[1200px] right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[130px]"></div>

    <!-- 1. HERO SECTION -->
    <section class="relative pt-16 pb-20 md:pt-24 md:pb-28">
      <div class="mx-auto max-w-7xl px-6 text-center">
        <!-- Status Pill -->
        <div class="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-xs font-semibold text-cyan-300 mb-8 shadow-sm">
          <span class="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Официальное дилерское ПО 2026 • Лаборатория в Алматы</span>
        </div>

        <!-- H1 Headline -->
        <h1 class="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08]">
          Премиальная русификация и телематика <span class="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">китайских авто</span> в Алматы
        </h1>

        <!-- Subtitle -->
        <p class="mx-auto mt-6 max-w-3xl text-lg text-gray-300 sm:text-xl font-normal leading-relaxed">
          Полная программная адаптация <strong class="text-white font-semibold">Zeekr, LiXiang, BYD, Geely, Changan и Toyota</strong> под Казахстан. Родной перевод экранов и HUD, впайка 4G SIM-карты, 2GIS и Яндекс с камерами «Сергек» без потери заводской гарантии.
        </p>

        <!-- CTAs -->
        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#calculator"
            class="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-xl shadow-cyan-500/25 hover:from-cyan-300 hover:to-blue-400 hover:scale-105 transition-all"
          >
            Рассчитать для своего авто
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>

          <a
            href="https://wa.me/77003003390"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
          >
            Консультация инженера в WhatsApp
          </a>
        </div>

        <!-- Trust Badges -->
        <div class="mt-14 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 font-bold border border-cyan-400/20">🛡</div>
            <div>
              <p class="text-xs font-bold text-white uppercase tracking-wider">Гарантия 12 мес</p>
              <p class="text-[11px] text-gray-400">Безопасный бэкап системы</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400 font-bold border border-emerald-400/20">📶</div>
            <div>
              <p class="text-xs font-bold text-white uppercase tracking-wider">4G SIM в бардачок</p>
              <p class="text-[11px] text-gray-400">Beeline / Kcell / Tele2</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400 font-bold border border-blue-400/20">🗺</div>
            <div>
              <p class="text-xs font-bold text-white uppercase tracking-wider">2GIS + Сергек</p>
              <p class="text-[11px] text-gray-400">С онлайн-пробками Алматы</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400 font-bold border border-purple-400/20">⚡</div>
            <div>
              <p class="text-xs font-bold text-white uppercase tracking-wider">Выезд по Алматы</p>
              <p class="text-[11px] text-gray-400">Или бокс за 60-90 минут</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. BENTO GRID: ТЕХНОЛОГИЧЕСКИЕ ВОЗМОЖНОСТИ -->
    <section id="services" class="py-20 border-t border-white/5 bg-[#0A0D13]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-widest text-cyan-400">Инженерный уровень</span>
          <h2 class="mt-3 text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
            Комплексная адаптация под Казахстан
          </h2>
          <p class="mt-4 text-base text-gray-400">
            Мы не используем любительские прошивки. Только стабильные пакеты с сертификатами шифрования и аппаратной защитой блоков.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Bento 1: Large Span 2 -->
          <div class="md:col-span-2 glass-card glass-card-hover rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div class="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
            <div class="relative z-10">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 uppercase tracking-wider">01. Локализация</span>
              <h3 class="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
                Полный перевод экранов, приборки и проекции HUD
              </h3>
              <p class="text-gray-300 leading-relaxed text-sm md:text-base max-w-xl mb-6">
                Полное удаление иероглифов. Перевод бортового компьютера, систем автопилота, климат-контроля и настроек подвески. Шрифты подобраны в точном соответствии с заводским стилем марки.
              </p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-gray-300">
                <div class="flex items-center gap-2"><span class="text-cyan-400 font-bold">✓</span> Грамотная терминология</div>
                <div class="flex items-center gap-2"><span class="text-cyan-400 font-bold">✓</span> Проекция на лобовое стекло</div>
                <div class="flex items-center gap-2"><span class="text-cyan-400 font-bold">✓</span> Поддержка ночной темы</div>
              </div>
            </div>
          </div>

          <!-- Bento 2 -->
          <div class="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 uppercase tracking-wider">02. Связь</span>
            <h3 class="text-xl md:text-2xl font-bold text-white mt-4 mb-3">
              Выносной слот 4G Nano-SIM
            </h3>
            <p class="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
              Аппаратная интеграция слота под казахстанские SIM-карты в бардачок. Быстрая замена симки без вскрытия панелей. Высокоскоростной 4G-интернет для навигации и медиа.
            </p>
            <div class="rounded-xl bg-white/5 p-3 text-xs text-emerald-400 flex items-center gap-2 font-medium">
              <span>●</span> Поддержка Beeline, Kcell, Tele2, Altel
            </div>
          </div>

          <!-- Bento 3 -->
          <div class="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-400/10 text-blue-300 border border-blue-400/20 uppercase tracking-wider">03. Навигация</span>
            <h3 class="text-xl md:text-2xl font-bold text-white mt-4 mb-3">
              2GIS и Яндекс Навигатор
            </h3>
            <p class="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
              Лицензионные карты с точными контурами домов, внутридворовыми проездами и голосовым ассистентом. Предупреждение о камерах «Сергек» и автобусных полосах.
            </p>
            <div class="flex items-center gap-3 text-xs text-gray-300">
              <span class="px-2 py-1 rounded bg-white/5 border border-white/10 font-bold">2GIS</span>
              <span class="px-2 py-1 rounded bg-white/5 border border-white/10 font-bold">Яндекс</span>
              <span class="px-2 py-1 rounded bg-white/5 border border-white/10 font-bold">Waze</span>
            </div>
          </div>

          <!-- Bento 4: Large Span 2 -->
          <div class="md:col-span-2 glass-card glass-card-hover rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div class="relative z-10">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-purple-400/10 text-purple-300 border border-purple-400/20 uppercase tracking-wider">04. Телематика</span>
              <h3 class="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
                Активация Мастер-аккаунта (Master Account)
              </h3>
              <p class="text-gray-300 leading-relaxed text-sm md:text-base max-w-xl mb-6">
                Привязка автомобиля к официальному приложению Zeekr или Li Auto на вашем смартфоне с казахстанским номером `+7`. Дистанционный прогрев и охлаждение салона, запуск авто, Bluetooth-ключ и отслеживание геолокации.
              </p>
              <div class="flex flex-wrap gap-4 text-xs font-medium text-purple-300">
                <span class="bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">📱 Управление с iPhone и Android</span>
                <span class="bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">❄️ Запуск климата до посадки</span>
                <span class="bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">🔑 Цифровой ключ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. МОДЕЛИ АВТОМОБИЛЕЙ (Grid) -->
    <section id="models" class="py-20 bg-[#08090A]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-widest text-cyan-400">Каталог моделей</span>
          <h2 class="mt-3 text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
            Поддерживаемые автомобили
          </h2>
          <p class="mt-4 text-base text-gray-400">
            Готовые протестированные пакеты ПО под все популярные модели в Алматы.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="car in CAR_MODELS"
            :key="car.id"
            class="glass-card glass-card-hover rounded-3xl p-7 flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                  {{ car.brand }}
                </span>
                <span class="text-xs text-gray-400 font-medium">{{ car.year }}</span>
              </div>

              <h3 class="text-xl font-bold text-white mb-2">{{ car.name }}</h3>
              <p class="text-xs text-gray-400 mb-5">Платформа: {{ car.chipset }} • Срок: {{ car.timeHours }}</p>

              <ul class="space-y-2.5 mb-8">
                <li v-for="(feat, fIdx) in car.features" :key="fIdx" class="flex items-center gap-2.5 text-xs text-gray-300">
                  <span class="text-cyan-400 font-bold text-sm">✓</span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <div class="pt-5 border-t border-white/5 flex items-center justify-between">
              <div>
                <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Стоимость от</span>
                <span class="text-2xl font-black text-white tracking-tight">{{ car.basePrice.toLocaleString('ru-RU') }} ₸</span>
              </div>

              <a
                href="#calculator"
                @click="selectedCarId = car.id"
                class="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-bold text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
              >
                Рассчитать →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР СТОИМОСТИ -->
    <section id="calculator" class="py-20 border-t border-white/5 bg-[#0B0F17]">
      <div class="mx-auto max-w-5xl px-6">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-cyan-400">Онлайн-калькулятор</span>
          <h2 class="mt-3 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Точный расчет русификации для вашего авто
          </h2>
          <p class="mt-3 text-sm text-gray-400">
            Выберите модель и необходимые опции — узнайте итоговую стоимость без скрытых платежей.
          </p>
        </div>

        <div class="glass-card rounded-3xl p-8 md:p-12 border border-cyan-400/20 shadow-2xl relative">
          <!-- Step 1: Car Selection -->
          <div class="mb-8">
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">1. Выберите ваш автомобиль:</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              <button
                v-for="car in CAR_MODELS"
                :key="car.id"
                @click="selectedCarId = car.id"
                :class="selectedCarId === car.id ? 'border-cyan-400 bg-cyan-400/15 text-white font-bold' : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20'"
                class="rounded-xl border p-3 text-xs text-left transition-all"
              >
                <span class="block truncate">{{ car.name }}</span>
              </button>
            </div>
          </div>

          <!-- Step 2: Options Selection -->
          <div class="mb-10">
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">2. Выберите опции:</label>
            <div class="space-y-3">
              <label class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 cursor-pointer transition-all">
                <div class="flex items-center gap-3">
                  <input type="checkbox" v-model="optLocalization" class="h-4 w-4 rounded bg-gray-900 border-white/20 text-cyan-400 focus:ring-cyan-400">
                  <div>
                    <span class="text-sm font-semibold text-white block">Полная русификация интерфейса</span>
                    <span class="text-xs text-gray-400">Перевод мультимедиа, щитка приборов, HUD, климат-контроля</span>
                  </div>
                </div>
                <span class="text-sm font-bold text-cyan-400">+{{ activeCar.basePrice.toLocaleString('ru-RU') }} ₸</span>
              </label>

              <label class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 cursor-pointer transition-all">
                <div class="flex items-center gap-3">
                  <input type="checkbox" v-model="optSim" class="h-4 w-4 rounded bg-gray-900 border-white/20 text-cyan-400 focus:ring-cyan-400">
                  <div>
                    <span class="text-sm font-semibold text-white block">Выносной слот под физическую 4G SIM-карту</span>
                    <span class="text-xs text-gray-400">Слот в бардачок для казахстанских операторов Beeline/Kcell</span>
                  </div>
                </div>
                <span class="text-sm font-bold text-cyan-400">+{{ activeCar.simPrice.toLocaleString('ru-RU') }} ₸</span>
              </label>

              <label v-if="activeCar.masterAccountPrice > 0" class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 cursor-pointer transition-all">
                <div class="flex items-center gap-3">
                  <input type="checkbox" v-model="optMasterAccount" class="h-4 w-4 rounded bg-gray-900 border-white/20 text-cyan-400 focus:ring-cyan-400">
                  <div>
                    <span class="text-sm font-semibold text-white block">Активация и привязка Мастер-аккаунта</span>
                    <span class="text-xs text-gray-400">Управление с телефона: климат, запуск, геолокация и цифровой ключ</span>
                  </div>
                </div>
                <span class="text-sm font-bold text-cyan-400">+{{ activeCar.masterAccountPrice.toLocaleString('ru-RU') }} ₸</span>
              </label>

              <label class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 cursor-pointer transition-all">
                <div class="flex items-center gap-3">
                  <input type="checkbox" v-model="optMobileService" class="h-4 w-4 rounded bg-gray-900 border-white/20 text-cyan-400 focus:ring-cyan-400">
                  <div>
                    <span class="text-sm font-semibold text-white block">Выезд мобильной лаборатории к авто (Алматы)</span>
                    <span class="text-xs text-gray-400">Мастер приедет на ваш подземный паркинг или в офис со всем оборудованием</span>
                  </div>
                </div>
                <span class="text-sm font-bold text-cyan-400">+15 000 ₸</span>
              </label>
            </div>
          </div>

          <!-- Total & Booking Action -->
          <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span class="text-xs text-gray-400 uppercase tracking-wider block">Итоговая стоимость под ключ:</span>
              <div class="flex items-baseline gap-3">
                <span class="text-4xl font-extrabold text-white tracking-tight">{{ calculatedTotal.toLocaleString('ru-RU') }} ₸</span>
                <span class="text-xs text-emerald-400 font-medium">Время: ~{{ activeCar.timeHours }}</span>
              </div>
            </div>

            <a
              :href="whatsappBookingUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-emerald-500 transition-all hover:scale-105"
            >
              <span>Записаться в WhatsApp</span>
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. ПРОЦЕСС РАБОТЫ (4 Шага) -->
    <section id="process" class="py-20 border-t border-white/5 bg-[#08090A]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-widest text-cyan-400">Прозрачный регламент</span>
          <h2 class="mt-3 text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
            Как проходит русификация
          </h2>
          <p class="mt-4 text-base text-gray-400">
            Никаких рисков «окирпичивания». Все этапы проводятся по сертифицированному инженерному протоколу.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="glass-card rounded-3xl p-7 relative">
            <span class="text-4xl font-black text-cyan-400/20 block mb-4">01</span>
            <h3 class="text-lg font-bold text-white mb-2">Диагностика и бэкап</h3>
            <p class="text-xs text-gray-400 leading-relaxed">
              Подключаем оригинальное сканирующее оборудование, проверяем ревизию чипов и сохраняем полный образ заводской прошивки.
            </p>
          </div>

          <div class="glass-card rounded-3xl p-7 relative">
            <span class="text-4xl font-black text-cyan-400/20 block mb-4">02</span>
            <h3 class="text-lg font-bold text-white mb-2">Накатка локализации</h3>
            <p class="text-xs text-gray-400 leading-relaxed">
              Устанавливаем проверенный языковой пакет без слета настроек безопасности и с сохранением обновлений.
            </p>
          </div>

          <div class="glass-card rounded-3xl p-7 relative">
            <span class="text-4xl font-black text-cyan-400/20 block mb-4">03</span>
            <h3 class="text-lg font-bold text-white mb-2">SIM-слот и приложения</h3>
            <p class="text-xs text-gray-400 leading-relaxed">
              Выводим слот сим-карты, активируем 4G модем, настраиваем 2GIS Алматы, Яндекс и развлекательные сервисы.
            </p>
          </div>

          <div class="glass-card rounded-3xl p-7 relative">
            <span class="text-4xl font-black text-cyan-400/20 block mb-4">04</span>
            <h3 class="text-lg font-bold text-white mb-2">Тестирование и гарантия</h3>
            <p class="text-xs text-gray-400 leading-relaxed">
              Вместе с вами проверяем все функции авто, работу ассистентов вождения и выдаем гарантийный талон на 12 месяцев.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. ЧАСТЫЕ ВОПРОСЫ (FAQ) -->
    <section id="faq" class="py-20 border-t border-white/5 bg-[#0A0D13]">
      <div class="mx-auto max-w-4xl px-6">
        <div class="text-center mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-cyan-400">FAQ</span>
          <h2 class="mt-3 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Ответы на главные вопросы владельцев
          </h2>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, fIdx) in FAQS"
            :key="fIdx"
            class="glass-card rounded-2xl p-6 hover:border-cyan-400/30 transition-all"
          >
            <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span class="text-cyan-400 font-extrabold">Q:</span>
              {{ faq.q }}
            </h3>
            <p class="text-sm text-gray-400 leading-relaxed pl-6">
              {{ faq.a }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. ПЛАВАЮЩИЙ WHATSAPP ВИДЖЕТ -->
    <aside aria-label="Связаться в WhatsApp" class="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/77003003390?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D1%80%D1%83%D1%81%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B8%20%D0%B0%D0%B2%D1%82%D0%BE%20%D0%B2%20%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B."
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 rounded-full bg-[#25D366] p-4 text-white shadow-2xl hover:bg-[#20ba59] hover:scale-105 transition-all focus:outline-none"
        aria-label="Написать в WhatsApp"
      >
        <span class="relative flex h-3 w-3">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span class="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
        </span>
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.176 8.176 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/></svg>
        <span class="hidden sm:inline text-xs font-bold uppercase tracking-wider">Записаться онлайн</span>
      </a>
    </aside>
  </div>
</template>
