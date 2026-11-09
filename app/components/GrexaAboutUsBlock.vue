<template>
  <section 
    ref="sectionRef"
    class="relative w-full bg-white text-black font-heebo py-20 md:py-[150px] overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-center">
      <!-- Left Column: Content -->
      <div class="flex flex-col items-start text-left max-w-[580px] w-full">
        <!-- Subtitle with Icon -->
        <div 
          :class="{ 'animate-active': isVisible }"
          class="animate-item delay-100 flex items-center gap-2 mb-6 select-none"
        >
          <!-- Custom green dot pattern SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" class="w-4 h-4">
            <circle cx="5" cy="5" r="2" fill="#4BBB37"/>
            <circle cx="5" cy="10" r="2" fill="#4BBB37"/>
            <circle cx="10" cy="10" r="2" fill="#4BBB37"/>
          </svg>
          <span class="text-sm font-medium uppercase tracking-wider text-zinc-500">{{ tagText }}</span>
        </div>

        <!-- Title -->
        <h2 
          :class="{ 'animate-active': isVisible }"
          class="animate-item delay-200 text-xl sm:text-2xl md:text-[38px] font-normal leading-[1.2] tracking-tight text-black mb-8"
          v-html="title"
        ></h2>

        <!-- Description -->
        <p 
          :class="{ 'animate-active': isVisible }"
          class="animate-item delay-300 text-base text-[#3b3b33] leading-relaxed mb-10"
          v-html="description"
        ></p>

        <!-- CTA Button -->
        <div 
          :class="{ 'animate-active': isVisible }"
          class="animate-item delay-400 mb-10"
        >
          <a
            :href="buttonUrl"
            class="group/btn relative flex items-center bg-primary text-black text-base font-normal p-[4px] select-none hover:bg-primary/95 transition-colors duration-300"
          >
            <span class="pl-6 pr-5 py-2.5 font-medium">{{ buttonText }}</span>
            <div class="w-10 h-10 flex items-center justify-center bg-black text-white transition-transform duration-300 group-hover/btn:scale-95">
              <!-- Arrow SVG -->
              <svg class="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M 0 10 L 5 5 L 0 0" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(15 4)"></path>
                <path d="M 0 11 L 0 4 C 0 1.791 1.791 0 4 0 L 16 0" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 9)"></path>
              </svg>
            </div>
          </a>
        </div>

        <!-- Avatars & Text Group -->
        <div 
          :class="{ 'animate-active': isVisible }"
          class="animate-item delay-500 flex flex-col items-start gap-4"
        >
          <!-- Avatars Stack -->
          <div class="flex -space-x-3.5 overflow-hidden select-none">
            <img
              v-for="(avatar, idx) in resolvedAvatars"
              :key="idx"
              class="inline-block h-10 w-10 rounded-full border-2 border-white object-cover bg-zinc-200"
              :src="avatar"
              :alt="`Profile ${idx + 1}`"
            />
          </div>
          <!-- Text -->
          <p class="text-sm font-normal text-zinc-800 tracking-wide">
            <span class="font-bold text-black text-base">{{ statNumber }}</span> {{ statText }}
          </p>
        </div>
      </div>

      <!-- Right Column: Image -->
      <div class="w-full flex justify-center lg:justify-end">
        <div 
          :class="{ 'animate-active': isVisible }"
          class="animate-image relative w-full max-w-[580px] aspect-[580/553] overflow-hidden select-none"
        >
          <img
            :src="resolvedImage"
            alt="About Us Image"
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
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
    default: 'About Us'
  },
  title: {
    type: String,
    default: 'Innovative systems designed to reduce environmental impact while supporting efficient and sustainable operations.'
  },
  description: {
    type: String,
    default: 'We are dedicated to creating environmentally responsible solutions that help industries reduce their carbon footprint and use resources more efficiently. By combining innovation, data-driven insights, and sustainable practices, we enable organizations to improve performance while building a cleaner future.'
  },
  buttonText: {
    type: String,
    default: 'About Us'
  },
  buttonUrl: {
    type: String,
    default: '#'
  },
  avatars: {
    type: Array,
    default: () => [
      'https://framerusercontent.com/images/azQfsxh5mSgSliHYt8ZGB5lPMo.jpg?width=80&height=80',
      'https://framerusercontent.com/images/OGhvxnfrRC1To6Qzj5HorzZGa0.jpg?width=80&height=80',
      'https://framerusercontent.com/images/relZzMkeNXP43QsDpZ0cC63FIAA.jpg?width=80&height=80',
      'https://framerusercontent.com/images/KR7fnQGYWxxNW5mwz6cRY8FEjgs.jpg?width=80&height=80'
    ]
  },
  statNumber: {
    type: String,
    default: '10M+'
  },
  statText: {
    type: String,
    default: 'People Powered Sustainably'
  },
  image: {
    type: String,
    default: 'https://framerusercontent.com/images/NRxqDkKZT8o0F56cvCaGPt4rA.jpg?width=1256&height=736'
  }
})

// Image Resolution
const { resolveImage } = useImageResolver()
const resolvedImage = computed(() => resolveImage(props.image))
const resolvedAvatars = computed(() => {
  if (!props.avatars) return []
  return props.avatars.map(avatar => resolveImage(avatar))
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
.font-heebo {
  font-family: 'Heebo', sans-serif;
}

/* Base item animation style (fade-in + slide-up) */
.animate-item {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.animate-item.animate-active {
  opacity: 1;
  transform: translateY(0);
}

/* Image zoom-in reveal style */
.animate-image {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
  transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.animate-image.animate-active {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Cascade delays */
.delay-100 {
  transition-delay: 80ms;
}
.delay-200 {
  transition-delay: 180ms;
}
.delay-300 {
  transition-delay: 280ms;
}
.delay-400 {
  transition-delay: 380ms;
}
.delay-500 {
  transition-delay: 480ms;
}
</style>
