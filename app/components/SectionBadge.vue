<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string
  styleType?: 'pill' | 'sharp' | 'dot' | 'wavy'
  defaultStyle?: 'pill' | 'sharp' | 'dot' | 'wavy'
  textColor?: string
  borderColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultStyle: 'pill'
})

const siteConfig = useSiteConfig()

const computedStyleType = computed(() => {
  if (props.styleType) return props.styleType
  if (siteConfig.value?.badgeStyle) return siteConfig.value.badgeStyle
  return props.defaultStyle
})

// Хелпер для получения динамических стилей
const badgeStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.textColor) {
    styles.color = props.textColor
  }
  
  if (props.borderColor) {
    styles.borderColor = props.borderColor
  } else if (props.textColor && computedStyleType.value !== 'dot' && computedStyleType.value !== 'wavy') {
    // Если передан textColor, но не передан borderColor, используем textColor для границы (кроме dot/wavy)
    styles.borderColor = props.textColor
  }

  // Для pill стиля с фоном
  if (computedStyleType.value === 'pill') {
    if (props.textColor) {
      // Если textColor содержит конкретное значение (например, #fff), то сделаем белый полупрозрачный фон
      if (props.textColor.includes('#fff') || props.textColor.includes('white') || props.textColor === 'rgb(255, 255, 255)') {
        styles.backgroundColor = 'rgba(255, 255, 255, 0.08)'
        styles.borderColor = 'rgba(255, 255, 255, 0.15)'
      } else if (props.textColor.includes('#111') || props.textColor.includes('black') || props.textColor === 'rgb(0, 0, 0)') {
        styles.backgroundColor = 'rgba(0, 0, 0, 0.05)'
        styles.borderColor = 'rgba(0, 0, 0, 0.1)'
      } else {
        // Мягкий фон на основе текущего цвета
        styles.backgroundColor = 'currentColor'
        styles.borderColor = 'transparent'
      }
    }
  }

  return styles
})
</script>

<template>
  <div v-if="text && text.trim() !== ''" class="inline-flex items-center">
    
    <!-- СТИЛЬ 1: PILL (Округлый с мягким фоном) -->
    <div 
      v-if="computedStyleType === 'pill'"
      class="inline-flex items-center space-x-2 bg-primary/[0.06] border border-primary/10 rounded-full px-4 py-1.5 transition-all duration-200"
      :style="badgeStyles"
      :class="props.textColor && !props.textColor.includes('#') && !props.textColor.includes('rgb') ? '' : ''"
    >
      <span 
        class="text-xs font-semibold tracking-wider text-primary uppercase transition-all duration-200" 
        :class="props.textColor ? '' : 'text-primary'"
        :style="props.textColor && !badgeStyles.backgroundColor?.includes('currentColor') ? { color: props.textColor } : (badgeStyles.backgroundColor === 'currentColor' ? { color: '#fff', opacity: 0.9 } : {})"
      >
        {{ text }}
      </span>
    </div>

    <!-- СТИЛЬ 2: SHARP (Строгий прямоугольный с рамкой) -->
    <div 
      v-else-if="computedStyleType === 'sharp'"
      class="inline-block border border-primary px-4 py-1.5 rounded-none text-xs font-bold tracking-[0.15em] uppercase text-primary transition-all duration-200"
      :style="badgeStyles"
    >
      {{ text }}
    </div>

    <!-- СТИЛЬ 3: DOT (Минималистичный с точкой) -->
    <div 
      v-else-if="computedStyleType === 'dot'"
      class="inline-flex items-center space-x-2 text-primary transition-all duration-200"
      :style="badgeStyles"
    >
      <span 
        class="w-1.5 h-1.5 bg-primary rounded-full transition-all duration-200"
        :style="props.textColor ? { backgroundColor: props.textColor } : {}"
      ></span>
      <span class="text-xs font-bold uppercase tracking-wider transition-all duration-200" :style="props.textColor ? { color: props.textColor } : {}">
        {{ text }}
      </span>
    </div>

    <!-- СТИЛЬ 4: WAVY (С волнистой линией снизу) -->
    <div 
      v-else-if="computedStyleType === 'wavy'"
      class="inline-flex flex-col items-start transition-all duration-200"
    >
      <span 
        class="text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-1 text-primary transition-all duration-200"
        :style="props.textColor ? { color: props.textColor } : {}"
      >
        {{ text }}
      </span>
      <svg 
        class="w-14 h-1.5 text-primary transition-all duration-200" 
        viewBox="0 0 56 6" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        :style="props.textColor ? { color: props.textColor } : {}"
      >
        <path 
          d="M1 3C5 1.5 9 1.5 13 3C17 4.5 21 4.5 25 3C29 1.5 33 1.5 37 3C41 4.5 45 4.5 49 3C51.5 2 54 2 55 3" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round"
        />
      </svg>
    </div>

  </div>
</template>

<style scoped>
/* Если background-color равен currentColor, сделаем элемент полупрозрачной кнопкой */
div[style*="background-color: currentColor"] {
  background-color: color-mix(in srgb, currentColor 8%, transparent) !important;
}
</style>
