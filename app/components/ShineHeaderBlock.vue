<template>
  <header class="w-full font-sans">
    <!-- Top Bar -->
    <div 
      class="w-full py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm font-medium transition-colors duration-300"
      :style="{ backgroundColor: topBarBgColor, color: topBarTextColor }"
    >
      <div class="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 sm:gap-4">
        <!-- Contact details -->
        <div class="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <a :href="`tel:${phone}`" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>{{ phone }}</span>
          </a>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{{ workingHours }}</span>
          </div>
        </div>
        <!-- Service area -->
        <a :href="serviceAreaUrl" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{{ serviceAreaText }}</span>
        </a>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <div 
      class="w-full py-4 sm:py-5 px-4 sm:px-6 lg:px-8 border-b border-white/5 transition-colors duration-300"
      :style="{ backgroundColor: bgColor }"
    >
      <div class="max-w-[1440px] mx-auto flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2.5 group">
          <div 
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
            :style="{ backgroundColor: topBarBgColor, color: bgColor }"
          >
            <!-- Broom/Sparkle icon -->
            <svg class="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 4-3-3-3 3"/>
              <path d="M12 1v14"/>
              <path d="M5.5 12h13"/>
              <path d="M9 18h6"/>
              <path d="M10 22h4"/>
            </svg>
          </div>
          <span class="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:opacity-90 transition-opacity">
            {{ logoText }}
          </span>
        </a>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center gap-8 lg:gap-10">
          <template v-for="(item, idx) in (links && links.length ? links : menuItems)" :key="idx">
            <!-- Dropdown Menu Item -->
            <div v-if="item.children && item.children.length" class="relative group/menu">
              <button class="flex items-center gap-1.5 text-white/95 hover:text-white font-medium text-sm lg:text-base py-2 transition-colors focus:outline-none">
                <span>{{ item.label }}</span>
                <svg class="w-4 h-4 opacity-70 group-hover/menu:rotate-180 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              
              <!-- Dropdown Panel -->
              <div class="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-200 z-50">
                <div class="bg-stone-900 border border-white/10 rounded-xl shadow-xl overflow-hidden p-1.5">
                  <a 
                    v-for="(child, cIdx) in item.children" 
                    :key="cIdx"
                    :href="child.url"
                    class="block px-4 py-2 text-sm text-stone-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {{ child.label }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Single Menu Item -->
            <a 
              v-else 
              :href="item.url" 
              class="text-white/85 hover:text-white font-medium text-sm lg:text-base py-2 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-current after:transition-all after:duration-250"
            >
              {{ item.label }}
            </a>
          </template>
        </nav>

        <!-- Call to Action Button & Mobile Trigger -->
        <div class="flex items-center gap-4">
          <a 
            :href="buttonUrl || ctaUrl" 
            class="hidden sm:flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:border-white/50 text-white font-medium rounded-full text-sm hover:bg-white/5 transition-all duration-350 active:scale-95"
          >
            <span>{{ buttonText || ctaText }}</span>
            <!-- Speech bubble icon -->
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </a>

          <!-- Mobile Menu Toggle Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 text-white hover:text-stone-300 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
            <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" x2="6" y1="6" y2="18"/>
              <line x1="6" x2="18" y1="6" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="-translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-4 opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden px-4 py-6 border-b border-white/5 space-y-4 transition-colors duration-300"
        :style="{ backgroundColor: bgColor }"
      >
        <div class="flex flex-col gap-3.5">
          <template v-for="(item, idx) in (links && links.length ? links : menuItems)" :key="idx">
            <div v-if="item.children && item.children.length" class="space-y-1.5">
              <div class="text-xs font-semibold text-white/50 tracking-wider uppercase px-2 pt-2">
                {{ item.label }}
              </div>
              <a 
                v-for="(child, cIdx) in item.children" 
                :key="cIdx"
                :href="child.url"
                class="block px-4 py-2 text-base text-stone-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                @click="isMobileMenuOpen = false"
              >
                {{ child.label }}
              </a>
            </div>
            <a 
              v-else 
              :href="item.url" 
              class="block px-4 py-2.5 text-lg font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              @click="isMobileMenuOpen = false"
            >
              {{ item.label }}
            </a>
          </template>
        </div>

        <div class="pt-4 border-t border-white/10 flex flex-col gap-4">
          <a 
            :href="buttonUrl || ctaUrl" 
            class="flex items-center justify-center gap-2 px-5 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-full text-base transition-colors"
            @click="isMobileMenuOpen = false"
          >
            <span>{{ buttonText || ctaText }}</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

defineProps({
  phone: {
    type: String,
    default: '+7 (700) 000-00-00'
  },
  workingHours: {
    type: String,
    default: 'Ежедневно 09:00 – 21:00'
  },
  serviceAreaText: {
    type: String,
    default: 'Казахстан'
  },
  serviceAreaUrl: {
    type: String,
    default: '#contacts'
  },
  bgColor: {
    type: String,
    default: '#09090b'
  },
  topBarBgColor: {
    type: String,
    default: '#f59e0b'
  },
  topBarTextColor: {
    type: String,
    default: '#09090b'
  },
  logoText: {
    type: String,
    default: 'PRO STUDIO'
  },
  links: {
    type: Array,
    default: () => []
  },
  menuItems: {
    type: Array,
    default: () => [
      { label: 'О нас', url: '#about' },
      { label: 'Услуги', url: '#services' },
      { label: 'Преимущества', url: '#features' },
      { label: 'Контакты', url: '#contacts' }
    ]
  },
  buttonText: String,
  buttonUrl: String,
  ctaText: {
    type: String,
    default: 'Связаться'
  },
  ctaUrl: {
    type: String,
    default: '#contacts'
  }
})
</script>
