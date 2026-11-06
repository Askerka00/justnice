<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const servicesMap: Record<string, {
  name: string
  title: string
  metaDesc: string
  h1: string
  lead: string
  price: string
  duration: string
  details: string[]
  processSteps: { title: string; desc: string }[]
}> = {
  'sim-telematics': {
    name: 'Впайка и установка 4G SIM-слота',
    title: 'Установка SIM-слота 4G в Zeekr, LiXiang, Geely в Алматы — Быстрый интернет',
    metaDesc: 'Физическая установка и впайка слота Nano-SIM 4G для китайских авто в Алматы. Постоянный интернет для навигации, онлайн-музыки и пробок без разбора салона.',
    h1: 'Впайка и установка слота 4G SIM-карты в Алматы',
    lead: 'Предоставляем китайским автомобилям постоянный высокоскоростной интернет в сетях казахстанских операторов (Beeline, Kcell/Activ, Tele2/Altel) через надежный выносной слот Nano-SIM.',
    price: 'от 40 000 ₸',
    duration: '1 – 1.5 часа',
    details: [
      'Установка внешнего металлического слота для быстрой замены сим-карты',
      'Расположение слота в штатном бардачке или скрытой нише консоли',
      'Использование заводских экранированных кабелей без радиопомех',
      'Поддержка любых тарифов с безлимитным интернетом операторов Казахстана',
      'Работа штатной навигации, онлайн-радио, YouTube и удаленного доступа',
      'Сохранение целостности проводки и гарантия 12 месяцев'
    ],
    processSteps: [
      { title: 'Диагностика телематического блока', desc: 'Тестируем штатный модем T-Box и согласовываем место установки слота' },
      { title: 'Прецизионный монтаж', desc: 'Инженер под микроскопом выводит контакты слота Nano-SIM с защитой от вибраций' },
      { title: 'Установка сим-карты и настройка APN', desc: 'Конфигурируем точки доступа для мгновенного подключения к 4G LTE' },
      { title: 'Финальное тестирование скорости', desc: 'Проверяем скорость загрузки, работу онлайн-навигатора и стриминга' }
    ]
  },
  'firmware-apps': {
    name: 'Установка 2GIS, Яндекс и приложений',
    title: 'Установка Яндекс Навигатора и 2GIS на китайские авто в Алматы',
    metaDesc: 'Инсталляция лицензионного 2GIS, Яндекс Карт, YouTube, Spotify и Apple CarPlay на Zeekr, LiXiang, BYD, Geely в Алматы. Предупреждения о камерах Сергек.',
    h1: 'Установка приложений, Яндекс и 2GIS с камерами «Сергек»',
    lead: 'Превратите штатный дисплей вашего автомобиля в мультимедийный центр. Полноценная навигация по Алматы и Казахстану с дорожной ситуацией, пробками и скоростными камерами.',
    price: 'от 35 000 ₸',
    duration: '30 – 60 минут',
    details: [
      'Официальный 2GIS Алматы со всеми развязками и актуальными полосами Bus Lane',
      'Яндекс Навигатор с голосовым сопровождением Алисы',
      'Оповещения о стационарных и мобильных камерах фиксации нарушений «Сергек»',
      'YouTube, Kinopoisk, Spotify, Яндекс Музыка и интернет-радио',
      'Активация беспроводного Apple CarPlay и Android Auto',
      'Возможность самостоятельной установки приложений через флешку или маркет'
    ],
    processSteps: [
      { title: 'Разблокировка инсталлятора', desc: 'Снятие ограничений производителя на установку стороннего ПО' },
      { title: 'Установка навигационного стека', desc: 'Инсталляция последних стабильных версий 2GIS и Яндекс с офлайн-картами РК' },
      { title: 'Оптимизация звука и каналов', desc: 'Настройка корректного приглушения музыки во время подсказок навигатора' },
      { title: 'Обучение владельца', desc: 'Демонстрация функций и передача рекомендаций по эксплуатации' }
    ]
  },
  'master-account': {
    name: 'Активация мастер-аккаунта на номер РК',
    title: 'Мастер-аккаунт Zeekr, LiXiang, BYD на казахстанский номер в Алматы',
    metaDesc: 'Официальная регистрация и привязка мастер-аккаунта Li Auto и Zeekr на телефонный номер Казахстана (+7). Дистанционный запуск климата, цифровой ключ Bluetooth.',
    h1: 'Привязка и активация мастер-аккаунта в Казахстане',
    lead: 'Получите полный дистанционный контроль над автомобилем прямо со своего смартфона через официальные мобильные приложения Zeekr App и Li Auto App на номер +7.',
    price: 'от 50 000 ₸',
    duration: '1 – 2 часа (или удаленно)',
    details: [
      'Привязка автомобиля к вашему личному номеру телефона Казахстана (+7)',
      'Удаленное включение кондиционера, обогрева салона и батареи зимой',
      'Функция цифрового ключа Bluetooth Key — управление без физического ключа',
      'Просмотр уровня заряда батареи, запаса хода и местоположения авто на карте',
      'Управление стеклами, багажником и центральным замком через приложение',
      'Консультация и техническое сопровождение при смене смартфона'
    ],
    processSteps: [
      { title: 'Проверка VIN и заводских данных', desc: 'Сверяем статус автомобиля на сервере производителя' },
      { title: 'Регистрация аккаунта владельца', desc: 'Активация профиля с привязкой к казахстанскому номеру сотового оператора' },
      { title: 'Сопряжение с мобильным приложением', desc: 'Настройка Bluetooth-ключа и проверка дистанционных команд' },
      { title: 'Инструктаж по безопасности', desc: 'Обучение передаче семейных ключей и защита аккаунта' }
    ]
  }
}

const currentService = computed(() => {
  const s = slug.value
  return servicesMap[s] || servicesMap['sim-telematics']
})

const whatsappServiceUrl = computed(() => {
  const text = `Здравствуйте! Хочу заказать услугу: ${currentService.value.name} в Алматы. Подскажите ближайшее время для записи?`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

useHead({
  title: computed(() => currentService.value.title),
  meta: [
    {
      name: 'description',
      content: computed(() => currentService.value.metaDesc)
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
      <span class="text-gray-400">Услуги</span>
      <span>/</span>
      <span class="text-gray-200">{{ currentService.name }}</span>
    </div>

    <!-- Service Hero -->
    <div class="rounded-3xl border border-white/10 bg-[#0E1116] p-8 md:p-14 mb-16 shadow-2xl relative overflow-hidden">
      <div class="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]"></div>

      <div class="max-w-3xl relative z-10">
        <span class="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-400/10 px-3.5 py-1.5 rounded-full border border-cyan-400/20">
          Инженерная услуга
        </span>
        <h1 class="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight leading-tight">
          {{ currentService.h1 }}
        </h1>
        <p class="text-gray-300 mt-4 text-base md:text-lg leading-relaxed">
          {{ currentService.lead }}
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-xs">
          <div>
            <p class="text-gray-500 uppercase font-medium">Стоимость</p>
            <p class="text-cyan-400 font-bold mt-1 text-base">{{ currentService.price }}</p>
          </div>
          <div>
            <p class="text-gray-500 uppercase font-medium">Время выполнения</p>
            <p class="text-white font-semibold mt-1">{{ currentService.duration }}</p>
          </div>
          <div>
            <p class="text-gray-500 uppercase font-medium">Гарантия</p>
            <p class="text-emerald-400 font-semibold mt-1">12 месяцев</p>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-4">
          <a
            :href="whatsappServiceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-emerald-500 transition-all"
          >
            Записаться на услугу в WhatsApp
          </a>
          <NuxtLink
            to="/calculator"
            class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:border-cyan-400/30 transition-all"
          >
            Рассчитать в калькуляторе
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Highlights and Process -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
      <div class="rounded-3xl border border-white/5 bg-[#0B0D11] p-8">
        <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <span class="text-cyan-400">✦</span> Преимущества и особенности
        </h3>
        <ul class="space-y-4">
          <li
            v-for="detail in currentService.details"
            :key="detail"
            class="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <span class="text-cyan-400 mt-0.5">✓</span>
            <span class="text-sm text-gray-300">{{ detail }}</span>
          </li>
        </ul>
      </div>

      <div class="rounded-3xl border border-white/5 bg-[#0B0D11] p-8">
        <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <span class="text-cyan-400">✦</span> Пошаговый процесс выполнения
        </h3>
        <div class="space-y-4">
          <div
            v-for="(step, idx) in currentService.processSteps"
            :key="step.title"
            class="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <div class="flex items-center gap-2.5 mb-1.5">
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-400 text-xs font-bold">
                {{ idx + 1 }}
              </span>
              <h4 class="font-bold text-sm text-white">{{ step.title }}</h4>
            </div>
            <p class="text-xs text-gray-400 pl-7">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
