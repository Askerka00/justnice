<script setup lang="ts">
import { ref, computed } from 'vue'
import { CAR_MODELS } from '~/data/autoData'

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

  if (optLocalization.value && optSim.value && optMasterAccount.value && activeCar.value.masterAccountPrice > 0) {
    sum -= 20000
  }
  return sum
})

const whatsappBookingUrl = computed(() => {
  const parts = [
    `Здравствуйте! Рассчитал стоимость на сайте justnice.me:`,
    `• Автомобиль: ${activeCar.value.name}`,
    `• Русификация экранов: ${optLocalization.value ? 'Да' : 'Нет'}`,
    `• Впайка 4G SIM-карты: ${optSim.value ? 'Да' : 'Нет'}`,
    activeCar.value.masterAccountPrice > 0 ? `• Мастер-аккаунт: ${optMasterAccount.value ? 'Да' : 'Нет'}` : '',
    optMobileService.value ? `• Выезд инженера по Алматы` : `• Запись в бокс`,
    `• Итоговый расчет: ${calculatedTotal.value.toLocaleString('ru-RU')} тг.`,
    `Подскажите, когда можно записаться на русификацию?`
  ].filter(Boolean).join('\n')

  return `https://wa.me/77003003390?text=${encodeURIComponent(parts)}`
})

useHead({
  title: 'Конфигуратор стоимости русификации авто в Алматы 2026 — JUSTNICE AutoTech',
  meta: [
    {
      name: 'description',
      content: 'Точный онлайн-расчет стоимости русификации, установки 4G сим-карты и мастер-аккаунта для Zeekr, LiXiang, BYD, Geely, Changan в Алматы с фиксацией цены в WhatsApp.'
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
        <span class="text-black font-medium">Конфигуратор</span>
      </div>

      <div class="max-w-4xl mx-auto mb-16 text-center">
        <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Прайс-лист 2026</span>
        <h1 class="title-md text-black mt-2">Конфигуратор стоимости</h1>
        <p class="text-md color-gray fw-300 mt-4">
          Выберите марку и опции дооснащения. Итоговая стоимость фиксируется и не меняется в ходе выполнения работ.
        </p>
      </div>

      <!-- Calculator Box -->
      <div class="bg-white border border-black p-8 md:p-14 max-w-5xl mx-auto shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div class="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#e5e5e5] pb-8 lg:pb-0 lg:pr-8">
            <div class="text-xs font-bold uppercase tracking-wider text-black mb-4">
              1. Выберите автомобиль
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
                  <p :class="['text-xs font-light mt-0.5', selectedCarId === car.id ? 'text-[#cccccc]' : 'text-[#888888]']">
                    {{ car.chipset }}
                  </p>
                </div>
                <span :class="['text-xs font-medium', selectedCarId === car.id ? 'text-white' : 'text-[#f50537]']">
                  от {{ car.basePrice.toLocaleString('ru-RU') }} тг
                </span>
              </button>
            </div>
          </div>

          <div class="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-black mb-4">
                2. Опции пакета
              </div>

              <div class="space-y-3">
                <label class="flex items-start gap-4 p-4 border border-[#e5e5e5] bg-[#fafafa] cursor-pointer hover:border-black transition-all">
                  <input type="checkbox" v-model="optLocalization" class="mt-1 h-4 w-4 rounded-none border-gray-400 text-black focus:ring-0" />
                  <div class="flex-grow">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-sm text-black">Русификация экранов и меню</span>
                      <span class="text-xs font-medium text-[#f50537]">+{{ activeCar.basePrice.toLocaleString('ru-RU') }} тг</span>
                    </div>
                    <p class="text-xs color-gray fw-300 mt-1">Перевод на русский язык, 2GIS и Яндекс Навигатор.</p>
                  </div>
                </label>

                <label class="flex items-start gap-4 p-4 border border-[#e5e5e5] bg-[#fafafa] cursor-pointer hover:border-black transition-all">
                  <input type="checkbox" v-model="optSim" class="mt-1 h-4 w-4 rounded-none border-gray-400 text-black focus:ring-0" />
                  <div class="flex-grow">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-sm text-black">Впайка выносного слота Nano-SIM 4G</span>
                      <span class="text-xs font-medium text-[#f50537]">+{{ activeCar.simPrice.toLocaleString('ru-RU') }} тг</span>
                    </div>
                    <p class="text-xs color-gray fw-300 mt-1">Металлический слот в бардачок. Быстрый интернет любого оператора РК.</p>
                  </div>
                </label>

                <label v-if="activeCar.masterAccountPrice > 0" class="flex items-start gap-4 p-4 border border-[#e5e5e5] bg-[#fafafa] cursor-pointer hover:border-black transition-all">
                  <input type="checkbox" v-model="optMasterAccount" class="mt-1 h-4 w-4 rounded-none border-gray-400 text-black focus:ring-0" />
                  <div class="flex-grow">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-sm text-black">Мастер-аккаунт на номер РК (+7)</span>
                      <span class="text-xs font-medium text-[#f50537]">+{{ activeCar.masterAccountPrice.toLocaleString('ru-RU') }} тг</span>
                    </div>
                    <p class="text-xs color-gray fw-300 mt-1">Дистанционный климат-контроль и Bluetooth-ключ со смартфона.</p>
                  </div>
                </label>

                <label class="flex items-start gap-4 p-4 border border-[#e5e5e5] bg-[#fafafa] cursor-pointer hover:border-black transition-all">
                  <input type="checkbox" v-model="optMobileService" class="mt-1 h-4 w-4 rounded-none border-gray-400 text-black focus:ring-0" />
                  <div class="flex-grow">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-sm text-black">Выезд лаборатории по Алматы</span>
                      <span class="text-xs font-medium text-[#f50537]">+15 000 тг</span>
                    </div>
                    <p class="text-xs color-gray fw-300 mt-1">Выезд инженера в ваш паркинг или офис со спецоборудованием.</p>
                  </div>
                </label>
              </div>
            </div>

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
  </div>
</template>
