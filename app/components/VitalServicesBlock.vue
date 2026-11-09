<template>
  <section id="services" class="w-full bg-[#fafbfe]/30 py-16 md:py-24 px-6">
    <div class="w-full max-w-7xl mx-auto flex flex-col space-y-12 md:space-y-16">
      
      <!-- Section Header -->
      <div class="text-center flex flex-col items-center space-y-4" data-aos="fade-up">
        <div v-if="tagText || badge">
          <SectionBadge :text="tagText || badge || 'Наш ассортимент'" default-style="dot" />
        </div>
        
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 max-w-2xl leading-tight">
          {{ title || 'Продукция высокого качества' }}
        </h2>
      </div>

      <!-- Services Grid -->
      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
        <div 
          v-for="(service, index) in (services || items || defaultServices)" 
          :key="index"
          class="w-full bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 group flex flex-col"
        >
          <!-- Image Card Mode (If Image is Provided) -->
          <template v-if="service.image">
            <div class="service-image-wrapper relative w-full h-56 overflow-hidden bg-gray-50 border-b border-gray-100/50 rounded-t-[2rem]">
              <NuxtImg 
                :src="service.image" 
                :alt="service.title" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                format="webp"
                loading="lazy"
              />
              <div v-if="service.badge || service.tag || service.price" class="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {{ service.badge || service.tag || service.price }}
              </div>
            </div>
            
            <div class="w-full p-6 md:p-8 flex flex-col flex-grow text-left space-y-4">
              <div class="flex items-start justify-between gap-2">
                <h3 class="text-xl font-bold text-zinc-900 group-hover:text-primary transition-colors">
                  {{ service.title }}
                </h3>
                <span v-if="service.price" class="text-sm font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full shrink-0">
                  {{ service.price }}
                </span>
              </div>
              <p class="text-zinc-500 text-sm leading-relaxed flex-grow">
                {{ service.text || service.description }}
              </p>
              
              <!-- CTA Button -->
              <div class="pt-2">
                <a 
                  :href="getWhatsAppLink(service)"
                  target="_blank" 
                  class="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-primary text-white font-bold text-[14px] hover:opacity-90 transition-all duration-200 shadow-md shadow-primary/10"
                >
                  <Icon name="lucide:message-circle" class="w-4 h-4 mr-2" />
                  {{ service.linkText || 'Узнать стоимость в WhatsApp' }}
                </a>
              </div>
            </div>
          </template>

          <!-- Icon Mode (Standard) -->
          <template v-else>
            <div class="w-full p-8 md:p-10 flex flex-col items-center text-center space-y-5 flex-grow">
              <!-- Icon Circle Container -->
              <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Icon :name="getIconName(service.iconType || service.icon)" class="w-7 h-7 inline-block shrink-0" />
              </div>
              
              <h3 class="text-xl font-bold text-zinc-900 group-hover:text-primary transition-colors">
                {{ service.title }}
              </h3>
              <p class="text-zinc-500 text-sm leading-relaxed flex-grow">
                {{ service.text || service.description }}
              </p>

              <div v-if="service.price" class="text-base font-extrabold text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                {{ service.price }}
              </div>
              
              <div class="pt-1">
                <a 
                  :href="getWhatsAppLink(service)"
                  target="_blank" 
                  class="inline-flex items-center text-primary font-bold text-sm hover:opacity-85 transition-opacity"
                >
                  {{ service.linkText || service.tag || 'Запросить расчет' }}
                  <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  tagText: String,
  badge: String,
  title: String,
  services: Array,
  items: Array,
  whatsappPhone: {
    type: String,
    default: '77016404818'
  }
})

const getIconName = (iconType) => {
  if (iconType?.includes(':')) return iconType
  const mapping = {
    pediatrics: 'lucide:baby',
    orthopedics: 'lucide:bone',
    gastroenterology: 'lucide:stethoscope',
    neurology: 'lucide:brain',
    cardiology: 'lucide:heart',
    general: 'lucide:activity'
  }
  return mapping[iconType] || 'lucide:activity'
}

const getWhatsAppLink = (service) => {
  const phone = props.whatsappPhone.replace(/[^0-9]/g, '')
  const text = encodeURIComponent(`Здравствуйте! Хочу заказать или узнать подробнее про: "${service.title}"`)
  return `https://wa.me/${phone}?text=${text}`
}

const defaultServices = [
  {
    iconType: 'general',
    title: 'Качественные ТЭНы',
    text: 'Изготовление трубчатых электронагревателей любой конфигурации по вашим эскизам и чертежам.',
    linkText: 'Заказать расчет'
  },
  {
    iconType: 'orthopedics',
    title: 'Срочное производство',
    text: 'Возможность быстрого изготовления ТЭНов от 5 дней при аварийных ситуациях.',
    linkText: 'Узнать сроки'
  }
]
</script>

<style scoped>
h2 {
  white-space: pre-line;
}

/* Safari: force GPU compositing for overflow clip with border-radius */
.service-image-wrapper {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

/* Safari grid-item flattening fix */
.grid > div {
  width: 100% !important;
  min-width: 100% !important;
  height: auto !important;
}
</style>
