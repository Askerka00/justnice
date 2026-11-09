<template>
  <section id="pricing" class="w-full bg-[#fafafa] py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-7xl mx-auto space-y-12 md:space-y-16">
      
      <!-- Section Header -->
      <div class="text-center space-y-4" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 uppercase font-outfit">
          {{ title }}
        </h2>
        <div class="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <!-- Categories Tabs -->
      <div class="flex flex-wrap justify-center gap-2 md:gap-4" data-aos="fade-up">
        <button
          v-for="(cat, idx) in resolvedCategories"
          :key="idx"
          @click="activeTab = idx"
          class="px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 border font-outfit"
          :class="[
            activeTab === idx
              ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-102'
              : 'bg-white border-zinc-200 text-zinc-600 hover:border-primary/50 hover:text-primary'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Active Category Products Grid -->
      <div 
        v-if="resolvedCategories[activeTab]" 
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        data-aos="fade-up"
      >
        <div 
          v-for="(item, itemIdx) in resolvedCategories[activeTab].items" 
          :key="itemIdx"
          class="flex flex-col bg-white border-t-4 border-t-primary border-x border-b border-zinc-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-b-2xl overflow-hidden p-6 justify-between space-y-6"
        >
          <!-- Product Title & Details -->
          <div class="space-y-4">
            <div class="flex flex-col items-start gap-2">
              <span 
                v-if="item.badge" 
                class="bg-primary/10 text-primary text-xxs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shrink-0"
              >
                {{ item.badge }}
              </span>
              <h3 class="text-xl xl:text-2xl font-black text-zinc-900 font-outfit tracking-tight leading-snug break-words">
                {{ item.title }}
              </h3>
            </div>
            
            <p v-if="item.subtitle" class="text-xs text-zinc-400 font-medium">
              {{ item.subtitle }}
            </p>

            <!-- Specs / Characteristics -->
            <ul class="space-y-2 border-t border-zinc-100 pt-4">
              <li 
                v-for="(spec, specIdx) in item.specs" 
                :key="specIdx"
                class="flex items-center space-x-2 text-zinc-600 text-xs font-semibold"
              >
                <Icon name="lucide:check-circle-2" class="w-4 h-4 text-primary shrink-0" />
                <span>{{ spec }}</span>
              </li>
            </ul>
          </div>

          <!-- Product Price & CTA -->
          <div class="space-y-4 pt-4 border-t border-zinc-100">
            <div>
              <span class="text-xxs text-zinc-400 font-bold uppercase tracking-wider block">Стоимость:</span>
              <span class="text-xl font-extrabold text-zinc-900 font-outfit">
                {{ item.price }}
              </span>
            </div>

            <a 
              :href="getWhatsAppLink(item)" 
              target="_blank"
              class="flex items-center justify-center w-full bg-primary hover:opacity-95 text-white font-bold text-xs tracking-wider py-3.5 rounded-xl uppercase transition-all duration-200 shadow-md shadow-primary/15"
            >
              <Icon name="lucide:message-circle" class="w-4 h-4 mr-2" />
              {{ item.buttonText || buttonText }}
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'ПРАЙС-ЛИСТ И ПАКЕТЫ УСЛУГ'
  },
  buttonText: {
    type: String,
    default: 'ВЫБРАТЬ ПАКЕТ'
  },
  whatsappPhone: {
    type: String,
    default: '77016404818'
  },
  categories: {
    type: Array,
    default: () => []
  },
  categoriesData: {
    type: Array,
    default: () => []
  }
})

const activeTab = ref(0)

const defaultCategories = []

const resolvedCategories = computed(() => {
  if (props.categories && props.categories.length > 0) return props.categories
  if (props.categoriesData && props.categoriesData.length > 0) return props.categoriesData
  return defaultCategories
})

const getWhatsAppLink = (item) => {
  const phone = props.whatsappPhone.replace(/[^0-9]/g, '')
  const text = encodeURIComponent(`Здравствуйте! Интересует услуга: "${item.title}" (${item.price}).`)
  return `https://wa.me/${phone}?text=${text}`
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
}
.scale-102 {
  transform: scale(1.02);
}
</style>
