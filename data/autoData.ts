export interface CarModel {
  id: string
  brand: string
  name: string
  year: string
  basePrice: number
  simPrice: number
  masterAccountPrice: number
  fullPackagePrice: number
  timeHours: string
  chipset: string
  features: string[]
  popular?: boolean
}

export const CAR_MODELS: CarModel[] = [
  {
    id: 'zeekr-001',
    brand: 'Zeekr',
    name: 'Zeekr 001 (Рестайл & Дорестайл)',
    year: '2023–2026',
    basePrice: 180000,
    simPrice: 85000,
    masterAccountPrice: 60000,
    fullPackagePrice: 285000,
    timeHours: '1.5–2 часа',
    chipset: 'Qualcomm 8155 / 8295',
    features: ['Перевод экранов и HUD', 'Яндекс + 2GIS Алматы', 'Выносной SIM-слот 4G', 'Мастер-аккаунт в подарок при комплексе'],
    popular: true
  },
  {
    id: 'zeekr-007',
    brand: 'Zeekr',
    name: 'Zeekr 007 / 7X',
    year: '2024–2026',
    basePrice: 200000,
    simPrice: 90000,
    masterAccountPrice: 60000,
    fullPackagePrice: 310000,
    timeHours: '2 часа',
    chipset: 'Qualcomm Snapdragon 8295',
    features: ['Zeekr OS 6.0 локализация', 'Камеры Сергек в 2GIS', 'Слот Nano-SIM в бардачок', 'Bluetooth-ключ со смартфона'],
    popular: true
  },
  {
    id: 'lixiang-l7-l9',
    brand: 'Li Auto / LiXiang',
    name: 'LiXiang L6 / L7 / L8 / L9',
    year: '2023–2026',
    basePrice: 220000,
    simPrice: 95000,
    masterAccountPrice: 75000,
    fullPackagePrice: 345000,
    timeHours: '2–2.5 часа',
    chipset: 'Dual Qualcomm 8155 / 8295',
    features: ['Перевод всех 3-х дисплеев (включая потолочный)', 'Активация модема 4G', 'Мастер-аккаунт на номер РК', 'YouTube и Кинопоиск'],
    popular: true
  },
  {
    id: 'byd-song-plus',
    brand: 'BYD',
    name: 'BYD Song Plus / Champion / Seal / Han',
    year: '2022–2026',
    basePrice: 55000,
    simPrice: 45000,
    masterAccountPrice: 30000,
    fullPackagePrice: 110000,
    timeHours: '45–60 минут',
    chipset: 'DiLink 4.0 / 5.0',
    features: ['Русификация поворотного планшета', 'Разблокировка установки APK', '2GIS, Яндекс, Waze, Spotify', 'Беспроводной CarPlay'],
    popular: true
  },
  {
    id: 'geely-monjaro',
    brand: 'Geely',
    name: 'Geely Monjaro / Coolray / Atlas Pro',
    year: '2023–2026',
    basePrice: 65000,
    simPrice: 50000,
    masterAccountPrice: 0,
    fullPackagePrice: 105000,
    timeHours: '1 час',
    chipset: 'Geely Galaxy OS',
    features: ['Русификация 3-х экранов торпедо', 'Голосовой помощник на русском', 'Яндекс Музыка и Навигатор', 'Четные радиочастоты FM'],
    popular: true
  },
  {
    id: 'changan-uni',
    brand: 'Changan',
    name: 'Changan UNI-K / UNI-V / UNI-T / CS55 Plus',
    year: '2023–2026',
    basePrice: 45000,
    simPrice: 40000,
    masterAccountPrice: 0,
    fullPackagePrice: 80000,
    timeHours: '40 минут',
    chipset: 'Changan Smart Cockpit',
    features: ['Полная русификация без разбора', 'Установка 2GIS и Яндекс', 'CarPlay / Android Auto', 'Сохранение дилерской гарантии'],
    popular: false
  },
  {
    id: 'toyota-china',
    brand: 'Toyota / Lexus (КНР)',
    name: 'Toyota Camry 80 / RAV4 / Wildlander (Китай)',
    year: '2023–2026',
    basePrice: 160000,
    simPrice: 70000,
    masterAccountPrice: 0,
    fullPackagePrice: 215000,
    timeHours: '1.5 часа',
    chipset: 'Denso / Toyota Smart Connect',
    features: ['Перевод приборки и мультимедиа', 'Европейская сетка FM', 'Метрическая система (км/ч, градусы)', 'Поддержка обновлений'],
    popular: false
  }
]

export const FAQS = [
  {
    q: 'Слетит ли заводская гарантия на электромобиль?',
    a: 'Нет. Мы работаем исключительно с мультимедийным блоком головного устройства (IVI). Контроллеры тяговой батареи (BMS), инвертор и блоки управления двигателями остаются нетронутыми. При необходимости заводская китайская прошивка возвращается за 15 минут из сохраненного бэкапа.'
  },
  {
    q: 'Что происходит при обновлении прошивки по воздуху (OTA)?',
    a: 'Мы настраиваем защиту системного раздела. Если производитель выпускает глобальный релиз Zeekr OS или Li OS, мы осуществляем бесплатную консультацию и повторную накатку языкового пакета со скидкой 100% в рамках 12 месяцев гарантии.'
  },
  {
    q: 'Куда выводится SIM-карта для интернета 4G в Казахстане?',
    a: 'Мы монтируем аккуратный выносной слот под стандартную физическую Nano-SIM в бардачок или центральную консоль. Вы можете использовать любого оператора РК (Beeline, Kcell, Tele2) и менять симку в любой момент без разбора панели.'
  },
  {
    q: 'Работает ли навигация с камерами «Сергек» в Алматы?',
    a: 'Да. Мы устанавливаем официальный лицензионный 2GIS и Яндекс Навигатор, которые получают онлайн-пробки через сим-карту и заранее предупреждают о выделенных полосах, скоростном режиме и камерах «Сергек» по всему Казахстану.'
  },
  {
    q: 'Возможен ли выезд мастера к автомобилю?',
    a: 'Да! Наша мобильная лаборатория оснащена автономным питанием, стабилизаторами и диагностическим оборудованием. Мы выезжаем на подземные паркинги, в офисы и частные дома по всем районам Алматы.'
  }
]
