<template>
  <section id="faq" class="w-full py-16 md:py-24 font-sans overflow-hidden border-t" :style="{ backgroundColor: bgColor, color: textColor, borderColor: borderColor }">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <!-- Left Sidebar Column -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-12 self-start">
          <div class="space-y-6">
            <!-- Tag Badge -->
            <SectionBadge :text="tagText" default-style="sharp" :text-color="textColor" />
            
            <!-- Title -->
            <h2 class="text-3xl sm:text-4xl lg:text-[45px] font-bold tracking-tight leading-[1.12]" :style="{ color: textColor }">
              {{ title }}
            </h2>
          </div>

          <!-- Bottom Contact Sidebar Area -->
          <div class="space-y-4 pt-6">
            <h3 class="text-lg font-bold tracking-tight" :style="{ color: textColor }">
              {{ sidebarTitle }}
            </h3>
            <p class="text-sm leading-relaxed max-w-sm" :style="{ color: secondaryTextColor }">
              {{ sidebarText }}
            </p>
            <div class="pt-2">
              <a 
                :href="sidebarCallUrl" 
                class="text-sm font-semibold tracking-wide hover:opacity-85 transition-opacity" 
                :style="{ color: textColor }"
              >
                {{ sidebarCallText }}
              </a>
            </div>
          </div>
        </div>

        <!-- Right Accordion Column -->
        <div class="lg:col-span-7 divide-y" :style="{ borderColor: borderColor }">
          <div 
            v-for="(item, index) in resolvedFaqItems" 
            :key="index"
            class="py-5"
            :style="{ borderColor: borderColor }"
          >
            <!-- Header button -->
            <button 
              @click="toggleItem(index)"
              class="w-full flex items-center justify-between text-left py-2 focus:outline-none group"
            >
              <span class="text-base md:text-[17px] font-semibold tracking-tight pr-4 transition-colors group-hover:text-primary" :style="{ color: textColor }">
                {{ item.question || item.q }}
              </span>
              <span class="flex-shrink-0 ml-4 flex items-center justify-center w-6 h-6 transition-transform duration-300" :class="{ 'rotate-45': activeIndex === index }">
                <!-- Inline simple plus icon -->
                <svg class="w-4 h-4" :style="{ color: textColor }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </span>
            </button>

            <!-- Expandable Answer Panel -->
            <div 
              class="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
              :style="{ 
                gridTemplateRows: activeIndex === index ? '1fr' : '0fr',
                opacity: activeIndex === index ? 1 : 0
              }"
            >
              <div class="overflow-hidden">
                <div class="pt-2 pb-4 text-sm md:text-base leading-relaxed" :style="{ color: secondaryTextColor }">
                  {{ item.answer || item.a }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#09090b'
  },
  secondaryTextColor: {
    type: String,
    default: '#4b5563'
  },
  borderColor: {
    type: String,
    default: 'rgba(9, 9, 11, 0.1)'
  },
  tagText: {
    type: String,
    default: 'ВОПРОСЫ И ОТВЕТЫ'
  },
  title: {
    type: String,
    default: 'Часто задаваемые вопросы'
  },
  sidebarTitle: {
    type: String,
    default: 'Остались вопросы?'
  },
  sidebarText: {
    type: String,
    default: 'Свяжитесь с нами в WhatsApp или по телефону — наши специалисты подробно проконсультируют вас за 5 минут.'
  },
  sidebarCallText: {
    type: String,
    default: 'Получить бесплатную консультацию →'
  },
  sidebarCallUrl: {
    type: String,
    default: '#contacts'
  },
  items: {
    type: Array,
    default: () => []
  },
  faqs: {
    type: Array,
    default: () => []
  },
  faqItems: {
    type: Array,
    default: () => [
      {
        question: 'Нужна ли предварительная запись?',
        answer: 'Да, рекомендуем оставить заявку на сайте или написать в WhatsApp, чтобы мы забронировали удобное для вас время без очередей.'
      },
      {
        question: 'Какая гарантия предоставляется на услуги?',
        answer: 'Мы работаем официально и предоставляем полную гарантию на все виды выполняемых работ и используемые сертифицированные материалы.'
      },
      {
        question: 'Какие способы оплаты доступны?',
        answer: 'Принимаем наличный и безналичный расчет, Kaspi QR, Kaspi Red, а также беспроцентную рассрочку.'
      }
    ]
  }
})

const resolvedFaqItems = computed(() => {
  if (props.items && props.items.length > 0) return props.items
  if (props.faqs && props.faqs.length > 0) return props.faqs
  return props.faqItems
})

const activeIndex = ref(0)

const toggleItem = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null
  } else {
    activeIndex.value = index
  }
}
</script>
