<template>
  <footer id="contacts" class="bg-[#000000] text-white border-t border-white pt-12 pb-8">
    <div class="container-audi">
      <!-- Footer Nav -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between py-6 gap-6">
        <NuxtLink to="/" class="flex items-center gap-3">
          <span class="text-[2.2rem] font-medium tracking-tight text-white">JUSTNICE</span>
          <span class="text-[1.1rem] font-medium tracking-widest text-[#f50537] border border-[#f50537] px-1.5 py-0.2 uppercase">AUTOTECH</span>
        </NuxtLink>

        <div class="flex flex-wrap items-center gap-8 text-[1.6rem] font-normal text-white">
          <a href="#models" class="h-opacity transition-opacity">Модельный ряд</a>
          <a href="#technologies" class="h-opacity transition-opacity">Технологии</a>
          <a href="#calculator" class="h-opacity transition-opacity">Конфигуратор</a>
          <a href="#process" class="h-opacity transition-opacity">Стандарты</a>
          <a href="#faq" class="h-opacity transition-opacity">FAQ</a>
          <a href="#contacts" class="h-opacity transition-opacity">Контакты</a>
        </div>
      </div>

      <hr class="border-0 h-[1px] bg-[#d9d9d9] opacity-40 my-4" />

      <!-- Disclaimer & Almaty Center Details -->
      <div class="py-12 text-sm text-[#ffffff] font-light leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p class="mb-4">
            Специализированная инженерная лаборатория программной адаптации, русификации и телематики электромобилей и гибридных автомобилей в Республике Казахстан.
          </p>
          <p class="text-[#888888] text-xs">
            Все упомянутые товарные знаки (Zeekr, Li Auto, BYD, Geely, Changan, Toyota) принадлежат их соответствующим правообладателям и используются исключительно для идентификации моделей.
          </p>
        </div>

        <div>
          <p class="font-medium mb-2 text-white">Инженерный центр в Алматы</p>
          <p class="text-[#cccccc] text-xs mb-1">г. Алматы, пр. Абая / ул. Саина (выездные экипажи по всем районам Алматы)</p>
          <p class="text-[#cccccc] text-xs mb-1">График работы: Ежедневно с 09:00 до 21:00 (по предварительной записи)</p>
          <p class="text-[#cccccc] text-xs">Прямая связь: <a href="mailto:info@justnice.me" class="underline">info@justnice.me</a></p>
        </div>
      </div>

      <hr class="border-0 h-[1px] bg-[#d9d9d9] opacity-40 my-4" />

      <!-- Bottom Bar -->
      <div class="py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="text-xs text-[#808080]">Инженерная линия / WhatsApp:</div>
          <a href="tel:+77003003390" class="text-sm font-normal text-white h-opacity">+7 (700) 300-33-90</a>
        </div>

        <div class="text-xs text-white opacity-80">
          2026 © justnice.me — Все права защищены
        </div>
      </div>
    </div>
  </footer>
</template>
