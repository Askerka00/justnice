<script setup lang="ts">
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
  links?: NavLink[]
  headerCta?: CtaButton
  headerButtonText?: string
  headerButtonUrl?: string
  tagText?: string
  title?: string
  description?: string
  subtitle?: string
  primaryCta?: CtaButton
  buttonText?: string
  buttonUrl?: string
  secondaryCta?: CtaButton
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  backgroundImage?: string
  heroImage?: string
  statNumber?: string
  statLabel?: string
  animation?: string
}

import { computed } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  hideNavbar: false,
  logoText: '',
  logoIcon: 'lucide:sparkles',
  navLinks: () => [
    { label: 'О нас', url: '#about' },
    { label: 'Услуги и цены', url: '#services' },
    { label: 'Преимущества', url: '#features' },
    { label: 'Контакты', url: '#contacts' }
  ],
  headerCta: () => ({
    label: 'Связаться',
    url: '#contacts'
  }),
  title: 'Премиальный сервис с гарантией качества',
  description: '',
  backgroundImage: '',
  heroImage: '',
  animation: 'blur-reveal'
})

const resolvedBgImage = computed(() => {
  return props.backgroundImage || props.heroImage || '/img/construction/hero-modern.jpeg'
})

const resolvedNavLinks = computed(() => {
  if (props.links && props.links.length > 0) return props.links
  return props.navLinks
})

const resolvedHeaderCta = computed(() => {
  if (props.headerButtonText) {
    return {
      label: props.headerButtonText,
      url: props.headerButtonUrl || '#contacts'
    }
  }
  return props.headerCta
})

const resolvedPrimaryCta = computed(() => {
  if (props.buttonText) {
    return {
      label: props.buttonText,
      url: props.buttonUrl || '#contacts',
      icon: 'lucide:arrow-up-right'
    }
  }
  if (props.primaryCta) return props.primaryCta
  return {
    label: 'Оставить заявку',
    url: '#contacts',
    icon: 'lucide:arrow-up-right'
  }
})

const resolvedSecondaryCta = computed(() => {
  if (props.secondaryButtonText) {
    return {
      label: props.secondaryButtonText,
      url: props.secondaryButtonUrl || '#services'
    }
  }
  if (props.secondaryCta) return props.secondaryCta
  return {
    label: 'Услуги и цены',
    url: '#services'
  }
})
</script>

<template>
  <section class="struct-hero">
    <!-- Z-0: Фоновое изображение -->
    <div class="struct-hero__bg">
      <NuxtImg 
        :src="resolvedBgImage" 
        alt="Background" 
        class="struct-hero__bg-img"
        format="webp"
        loading="eager"
        fetchpriority="high"
      />
    </div>

    <!-- Z-1: Оверлей rgba(0,0,0,0.40) — точно по CSS оригинала -->
    <div class="struct-hero__overlay" />

    <!-- Z-2: Blur-оверлей с маской (как в оригинале) -->
    <div class="struct-hero__blur-overlay" />

    <!-- Z-10: Навигация (только если передан logoText и не скрыт navbar) -->
    <header v-if="!hideNavbar && logoText" class="struct-hero__header">
      <div class="struct-hero__header-inner">
        <!-- Логотип -->
        <div class="struct-hero__logo-area">
          <NuxtLink to="#" class="struct-hero__logo-link">
            <div class="struct-hero__logo-icon flex items-center" :class="{ 'struct-hero__logo-icon--custom': logoImage }">
              <NuxtImg v-if="logoImage" :src="logoImage" alt="Logo" class="h-10 md:h-14 w-auto object-contain rounded-md" format="webp" />
              <template v-else>
                <Icon :name="logoIcon || 'lucide:sparkles'" class="w-8 h-8 text-white" />
              </template>
            </div>
            <span v-if="!hideLogoText" class="struct-hero__logo-text">{{ logoText }}</span>
          </NuxtLink>
        </div>

        <!-- Навигация + CTA -->
        <div class="struct-hero__nav-area">
          <nav class="struct-hero__nav hidden md:flex">
            <NuxtLink 
              v-for="(link, idx) in resolvedNavLinks" 
              :key="idx" 
              :to="link.url"
              class="struct-hero__nav-item"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <div class="hidden sm:block">
            <NuxtLink 
              :to="resolvedHeaderCta.url"
              class="struct-hero__header-cta"
            >
              {{ resolvedHeaderCta.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Z-1: Контент (нижняя часть, flex-end) -->
    <div class="struct-hero__content">
      <div class="struct-hero__content-inner">
        
        <!-- Бейдж / Рейтинг если передан -->
        <div v-if="tagText || statNumber" class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold tracking-wider uppercase">
          <span v-if="statNumber" class="text-amber-400 font-bold">★ {{ statNumber }}</span>
          <span v-if="statNumber && (statLabel || tagText)" class="opacity-40">•</span>
          <span>{{ statLabel || tagText }}</span>
        </div>

        <!-- Заголовок с анимацией через универсальный компонент -->
        <TextReveal 
          :text="title.replace(/<br\s*\/?>/gi, ' ')" 
          :animation="animation" 
          tag="h1" 
          class="struct-hero__title" 
        />

        <!-- Описание + кнопки CTA в одном блоке с gap 50px -->
        <div class="struct-hero__actions-group">
          <!-- Описание -->
          <p 
            v-if="description || subtitle"
            class="struct-hero__description"
            data-aos="fade-up"
            data-aos-delay="150"
            data-aos-duration="1000"
          >
            {{ description || subtitle }}
          </p>

          <!-- Кнопки действий (CTA) -->
          <div 
            class="struct-hero__cta-row"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
          >
            <!-- Основная кнопка -->
            <a 
              :href="resolvedPrimaryCta.url"
              target="_blank"
              class="struct-hero__cta-primary"
            >
              <span>{{ resolvedPrimaryCta.label }}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </a>

            <!-- Второстепенная кнопка -->
            <a 
              v-if="resolvedSecondaryCta"
              :href="resolvedSecondaryCta.url"
              class="struct-hero__cta-secondary"
            >
              {{ resolvedSecondaryCta.label }}
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ═══════════════════════════════════════
   StructHeroBlock — Pixel-perfect Construa
   Fonts: Overused Grotesk Medium, IBM Plex Mono
   Source: construa.framer.website CSS
   ═══════════════════════════════════════ */

.struct-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  background-color: #161512;
  font-family: 'Overused Grotesk Medium', 'Inter', sans-serif;
}

/* ── Background Image ── */
.struct-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.struct-hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Overlay: rgba(0,0,0,0.40) — exact from CSS ── */
.struct-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.40);
  overflow: clip;
}

/* ── Blur Overlay (exact from Framer CSS) ── */
.struct-hero__blur-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  background: linear-gradient(304deg, transparent 35%, rgba(0, 0, 0, 0.20) 84%);
  -webkit-mask: linear-gradient(174deg, transparent 27%, black 81% 90%);
  mask: linear-gradient(174deg, transparent 27%, black 81% 90%);
  overflow: hidden;
}

/* ── Header / Navigation ── */
.struct-hero__header {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  padding: 0;
}

.struct-hero__header-inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  align-items: center;
  gap: 0 12px;
  max-width: 1440px;
  padding: 0 40px;
  width: 100%;
}

.struct-hero__logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.struct-hero__logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  transition: opacity 0.2s;
}
.struct-hero__logo-link:hover {
  opacity: 0.9;
}

.struct-hero__logo-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}
.struct-hero__logo-icon--custom {
  width: auto !important;
  height: auto !important;
}
.struct-hero__logo-icon svg {
  width: 100%;
  height: 100%;
}

.struct-hero__logo-text {
  font-family: 'Overused Grotesk Medium', 'Inter', sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: white;
  white-space: nowrap;
}

/* ── Nav Area (right side) ── */
.struct-hero__nav-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}

.struct-hero__nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Nav Item Pills — padding 6px 12px, IBM Plex Mono */
.struct-hero__nav-item {
  font-family: inherit;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.10);
  transition: all 0.25s ease;
  white-space: nowrap;
  cursor: pointer;
}
.struct-hero__nav-item:hover {
  background: rgba(255, 255, 255, 0.20);
  color: white;
}

/* Header CTA Button (GET STARTED) — pill, dark bg */
.struct-hero__header-cta {
  font-family: inherit;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 999px;
  background: #161512;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.25s ease;
  white-space: nowrap;
  cursor: pointer;
}
.struct-hero__header-cta:hover {
  background: #2a2824;
  border-color: rgba(255, 255, 255, 0.25);
}

/* ── Content Area (bottom) ── */
.struct-hero__content {
  position: relative;
  z-index: 4;
  width: 100%;
  max-width: 1200px;
  padding: 10px 10px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
}

.struct-hero__content-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  max-width: 700px;
  width: 100%;
  text-align: center;
}

/* Title — Overused Grotesk Medium 500, 56px desktop */
.struct-hero__title {
  font-family: inherit;
  font-weight: 500;
  font-size: 56px;
  line-height: 60px;
  letter-spacing: -0.0225em;
  color: white;
  text-align: center;
  margin: 0;
  text-wrap: balance;
  font-feature-settings: "cv09" on, "cv11" on;
}



/* Description — Inter 400, ~16px */
.struct-hero__description {
  font-family: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.70);
  text-align: center;
  max-width: 540px;
  margin: 0;
}

/* Actions Group (description + buttons) */
.struct-hero__actions-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* CTA Row */
.struct-hero__cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

/* Primary CTA — pill, white bg */
.struct-hero__cta-primary {
  font-family: inherit;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #161512;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 999px;
  background: white;
  border: none;
  transition: all 0.25s ease;
  cursor: pointer;
  white-space: nowrap;
}
.struct-hero__cta-primary:hover {
  background: #ededed;
}
.struct-hero__cta-primary svg {
  transition: transform 0.2s ease;
}
.struct-hero__cta-primary:hover svg {
  transform: translate(2px, -2px);
}

/* Secondary CTA — pill, outline */
.struct-hero__cta-secondary {
  font-family: inherit;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.25s ease;
  cursor: pointer;
  white-space: nowrap;
}
.struct-hero__cta-secondary:hover {
  border-color: rgba(255, 255, 255, 0.40);
  background: rgba(255, 255, 255, 0.05);
}

/* ── Responsive: Tablet (810px — 1199px) ── */
@media (max-width: 1199px) and (min-width: 810px) {
  .struct-hero {
    min-height: 500px;
  }
  .struct-hero__header {
    top: 0;
  }
  .struct-hero__content {
    padding: 10px 30px 80px;
  }
  .struct-hero__content-inner {
    max-width: 600px;
  }
  .struct-hero__title {
    font-size: 40px;
    line-height: 44px;
  }
}

/* ── Responsive: Mobile (<810px) ── */
@media (max-width: 809px) {
  .struct-hero {
    min-height: 500px;
  }
  .struct-hero__header {
    top: 0;
  }
  .struct-hero__header-inner {
    padding: 12px 14px 12px 24px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .struct-hero__logo-area {
    justify-content: space-between;
    width: 100%;
  }
  .struct-hero__nav-area {
    flex-direction: column;
    gap: 16px;
  }
  .struct-hero__nav {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .struct-hero__content {
    padding: 64px 16px;
    gap: 60px;
  }
  .struct-hero__title {
    font-size: 32px;
    line-height: 36px;
  }
  .struct-hero__cta-row {
    flex-direction: column;
    width: 100%;
  }
  .struct-hero__cta-primary,
  .struct-hero__cta-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
