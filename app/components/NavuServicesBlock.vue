<template>
  <section id="services" class="w-full bg-[#f7f8f7] py-16 lg:py-24 px-6 md:px-12 flex justify-center font-sans">
    <div class="max-w-[1104px] w-full flex flex-col">
      
      <!-- Section Header -->
      <div class="inline-flex flex-col items-start gap-2 mb-4 self-start">
        <span class="text-[16px] font-medium text-[#227b09] leading-tight tracking-[-0.04em]">Services</span>
        <div class="w-full h-[2px] bg-[#227b09]"></div>
      </div>

      <!-- Header Text Row -->
      <div class="flex flex-col lg:flex-row justify-between items-start w-full gap-8 lg:gap-16 mb-12">
        <h2 class="text-[32px] md:text-[38px] lg:text-[44px] font-bold text-[#0c0e0c] leading-[1.1] tracking-[-0.04em] max-w-[540px]">
          Complete landscaping.<br class="hidden md:inline" /> Built for how you use space.
        </h2>
        <div class="max-w-[420px] w-full lg:mt-2">
          <h3 class="text-[18px] md:text-[20px] font-bold text-[#0c0e0c] tracking-[-0.04em] mb-2">
            Structured approach.
          </h3>
          <p class="text-[15px] md:text-[16px] font-normal text-[#51554e] leading-[1.4] tracking-[-0.04em]">
            Outdoor spaces designed as one connected system.
          </p>
        </div>
      </div>

      <!-- Services Cards List (Accordion) -->
      <div class="flex flex-col gap-4 w-full">
        <div 
          v-for="(service, idx) in services" 
          :key="idx"
          @click="activeIndex = idx"
          :class="[
            'relative w-full overflow-hidden border rounded-[12px] cursor-pointer transition-all duration-300 ease-out flex flex-col px-6 py-5 lg:px-8 group',
            activeIndex === idx 
              ? 'border-[#0c0e0c]/10 lg:h-[165px] lg:py-8 text-white' 
              : 'bg-white border-[#edeeec] hover:border-[#d6d7d5] hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(12,14,12,0.04)] lg:h-[90px] lg:py-0 justify-center'
          ]"
        >
          <!-- Background Image Overlay -->
          <div 
            class="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none"
            :class="activeIndex === idx ? 'opacity-100' : 'opacity-0'"
          >
            <img 
              :src="service.bgImage" 
              class="w-full h-full object-cover transition-transform duration-700" 
              :class="activeIndex === idx ? 'scale-100' : 'scale-105'"
            />
            <div class="absolute inset-0 bg-black/35"></div>
          </div>

          <!-- Content Wrapper -->
          <div 
            :class="[
              'relative z-10 w-full flex flex-col lg:flex-row lg:justify-between',
              activeIndex === idx ? 'lg:items-stretch lg:h-full' : 'lg:items-center'
            ]"
          >
            <!-- Left block: Title & Description -->
            <div class="flex flex-col justify-between" :class="activeIndex === idx ? 'lg:h-full' : ''">
              <!-- Title & Icon -->
              <div class="flex items-center gap-3 select-none">
                <span 
                  :class="[
                    'text-[20px] lg:text-[24px] font-medium tracking-[-0.04em] transition-colors duration-300',
                    activeIndex === idx ? 'text-white' : 'text-[#0c0e0c] group-hover:text-[#227b09]'
                  ]"
                >
                  {{ service.title }}
                </span>
                <div 
                  :class="[
                    'w-7 h-7 flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                    activeIndex === idx ? 'text-white' : 'text-[#227b09]'
                  ]" 
                  v-html="service.svg"
                ></div>
              </div>
              
              <!-- Description -->
              <p 
                v-if="activeIndex === idx" 
                class="text-[15px] font-normal text-white/85 leading-[1.4] tracking-[-0.04em] max-w-[364px] mt-2 lg:mt-0 select-none animate-fade-in"
              >
                {{ service.description }}
              </p>
            </div>

            <!-- Right block: Tags & CTA -->
            <div 
              class="flex flex-col items-start lg:items-end mt-4 lg:mt-0"
              :class="activeIndex === idx ? 'lg:justify-between lg:h-full' : 'lg:justify-center'"
            >
              <!-- Tags -->
              <div class="flex flex-wrap items-center gap-2">
                <span 
                  v-for="(tag, tagIdx) in service.tags" 
                  :key="tagIdx"
                  :class="[
                    'px-3 py-1.5 lg:py-2 rounded-[8px] text-[13px] lg:text-[14px] tracking-[-0.04em] transition-all duration-300 select-none',
                    activeIndex === idx 
                      ? 'bg-white/20 backdrop-blur-[12px] text-white' 
                      : 'bg-[#edeeec] text-[#51554e] hover:bg-[#d6d7d5]'
                  ]"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Talk to us Button -->
              <a 
                v-if="activeIndex === idx"
                href="#contact"
                class="mt-4 lg:mt-0 inline-flex items-center justify-center gap-2 bg-[#227b09] hover:bg-[#1b6207] text-white px-5 h-11 rounded-[12px] text-[14px] font-medium transition-colors duration-200 select-none animate-fade-in shadow-sm"
              >
                Talk to us
                <svg viewBox="0 0 40 40" class="w-5 h-5 fill-current text-white">
                  <g transform="translate(9 8)">
                    <path d="M 0 24 L 8.209 12 L 0 0 L 4.022 0 L 12.231 12 L 4.022 24 Z M 9.769 24 L 17.978 12 L 9.769 0 L 13.791 0 L 22 12 L 13.791 24 Z" />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)

const services = ref([
  {
    title: 'Garden Design',
    description: 'Thoughtful layouts shaped around your space. Balanced design that works in real life.',
    tags: ['Custom Layouts', '3D Planning', 'Plant Strategy'],
    bgImage: 'https://framerusercontent.com/images/urvfsuFEyMbCo0ldrCDHnZIgrE.jpg?width=1280&height=427',
    svg: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"><path d="M 16 32 C 13.611 31.833 11.431 31.243 9.458 30.229 C 7.486 29.215 5.799 27.854 4.396 26.146 C 2.993 24.437 1.91 22.424 1.146 20.104 C 0.382 17.785 0 15.25 0 12.5 L 0 11 L 1.483 11 C 2.744 11 4.132 11.208 5.646 11.625 C 7.16 12.042 8.556 12.597 9.833 13.292 C 10.111 11.125 10.799 8.854 11.896 6.479 C 12.993 4.104 14.361 1.944 16 0 C 17.639 1.944 19 4.09 20.083 6.438 C 21.167 8.785 21.861 11.056 22.167 13.25 C 23.444 12.583 24.84 12.042 26.354 11.625 C 27.868 11.208 29.256 11 30.517 11 L 32 11 L 32 12.5 C 32 15.333 31.625 17.91 30.875 20.229 C 30.125 22.549 29.056 24.556 27.667 26.25 C 26.278 27.944 24.597 29.285 22.625 30.271 C 20.653 31.257 18.444 31.833 16 32 Z M 15.958 29 C 15.708 24.778 14.458 21.361 12.208 18.75 C 9.958 16.139 6.903 14.597 3.042 14.125 C 3.319 18.347 4.542 21.771 6.708 24.396 C 8.875 27.021 11.958 28.556 15.958 29 Z M 16 18.875 C 16.472 18.18 17.021 17.486 17.646 16.792 C 18.271 16.097 18.833 15.542 19.333 15.125 C 19.25 13.653 18.937 12.056 18.396 10.333 C 17.854 8.611 17.056 6.847 16 5.042 C 14.944 6.847 14.139 8.632 13.583 10.396 C 13.028 12.16 12.722 13.736 12.667 15.125 C 13.248 15.634 13.859 16.24 14.499 16.944 C 15.138 17.648 15.639 18.292 16 18.875 Z M 18.875 28.417 C 20.486 27.917 21.896 27.222 23.104 26.333 C 24.312 25.444 25.333 24.389 26.167 23.167 C 27 21.944 27.646 20.569 28.104 19.042 C 28.563 17.514 28.847 15.875 28.958 14.125 C 26.347 14.597 24.049 15.514 22.063 16.875 C 20.076 18.236 18.597 20.014 17.625 22.208 C 17.924 23.072 18.179 24.018 18.391 25.044 C 18.603 26.07 18.764 27.194 18.875 28.417 Z" transform="translate(4 4)"></path></svg>`
  },
  {
    title: 'Lawn Installation',
    description: 'Clean, even surface with long-lasting results. Designed for everyday use and durability.',
    tags: ['Turf Installation', 'Soil Preparation', 'Precision Leveling'],
    bgImage: 'https://framerusercontent.com/images/vBHWlAHh0zlW9NNYlUxfnRiobo0.jpg?width=1280&height=427',
    svg: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"><path d="M 0 25.6 L 0 22.4 L 9.2 22.4 C 8.607 20.148 7.496 18.207 5.867 16.578 C 4.237 14.948 2.281 13.837 0 13.244 C 0.504 13.096 1.022 12.985 1.556 12.911 C 2.089 12.837 2.637 12.8 3.2 12.8 C 6.756 12.8 9.778 14.044 12.267 16.533 C 14.756 19.022 16 22.044 16 25.6 Z M 19.2 25.6 C 19.2 24.474 19.081 23.363 18.844 22.267 C 18.607 21.17 18.252 20.104 17.778 19.067 C 18.904 17.111 20.452 15.578 22.422 14.467 C 24.393 13.356 26.519 12.8 28.8 12.8 C 29.333 12.8 29.867 12.837 30.4 12.911 C 30.933 12.985 31.467 13.096 32 13.244 C 29.719 13.837 27.763 14.956 26.133 16.6 C 24.504 18.244 23.393 20.178 22.8 22.4 L 32 22.4 L 32 25.6 Z M 16 16.044 C 16 14.326 16.311 12.704 16.933 11.178 C 17.556 9.652 18.422 8.311 19.533 7.156 C 20.644 6 21.948 5.074 23.444 4.378 C 24.941 3.681 26.578 3.289 28.356 3.2 C 26.844 4.148 25.526 5.304 24.4 6.667 C 23.274 8.03 22.415 9.541 21.822 11.2 C 20.607 11.793 19.519 12.496 18.556 13.311 C 17.593 14.126 16.741 15.037 16 16.044 Z M 13.067 13.067 C 12.681 12.741 12.333 12.474 12.022 12.267 C 11.711 12.059 11.422 11.881 11.156 11.733 C 11.156 11.615 11.163 11.467 11.178 11.289 C 11.193 11.111 11.2 10.933 11.2 10.756 C 11.2 8.8 10.889 6.904 10.267 5.067 C 9.644 3.23 8.726 1.541 7.511 0 C 9.259 0.741 10.785 1.778 12.089 3.111 C 13.393 4.444 14.385 6 15.067 7.778 C 14.563 8.607 14.141 9.474 13.8 10.378 C 13.459 11.281 13.215 12.178 13.067 13.067 Z" transform="translate(4 7)"></path></svg>`
  },
  {
    title: 'Outdoor Renovation',
    description: 'Transform existing spaces with clear improvements. Modern solutions that enhance usability and flow.',
    tags: ['Space Redesign', 'Hardscape Upgrade', 'Modern Finishes'],
    bgImage: 'https://framerusercontent.com/images/3GYYsMIrpMZgPWpOGWgGV3w1kXM.jpg?width=1280&height=427',
    svg: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"><path d="M 4.175 25.043 L 4.175 11.552 L 1.701 13.416 L 0 11.254 L 15.309 0 L 30.618 11.254 L 28.917 13.416 L 15.309 3.391 L 6.959 9.54 L 6.959 22.36 L 12.525 22.36 L 12.525 25.043 Z M 23.659 29.515 C 22.551 30.185 21.37 30.466 20.116 30.357 C 18.862 30.248 17.788 29.756 16.894 28.881 C 15.992 28.012 15.476 26.968 15.347 25.751 C 15.219 24.533 15.515 23.403 16.237 22.36 C 15.515 21.316 15.219 20.18 15.347 18.95 C 15.476 17.72 15.991 16.669 16.892 15.797 C 17.793 14.924 18.876 14.434 20.14 14.325 C 21.404 14.216 22.577 14.509 23.659 15.205 C 24.742 14.509 25.914 14.223 27.177 14.347 C 28.44 14.472 29.522 14.962 30.424 15.819 C 31.326 16.676 31.842 17.72 31.971 18.95 C 32.1 20.18 31.803 21.316 31.082 22.36 C 31.803 23.403 32.1 24.533 31.971 25.751 C 31.842 26.968 31.326 28.012 30.424 28.881 C 29.522 29.751 28.44 30.248 27.177 30.372 C 25.914 30.496 24.742 30.21 23.659 29.515 Z M 23.698 26.347 L 25.244 27.316 C 25.76 27.639 26.32 27.769 26.926 27.707 C 27.531 27.645 28.047 27.403 28.472 26.981 C 28.897 26.558 29.136 26.051 29.187 25.46 C 29.239 24.869 29.11 24.32 28.801 23.813 L 27.796 22.36 L 28.801 20.869 C 29.136 20.362 29.277 19.813 29.226 19.222 C 29.174 18.631 28.942 18.148 28.53 17.776 C 28.092 17.354 27.564 17.099 26.945 17.012 C 26.327 16.925 25.76 17.055 25.244 17.403 L 23.698 18.409 L 22.151 17.403 C 21.636 17.055 21.075 16.919 20.47 16.993 C 19.864 17.068 19.342 17.316 18.904 17.739 C 18.466 18.161 18.208 18.664 18.131 19.248 C 18.054 19.832 18.195 20.372 18.556 20.869 L 19.6 22.36 L 18.556 23.888 C 18.195 24.384 18.047 24.925 18.112 25.508 C 18.176 26.092 18.427 26.596 18.865 27.018 C 19.304 27.44 19.838 27.676 20.47 27.726 C 21.101 27.776 21.675 27.627 22.19 27.279 Z M 24.973 23.631 C 25.334 23.286 25.515 22.864 25.515 22.364 C 25.515 21.864 25.336 21.44 24.978 21.092 C 24.62 20.745 24.182 20.571 23.663 20.571 C 23.145 20.571 22.706 20.743 22.345 21.088 C 21.984 21.433 21.804 21.856 21.804 22.356 C 21.804 22.855 21.982 23.279 22.34 23.627 C 22.698 23.974 23.136 24.148 23.655 24.148 C 24.173 24.148 24.613 23.976 24.973 23.631 Z" transform="translate(4 5)"></path></svg>`
  },
  {
    title: 'Irrigation Systems',
    description: 'Efficient watering tailored to your landscape. Reliable systems for consistent plant health.',
    tags: ['Smart Watering', 'Auto Systems', 'Seasonal Setup'],
    bgImage: 'https://framerusercontent.com/images/Zxryd7hPryFQrp1UIX4G1EPLXW8.jpg?width=1280&height=427',
    svg: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"><path d="M 21.659 4 C 23.506 5.583 24.891 7.062 25.815 8.438 C 26.738 9.812 27.2 11.089 27.2 12.268 C 27.2 13.839 26.668 15.188 25.605 16.312 C 24.542 17.437 23.226 18 21.659 18 C 20.092 18 18.777 17.437 17.714 16.312 C 16.65 15.188 16.119 13.832 16.119 12.248 C 16.119 11.138 16.594 9.875 17.546 8.458 C 18.497 7.042 19.868 5.556 21.659 4 Z M 21.659 8.125 C 20.932 8.931 20.33 9.708 19.854 10.458 C 19.379 11.208 19.141 11.811 19.141 12.267 C 19.141 12.99 19.379 13.627 19.854 14.176 C 20.33 14.725 20.932 15 21.659 15 C 22.387 15 22.988 14.725 23.464 14.176 C 23.94 13.627 24.178 12.99 24.178 12.267 C 24.178 11.811 23.94 11.201 23.464 10.438 C 22.988 9.674 22.387 8.903 21.659 8.125 Z M 13.096 32 C 9.458 32 6.366 30.736 3.82 28.208 C 1.273 25.68 0 22.611 0 19 C 0 16.306 1.042 13.458 3.127 10.458 C 5.212 7.458 8.535 3.972 13.096 0 C 14.691 1.417 16.112 2.75 17.357 4 C 18.602 5.25 19.714 6.458 20.694 7.625 C 20.554 7.847 20.267 8.285 19.833 8.938 C 19.4 9.59 19.113 10.028 18.973 10.25 C 18.217 9.361 17.357 8.396 16.391 7.354 C 15.426 6.312 14.328 5.181 13.096 3.958 C 9.402 7.597 6.8 10.542 5.289 12.792 C 3.778 15.042 3.022 17.113 3.022 19.005 C 3.022 21.78 4.002 24.139 5.96 26.083 C 7.919 28.028 10.298 29 13.096 29 C 14.495 29 15.804 28.736 17.021 28.208 C 18.238 27.68 19.302 26.965 20.211 26.063 C 21.121 25.16 21.841 24.097 22.373 22.875 C 22.904 21.653 23.17 20.361 23.17 19 C 23.17 18.528 23.128 18.069 23.044 17.625 C 22.96 17.18 22.835 16.708 22.667 16.208 C 22.89 16.08 23.331 15.837 23.989 15.479 C 24.647 15.121 25.088 14.878 25.311 14.75 C 25.619 15.5 25.843 16.222 25.983 16.917 C 26.123 17.611 26.193 18.306 26.193 19.003 C 26.193 22.612 24.919 25.68 22.373 28.208 C 19.826 30.736 16.734 32 13.096 32 Z M 14.272 26.917 C 14.503 26.894 14.701 26.789 14.865 26.602 C 15.029 26.414 15.111 26.188 15.111 25.923 C 15.111 25.613 14.999 25.361 14.775 25.167 C 14.551 24.972 14.286 24.903 13.978 24.958 C 12.355 25.18 10.865 24.806 9.507 23.833 C 8.15 22.861 7.346 21.542 7.094 19.875 C 7.066 19.625 6.958 19.417 6.771 19.25 C 6.585 19.083 6.37 19 6.128 19 C 5.821 19 5.562 19.111 5.352 19.333 C 5.142 19.556 5.065 19.82 5.121 20.125 C 5.429 22.292 6.464 24.042 8.227 25.375 C 9.99 26.708 12.005 27.222 14.272 26.917 Z" transform="translate(6 4)"></path></svg>`
  }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

.font-sans {
  font-family: 'DM Sans', sans-serif !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>

