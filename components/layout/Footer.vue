<template>
  <footer id="contacts" class="scroll-mt-24 bg-[#050608] text-white border-t border-[#222222] pt-14 pb-8">
    <div class="container-audi">
      <!-- Footer Nav -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 gap-6 border-b border-[#222222]">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img
            src="/images/logo-flow.jpg"
            alt="JUSTNICE Emblem"
            class="h-8 w-8 object-cover border border-white/20"
          />
          <span class="text-xl font-bold tracking-tight text-white">JUSTNICE</span>
          <span class="text-[10px] font-bold tracking-widest text-[#f50537] border border-[#f50537] px-1.5 py-0.5 uppercase">AUTOTECH</span>
        </NuxtLink>

        <div class="flex flex-wrap items-center gap-6 text-sm text-[#cccccc]">
          <a href="#models" class="h-opacity transition-opacity">Модельный ряд</a>
          <a href="#calculator" class="h-opacity transition-opacity">Калькулятор</a>
          <a href="#technologies" class="h-opacity transition-opacity">О русификации</a>
          <a href="#process" class="h-opacity transition-opacity">Регламент</a>
          <a href="#faq" class="h-opacity transition-opacity">FAQ</a>
          <a href="#contacts" class="h-opacity transition-opacity">Контакты</a>
        </div>
      </div>

      <!-- SEO Hub: Popular models in Almaty -->
      <div class="py-6 border-b border-[#222222] text-xs text-[#777777]">
        <p class="text-white font-medium mb-2">Русификация и прошивка мультимедиа авто в Алматы:</p>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <NuxtLink to="/brands/zeekr" class="hover:text-white underline transition-colors">Русификация Zeekr 001 / 7X / 007</NuxtLink>
          <NuxtLink to="/brands/geely-monjaro" class="hover:text-white underline transition-colors">Прошивка Geely Monjaro (2024–2026)</NuxtLink>
          <NuxtLink to="/brands/changan" class="hover:text-white underline transition-colors">Русификация Changan Q05 / UNI-Z / UNI-K</NuxtLink>
          <NuxtLink to="/brands/toyota-china" class="hover:text-white underline transition-colors">Русификация Toyota Camry 80 / bZ3</NuxtLink>
          <NuxtLink to="/brands/deepal" class="hover:text-white underline transition-colors">Русификация Deepal S07 / SL03</NuxtLink>
          <NuxtLink to="/brands/tank" class="hover:text-white underline transition-colors">Прошивка Tank 300 / Tank 500</NuxtLink>
          <NuxtLink to="/brands/hongqi" class="hover:text-white underline transition-colors">Русификация Hongqi E-QM5 / H5</NuxtLink>
          <NuxtLink to="/brands/chevrolet-monza" class="hover:text-white underline transition-colors">Русификация Chevrolet Monza (Китай)</NuxtLink>
          <NuxtLink to="/brands/hyundai-kia" class="hover:text-white underline transition-colors">Русификация Hyundai & Kia (Корея / США)</NuxtLink>
          <NuxtLink to="/brands/lixiang" class="hover:text-white underline transition-colors">Прошивка LiXiang L6 / L7 / L8 / L9</NuxtLink>
          <NuxtLink to="/brands/byd" class="hover:text-white underline transition-colors">Русификация BYD Song Plus / Han / Seal</NuxtLink>
        </div>
      </div>

      <!-- Description & Center Details -->
      <div class="py-10 text-xs text-[#888888] font-light leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#222222]">
        <div>
          <p class="text-white font-medium text-sm mb-2">JUSTNICE AutoTech — Лаборатория русификации</p>
          <p class="mb-3">
            Специализированная программная адаптация и локализация китайских электромобилей и гибридов в Алматы. Прошивка интерфейсов, приборных панелей, проекций HUD, лицензионный 2GIS и Яндекс Навигатор.
          </p>
          <p class="text-[#666666]">
            Все торговые марки (Zeekr, Li Auto, BYD, Geely, Changan, Toyota) являются собственностью их владельцев и приведены исключительно для описания совместимости.
          </p>
        </div>

        <div>
          <p class="font-medium text-sm text-white mb-2">Инженерный центр в Алматы</p>
          <p class="text-[#aaaaaa] mb-1">г. Алматы (выезд и прием по предварительной записи)</p>
          <p class="text-[#aaaaaa] mb-1">График работы: Ежедневно 09:00 – 21:00</p>
          <p class="text-[#aaaaaa]">Консультация: <a href="tel:+77772389939" class="text-white font-normal hover:underline">+7 (777) 238-99-39</a></p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
        <div>
          2026 © justnice.me — Профессиональная русификация в Алматы
        </div>

        <div class="flex items-center gap-2">
          <span>Связаться с инженером:</span>
          <a href="https://wa.me/77772389939" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#f50537] transition-colors underline">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
