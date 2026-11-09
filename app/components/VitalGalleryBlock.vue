<template>
  <section id="gallery" class="py-16 md:py-24 bg-white" data-aos="fade-up">
    <div class="w-full max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 md:mb-20">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-zinc-950 mb-6">
          {{ title || 'Gallery' }}
        </h2>
        <p v-if="subtitle" class="text-lg text-zinc-500 max-w-2xl mx-auto pb-4">
          {{ subtitle }}
        </p>
      </div>

      <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(image, index) in resolvedImages" :key="index" class="gallery-card w-full relative group overflow-hidden rounded-2xl aspect-[4/3] bg-zinc-100 shadow-sm border border-gray-100">
          <NuxtImg :src="image.url" :alt="image.title || 'Gallery image'" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" format="webp" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <h3 v-if="image.title" class="text-white font-semibold text-lg p-6 w-full">{{ image.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useImageResolver } from '~/composables/useImageResolver'

const props = defineProps({
  title: String,
  subtitle: String,
  images: {
    type: Array,
    default: () => []
  }
})

const defaultImages = [
  { url: '/img/tours/charyn-canyon.jpeg', title: 'Charyn Canyon' },
  { url: '/img/tours/kolsay-lakes.jpeg', title: 'Kolsay Lakes' },
  { url: '/img/tours/kok-tobe.jpeg', title: 'Kok Tobe' }
]

const { resolveImage } = useImageResolver()

const resolvedImages = computed(() => {
  const imgs = props.images?.length > 0 ? props.images : defaultImages
  return imgs.map(img => ({
    ...img,
    url: resolveImage(img.url)
  }))
})
</script>

<style scoped>
/* Safari: force GPU compositing for overflow clip with border-radius */
.gallery-card {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

/* Safari grid-item flattening fix */
.grid > div {
  width: 100% !important;
  min-width: 100% !important;
  height: auto !important;
}
</style>