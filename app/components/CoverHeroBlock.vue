<template>
  <section class="relative min-h-screen w-full overflow-hidden bg-gray-900 font-sans text-white flex flex-col justify-between">
    <!-- Фоновое изображение с затемняющим оверлеем -->
    <div class="absolute inset-0 z-0 select-none pointer-events-none">
      <NuxtImg 
        :src="backgroundImage || '/img/construction/hero-modern.jpeg'" 
        alt="Background" 
        class="h-full w-full object-cover object-center"
        format="webp"
        loading="eager"
        fetchpriority="high"
      />
      <!-- Подсветка и затемнение -->
      <div class="absolute inset-0 bg-black/60 backdrop-brightness-95 md:bg-black/55"></div>
    </div>

    <!-- Контентный контейнер (Шапка + Герой) -->
    <div class="relative z-10 flex min-h-screen flex-col px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full justify-between">
      
      <!-- 1. Навигационная панель (Glassmorphism Navbar) -->
      <header v-if="!hideNavbar && logoText" class="mt-6 w-full relative">
        <div class="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between glass-header">
          <!-- Логотип -->
          <a href="#" class="flex items-center space-x-2.5 group">
            <template v-if="logoImage">
              <NuxtImg :src="logoImage" :alt="logoText || 'Logo'" :class="[logoClass || '', 'h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105']" format="webp" />
            </template>
            <template v-else>
              <span v-if="logoIcon && !logoIcon.includes(':')" class="text-xl shrink-0 select-none">{{ logoIcon }}</span>
              <Icon v-else-if="logoIcon" :name="logoIcon" class="w-6 h-6 text-primary shrink-0" />
              <Icon v-else name="lucide:leaf" class="w-6 h-6 text-primary shrink-0" />
            </template>
            <span v-if="!hideLogoText" class="font-bold text-xl tracking-tight text-white transition-colors group-hover:text-primary">{{ logoText || 'Gardener' }}</span>
          </a>
          
          <!-- Навигация -->
          <nav class="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-200">
            <a 
              v-for="link in links" 
              :key="link.label" 
              :href="link.url" 
              class="hover:text-white transition-colors duration-200"
            >
              {{ link.label }}
            </a>
          </nav>

          <!-- Кнопка действия -->
          <div class="hidden md:block">
            <a 
              v-if="headerButtonText"
              :href="headerButtonUrlFormatted"
              class="bg-primary hover:bg-primary/95 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-primary/20 block text-center"
            >
              {{ headerButtonText }}
            </a>
          </div>

          <!-- Гамбургер меню для мобильных -->
          <div class="flex md:hidden items-center">
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-gray-200 hover:text-white p-1.5 focus:outline-none transition-colors">
              <Icon v-if="!isMobileMenuOpen" name="lucide:menu" class="w-6 h-6" />
              <Icon v-else name="lucide:x" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Выпадающее меню для мобильных (Glassmorphism) -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 translate-y-[-10px]"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-[-10px]"
        >
          <div v-if="isMobileMenuOpen" class="absolute top-full left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col space-y-4 shadow-xl z-50 glass-header md:hidden">
            <a 
              v-for="link in links" 
              :key="link.label" 
              :href="link.url" 
              @click="isMobileMenuOpen = false"
              class="text-sm font-medium text-gray-200 hover:text-white py-1 transition-colors"
            >
              {{ link.label }}
            </a>
            <a 
              v-if="headerButtonText"
              :href="headerButtonUrlFormatted"
              @click="isMobileMenuOpen = false"
              class="bg-primary hover:bg-primary/95 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary/20 block text-center"
            >
              {{ headerButtonText }}
            </a>
          </div>
        </transition>
      </header>

      <!-- 2. Главная секция (Двухколоночный Grid) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto pt-12 pb-16 items-center w-full">
        
        <!-- Левая колонка: УТП и Рейтинг -->
        <div class="lg:col-span-7 flex flex-col justify-center space-y-6" data-aos="fade-right">
          <h1 
            class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
            v-html="title || 'Your Outdoor<br/>Space, Rebuilt'"
          ></h1>
          <p class="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
            {{ subtitle || 'With our expert team of gardeners and landscapers, we turn ordinary gardens into extraordinary havens of beauty.' }}
          </p>
          
          <!-- Социальное доказательство (Звезды и рейтинг) -->
          <div v-if="ratingText" class="flex items-center space-x-3 pt-4">
            <div class="flex -space-x-2 overflow-hidden shrink-0">
              <div class="w-8 h-8 rounded-full ring-2 ring-gray-900 bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 flex items-center justify-center text-xs font-bold">★</div>
              <div class="w-8 h-8 rounded-full ring-2 ring-gray-900 bg-blue-500/30 text-blue-300 border border-blue-400/40 flex items-center justify-center text-xs font-bold">5.0</div>
              <div class="w-8 h-8 rounded-full ring-2 ring-gray-900 bg-amber-500/30 text-amber-300 border border-amber-400/40 flex items-center justify-center text-xs font-bold">2G</div>
            </div>
            <div class="flex flex-col">
              <div class="flex text-amber-400 text-sm shrink-0">
                <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-4 h-4 shrink-0 text-amber-400" />
              </div>
              <span class="text-xs sm:text-sm text-gray-300 font-medium mt-0.5">{{ ratingText || '5.0 в 2ГИС' }}</span>
            </div>
          </div>
        </div>

        <!-- Правая колонка: Лид-форма в виде карточки -->
        <div v-if="showForm" class="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto" data-aos="fade-left" data-aos-delay="200">
          <div class="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl border-t-4 border-primary overflow-hidden-safari">
            <h3 class="text-xl font-bold text-gray-900 mb-6 text-center lg:text-left">
              {{ formTitle || 'Book Your Free Appointment' }}
            </h3>
            
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Имя -->
              <div>
                <input 
                  type="text" 
                  v-model="formData.name"
                  placeholder="Ваше имя" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all bg-gray-50/50"
                  required
                />
              </div>
              
              <!-- Email -->
              <div v-if="showEmailField">
                <input 
                  type="email" 
                  v-model="formData.email"
                  placeholder="E-mail адрес" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all bg-gray-50/50"
                  :required="isEmailFieldRequired"
                />
              </div>
              
              <!-- Телефон -->
              <div>
                <input 
                  type="tel" 
                  v-model="formData.phone"
                  placeholder="Номер телефона" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all bg-gray-50/50"
                  required
                />
              </div>

              <!-- Выбор локации / услуги (динамически по опциям) -->
              <div v-if="showSelectField && formSelectOptions && formSelectOptions.length" class="relative">
                <select 
                  v-model="formData.location"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all bg-gray-50/50 appearance-none text-gray-700 font-medium"
                  required
                >
                  <option value="" disabled selected>{{ formSelectPlaceholder || 'Select Your Location...' }}</option>
                  <option v-for="option in formSelectOptions" :key="option" :value="option">{{ option }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <Icon name="lucide:chevron-down" class="w-4 h-4 text-gray-400 shrink-0" />
                </div>
              </div>

              <!-- Кнопка отправки формы -->
              <button 
                type="submit" 
                class="w-full bg-primary hover:bg-primary/95 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary/10 mt-2"
              >
                {{ formButtonText || 'Book Your Call' }}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  hideNavbar: { type: Boolean, default: false },
  logoText: { type: String, default: '' },
  logoImage: { type: String, default: '' },
  logoIcon: { type: String, default: 'lucide:shield-check' },
  logoClass: { type: String, default: '' },
  hideLogoText: { type: Boolean, default: false },
  headerButtonText: { type: String, default: 'Записаться' },
  headerButtonUrl: { type: String, default: '' },
  whatsappPhone: { type: String, default: '77016404818' },
  links: {
    type: Array,
    default: () => [
      { label: 'О нас', url: '#about' },
      { label: 'Услуги', url: '#services' },
      { label: 'Преимущества', url: '#features' },
      { label: 'Контакты', url: '#contacts' }
    ]
  },
  title: { type: String, default: 'Премиальный сервис<br/>для вашего комфорта' },
  subtitle: { type: String, default: 'Гарантируем безупречное качество, соблюдение сроков и индивидуальный подход к каждому клиенту.' },
  backgroundImage: { type: String, default: '' },
  ratingText: { type: String, default: 'Рейтинг 5.0 в 2ГИС' },
  avatars: {
    type: Array,
    default: () => [
      '/img/landscaping/navu-avatar-1.png',
      '/img/landscaping/navu-avatar-2.png',
      '/img/landscaping/navu-avatar-3.png'
    ]
  },
  showForm: { type: Boolean, default: true },
  formTitle: { type: String, default: 'Оставьте заявку на консультацию' },
  formButtonText: { type: String, default: 'Записаться сейчас' },
  showEmailField: { type: Boolean, default: false },
  isEmailFieldRequired: { type: Boolean, default: false },
  showSelectField: { type: Boolean, default: true },
  formSelectPlaceholder: { type: String, default: 'Выберите услугу...' },
  formSelectOptions: {
    type: Array,
    default: () => ['Консультация', 'Расчет стоимости', 'Запись на визит']
  }
})

const isMobileMenuOpen = ref(false)

const formData = ref({
  name: '',
  email: '',
  phone: '',
  location: ''
})

const headerButtonUrlFormatted = computed(() => {
  if (props.headerButtonUrl) return props.headerButtonUrl
  const phone = props.whatsappPhone.replace(/[^0-9]/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent('Здравствуйте! Я перешел с сайта и хочу проконсультироваться.')}`
})

const handleSubmit = () => {
  let message = `Заявка успешно отправлена!\n\nИмя: ${formData.value.name}\nТелефон: ${formData.value.phone}`
  if (props.showEmailField && formData.value.email) {
    message += `\nE-mail: ${formData.value.email}`
  }
  if (props.showSelectField && formData.value.location) {
    message += `\nВыбор: ${formData.value.location}`
  }
  alert(message)
  
  // Сброс формы
  formData.value = {
    name: '',
    email: '',
    phone: '',
    location: ''
  }
}
</script>

<style scoped>
h1 {
  white-space: pre-line;
}

.glass-header {
  -webkit-backdrop-filter: blur(24px);
}

.overflow-hidden-safari {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}
</style>
