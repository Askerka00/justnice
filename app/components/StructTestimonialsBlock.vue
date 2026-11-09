<template>
  <section class="relative w-full bg-[#121212] text-zinc-100 py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
    <div class="max-w-7xl mx-auto space-y-16">
      
      <!-- Top Row (Avatars & Get a Quote) -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        
        <!-- Left: Avatars + Trust Info -->
        <div class="flex items-center space-x-4">
          <!-- Avatar Stack -->
          <div class="flex -space-x-3">
            <img 
              v-for="(avatar, idx) in avatars.slice(0, 4)" 
              :key="idx"
              :src="avatar" 
              alt="Client avatar" 
              class="w-10 h-10 rounded-full object-cover border-2 border-[#121212]"
            />
            <div class="w-10 h-10 rounded-full bg-zinc-800 border-2 border-[#121212] flex items-center justify-center text-[11px] font-bold text-zinc-300 tracking-tighter">
              +99
            </div>
          </div>
          
          <!-- Trust Texts -->
          <div class="space-y-0.5">
            <div class="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
              {{ trustedLabel }}
            </div>
            <div class="text-sm font-semibold text-zinc-300 font-outfit">
              {{ trustedText }}
            </div>
          </div>
        </div>
        
        <!-- Right: Quote Action Link -->
        <div class="flex items-center h-full sm:border-l border-zinc-800 sm:pl-8 py-1">
          <a 
            :href="quoteLinkUrl" 
            class="group inline-flex items-center space-x-2 text-xs font-bold tracking-[0.15em] text-zinc-300 hover:text-white uppercase transition-colors"
          >
            <span>{{ quoteLinkText }}</span>
            <Icon name="lucide:arrow-up-right" class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        
      </div>
      
      <!-- Middle Row (The Big Testimonial Quote) -->
      <div class="space-y-6 max-w-4xl">
        <blockquote class="text-xl md:text-3xl lg:text-3.5xl font-normal text-zinc-300 leading-relaxed tracking-wide font-sans">
          {{ quoteText }}
        </blockquote>
        
        <div class="space-y-1">
          <cite class="not-italic text-sm md:text-base font-bold text-zinc-100 font-outfit">
            {{ authorName }}
          </cite>
          <div class="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase">
            {{ authorRole }}
          </div>
        </div>
      </div>
      
      <!-- Bottom Row (Client Logos section) -->
      <div v-if="logos && logos.length" class="space-y-8 pt-4">
        
        <!-- Label with Line -->
        <div class="relative flex items-center">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-zinc-800"></div>
          </div>
          <div class="relative flex justify-start">
            <span class="border border-zinc-800 bg-[#121212] px-4 py-1.5 text-[9px] md:text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase">
              {{ clientsLabel }}
            </span>
          </div>
        </div>
        
        <!-- Logos Grid -->
        <div class="flex flex-wrap items-center justify-between gap-y-8 gap-x-12 opacity-65 hover:opacity-95 transition-opacity duration-300">
          <div v-for="(logo, lIdx) in logos" :key="lIdx" class="flex items-center space-x-2 text-zinc-300">
            <Icon :name="logo.icon || 'lucide:award'" class="w-5 h-5 text-primary" />
            <span class="text-lg font-bold tracking-tight font-outfit">{{ logo.name || logo }}</span>
          </div>
        </div>
        
      </div>
      
    </div>
  </section>
</template>

<script setup>
defineProps({
  trustedLabel: {
    type: String,
    default: 'НАМ ДОВЕРЯЮТ'
  },
  trustedText: {
    type: String,
    default: 'Тысячи довольных клиентов'
  },
  quoteLinkText: {
    type: String,
    default: 'ОСТАВИТЬ ЗАЯВКУ'
  },
  quoteLinkUrl: {
    type: String,
    default: '#contacts'
  },
  quoteText: {
    type: String,
    default: ''
  },
  authorName: {
    type: String,
    default: 'Клиент компании'
  },
  authorRole: {
    type: String,
    default: 'ОТЗЫВ ИЗ 2ГИС'
  },
  clientsLabel: {
    type: String,
    default: 'РАБОТАЕМ С ЛУЧШИМИ БРЕНДАМИ'
  },
  logos: {
    type: Array,
    default: () => []
  },
  avatars: {
    type: Array,
    default: () => [
      '/img/landscaping/navu-avatar-1.png',
      '/img/landscaping/navu-avatar-2.png',
      '/img/landscaping/navu-avatar-3.png',
      '/img/landscaping/navu-avatar-4.png'
    ]
  }
})
</script>
