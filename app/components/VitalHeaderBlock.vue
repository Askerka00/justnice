<template>
  <header class="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/60 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      
      <!-- Logo -->
      <a href="#" class="flex items-center space-x-2.5 group">
        <template v-if="logoImage">
          <img :src="logoImage" :alt="logoText || 'Logo'" :class="[logoClass || '', 'h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105']" />
        </template>
        <template v-else>
          <!-- Primary Squircle Icon -->
          <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
            <Icon name="lucide:flame" class="w-[22px] h-[22px] text-white" />
          </div>
        </template>
        <span v-if="!hideLogoText" class="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-primary transition-colors">
          {{ logoText || 'Vital+Flow' }}
        </span>
      </a>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center space-x-8 text-[15px] font-medium text-zinc-600 pl-4">
        <a v-for="link in links" 
           :key="link.label" 
           :href="link.url" 
           class="hover:text-primary transition-colors duration-200">
          {{ link.label }}
        </a>
      </div>

      <!-- Action Button / Phone -->
      <div class="hidden md:flex items-center space-x-4">
        <a :href="formattedButtonUrl" 
           class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-90 transition-all duration-200 shadow-md shadow-primary/10">
          <Icon v-if="isPhoneButton" name="lucide:phone" class="w-4 h-4 mr-2" />
          {{ buttonText || 'Связаться' }}
        </a>
      </div>

      <!-- Hamburger Menu Button -->
      <div class="flex md:hidden items-center">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-zinc-600 hover:text-primary p-2 focus:outline-none transition-colors">
          <Icon v-if="!isMobileMenuOpen" name="lucide:menu" class="w-6 h-6" />
          <Icon v-else name="lucide:x" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-10px]"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col space-y-3.5 shadow-inner">
        <a 
          v-for="link in links" 
          :key="link.label" 
          :href="link.url" 
          @click="isMobileMenuOpen = false"
          class="text-[15px] font-medium text-zinc-700 hover:text-primary py-1 transition-colors"
        >
          {{ link.label }}
        </a>
        <a 
          :href="formattedButtonUrl" 
          @click="isMobileMenuOpen = false"
          class="inline-flex items-center justify-center w-full py-3 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-90 transition-colors shadow-md shadow-primary/10"
        >
          <Icon v-if="isPhoneButton" name="lucide:phone" class="w-4 h-4 mr-2" />
          {{ buttonText || 'Связаться' }}
        </a>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  logoText: String,
  logoImage: String,
  logoClass: String,
  hideLogoText: Boolean,
  links: {
    type: Array,
    default: () => [
      { label: 'О нас', url: '#about' },
      { label: 'Услуги', url: '#services' },
      { label: 'Контакты', url: '#contacts' }
    ]
  },
  buttonText: String,
  buttonUrl: String
})

const isMobileMenuOpen = ref(false)

const isPhoneButton = computed(() => {
  if (!props.buttonText) return false
  return /^\+?[0-9\s\-()]{7,}$/.test(props.buttonText.trim())
})

const formattedButtonUrl = computed(() => {
  if (props.buttonUrl) return props.buttonUrl
  if (isPhoneButton.value) {
    return `tel:${props.buttonText.replace(/[^0-9+]/g, '')}`
  }
  return '#contact'
})
</script>

<style scoped>
header {
  -webkit-backdrop-filter: blur(12px);
}
</style>
