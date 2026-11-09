<template>
  <section class="relative w-full bg-white py-16 md:py-24 px-6 overflow-hidden">
    <!-- Subtle background decoration -->
    <div 
      class="absolute top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
      :class="imagePosition === 'left' ? 'right-0' : 'left-0'"
    ></div>

    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
      
      <!-- Content Column -->
      <div 
        :class="[
          'lg:col-span-7 space-y-6 md:space-y-8 text-left',
          imagePosition === 'left' ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'
        ]"
        :data-aos="imagePosition === 'left' ? 'fade-left' : 'fade-right'"
      >
        <!-- Tag Badge -->
        <div v-if="tagText || badge" class="inline-flex">
          <SectionBadge :text="tagText || badge" default-style="pill" />
        </div>

        <!-- Title -->
        <h2 
          v-if="title"
          class="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.15]"
          v-html="title"
        ></h2>

        <!-- Description (HTML Supported) -->
        <div 
          v-if="text || subtitle || (paragraphs && paragraphs.length)"
          class="prose prose-zinc max-w-none text-zinc-600 text-base md:text-lg leading-relaxed font-normal space-y-4"
        >
          <template v-if="text || subtitle">
            <div v-html="text || subtitle"></div>
          </template>
          <template v-else-if="paragraphs && paragraphs.length">
            <p v-for="(p, idx) in paragraphs" :key="idx" v-html="p"></p>
          </template>
        </div>

        <!-- Checklist Features / Bullets -->
        <ul v-if="(features && features.length) || (bullets && bullets.length)" class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <li 
            v-for="(feature, idx) in (features && features.length ? features : bullets)" 
            :key="idx"
            class="flex items-start space-x-3 text-zinc-700"
          >
            <div class="flex-shrink-0 mt-1">
              <Icon 
                :name="getFeatureIcon(feature)" 
                class="w-5 h-5 text-primary" 
              />
            </div>
            <span class="text-sm md:text-base font-medium leading-tight" v-html="getFeatureText(feature)"></span>
          </li>
        </ul>

        <!-- Action Button -->
        <div v-if="buttonText" class="pt-4">
          <a 
            :href="actionUrl" 
            target="_blank" 
            class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-bold text-base hover:opacity-95 hover:scale-[1.01] transition-all duration-200 shadow-lg shadow-primary/20 text-center whitespace-nowrap"
          >
            <Icon 
              :name="isWhatsapp ? 'lucide:message-circle' : 'lucide:arrow-right'" 
              class="w-5 h-5 mr-2.5" 
            />
            {{ buttonText }}
          </a>
        </div>
      </div>

      <!-- Image Column -->
      <div 
        :class="[
          'lg:col-span-5 relative w-full flex justify-center',
          imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'
        ]"
        :data-aos="imagePosition === 'left' ? 'fade-right' : 'fade-left'"
        data-aos-delay="200"
      >
        <!-- Interactive card background effect -->
        <div class="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-primary/0 rounded-[3rem] blur-2xl opacity-60 pointer-events-none"></div>
        
        <div class="content-image-wrapper relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-50 border border-zinc-100 shadow-xl shadow-zinc-200/50">
          <NuxtImg 
            :src="image || '/img/demos/dental-clinic.jpg'" 
            alt="Content Image" 
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tagText: String,
  badge: String,
  title: String,
  subtitle: String,
  text: String,
  paragraphs: {
    type: Array,
    default: () => []
  },
  image: String,
  imagePosition: {
    type: String,
    default: 'right'
  },
  features: {
    type: Array,
    default: () => []
  },
  bullets: {
    type: Array,
    default: () => []
  },
  buttonText: String,
  buttonUrl: String,
  whatsappPhone: {
    type: String,
    default: '77016404818'
  }
})

// Helper to extract feature text
const getFeatureText = (feature) => {
  if (typeof feature === 'string') return feature
  return feature?.text || ''
}

// Helper to extract feature icon
const getFeatureIcon = (feature) => {
  if (typeof feature === 'string') return 'lucide:check'
  return feature?.icon || 'lucide:check'
}

// Check if the button action is WhatsApp
const isWhatsapp = computed(() => {
  return !props.buttonUrl && props.buttonText
})

// Action URL computation
const actionUrl = computed(() => {
  if (props.buttonUrl) return props.buttonUrl
  const phone = props.whatsappPhone.replace(/[^0-9]/g, '')
  const text = encodeURIComponent(`Здравствуйте! Хочу узнать подробнее о "${props.title || 'услуге'}".`)
  return `https://wa.me/${phone}?text=${text}`
})
</script>

<style scoped>
/* Ensure pre-line or raw html tags behave nicely */
:deep(ul) {
  list-style-type: disc;
  margin-left: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
:deep(ol) {
  list-style-type: decimal;
  margin-left: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
:deep(strong) {
  font-weight: 700;
  color: #09090b; /* zinc-950 */
}

/* Safari: force GPU compositing for overflow clip with large border-radius */
.content-image-wrapper {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

/* Safari: aspect-ratio fallback */
@supports not (aspect-ratio: 4/3) {
  .content-image-wrapper {
    aspect-ratio: auto !important;
    padding-bottom: 75%; /* 3/4 ratio */
    height: 0;
    position: relative;
  }
  .content-image-wrapper > img {
    position: absolute;
    inset: 0;
  }
}
</style>
