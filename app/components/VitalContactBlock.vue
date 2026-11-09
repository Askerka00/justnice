<template>
  <section id="contact" class="w-full bg-white py-16 md:py-24 px-6">
    <div class="w-full max-w-7xl mx-auto font-outfit" data-aos="fade-up">
      
      <!-- Blue/Primary Contact Card Wrapper -->
      <div class="contact-card-wrapper w-full bg-primary rounded-[3rem] p-8 md:p-12 lg:p-16 text-white shadow-xl shadow-primary/10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left Side: Content & Rating -->
        <div class="lg:col-span-5 flex flex-col space-y-8 md:space-y-10">
          
          <!-- Tag & Title -->
          <div class="space-y-4">
            <div v-if="tagText || 'Обратная связь'">
              <SectionBadge :text="tagText || 'Обратная связь'" default-style="dot" text-color="rgba(255, 255, 255, 0.8)" />
            </div>
            
            <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {{ title || 'Свяжитесь с нами сегодня' }}
            </h2>
          </div>

          <!-- Description -->
          <p class="text-white/85 text-base md:text-lg leading-relaxed max-w-md">
            {{ subtitle || 'Есть вопросы или нужна помощь с расчетом? Заполните форму, и наш специалист свяжется с вами в ближайшее время.' }}
          </p>

          <!-- Star Rating -->
          <div class="flex items-center space-x-3 bg-white/10 border border-white/15 rounded-full pl-4 pr-6 py-3 w-fit">
            <div class="flex items-center space-x-1">
              <Icon v-for="star in 5" :key="star" name="material-symbols:star" class="w-4 h-4 text-amber-300" />
            </div>
            <div class="text-xs font-semibold tracking-wide flex items-center">
              <span class="text-amber-300 font-bold mr-1.5">{{ ratingText || '5.0' }}</span>
              <span class="text-white/70">{{ ratingCount || 'Более 1500 клиентов' }}</span>
            </div>
          </div>
        </div>

        <!-- Right Side: Form -->
        <div class="contact-form-wrapper lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-10">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- Имя / Name -->
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-white/85 pl-1">Имя</label>
              <input 
                v-model="formData.name" 
                type="text" 
                placeholder="Ваше имя" 
                class="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 text-sm font-medium focus:border-white/40 focus:outline-none transition-all" 
                required 
              />
            </div>

            <!-- Email & Phone (Grid) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-white/85 pl-1">Email</label>
                <input 
                  v-model="formData.email" 
                  type="email" 
                  placeholder="your@email.com" 
                  class="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 text-sm font-medium focus:border-white/40 focus:outline-none transition-all" 
                  required 
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-white/85 pl-1">Телефон</label>
                <input 
                  v-model="formData.phone" 
                  type="tel" 
                  placeholder="+7 (700) 000-0000" 
                  class="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 text-sm font-medium focus:border-white/40 focus:outline-none transition-all" 
                  required 
                />
              </div>
            </div>

            <!-- Date -->
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-white/85 pl-1">Удобная дата для звонка</label>
              <input 
                v-model="formData.date" 
                type="date" 
                class="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 text-sm font-medium focus:border-white/40 focus:outline-none transition-all scheme-dark date-input" 
                required 
              />
            </div>

            <!-- Message -->
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-white/85 pl-1">Сообщение или детали заказа</label>
              <textarea 
                v-model="formData.message" 
                rows="4" 
                placeholder="Опишите ваши пожелания..." 
                class="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 text-sm font-medium focus:border-white/40 focus:outline-none transition-all resize-none" 
                required 
              ></textarea>
            </div>

            <!-- Submit Button Wrapper -->
            <div class="pt-4 flex justify-end">
              <button 
                type="submit" 
                class="w-full sm:w-auto bg-white hover:bg-zinc-100 text-primary font-bold px-10 py-4 rounded-full transition-all duration-300 active:scale-[0.98] shadow-md shadow-white/5 text-[15px]"
              >
                {{ submitText || 'Отправить' }}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  tagText: String,
  title: String,
  subtitle: String,
  submitText: String,
  ratingText: String,
  ratingCount: String
})

const formData = ref({
  name: '',
  email: '',
  phone: '',
  date: '',
  message: ''
})

const handleSubmit = () => {
  alert(`Сообщение успешно отправлено!\nМы свяжемся с вами в ближайшее время.`)
  formData.value.name = ''
  formData.value.email = ''
  formData.value.phone = ''
  formData.value.date = ''
  formData.value.message = ''
}
</script>

<style scoped>
/* Force date picker values to be white and readable on dynamic backgrounds */
.date-input::-webkit-datetime-edit,
.date-input::-webkit-datetime-edit-fields-wrapper,
.date-input::-webkit-datetime-edit-text,
.date-input::-webkit-datetime-edit-month-field,
.date-input::-webkit-datetime-edit-day-field,
.date-input::-webkit-datetime-edit-year-field {
  color: #ffffff !important;
}

/* Custom styles for native date picker appearance in dark scheme */
.scheme-dark::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.7;
  cursor: pointer;
}
.scheme-dark::-webkit-calendar-picker-indicator:hover {
  opacity: 0.9;
}
h2 {
  white-space: pre-line;
}

/* Safari: webkit backdrop filter prefix */
.contact-form-wrapper {
  -webkit-backdrop-filter: blur(12px);
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

/* Safari: large radius overflow fix */
.contact-card-wrapper {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}
</style>
