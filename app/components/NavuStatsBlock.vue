<template>
  <div class="w-full bg-[#f7f8f7] py-12 md:py-16 px-6 md:px-12 flex items-center justify-center border-t border-[#edeeec] font-sans">
    <div class="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8">
      
      <!-- STATS COUNTERS GROUP (Appears at bottom on mobile: order-3, and horizontal/vertical responsive) -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-10 order-3 lg:order-1">
        <div 
          v-for="(stat, index) in statsList" 
          :key="index"
          class="flex flex-col items-center text-center min-w-[120px]"
        >
          <!-- Value with colored suffix -->
          <div class="text-[28px] md:text-[32px] font-medium text-[#0c0e0c] leading-tight tracking-tight select-none">
            <span>{{ stat.value }}</span>
            <span class="text-[#adafac] font-medium">{{ stat.suffix }}</span>
          </div>
          <!-- Label -->
          <p class="text-[14px] text-[#51554e] font-normal leading-[1.3] tracking-[-0.04em] mt-2 max-w-[150px] select-none">
            {{ stat.label }}
          </p>
        </div>
      </div>

      <!-- SEPARATOR 1 (Only on desktop: order-2) -->
      <div class="hidden lg:block w-[1px] h-[82px] bg-gradient-to-b from-transparent via-[#d6d7d5] to-transparent order-2"></div>

      <!-- TRUSTED BRANDS SECTION (Appears at top on mobile: order-1) -->
      <div class="flex flex-col items-center justify-center min-w-[200px] order-1 lg:order-3">
        <p class="text-[14px] text-[#51554e] font-normal leading-[1.3] tracking-[-0.04em] mb-4 select-none">
          {{ trustedText }}
        </p>
        <!-- Vertical Logo Marquee -->
        <div class="relative w-[180px] h-[40px] overflow-hidden flex items-center justify-center">
          <div class="flex flex-col items-center gap-8 animate-marquee-vertical py-2">
            <!-- First set of brands -->
            <div 
              v-for="(brand, idx) in resolvedBrands" 
              :key="'a-' + idx"
              class="h-[30px] flex items-center justify-center"
            >
              <img 
                :src="brand" 
                alt="Brand logo" 
                class="h-full max-w-[160px] object-contain opacity-90 select-none pointer-events-none" 
              />
            </div>
            <!-- Duplicated set for infinite loop -->
            <div 
              v-for="(brand, idx) in resolvedBrands" 
              :key="'b-' + idx"
              class="h-[30px] flex items-center justify-center"
            >
              <img 
                :src="brand" 
                alt="Brand logo" 
                class="h-full max-w-[160px] object-contain opacity-90 select-none pointer-events-none" 
              />
            </div>
          </div>
        </div>
      </div>

      <!-- SEPARATOR 2 (Only on desktop: order-4) -->
      <div class="hidden lg:block w-[1px] h-[82px] bg-gradient-to-b from-transparent via-[#d6d7d5] to-transparent order-4"></div>

      <!-- LOVED BY CLIENTS SECTION (Appears in middle on mobile: order-2) -->
      <div class="flex flex-col items-center justify-center min-w-[200px] order-2 lg:order-5">
        <p class="text-[14px] text-[#51554e] font-normal leading-[1.3] tracking-[-0.04em] mb-4 select-none">
          {{ lovedText }}
        </p>
        
        <!-- Overlapping Avatars Container -->
        <div class="relative flex items-center justify-center h-[52px] w-[180px] select-none">
          <div class="flex items-center -space-x-3.5 relative">
            
            <!-- Avatar 1 (Leftmost, 28px) -->
            <div class="w-7 h-7 rounded-full border border-white overflow-hidden z-[1] shadow-sm flex-shrink-0">
              <img :src="resolvedAvatars[0]" alt="Client 1" class="w-full h-full object-cover" />
            </div>

            <!-- Avatar 2 (32px) -->
            <div class="w-8 h-8 rounded-full border border-white overflow-hidden z-[2] shadow-sm flex-shrink-0">
              <img :src="resolvedAvatars[1]" alt="Client 2" class="w-full h-full object-cover" />
            </div>

            <!-- Avatar 3 (Center, 44px) -->
            <div class="relative w-11 h-11 rounded-full border-[1.5px] border-white z-[3] shadow-md flex-shrink-0">
              <img :src="resolvedAvatars[2]" alt="Client 3" class="w-full h-full object-cover rounded-full" />
              <!-- Orange Star Badge -->
              <div class="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#fb8c00] border border-white flex items-center justify-center shadow-sm z-10">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                </svg>
              </div>
            </div>

            <!-- Avatar 4 (32px) -->
            <div class="w-8 h-8 rounded-full border border-white overflow-hidden z-[2] shadow-sm flex-shrink-0">
              <img :src="resolvedAvatars[3]" alt="Client 4" class="w-full h-full object-cover" />
            </div>

            <!-- Avatar 5 (Rightmost, 28px) -->
            <div class="w-7 h-7 rounded-full border border-white overflow-hidden z-[1] shadow-sm flex-shrink-0">
              <img :src="resolvedAvatars[4]" alt="Client 5" class="w-full h-full object-cover" />
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useImageResolver } from '~/composables/useImageResolver'

const props = defineProps({
  stats: {
    type: Array,
    default: () => []
  },
  trustedText: {
    type: String,
    default: 'Нам доверяют компании по всему Казахстану'
  },
  lovedText: {
    type: String,
    default: 'Высокая оценка заказчиков'
  },
  brands: {
    type: Array,
    default: () => []
  },
  avatars: {
    type: Array,
    default: () => []
  }
})

const { resolveImage } = useImageResolver()

// Default fallback data matching original site
const statsList = computed(() => {
  if (props.stats && props.stats.length > 0) return props.stats
  return [
    { value: '500', suffix: '+', label: 'Outdoor spaces transformed' },
    { value: '95', suffix: '%', label: 'Client satisfaction' },
    { value: '48', suffix: 'h', label: 'Average project start time' }
  ]
})

const defaultBrands = [
  '@landscaping/navu-brand-1',
  '@landscaping/navu-brand-2',
  '@landscaping/navu-brand-3',
  '@landscaping/navu-brand-4',
  '@landscaping/navu-brand-5'
]

const resolvedBrands = computed(() => {
  const list = props.brands && props.brands.length > 0 ? props.brands : defaultBrands
  return list.map(img => resolveImage(img))
})

const defaultAvatars = [
  '@landscaping/navu-avatar-1',
  '@landscaping/navu-avatar-2',
  '@landscaping/navu-avatar-3',
  '@landscaping/navu-avatar-4',
  '@landscaping/navu-avatar-5'
]

const resolvedAvatars = computed(() => {
  const list = props.avatars && props.avatars.length > 0 ? props.avatars : defaultAvatars
  return list.map(img => resolveImage(img))
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

.font-sans {
  font-family: 'DM Sans', sans-serif !important;
}

/* Vertical marquee animation for brands */
@keyframes marquee-vertical {
  0% {
    transform: translateY(0);
  }
  100% {
    /* Translate by 50% which is the height of one full set of brands (including gaps) */
    transform: translateY(-50%);
  }
}

.animate-marquee-vertical {
  /* 5 brands, each 30px height + 32px gap = 62px * 5 = 310px total half height */
  animation: marquee-vertical 12s linear infinite;
}

/* Pause animation on hover for interactive feel */
.animate-marquee-vertical:hover {
  animation-play-state: paused;
}
</style>
