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
    h1: 'Впайка слота 4G SIM-карты в Алматы',
    lead: 'Предоставляем китайским автомобилям постоянный высокоскоростной интернет в сетях казахстанских операторов (Beeline, Kcell/Activ, Tele2/Altel) через надежный выносной слот Nano-SIM.',
    price: 'от 40 000 тг',
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
      { title: 'Прецизионный монтаж', desc: 'Инженер выводит контакты слота Nano-SIM с защитой от вибраций' },
      { title: 'Установка сим-карты и настройка APN', desc: 'Конфигурируем точки доступа для мгновенного подключения к 4G LTE' },
      { title: 'Финальное тестирование скорости', desc: 'Проверяем скорость загрузки, работу онлайн-навигатора и стриминга' }
    ]
  },
  'firmware-apps': {
    name: 'Установка 2GIS, Яндекс и приложений',
    title: 'Установка Яндекс Навигатора и 2GIS на китайские авто в Алматы',
    metaDesc: 'Инсталляция лицензионного 2GIS, Яндекс Карт, YouTube, Spotify и Apple CarPlay на Zeekr, LiXiang, BYD, Geely в Алматы. Предупреждения о камерах Сергек.',
    h1: 'Установка 2GIS и Яндекс с камерами «Сергек»',
    lead: 'Превратите штатный дисплей вашего автомобиля в мультимедийный центр. Полноценная навигация по Алматы и Казахстану с дорожной ситуацией, пробками и скоростными камерами.',
    price: 'от 35 000 тг',
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
    h1: 'Привязка мастер-аккаунта в Казахстане (+7)',
    lead: 'Получите полный дистанционный контроль над автомобилем прямо со своего смартфона через официальные мобильные приложения Zeekr App и Li Auto App на номер +7.',
    price: 'от 50 000 тг',
    duration: '1 – 2 часа',
    details: [
      'Привязка автомобиля к вашему личному номеру телефона Казахстана (+7)',
      'Удаленное включение кондиционера, обогрева салона и батареи зимой',
      'Функция цифрового ключа Bluetooth Key — управление без физического ключа',
      'Просмотр уровня заряда батареи, запаса хода и местоположения авто на карте',
      'Управление стеклами, багажником и центральным замком через приложение',
      'Консультация и техническое сопровождение при смене смартфона'
    ],
    processSteps: [
      { title: 'Проверка VIN и данных', desc: 'Сверяем статус автомобиля на сервере производителя' },
      { title: 'Регистрация аккаунта владельца', desc: 'Активация профиля с привязкой к казахстанскому номеру' },
      { title: 'Сопряжение со смартфоном', desc: 'Настройка Bluetooth-ключа и проверка дистанционных команд' },
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
  <div class="py-20 bg-white">
    <div class="container-audi">
      <div class="flex items-center gap-2 text-xs color-gray mb-10">
        <NuxtLink to="/" class="hover:text-black transition-colors">Главная</NuxtLink>
        <span>/</span>
        <span class="text-black font-medium">{{ currentService.name }}</span>
      </div>

      <div class="border border-black p-8 md:p-14 mb-16 bg-[#fafafa]">
        <div class="max-w-4xl">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">
            Инженерная услуга
          </span>
          <h1 class="title-md text-black mt-3 mb-4">
            {{ currentService.h1 }}
          </h1>
          <p class="text-lg text-[#555555] font-light leading-relaxed mb-8">
            {{ currentService.lead }}
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-[#e5e5e5] text-xs">
            <div>
              <p class="color-gray uppercase font-medium">Стоимость</p>
              <p class="text-black font-bold text-base mt-1">{{ currentService.price }}</p>
            </div>
            <div>
              <p class="color-gray uppercase font-medium">Срок выполнения</p>
              <p class="text-black font-medium text-sm mt-1">{{ currentService.duration }}</p>
            </div>
            <div>
              <p class="color-gray uppercase font-medium">Гарантия</p>
              <p class="text-black font-medium text-sm mt-1">12 месяцев</p>
            </div>
          </div>

          <div class="mt-8 btn-group">
            <a
              :href="whatsappServiceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-black-primary"
            >
              <span>Записаться в WhatsApp</span>
              <span class="ml-2">→</span>
            </a>
            <NuxtLink to="/calculator" class="btn btn-black-default">
              <span>Калькулятор стоимости</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Highlights & Steps -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div class="border border-[#dedede] p-8">
          <h3 class="text-xl font-medium text-black mb-6">Особенности услуги</h3>
          <ul class="space-y-4">
            <li
              v-for="detail in currentService.details"
              :key="detail"
              class="flex items-start gap-3 p-3.5 border border-[#eeeeee] text-xs text-[#444444] font-light"
            >
              <span class="text-[#f50537] font-bold">✓</span>
              <span>{{ detail }}</span>
            </li>
          </ul>
        </div>

        <div class="border border-[#dedede] p-8">
          <h3 class="text-xl font-medium text-black mb-6">Пошаговый регламент</h3>
          <div class="space-y-4">
            <div
              v-for="(step, idx) in currentService.processSteps"
              :key="step.title"
              class="p-4 border border-[#eeeeee]"
            >
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-black">{{ idx + 1 }}.</span>
                <h4 class="text-sm font-medium text-black">{{ step.title }}</h4>
              </div>
              <p class="text-xs color-gray fw-300 pl-4">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
