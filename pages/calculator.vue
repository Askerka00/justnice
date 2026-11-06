<script setup lang="ts">
import { ref, computed } from 'vue'
import { CAR_MODELS, FAQS } from '~/data/autoData'

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
    `• Итоговый расчет: ${calculatedTotal.value.toLocaleString('ru-RU')} ₸.`,
    `Подскажите, когда можно записаться на русификацию?`
  ].filter(Boolean).join('\n')

  return `https://wa.me/77003003390?text=${encodeURIComponent(parts)}`
})

useHead({
  title: 'Онлайн-калькулятор русификации авто в Алматы 2026 — JUSTNICE AutoTech',
  meta: [
    {
      name: 'description',
      content: 'Точный онлайн-расчет стоимости русификации, установки 4G сим-карты и мастер-аккаунта для Zeekr, LiXiang, BYD, Geely, Changan в Алматы с фиксацией цены в WhatsApp.'
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
      <span class="text-gray-200">Калькулятор стоимости</span>
    </div>

    <div class="text-center max-w-3xl mx-auto mb-12">
      <span class="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">Прозрачный прайс</span>
      <h1 class="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">Калькулятор стоимости русификации</h1>
      <p class="text-gray-400 mt-4 text-base">Выберите модель автомобиля и необходимые опции. Стоимость фиксируется и не меняется во время выполнения работ.</p>
    </div>

    <!-- Calculator Card -->
    <div class="rounded-3xl border border-white/10 bg-[#0E1116] p-6 md:p-10 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label class="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">1. Выберите марку и модель авто</label>
          <div class="space-y-2">
            <button
              v-for="car in CAR_MODELS"
              :key="car.id"
              @click="selectedCarId = car.id"
              type="button"
              :class="[
                'w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between',
                selectedCarId === car.id
                  ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-lg shadow-cyan-500/10'
                  : 'border-white/5 bg-white/[0.02] text-gray-300 hover:border-white/20'
              ]"
            >
              <div>
                <p class="font-bold text-sm">{{ car.name }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ car.chipset }} • {{ car.timeHours }}</p>
              </div>
              <span class="text-xs font-mono font-bold text-cyan-400">от {{ car.basePrice.toLocaleString('ru-RU') }} ₸</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">2. Выберите опции адаптации</label>
          <div class="space-y-3">
            <label class="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:border-cyan-500/30 transition-all">
              <input type="checkbox" v-model="optLocalization" class="mt-1 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-400 bg-gray-900" />
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-sm text-white">Русификация экранов и меню</span>
                  <span class="font-mono text-xs text-cyan-400 font-bold">+{{ activeCar.basePrice.toLocaleString('ru-RU') }} ₸</span>
                </div>
                <p class="text-xs text-gray-400 mt-1">Перевод на русский язык, разблокировка приложений 2GIS и Яндекс Навигатор.</p>
              </div>
            </label>

            <label class="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:border-cyan-500/30 transition-all">
              <input type="checkbox" v-model="optSim" class="mt-1 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-400 bg-gray-900" />
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-sm text-white">Впайка слота Nano-SIM 4G</span>
                  <span class="font-mono text-xs text-cyan-400 font-bold">+{{ activeCar.simPrice.toLocaleString('ru-RU') }} ₸</span>
                </div>
                <p class="text-xs text-gray-400 mt-1">Постоянный интернет в авто для навигации, онлайн-музыки и пробок.</p>
              </div>
            </label>

            <label v-if="activeCar.masterAccountPrice > 0" class="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:border-cyan-500/30 transition-all">
              <input type="checkbox" v-model="optMasterAccount" class="mt-1 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-400 bg-gray-900" />
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-sm text-white">Активация мастер-аккаунта</span>
                  <span class="font-mono text-xs text-cyan-400 font-bold">+{{ activeCar.masterAccountPrice.toLocaleString('ru-RU') }} ₸</span>
                </div>
                <p class="text-xs text-gray-400 mt-1">Привязка приложения на смартфон (дистанционный климат, ключ Bluetooth).</p>
              </div>
            </label>

            <label class="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:border-cyan-500/30 transition-all">
              <input type="checkbox" v-model="optMobileService" class="mt-1 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-400 bg-gray-900" />
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-sm text-white">Выезд инженера по Алматы</span>
                  <span class="font-mono text-xs text-cyan-400 font-bold">+15 000 ₸</span>
                </div>
                <p class="text-xs text-gray-400 mt-1">Приедем в ваш паркинг, офис или частный дом со всем оборудованием.</p>
              </div>
            </label>
          </div>

          <!-- Total Block -->
          <div class="mt-8 p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-center">
            <span class="text-xs text-gray-400 uppercase tracking-wider font-semibold">Итоговая расчетная стоимость</span>
            <div class="text-4xl font-black text-cyan-400 my-2">
              {{ calculatedTotal.toLocaleString('ru-RU') }} ₸
            </div>
            <p class="text-xs text-gray-400 mb-5">Включает официальную гарантию 12 месяцев и техническую поддержку</p>

            <a
              :href="whatsappBookingUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-emerald-500 transition-all"
            >
              Зафиксировать цену и записаться в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
