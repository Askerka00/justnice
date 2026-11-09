<template>
  <section class="w-full bg-[#111111] text-white py-20 lg:py-28 font-sans overflow-hidden">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-10 mb-12 sm:mb-16 gap-6">
        
        <div class="space-y-4 max-w-2xl">
          <SectionBadge :text="tagText" default-style="sharp" text-color="#d1d5db" border-color="rgba(255, 255, 255, 0.3)" />
          <h2 class="text-3xl sm:text-4xl lg:text-[38px] font-medium tracking-tight text-white leading-tight">
            {{ title }}
          </h2>
        </div>
        
        <div v-if="seeAllText" class="flex items-center sm:h-16 flex-shrink-0">
          <div class="hidden sm:block h-full w-[1px] bg-white/10 mr-8"></div>
          
          <a 
            :href="seeAllUrl" 
            class="group flex items-center text-xs font-bold tracking-[0.2em] uppercase text-gray-300 hover:text-white transition-colors py-2"
          >
            <span>{{ seeAllText }}</span>
            <span class="ml-2 text-sm transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
          </a>
        </div>

      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        <a 
          v-for="(project, index) in projects" 
          :key="index" 
          :href="project.url || '#'"
          class="group block w-full rounded-none"
        >
          <div class="w-full aspect-[3/4] overflow-hidden bg-gray-900 rounded-none relative">
            <img 
              :src="project.image" 
              :alt="project.name" 
              class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.9] group-hover:brightness-100"
            />
          </div>

          <div class="pt-5 flex flex-col">
            <span class="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
              {{ project.location }}
            </span>
            <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-gray-300 transition-colors">
              {{ project.name }}
            </h3>
          </div>
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  tagText: { type: String, default: 'Selected Projects' },
  title: { type: String, default: 'Explore our valuable clients.' },
  seeAllText: { type: String, default: 'See All Projects' },
  seeAllUrl: { type: String, default: '#' },
  projects: {
    type: Array,
    default: () => [
      {
        location: 'San Diego, CA',
        name: 'Cedar Ridge Estates',
        image: '/img/construction/hero-aerial.jpeg',
        url: '#'
      },
      {
        location: 'Dallas, USA',
        name: 'Serene Haven Townhomes',
        image: '/img/construction/hero-site.jpeg',
        url: '#'
      },
      {
        location: 'Georgia, USA',
        name: 'Willow Creek Residences',
        image: '/img/construction/hero-building.jpeg',
        url: '#'
      }
    ]
  }
});
</script>
