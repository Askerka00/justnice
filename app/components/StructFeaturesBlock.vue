<template>
  <section id="features" class="relative w-full bg-white text-gray-900 py-20 lg:py-28 overflow-hidden font-sans">
    
    <!-- Фоновое линейное арт-очертание зданий в левом нижнем углу (опционально) -->
    <div v-if="showBuildingArt" class="absolute bottom-0 left-0 w-full max-w-[320px] lg:max-w-[400px] pointer-events-none opacity-80 select-none pl-4 sm:pl-6 lg:pl-8 z-0">
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-gray-200">
        <rect x="20" y="60" width="40" height="140" stroke="currentColor" stroke-width="1" />
        <line x1="20" y1="80" x2="60" y2="80" stroke="currentColor" stroke-width="1" />
        <line x1="20" y1="100" x2="60" y2="100" stroke="currentColor" stroke-width="1" />
        <line x1="20" y1="120" x2="60" y2="120" stroke="currentColor" stroke-width="1" />
        <line x1="20" y1="140" x2="60" y2="140" stroke="currentColor" stroke-width="1" />
        <line x1="20" y1="160" x2="60" y2="160" stroke="currentColor" stroke-width="1" />
        <line x1="20" y1="180" x2="60" y2="180" stroke="currentColor" stroke-width="1" />
        <line x1="40" y1="30" x2="40" y2="60" stroke="currentColor" stroke-width="1" />
        <path d="M90 200 V50 C90 50, 110 40, 110 60 V200" stroke="currentColor" stroke-width="1" />
        <path d="M110 60 C110 60, 130 50, 130 80 V200" stroke="currentColor" stroke-width="1" />
        <line x1="100" y1="80" x2="100" y2="180" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1" />
        <line x1="120" y1="100" x2="120" y2="180" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1" />
        <path d="M170 200 V70 L220 50 V200 Z" stroke="currentColor" stroke-width="1" />
        <line x1="185" y1="80" x2="185" y2="170" stroke="currentColor" stroke-width="1" />
        <line x1="205" y1="75" x2="205" y2="170" stroke="currentColor" stroke-width="1" />
        <circle cx="150" cy="175" r="12" stroke="currentColor" stroke-width="1" />
        <line x1="150" y1="187" x2="150" y2="200" stroke="currentColor" stroke-width="1" />
      </svg>
    </div>

    <!-- Основной контентный контейнер -->
    <div class="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
      
      <!-- Левая колонка: Прямоугольный Бэдж и Главный тезис -->
      <div class="lg:col-span-6 space-y-6 max-w-2xl">
        <!-- Бэдж -->
        <SectionBadge :text="tagText" default-style="sharp" />
        
        <!-- Заголовок секции -->
        <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-gray-950 leading-[1.2]">
          {{ title }}
        </h2>
        <p v-if="description || subtitle" class="text-base text-gray-600 leading-relaxed max-w-lg">
          {{ description || subtitle }}
        </p>
      </div>

      <!-- Правая колонка: Двухрядная сетка фич -->
      <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 lg:gap-y-12">
        
        <!-- Цикл рендера карточек -->
        <div 
          v-for="(item, index) in features" 
          :key="index" 
          class="flex flex-col items-start p-6 rounded-2xl bg-zinc-50/70 border border-zinc-100 hover:border-primary/20 hover:shadow-md transition-all duration-300"
        >
          <!-- Контейнер для иконки со смещенной подложкой-пятном в цвет темы -->
          <div class="relative mb-4 flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
            <Icon :name="getFeatureIcon(item, index)" class="w-6 h-6 text-primary" />
          </div>

          <!-- Текстовое наполнение -->
          <h3 class="font-bold text-lg text-gray-950 tracking-tight mb-2">
            {{ item.title }}
          </h3>
          <p class="text-sm text-gray-600 leading-relaxed font-normal">
            {{ item.text || item.description || item.subtitle }}
          </p>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  tagText: { type: String, default: 'НАШИ ПРЕИМУЩЕСТВА' },
  title: { type: String, default: 'Высокие стандарты качества и сервиса' },
  description: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  showBuildingArt: { type: Boolean, default: false },
  features: {
    type: Array,
    default: () => [
      {
        icon: 'lucide:shield-check',
        title: 'Официальная гарантия',
        text: 'Предоставляем полную гарантию на все виды выполняемых работ и используемые материалы.'
      },
      {
        icon: 'lucide:award',
        title: 'Опытные мастера',
        text: 'Команда сертифицированных специалистов с многолетним практическим опытом.'
      },
      {
        icon: 'lucide:sparkles',
        title: 'Премиальные материалы',
        text: 'Используем только проверенное оборудование и оригинальные расходные материалы.'
      },
      {
        icon: 'lucide:clock',
        title: 'Точно в срок',
        text: 'Ценим ваше время и соблюдаем согласованный регламент работ без задержек.'
      }
    ]
  }
});

const defaultIcons = [
  'lucide:shield-check',
  'lucide:sparkles',
  'lucide:award',
  'lucide:clock',
  'lucide:heart-handshake',
  'lucide:gem'
]

const getFeatureIcon = (item, index) => {
  const raw = item.icon || item.iconType
  if (raw && raw.includes(':')) return raw
  return defaultIcons[index % defaultIcons.length]
}
</script>
