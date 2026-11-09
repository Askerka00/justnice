/**
 * useImageResolver — резолвер алиасов изображений из медиатеки.
 * 
 * Алиас формата "@category/alias" автоматически заменяется на реальный путь к файлу
 * из public/img/library.json, который импортирован статически.
 * 
 * Пример: "@auto/hero-repair-shop" → "/img/auto/hero-repair-shop.jpeg"
 */

import { computed } from 'vue'
import libraryRaw from '../../public/img/library.json'

interface LibraryImage {
  alias: string
  file: string
  type: string
  tags: string
  description: string
}

interface LibraryCategory {
  id: string
  name: string
  description: string
  tags: string
  images: LibraryImage[]
}

interface Library {
  version: number
  updated: string
  categories: LibraryCategory[]
}

const libraryData = libraryRaw as unknown as Library

/**
 * Ищет файл по алиасу "@category/alias" в загруженной библиотеке.
 */
function resolveAlias(library: Library, alias: string): string {
  const clean = alias.replace(/^@/, '')
  const slashIndex = clean.indexOf('/')
  if (slashIndex === -1) return alias

  const categoryId = clean.substring(0, slashIndex)
  const imageAlias = clean.substring(slashIndex + 1)

  const category = library.categories.find(c => c.id === categoryId)
  if (!category) {
    console.warn(`[ImageResolver] Категория "${categoryId}" не найдена в library.json`)
    return alias
  }

  const image = category.images.find(img => img.alias === imageAlias)
  if (!image) {
    console.warn(`[ImageResolver] Алиас "${imageAlias}" не найден в категории "${categoryId}"`)
    return alias
  }

  return image.file
}

/**
 * Рекурсивно обходит объект и заменяет все строки вида "@category/alias"
 * на реальные пути из library.json.
 */
function resolveDeep(obj: any, library: Library): any {
  if (typeof obj === 'string') {
    if (obj.startsWith('@')) {
      return resolveAlias(library, obj)
    }
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => resolveDeep(item, library))
  }

  if (obj && typeof obj === 'object') {
    const resolved: Record<string, any> = {}
    for (const key of Object.keys(obj)) {
      resolved[key] = resolveDeep(obj[key], library)
    }
    return resolved
  }

  return obj
}

/**
 * Основной composable.
 * 
 * Импортирует library.json статически, что решает проблему с SSR-загрузкой на Vercel
 * и устраняет расхождения гидратации (hydration mismatch).
 */
export const useImageResolver = () => {
  const isReady = computed(() => true)

  /**
   * Резолвит все алиасы @category/alias в объекте пропсов.
   */
  const resolveProps = (props: Record<string, any>): Record<string, any> => {
    return resolveDeep(props, libraryData)
  }

  /**
   * Резолвит одну строку алиаса.
   * "@auto/hero-repair-shop" → "/img/auto/hero-repair-shop.jpeg"
   */
  const resolveImage = (alias: string): string => {
    if (!alias.startsWith('@')) return alias
    return resolveAlias(libraryData, alias)
  }

  const loadLibrary = async () => {
    // Больше не требуется выполнять HTTP-запросы в runtime, так как данные загружены статически
  }

  return {
    isReady,
    resolveProps,
    resolveImage,
    loadLibrary,
    library: computed(() => libraryData)
  }
}
