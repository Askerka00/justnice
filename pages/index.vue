<script setup lang="ts">
import { ref, computed } from 'vue'
import { CAR_MODELS, FAQS, type CarModel } from '~/data/autoData'

// Model Filter Tabs (Audi style)
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

// Configurator State
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
  if (optMobileService.value) sum += 15000

  // Скидка за комплексный пакет
  if (optLocalization.value && optSim.value && optMasterAccount.value && activeCar.value.masterAccountPrice > 0) {
    sum -= 20000
  }
  return sum
})

const whatsappBookingUrl = computed(() => {
  const parts = [
    `Здравствуйте! Заявка с сайта justnice.me:`,
    `• Автомобиль: ${activeCar.value.name}`,
    `• Русификация мультимедиа: ${optLocalization.value ? 'Да' : 'Нет'}`,
    `• Впайка Nano-SIM 4G: ${optSim.value ? 'Да' : 'Нет'}`,
    activeCar.value.masterAccountPrice > 0 ? `• Мастер-аккаунт РК: ${optMasterAccount.value ? 'Да' : 'Нет'}` : '',
    optMobileService.value ? `• Выезд экипажа по Алматы` : `• Приеду в бокс (Абая/Саина)`,
    `• Расчет стоимости: ${calculatedTotal.value.toLocaleString('ru-RU')} тг.`,
    `Подскажите ближайшее свободное время?`
  ].filter(Boolean).join('\n')

  return `https://wa.me/77003003390?text=${encodeURIComponent(parts)}`
})

// Quick pick car for configurator
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

// Head Meta
useHead({
  title: 'Официальная лаборатория русификации китайских авто в Алматы | JUSTNICE AutoTech',
  meta: [
    {
      name: 'description',
      content: 'Профессиональная русификация, впайка 4G SIM-модема и привязка мастер-аккаунта для Zeekr, LiXiang, BYD, Geely Monjaro в Алматы. Сохранение дилерской гарантии.'
    }
  ]
})
</script>

<template>
  <div class="bg-white text-black">

    <!-- 1. AUDI HERO BANNER (100% Match to audi.kz hero) -->
    <div class="banner relative bg-[#07090c] text-white overflow-hidden">
      <!-- Gradient overlay matching audi.kz .banner-content -->
      <div class="h-[80rem] min-h-[580px] flex items-end pb-[10vh] relative">
        <!-- Cinematic automotive background lighting -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-[#07090c]/80 to-transparent pointer-events-none z-0"></div>
        <div class="absolute top-0 right-0 w-[60vw] h-[60vw] bg-radial from-[#1e2530] via-transparent to-transparent opacity-40 pointer-events-none"></div>

        <div class="container-audi relative z-10">
          <div class="max-w-[75rem] text-left">
            <span class="inline-block text-[1.2rem] font-medium tracking-[0.2em] text-[#f50537] uppercase mb-4">
              JUSTNICE AUTOTECH ALMATY
            </span>
            <h1 class="title-lg text-white mb-4">
              Zeekr, LiXiang & BYD
            </h1>
            <div class="title-xs text-[#d0d0d0] font-normal mb-10 leading-[1.3]">
              Элегантный интерфейс и интеллектуальные технологии.<br>
              Полная программная адаптация и телематика 4G в Алматы.
            </div>

            <!-- Audi .btn-group -->
            <div class="btn-group">
              <a href="#calculator" class="btn btn-primary banner-btn-pad">
                <span>Сконфигурировать</span>
              </a>
              <a
                href="https://wa.me/77003003390?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D1%80%D1%83%D1%81%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B8%20%D0%B0%D0%B2%D1%82%D0%BE."
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-default banner-btn-pad"
              >
                <span>Оставить заявку</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. AUDI MODEL RANGE SECTION (.cars, .car, .prices) -->
    <section id="models" class="py-24 bg-white border-b border-[#f2f2f2]">
      <div class="container-audi">
        <!-- Section Title -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 class="title-md text-black">Модельный ряд</h2>
          </div>
          <div class="text-sm color-gray fw-300 mt-2 md:mt-0">
            Официальные программные пакеты 2026 года для всех ревизий чипсетов
          </div>
        </div>

        <!-- Filter Tabs (Audi style) -->
        <div class="flex flex-wrap gap-4 mb-14 border-b border-[#dedede] pb-4">
          <button
            v-for="tab in brandTabs"
            :key="tab.id"
            @click="activeBrandFilter = tab.id"
            type="button"
            :class="[
              'text-[1.6rem] font-normal transition-colors py-2 px-3 border-b-2 -mb-[18px]',
              activeBrandFilter === tab.id
                ? 'border-black text-black font-medium'
                : 'border-transparent text-[#808080] hover:text-black'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Audi Cars Grid (.cars) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <div
            v-for="car in filteredCars"
            :key="car.id"
            class="car group cursor-pointer"
            @click="selectCarAndScroll(car.id)"
          >
            <!-- Car Image Area with Audi clean styling -->
            <div class="bg-[#f7f7f7] p-8 flex items-center justify-center mb-6 h-[18rem] transition-colors group-hover:bg-[#f0f0f0]">
              <div class="text-center">
                <span class="text-xs uppercase font-medium tracking-widest text-[#808080]">{{ car.brand }}</span>
                <p class="text-xl font-medium text-black mt-1">{{ car.name }}</p>
                <span class="inline-block mt-3 text-[1.1rem] px-2 py-0.5 border border-[#cccccc] text-[#666666]">
                  {{ car.chipset }}
                </span>
              </div>
            </div>

            <!-- Title & Price (Audi exact classes) -->
            <h4 class="text-[2rem] font-normal text-black mb-1 group-hover:text-[#f50537] transition-colors">
              {{ car.name }}
            </h4>
            <div class="prices">
              <div class="text-md color-gray fw-300">
                от {{ car.basePrice.toLocaleString('ru-RU') }} тг
              </div>
            </div>

            <!-- Specs bullet list -->
            <div class="mt-4 pt-4 border-t border-[#f0f0f0] space-y-1.5 text-xs text-[#666666] font-light">
              <p>• Время работы: {{ car.timeHours }}</p>
              <p>• Полный перевод HUD и экранов</p>
              <p>• Выносной слот 4G Nano-SIM</p>
            </div>

            <!-- Audi Action Button -->
            <div class="mt-6">
              <span class="btn btn-black-default text-xs !py-3 !px-6 !min-w-0 w-full">
                <span>Рассчитать стоимость</span>
                <span class="ml-2">→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. AUDI-STYLE CONFIGURATOR / CALCULATOR -->
    <section id="calculator" class="py-24 bg-[#f8f8f8] border-b border-[#f2f2f2]">
      <div class="container-audi">
        <div class="max-w-4xl mx-auto mb-16 text-center">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Точный онлайн-расчет</span>
          <h2 class="title-md text-black mt-2">Конфигуратор стоимости</h2>
          <p class="text-md color-gray fw-300 mt-4">
            Прозрачные тарифы лаборатории JUSTNICE. Фиксация стоимости перед началом работ без скрытых платежей.
          </p>
        </div>

        <div class="bg-white border border-black p-8 md:p-14 max-w-5xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Left: Car Picker -->
            <div class="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#e5e5e5] pb-8 lg:pb-0 lg:pr-8">
              <div class="text-xs font-bold uppercase tracking-wider text-black mb-4">
                1. Выберите модель автомобиля
              </div>
              <div class="space-y-2">
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
                    <p class="font-medium text-sm">{{ car.name }}</p>
                    <p :class="['text-xs font-light mt-0.5', selectedCarId === car.id ? 'text-[#bbbbbb]' : 'text-[#888888]']">
                      {{ car.chipset }}
                    </p>
                  </div>
                  <span :class="['text-xs font-medium', selectedCarId === car.id ? 'text-white' : 'text-[#f50537]']">
                    от {{ car.basePrice.toLocaleString('ru-RU') }} тг
                  </span>
                </button>
              </div>
            </div>

            <!-- Right: Equipment Options & Total -->
            <div class="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div class="text-xs font-bold uppercase tracking-wider text-black mb-4">
                  2. Выберите опции оборудования
                </div>

                <div class="space-y-3">
                  <!-- Option 1 -->
                  <label class="flex items-start gap-4 p-4 border border-[#e5e5e5] bg-[#fafafa] cursor-pointer hover:border-black transition-all">
                    <input type="checkbox" v-model="optLocalization" class="mt-1 h-4 w-4 rounded-none border-gray-400 text-black focus:ring-0" />
                    <div class="flex-grow">
                      <div class="flex items-center justify-between">
                        <span class="font-medium text-sm text-black">Русификация экранов и меню</span>
                        <span class="text-xs font-medium text-[#f50537]">+{{ activeCar.basePrice.toLocaleString('ru-RU') }} тг</span>
                      </div>
                      <p class="text-xs text-[#808080] font-light mt-1">Перевод на чистый русский язык, 2GIS и Яндекс Навигатор.</p>
                    </div>
                  </label>

                  <!-- Option 2 -->
                  <label class="flex items-start gap-4 p-4 border border-[#e5e5e5] bg-[#fafafa] cursor-pointer hover:border-black transition-all">
                    <input type="checkbox" v-model="optSim" class="mt-1 h-4 w-4 rounded-none border-gray-400 text-black focus:ring-0" />
                    <div class="flex-grow">
                      <div class="flex items-center justify-between">
                        <span class="font-medium text-sm text-black">Впайка внешнего слота Nano-SIM 4G</span>
                        <span class="text-xs font-medium text-[#f50537]">+{{ activeCar.simPrice.toLocaleString('ru-RU') }} тг</span>
                      </div>
                      <p class="text-xs text-[#808080] font-light mt-1">Металлический слот в бардачок. Поддержка любого оператора РК.</p>
                    </div>
                  </label>

                  <!-- Option 3 -->
                  <label v-if="activeCar.masterAccountPrice > 0" class="flex items-start gap-4 p-4 border border-[#e5e5e5] bg-[#fafafa] cursor-pointer hover:border-black transition-all">
                    <input type="checkbox" v-model="optMasterAccount" class="mt-1 h-4 w-4 rounded-none border-gray-400 text-black focus:ring-0" />
                    <div class="flex-grow">
                      <div class="flex items-center justify-between">
                        <span class="font-medium text-sm text-black">Мастер-аккаунт на номер РК (+7)</span>
                        <span class="text-xs font-medium text-[#f50537]">+{{ activeCar.masterAccountPrice.toLocaleString('ru-RU') }} тг</span>
                      </div>
                      <p class="text-xs text-[#808080] font-light mt-1">Дистанционный климат-контроль и Bluetooth-ключ со смартфона.</p>
                    </div>
                  </label>

                  <!-- Option 4 -->
                  <label class="flex items-start gap-4 p-4 border border-[#e5e5e5] bg-[#fafafa] cursor-pointer hover:border-black transition-all">
                    <input type="checkbox" v-model="optMobileService" class="mt-1 h-4 w-4 rounded-none border-gray-400 text-black focus:ring-0" />
                    <div class="flex-grow">
                      <div class="flex items-center justify-between">
                        <span class="font-medium text-sm text-black">Выезд лаборатории по Алматы</span>
                        <span class="text-xs font-medium text-[#f50537]">+15 000 тг</span>
                      </div>
                      <p class="text-xs text-[#808080] font-light mt-1">Выезд инженера в ваш паркинг или офис со спецоборудованием.</p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Calculation Box -->
              <div class="mt-8 p-6 bg-[#f7f7f7] border border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span class="text-xs uppercase font-medium text-[#808080]">Итого к оплате</span>
                  <div class="text-3xl font-bold text-black tracking-tight mt-1">
                    {{ calculatedTotal.toLocaleString('ru-RU') }} тг
                  </div>
                  <span class="text-xs color-gray fw-300">Гарантия 12 месяцев включена</span>
                </div>

                <a
                  :href="whatsappBookingUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-black-primary !min-w-[20rem]"
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

    <!-- 4. AUDI 3-COLUMN CONTENT BLOCKS (#for__clients 100% Match) -->
    <section id="technologies" class="py-24 bg-white border-b border-[#f2f2f2]">
      <div class="container-audi">
        <div class="mb-14">
          <h2 class="title-md text-black">Стандарты качества</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- Col 1 -->
          <div class="border border-[#dedede] p-8 flex flex-col justify-between transition-colors hover:border-black">
            <div>
              <div class="text-xs font-medium text-[#f50537] uppercase tracking-wider mb-2">01 / Безопасность</div>
              <h3 class="title-sm text-black mb-4">Гарантия завода</h3>
              <p class="text-lg text-[#555555] font-light mb-8">
                Мы производим модификацию только мультимедийного блока IVI. Контроллеры тяговой батареи BMS, инвертор и блоки двигателей остаются в заводском состоянии.
              </p>
            </div>
            <div class="pt-6 border-t border-[#f0f0f0]">
              <a href="#calculator" class="link__all">Рассчитать стоимость</a>
            </div>
          </div>

          <!-- Col 2 -->
          <div class="border border-[#dedede] p-8 flex flex-col justify-between transition-colors hover:border-black">
            <div>
              <div class="text-xs font-medium text-[#f50537] uppercase tracking-wider mb-2">02 / Телематика</div>
              <h3 class="title-sm text-black mb-4">Слот Nano-SIM 4G</h3>
              <p class="text-lg text-[#555555] font-light mb-8">
                Выносной металлический слот устанавливается в штатный бардачок. Быстрая замена сим-карты любого оператора Казахстана без разбора салона.
              </p>
            </div>
            <div class="pt-6 border-t border-[#f0f0f0]">
              <a href="#calculator" class="link__all">Узнать больше</a>
            </div>
          </div>

          <!-- Col 3 -->
          <div class="border border-[#dedede] p-8 flex flex-col justify-between transition-colors hover:border-black">
            <div>
              <div class="text-xs font-medium text-[#f50537] uppercase tracking-wider mb-2">03 / Карты и радары</div>
              <h3 class="title-sm text-black mb-4">2GIS и Сергек</h3>
              <p class="text-lg text-[#555555] font-light mb-8">
                Официальный навигационный комплекс с онлайн-пробками и актуальной базой скоростных камер «Сергек» и выделенных полос по всему Казахстану.
              </p>
            </div>
            <div class="pt-6 border-t border-[#f0f0f0]">
              <a href="#calculator" class="link__all">Сконфигурировать</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. AUDI 4-STEP PROCESS -->
    <section id="process" class="py-24 bg-[#f8f8f8] border-b border-[#f2f2f2]">
      <div class="container-audi">
        <div class="mb-14">
          <h2 class="title-md text-black">Регламент лаборатории</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white border border-[#dedede] p-8">
            <div class="text-2xl font-bold text-black mb-4">01</div>
            <h4 class="text-lg font-medium text-black mb-2">Диагностика</h4>
            <p class="text-sm color-gray fw-300">
              Считывание заводских идентификаторов блока IVI и создание полного резервного образа (full backup) оригинальной прошивки.
            </p>
          </div>

          <div class="bg-white border border-[#dedede] p-8">
            <div class="text-2xl font-bold text-black mb-4">02</div>
            <h4 class="text-lg font-medium text-black mb-2">Монтаж слота</h4>
            <p class="text-sm color-gray fw-300">
              Вывод выносного слота Nano-SIM в штатный бардачок с использованием экранированных кабелей с защитой от помех.
            </p>
          </div>

          <div class="bg-white border border-[#dedede] p-8">
            <div class="text-2xl font-bold text-black mb-4">03</div>
            <h4 class="text-lg font-medium text-black mb-2">Локализация</h4>
            <p class="text-sm color-gray fw-300">
              Инсталляция прошивки, часового пояса Алматы (UTC+5), лицензионного 2GIS, Яндекс Навигатора и YouTube.
            </p>
          </div>

          <div class="bg-white border border-[#dedede] p-8">
            <div class="text-2xl font-bold text-black mb-4">04</div>
            <h4 class="text-lg font-medium text-black mb-2">Контроль качества</h4>
            <p class="text-sm color-gray fw-300">
              Проверка работы навигатора, 4G соединения, Bluetooth-ключа и выдача официального гарантийного талона на 12 месяцев.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. AUDI FAQ ACCORDION -->
    <section id="faq" class="py-24 bg-white border-b border-[#f2f2f2]">
      <div class="container-audi max-w-4xl mx-auto">
        <div class="mb-14 text-center">
          <h2 class="title-md text-black">Вопросы и ответы</h2>
        </div>

        <div class="border-t border-[#dedede]">
          <div
            v-for="(faq, idx) in FAQS"
            :key="idx"
            class="border-b border-[#dedede]"
          >
            <button
              @click="toggleFaq(idx)"
              type="button"
              class="w-full py-6 flex items-center justify-between text-left text-lg font-normal text-black hover:text-[#f50537] transition-colors"
            >
              <span class="pr-6 font-medium">{{ faq.q }}</span>
              <span class="text-2xl font-light text-[#808080] shrink-0">
                {{ openFaqIndex === idx ? '−' : '+' }}
              </span>
            </button>
            <div
              v-show="openFaqIndex === idx"
              class="pb-6 text-sm color-gray fw-300 leading-relaxed pr-8"
            >
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. AUDI CTA CONTACT SECTION -->
    <section class="py-24 bg-[#000000] text-white">
      <div class="container-audi flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <span class="inline-block text-xs font-medium tracking-[0.2em] text-[#f50537] uppercase mb-2">
            СЛУЖБА ЗАБОТЫ И ЗАПИСИ
          </span>
          <h2 class="title-md text-white">
            Запишитесь на русификацию
          </h2>
          <p class="text-sm text-[#aaaaaa] font-light mt-3 max-w-xl">
            Инженеры лаборатории JUSTNICE принимают автомобили ежедневно с 09:00 до 21:00. Также доступен выезд мобильного экипажа по Алматы.
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
          </a>
          <a href="tel:+77003003390" class="btn btn-default">
            <span>+7 (700) 300-33-90</span>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>
