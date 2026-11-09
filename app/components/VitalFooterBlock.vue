<template>
  <footer class="w-full bg-white border-t border-gray-100 py-16 md:py-20 px-6">
    <div class="w-full max-w-7xl mx-auto flex flex-col space-y-12 md:space-y-16">
      
      <!-- Top Subscription Section -->
      <div class="footer-subscription bg-primary/[0.04] rounded-[2.5rem] p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="space-y-3 max-w-xl text-center lg:text-left">
          <h3 class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950">
            {{ subscriptionTitle || 'Оставайтесь на связи' }}
          </h3>
          <p class="text-zinc-500 text-sm md:text-base leading-relaxed">
            {{ subscriptionText || 'Подпишитесь на наши новости, чтобы первыми получать информацию о скидках и новинках.' }}
          </p>
        </div>

        <div class="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
            <input 
              v-model="emailInput"
              type="email" 
              placeholder="Ваш Email" 
              class="px-6 py-4 rounded-full bg-white text-zinc-800 placeholder-zinc-400 font-medium text-sm border border-gray-100/50 shadow-sm focus:border-primary/50 focus:outline-none transition-all w-full lg:w-80"
              required
            />
            <button 
              type="submit"
              class="px-8 py-4 rounded-full bg-primary text-white font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-md shadow-primary/15 text-center whitespace-nowrap"
            >
              {{ buttonText || 'Подписаться' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pt-4">
        <!-- Logo & Description -->
        <div class="md:col-span-4 space-y-6">
          <a href="#" class="flex items-center space-x-2.5 group">
            <template v-if="logoImage">
              <img :src="logoImage" :alt="logoText || 'Logo'" class="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </template>
            <template v-else>
              <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
                <Icon name="lucide:flame" class="w-4 h-4 text-white" />
              </div>
            </template>
            <span v-if="!hideLogoText" class="text-lg font-bold tracking-tight text-zinc-900 group-hover:text-primary transition-colors">
              {{ logoText || companyName || 'Vital+Flow' }}
            </span>
          </a>
          
          <p class="text-zinc-500 text-sm leading-relaxed max-w-sm">
            {{ description || 'Профессиональные решения и качественный сервис для вашего здоровья и комфорта.' }}
          </p>
          <div v-if="phone || address" class="space-y-1 text-sm text-zinc-600 pt-1">
            <div v-if="phone" class="font-bold text-zinc-900">{{ phone }}</div>
            <div v-if="address">{{ address }}</div>
          </div>
        </div>

        <!-- Links Columns -->
        <div class="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div v-for="column in (linkColumns || defaultColumns)" :key="column.title" class="space-y-4">
            <h4 class="text-[13px] font-bold uppercase tracking-wider text-zinc-900">
              {{ column.title }}
            </h4>
            <ul class="space-y-3">
              <li v-for="link in column.links" :key="link.label">
                <a :href="link.url" class="text-zinc-500 hover:text-primary text-sm transition-colors duration-200">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Copyright & Policies -->
      <div class="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-zinc-400 text-xs">
          {{ copyright || `© ${new Date().getFullYear()} ${logoText || companyName || 'ConveerSites'}. Все права защищены.` }}
        </p>
        <div class="flex items-center space-x-6 text-xs text-zinc-400">
          <a href="#contacts" class="hover:text-primary transition-colors">Политика конфиденциальности</a>
          <a href="#contacts" class="hover:text-primary transition-colors">Условия использования</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  logoText: String,
  companyName: String,
  logoImage: String,
  hideLogoText: Boolean,
  description: String,
  phone: String,
  whatsappPhone: String,
  address: String,
  buttonText: String,
  copyright: String,
  subscriptionTitle: String,
  subscriptionText: String,
  linkColumns: Array
})

const emailInput = ref('')

const handleSubscribe = () => {
  alert(`Спасибо за подписку!\nМы отправили подтверждение на: ${emailInput.value}`)
  emailInput.value = ''
}

const defaultColumns = [
  {
    title: 'Компания',
    links: [
      { label: 'О нас', url: '#about' },
      { label: 'Наш подход', url: '#process' },
      { label: 'Контакты', url: '#contacts' }
    ]
  },
  {
    title: 'Услуги',
    links: [
      { label: 'Каталог', url: '#assortment' },
      { label: 'Доставка', url: '#delivery' },
      { label: 'Гарантия', url: '#warranty' }
    ]
  }
]
</script>

<style scoped>
/* Safari: force GPU compositing for rounded containers */
.footer-subscription {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}
</style>
