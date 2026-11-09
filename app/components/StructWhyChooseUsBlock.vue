<template>
  <section class="relative w-full bg-white text-zinc-900 py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      <!-- Left Content Column (7 cols on lg) -->
      <div class="lg:col-span-7 space-y-8" data-aos="fade-up" data-aos-duration="800">
        
        <!-- Tag Badge -->
        <SectionBadge :text="tagText" default-style="sharp" />
        
        <!-- Title -->
        <h2 v-if="title" class="text-4xl md:text-5xl lg:text-6.5xl font-bold tracking-tight text-zinc-950 font-outfit">
          {{ title }}
        </h2>
        
        <!-- Description -->
        <p v-if="description" class="text-zinc-600 text-base md:text-lg leading-relaxed max-w-2xl">
          {{ description }}
        </p>
        
        <!-- Checklist (2 columns) -->
        <ul v-if="(features && features.length) || (items && items.length)" class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl pt-2">
          <li 
            v-for="(feature, idx) in (features && features.length ? features : items)" 
            :key="idx"
            class="flex items-center space-x-3 text-zinc-800"
          >
            <div class="flex-shrink-0">
              <Icon 
                name="lucide:badge-check" 
                class="w-6 h-6 text-primary" 
              />
            </div>
            <span class="text-sm md:text-base font-semibold text-zinc-900">
              {{ typeof feature === 'string' ? feature : (feature.title || feature.text) }}
            </span>
          </li>
        </ul>
        
        <!-- Stats Grid (2x2) -->
        <div v-if="stats && stats.length" class="grid grid-cols-2 gap-y-8 gap-x-4 max-w-xl pt-8 border-t border-zinc-200">
          <div 
            v-for="(stat, idx) in stats" 
            :key="idx" 
            class="space-y-1"
          >
            <div class="text-4xl md:text-5xl font-bold text-zinc-950 font-outfit tracking-tight">
              {{ stat.value }}
            </div>
            <div class="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase leading-snug">
              {{ stat.label }}
            </div>
          </div>
        </div>
        
      </div>
      
      <!-- Right Image Column (5 cols on lg) -->
      <div class="lg:col-span-5 w-full flex justify-center lg:justify-end" data-aos="fade-up" data-aos-duration="800" data-aos-delay="150">
        <div class="w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[1/1] overflow-hidden bg-zinc-100 border border-zinc-200">
          <img 
            :src="image" 
            alt="Why Choose Us" 
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
          />
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
defineProps({
  tagText: {
    type: String,
    default: 'НАШИ ПРЕИМУЩЕСТВА'
  },
  title: {
    type: String,
    default: 'Почему выбирают нас'
  },
  description: {
    type: String,
    default: 'Мы обеспечиваем премиальное качество, прозрачные цены и официальную гарантию на все виды выполняемых работ.'
  },
  features: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => [
      'Опытные сертифицированные мастера',
      'Точное соблюдение сроков',
      'Оригинальные материалы и препараты',
      'Официальная гарантия качества',
      'Индивидуальный подход к клиенту',
      'Честные и прозрачные цены'
    ]
  },
  stats: {
    type: Array,
    default: () => [
      { value: '100%', label: 'ДОВОЛЬНЫХ КЛИЕНТОВ' },
      { value: '5.0', label: 'РЕЙТИНГ В 2ГИС' },
      { value: '1500+', label: 'ВЫПОЛНЕННЫХ РАБОТ' },
      { value: '100%', label: 'ГАРАНТИЯ КАЧЕСТВА' }
    ]
  },
  image: {
    type: String,
    default: '/img/demos/detailing-polish.jpg'
  }
})
</script>
