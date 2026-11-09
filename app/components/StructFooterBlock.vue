<template>
  <footer class="w-full py-16 md:py-24 font-sans overflow-hidden border-t" :style="{ backgroundColor: bgColor, color: textColor, borderColor: borderColor }">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top CTA Section -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-16 border-b mb-16 relative" :style="{ borderColor: borderColor }">
        <div class="space-y-6 max-w-2xl z-10">
          <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight leading-[1.15]" :style="{ color: textColor }" v-html="ctaTitle"></h2>
          
          <a 
            :href="ctaButtonUrl || `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}`"
            target="_blank"
            class="inline-flex items-center justify-center font-bold text-xs tracking-[0.15em] px-7 py-4 rounded-xl uppercase transition-colors duration-200 hover:opacity-90"
            :style="{ backgroundColor: ctaButtonBgColor, color: ctaButtonTextColor }"
          >
            <span>{{ ctaButtonText }}</span>
            <span class="ml-2.5 text-[10px]">↗</span>
          </a>
        </div>
      </div>

      <!-- Bottom Columns Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
        
        <!-- Col 1: Logo & Description + Socials -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Logo Block -->
          <div class="flex items-center">
            <div class="border px-4 py-2.5 rounded-lg flex items-center bg-white/5" :style="{ borderColor: borderColor }">
              <div class="flex flex-col justify-center">
                <span class="font-bold text-base tracking-[0.06em] uppercase leading-none" :style="{ color: textColor }">{{ resolvedLogoMain }}</span>
                <span v-if="resolvedLogoSub" class="text-[9px] tracking-[0.2em] uppercase font-semibold mt-1.5 leading-none" :style="{ color: secondaryTextColor }">
                  {{ resolvedLogoSub }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-sm leading-relaxed max-w-sm" :style="{ color: secondaryTextColor }">
            {{ description }}
          </p>
        </div>

        <!-- Col 2: Contact Info -->
        <div class="lg:col-span-4 space-y-6 md:pl-4 lg:pl-10">
          <div v-if="resolvedAddress" class="space-y-2">
            <h4 class="text-[10px] font-bold tracking-[0.2em] uppercase" :style="{ color: secondaryTextColor }">
              {{ addressTitle }}
            </h4>
            <p class="text-base leading-relaxed max-w-xs font-medium" :style="{ color: textColor }">
              {{ resolvedAddress }}
            </p>
          </div>

          <div class="space-y-2 pt-2">
            <h4 class="text-[10px] font-bold tracking-[0.2em] uppercase" :style="{ color: secondaryTextColor }">
              {{ assistanceTitle }}
            </h4>
            <div class="flex flex-col space-y-1.5 font-medium">
              <a v-if="email" :href="`mailto:${email}`" class="text-sm transition-colors hover:opacity-80" :style="{ color: secondaryTextColor }">
                {{ email }}
              </a>
              <a :href="`tel:${phone.replace(/[^0-9+]/g, '')}`" class="text-lg font-bold transition-colors hover:opacity-80" :style="{ color: textColor }">
                {{ phone }}
              </a>
            </div>
          </div>
        </div>

        <!-- Col 3: Pages Links -->
        <div class="lg:col-span-2 space-y-4">
          <h4 class="text-[10px] font-bold tracking-[0.2em] uppercase" :style="{ color: secondaryTextColor }">
            {{ pagesTitle }}
          </h4>
          <ul class="space-y-2.5 text-sm font-medium">
            <li v-for="link in pagesLinks" :key="link.label">
              <a :href="link.url" class="transition-colors duration-200 hover:text-white" :style="{ color: secondaryTextColor }">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 4: Utility Links -->
        <div class="lg:col-span-2 space-y-4">
          <h4 class="text-[10px] font-bold tracking-[0.2em] uppercase" :style="{ color: secondaryTextColor }">
            {{ utilityTitle }}
          </h4>
          <ul class="space-y-2.5 text-sm font-medium">
            <li v-for="link in utilityLinks" :key="link.label">
              <a :href="link.url" class="transition-colors duration-200 hover:text-white" :style="{ color: secondaryTextColor }">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom Line: Copyright -->
      <div class="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium" :style="{ borderColor: borderColor, color: secondaryTextColor }">
        <p>
          {{ resolvedCopyright }}
        </p>
        <div class="flex items-center space-x-6">
          <a href="#contacts" class="transition-colors hover:text-white">
            Политика конфиденциальности
          </a>
          <a href="#contacts" class="transition-colors hover:text-white">
            Публичная оферта
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  bgColor: {
    type: String,
    default: '#111111'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  secondaryTextColor: {
    type: String,
    default: '#a1a1aa'
  },
  borderColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.1)'
  },
  ctaButtonBgColor: {
    type: String,
    default: '#ffffff'
  },
  ctaButtonTextColor: {
    type: String,
    default: '#111111'
  },
  ctaTitle: {
    type: String,
    default: 'Готовы записаться или рассчитать<br/>точную стоимость?'
  },
  ctaButtonText: {
    type: String,
    default: 'НАПИСАТЬ В WHATSAPP'
  },
  ctaButtonUrl: {
    type: String,
    default: ''
  },
  whatsappPhone: {
    type: String,
    default: '77016404818'
  },
  companyName: {
    type: String,
    default: ''
  },
  logoTextMain: {
    type: String,
    default: ''
  },
  logoTextSub: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: 'Профессиональный сервис с официальной гарантией качества.'
  },
  addressTitle: {
    type: String,
    default: 'НАШ АДРЕС'
  },
  address: {
    type: String,
    default: ''
  },
  addressText: {
    type: String,
    default: ''
  },
  assistanceTitle: {
    type: String,
    default: 'СВЯЗАТЬСЯ С НАМИ'
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: '+7 (700) 000-00-00'
  },
  pagesTitle: {
    type: String,
    default: 'НАВИГАЦИЯ'
  },
  pagesLinks: {
    type: Array,
    default: () => [
      { label: 'Преимущества', url: '#features' },
      { label: 'Услуги и цены', url: '#services' },
      { label: 'Частые вопросы', url: '#faq' },
      { label: 'Контакты', url: '#contacts' }
    ]
  },
  utilityTitle: {
    type: String,
    default: 'ОНЛАЙН-ЗАПИСЬ'
  },
  utilityLinks: {
    type: Array,
    default: () => [
      { label: 'Консультация в WhatsApp', url: '#contacts' },
      { label: 'Схема проезда 2ГИС', url: '#contacts' }
    ]
  },
  copyright: {
    type: String,
    default: ''
  }
})

const resolvedLogoMain = computed(() => {
  if (props.logoTextMain) return props.logoTextMain
  if (props.companyName) return props.companyName
  return 'КОМПАНИЯ'
})

const resolvedLogoSub = computed(() => {
  if (props.logoTextSub) return props.logoTextSub
  return ''
})

const resolvedAddress = computed(() => {
  return props.addressText || props.address || 'Республика Казахстан'
})

const resolvedCopyright = computed(() => {
  if (props.copyright) return props.copyright
  const name = props.companyName || props.logoTextMain || 'Компания'
  return `© ${new Date().getFullYear()} ${name}. Все права защищены.`
})
</script>
