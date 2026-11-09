<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string
  animation?: string
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'none',
  tag: 'span'
})

// Разбираем текст на строки, слова и буквы
const parsedLines = computed(() => {
  if (!props.text) return []
  // Разбиваем по тегу <br/>
  const lines = props.text.split(/<br\s*\/?>/i)
  return lines.map(line => {
    const words = line.trim().split(/\s+/)
    return words.map((word, wordIdx) => {
      return {
        chars: word.split(''),
        isLastWord: wordIdx === words.length - 1
      }
    })
  })
})

const getCharGlobalIndex = (lineIdx: number, wordIdx: number, charIdx: number) => {
  let index = 0
  const lines = parsedLines.value
  for (let l = 0; l < lines.length; l++) {
    if (l < lineIdx) {
      for (const w of lines[l]) {
        index += w.chars.length
      }
    } else if (l === lineIdx) {
      for (let w = 0; w < lines[l].length; w++) {
        if (w < wordIdx) {
          index += lines[l][w].chars.length
        } else if (w === wordIdx) {
          index += charIdx
          break
        }
      }
      break
    }
  }
  return index
}
</script>

<template>
  <!-- Если анимация посимвольная с размытием (blur-reveal) -->
  <component 
    :is="tag" 
    v-if="animation === 'blur-reveal'" 
    class="text-reveal-container"
  >
    <span v-for="(line, lineIdx) in parsedLines" :key="lineIdx" class="text-reveal-line">
      <span v-for="(word, wordIdx) in line" :key="wordIdx" class="text-reveal-word">
        <span 
          v-for="(char, charIdx) in word.chars" 
          :key="charIdx" 
          class="text-reveal-char text-reveal-char--blur"
          :style="{ animationDelay: `${(getCharGlobalIndex(lineIdx, wordIdx, charIdx) * 25) + 120}ms` }"
        >
          {{ char }}
        </span>
      </span>
    </span>
  </component>

  <!-- Если анимация посимвольная без размытия (fade-up-chars) -->
  <component 
    :is="tag" 
    v-else-if="animation === 'fade-up-chars'" 
    class="text-reveal-container"
  >
    <span v-for="(line, lineIdx) in parsedLines" :key="lineIdx" class="text-reveal-line">
      <span v-for="(word, wordIdx) in line" :key="wordIdx" class="text-reveal-word">
        <span 
          v-for="(char, charIdx) in word.chars" 
          :key="charIdx" 
          class="text-reveal-char text-reveal-char--fade-up"
          :style="{ animationDelay: `${(getCharGlobalIndex(lineIdx, wordIdx, charIdx) * 25) + 120}ms` }"
        >
          {{ char }}
        </span>
      </span>
    </span>
  </component>

  <!-- Если анимация всего блока (fade-up или fade-in) -->
  <component 
    :is="tag" 
    v-else-if="animation === 'fade-up' || animation === 'fade-in'" 
    class="text-reveal-container text-reveal-static--fade-up"
    v-html="text"
  />

  <!-- Без анимации (статично) -->
  <component 
    :is="tag" 
    v-else 
    class="text-reveal-container"
    v-html="text"
  />
</template>

<style scoped>
.text-reveal-container {
  display: block;
}

.text-reveal-line {
  display: block;
  white-space: normal;
}

.text-reveal-word {
  display: inline-block;
  white-space: nowrap;
  vertical-align: bottom;
  margin-right: 0.25em;
}

.text-reveal-char {
  display: inline-block;
  vertical-align: bottom;
  opacity: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform, opacity;
}

.text-reveal-char--blur {
  transform: translateY(0.5em) translateZ(0);
  filter: blur(12px);
  -webkit-filter: blur(12px);
  animation: text-blur-reveal-anim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.text-reveal-char--fade-up {
  transform: translateY(0.5em) translateZ(0);
  animation: text-fade-up-char-anim 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.text-reveal-static--fade-up {
  opacity: 0;
  transform: translateY(20px) translateZ(0);
  animation: text-fade-up-static-anim 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 120ms;
}

@keyframes text-blur-reveal-anim {
  0% {
    opacity: 0;
    filter: blur(12px);
    -webkit-filter: blur(12px);
    transform: translateY(0.5em) translateZ(0);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    -webkit-filter: blur(0);
    transform: translateY(0) translateZ(0);
  }
}

@keyframes text-fade-up-char-anim {
  0% {
    opacity: 0;
    transform: translateY(0.5em) translateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
}

@keyframes text-fade-up-static-anim {
  0% {
    opacity: 0;
    transform: translateY(20px) translateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
}
</style>
