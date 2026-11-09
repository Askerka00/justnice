<template>
  <section id="fleet" class="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-7xl mx-auto space-y-12 md:space-y-16">
      
      <!-- Section Header -->
      <div class="text-center" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 uppercase font-outfit">
          {{ title }}
        </h2>
        <div class="w-24 h-1 bg-primary mx-auto mt-4"></div>
      </div>

      <!-- Vehicles Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8" data-aos="fade-up">
        <div 
          v-for="(vehicle, idx) in vehicles" 
          :key="idx" 
          class="flex flex-col sm:flex-row bg-white border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          <!-- Left: Image Section -->
          <div class="w-full sm:w-1/2 relative bg-zinc-50 flex items-center justify-center p-4">
            <img 
              :src="vehicle.image" 
              :alt="vehicle.title" 
              class="max-w-full max-h-48 object-contain transition-transform duration-500 hover:scale-103"
            />
          </div>

          <!-- Right: Info Section -->
          <div class="w-full sm:w-1/2 p-6 flex flex-col justify-between space-y-6 border-t sm:border-t-0 sm:border-l border-zinc-200/80">
            <!-- Top Row: Title & Action Button -->
            <div class="flex justify-between items-start gap-4">
              <h3 class="text-lg font-bold text-zinc-900 font-outfit">
                {{ vehicle.title }}
              </h3>
              <a 
                :href="getWhatsAppLink(vehicle)" 
                target="_blank"
                class="shrink-0 bg-primary hover:bg-primary/95 text-white font-bold text-xs tracking-wider px-4 py-2 uppercase transition-colors"
              >
                {{ buttonText }}
              </a>
            </div>

            <!-- Specs list -->
            <div class="space-y-3">
              <!-- Spec 1: Height -->
              <div class="flex items-center space-x-3 text-zinc-700">
                <Icon name="lucide:arrow-up-down" class="w-5 h-5 text-primary shrink-0" />
                <span class="text-sm font-semibold">{{ vehicle.height }}</span>
              </div>
              
              <!-- Spec 2: Price -->
              <div class="flex items-center space-x-3 text-zinc-700">
                <Icon name="lucide:wallet" class="w-5 h-5 text-primary shrink-0" />
                <span class="text-sm font-semibold">
                  <span v-if="vehicle.oldPrice" class="line-through text-zinc-400 mr-2">{{ vehicle.oldPrice }}</span>
                  <span>{{ vehicle.price }}</span>
                </span>
              </div>

              <!-- Spec 3: Minimum Time -->
              <div class="flex items-center space-x-3 text-zinc-700">
                <Icon name="lucide:clock" class="w-5 h-5 text-primary shrink-0" />
                <span class="text-sm font-semibold">{{ vehicle.minTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Наш парк техники:'
  },
  buttonText: {
    type: String,
    default: 'ЗАКАЗАТЬ'
  },
  whatsappPhone: {
    type: String,
    default: '77000235555'
  },
  whatsappTemplate: {
    type: String,
    default: 'Здравствуйте! Хочу арендовать автовышку: [title] ([height]).'
  },
  vehicles: {
    type: Array,
    default: () => []
  }
})

const getWhatsAppLink = (vehicle) => {
  const phone = props.whatsappPhone.replace(/[^0-9]/g, '')
  const template = props.whatsappTemplate || 'Здравствуйте! Хочу арендовать автовышку: [title] ([height]).'
  const text = encodeURIComponent(
    template
      .replace('[title]', vehicle.title || '')
      .replace('[height]', vehicle.height || '')
  )
  return `https://wa.me/${phone}?text=${text}`
}
</script>
