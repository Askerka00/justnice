<script setup>
// Определяем имя клиента на основе хоста (поддомена Vercel) или query-параметра
const clientId = useClientName()

// SSR: Загружаем конфиг через серверный API для мета-тегов (работает и на сервере, и на клиенте)
const { data: config, error, pending } = await useFetch(() => `/api/config/${clientId}`)

const siteConfig = useSiteConfig()
if (config.value) {
  siteConfig.value = config.value
}
watch(config, (newVal) => {
  if (newVal) {
    siteConfig.value = newVal
  }
}, { immediate: true })

// Загружаем резолвер изображений из медиатеки
const { resolveProps: resolveImageProps, loadLibrary } = useImageResolver()

// Загружаем library.json на клиенте
onMounted(async () => {
  await loadLibrary()
})

const requestUrl = useRequestURL()

// Функция конвертации HEX в формат RGB для Tailwind
function hexToRgb(hex) {
  if (!hex) return null
  const cleanHex = hex.replace('#', '')
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16)
    const g = parseInt(cleanHex[1] + cleanHex[1], 16)
    const b = parseInt(cleanHex[2] + cleanHex[2], 16)
    return `${r} ${g} ${b}`
  } else if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)
    return `${r} ${g} ${b}`
  }
  return null
}

const themeClass = computed(() => {
  if (config.value && config.value.themeColor) {
    return ''
  }
  return `theme-${config.value?.theme || 'emerald'}`
})

const themeStyles = computed(() => {
  if (config.value && config.value.themeColor) {
    const rgb = hexToRgb(config.value.themeColor)
    if (rgb) {
      return {
        '--color-primary': rgb
      }
    }
  }
  return {}
})

// Автоматическая и реактивная установка SEO мета-тегов
useSeoMeta({
  title: () => config.value?.meta?.title || 'Сайт компании',
  description: () => config.value?.meta?.description || '',
  ogTitle: () => config.value?.meta?.title || 'Сайт компании',
  ogDescription: () => config.value?.meta?.description || '',
  ogImage: () => {
    let img = config.value?.meta?.image || ''
    if (img && img.startsWith('/')) {
      return `${requestUrl.origin}${img}`
    }
    return img
  },
  ogType: 'website',
  ogUrl: () => requestUrl.href,
  twitterCard: 'summary_large_image',
  twitterTitle: () => config.value?.meta?.title || 'Сайт компании',
  twitterDescription: () => config.value?.meta?.description || '',
  twitterImage: () => {
    let img = config.value?.meta?.image || ''
    if (img && img.startsWith('/')) {
      return `${requestUrl.origin}${img}`
    }
    return img
  }
})

const resolveComponentDynamic = (block) => {
  if (typeof block === 'string') {
    const contentBlock = config.value.content?.[block.toLowerCase()]
    if (contentBlock && contentBlock.component) {
      return resolveComponent(contentBlock.component)
    }
    return resolveComponent(block)
  }
  return resolveComponent(block.component)
}

/**
 * Резолвит пропсы блока: заменяет алиасы @category/alias на реальные пути.
 */
const getResolvedProps = (block) => {
  let rawProps = {}
  let animation = null
  if (typeof block === 'string') {
    const contentBlock = config.value.content?.[block.toLowerCase()]
    if (contentBlock) {
      rawProps = contentBlock.props || contentBlock
      animation = contentBlock.animation || null
    }
  } else {
    rawProps = block.props
    animation = block.animation || null
  }
  const resolved = { ...(rawProps || {}) }
  if (animation) {
    resolved.animation = animation
  }
  return resolveImageProps(resolved)
}
</script>

<template>
  <div v-if="error" class="min-h-screen bg-white text-[#171717] flex items-center justify-center">
    <h1 class="text-3xl">Ошибка 404: Клиент не найден</h1>
  </div>

  <div v-else-if="pending || !config" class="min-h-screen bg-white flex items-center justify-center">
    <div class="flex flex-col items-center space-y-4">
      <div class="w-12 h-12 border-4 border-t-primary border-zinc-100 rounded-full animate-spin"></div>
      <p class="text-zinc-500 font-medium text-sm">Загрузка сайта...</p>
    </div>
  </div>

  <div v-else-if="config" :class="['min-h-screen bg-white overflow-x-hidden', themeClass, `font-${config.font || 'sans'}`]" :style="themeStyles">
    <div
      v-for="(block, index) in config.structure"
      :key="index"
      :data-aos="typeof block === 'string' ? config.content[block.toLowerCase()]?.animation : (block.animation || null)"
      :data-aos-duration="typeof block === 'string' ? config.content[block.toLowerCase()]?.animationDuration : (block.animationDuration || null)"
      :data-aos-delay="typeof block === 'string' ? config.content[block.toLowerCase()]?.animationDelay : (block.animationDelay || null)"
      :data-aos-offset="typeof block === 'string' ? config.content[block.toLowerCase()]?.animationOffset : (block.animationOffset || null)"
    >
      <component 
        :is="resolveComponentDynamic(block)" 
        v-bind="getResolvedProps(block)"
      />
    </div>
  </div>
</template>
