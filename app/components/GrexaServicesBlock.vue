<template>
  <section 
    ref="sectionRef"
    class="relative w-full bg-[#f2f8f3] text-black font-heebo py-20 md:py-[150px] overflow-hidden"
  >
    <div class="max-w-[1296px] w-full mx-auto px-6 xl:px-0 flex flex-col items-center">
      <!-- Subtitle with Icon -->
      <div 
        :class="{ 'animate-active': isVisible }"
        class="animate-item delay-100 flex items-center gap-1.5 mb-[6px] select-none text-black text-base font-normal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" class="w-[15px] h-[15px]">
          <circle cx="5" cy="5" r="2" fill="#4BBB37"/>
          <circle cx="5" cy="10" r="2" fill="#4BBB37"/>
          <circle cx="10" cy="10" r="2" fill="#4BBB37"/>
        </svg>
        <span>{{ tagText }}</span>
      </div>

      <!-- Title -->
      <h2 
        :class="{ 'animate-active': isVisible }"
        class="animate-item delay-200 text-[32px] md:text-[38px] font-normal leading-[1.2] tracking-tight text-black text-center mb-[42px] max-w-[800px]"
        v-html="title"
      ></h2>

      <!-- Services List Container -->
      <div 
        :class="{ 'animate-active': isVisible }"
        class="animate-item delay-300 w-full flex flex-col border-t border-[#e2e7e4] mb-[40px]"
      >
        <!-- Service Item -->
        <a 
          v-for="(service, index) in resolvedServices" 
          :key="index"
          href="#"
          class="group relative flex flex-row items-start py-8 px-4 lg:px-8 border-b border-[#e2e7e4] transition-colors duration-300 hover:bg-black/[0.01] overflow-visible w-full"
        >
          <!-- Number -->
          <div class="text-[36px] md:text-[44px] text-[#035925] font-normal leading-[1.2] w-[50px] flex-shrink-0 select-none">
            {{ service.number }}
          </div>
          
          <!-- Content -->
          <div class="flex-grow ml-6 lg:ml-[50px]">
            <h3 class="text-xl md:text-[22px] font-normal text-black mb-5 transition-colors duration-300 group-hover:text-[#035925] leading-[1.4]">
              {{ service.title }}
            </h3>
            
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="(tag, tagIndex) in service.tags" 
                :key="tagIndex"
                class="bg-[#035925] text-white text-[16px] py-1.5 px-3 font-normal rounded-none select-none leading-[1.4]"
              >
                {{ tag }}
              </span>
            </div>
            
            <!-- Mobile Image (Shown below tags on tablets and phones) -->
            <div class="block lg:hidden w-full h-[180px] mt-5 overflow-hidden rounded-none bg-zinc-200">
              <img 
                :src="service.resolvedImage" 
                class="w-full h-full object-cover" 
                :alt="`${service.title} Image`" 
              />
            </div>
          </div>

          <!-- Hover Image Reveal (Desktop only) -->
          <div class="hidden lg:block absolute right-0 top-0 bottom-0 h-full w-[200px] z-30 opacity-0 translate-x-6 scale-[0.93] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 overflow-hidden rounded-none">
            <img 
              :src="service.resolvedImage" 
              class="w-full h-full object-cover" 
              :alt="`${service.title} Image`" 
            />
          </div>
        </a>
      </div>

      <!-- Bottom CTA Button -->
      <div 
        :class="{ 'animate-active': isVisible }"
        class="animate-item delay-400"
      >
        <a
          :href="ctaUrl"
          class="group/btn relative flex items-center bg-[#e5f937] text-black text-[16px] font-normal p-[4px] select-none hover:bg-[#ebfa5c] transition-colors duration-300 rounded-none border border-[#e5f937]"
        >
          <span class="pl-6 pr-5 py-2.5 font-normal">{{ ctaText }}</span>
          <div class="w-10 h-10 flex items-center justify-center bg-black text-white transition-transform duration-300 group-hover/btn:scale-95 rounded-none flex-shrink-0">
            <!-- Arrow SVG -->
            <svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M 0 10 L 5 5 L 0 0" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(15 4)"></path>
              <path d="M 0 11 L 0 4 C 0 1.791 1.791 0 4 0 L 16 0" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 9)"></path>
            </svg>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useImageResolver } from '~/composables/useImageResolver'

const props = defineProps({
  tagText: {
    type: String,
    default: 'What We Do'
  },
  title: {
    type: String,
    default: 'Clean Solutions for a Greener Future'
  },
  services: {
    type: Array,
    default: () => [
      {
        number: '01',
        title: 'Waste Management',
        tags: ['Eco Recycling', 'Resource Recovery', 'Material Reuse'],
        image: 'https://framerusercontent.com/images/NF5R2UpTY3fTcM6SBhK7v4bfFA.jpg?width=826&height=516'
      },
      {
        number: '02',
        title: 'Emission Reduction',
        tags: ['Carbon Reduction', 'Energy Optimization', 'Low-Emission Technology'],
        image: 'https://framerusercontent.com/images/rXpcfyDqKwHSAWWGG692BwFUhc.jpg?width=826&height=516'
      },
      {
        number: '03',
        title: 'Sustainability Consulting',
        tags: ['Sustainability Strategy', 'ESG Advisory', 'Regulatory Compliance'],
        image: 'https://framerusercontent.com/images/gLEr3MKi3LyZQMhL68pXUA9huGc.jpg?width=826&height=516'
      },
      {
        number: '04',
        title: 'Environmental Monitoring',
        tags: ['Data Accuracy', 'Real-Time Tracking', 'Nature Technology'],
        image: 'https://framerusercontent.com/images/X9RZx2eHGO5hPVZbJ5qqZq501o.jpg?width=826&height=516'
      }
    ]
  },
  ctaText: {
    type: String,
    default: 'View All Services'
  },
  ctaUrl: {
    type: String,
    default: '#'
  }
})

// Image Resolution
const { resolveImage } = useImageResolver()
const resolvedServices = computed(() => {
  if (!props.services) return []
  return props.services.map(service => ({
    ...service,
    resolvedImage: resolveImage(service.image)
  }))
})

// Scroll animation triggers when section enters viewport
const isVisible = ref(false)
const sectionRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target) // Trigger once
      }
    })
  }, {
    threshold: 0.15 // Trigger when 15% of the element is visible
  })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<style scoped>
/* Base item animation style (fade-in + slide-up 20px) */
.animate-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.animate-item.animate-active {
  opacity: 1;
  transform: translateY(0);
}

/* Cascade delays */
.delay-100 {
  transition-delay: 100ms;
}
.delay-200 {
  transition-delay: 200ms;
}
.delay-300 {
  transition-delay: 300ms;
}
.delay-400 {
  transition-delay: 400ms;
}
</style>
