export interface CarModel {
  id: string
  brand: string
  name: string
  year: string
  price: number
  timeHours: string
  chipset: string
  image: string
  features: string[]
  popular?: boolean
}

export const CAR_MODELS: CarModel[] = [
  {
    id: 'zeekr-001',
    brand: 'Zeekr',
    name: 'Zeekr 001 (Рестайл & Дорестайл)',
    year: '2023–2026',
    price: 180000,
    timeHours: '1.5–2 часа',
    chipset: 'Qualcomm Snapdragon 8155 / 8295',
    image: '/images/cars/zeekr-001.jpg',
    features: [
      'Полный перевод центрального экрана и HUD проекции',
      'Установка лицензионного 2GIS с камерами «Сергек»',
      'Яндекс Навигатор с голосовым сопровождением Алисы',
      'Синхронизация часового пояса Алматы (UTC+5)',
      'Сохранение дилерской гарантии и стабильности систем'
    ],
    popular: true
  },
  {
    id: 'zeekr-007',
    brand: 'Zeekr',
    name: 'Zeekr 007 / 7X',
    year: '2024–2026',
    price: 200000,
    timeHours: '2 часа',
    chipset: 'Qualcomm Snapdragon 8295',
    image: '/images/cars/zeekr-001.jpg',
    features: [
      'Локализация Zeekr OS 6.0 на русский язык',
      'Перевод приборной панели, дисплея и проекции',
      '2GIS и Яндекс Навигатор с предупреждениями о камерах',
      'YouTube, Spotify и интернет-радио',
      '12 месяцев официальной гарантии на софт'
    ],
    popular: true
  },
  {
    id: 'lixiang-l7-l9',
    brand: 'Li Auto / LiXiang',
    name: 'LiXiang L6 / L7 / L8 / L9',
    year: '2023–2026',
    price: 220000,
    timeHours: '2–2.5 часа',
    chipset: 'Dual Qualcomm Snapdragon 8155 / 8295',
    image: '/images/cars/lixiang-l9.jpg',
    features: [
      'Перевод всех дисплеев: рулевой, центральный, пассажирский и потолочный',
      'Адаптация Li OS под русский язык без зависаний',
      'Установка 2GIS, Яндекс, YouTube, Kinopoisk',
      'Настройка звукового канала и приглушения музыки',
      'Сохранение заводских настроек пневмоподвески и автопилота'
    ],
    popular: true
  },
  {
    id: 'byd-song-plus',
    brand: 'BYD',
    name: 'BYD Song Plus / Champion / Han / Seal',
    year: '2022–2026',
    price: 55000,
    timeHours: '45–60 минут',
    chipset: 'DiLink 4.0 / 5.0',
    image: '/images/cars/byd-song-plus.jpg',
    features: [
      'Полная русификация поворотного экрана DiLink',
      'Разблокировка свободного инсталлятора APK',
      '2GIS Алматы, Яндекс Карты, Waze, Spotify',
      'Активация беспроводного Apple CarPlay',
      'Быстрая прошивка без разбора передней панели'
    ],
    popular: true
  },
  {
    id: 'geely-monjaro',
    brand: 'Geely',
    name: 'Geely Monjaro / Coolray / Atlas Pro',
    year: '2023–2026',
    price: 65000,
    timeHours: '1–1.5 часа',
    chipset: 'Geely Galaxy OS',
    image: '/images/cars/geely-monjaro.jpg',
    features: [
      'Перевод всех 3-х мониторов передней панели',
      'Голосовой помощник на русском языке',
      '2GIS и Яндекс Навигатор на щитке приборов',
      'Европейская сетка FM-радио (четные частоты)',
      '100% стабильная заводская работа'
    ],
    popular: true
  },
  {
    id: 'changan-uni',
    brand: 'Changan',
    name: 'Changan UNI-K / UNI-V / UNI-T / CS55 Plus',
    year: '2023–2026',
    price: 45000,
    timeHours: '40–50 минут',
    chipset: 'Changan Smart Cockpit',
    image: '/images/cars/geely-monjaro.jpg',
    features: [
      'Русификация приборного щитка и мультимедиа',
      'Инсталляция 2GIS и Яндекс с базой камер «Сергек»',
      'Apple CarPlay и Android Auto',
      'Без физического вмешательства в проводку',
      'Гарантия 12 месяцев'
    ],
    popular: false
  },
  {
    id: 'toyota-china',
    brand: 'Toyota / Lexus (КНР)',
    name: 'Toyota Camry 80 / RAV4 / Wildlander (Китай)',
    year: '2023–2026',
    price: 160000,
    timeHours: '1.5 часа',
    chipset: 'Denso / Toyota Smart Connect',
    image: '/images/cars/zeekr-001.jpg',
    features: [
      'Перевод меню приборной панели и мультимедиа',
      'Перевод шкал в км/ч, литры/100 км, градусы °C',
      'Четные европейские частоты FM-радио',
      'Полная совместимость с Toyota Safety Sense',
      'Надежная дилерская прошивка'
    ],
    popular: false
  }
]

export const FAQS = [
  {
    q: 'Слетит ли заводская гарантия на автомобиль?',
    a: 'Нет. Мы работаем исключительно с программным блоком мультимедиа (IVI). Контроллеры тяговой батареи (BMS), инвертор, тормозная система и блоки управления двигателем остаются абсолютно нетронутыми. Перед началом работ мы всегда снимаем полный бэкап оригинальной прошивки.'
  },
  {
    q: 'Работает ли навигация с предупреждением о камерах «Сергек» в Алматы?',
    a: 'Да. Мы устанавливаем официальные лицензионные версии 2GIS и Яндекс Навигатора со встроенной голосовой базой камер «Сергек», автобусных полос Bus Lane и скоростных режимов по всему Казахстану.'
  },
  {
    q: 'Сколько времени занимает русификация?',
    a: 'В зависимости от марки и модели: от 40 минут (BYD, Changan) до 1.5–2 часов (Zeekr 001/007, LiXiang L7/L9). Вы можете подождать автомобиль в комфортной зоне отдыха или забрать его сразу по готовности.'
  },
  {
    q: 'Что происходит при обновлении прошивки автомобиля по воздуху (OTA)?',
    a: 'Мы настраиваем защиту системных языковых файлов. Если автомобиль обновляется на новую глобальную версию системы, мы бесплатно консультируем и предоставляем повторную установку языкового пакета со скидкой 100% в рамках годовой гарантии.'
  },
  {
    q: 'Где находится лаборатория и как записаться?',
    a: 'Мы находимся в Алматы по адресу: пр. Абая / ул. Саина. Работаем ежедневно с 09:00 до 21:00 по предварительной записи. Записаться можно через WhatsApp или по телефону.'
  }
]
