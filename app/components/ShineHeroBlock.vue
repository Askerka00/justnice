<template>
  <section 
    class="relative w-full py-16 md:py-24 lg:py-32 font-sans overflow-hidden transition-colors duration-300"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <!-- Left Column: Content -->
        <div class="lg:col-span-7 flex flex-col justify-center text-left">
          <!-- Main Title -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            <span v-html="title"></span>
            <span v-if="highlightText" class="relative inline-block whitespace-nowrap ml-2" :style="{ color: accentColor }">
              {{ highlightText }}
              <!-- Hand-drawn style highlight scribble -->
              <svg class="absolute -bottom-3 left-0 w-full h-4 pointer-events-none" viewBox="0 0 220 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14C35 15.5 105 13.5 180 8.5C198 7.3 216 5 212 9.5C208 14 176 17 148 18C95 19.8 15 15.5 8 13.5" :stroke="accentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </h1>

          <!-- Description -->
          <p class="text-lg md:text-xl opacity-90 max-w-xl mb-10 leading-relaxed">
            {{ subtitle }}
          </p>

          <!-- CTAs (Button + Phone call) -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
            <a 
              :href="ctaUrl" 
              class="px-8 py-4 text-center font-bold rounded-xl transition-all duration-350 hover:shadow-lg hover:shadow-black/10 active:scale-98"
              :style="{ backgroundColor: accentColor, color: bgColor }"
            >
              {{ ctaText }}
            </a>
            
            <a :href="`tel:${phoneValue}`" class="flex items-center gap-3 group">
              <div class="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
                <!-- Phone Icon -->
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <span class="block text-xs uppercase tracking-wider opacity-60 font-semibold">{{ phoneLabel }}</span>
                <span class="text-lg font-bold group-hover:opacity-85 transition-opacity">{{ phoneValue }}</span>
              </div>
            </a>
          </div>

          <!-- Trust Badges (Dynamic from JSON) -->
          <div class="flex flex-wrap items-center gap-x-10 gap-y-6 pt-6 border-t border-white/10 relative">
            <div 
              v-for="(badge, bIdx) in trustBadges" 
              :key="bIdx" 
              class="flex flex-col gap-1"
            >
              <!-- Badge Header (Icon + Name) -->
              <div class="flex items-center gap-1.5 font-bold">

                <!-- Trustpilot Icon -->
                <template v-if="badge.type === 'trustpilot'">
                  <span class="text-[#00B67A] text-xl">★</span>
                </template>

                <!-- Capterra Icon -->
                <template v-else-if="badge.type === 'capterra'">
                  <svg class="w-5 h-5 shrink-0 text-[#FF2E5F]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z"/>
                  </svg>
                </template>

                <!-- 2GIS Icon -->
                <template v-else-if="badge.type === '2gis'">
                  <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" fill="#37B34A"/>
                    <text x="12" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="white" font-family="Arial, sans-serif">2</text>
                  </svg>
                </template>

                <!-- Google Icon -->
                <template v-else-if="badge.type === 'google'">
                  <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.78.42 3.46 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </template>

                <!-- Yandex Icon -->
                <template v-else-if="badge.type === 'yandex'">
                  <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" fill="#FC3F1D"/>
                    <path d="M13.5 18V6h-1.8c-2.1 0-3.2 1.2-3.2 2.7 0 1.7.8 2.5 2.1 3.5l1.5 1.1-3.8 4.7h-2.2l3.4-4.2c-1.6-1.2-2.7-2.3-2.7-4.2 0-2.4 1.7-4.1 4.7-4.1h3.5V18h-1.5z" fill="white"/>
                  </svg>
                </template>

                <!-- Fallback generic star -->
                <template v-else>
                  <span class="text-yellow-400 text-xl">★</span>
                </template>

                <span class="text-xl tracking-tight">{{ badge.name }}</span>
              </div>

              <!-- Stars + Label Row -->
              <div class="flex items-center gap-2">
                <!-- Stars Row -->
                <div class="flex gap-0.5">
                  <template v-if="trustBadgeStyle === 'squares'">
                    <span 
                      v-for="i in (badge.starsCount || 5)" 
                      :key="i" 
                      class="w-4 h-4 rounded-sm text-white flex items-center justify-center text-[10px]"
                      :style="{ backgroundColor: getBadgeColor(badge.type) }"
                    >★</span>
                  </template>
                  <template v-else>
                    <span 
                      v-for="i in (badge.starsCount || 5)" 
                      :key="i" 
                      class="text-sm"
                      :style="{ color: getBadgeColor(badge.type) }"
                    >★</span>
                  </template>
                </div>
                <span class="text-sm opacity-80 font-medium">{{ badge.label }}</span>
              </div>
            </div>

            <!-- Curved Handdrawn Arrow pointing to Stats Overlay on desktop -->
            <svg class="absolute hidden lg:block left-[430px] -bottom-4 w-44 h-16 pointer-events-none text-white/50" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- S-curve line -->
              <path d="M5 10C35 48, 100 55, 140 25" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round"/>
              <path d="M140 25C148 19, 155 12, 160 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <!-- Arrow head -->
              <path d="M150 4.5L161.5 4L158.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <!-- Right Column: Big Card Image -->
        <div class="lg:col-span-5 flex justify-center lg:justify-end relative">
          <!-- Card Container -->
          <div 
            class="relative w-full max-w-[480px] aspect-[4/5] rounded-[3rem] overflow-hidden p-6 sm:p-8 flex flex-col justify-end transition-colors duration-300"
            :style="{ backgroundColor: imageCardBgColor }"
          >
            <!-- Main Image -->
            <NuxtImg 
              :src="imageUrl || heroImageUrl || '/img/demos/detailing-polish.jpg'" 
              alt="Service Visual"
              class="absolute inset-0 w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
              format="webp"
              loading="eager"
              fetchpriority="high"
            />
            
            <!-- White Overlay Card (Satisfied Customers) -->
            <div class="relative z-10 bg-white text-stone-900 rounded-2xl p-4 shadow-xl flex items-center gap-4 max-w-[320px] mb-2 border border-stone-100">
              <!-- Avatars Stack -->
              <div class="flex -space-x-3 overflow-hidden">
                <div class="w-10 h-10 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">JD</div>
                <div class="w-10 h-10 rounded-full border-2 border-white bg-stone-300 flex items-center justify-center text-xs font-bold text-stone-700">AS</div>
                <div class="w-10 h-10 rounded-full border-2 border-white bg-stone-400 flex items-center justify-center text-xs font-bold text-stone-800">MK</div>
              </div>
              
              <!-- Stats Content -->
              <div class="flex flex-col">
                <span class="text-lg font-black leading-none text-stone-900">{{ statsNumber }}</span>
                <span class="text-xs font-semibold text-stone-500 mt-0.5 leading-none">{{ statsLabel }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  bgColor: {
    type: String,
    default: '#0B4A3A'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  accentColor: {
    type: String,
    default: '#b0f53c'
  },
  title: {
    type: String,
    default: 'Безупречное качество и'
  },
  highlightText: {
    type: String,
    default: 'результат'
  },
  subtitle: {
    type: String,
    default: 'Профессиональный сервис с официальной гарантией и вниманием к каждой детали.'
  },
  ctaText: {
    type: String,
    default: 'Записаться онлайн'
  },
  ctaUrl: {
    type: String,
    default: '#contacts'
  },
  phoneLabel: {
    type: String,
    default: 'Звоните ежедневно'
  },
  phoneValue: {
    type: String,
    default: '+7 (700) 000-00-00'
  },
  heroImageUrl: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  imageCardBgColor: {
    type: String,
    default: '#dbe7d6'
  },
  statsNumber: {
    type: String,
    default: '2000+'
  },
  statsLabel: {
    type: String,
    default: 'Довольных клиентов'
  },
  trustBadgeStyle: {
    type: String,
    default: 'squares'
  },
  trustBadges: {
    type: Array,
    default: () => [
      { type: '2gis', name: '2ГИС', label: 'Рейтинг 5.0', starsCount: 5 },
      { type: 'google', name: 'Google', label: 'Рейтинг 4.9', starsCount: 5 }
    ]
  }
})

const getBadgeColor = (type) => {
  switch (type) {
    case 'trustpilot':
      return '#00B67A'
    case '2gis':
      return '#37B34A'
    case 'capterra':
      return '#FF2E5F'
    case 'google':
      return '#F9AB00'
    case 'yandex':
      return '#FC3F1D'
    default:
      return '#EAB308'
  }
}
</script>

<style scoped>
.hover\:scale-103:hover {
  transform: scale(1.03);
}
</style>
