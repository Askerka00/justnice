<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  tagText?: string
  textDark?: string
  textLight?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  textDark: '',
  textLight: '',
  title: '',
  description: '',
  ctaLabel: 'Узнать подробнее',
  ctaUrl: '#services'
})

const resolvedDark = computed(() => {
  if (props.textDark) return props.textDark.endsWith(' ') ? props.textDark : props.textDark + ' '
  if (props.title) return props.title.endsWith(' ') ? props.title : props.title + ' — '
  return 'Мы предоставляем профессиональные промышленные решения, основанные на точности, надежности и строгом соблюдении ГОСТ и СНиП. '
})

const resolvedLight = computed(() => {
  if (props.textLight) return props.textLight
  if (props.description) return props.description
  return 'Собственная производственная база, сертифицированные материалы и команда квалифицированных инженеров позволяют нам гарантировать долговечный результат.'
})
</script>

<template>
  <section class="struct-intro">
    <div class="struct-intro__container">
      <!-- Tag / Badge -->
      <div v-if="tagText && tagText.trim() !== ''" class="struct-intro__badge-wrapper" data-aos="fade-up" data-aos-duration="800">
        <SectionBadge :text="tagText" default-style="pill" />
      </div>

      <!-- Main Text (Split dark/light) -->
      <h2 
        class="struct-intro__text" 
        data-aos="fade-up" 
        data-aos-duration="1000" 
        data-aos-delay="100"
      >
        <span class="struct-intro__text--dark">{{ resolvedDark }}</span>
        <span class="struct-intro__text--light">{{ resolvedLight }}</span>
      </h2>

      <!-- CTA Button -->
      <div 
        v-if="ctaLabel" 
        class="struct-intro__cta-wrapper" 
        data-aos="fade-up" 
        data-aos-duration="800" 
        data-aos-delay="200"
      >
        <NuxtLink :to="ctaUrl" class="struct-intro__cta">
          {{ ctaLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.struct-intro {
  width: 100%;
  background-color: #ffffff;
  padding: 120px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.struct-intro__container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
}

/* Badge style: Pill shape, Overused Grotesk or monospace */
.struct-intro__badge-wrapper {
  margin-bottom: 8px;
}

.struct-intro__badge {
  font-family: inherit;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #161512;
  background-color: rgba(22, 21, 18, 0.05);
  padding: 6px 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.struct-intro__badge-dot {
  color: rgba(22, 21, 18, 0.4);
}

/* Large text layout */
.struct-intro__text {
  font-family: inherit;
  font-weight: 500;
  font-size: 38px;
  line-height: 1.35;
  letter-spacing: -0.02em;
  text-align: left;
  margin: 0;
  max-width: 1120px;
  text-wrap: pretty;
  font-feature-settings: "cv09" on, "cv11" on;
}

.struct-intro__text--dark {
  color: #161512;
}

.struct-intro__text--light {
  color: rgba(22, 21, 18, 0.45);
}

/* Learn Our Story CTA Button */
.struct-intro__cta {
  font-family: inherit;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #161512;
  text-decoration: none;
  background-color: rgba(22, 21, 18, 0.05);
  padding: 12px 24px;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  cursor: pointer;
}

.struct-intro__cta:hover {
  background-color: rgba(22, 21, 18, 0.10);
  transform: translateY(-1px);
}

.struct-intro__cta:active {
  transform: translateY(0);
}

/* Responsive design */
@media (max-width: 1199px) and (min-width: 810px) {
  .struct-intro {
    padding: 100px 30px;
  }
  .struct-intro__text {
    font-size: 32px;
    line-height: 1.35;
  }
}

@media (max-width: 809px) {
  .struct-intro {
    padding: 80px 24px;
  }
  .struct-intro__container {
    gap: 24px;
  }
  .struct-intro__text {
    font-size: 24px;
    line-height: 1.4;
  }
  .struct-intro__cta {
    padding: 12px 20px;
  }
}
</style>
