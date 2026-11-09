<template>
  <section class="relative w-full py-16 md:py-24 font-sans overflow-hidden" :style="{ backgroundColor: bgColor, color: textColor }">
    <!-- Watermark SVG Background on the bottom-left -->
    <div class="absolute left-0 bottom-0 w-[500px] md:w-[600px] h-auto select-none pointer-events-none opacity-20 z-0">
      <svg class="w-full h-auto" :style="{ color: textColor }" viewBox="0 0 300 220" fill="none" stroke="currentColor" stroke-width="0.75">
        <!-- Building Frame -->
        <path d="M10 220h120M20 220v-100M40 220v-100M60 220v-100M80 220v-100M100 220v-100M120 220v-100" />
        <path d="M15 200h110M15 180h110M15 160h110M15 140h110M15 120h110M15 100h110M15 80h110M15 60h70M15 40h40" />
        <path d="M20 180V80M40 180V80M60 180V80M80 180V80M100 180V80" />
        <!-- Diagonal cross beams (bracings) -->
        <path d="M20 200l20-20M40 200l20-20M60 200l20-20M80 200l20-20M100 200l20-20" />
        <path d="M40 200l-20-20M60 200l-40-20M80 200l-20-20M100 200l-20-20M120 200l-20-20" />
        
        <!-- Tower Crane -->
        <!-- Mast -->
        <path d="M190 220V60h8v160h-8" />
        <!-- lattice lines -->
        <path d="M190 200l8-20M190 180l8-20M190 160l8-20M190 140l8-20M190 120l8-20M190 100l8-20M190 80l8-20" />
        <path d="M198 200l-8-20M198 180l-8-20M198 160l-8-20M198 140l-8-20M198 120l-8-20M198 100l-8-20M198 80l-8-20" />
        <!-- Operator Cab -->
        <path d="M178 60h20v-12h-20z" fill="currentColor" fill-opacity="0.1" />
        <path d="M182 54h6v-4h-6z" />
        <!-- Jib -->
        <path d="M100 48h180" />
        <path d="M130 38h120" />
        <path d="M100 48l10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10" />
        <!-- Counterjib and counterweight -->
        <path d="M130 38L190 15M190 15l40 23" />
        <path d="M260 48h12v12h-12z" fill="currentColor" />
        <!-- Trolley & Load -->
        <path d="M150 48v35" />
        <path d="M142 83h16l-8 14z" fill="currentColor" />
      </svg>
    </div>

    <div class="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left Side: Content -->
        <div class="lg:col-span-6 space-y-6">
          <!-- Tag Badge -->
          <SectionBadge :text="tagText" default-style="sharp" :text-color="textColor" />
          
          <!-- Title -->
          <h2 class="text-3xl sm:text-4xl lg:text-[45px] font-bold tracking-tight leading-[1.12]" :style="{ color: textColor }">
            {{ title }}
          </h2>
          
          <!-- Description -->
          <p class="text-sm md:text-base leading-relaxed max-w-lg" :style="{ color: secondaryTextColor }">
            {{ description }}
          </p>
        </div>

        <!-- Right Side: Form Card -->
        <div class="lg:col-span-6">
          <div class="bg-white p-8 md:p-10 border border-zinc-950/10 shadow-sm rounded-none text-zinc-900">
            <h3 class="text-xl md:text-2xl font-bold tracking-tight text-zinc-950 mb-6">
              {{ cardTitle }}
            </h3>

            <form @submit.prevent="handleFormSubmit" class="space-y-5">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">First Name</label>
                  <input 
                    v-model="form.firstName" 
                    type="text" 
                    placeholder="Enter your first name" 
                    class="w-full bg-transparent border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-950 focus:outline-none transition-all placeholder-zinc-400"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Last Name</label>
                  <input 
                    v-model="form.lastName" 
                    type="text" 
                    placeholder="Enter your last name" 
                    class="w-full bg-transparent border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-950 focus:outline-none transition-all placeholder-zinc-400"
                    required
                  />
                </div>
              </div>

              <!-- Contact Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Email</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    class="w-full bg-transparent border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-950 focus:outline-none transition-all placeholder-zinc-400"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Phone Number</label>
                  <input 
                    v-model="form.phone" 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    class="w-full bg-transparent border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-950 focus:outline-none transition-all placeholder-zinc-400"
                    required
                  />
                </div>
              </div>

              <!-- Message Field -->
              <div class="space-y-2">
                <label class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Message</label>
                <textarea 
                  v-model="form.message" 
                  rows="4" 
                  placeholder="Type a message here..." 
                  class="w-full bg-transparent border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-950 focus:outline-none transition-all resize-none placeholder-zinc-400"
                  required
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="pt-2 flex justify-end">
                <button 
                  type="submit" 
                  class="inline-flex items-center justify-center font-bold text-[10px] tracking-[0.2em] px-6 py-4 uppercase transition-colors duration-200 hover:opacity-90 w-full sm:w-auto"
                  :style="{ backgroundColor: submitButtonBgColor, color: submitButtonTextColor }"
                >
                  <span>{{ submitButtonText }}</span>
                  <span class="ml-2.5 text-[9px]">↗</span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  bgColor: {
    type: String,
    default: '#dce8d7'
  },
  textColor: {
    type: String,
    default: '#09090b'
  },
  secondaryTextColor: {
    type: String,
    default: '#4b5563'
  },
  tagText: {
    type: String,
    default: "LET'S WORK TOGETHER"
  },
  title: {
    type: String,
    default: 'Ready to Build Your Dream Project?'
  },
  description: {
    type: String,
    default: "Whether you have a clear vision or need guidance to bring your ideas to life, Buildpro is here to help. Let's collaborate to create something extraordinary."
  },
  cardTitle: {
    type: String,
    default: 'Get in touch with us today!'
  },
  submitButtonText: {
    type: String,
    default: 'SEND A MESSAGE'
  },
  submitButtonBgColor: {
    type: String,
    default: '#09090b'
  },
  submitButtonTextColor: {
    type: String,
    default: '#ffffff'
  }
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

const handleFormSubmit = () => {
  alert(`Thank you, ${form.value.firstName}!\nYour message has been successfully sent.`)
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
}
</script>
