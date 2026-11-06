<template>
  <header class="sticky top-0 z-50 w-full border-b border-white/5 bg-[#08090A]/90 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-cyan-400/40 text-cyan-400 font-black text-xl tracking-tighter shadow-lg shadow-cyan-500/10">
          JN
        </div>
        <div>
          <span class="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
            JUSTNICE <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">AutoTech</span>
          </span>
          <p class="text-[10px] text-gray-400 tracking-wider uppercase font-medium">Лаборатория телематики • Алматы</p>
        </div>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <a href="#models" class="hover:text-cyan-400 transition-colors">Модели авто</a>
        <a href="#services" class="hover:text-cyan-400 transition-colors">Технологии</a>
        <a href="#calculator" class="hover:text-cyan-400 transition-colors">Калькулятор</a>
        <a href="#process" class="hover:text-cyan-400 transition-colors">Процесс</a>
        <a href="#faq" class="hover:text-cyan-400 transition-colors">Вопросы</a>
      </nav>

      <!-- Contacts & CTA -->
      <div class="flex items-center gap-4">
        <a
          href="https://wa.me/77003003390?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D1%80%D1%83%D1%81%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B8%20%D0%B0%D0%B2%D1%82%D0%BE%20%D0%B2%20%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B."
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-emerald-500 transition-all hover:scale-105"
        >
          <span class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
          WhatsApp Онлайн
        </a>

        <a
          href="#calculator"
          class="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all"
        >
          Рассчитать цену
        </a>
      </div>
    </div>
  </header>
</template>
