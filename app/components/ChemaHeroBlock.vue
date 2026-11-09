<script setup lang="ts">
import { computed } from 'vue'

interface NavLink {
  label: string
  url: string
}

interface CtaButton {
  label: string
  url: string
  icon?: string
}

interface Props {
  hideNavbar?: boolean
  logoText?: string
  logoIcon?: string
  logoImage?: string
  hideLogoText?: boolean
  navLinks?: NavLink[]
  headerCta?: CtaButton
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  primaryCta?: CtaButton
  backgroundImage?: string
  animation?: string
}

const props = withDefaults(defineProps<Props>(), {
  hideNavbar: false,
  logoText: '',
  logoIcon: 'lucide:layers',
  navLinks: () => [
    { label: 'О нас', url: '#about' },
    { label: 'Услуги', url: '#services' },
    { label: 'Преимущества', url: '#features' },
    { label: 'Контакты', url: '#contacts' }
  ],
  headerCta: () => ({
    label: 'Записаться',
    url: '#contacts'
  }),
  title: 'Премиальный уход<br/>и защита вашего авто',
  description: '',
  buttonText: '',
  buttonUrl: '',
  primaryCta: () => ({
    label: 'Смотреть услуги и цены',
    url: '#services'
  }),
  backgroundImage: '/img/demos/detailing-porsche.jpg',
  animation: 'blur-reveal'
})
</script>

<template>
  <section class="chema-hero">
    <!-- Фоновое изображение -->
    <div class="chema-hero__bg">
      <NuxtImg 
        :src="backgroundImage || '/img/construction/chema-hero-bg.png'" 
        alt="Chema Background" 
        class="chema-hero__bg-img"
        format="webp"
        loading="eager"
        fetchpriority="high"
      />
    </div>

    <!-- Затемняющий оверлей для читаемости текста -->
    <div class="chema-hero__overlay" />

    <!-- Навигационная шапка -->
    <header v-if="!hideNavbar && logoText" class="chema-hero__header">
      <div class="chema-hero__header-inner">
        <!-- Логотип -->
        <NuxtLink to="/" class="chema-hero__logo">
          <div class="chema-hero__logo-icon" :class="{ 'chema-hero__logo-icon--custom': logoImage }">
            <NuxtImg v-if="logoImage" :src="logoImage" alt="Logo" class="h-8 w-auto object-contain rounded-md" format="webp" />
            <template v-else>
              <svg v-if="logoIcon === 'lucide:layers'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <Icon v-else-if="logoIcon !== 'none'" :name="logoIcon" class="w-6 h-6 text-white" />
            </template>
          </div>
          <span v-if="!hideLogoText" class="chema-hero__logo-text">{{ logoText }}</span>
        </NuxtLink>

        <!-- Навигационные ссылки и кнопка -->
        <div class="chema-hero__nav-wrapper">
          <nav class="chema-hero__nav hidden md:flex">
            <NuxtLink 
              v-for="(link, idx) in navLinks" 
              :key="idx" 
              :to="link.url"
              class="chema-hero__nav-item"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <!-- Кнопка шапки -->
          <NuxtLink 
            v-if="headerCta"
            :to="headerCta.url"
            class="chema-hero__header-cta"
          >
            {{ headerCta.label }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Основной контент (выровнен по левому краю внизу) -->
    <div class="chema-hero__content">
      <div class="chema-hero__content-inner">
        <!-- Заголовок с анимацией -->
        <TextReveal 
          :text="title" 
          :animation="animation" 
          tag="h1" 
          class="chema-hero__title" 
        />

        <!-- Подзаголовок / Описание -->
        <p 
          v-if="description || subtitle" 
          class="chema-hero__description"
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="1000"
        >
          {{ description || subtitle }}
        </p>

        <!-- Главная кнопка действия -->
        <div 
          v-if="buttonText || primaryCta" 
          class="chema-hero__cta-wrapper"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <NuxtLink 
            :to="buttonUrl || primaryCta?.url || '#services'"
            class="chema-hero__cta"
          >
            {{ buttonText || primaryCta?.label || 'Смотреть услуги' }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chema-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background-color: #0b0f19;
  font-family: 'Outfit', 'Inter', sans-serif;
  color: white;
}

/* Background Image */
.chema-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.chema-hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Затемняющий оверлей — градиент от темного к прозрачному для контраста белого текста */
.chema-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(11, 15, 25, 0.45) 0%,
    rgba(11, 15, 25, 0.3) 40%,
    rgba(11, 15, 25, 0.85) 100%
  );
}

/* Header & Navigation */
.chema-hero__header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
}

.chema-hero__header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 40px;
  width: 100%;
}

.chema-hero__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  transition: opacity 0.2s ease;
}

.chema-hero__logo:hover {
  opacity: 0.9;
}

.chema-hero__logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chema-hero__logo-icon--custom {
  width: auto;
  height: auto;
}

.chema-hero__logo-text {
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.chema-hero__nav-wrapper {
  display: flex;
  align-items: center;
  gap: 32px;
}

.chema-hero__nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.chema-hero__nav-item {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.chema-hero__nav-item:hover {
  color: white;
}

/* Header CTA Button (Use for free) — pill-shape */
.chema-hero__header-cta {
  background-color: white;
  color: #0b0f19;
  font-weight: 500;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 999px;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
  white-space: nowrap;
}

.chema-hero__header-cta:hover {
  background-color: #ededed;
}

/* Main Content Area */
.chema-hero__content {
  position: relative;
  z-index: 4;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 100px;
}

.chema-hero__content-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Выравнивание всего контента влево */
  max-width: 800px;
  width: 100%;
}

/* Title — Geist-like modern large title */
.chema-hero__title :deep(.text-reveal-container) {
  text-align: left;
}

.chema-hero__title {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 64px;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: white;
  margin: 0;
}

/* Description */
.chema-hero__description {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  max-width: 540px;
  margin: 24px 0 0;
  text-align: left;
}

/* Primary Action CTA Button */
.chema-hero__cta-wrapper {
  margin-top: 40px;
}

.chema-hero__cta {
  background-color: white;
  color: #0b0f19;
  font-weight: 500;
  font-size: 14px;
  padding: 14px 28px;
  border-radius: 999px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
  white-space: nowrap;
}

.chema-hero__cta:hover {
  background-color: #ededed;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .chema-hero__title {
    font-size: 52px;
  }
}

@media (max-width: 809px) {
  .chema-hero__header-inner {
    padding: 16px 20px;
  }
  
  .chema-hero__content {
    padding: 0 20px 60px;
  }
  
  .chema-hero__title {
    font-size: 40px;
    line-height: 1.15;
  }

  .chema-hero__description {
    font-size: 16px;
  }

  .chema-hero__cta-wrapper {
    margin-top: 32px;
    width: 100%;
  }

  .chema-hero__cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
