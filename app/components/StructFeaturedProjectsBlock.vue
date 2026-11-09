<script setup lang="ts">
interface Project {
  name: string
  location: string
  category: string
  image: string
  url?: string
}

interface Props {
  tagText?: string
  title?: string
  description?: string
  projects?: Project[]
  speed?: string // Animation duration, e.g. '30s'
}

const props = withDefaults(defineProps<Props>(), {
  tagText: 'PROJECTS',
  title: 'Our Featured Projects',
  description: 'Explore projects where thoughtful design meets reliable execution each one tailored to meet real-world demands.',
  speed: '30s',
  projects: () => [
    {
      name: 'Vertex Tech Park',
      location: 'Bangalore, India',
      category: 'COMMERCIAL / TECH',
      image: '/img/construction/hero-building.jpeg',
      url: '#vertex'
    },
    {
      name: 'Urban Nest Student Living',
      location: 'Pune, India',
      category: 'STUDENT HOUSING',
      image: '/img/construction/hero-modern.jpeg',
      url: '#urban'
    },
    {
      name: 'Grand Horizon Hotel & Suites',
      location: 'Goa, India',
      category: 'HOSPITALITY',
      image: '/img/construction/hero-aerial.jpeg',
      url: '#grand'
    }
  ]
})
</script>

<template>
  <section class="struct-projects">
    <!-- Header Block: Badge, Title on Left, Paragraph on Right -->
    <div class="struct-projects__header" data-aos="fade-up" data-aos-duration="800">
      <div class="struct-projects__header-left">
        <div v-if="tagText" class="struct-projects__badge-wrapper">
          <SectionBadge :text="tagText" default-style="pill" />
        </div>
        <h2 class="struct-projects__title">{{ title }}</h2>
      </div>
      <div class="struct-projects__header-right">
        <p class="struct-projects__description">{{ description }}</p>
      </div>
    </div>

    <!-- Marquee Carousel Slider -->
    <div class="struct-projects__marquee-container" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
      <div 
        class="struct-projects__marquee-track"
        :style="{ animationDuration: speed }"
      >
        <!-- Group 1 -->
        <div class="struct-projects__marquee-group">
          <NuxtLink 
            v-for="(project, idx) in projects" 
            :key="`g1-${idx}`"
            :to="project.url || '#'"
            class="struct-projects__card"
          >
            <!-- Card Image -->
            <img :src="project.image" :alt="project.name" class="struct-projects__card-img" />
            <!-- Card Overlay (bottom gradient) -->
            <div class="struct-projects__card-overlay" />
            
            <!-- Category Badge (Top Right) -->
            <div class="struct-projects__card-badge-wrapper">
              <span class="struct-projects__card-badge">{{ project.category }}</span>
            </div>

            <!-- Card Text (Bottom Left) -->
            <div class="struct-projects__card-content">
              <h3 class="struct-projects__card-title">{{ project.name }}</h3>
              <p class="struct-projects__card-location">{{ project.location }}</p>
            </div>
          </NuxtLink>
        </div>

        <!-- Group 2 (duplicated for seamless loop) -->
        <div class="struct-projects__marquee-group">
          <NuxtLink 
            v-for="(project, idx) in projects" 
            :key="`g2-${idx}`"
            :to="project.url || '#'"
            class="struct-projects__card"
          >
            <!-- Card Image -->
            <img :src="project.image" :alt="project.name" class="struct-projects__card-img" />
            <!-- Card Overlay (bottom gradient) -->
            <div class="struct-projects__card-overlay" />
            
            <!-- Category Badge (Top Right) -->
            <div class="struct-projects__card-badge-wrapper">
              <span class="struct-projects__card-badge">{{ project.category }}</span>
            </div>

            <!-- Card Text (Bottom Left) -->
            <div class="struct-projects__card-content">
              <h3 class="struct-projects__card-title">{{ project.name }}</h3>
              <p class="struct-projects__card-location">{{ project.location }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.struct-projects {
  width: 100%;
  background-color: #ffffff;
  padding: 100px 0 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}

/* Header Section styling */
.struct-projects__header {
  width: 100%;
  max-width: 1200px;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 60px;
  box-sizing: border-box;
}

.struct-projects__header-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.struct-projects__badge {
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

.struct-projects__badge-dot {
  color: rgba(22, 21, 18, 0.4);
}

.struct-projects__title {
  font-family: inherit;
  font-weight: 500;
  font-size: 38px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #161512;
  margin: 0;
}

.struct-projects__header-right {
  display: flex;
  align-items: flex-end;
  height: 100%;
}

.struct-projects__description {
  font-family: inherit;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(22, 21, 18, 0.65);
  margin: 0;
  max-width: 440px;
}

/* Marquee Carousel styling */
.struct-projects__marquee-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  padding: 0 40px;
  box-sizing: border-box;
  overflow: visible;
  display: flex;
  align-items: center;
  cursor: grab;
}
.struct-projects__marquee-container:active {
  cursor: grabbing;
}

.struct-projects__marquee-track {
  display: flex;
  width: max-content;
  animation: marquee linear infinite;
  overflow: visible;
}

.struct-projects__marquee-track:hover {
  animation-play-state: paused;
}

.struct-projects__marquee-group {
  display: flex;
  gap: 20px;
  padding-right: 20px;
}

/* Card Styling */
.struct-projects__card {
  position: relative;
  width: 440px;
  height: 330px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ededed;
  text-decoration: none;
  flex-shrink: 0;
  display: block;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.struct-projects__card:hover {
  transform: translateY(-4px);
}

.struct-projects__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.struct-projects__card:hover .struct-projects__card-img {
  transform: scale(1.03);
}

/* Bottom shadow/overlay for typography readability */
.struct-projects__card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(22, 21, 18, 0.75) 0%, rgba(22, 21, 18, 0.2) 40%, transparent 60%);
  z-index: 1;
}

/* Category Badge (Top Right) */
.struct-projects__card-badge-wrapper {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
}

.struct-projects__card-badge {
  font-family: inherit;
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: #161512;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 5px 12px;
  border-radius: 999px;
  text-transform: uppercase;
}

/* Card Content (Bottom Left) */
.struct-projects__card-content {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.struct-projects__card-title {
  font-family: inherit;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.3;
  color: #ffffff;
  margin: 0;
}

.struct-projects__card-location {
  font-family: inherit;
  font-weight: 400;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Keyframes */
@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

/* Responsive design */
@media (max-width: 1199px) and (min-width: 810px) {
  .struct-projects {
    padding: 80px 0 100px 0;
  }
  .struct-projects__header,
  .struct-projects__marquee-container {
    padding: 0 30px;
  }
  .struct-projects__header {
    gap: 24px;
  }
  .struct-projects__title {
    font-size: 32px;
  }
  .struct-projects__card {
    width: 380px;
    height: 285px;
  }
}

@media (max-width: 809px) {
  .struct-projects {
    padding: 60px 0 80px 0;
  }
  .struct-projects__header,
  .struct-projects__marquee-container {
    padding: 0 24px;
  }
  .struct-projects__header {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 40px;
  }
  .struct-projects__title {
    font-size: 26px;
  }
  .struct-projects__description {
    font-size: 14px;
  }
  .struct-projects__card {
    width: 300px;
    height: 225px;
    border-radius: 8px;
  }
  .struct-projects__card-badge {
    font-size: 8px;
    padding: 4px 10px;
  }
  .struct-projects__card-title {
    font-size: 16px;
  }
}
</style>
