<template>
  <section class="relative w-full min-h-screen flex flex-col justify-between bg-black text-white font-heebo overflow-hidden">
    <!-- Background Video -->
    <div class="absolute inset-0 z-0">
      <video
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-cover opacity-80"
        style="object-position: 50% 50%;"
      >
        <source :src="videoUrl" type="video/mp4" />
      </video>
      <!-- Dark gradient overlay for perfect readability and bottom contrast -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/85 z-10"></div>
    </div>

    <!-- Header / Navbar -->
    <header class="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 md:py-8 flex items-center justify-between animate-fade-in-up delay-700">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <img 
          v-if="logoImage" 
          :src="resolvedLogoImage" 
          :alt="logoText" 
          class="h-[30px] w-auto transition-transform duration-300 group-hover:scale-[1.01]" 
        />
        <template v-else>
          <!-- Если дефолтный текст Grexa, показываем красивый SVG -->
          <svg v-if="logoText === 'Grexa'" xmlns="http://www.w3.org/2000/svg" width="93" height="30" fill="none" class="h-7 w-auto text-white fill-current">
            <path stroke="currentColor" stroke-width="2.466" d="M24.995 9.212c-.918-2.202-4.185-6.724-9.912-7.158C8.804 1.578 4.36 4.27 2.418 9.763c-.71 2.011-.38 6.827 0 8.26.767 2.895 3.006 5.635 5.507 7.159m0 0c1.445.88 6.607 2.753 11.563 0 5.878-3.266 6.203-8.46 6.02-10.847H13.865m-5.94 10.846V15.11m12.114-3.14c-.55-2.018-4.405-5.506-8.81-3.303-2.973 1.486-3.305 3.788-3.304 6.443m12.114 1.266c-.55 3.304-5.3 5.74-9.36 3.304-1.268-.76-2.754-2.753-2.754-4.57"/>
            <path fill="currentColor" d="M33.608 27.06h-3.065V9.329h2.983l.082 2.786zm5.523-15.028a5 5 0 0 0-.738-.098 8 8 0 0 0-.754-.033q-1.392 0-2.36.574a3.9 3.9 0 0 0-1.475 1.59q-.525.999-.655 2.294l-.869.491q0-2.147.574-3.917.574-1.786 1.786-2.851Q35.87 9 37.787 9q.311 0 .737.082.443.066.607.147zm10.161 15.356q-2.475 0-4.31-1.098a7.7 7.7 0 0 1-2.836-3.048q-1-1.934-1-4.425v-.705q0-2.885 1.099-4.916 1.114-2.049 2.884-3.114Q46.916 9 48.9 9q2.557 0 4.162 1.147 1.623 1.131 2.377 3.098.77 1.95.77 4.425v1.36H42.966v-2.458h10.177v-.23a7.9 7.9 0 0 0-.475-2.294 4.1 4.1 0 0 0-1.311-1.852q-.901-.738-2.458-.738-1.377 0-2.442.787-1.05.77-1.656 2.262-.59 1.475-.59 3.605v.705q0 1.688.623 3.081a5.36 5.36 0 0 0 1.803 2.213q1.18.82 2.819.82 1.605 0 2.72-.657a6.7 6.7 0 0 0 1.95-1.753l1.853 1.442q-.853 1.31-2.459 2.377-1.59 1.048-4.228 1.048m16.422-11.587 3.9-6.473h3.573l-5.785 8.752 5.965 8.98h-3.523l-4.081-6.67-4.065 6.67h-3.572l5.982-8.98-5.802-8.752h3.54zm21.141-.901q0-1.59-.95-2.524-.934-.95-2.77-.95-1.13 0-2 .393-.851.393-1.327 1.032-.475.639-.475 1.393h-3.065q0-1.278.869-2.474.868-1.213 2.442-1.983Q81.169 9 83.315 9q1.934 0 3.426.656 1.491.655 2.327 1.983.852 1.311.852 3.294v8.26q0 .885.148 1.885.163 1 .475 1.72v.263h-3.196q-.23-.525-.36-1.393a11 11 0 0 1-.132-1.64zm.525 3.54h-3.016q-2.589 0-3.999.82-1.41.819-1.409 2.458 0 1.278.852 2.163.869.885 2.524.885 1.393 0 2.458-.59t1.688-1.458q.624-.87.672-1.672l1.312 1.459q-.116.687-.623 1.524a7.3 7.3 0 0 1-1.36 1.606 7.3 7.3 0 0 1-2 1.262q-1.147.491-2.59.491-1.802 0-3.162-.688-1.344-.705-2.098-1.901a4.96 4.96 0 0 1-.738-2.655q0-2.868 2.164-4.343 2.163-1.491 5.818-1.491h3.507z"/>
          </svg>
          <span v-else class="text-xl font-bold text-white tracking-tight">{{ logoText }}</span>
        </template>
      </a>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center gap-8 text-base font-normal tracking-wide text-zinc-300">
        <a 
          v-for="link in navLinks" 
          :key="link.label" 
          :href="link.url" 
          class="transition-colors duration-300 hover:text-primary py-1"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- CTA Button Header -->
      <div class="flex items-center">
        <a
          :href="headerCtaUrl"
          class="group/btn relative flex items-center bg-primary text-black text-base font-normal p-[4px] select-none hover:bg-primary/95 transition-colors duration-300"
        >
          <span class="pl-5 pr-4 py-2 font-medium">{{ headerCtaText }}</span>
          <div class="w-9 h-9 flex items-center justify-center bg-black text-white transition-transform duration-300 group-hover/btn:scale-95">
            <!-- Arrow SVG -->
            <svg class="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M 0 10 L 5 5 L 0 0" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(15 4)"></path>
              <path d="M 0 11 L 0 4 C 0 1.791 1.791 0 4 0 L 16 0" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 9)"></path>
            </svg>
          </div>
        </a>
      </div>
    </header>

    <!-- Main Hero Content -->
    <main class="relative z-20 w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex-grow flex flex-col justify-center">
      <div class="max-w-[760px] flex flex-col items-start text-left">
        <!-- Title -->
        <h1 
          class="text-4xl sm:text-5xl md:text-7xl font-normal leading-[1.15] tracking-tight text-white mb-6 animate-fade-in-up delay-100"
          v-html="title"
        ></h1>
        
        <!-- Description -->
        <p 
          class="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-[700px] mb-10 animate-fade-in-up delay-250"
          v-html="description"
        ></p>

        <!-- CTA Button Main -->
        <div class="animate-fade-in-up delay-400">
          <a
            :href="primaryCtaUrl"
            class="group/btn relative flex items-center bg-primary text-black text-base font-normal p-[4px] select-none hover:bg-primary/95 transition-colors duration-300"
          >
            <span class="pl-6 pr-5 py-2.5 font-medium">{{ primaryCtaText }}</span>
            <div class="w-10 h-10 flex items-center justify-center bg-black text-white transition-transform duration-300 group-hover/btn:scale-95">
              <!-- Arrow SVG -->
              <svg class="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M 0 10 L 5 5 L 0 0" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(15 4)"></path>
                <path d="M 0 11 L 0 4 C 0 1.791 1.791 0 4 0 L 16 0" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 9)"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </main>

    <!-- Bottom Badges / Scroll -->
    <footer class="relative z-20 w-full max-w-7xl mx-auto px-6 pb-8 md:pb-12 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <!-- Scroll Indicator -->
      <div class="flex items-center gap-2 text-zinc-400 text-sm tracking-wider uppercase select-none animate-fade-in-up delay-550">
        <span>Scroll</span>
        <svg class="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M19 12l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <!-- Badges Group -->
      <div class="flex flex-wrap items-center gap-3 md:gap-4 animate-fade-in-up delay-550">
        <!-- Badges Loop -->
        <div 
          v-for="(badge, idx) in badges" 
          :key="idx"
          class="glass-badge flex items-center gap-3 px-6 py-3.5 bg-white/20 border border-white/20 transition-all duration-300 select-none"
        >
          <!-- Badge Icons -->
          <svg v-if="badge.icon === 'leaf'" class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M 7.022 18 C 3.381 18.011 0.339 15.229 0.026 11.602 C -0.287 7.975 2.233 4.713 5.822 4.1 C 11.522 3 13.022 2.48 15.022 0 C 16.022 2 17.022 4.18 17.022 8 C 17.022 13.5 12.242 18 7.022 18 Z" stroke-linecap="round" stroke-linejoin="round" transform="translate(3.978 2)"></path>
            <path d="M 0 9 C 0 6 1.85 3.64 5.08 3 C 7.5 2.52 10 1 11 0" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 12)"></path>
          </svg>
          <svg v-else-if="badge.icon === 'energy'" class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M 1 5 C 0.448 5 0 4.552 0 4 L 0 2 C 0 0.895 0.895 0 2 0 L 4 0 C 5.105 0 6 0.895 6 2 L 6 4 C 6 4.552 5.552 5 5 5 Z" stroke-linecap="round" stroke-linejoin="round" transform="translate(16 14)"></path>
            <path d="M 0 2 L 0 0" stroke-linecap="round" stroke-linejoin="round" transform="translate(17 19)"></path>
            <path d="M 14 11 L 14 3.5 C 14 1.567 12.433 0 10.5 0 C 8.567 0 7 1.567 7 3.5 L 7 14.5 C 7 16.433 5.433 18 3.5 18 C 1.567 18 0 16.433 0 14.5 L 0 7" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 3)"></path>
            <path d="M 0 2 L 0 0" stroke-linecap="round" stroke-linejoin="round" transform="translate(21 19)"></path>
            <path d="M 0 2 L 0 0" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"></path>
            <path d="M 2 5 C 0.895 5 0 4.105 0 3 L 0 1 C 0 0.448 0.448 0 1 0 L 5 0 C 5.552 0 6 0.448 6 1 L 6 3 C 6 4.105 5.105 5 4 5 Z" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 5)"></path>
            <path d="M 0 2 L 0 0" stroke-linecap="round" stroke-linejoin="round" transform="translate(7 3)"></path>
          </svg>
          <svg v-else-if="badge.icon === 'lightning'" class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M 1.003 12.003 C 0.617 12.004 0.265 11.783 0.098 11.434 C -0.069 11.086 -0.02 10.673 0.223 10.373 L 10.123 0.173 C 10.276 -0.004 10.531 -0.051 10.737 0.059 C 10.943 0.169 11.045 0.407 10.983 0.633 L 9.063 6.653 C 8.948 6.96 8.992 7.305 9.18 7.574 C 9.367 7.844 9.675 8.004 10.003 8.003 L 17.003 8.003 C 17.39 8.001 17.742 8.223 17.909 8.571 C 18.076 8.919 18.027 9.333 17.783 9.633 L 7.883 19.833 C 7.73 20.009 7.476 20.056 7.27 19.946 C 7.064 19.836 6.961 19.598 7.023 19.373 L 8.943 13.353 C 9.058 13.045 9.015 12.701 8.827 12.431 C 8.64 12.162 8.332 12.002 8.003 12.003 Z" stroke-linecap="round" stroke-linejoin="round" transform="translate(2.997 1.997)"></path>
          </svg>
          <span class="text-base font-normal tracking-wide text-white">{{ badge.text }}</span>
        </div>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useImageResolver } from '~/composables/useImageResolver'

const props = defineProps({
  logoText: {
    type: String,
    default: 'Grexa'
  },
  logoImage: {
    type: String,
    default: ''
  },
  navLinks: {
    type: Array,
    default: () => [
      { label: 'Home', url: '#' },
      { label: 'About', url: '#' },
      { label: 'Services', url: '#' },
      { label: 'Projects', url: '#' },
      { label: 'Blog', url: '#' }
    ]
  },
  headerCtaText: {
    type: String,
    default: 'Contact Us'
  },
  headerCtaUrl: {
    type: String,
    default: '#'
  },
  title: {
    type: String,
    default: 'Future-Ready Energy for Modern Industries'
  },
  description: {
    type: String,
    default: 'We deliver reliable, sustainable energy solutions tailored to the evolving needs of modern industries. By combining innovation and efficiency, we help organizations optimize performance at every level.'
  },
  primaryCtaText: {
    type: String,
    default: 'View Our Services'
  },
  primaryCtaUrl: {
    type: String,
    default: '#'
  },
  videoUrl: {
    type: String,
    default: 'https://framerusercontent.com/assets/0XoBCl56qw9hOzvrVRgPUUMufk.mp4'
  },
  badges: {
    type: Array,
    default: () => [
      { text: 'Carbon Scan', icon: 'leaf' },
      { text: 'Energy Optimization', icon: 'energy' },
      { text: 'Low Emissions', icon: 'lightning' }
    ]
  }
})

// Image Resolution
const { resolveImage } = useImageResolver()
const resolvedLogoImage = computed(() => resolveImage(props.logoImage))
</script>

<style scoped>
.font-heebo {
  font-family: 'Heebo', sans-serif;
}

.glass-badge {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0px;
}

/* Base fade-in-up class */
.animate-fade-in-up {
  opacity: 0;
  transform: translateY(24px);
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Animation Delays */
.delay-100 {
  animation-delay: 150ms;
}
.delay-250 {
  animation-delay: 300ms;
}
.delay-400 {
  animation-delay: 450ms;
}
.delay-550 {
  animation-delay: 600ms;
}
.delay-700 {
  animation-delay: 750ms;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
