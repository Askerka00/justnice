<script setup lang="ts">
import { ref, computed } from 'vue'
import { CAR_MODELS } from '~/data/autoData'

const selectedCarId = ref('zeekr-001')
const activeCar = computed(() => CAR_MODELS.find(c => c.id === selectedCarId.value) || CAR_MODELS[0]!)

const whatsappBookingUrl = computed(() => {
  const parts = [
    `Здравствуйте! Рассчитал стоимость на сайте justnice.me:`,
    `• Автомобиль: ${activeCar.value.name}`,
    `• Услуга: Русификация под ключ (экраны, HUD, 2GIS, Яндекс, Сергек)`,
    `• Время работы: ${activeCar.value.timeHours}`,
    `• Итоговый расчет: ${activeCar.value.price.toLocaleString('ru-RU')} тг.`,
    `Подскажите, когда можно записаться на русификацию?`
  ].join('\n')

  return `https://wa.me/77003003390?text=${encodeURIComponent(parts)}`
})

useHead({
  title: 'Калькулятор стоимости русификации авто в Алматы 2026 — JUSTNICE AutoTech',
  meta: [
    {
      name: 'description',
      content: 'Точный онлайн-расчет стоимости русификации для Zeekr, LiXiang, BYD, Geely, Changan в Алматы с фиксацией цены в WhatsApp.'
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
        <span class="text-black font-medium">Калькулятор русификации</span>
      </div>

      <div class="max-w-3xl mx-auto mb-14 text-center">
        <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Прямой расчет</span>
        <h1 class="title-md text-black mt-2">Калькулятор стоимости русификации</h1>
        <p class="text-sm color-gray fw-300 mt-3">
          Выберите автомобиль. Стоимость фиксируется и не меняется во время выполнения работ.
        </p>
      </div>

      <div class="bg-white border border-black p-8 md:p-12 max-w-4xl mx-auto shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
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

          <div class="flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#e5e5e5] pt-8 md:pt-0 md:pl-10">
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-black mb-4">
                2. Что входит в русификацию
              </div>

              <div class="space-y-3 bg-[#fafafa] border border-[#e5e5e5] p-5 mb-6 text-xs text-[#333333]">
                <div class="flex items-start gap-2.5">
                  <span class="text-[#f50537] font-bold">✓</span>
                  <span><strong>Полная русификация экранов:</strong> щиток приборов, мультимедиа, проекция HUD.</span>
                </div>
                <div class="flex items-start gap-2.5">
                  <span class="text-[#f50537] font-bold">✓</span>
                  <span><strong>Лицензионные карты:</strong> 2GIS Алматы и Яндекс Навигатор с Алисой.</span>
                </div>
                <div class="flex items-start gap-2.5">
                  <span class="text-[#f50537] font-bold">✓</span>
                  <span><strong>Камеры Сергек:</strong> предупреждение о камерах контроля скорости и полосах Bus Lane.</span>
                </div>
                <div class="flex items-start gap-2.5">
                  <span class="text-[#f50537] font-bold">✓</span>
                  <span><strong>Гарантия 12 месяцев:</strong> дилерская безопасность, снятие полного заводского бэкапа.</span>
                </div>
              </div>
            </div>

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
  </div>
</template>
