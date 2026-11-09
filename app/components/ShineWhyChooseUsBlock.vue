<template>
  <section 
    id="advantages"
    class="w-full py-16 md:py-24 font-sans overflow-hidden transition-colors duration-300"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left Column: Overlapping Images Layout -->
        <div class="lg:col-span-6 flex justify-center relative select-none">
          <div class="relative w-full max-w-[500px] aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5]">
            <!-- Large Main Image -->
            <div class="w-[78%] h-[85%] rounded-[2.5rem] overflow-hidden bg-stone-100 shadow-md">
              <img 
                :src="imageLargeUrl" 
                alt="Clean room kitchen" 
                class="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
              />
            </div>
            
            <!-- Small Overlapping Image at Bottom-Right -->
            <div class="absolute right-0 bottom-4 w-[48%] aspect-square rounded-[2rem] overflow-hidden bg-white p-2 shadow-2xl border-4 border-white">
              <div class="w-full h-full rounded-[1.5rem] overflow-hidden bg-stone-50">
                <img 
                  :src="imageSmallUrl" 
                  alt="Cleaning supplies" 
                  class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Content and Features Grid -->
        <div class="lg:col-span-6 flex flex-col text-left">
          <!-- Tag Badge -->
          <div v-if="tagText" class="mb-6">
            <SectionBadge :text="tagText" default-style="wavy" :text-color="textColor" />
          </div>

          <!-- Main Title -->
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15]" :style="{ color: textColor }">
            {{ title }}
          </h2>

          <!-- Description -->
          <p class="text-stone-600 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
            {{ description }}
          </p>

          <!-- 2x2 Features Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mb-10">
            <div 
              v-for="(feat, idx) in resolvedFeatures" 
              :key="idx" 
              class="flex items-start gap-4"
            >
              <!-- Icon Container -->
              <div 
                class="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-300"
                :style="{ borderColor: `${textColor}1A`, backgroundColor: `${textColor}05` }"
              >
                <Icon v-if="feat.icon && feat.icon.includes(':')" :name="feat.icon" class="w-5 h-5" />
                <svg v-else-if="feat.iconType === 'shield'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 11 2 2 4-4"/>
                </svg>
                <svg v-else-if="feat.iconType === 'calendar'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <svg v-else-if="feat.iconType === 'leaf'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"/>
                  <path d="M9 22v-4h4"/>
                </svg>
                <svg v-else-if="feat.iconType === 'pricing'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              
              <!-- Feature Text -->
              <div class="flex flex-col">
                <span class="text-base font-bold text-stone-900">{{ feat.title }}</span>
                <span class="text-xs text-stone-500 mt-1 leading-relaxed">{{ feat.subtitle || feat.description || feat.text }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom CTAs -->
          <div class="flex flex-wrap items-center gap-6 pt-6 border-t border-stone-100">
            <a 
              :href="buttonUrl || learnMoreUrl" 
              target="_blank"
              class="px-6 py-3.5 bg-primary text-white hover:opacity-95 font-bold rounded-xl text-sm transition-all duration-350 shadow-md shadow-primary/15 active:scale-97"
            >
              {{ buttonText || learnMoreText }}
            </a>
            
            <a v-if="phone || phoneValue" :href="`tel:${(phone || phoneValue).replace(/[^0-9+]/g, '')}`" class="flex items-center gap-2 text-stone-800 hover:text-stone-950 font-bold transition-colors group">
              <div class="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-stone-400 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <span class="text-base">{{ phone || phoneValue }}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#09090b'
  },
  accentColor: {
    type: String,
    default: '#b0f53c'
  },
  tagText: {
    type: String,
    default: 'ПОЧЕМУ МЫ'
  },
  title: {
    type: String,
    default: 'Почему клиенты выбирают нас'
  },
  description: {
    type: String,
    default: 'Мы гарантируем высокое качество услуг, прозрачные цены и индивидуальный подход к каждому клиенту.'
  },
  buttonText: {
    type: String,
    default: ''
  },
  buttonUrl: {
    type: String,
    default: ''
  },
  learnMoreText: {
    type: String,
    default: 'Записаться на консультацию'
  },
  learnMoreUrl: {
    type: String,
    default: '#contacts'
  },
  phone: {
    type: String,
    default: ''
  },
  phoneValue: {
    type: String,
    default: ''
  },
  imageLargeUrl: {
    type: String,
    default: '/img/demos/detailing-porsche.jpg'
  },
  imageSmallUrl: {
    type: String,
    default: '/img/demos/detailing-polish.jpg'
  },
  features: {
    type: Array,
    default: () => []
  },
  featuresList: {
    type: Array,
    default: () => [
      { title: 'Опытные специалисты', subtitle: 'Сертифицированные мастера своего дела', iconType: 'shield' },
      { title: 'Удобная запись', subtitle: 'Онлайн-бронирование без очередей', iconType: 'calendar' },
      { title: 'Безопасные материалы', subtitle: 'Только проверенные мировые бренды', iconType: 'leaf' },
      { title: 'Честные цены', subtitle: 'Никаких скрытых доплат и наценок', iconType: 'pricing' }
    ]
  }
})

const resolvedFeatures = computed(() => {
  if (props.features && props.features.length > 0) return props.features
  return props.featuresList
})
</script>

<style scoped>
.hover\:scale-103:hover {
  transform: scale(1.03);
}
</style>
