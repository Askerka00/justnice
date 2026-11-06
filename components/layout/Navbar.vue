<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white/95 text-black shadow-sm border-b border-[#f2f2f2]' : 'bg-[#000000]/70 text-white backdrop-blur-md border-b border-white/10'
    ]"
  >
    <div class="container-audi-inner flex items-center justify-between h-[6.5rem]">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 h-opacity">
        <div class="flex items-center tracking-tight">
          <span class="text-[2.2rem] font-medium tracking-tight">JUSTNICE</span>
          <span class="ml-2 text-[1.1rem] font-medium tracking-widest text-[#f50537] border border-[#f50537] px-1.5 py-0.2 uppercase">AUTOTECH</span>
        </div>
      </NuxtLink>

      <!-- Desktop Nav Menu -->
      <nav class="hidden lg:flex items-center gap-[3.2rem] text-[1.6rem] font-normal">
        <a href="#models" class="h-opacity py-2 transition-opacity">Модельный ряд</a>
        <a href="#technologies" class="h-opacity py-2 transition-opacity">Технологии</a>
        <a href="#calculator" class="h-opacity py-2 transition-opacity">Конфигуратор</a>
        <a href="#process" class="h-opacity py-2 transition-opacity">Стандарты</a>
        <a href="#faq" class="h-opacity py-2 transition-opacity">FAQ</a>
        <a href="#contacts" class="h-opacity py-2 transition-opacity">Контакты</a>
      </nav>

      <!-- Right: Phone & Audi-style Outline Button -->
      <div class="flex items-center gap-6">
        <a
          href="tel:+77003003390"
          class="hidden sm:flex items-center gap-2 text-[1.5rem] font-normal h-opacity"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <span>+7 (700) 300-33-90</span>
        </a>

        <a
          href="https://wa.me/77003003390?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D1%80%D1%83%D1%81%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8E."
          target="_blank"
          rel="noopener noreferrer"
          :class="[
            'btn text-[1.4rem] !py-3 !px-6 !min-w-[14rem]',
            isScrolled ? 'btn-black-default' : 'btn-default'
          ]"
        >
          <span>Оставить заявку</span>
        </a>
      </div>
    </div>
  </header>
</template>
