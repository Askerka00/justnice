<template>
  <section class="relative w-full h-[800px] min-h-[600px] bg-[#0c0e0c] text-white overflow-hidden select-none font-sans">
    
    <!-- BEFORE/AFTER SLIDER LAYER (FULL BACKGROUND) -->
    <div class="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <!-- Before Image (Base layer) -->
      <div class="absolute inset-0 w-full h-full">
        <NuxtImg 
          :src="imgBefore" 
          alt="Before condition" 
          class="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div class="absolute inset-0 bg-black/30 pointer-events-none"></div>
      </div>

      <!-- After Image (Overlay layer with clip-path) -->
      <div 
        class="absolute inset-0 w-full h-full"
        :style="{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }"
      >
        <NuxtImg 
          :src="imgAfter" 
          alt="After transformation" 
          class="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div class="absolute inset-0 bg-black/15 pointer-events-none"></div>
      </div>

      <!-- LEFT SIDE GRADIENT FOR TEXT CONTRAST -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-[1] pointer-events-none"></div>

      <!-- SLIDER CONTROL LINE & HANDLE (POSITIONED NEAR BOTTOM) -->
      <div 
        class="absolute top-0 bottom-0 w-[1.5px] bg-white/70 shadow-lg pointer-events-none z-10"
        :style="{ left: sliderPos + '%' }"
      ></div>
      <div 
        class="absolute bottom-[96px] -translate-x-1/2 w-11 h-11 rounded-full bg-[#0c0e0c]/40 border border-white/60 backdrop-blur-md text-white flex items-center justify-center pointer-events-none z-10 shadow-2xl transition-all duration-200"
        :class="{ 'scale-110': isDragging }"
        :style="{ left: sliderPos + '%' }"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white">
          <path d="M7 8L2 12L7 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 8L22 12L17 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12H22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- BEFORE TEXT LABEL (RIGHT BOTTOM, ON THE LINE LEVEL) -->
      <div 
        class="absolute bottom-[96px] right-6 md:right-12 z-10 pointer-events-none transition-opacity duration-300 font-sans" 
        :style="{ opacity: sliderPos < 80 ? 1 : 0 }"
      >
        <span class="text-xs font-normal text-white/50 block mb-0.5 text-right text-shadow">Before</span>
        <span class="text-sm md:text-[15px] font-medium text-white text-shadow text-right block">condition</span>
      </div>

      <!-- HIDDEN INPUT RANGE FOR SEAMLESS TOUCH/MOUSE CONTROL -->
      <input 
        type="range" 
        min="0" 
        max="100" 
        v-model.number="sliderPos"
        @mousedown="isDragging = true"
        @mouseup="isDragging = false"
        @touchstart="isDragging = true"
        @touchend="isDragging = false"
        class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
    </div>

    <!-- MAIN HEADER & CONTENT OVERLAYS -->
    <div class="relative w-full h-full z-10 flex flex-col justify-between pointer-events-none">
      
      <!-- HEADER -->
      <header class="w-full pointer-events-auto transition-all duration-300 bg-transparent py-6 md:py-8 px-6 md:px-12">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <!-- Logo -->
          <a href="#" class="flex items-center flex-shrink-0 group">
            <img 
              :src="logoImage || '/img/landscaping/navu-logo.svg'" 
              :alt="logoText" 
              class="h-[30px] w-auto transition-transform duration-300 group-hover:scale-[1.01]" 
            />
          </a>

          <!-- Desktop Navigation Menu -->
          <nav class="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a 
              v-for="link in linksList" 
              :key="link.label" 
              :href="link.url"
              class="text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-200 font-sans tracking-tight"
            >
              {{ link.label }}
            </a>
          </nav>

          <!-- Desktop CTA -->
          <div class="hidden md:block">
            <a 
              :href="ctaUrl"
              target="_blank"
              class="inline-flex items-center justify-center bg-primary hover:opacity-95 text-white text-[15px] font-medium rounded-full px-5 py-2.5 transition-all duration-200 hover:scale-[1.01] font-sans tracking-tight"
            >
              {{ headerCta?.label || 'Get a quote' }}
            </a>
          </div>

          <!-- Mobile Hamburger Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full bg-black/40 border border-white/10 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <span 
              class="block w-4 h-0.5 bg-white transition-all duration-300"
              :class="{ 'rotate-45 translate-y-1': isMobileMenuOpen, '-translate-y-0.5': !isMobileMenuOpen }"
            ></span>
            <span 
              class="block w-4 h-0.5 bg-white my-0.5 transition-all duration-300"
              :class="{ 'opacity-0': isMobileMenuOpen }"
            ></span>
            <span 
              class="block w-4 h-0.5 bg-white transition-all duration-300"
              :class="{ '-rotate-45 -translate-y-1': isMobileMenuOpen, 'translate-y-0.5': !isMobileMenuOpen }"
            ></span>
          </button>
        </div>
      </header>

      <!-- MOBILE MENU DROPDOWN -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div 
          v-if="isMobileMenuOpen" 
          class="absolute top-20 left-4 right-4 bg-[#0c0e0c]/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col space-y-4 md:hidden z-30 pointer-events-auto shadow-2xl"
        >
          <a 
            v-for="link in linksList" 
            :key="link.label" 
            :href="link.url"
            @click="isMobileMenuOpen = false"
            class="text-[15px] font-medium text-white/80 hover:text-white py-2 border-b border-white/5 transition-colors duration-200 font-sans tracking-tight"
          >
            {{ link.label }}
          </a>
          <a 
            :href="ctaUrl"
            target="_blank"
            @click="isMobileMenuOpen = false"
            class="w-full text-center bg-primary hover:opacity-95 text-white text-[15px] font-medium rounded-xl py-3 mt-2 transition-all duration-200 block font-sans tracking-tight"
          >
            {{ headerCta?.label || 'Get a quote' }}
          </a>
        </div>
      </transition>

      <!-- HERO CONTENT -->
      <main class="w-full flex-grow flex items-center px-6 md:px-12 py-16 md:py-24">
        <div class="max-w-7xl mx-auto w-full flex flex-col justify-center h-full text-left">
          
          <div class="max-w-3xl space-y-8 pointer-events-auto">
            <!-- Title -->
            <h1 
              class="text-[36px] sm:text-[44px] md:text-[56px] font-medium tracking-[-0.04em] text-white leading-[1.2] font-sans filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
              v-html="title || 'Transform your outdoor<br/>space in weeks'"
            ></h1>

            <!-- Description, After label and CTA button in a structured layout -->
            <div class="flex flex-col md:flex-row items-start gap-4 md:gap-8 w-full font-sans">
              
              <!-- After transformation Label (Left column, aligned with description) -->
              <div 
                class="w-full md:w-[18%] pt-1 flex-shrink-0 transition-opacity duration-300"
                :style="{ opacity: sliderPos > 20 ? 1 : 0 }"
              >
                <span class="text-xs font-normal text-white/50 block mb-0.5 text-shadow">After</span>
                <span class="text-sm md:text-[15px] font-medium text-white text-shadow block">transformation</span>
              </div>

              <!-- Right Column (Description and Button stacked vertically) -->
              <div class="flex flex-col items-start gap-8 flex-grow">
                <!-- Subtitle/Description -->
                <p 
                  class="text-white/90 text-[16px] sm:text-[18px] md:text-[20px] tracking-[-0.04em] leading-[1.4] max-w-lg font-normal font-sans filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
                  v-html="description || 'Clean, structured outdoor spaces designed for comfort, function, and long-term value.'"
                ></p>

                <!-- CTA Button -->
                <a 
                  :href="whatsappUrl" 
                  target="_blank"
                  class="group inline-flex items-center justify-center px-6 py-4 rounded-[14px] bg-primary hover:opacity-95 text-white font-medium text-base transition-all duration-300 hover:scale-[1.01] font-sans tracking-[-0.04em] cursor-pointer"
                >
                  <span>{{ primaryCta?.label || 'Get this result' }}</span>
                  <span class="ml-2 transition-transform duration-300 transform group-hover:translate-x-1 font-sans">»</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </main>

      <!-- EMPTY SPACER (for symmetry and flex layout) -->
      <div class="h-8 md:h-12 w-full"></div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useImageResolver } from '~/composables/useImageResolver'

const props = defineProps({
  logoText: {
    type: String,
    default: 'Navu'
  },
  logoImage: {
    type: String,
    default: '/img/landscaping/navu-logo.svg'
  },
  navLinks: Array,
  headerCta: Object,
  title: String,
  description: String,
  primaryCta: Object,
  imageBefore: {
    type: String,
    default: '@landscaping/navu-hero-before'
  },
  imageAfter: {
    type: String,
    default: '@landscaping/navu-hero-after'
  },
  whatsappPhone: {
    type: String,
    default: '77016404818'
  },
  whatsappMessage: {
    type: String,
    default: 'Здравствуйте! Хочу заказать расчет благоустройства территории как в результате Navu.'
  }
})

// Image resolution
const { resolveImage } = useImageResolver()
const imgBefore = computed(() => resolveImage(props.imageBefore))
const imgAfter = computed(() => resolveImage(props.imageAfter))

// Slider state
const sliderPos = ref(80) // Default position, shifted to the right as in design mockup
const isDragging = ref(false)
const isMobileMenuOpen = ref(false)

// Fallback links matching navu.framer.website
const linksList = computed(() => {
  if (props.navLinks && props.navLinks.length > 0) return props.navLinks
  return [
    { label: 'Services', url: '#services' },
    { label: 'Projects', url: '#projects' },
    { label: 'Process', url: '#process' },
    { label: 'Pricing', url: '#pricing' },
    { label: 'Reviews', url: '#reviews' },
    { label: 'About', url: '#about' },
    { label: 'Blog', url: '#blog' },
    { label: 'Contact', url: '#contact' }
  ]
})

// Links URL resolution
const ctaUrl = computed(() => {
  if (props.headerCta?.url) return props.headerCta.url
  return whatsappUrl.value
})

const whatsappUrl = computed(() => {
  if (props.primaryCta?.url && !props.primaryCta.url.startsWith('#')) return props.primaryCta.url
  const phone = props.whatsappPhone.replace(/[^0-9]/g, '')
  const text = encodeURIComponent(props.whatsappMessage)
  return `https://wa.me/${phone}?text=${text}`
})
</script>

<style scoped>
/* Scoped styles for fonts and custom styling elements */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

.font-sans {
  font-family: 'DM Sans', sans-serif !important;
}

/* Custom styling for range input to overlay perfectly */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 40px;
  height: 100vh;
  cursor: ew-resize;
  background: transparent;
}

input[type="range"]::-moz-range-thumb {
  width: 40px;
  height: 100vh;
  cursor: ew-resize;
  background: transparent;
  border: none;
}

/* Text shadow helper to replicate clean framer styles on background images */
.text-shadow {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
</style>
