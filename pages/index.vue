<script setup lang="ts">
import { ref, computed } from 'vue'
import { CAR_MODELS, FAQS, type CarModel } from '~/data/autoData'

// Filter tabs for Model range
const activeBrandFilter = ref('all')
const brandTabs = [
  { id: 'all', label: 'Все модели' },
  { id: 'Zeekr', label: 'Zeekr' },
  { id: 'LiXiang', label: 'LiXiang' },
  { id: 'BYD', label: 'BYD' },
  { id: 'Geely', label: 'Geely' },
  { id: 'Changan', label: 'Changan' },
  { id: 'Toyota / Lexus (КНР)', label: 'Toyota (КНР)' }
]

const filteredCars = computed(() => {
  if (activeBrandFilter.value === 'all') return CAR_MODELS
  return CAR_MODELS.filter(c => c.brand.toLowerCase().includes(activeBrandFilter.value.toLowerCase()))
})

// Configurator State - ONLY RUSSIFICATION
const selectedCarId = ref('zeekr-001')
const activeCar = computed(() => CAR_MODELS.find(c => c.id === selectedCarId.value) || CAR_MODELS[0]!)

const whatsappBookingUrl = computed(() => {
  const message = [
    `Здравствуйте! Заявка на русификацию с сайта justnice.me:`,
    `• Автомобиль: ${activeCar.value.name}`,
    `• Услуга: Полная русификация под ключ (экраны, HUD, 2GIS, Яндекс, Сергек)`,
    `• Чипсет: ${activeCar.value.chipset}`,
    `• Стоимость: ${activeCar.value.price.toLocaleString('ru-RU')} тг.`,
    `Подскажите, когда ближайшее свободное окно для записи?`
  ].join('\n')

  return `https://wa.me/77003003390?text=${encodeURIComponent(message)}`
})

const selectCarAndScroll = (carId: string) => {
  selectedCarId.value = carId
  const el = document.getElementById('calculator')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// FAQ Accordion State
const openFaqIndex = ref<number | null>(0)
const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

// SEO Head Meta
useHead({
  title: 'Официальная русификация китайских авто в Алматы — Zeekr, LiXiang, BYD, Geely | JUSTNICE AutoTech',
  meta: [
    {
      name: 'description',
      content: 'Профессиональная русификация китайских авто в Алматы. Перевод приборки, центральных дисплеев и HUD, лицензионный 2GIS и Яндекс с камерами «Сергек». Сохранение заводской гарантии.'
    }
  ]
})
</script>

<template>
  <div class="bg-white text-black">

    <!-- 1. AUDI-STYLE HERO BANNER WITH REAL CAR IMAGE (FROM GOOGLE FLOW) -->
    <section class="relative bg-[#050608] text-white overflow-hidden border-b border-[#222222]">
      <div class="absolute inset-0 z-0">
        <img
          src="/images/hero-car.jpg"
          alt="Luxury Electric Vehicle"
          class="w-full h-full object-cover object-center opacity-45 md:opacity-60"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#050608] via-[#050608]/75 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/50"></div>
      </div>

      <div class="container-audi relative z-10 pt-32 pb-24 md:pt-44 md:pb-36">
        <div class="max-w-2xl text-left">
          <div class="flex items-center gap-2 mb-4">
            <span class="inline-block h-1.5 w-1.5 bg-[#f50537]"></span>
            <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">
              Инженерная лаборатория • Алматы
            </span>
          </div>

          <h1 class="title-lg text-white mb-5">
            Профессиональная русификация китайских авто
          </h1>

          <p class="text-lg text-[#cccccc] font-light leading-relaxed mb-10 max-w-xl">
            Официальная программная адаптация <strong class="text-white font-medium">Zeekr, LiXiang, BYD, Geely, Changan и Toyota</strong>. Перевод экранов и проекции HUD, лицензионный 2GIS и Яндекс с камерами «Сергек» без потери дилерской гарантии.
          </p>

          <div class="btn-group">
            <a href="#calculator" class="btn btn-primary">
              <span>Рассчитать стоимость</span>
              <span class="ml-2">→</span>
            </a>
            <a
              href="https://wa.me/77003003390?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D1%80%D1%83%D1%81%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B8."
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-default"
            >
              <span>Записаться в WhatsApp</span>
            </a>
          </div>
        </div>

        <!-- 3 Pillars Row -->
        <div class="mt-20 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <span class="text-xs font-semibold text-[#f50537] uppercase tracking-wider">01 / Безопасность</span>
            <h4 class="text-sm font-medium text-white mt-1">100% Сохранение гарантии</h4>
            <p class="text-xs text-[#999999] font-light mt-1">Работаем только с блоком мультимедиа IVI. Силовая батарея и блоки двигателя не затрагиваются.</p>
          </div>
          <div>
            <span class="text-xs font-semibold text-[#f50537] uppercase tracking-wider">02 / Навигация</span>
            <h4 class="text-sm font-medium text-white mt-1">2GIS и камеры «Сергек»</h4>
            <p class="text-xs text-[#999999] font-light mt-1">Лицензионный навигатор с актуальной базой камер контроля скорости и выделенных полос РК.</p>
          </div>
          <div>
            <span class="text-xs font-semibold text-[#f50537] uppercase tracking-wider">03 / Надежность</span>
            <h4 class="text-sm font-medium text-white mt-1">Официальная гарантия 12 мес.</h4>
            <p class="text-xs text-[#999999] font-light mt-1">Полный бэкап заводской прошивки и бесплатная поддержка при OTA-обновлениях.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. AUDI MODEL RANGE SECTION WITH FLOW IMAGES -->
    <section id="models" class="py-24 bg-white border-b border-[#f0f0f0]">
      <div class="container-audi">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Каталог решений</span>
            <h2 class="title-md text-black mt-2">Модельный ряд</h2>
          </div>
          <p class="text-sm color-gray fw-300 mt-2 md:mt-0 max-w-md">
            Выберите ваш автомобиль для просмотра деталей русификации и фиксации стоимости.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-2 md:gap-4 mb-12 border-b border-[#e5e5e5] pb-4">
          <button
            v-for="tab in brandTabs"
            :key="tab.id"
            @click="activeBrandFilter = tab.id"
            type="button"
            :class="[
              'text-sm font-medium py-2 px-3 transition-colors border-b-2 -mb-[18px]',
              activeBrandFilter === tab.id
                ? 'border-black text-black font-semibold'
                : 'border-transparent text-[#777777] hover:text-black'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Car Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="car in filteredCars"
            :key="car.id"
            class="group border border-[#e5e5e5] bg-[#fafafa] p-6 flex flex-col justify-between transition-all duration-300 hover:border-black hover:bg-white hover:shadow-lg"
          >
            <div>
              <!-- Car Photo from Flow -->
              <div class="h-44 overflow-hidden bg-black mb-6 border border-[#e5e5e5] relative">
                <img
                  :src="car.image"
                  :alt="car.name"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span v-if="car.popular" class="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#f50537] text-white">
                  Топ выбор
                </span>
              </div>

              <div class="text-xs font-bold uppercase tracking-wider text-[#777777] mb-1">{{ car.brand }}</div>
              <h3 class="text-xl font-bold text-black mb-1">{{ car.name }}</h3>

              <div class="text-[#777777] font-light text-xs mb-4">
                {{ car.timeHours }} • {{ car.chipset }}
              </div>

              <!-- Price -->
              <div class="text-2xl font-bold text-black mb-6">
                {{ car.price.toLocaleString('ru-RU') }} тг
                <span class="text-xs font-light text-[#777777] block mt-0.5">русификация под ключ</span>
              </div>

              <div class="h-[1px] bg-[#e5e5e5] mb-6"></div>

              <!-- Feature Bullets -->
              <ul class="space-y-2 text-xs text-[#444444] mb-8 font-light">
                <li v-for="feat in car.features" :key="feat" class="flex items-start gap-2.5">
                  <span class="text-[#f50537] font-bold">✓</span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <div class="pt-4 border-t border-[#e5e5e5]">
              <button
                @click="selectCarAndScroll(car.id)"
                type="button"
                class="btn btn-black-primary w-full text-xs"
              >
                <span>Выбрать для русификации</span>
                <span class="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. CONFIGURATOR (FOCUSED 100% ON RUSSIFICATION ONLY) -->
    <section id="calculator" class="py-24 bg-[#f8f8f8] border-b border-[#f0f0f0]">
      <div class="container-audi">
        <div class="max-w-3xl mx-auto mb-14 text-center">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Прямой расчет</span>
          <h2 class="title-md text-black mt-2">Калькулятор русификации</h2>
          <p class="text-sm color-gray fw-300 mt-3">
            Выберите модель автомобиля. Стоимость фиксируется и подтверждается при записи.
          </p>
        </div>

        <div class="bg-white border border-black p-8 md:p-12 max-w-4xl mx-auto shadow-sm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <!-- Left: Select car -->
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-black mb-4">
                1. Выберите модель автомобиля
              </div>
              <div class="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                <button
                  v-for="car in CAR_MODELS"
                  :key="car.id"
                  @click="selectedCarId = car.id"
                  type="button"
                  :class="[
                    'w-full text-left p-4 border transition-all flex items-center justify-between',
                    selectedCarId === car.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-[#e5e5e5] hover:border-black'
                  ]"
                >
                  <div>
                    <p class="font-bold text-sm">{{ car.name }}</p>
                    <p :class="['text-xs font-light mt-0.5', selectedCarId === car.id ? 'text-[#cccccc]' : 'text-[#777777]']">
                      {{ car.timeHours }}
                    </p>
                  </div>
                  <span :class="['text-xs font-semibold', selectedCarId === car.id ? 'text-white' : 'text-[#f50537]']">
                    {{ car.price.toLocaleString('ru-RU') }} тг
                  </span>
                </button>
              </div>
            </div>

            <!-- Right: What is included & Booking -->
            <div class="flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#e5e5e5] pt-8 md:pt-0 md:pl-10">
              <div>
                <div class="text-xs font-bold uppercase tracking-wider text-black mb-4">
                  2. В комплекс русификации входит
                </div>

                <div class="flex items-center gap-4 mb-4 p-3 bg-[#fafafa] border border-[#e5e5e5]">
                  <img :src="activeCar.image" :alt="activeCar.name" class="w-20 h-14 object-cover border border-[#e5e5e5]" />
                  <div>
                    <h4 class="font-bold text-sm text-black">{{ activeCar.name }}</h4>
                    <p class="text-xs text-[#777777]">{{ activeCar.chipset }} • {{ activeCar.timeHours }}</p>
                  </div>
                </div>

                <div class="space-y-3 bg-[#fafafa] border border-[#e5e5e5] p-4 mb-6 text-xs text-[#333333]">
                  <div class="flex items-start gap-2.5">
                    <span class="text-[#f50537] font-bold">✓</span>
                    <span><strong>Полный перевод интерфейса:</strong> приборная панель, центральный экран, пассажирский дисплей и HUD.</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="text-[#f50537] font-bold">✓</span>
                    <span><strong>Лицензионная навигация:</strong> 2GIS Алматы и Яндекс Навигатор с голосовой Алисой.</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="text-[#f50537] font-bold">✓</span>
                    <span><strong>База дорожных камер:</strong> онлайн-предупреждения о скоростных камерах «Сергек» и полосах Bus Lane.</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="text-[#f50537] font-bold">✓</span>
                    <span><strong>Сохранение гарантии:</strong> снятие полного бэкапа оригинальной прошивки. Гарантия 12 месяцев.</span>
                  </div>
                </div>
              </div>

              <!-- Total Card -->
              <div class="p-6 bg-[#f7f7f7] border border-[#e5e5e5]">
                <div class="text-xs uppercase font-medium text-[#777777]">Итоговая стоимость под ключ</div>
                <div class="text-3xl font-extrabold text-black tracking-tight my-1">
                  {{ activeCar.price.toLocaleString('ru-RU') }} тг
                </div>
                <p class="text-xs text-[#777777] font-light mb-4">Автомобиль: {{ activeCar.name }}</p>

                <a
                  :href="whatsappBookingUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-black-primary w-full"
                >
                  <span>Записаться в WhatsApp</span>
                  <span class="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. AUDI 3-COLUMN STANDARDS (#for__clients 100% Match) -->
    <section id="technologies" class="py-24 bg-white border-b border-[#f0f0f0]">
      <div class="container-audi">
        <div class="mb-14">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Стандарты качества</span>
          <h2 class="title-md text-black mt-2">Почему выбирают JUSTNICE</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="border border-[#e5e5e5] p-8 flex flex-col justify-between hover:border-black transition-colors">
            <div>
              <span class="text-xs font-bold text-[#f50537] tracking-widest uppercase">01 / Безопасность</span>
              <h3 class="text-xl font-bold text-black mt-3 mb-3">Сохранение дилерской гарантии</h3>
              <p class="text-sm text-[#666666] font-light leading-relaxed mb-6">
                Мы модифицируем исключительно софт мультимедийного блока IVI. Блоки управления тяговой батареей (BMS), двигателями и ходовой частью остаются нетронутыми.
              </p>
            </div>
            <div class="pt-6 border-t border-[#f0f0f0] text-xs font-medium text-black">
              Оригинальный заводской бэкап системы
            </div>
          </div>

          <div class="border border-[#e5e5e5] p-8 flex flex-col justify-between hover:border-black transition-colors">
            <div>
              <span class="text-xs font-bold text-[#f50537] tracking-widest uppercase">02 / Навигация</span>
              <h3 class="text-xl font-bold text-black mt-3 mb-3">2GIS и камеры «Сергек»</h3>
              <p class="text-sm text-[#666666] font-light leading-relaxed mb-6">
                Устанавливаем официальный навигационный комплекс с онлайн-пробками и актуальной базой скоростных камер «Сергек» и автобусных полос по всему Казахстану.
              </p>
            </div>
            <div class="pt-6 border-t border-[#f0f0f0] text-xs font-medium text-black">
              Голосовые подсказки и маршруты без задержек
            </div>
          </div>

          <div class="border border-[#e5e5e5] p-8 flex flex-col justify-between hover:border-black transition-colors">
            <div>
              <span class="text-xs font-bold text-[#f50537] tracking-widest uppercase">03 / Сопровождение</span>
              <h3 class="text-xl font-bold text-black mt-3 mb-3">Гарантия 12 месяцев</h3>
              <p class="text-sm text-[#666666] font-light leading-relaxed mb-6">
                Предоставляем официальный гарантийный талон на программное обеспечение. В случае выхода OTA-обновлений помогаем сохранить или накатить локализацию.
              </p>
            </div>
            <div class="pt-6 border-t border-[#f0f0f0] text-xs font-medium text-black">
              Прямая инженерная поддержка клиентов
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 4-STEP QUALITY PROCESS -->
    <section id="process" class="py-24 bg-[#f8f8f8] border-b border-[#f0f0f0]">
      <div class="container-audi">
        <div class="mb-14">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Регламент</span>
          <h2 class="title-md text-black mt-2">Порядок русификации</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white border border-[#e5e5e5] p-8">
            <span class="text-2xl font-black text-black">01</span>
            <h4 class="text-base font-bold text-black mt-4 mb-2">Диагностика</h4>
            <p class="text-xs text-[#666666] font-light leading-relaxed">
              Проверка ревизии чипсета (Qualcomm 8155/8295) и создание полного резервного образа оригинальной прошивки.
            </p>
          </div>

          <div class="bg-white border border-[#e5e5e5] p-8">
            <span class="text-2xl font-black text-black">02</span>
            <h4 class="text-base font-bold text-black mt-4 mb-2">Установка пакета</h4>
            <p class="text-xs text-[#666666] font-light leading-relaxed">
              Инсталляция русифицированного языкового пакета меню, приборного щитка и проекционного дисплея HUD.
            </p>
          </div>

          <div class="bg-white border border-[#e5e5e5] p-8">
            <span class="text-2xl font-black text-black">03</span>
            <h4 class="text-base font-bold text-black mt-4 mb-2">Навигация</h4>
            <p class="text-xs text-[#666666] font-light leading-relaxed">
              Инсталляция лицензионного 2GIS и Яндекс Навигатора с предупреждением о камерах Сергек и синхронизацией времени UTC+5.
            </p>
          </div>

          <div class="bg-white border border-[#e5e5e5] p-8">
            <span class="text-2xl font-black text-black">04</span>
            <h4 class="text-base font-bold text-black mt-4 mb-2">Выходной контроль</h4>
            <p class="text-xs text-[#666666] font-light leading-relaxed">
              Тестирование всех функций мультимедиа, демонстрация работы клиенту и выдача гарантии на 12 месяцев.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. AUDI FAQ ACCORDION -->
    <section id="faq" class="py-24 bg-white border-b border-[#f0f0f0]">
      <div class="container-audi max-w-4xl mx-auto">
        <div class="text-center mb-14">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Ответы на вопросы</span>
          <h2 class="title-md text-black mt-2">Часто задаваемые вопросы</h2>
        </div>

        <div class="border-t border-[#e5e5e5]">
          <div
            v-for="(faq, idx) in FAQS"
            :key="idx"
            class="border-b border-[#e5e5e5]"
          >
            <button
              @click="toggleFaq(idx)"
              type="button"
              class="w-full py-6 flex items-center justify-between text-left text-base md:text-lg font-medium text-black hover:text-[#f50537] transition-colors"
            >
              <span class="pr-6">{{ faq.q }}</span>
              <span class="text-2xl font-light text-[#888888] shrink-0">
                {{ openFaqIndex === idx ? '−' : '+' }}
              </span>
            </button>
            <div
              v-show="openFaqIndex === idx"
              class="pb-6 text-sm text-[#666666] font-light leading-relaxed pr-8"
            >
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. AUDI CTA CONTACT SECTION -->
    <section class="py-20 bg-[#050608] text-white">
      <div class="container-audi flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">
            Лаборатория в Алматы
          </span>
          <h2 class="title-md text-white mt-2">
            Записаться на русификацию
          </h2>
          <p class="text-sm text-[#aaaaaa] font-light mt-2 max-w-xl">
            г. Алматы, пр. Абая / ул. Саина. Прием автомобилей ежедневно с 09:00 до 21:00 по предварительной записи.
          </p>
        </div>

        <div class="btn-group shrink-0">
          <a
            href="https://wa.me/77003003390?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D1%80%D1%83%D1%81%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8E%20%D0%B2%20%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B."
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            <span>Написать в WhatsApp</span>
            <span class="ml-2">→</span>
          </a>
          <a href="tel:+77003003390" class="btn btn-default">
            <span>+7 (700) 300-33-90</span>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>
