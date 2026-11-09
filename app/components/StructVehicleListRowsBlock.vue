<template>
  <section id="fleet" class="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-6xl mx-auto space-y-12 md:space-y-16">
      
      <!-- Section Header -->
      <div class="text-center space-y-4" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 uppercase font-outfit">
          {{ title }}
        </h2>
        <div class="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <!-- Fleet List (Rows Layout) -->
      <div class="divide-y divide-zinc-200 border-y border-zinc-200" data-aos="fade-up">
        <div 
          v-for="(item, idx) in items" 
          :key="idx"
          class="flex flex-col md:flex-row items-center md:items-stretch py-8 gap-6 md:gap-8"
        >
          <!-- Left: Image (Square Container) -->
          <div class="w-full md:w-48 lg:w-56 h-48 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center shrink-0 p-4 overflow-hidden relative group">
            <NuxtImg 
              :src="item.image" 
              :alt="item.title" 
              class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
              format="webp"
              loading="lazy"
            />
          </div>

          <!-- Middle: Title and Specs -->
          <div class="flex-grow flex flex-col justify-center space-y-4 text-center md:text-left">
            <h3 class="text-xl font-bold text-zinc-900 font-outfit">
              {{ item.title }}
            </h3>
            
            <p v-if="item.description" class="text-sm text-zinc-500 max-w-xl">
              {{ item.description }}
            </p>

            <!-- Specs Grid -->
            <div class="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-zinc-700">
              <div 
                v-for="(spec, specIdx) in item.specs" 
                :key="specIdx"
                class="flex items-center space-x-1.5"
              >
                <Icon name="lucide:settings" class="w-4 h-4 text-primary shrink-0" />
                <span>{{ spec }}</span>
              </div>
            </div>
          </div>

          <!-- Right: Price and Action Button -->
          <div class="w-full md:w-56 shrink-0 flex flex-col justify-center items-center md:items-end space-y-4 md:border-l md:border-zinc-100 md:pl-8">
            <div class="text-center md:text-right">
              <span class="text-xxs text-zinc-400 font-bold uppercase tracking-wider block">Стоимость аренды:</span>
              <span class="text-xl lg:text-2xl font-extrabold text-zinc-900 font-outfit">
                {{ item.price }}
              </span>
            </div>

            <a 
              :href="getWhatsAppLink(item)" 
              target="_blank"
              class="w-full sm:w-auto md:w-full flex items-center justify-center bg-primary hover:opacity-95 text-white font-bold text-xs tracking-wider py-3.5 px-6 rounded-xl uppercase transition-all duration-200 shadow-md shadow-primary/10"
            >
              <Icon name="lucide:calendar-check-2" class="w-4 h-4 mr-2" />
              {{ buttonText }}
            </a>
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
    default: 'НАШ АВТОПАРК ТЕХНИКИ'
  },
  buttonText: {
    type: String,
    default: 'ЗАКАЗАТЬ'
  },
  whatsappPhone: {
    type: String,
    default: '77053333433'
  },
  items: {
    type: Array,
    default: () => [
      {
        title: 'Автокран XCMG 25 тонн',
        description: 'Маневренный кран для выполнения большинства городских строительно-монтажных и погрузочных работ.',
        specs: ['Грузоподъемность: 25 т', 'Длина стрелы: 39.5 м', 'Гусек: 8.3 м'],
        price: 'от 15 000 ₸/час',
        image: '/img/construction/cherry_picker.png'
      },
      {
        title: 'Автокран Zoomlion 50 тонн',
        description: 'Мощный стреловой кран повышенной грузоподъемности для монтажа тяжелых металлоконструкций и плит.',
        specs: ['Грузоподъемность: 50 т', 'Длина стрелы: 42.5 м', 'Гусек: 16 м'],
        price: 'от 25 000 ₸/час',
        image: '/img/construction/cherry_picker.png'
      }
    ]
  }
})

const getWhatsAppLink = (item) => {
  const phone = props.whatsappPhone.replace(/[^0-9]/g, '')
  const text = encodeURIComponent(`Здравствуйте! Хочу арендовать технику: "${item.title}" по цене "${item.price}".`)
  return `https://wa.me/${phone}?text=${text}`
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
}
</style>
