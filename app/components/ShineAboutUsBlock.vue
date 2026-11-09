<template>
  <section 
    class="w-full py-16 md:py-24 font-sans overflow-hidden transition-colors duration-300"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left Column: Content and Stats -->
        <div class="lg:col-span-6 flex flex-col text-left order-2 lg:order-1">
          <!-- Tag Badge -->
          <div v-if="tagText" class="mb-6">
            <SectionBadge :text="tagText" default-style="wavy" :text-color="textColor" />
          </div>

          <!-- Main Title -->
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15]" :style="{ color: textColor }">
            {{ title }}
          </h2>

          <!-- Description -->
          <p class="text-stone-600 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
            {{ description }}
          </p>

          <!-- About Us CTA -->
          <div class="mb-14">
            <a 
              :href="aboutUrl" 
              class="px-8 py-3.5 border border-stone-300 hover:border-stone-900 text-stone-900 font-bold rounded-xl text-sm transition-all duration-350 hover:bg-stone-50 active:scale-97 inline-block"
            >
              {{ aboutText }}
            </a>
          </div>

          <!-- Stats Grid row -->
          <div class="grid grid-cols-3 gap-4 pt-6 border-t border-stone-100">
            <div 
              v-for="(stat, idx) in stats" 
              :key="idx" 
              class="flex flex-col"
            >
              <span class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-none mb-1.5">
                {{ stat.value }}
              </span>
              <span class="text-xs sm:text-xs text-stone-500 leading-snug font-medium">
                {{ stat.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column: Overlapping Images Layout -->
        <div class="lg:col-span-6 flex justify-center relative select-none order-1 lg:order-2">
          <div class="relative w-full max-w-[500px] aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5]">
            <!-- Large Main Image (aligned right) -->
            <div class="w-[78%] h-[85%] rounded-[2.5rem] overflow-hidden bg-stone-100 shadow-md ml-auto">
              <img 
                :src="imageLargeUrl" 
                alt="Vacuum and bucket" 
                class="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
              />
            </div>
            
            <!-- Small Overlapping Image at Bottom-Left -->
            <div class="absolute left-0 bottom-4 w-[48%] aspect-square rounded-[2rem] overflow-hidden bg-white p-2 shadow-2xl border-4 border-white">
              <div class="w-full h-full rounded-[1.5rem] overflow-hidden bg-stone-50">
                <img 
                  :src="imageSmallUrl" 
                  alt="Cleaning basin supplies" 
                  class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#09090b'
  },
  accentColor: {
    type: String,
    default: '#f59e0b'
  },
  tagText: {
    type: String,
    default: 'О НАС'
  },
  title: {
    type: String,
    default: 'Почему тысячи клиентов доверяют нам'
  },
  description: {
    type: String,
    default: 'Мы обеспечиваем безупречное качество услуг, используем профессиональное оборудование и даем официальную гарантию на все виды работ.'
  },
  aboutText: {
    type: String,
    default: 'Записаться на консультацию'
  },
  aboutUrl: {
    type: String,
    default: '#contacts'
  },
  imageLargeUrl: {
    type: String,
    default: '/img/demos/detailing-polish.jpg'
  },
  imageSmallUrl: {
    type: String,
    default: '/img/demos/detailing-porsche.jpg'
  },
  stats: {
    type: Array,
    default: () => [
      { value: '99%', label: 'Довольных клиентов' },
      { value: '1500+', label: 'Выполненных работ' },
      { value: '5.0', label: 'Рейтинг в 2ГИС' }
    ]
  }
})
</script>

<style scoped>
.hover\:scale-103:hover {
  transform: scale(1.03);
}
</style>
