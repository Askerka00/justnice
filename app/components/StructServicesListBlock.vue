<template>
  <section id="services" class="relative w-full bg-[#f4f5f0] text-zinc-900 py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      <!-- Left Column (5 cols on lg) -->
      <div class="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
        
        <!-- Tag Badge -->
        <SectionBadge :text="tagText" default-style="sharp" />
        
        <!-- Title -->
        <h2 v-if="title" class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 font-outfit leading-tight">
          {{ title }}
        </h2>
        
        <!-- Description -->
        <p v-if="description" class="text-zinc-700 text-base md:text-lg leading-relaxed max-w-md">
          {{ description }}
        </p>
        
        <!-- Button -->
        <div v-if="buttonText" class="pt-2">
          <a 
            :href="buttonUrl" 
            target="_blank"
            class="inline-flex items-center space-x-3 bg-zinc-950 text-white font-bold text-xs tracking-[0.15em] px-8 py-4 rounded-xl uppercase transition-all duration-200 hover:bg-primary shadow-md"
          >
            <span>{{ buttonText }}</span>
            <Icon name="lucide:arrow-up-right" class="w-4 h-4" />
          </a>
        </div>
        
        <!-- Contact Block (only if contactPhone is explicitly provided) -->
        <div v-if="contactPhone" class="space-y-1.5 pt-4 border-t border-zinc-950/10 max-w-xs">
          <p class="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            {{ contactTitle || 'Бесплатная консультация' }}
          </p>
          <a :href="`tel:${contactPhone.replace(/[^0-9+]/g, '')}`" class="block text-sm md:text-base font-bold text-zinc-900 hover:text-primary font-outfit">
            Тел: {{ contactPhone }}
          </a>
        </div>
        
      </div>
      
      <!-- Right Column (7 cols on lg) -->
      <div class="lg:col-span-7 divide-y divide-zinc-950/10 border-t border-b border-zinc-950/10">
        
        <!-- Service Row -->
        <div 
          v-for="(service, idx) in services" 
          :key="idx" 
          class="grid grid-cols-1 sm:grid-cols-12 gap-4 py-7 items-start group"
        >
          <!-- Number -->
          <div class="sm:col-span-1 text-sm font-bold text-primary font-outfit pt-0.5">
            {{ service.num || `#0${idx + 1}` }}
          </div>
          
          <!-- Title + Badge + Price -->
          <div class="sm:col-span-5 space-y-2 pr-2">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-lg font-bold text-zinc-900 font-outfit leading-snug group-hover:text-primary transition-colors">
                {{ service.title }}
              </h3>
              <span v-if="service.badge" class="inline-block bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {{ service.badge }}
              </span>
            </div>
            <div v-if="service.price" class="text-base font-extrabold text-primary font-outfit">
              {{ service.price }}
            </div>
          </div>
          
          <!-- Description -->
          <p class="sm:col-span-6 text-sm md:text-base text-zinc-600 leading-relaxed font-normal">
            {{ service.description || service.text }}
          </p>
        </div>
        
      </div>
      
    </div>
  </section>
</template>

<script setup>
defineProps({
  tagText: {
    type: String,
    default: 'УСЛУГИ И ЦЕНЫ'
  },
  title: {
    type: String,
    default: 'Наши услуги и прайс-лист'
  },
  description: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'ЗАПИСАТЬСЯ ОНЛАЙН'
  },
  buttonUrl: {
    type: String,
    default: '#contacts'
  },
  contactTitle: {
    type: String,
    default: 'Бесплатная консультация'
  },
  contactPhone: {
    type: String,
    default: ''
  },
  services: {
    type: Array,
    default: () => []
  }
})
</script>
