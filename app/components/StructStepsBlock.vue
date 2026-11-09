<template>
  <section 
    :id="id" 
    class="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300"
    :class="[
      isDark ? 'bg-zinc-900 text-white' : 'bg-primary text-white'
    ]"
  >
    <div class="max-w-7xl mx-auto space-y-12 md:space-y-16">
      
      <!-- Section Header -->
      <div class="text-center space-y-4" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight uppercase font-outfit">
          {{ title }}
        </h2>
        <div class="w-24 h-1 bg-white mx-auto"></div>
      </div>

      <!-- Steps Container (Flex row on desktop, centered, dynamic for any number of steps) -->
      <div class="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-0 max-w-6xl mx-auto w-full relative" data-aos="fade-up">
        
        <!-- Step Item -->
        <div 
          v-for="(step, idx) in stepsData" 
          :key="idx" 
          class="flex-1 flex flex-col items-center text-center relative group w-full"
        >
          <!-- Step Number & Icon Circle with Connector -->
          <div class="w-full relative flex items-center justify-center">
            <!-- Connector Line (Only for desktop, strictly between circles) -->
            <div 
              v-if="idx < stepsData.length - 1" 
              class="hidden md:block absolute left-1/2 w-full top-10 -translate-y-1/2 h-0 border-t-2 border-dashed border-white/40 z-0 pointer-events-none"
            ></div>

            <!-- Circle & Badge wrapper -->
            <div class="relative inline-flex items-center justify-center z-10">
              <div class="w-20 h-20 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 shrink-0">
                <Icon :name="getStepIcon(step, idx)" class="w-8 h-8 text-primary" />
              </div>
              
              <!-- Step Counter Badge -->
              <div class="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-black flex items-center justify-center shadow-md z-20 font-outfit">
                {{ idx + 1 }}
              </div>
            </div>
          </div>

          <!-- Step Info -->
          <div class="space-y-2 max-w-[260px] px-3 z-10 mt-4">
            <h3 class="text-base md:text-lg font-bold font-outfit leading-snug">
              {{ step.title }}
            </h3>
            <p class="text-xs md:text-sm text-white/80 leading-relaxed">
              {{ step.text || step.description }}
            </p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: 'steps'
  },
  tagText: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'КАК МЫ РАБОТАЕМ'
  },
  isDark: {
    type: Boolean,
    default: false
  },
  steps: {
    type: Array,
    default: () => []
  }
})

const defaultSteps = [
  {
    icon: 'lucide:phone-call',
    title: 'Заявка или звонок',
    text: 'Оставляете заявку на сайте или пишете нам в WhatsApp для быстрой консультации.'
  },
  {
    icon: 'lucide:calendar-check',
    title: 'Подбор времени и расчет',
    text: 'Согласовываем удобное время визита и фиксируем прозрачную стоимость услуг.'
  },
  {
    icon: 'lucide:sparkles',
    title: 'Выполнение работы',
    text: 'Опытные мастера выполняют работу по высокому стандарту качества.'
  },
  {
    icon: 'lucide:shield-check',
    title: 'Результат и гарантия',
    text: 'Вы принимаете готовую работу и получаете официальную гарантию.'
  }
]

const stepsData = computed(() => {
  return props.steps && props.steps.length > 0 ? props.steps : defaultSteps
})

const getStepIcon = (step, idx) => {
  if (step.icon) return step.icon
  const defaultIcons = [
    'lucide:phone-call',
    'lucide:calendar-check',
    'lucide:sparkles',
    'lucide:shield-check',
    'lucide:check-circle-2'
  ]
  return defaultIcons[idx] || 'lucide:check-circle-2'
}
</script>
