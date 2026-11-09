<template>
  <section class="relative w-full bg-white pt-12 pb-20 md:pt-20 md:pb-28 px-6 overflow-hidden">
    <!-- Decorative background glow -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
    
    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
      
      <!-- Left Column: Content -->
      <div class="lg:col-span-7 space-y-8 md:space-y-10 text-left" data-aos="fade-right">
        <!-- Rating Badge -->
        <div v-if="ratingText || ratingCount" class="inline-flex items-center space-x-2.5 bg-primary/[0.04] border border-primary/10 rounded-full px-4 py-2">
          <div class="flex items-center space-x-1 shrink-0">
            <template v-if="showStars">
              <Icon v-for="star in 5" :key="star" name="material-symbols:star" class="w-4 h-4 text-amber-400 shrink-0" />
            </template>
            <template v-else>
              <Icon name="lucide:award" class="w-[18px] h-[18px] text-primary shrink-0" />
            </template>
          </div>
          <div class="text-xs md:text-sm font-semibold tracking-wide text-zinc-800">
            <span class="text-primary font-bold">{{ ratingText }}</span>
            <span v-if="ratingText && ratingCount" class="text-zinc-400 ml-1.5 font-medium">|</span>
            <span class="text-zinc-500 ml-1.5 font-medium">{{ ratingCount }}</span>
          </div>
        </div>

        <!-- Title -->
        <h1 
          class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.1] md:leading-[1.08]"
          v-html="title || 'Инженерные решения<br/>для вашего бизнеса'"
        ></h1>

        <!-- Subtitle -->
        <p 
          class="text-zinc-500 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl font-medium"
          v-html="subtitle || 'Профессиональный подбор, разработка и изготовление оборудования по индивидуальным заказам с гарантией качества.'"
        ></p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          <a 
            :href="whatsappUrl" 
            target="_blank" 
            class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-bold text-base hover:opacity-95 hover:scale-[1.01] transition-all duration-200 shadow-lg shadow-primary/20 text-center whitespace-nowrap"
          >
            <Icon name="lucide:message-circle" class="w-5 h-5 mr-2.5" />
            {{ buttonText || 'Связаться в WhatsApp' }}
          </a>
          
          <a 
            :href="watchVideoUrl || secondaryButtonUrl || '#services'" 
            class="inline-flex items-center justify-center px-8 py-4 rounded-full border border-zinc-200/80 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 font-bold text-base hover:scale-[1.01] transition-all duration-200 text-center whitespace-nowrap"
          >
            {{ watchVideoText || secondaryButtonText || 'Смотреть услуги' }}
            <Icon name="lucide:arrow-down" class="w-4 h-4 ml-2 animate-bounce" />
          </a>
        </div>

        <!-- Stats Section -->
        <div v-if="statsValue || statNumber" class="pt-6 md:pt-8 border-t border-gray-100 flex items-center space-x-4">
          <div class="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            {{ statsValue || statNumber }}
          </div>
          <div class="text-sm md:text-base font-semibold text-zinc-500 max-w-xs leading-snug">
            {{ statsLabel || statLabel }}
          </div>
        </div>
      </div>

      <!-- Right Column: Premium Image Showcase -->
      <div class="lg:col-span-5 relative w-full flex justify-center" data-aos="fade-left" data-aos-delay="200">
        <!-- Interactive card background effect -->
        <div class="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-primary/0 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="hero-image-wrapper relative w-full max-w-[420px] aspect-[4/5] rounded-[2.8rem] overflow-hidden bg-zinc-50 border border-gray-100/60 shadow-xl shadow-zinc-200/50">
          <NuxtImg 
            :src="heroImage || backgroundImage || image || '/img/demos/dental-hero-1.jpg'" 
            alt="Hero Image" 
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            format="webp"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ratingText: String,
  ratingCount: String,
  title: String,
  subtitle: String,
  buttonText: String,
  buttonUrl: String,
  secondaryButtonText: String,
  secondaryButtonUrl: String,
  watchVideoText: String,
  watchVideoUrl: String,
  statsValue: String,
  statsLabel: String,
  statNumber: String,
  statLabel: String,
  heroImage: String,
  backgroundImage: String,
  image: String,
  whatsappPhone: {
    type: String,
    default: '77016404818'
  }
})

const showStars = computed(() => {
  if (!props.ratingText) return false
  return /^[0-9.]+$/.test(props.ratingText.trim())
})

const whatsappUrl = computed(() => {
  if (props.buttonUrl) return props.buttonUrl
  const phone = props.whatsappPhone.replace(/[^0-9]/g, '')
  const text = encodeURIComponent(`Здравствуйте! Хочу заказать расчет ТЭНа.`)
  return `https://wa.me/${phone}?text=${text}`
})
</script>

<style scoped>
h1 {
  white-space: pre-line;
}

/* Safari: force GPU layer for overflow clip with large border-radius */
.hero-image-wrapper {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

/* Safari: aspect-ratio fallback */
@supports not (aspect-ratio: 4/5) {
  .hero-image-wrapper {
    aspect-ratio: auto !important;
    padding-bottom: 125%; /* 5/4 ratio */
    height: 0;
  }
  .hero-image-wrapper > img {
    position: absolute;
    inset: 0;
  }
}
</style>
