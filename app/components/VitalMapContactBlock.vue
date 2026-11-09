<template>
  <section id="contacts" class="w-full bg-[#fafbfe]/30 py-16 md:py-24 px-6 border-t border-gray-100/60">
    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center" data-aos="fade-up">
      
      <!-- Left Column: Contact Details -->
      <div class="lg:col-span-5 space-y-8">
        <!-- Heading -->
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-950">
          {{ title || 'Контакты' }}
        </h2>
        
        <!-- Contact Lines -->
        <div class="space-y-8 text-[15px] leading-relaxed">
          <!-- Phones -->
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Icon name="lucide:phone" class="w-5 h-5 inline-block shrink-0" />
              </div>
              <a :href="`tel:${phoneDigits}`" class="text-xl md:text-2xl font-bold text-zinc-900 hover:text-primary transition-colors duration-200">
                {{ phone || '+7 (700) 000-00-00' }}
              </a>
            </div>
            
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                <Icon name="lucide:message-circle" class="w-5 h-5 inline-block shrink-0" />
              </div>
              <a :href="whatsappUrl" target="_blank" class="text-xl md:text-2xl font-bold text-green-600 hover:opacity-90 transition-all duration-200">
                {{ whatsapp || phone || 'Написать в WhatsApp' }}
              </a>
            </div>
          </div>

          <!-- Locations Tabs -->
          <div class="space-y-4">
            <div v-if="warehouseTabName" class="flex space-x-2 border-b border-gray-100 pb-2">
              <button 
                @click="activeTab = 'boutique'"
                :class="['px-4 py-2 text-sm font-bold rounded-lg transition-all', activeTab === 'boutique' ? 'bg-primary text-white shadow-md' : 'text-zinc-500 hover:text-primary bg-zinc-50']"
              >
                {{ boutiqueTabName || 'Основной адрес' }}
              </button>
              <button 
                @click="activeTab = 'warehouse'"
                :class="['px-4 py-2 text-sm font-bold rounded-lg transition-all', activeTab === 'warehouse' ? 'bg-primary text-white shadow-md' : 'text-zinc-500 hover:text-primary bg-zinc-50']"
              >
                {{ warehouseTabName }}
              </button>
            </div>

            <!-- Boutique / Main Location Info -->
            <div v-if="activeTab === 'boutique'" class="space-y-2 border-l-2 border-primary/30 pl-4 py-1 transition-all duration-300">
              <div class="font-bold text-zinc-900 text-lg">
                {{ boutiqueTitle || 'Наш адрес' }}
              </div>
              <div class="text-zinc-500 text-[15px]">
                {{ boutiqueAddress || address || 'Республика Казахстан' }}
              </div>
              <a v-if="boutiqueMapLink" :href="boutiqueMapLink" target="_blank" class="inline-flex items-center text-primary font-bold text-xs hover:underline pt-1">
                Открыть в 2GIS
                <Icon name="lucide:external-link" class="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            <!-- Warehouse Location Info -->
            <div v-if="activeTab === 'warehouse'" class="space-y-2 border-l-2 border-primary/30 pl-4 py-1 transition-all duration-300">
              <div class="font-bold text-zinc-900 text-lg">
                {{ warehouseTitle || 'Второй филиал' }}
              </div>
              <div class="text-zinc-500 text-[15px]">
                {{ warehouseAddress }}
              </div>
              <a v-if="warehouseMapLink" :href="warehouseMapLink" target="_blank" class="inline-flex items-center text-primary font-bold text-xs hover:underline pt-1">
                Открыть в 2GIS
                <Icon name="lucide:external-link" class="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          <!-- Working Hours -->
          <div class="space-y-2 bg-zinc-50 p-5 rounded-2xl border border-gray-100">
            <div class="font-bold text-zinc-900 flex items-center space-x-2">
              <Icon name="lucide:clock" class="w-4 h-4 text-primary" />
              <span>Режим работы:</span>
            </div>
            <div v-if="workingHours" class="text-sm font-semibold text-zinc-800 pt-1">
              {{ workingHours }}
            </div>
            <div v-else class="grid grid-cols-2 gap-2 text-sm text-zinc-500">
              <div>Пн - Пт:</div>
              <div class="font-semibold text-zinc-800">{{ workHoursWeekdays || '09:00 - 20:00' }}</div>
              <div>Суббота:</div>
              <div class="font-semibold text-zinc-800">{{ workHoursSaturday || '10:00 - 19:00' }}</div>
              <div>Воскресенье:</div>
              <div :class="['font-bold', (workHoursSunday === 'Выходной') ? 'text-red-500' : 'text-zinc-800']">
                {{ workHoursSunday || '10:00 - 19:00' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive Map -->
      <div class="map-wrapper lg:col-span-7 h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 bg-zinc-100 relative">
        <iframe 
          v-if="activeTab === 'boutique'"
          :src="resolvedBoutiqueIframe" 
          width="100%" 
          height="100%" 
          frameborder="0" 
          allowfullscreen="true"
          class="absolute inset-0 w-full h-full"
        ></iframe>

        <iframe 
          v-if="activeTab === 'warehouse'"
          :src="warehouseMapIframe" 
          width="100%" 
          height="100%" 
          frameborder="0" 
          allowfullscreen="true"
          class="absolute inset-0 w-full h-full"
        ></iframe>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tagText: String,
  title: String,
  subtitle: String,
  address: String,
  email: String,
  workingHours: String,
  phone: String,
  whatsapp: String,
  whatsappPhone: String,
  boutiqueTabName: String,
  boutiqueTitle: String,
  boutiqueAddress: String,
  boutiqueMapLink: String,
  boutiqueMapIframe: String,
  mapUrl: String,
  mapIframe: String,
  warehouseTabName: String,
  warehouseTitle: String,
  warehouseAddress: String,
  warehouseMapLink: String,
  warehouseMapIframe: String,
  whatsappMessage: String,
  workHoursWeekdays: String,
  workHoursSaturday: String,
  workHoursSunday: String
})

const activeTab = ref('boutique')

const phoneDigits = computed(() => {
  const num = props.phone || props.whatsappPhone || '+77000000000'
  return num.replace(/[^0-9+]/g, '')
})

const whatsappUrl = computed(() => {
  const num = (props.whatsappPhone || props.whatsapp || props.phone || '').replace(/[^0-9]/g, '')
  const msg = props.whatsappMessage || 'Здравствуйте! Хочу записаться / проконсультироваться.'
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
})

const resolvedBoutiqueIframe = computed(() => {
  return props.boutiqueMapIframe || props.mapIframe || props.mapUrl || 'https://yandex.ru/map-widget/v1/?ll=76.9126%2C43.2389&z=13'
})
</script>

<style scoped>
/* Safari: force GPU compositing for overflow clip with large border-radius */
.map-wrapper {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}
</style>