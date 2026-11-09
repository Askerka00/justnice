<template>
  <section 
    class="w-full py-10 sm:py-14 overflow-hidden border-b border-stone-100"
    :style="{ backgroundColor: bgColor }"
  >
    <div class="max-w-[1440px] mx-auto px-4 text-center mb-6">
      <span 
        class="text-xs sm:text-sm font-semibold tracking-widest uppercase"
        :style="{ color: textColor }"
      >
        {{ title }}
      </span>
    </div>

    <!-- Infinite Marquee Container -->
    <div class="relative w-full overflow-hidden flex items-center select-none">
      <!-- Gradient overlays for fading edges -->
      <div class="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" v-if="bgColor === '#ffffff'"></div>
      <div class="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" v-if="bgColor === '#ffffff'"></div>

      <div 
        class="flex gap-16 md:gap-24 items-center marquee-track min-w-full shrink-0 py-4"
        :style="{ animationDuration: speed }"
      >
        <!-- Render double set of logos for seamless infinite loop -->
        <div 
          v-for="n in 2" 
          :key="n" 
          class="flex shrink-0 items-center justify-around gap-16 md:gap-24 min-w-full"
        >
          <template v-if="logos && logos.length > 0">
            <div 
              v-for="(logo, lIdx) in logos" 
              :key="lIdx"
              class="flex items-center gap-3 text-stone-400 hover:text-stone-600 transition-colors duration-300"
            >
              <img 
                v-if="logo.image" 
                :src="logo.image" 
                class="h-8 object-contain filter grayscale opacity-60 hover:opacity-100 transition-all duration-300" 
                :alt="logo.name || 'logo'" 
              />
              <Icon 
                v-else-if="logo.icon" 
                :name="logo.icon || 'lucide:activity'" 
                class="w-6 h-6 shrink-0" 
              />
              <svg v-else class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                <path d="M2 12h20"/>
              </svg>
              <span v-if="logo.name" class="text-lg font-bold tracking-tight">{{ logo.name }}</span>
            </div>
          </template>
          <template v-else>
            <!-- Logo 1: Goldwell -->
            <div class="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors duration-300">
              <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
                <line x1="12" y1="22" x2="12" y2="15.5"/>
                <polyline points="22 8.5 12 15.5 2 8.5"/>
                <polyline points="2 15.5 12 15.5 22 15.5"/>
              </svg>
              <span class="text-lg font-bold tracking-tight">Goldwell</span>
            </div>

            <!-- Logo 2: Ikigai Labs -->
            <div class="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors duration-300">
              <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="8" width="18" height="8" rx="4"/>
                <circle cx="9" cy="12" r="1.5"/>
                <circle cx="15" cy="12" r="1.5"/>
              </svg>
              <span class="text-lg font-semibold tracking-tight">Ikigai Labs</span>
            </div>

            <!-- Logo 3: Layers -->
            <div class="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors duration-300">
              <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5Z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              <span class="text-lg font-medium tracking-tight">Layers</span>
            </div>

            <!-- Logo 4: Ollio -->
            <div class="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors duration-300">
              <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 3a9 9 0 0 0-9 9h9Z"/>
              </svg>
              <span class="text-lg font-extrabold tracking-tight">Ollio</span>
            </div>

            <!-- Logo 5: Europa -->
            <div class="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors duration-300">
              <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                <path d="M2 12h20"/>
              </svg>
              <span class="text-lg font-bold tracking-wider uppercase">Europa</span>
            </div>

            <!-- Logo 6: Galileo -->
            <div class="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors duration-300">
              <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 3a9 9 0 1 0 9 9h-9z"/>
              </svg>
              <span class="text-lg font-semibold tracking-tight">Galileo</span>
            </div>

            <!-- Logo 7: Goodwell -->
            <div class="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors duration-300">
              <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span class="text-lg font-black tracking-tight">Goodwell</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Our Exceptional Clients'
  },
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#0B4A3A'
  },
  speed: {
    type: String,
    default: '25s'
  },
  logos: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee linear infinite;
}

@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

/* Pause animation on hover for better user experience */
.marquee-track:hover {
  animation-play-state: paused;
}
</style>
