<template>
  <section class="w-full py-16 md:py-24 font-sans overflow-hidden" :style="{ backgroundColor: bgColor, color: textColor }">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-zinc-200/80 mb-12">
        <div class="space-y-4 max-w-2xl">
          <!-- Tag Badge -->
          <SectionBadge :text="tagText" default-style="sharp" :text-color="textColor" />
          
          <!-- Title -->
          <h2 class="text-3xl sm:text-4xl lg:text-[38px] font-bold tracking-tight leading-tight" :style="{ color: textColor }">
            {{ title }}
          </h2>
        </div>

        <!-- Right Button -->
        <div v-if="seeAllText" class="flex-shrink-0">
          <a 
            :href="seeAllUrl" 
            class="inline-flex items-center justify-center font-bold text-[10px] tracking-[0.2em] px-6 py-4 uppercase transition-all duration-200 hover:opacity-90"
            :style="{ backgroundColor: buttonBgColor, color: buttonTextColor }"
          >
            <span>{{ seeAllText }}</span>
            <span class="ml-2 text-[9px]">↗</span>
          </a>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <a 
          v-for="(article, index) in articles" 
          :key="index" 
          :href="article.url || '#'"
          class="group block w-full"
        >
          <!-- Article Image -->
          <div class="w-full aspect-[16/10] overflow-hidden bg-zinc-100 mb-6 relative border border-zinc-200/50">
            <img 
              :src="article.image" 
              :alt="article.title" 
              class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>

          <!-- Metadata (Date & Category) -->
          <span class="text-[10px] font-bold tracking-[0.15em] uppercase mb-3 block" :style="{ color: secondaryTextColor }">
            {{ article.date }} <span class="mx-1.5">•</span> {{ article.category }}
          </span>

          <!-- Title -->
          <h3 class="text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug group-hover:opacity-85 transition-opacity" :style="{ color: textColor }">
            {{ article.title }}
          </h3>
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#09090b'
  },
  secondaryTextColor: {
    type: String,
    default: '#71717a'
  },
  buttonBgColor: {
    type: String,
    default: '#09090b'
  },
  buttonTextColor: {
    type: String,
    default: '#ffffff'
  },
  tagText: {
    type: String,
    default: 'NEWS'
  },
  title: {
    type: String,
    default: 'Latest Articles'
  },
  seeAllText: {
    type: String,
    default: 'MORE ARTICLES'
  },
  seeAllUrl: {
    type: String,
    default: '#'
  },
  articles: {
    type: Array,
    default: () => [
      {
        title: 'The Future of Eco-Friendly Building Practices',
        date: 'SEP 29, 2025',
        category: 'SUSTAINABILITY',
        image: '/img/construction/hero-modern.jpeg',
        url: '#'
      },
      {
        title: 'Pointers for a Flourishing Home Improvement Project',
        date: 'SEP 29, 2025',
        category: 'HOME IMPROVEMENT',
        image: '/img/construction/hero-renovation.jpeg',
        url: '#'
      }
    ]
  }
})
</script>
