<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { MODEL_PAGES, MODEL_PAGES_MAP } from '~/data/modelPages'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const currentModel = computed(() => MODEL_PAGES_MAP[slug.value] ?? MODEL_PAGES[0]!)

const openFaq = ref<number | null>(0)
const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

const formattedPrice = computed(() => currentModel.value.priceFrom.toLocaleString('ru-RU'))

const whatsappModelUrl = computed(() => {
  const m = currentModel.value
  const message = [
    'Здравствуйте! Заявка на русификацию с сайта justnice.me:',
    `• Модель авто: ${m.whatsappModel}`,
    `• Стоимость: от ${m.priceFrom.toLocaleString('ru-RU')} ₸`,
    'Подскажите, пожалуйста, ближайшее свободное время для записи.'
  ].join('\n')
  return `https://wa.me/77772389939?text=${encodeURIComponent(message)}`
})

const otherModels = computed(() =>
  MODEL_PAGES.filter(item => item.slug !== currentModel.value.slug)
)

const schemaFaq = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: currentModel.value.faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a
    }
  }))
}))

const schemaService = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: `Русификация ${currentModel.value.modelsLabel}`,
  provider: {
    '@type': 'AutoRepair',
    name: 'JUSTNICE AutoTech',
    telephone: '+77772389939',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Алматы',
      addressCountry: 'KZ'
    }
  },
  areaServed: [
    { '@type': 'City', name: 'Алматы' },
    { '@type': 'City', name: 'Астана' }
  ],
  offers: {
    '@type': 'Offer',
    price: currentModel.value.priceFrom,
    priceCurrency: 'KZT',
    availability: 'https://schema.org/InStock'
  },
  description: currentModel.value.subtitle
}))

useHead({
  title: computed(() => currentModel.value.title),
  meta: [
    { name: 'description', content: computed(() => currentModel.value.metaDesc) },
    { property: 'og:title', content: computed(() => currentModel.value.title) },
    { property: 'og:description', content: computed(() => currentModel.value.metaDesc) },
    { property: 'og:url', content: computed(() => `https://www.justnice.me/models/${currentModel.value.slug}`) },
    { property: 'og:image', content: computed(() => `https://www.justnice.me${currentModel.value.image}`) },
    { name: 'twitter:title', content: computed(() => currentModel.value.title) },
    { name: 'twitter:description', content: computed(() => currentModel.value.metaDesc) }
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://www.justnice.me/models/${currentModel.value.slug}`) }
  ],
  script: [
    { type: 'application/ld+json', children: computed(() => JSON.stringify(schemaFaq.value)) },
    { type: 'application/ld+json', children: computed(() => JSON.stringify(schemaService.value)) }
  ]
})
</script>

<template>
  <div class="py-16 md:py-20 bg-white text-black">
    <div class="container-audi">
      <!-- Breadcrumbs -->
      <nav aria-label="Хлебные крошки" class="flex items-center gap-2 text-xs color-gray mb-8">
        <NuxtLink to="/" class="hover:text-black transition-colors">Главная</NuxtLink>
        <span>/</span>
        <NuxtLink to="/#popular-models" class="hover:text-black transition-colors">Модели авто</NuxtLink>
        <span>/</span>
        <span class="text-black font-medium">{{ currentModel.modelsLabel }}</span>
      </nav>

      <!-- Hero Card -->
      <div class="border border-black bg-[#fafafa] p-8 md:p-12 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7">
          <div class="flex items-center gap-2 mb-3">
            <span class="inline-block h-1.5 w-1.5 bg-[#f50537]"></span>
            <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">
              Алматы и Астана • {{ currentModel.brand }}
            </span>
          </div>

          <h1 class="title-md text-black mb-4">
            {{ currentModel.h1 }}
          </h1>

          <p class="text-base md:text-lg text-[#555555] font-light leading-relaxed mb-8">
            {{ currentModel.subtitle }}
          </p>

          <div class="grid grid-cols-2 gap-6 py-5 border-y border-[#e5e5e5] mb-8">
            <div>
              <p class="text-xs color-gray uppercase font-medium">Ориентировочная цена</p>
              <p class="text-2xl md:text-3xl font-bold text-black mt-1">
                от {{ formattedPrice }} ₸
              </p>
            </div>
            <div>
              <p class="text-xs color-gray uppercase font-medium">Время работы</p>
              <p class="text-lg md:text-xl font-semibold text-black mt-2">
                {{ currentModel.duration }}
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 items-center">
            <a
              :href="whatsappModelUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-black-primary"
            >
              <span>Записаться в WhatsApp</span>
              <span class="ml-2">→</span>
            </a>
            <a
              href="tel:+77772389939"
              class="btn btn-black-default"
            >
              <span>+7 (777) 238-99-39</span>
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="border border-[#e5e5e5] bg-black overflow-hidden aspect-[16/10]">
            <img
              :src="currentModel.image"
              :alt="currentModel.modelsLabel"
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      <!-- What Owner Gets -->
      <div class="border border-[#dedede] bg-white p-8 md:p-12 mb-14">
        <div class="mb-8">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Результат</span>
          <h2 class="title-sm text-black mt-2">
            Что вы получаете после русификации {{ currentModel.modelsLabel }}
          </h2>
        </div>

        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li
            v-for="item in currentModel.benefits"
            :key="item"
            class="flex items-start gap-3 p-4 border border-[#eeeeee] bg-[#fafafa] text-sm text-[#333333] font-normal leading-relaxed"
          >
            <span class="text-[#f50537] font-bold text-base shrink-0">✓</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- FAQ Section -->
      <div class="mb-14">
        <div class="mb-8">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Вопросы и ответы</span>
          <h2 class="title-sm text-black mt-2">
            Частые вопросы по {{ currentModel.modelsLabel }}
          </h2>
        </div>

        <div class="border-t border-[#e5e5e5]">
          <div
            v-for="(faq, idx) in currentModel.faqs"
            :key="idx"
            class="border-b border-[#e5e5e5]"
          >
            <button
              @click="toggleFaq(idx)"
              type="button"
              class="w-full py-5 flex items-center justify-between text-left text-base font-medium text-black hover:text-[#f50537] transition-colors"
            >
              <span class="pr-6">{{ faq.q }}</span>
              <span class="text-2xl font-light text-[#888888] shrink-0">
                {{ openFaq === idx ? '−' : '+' }}
              </span>
            </button>
            <div
              v-show="openFaq === idx"
              class="pb-5 text-sm text-[#555555] font-light leading-relaxed pr-6"
            >
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom WhatsApp CTA -->
      <div class="bg-[#050608] text-white p-8 md:p-12 mb-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Запись на русификацию</span>
          <h2 class="text-2xl font-bold text-white mt-2">
            Запишите {{ currentModel.modelsLabel }} в удобное время
          </h2>
          <p class="text-xs text-[#aaaaaa] font-light mt-2 max-w-xl">
            Принимаем автомобили в Алматы и Астане ежедневно с 09:00 до 21:00. Точную стоимость и свободное время подтвердим в WhatsApp.
          </p>
        </div>
        <div class="flex flex-wrap gap-4 shrink-0">
          <a
            :href="whatsappModelUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            <span>Записаться в WhatsApp</span>
            <span class="ml-2">→</span>
          </a>
        </div>
      </div>

      <!-- Other Popular Models -->
      <div class="border-t border-[#e5e5e5] pt-10">
        <p class="text-xs font-semibold tracking-widest text-[#777777] uppercase mb-4">
          Другие популярные модели в Казахстане
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="item in otherModels"
            :key="item.slug"
            :to="`/models/${item.slug}`"
            class="p-4 border border-[#e5e5e5] hover:border-black transition-colors flex items-center justify-between text-sm"
          >
            <span class="font-medium text-black">{{ item.modelsLabel }}</span>
            <span class="text-xs text-[#555555] shrink-0 ml-3">от {{ item.priceFrom.toLocaleString('ru-RU') }} ₸ →</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
