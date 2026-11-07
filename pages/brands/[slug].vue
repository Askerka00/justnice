<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const openFaq = ref<number | null>(null)

const toggleBrandFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

interface BrandFaq {
  q: string
  a: string
}

interface BrandDetail {
  name: string
  title: string
  metaDesc: string
  h1: string
  summary: string
  models: string[]
  chipset: string
  timeHours: string
  basePrice: number
  features: string[]
  faqs: BrandFaq[]
}

const brandMap: Record<string, BrandDetail> = {
  'zeekr': {
    name: 'Zeekr',
    title: 'Русификация Zeekr 001, 7X, 007, X, 009 в Алматы — Прошивка Zeekr OS 2026',
    metaDesc: 'Профессиональная русификация Zeekr 001 (рестайл/дорестайл), Zeekr 7X, 007 в Алматы. Перевод приборки, центрального экрана и HUD проекции, 2GIS и Яндекс с камерами «Сергек». 100% гарантия.',
    h1: 'Русификация Zeekr в Алматы (001, 7X, 007, X)',
    summary: 'Официальные программные пакеты локализации для всей линейки электромобилей Zeekr. Перевод интерфейса Zeekr OS на чистый русский язык без потери функций автопилота NZP и дилерской гарантии.',
    models: [
      'Zeekr 001 (Рестайл 2024–2026, чип 8295)',
      'Zeekr 001 (Дорестайл 2021–2023, чип 8155)',
      'Zeekr 7X (Новинка 2025–2026)',
      'Zeekr 007 (Qualcomm 8295)',
      'Zeekr X (Urban SUV)',
      'Zeekr 009 (Luxury MPV)'
    ],
    chipset: 'Qualcomm Snapdragon 8155 / 8295 (5nm)',
    timeHours: '1.5 – 2 часа',
    basePrice: 120000,
    features: [
      'Полный перевод центрального экрана, цифровой приборной панели и HUD проекции',
      'Официальный Яндекс Навигатор и 2GIS со звуковым предупреждением о камерах «Сергек»',
      'Предупреждения о полосах общественного транспорта (Bus Lane) и скоростных ограничениях',
      'Синхронизация часового пояса города Алматы (UTC+5)',
      'Сохранение работы массажа сидений, настроек пневмоподвески и круиз-контроля',
      'Безопасная установка со снятием полного бэкапа оригинальной прошивки',
      'Гарантия 12 месяцев на программное обеспечение'
    ],
    faqs: [
      {
        q: 'Русифицируете ли вы новые Zeekr 7X и рестайлинговые Zeekr 001 (2024–2026 года)?',
        a: 'Да. Мы успешно русифицируем как классические дорестайлинговые версии на чипе Qualcomm 8155, так и новейшие Zeekr 7X и рестайлинговые Zeekr 001 / 007 на передовой платформе Snapdragon 8295.'
      },
      {
        q: 'Работает ли проекционный дисплей (HUD) на русском языке?',
        a: 'Да, в комплекс входит полная адаптация всех дисплеев автомобиля: цифровой приборной панели водителя, центрального сенсорного планшета и проекции на лобовое стекло (HUD).'
      },
      {
        q: 'Сохраняется ли дилерская гарантия на батарею и моторы?',
        a: 'Да, на 100%. Мы взаимодействуем исключительно с мультимедийным блоком IVI через штатный программный протокол. Контроллеры тяговой батареи (BMS), инверторы и силовая часть остаются в заводском состоянии.'
      },
      {
        q: 'Что делать при выходе официального обновления Zeekr OS?',
        a: 'Перед началом работы мы снимаем полный бэкап вашей оригинальной заводской системы. В рамках нашей годовой гарантии при прилете глобального обновления мы обеспечиваем техническую поддержку и накатывание языкового пакета.'
      }
    ]
  },
  'geely-monjaro': {
    name: 'Geely Monjaro',
    title: 'Прошивка и русификация Geely Monjaro в Алматы 2026 — 3 экрана, GMCustoms',
    metaDesc: 'Профессиональная прошивка и русификация Geely Monjaro, Coolray, Atlas в Алматы. Перевод всех 3 экранов, четные частоты FM, русский голос, 2GIS и Яндекс с камерами «Сергек». Дилерская гарантия.',
    h1: 'Прошивка и русификация Geely Monjaro в Алматы',
    summary: 'Специализированная прошивка мультимедийного комплекса Geely Galaxy OS для китайских версий Geely Monjaro (включая рестайлинг 2024–2026). Полный перевод всех трех дисплеев передней панели, навигация и четные частоты радио.',
    models: [
      'Geely Monjaro (2024–2026 рестайлинг и дорестайл)',
      'Geely Monjaro Flagship / Exclusive / Emerald',
      'Geely Coolray (2023–2026 новый кузов)',
      'Geely Atlas Pro / Boyue L (Galaxy OS)',
      'Geely Preface / Emgrand'
    ],
    chipset: 'Qualcomm Snapdragon 8155 / Geely Galaxy OS',
    timeHours: '1 – 1.5 часа',
    basePrice: 65000,
    features: [
      'Полный перевод всех 3 экранов: приборный щиток, мультимедиа и экран пассажира',
      'Русский голосовой помощник (управление люком, окнами, климат-контролем)',
      'Предустановленный лицензионный 2GIS Алматы и Яндекс Навигатор с голосовой Алисой',
      'Вывод навигационных подсказок на цифровую приборную панель',
      'Европейская сетка FM-радиостанций с поддержкой четных частот',
      'Корректная синхронизация времени часового пояса Алматы (UTC+5)',
      'Гарантия 12 месяцев с возможностью полного отката в сток'
    ],
    faqs: [
      {
        q: 'Переводятся ли все 3 экрана на китайском Geely Monjaro?',
        a: 'Да. Русифицируются приборная панель водителя, центральный сенсорный экран и отдельный монитор правого пассажира. Все меню, виджеты и системные настройки отображаются на грамотном русском языке.'
      },
      {
        q: 'Появляются ли четные радиочастоты на Monjaro?',
        a: 'Да, мы активируем полноценный европейский шаг FM-радио (100.2, 102.8, 107.0 и т.д.), что позволяет слушать любые радиостанции Казахстана без шипения и помех.'
      },
      {
        q: 'Слетит ли гарантия официального дилера при прошивке ГУ?',
        a: 'Нет. Мы прошиваем головное устройство без вмешательства в блок управления двигателем (ЭБУ) и трансмиссией. Перед прошивкой делается полный дамп, позволяющий в любой момент вернуться к исходной заводской конфигурации.'
      },
      {
        q: 'Работают ли камеры «Сергек» на навигаторе в Monjaro?',
        a: 'Да, в 2GIS и Яндекс Навигатор интегрирована актуальная база дорожных камер контроля скорости «Сергек», выделенных автобусных полос и знаков ограничения Алматы и трасс РК.'
      }
    ]
  },
  'changan': {
    name: 'Changan',
    title: 'Русификация и прошивка Changan Q05, UNI-Z, UNI-K, UNI-V в Алматы — Qiyuan OS',
    metaDesc: 'Прошивка и русификация Changan Q05, UNI-Z, UNI-K, UNI-V, CS55 Plus в Алматы за 45 минут. Перевод приборки и ГУ, 2GIS, Яндекс с камерами «Сергек», CarPlay. 100% гарантия.',
    h1: 'Русификация и прошивка Changan в Алматы (Q05, UNI-Z, UNI-K)',
    summary: 'Быстрая и надежная программная адаптация головных устройств Changan серии UNI и линейки Qiyuan (Nevo). Перевод меню приборной панели и мультимедиа, инсталляция навигационных сервисов и беспроводного CarPlay.',
    models: [
      'Changan Q05 / Qiyuan Q05 (хит параллельного импорта)',
      'Changan UNI-Z (новинка 2024–2026)',
      'Changan UNI-K (все комплектации)',
      'Changan UNI-V',
      'Changan UNI-T',
      'Changan CS55 Plus / CS75 Plus (4 поколение)',
      'Changan Qiyuan A05 / A06'
    ],
    chipset: 'Changan Smart Cockpit / Qiyuan OS',
    timeHours: '40 – 50 минут',
    basePrice: 40000,
    features: [
      'Качественный перевод меню мультимедиа и цифрового щитка приборов',
      'Установка 2GIS и Яндекс Навигатора с голосовым оповещением о дорожных камерах «Сергек»',
      'Активация Apple CarPlay и беспроводного соединения смартфона',
      'Русификация настроек климат-контроля и систем безопасности ADAS',
      'Прошивка выполняется через диагностический/USB порт без разбора передней панели',
      'Официальная гарантия 12 месяцев на стабильность работы'
    ],
    faqs: [
      {
        q: 'Русифицируете ли вы китайские Changan Q05 и Qiyuan A05 / A06?',
        a: 'Да. Changan Q05 — одна из самых популярных моделей в нашей лаборатории. Мы устанавливаем стабильную русскую прошивку с полноценным доступом к навигации и медиаприложениям.'
      },
      {
        q: 'Нужно ли разбирать салон автомобиля при прошивке Changan?',
        a: 'Нет. Все работы выполняются программным методом через штатный USB или сервисный порт, сохраняя заводские пистоны, зазоры и целостность салона.'
      },
      {
        q: 'Будет ли работать навигация без интернета?',
        a: 'Да, в 2GIS предварительно загружаются оффлайн-карты Алматы и всей территории Казахстана. Навигация и предупреждения о камерах работают автономно по GPS.'
      }
    ]
  },
  'toyota-china': {
    name: 'Toyota (Китай)',
    title: 'Русификация Toyota Camry 80, RAV4, Wildlander (Китай) в Алматы — Приборка и ГУ',
    metaDesc: 'Русификация китайских Toyota Camry 80 (XV80 2024–2026), RAV4, Wildlander в Алматы. Перевод приборной панели в км/ч, цельсии, четные FM частоты, русское меню ГУ и 12 мес. гарантия.',
    h1: 'Русификация Toyota Camry 80 и RAV4 из Китая в Алматы',
    summary: 'Комплексная адаптация китайских модификаций Toyota (сборки GAC-Toyota и FAW-Toyota) под стандарты Казахстана. Перевод приборной панели, европейские шкалы км/ч и °C, четные радиоволны и русифицированное меню головного устройства.',
    models: [
      'Toyota Camry 80 (XV80 2024–2026 из КНР)',
      'Toyota RAV4 / Wildlander (китайская сборка GAC/FAW)',
      'Toyota Frontlander / Levin',
      'Toyota Highlander / Crown Kluger (Китай)',
      'Lexus RX / NX / ES (для рынка КНР)'
    ],
    chipset: 'Denso / Toyota Smart Connect Cockpit',
    timeHours: '1.5 часа',
    basePrice: 95000,
    features: [
      'Перевод цифровой приборной панели водителя на русский язык',
      'Конвертация шкал спидометра в км/ч, расхода топлива в л/100 км, климата в °C',
      'Полная русификация сенсорного дисплея мультимедиа',
      'Европейская сетка FM-радио (четные и нечетные частоты Казахстана)',
      '100% совместимость с комплексами активной безопасности Toyota Safety Sense (TSS)',
      'Официальная гарантия 12 месяцев'
    ],
    faqs: [
      {
        q: 'Переводится ли цифровая приборка Camry 80 в привычные км/ч и градусы Цельсия?',
        a: 'Да, в прошивку входит корректная метрическая адаптация: скорость отображается строго в км/ч, температура климат-контроля — в °C, а расход топлива — в литрах на 100 км.'
      },
      {
        q: 'Влияет ли прошивка на работу систем безопасности Toyota Safety Sense?',
        a: 'Нет. Адаптивные радары, удержание в полосе, автоматическое торможение и круиз-контроль функционируют в штатном заводском режиме без ошибок.'
      },
      {
        q: 'Как записаться на русификацию Camry 80 в Алматы?',
        a: 'Запись осуществляется предварительно через наш WhatsApp или по телефону +7 (777) 238-99-39. Процедура занимает около 1.5 часов.'
      }
    ]
  },
  'lixiang': {
    name: 'LiXiang (Li Auto)',
    title: 'Русификация и прошивка LiXiang L6, L7, L8, L9 в Алматы — Li OS 2026',
    metaDesc: 'Полная русификация LiXiang L6, L7, L8, L9 в Алматы. Перевод рулевого экранчика, центрального, пассажирского и потолочного мониторов, 2GIS и Яндекс с камерами «Сергек».',
    h1: 'Русификация LiXiang в Алматы (L6, L7, L8, L9)',
    summary: 'Профессиональная адаптация экосистемы Li OS для премиальных гибридов LiXiang L-серии. Перевод всех встроенных дисплеев, корректная русификация ассистентов управления пневмоподвеской и мультимедиа.',
    models: [
      'LiXiang L6 Pro / Max (2024–2026)',
      'LiXiang L7 Pro / Max / Ultra',
      'LiXiang L8 Pro / Max / Ultra',
      'LiXiang L9 Max / Ultra'
    ],
    chipset: 'Dual Qualcomm Snapdragon 8155 / 8295 (Dual SoC)',
    timeHours: '2 – 2.5 часа',
    basePrice: 140000,
    features: [
      'Перевод всех дисплеев салона: мини-экран на рулевом колесе, центральный тачскрин, экран переднего пассажира и потолочный экран второго ряда',
      'Официальный лицензионный 2GIS Алматы с предупреждениями о камерах «Сергек»',
      'Яндекс Навигатор с голосовым сопровождением Алисы',
      'Установка развлекательных сервисов: YouTube, Кинопоиск, Spotify',
      'Синхронизация точного времени часового пояса Алматы (UTC+5)',
      'Сохранение заводских алгоритмов пневмоподвески, электропорогов и автопилота',
      'Официальная гарантия 12 месяцев на программное обеспечение'
    ],
    faqs: [
      {
        q: 'Переводится ли потолочный монитор для задних пассажиров в Li L9 / L8?',
        a: 'Да. Локализация охватывает абсолютно все мониторы автомобиля, включая потолочный развлекательный дисплей, пассажирский экран и сенсорный дисплей на руле.'
      },
      {
        q: 'Не зависает ли система Li OS после русификации?',
        a: 'Нет. Мы используем оптимизированный программный пакет, протестированный на сотнях автомобилей в Казахстане. Система работает плавно, сохраняя все штатные анимации 60 FPS.'
      },
      {
        q: 'Сохраняются ли настройки пневмоподвески и автопилота?',
        a: 'Да. Локализация не затрагивает низкоуровневые контроллеры шасси и безопасности. Все настройки жесткости подвески, клиренса и ассистентов движения работают штатно.'
      }
    ]
  },
  'byd': {
    name: 'BYD',
    title: 'Русификация BYD Song Plus, Yuan Up, Seagull, Han, Seal в Алматы — DiLink',
    metaDesc: 'Профессиональная русификация поворотного экрана BYD Song Plus, Yuan Up, Dolphin, Seagull, Han, Seal в Алматы за 45 минут. Разблокировка APK, 2GIS, Яндекс с камерами «Сергек», CarPlay.',
    h1: 'Русификация BYD в Алматы (Song Plus, Yuan Up, Han, Seal)',
    summary: 'Локализация операционной системы DiLink для поворотного экрана всей модельной гаммы BYD. Активация установки сторонних приложений, лицензионной навигации и беспроводного CarPlay.',
    models: [
      'BYD Song Plus DM-i / EV / Champion',
      'BYD Yuan Up / Yuan Plus (Atto 3)',
      'BYD Dolphin / BYD Seagull',
      'BYD Han EV / DM-p',
      'BYD Seal / Seal U',
      'BYD Destroyer 05 / Qin Plus DM-i'
    ],
    chipset: 'Qualcomm Snapdragon 665 / 690 / DiLink 4.0 & 5.0',
    timeHours: '45 – 60 минут',
    basePrice: 45000,
    features: [
      'Полная русификация вращающегося планшета DiLink и системных настроек',
      'Разблокировка свободного инсталлятора APK для установки любых приложений',
      'Предустановка 2GIS Алматы, Яндекс Навигатора с камерами «Сергек», Spotify и YouTube',
      'Активация беспроводного Apple CarPlay и Android Auto',
      'Сохранение управления кондиционером, массажем и подогревами с экрана',
      'Установка без физического разбора салона за 45 минут с гарантией 12 месяцев'
    ],
    faqs: [
      {
        q: 'Можно ли устанавливать любые приложения (APK) на поворотный экран BYD?',
        a: 'Да, после нашей прошивки открывается свободная возможность инсталляции любых Android-приложений (APK) — от навигаторов и онлайн-радио до стриминговых сервисов.'
      },
      {
        q: 'Работает ли 2GIS и предупреждения о камерах «Сергек» со звуком в штатную акустику?',
        a: 'Да, звук навигации корректно накладывается на радио или музыку с автоматическим приглушением во время голосовых подсказок.'
      },
      {
        q: 'Сколько по времени занимает русификация BYD?',
        a: 'Стандартная русификация DiLink занимает всего 45–60 минут. Вы можете забрать готовый автомобиль в день обращения.'
      }
    ]
  },
  'deepal': {
    name: 'Deepal',
    title: 'Русификация Deepal S07 и SL03 в Алматы — Прошивка Deepal OS',
    metaDesc: 'Профессиональная русификация Deepal S07 и Deepal SL03 в Алматы. Перевод приборки и мультимедиа, 2GIS, Яндекс с камерами «Сергек», Apple CarPlay за 1 час. 100% гарантия.',
    h1: 'Русификация Deepal S07 и SL03 в Алматы',
    summary: 'Официальный программный пакет локализации операционной системы Deepal OS для электрических кроссоверов и лифтбеков суббренда Changan. Перевод мультимедиа, беспроводной CarPlay и казахстанская навигация.',
    models: [
      'Deepal S07 (Changan Deepal S7 2023–2026)',
      'Deepal SL03 (электролифтбек и гибрид)',
      'Deepal G318 (внедорожник)'
    ],
    chipset: 'Qualcomm Snapdragon 8155 / Deepal OS',
    timeHours: '1 час',
    basePrice: 60000,
    features: [
      'Полный перевод центрального поворотного экрана и цифрового щитка',
      'Установка 2GIS и Яндекс Навигатора с онлайн-камерами «Сергек»',
      'Активация Apple CarPlay для iPhone со звуком в штатные динамики',
      'Синхронизация часового пояса города Алматы (UTC+5)',
      'Прошивка без механического разбора передней панели',
      'Гарантия 12 месяцев на стабильность работы'
    ],
    faqs: [
      {
        q: 'Нужно ли разбирать салон Deepal S07 для русификации?',
        a: 'Нет. Все работы выполняются программным методом через штатные порты, без разбора передней панели, срезания проводки или пайки.'
      },
      {
        q: 'Работает ли Apple CarPlay на Deepal?',
        a: 'Да. В пакет русификации входит активация беспроводного Apple CarPlay для зеркалирования навигации, звонков и музыки с iPhone.'
      },
      {
        q: 'Сохраняется ли управление климатом и электроприводами дефлекторов?',
        a: 'Да, все штатные анимации и регулировки климат-контроля с экрана работают абсолютно корректно на русском языке.'
      }
    ]
  },
  'tank': {
    name: 'Tank',
    title: 'Прошивка и русификация Tank 300 и Tank 500 в Алматы — Coffee OS',
    metaDesc: 'Профессиональная русификация и прошивка Tank 300, Tank 500, Tank 400, Tank 700 в Алматы. Перевод приборки, четные FM частоты, 2GIS, Яндекс и антирадар.',
    h1: 'Прошивка и русификация Tank 300 / Tank 500 в Алматы',
    summary: 'Полноценная программная русификация мультимедийных систем GWM Coffee OS для рамных внедорожников Tank. Перевод приборной панели, европейские радиочастоты, вывод навигации на приборку и сохранение всех внедорожных режимов 4x4.',
    models: [
      'Tank 300 (городской и оффроуд пакеты)',
      'Tank 500 (бензин V6 и гибрид Hi4-T)',
      'Tank 400 Hi4-T',
      'Tank 700 Hi4-T'
    ],
    chipset: 'Qualcomm Snapdragon 8155 / GWM Coffee OS',
    timeHours: '1.5 часа',
    basePrice: 70000,
    features: [
      'Полная русификация всех экранов: приборная панель и мультимедиа',
      'Установка лицензионного 2GIS и Яндекс Навигатора с камерами «Сергек»',
      'Европейская сетка FM-радио (четные частоты без помех)',
      'Сохранение всех блокировок дифференциалов и индикации режимов 4x4',
      '100% сохранение дилерской гарантии и бэкап системы',
      'Официальная гарантия 12 месяцев'
    ],
    faqs: [
      {
        q: 'Работают ли внедорожные режимы и блокировки на Tank после прошивки?',
        a: 'Да. Мы не затрагиваем блоки управления раздаточной коробкой и трансмиссией. Все режимы «Грязь», «Песок», «Снег» и блокировки отображаются штатно.'
      },
      {
        q: 'Появляются ли четные радиостанции на китайском Tank?',
        a: 'Да, в прошивку входит адаптация тюнера под европейский шаг волн FM-диапазона.'
      }
    ]
  },
  'hongqi': {
    name: 'Hongqi',
    title: 'Русификация Hongqi E-QM5, H5, HS5, H9 в Алматы — Премиум прошивка',
    metaDesc: 'Профессиональная русификация бизнес-седанов и кроссоверов Hongqi в Алматы. Перевод меню, установка 2GIS, Яндекс Навигатора и YouTube. Официальная гарантия 12 месяцев.',
    h1: 'Русификация Hongqi в Алматы (E-QM5, H5, HS5, H9)',
    summary: 'Адаптация премиальных автомобилей государственного китайского бренда Hongqi. Перевод интерфейса бортового компьютера и головного устройства, настройка времени под Казахстан и инсталляция навигации.',
    models: [
      'Hongqi E-QM5 (электрический седан)',
      'Hongqi H5 (бизнес-седан)',
      'Hongqi HS5 (кроссовер)',
      'Hongqi H9 / E-HS9 (флагманский представительский класс)'
    ],
    chipset: 'Hongqi Smart Cockpit',
    timeHours: '1 час',
    basePrice: 65000,
    features: [
      'Русификация мультимедийного дисплея и бортового компьютера',
      'Установка 2GIS с оффлайн-картами и Яндекс Навигатора с Алисой',
      'Адаптация часового пояса Алматы (UTC+5)',
      'YouTube, онлайн-музыка и стриминг',
      'Официальная гарантия 12 месяцев'
    ],
    faqs: [
      {
        q: 'Русифицируете ли вы электрический седан Hongqi E-QM5?',
        a: 'Да, Hongqi E-QM5 — одна из самых частых моделей Hongqi в нашей лаборатории. Прошивка выполняется быстро за 1 час.'
      }
    ]
  },
  'chevrolet-monza': {
    name: 'Chevrolet (КНР)',
    title: 'Русификация Chevrolet Monza и Tracker (Китай) в Алматы — MyLink',
    metaDesc: 'Русификация сдвоенного дисплея Chevrolet Monza и Tracker китайской сборки в Алматы за 40 минут. Активация Apple CarPlay, 2GIS, Яндекс с камерами «Сергек». Цена 40 000 тг.',
    h1: 'Русификация Chevrolet Monza и Tracker из Китая в Алматы',
    summary: 'Доступная и надежная программная адаптация популярных седанов Chevrolet Monza китайского производства (SAIC-GM). Перевод цифровой приборки и мультимедиа, активация Apple CarPlay и казахстанской навигации.',
    models: [
      'Chevrolet Monza (2022–2026, 1.5L / 1.3T Mild Hybrid)',
      'Chevrolet Tracker (сборка КНР)',
      'Chevrolet Onix (китайская версия)'
    ],
    chipset: 'SAIC-GM MyLink Cockpit',
    timeHours: '40–50 минут',
    basePrice: 40000,
    features: [
      'Перевод объединенного сдвоенного дисплея (приборка + ГУ)',
      'Активация Apple CarPlay и Android Auto',
      'Установка 2GIS и Яндекс Навигатора с базой дорожных камер «Сергек»',
      'Голосовые подсказки со звуком в штатные динамики',
      'Выполнение работ за 40 минут без разбора салона',
      'Гарантия 12 месяцев'
    ],
    faqs: [
      {
        q: 'Работает ли Apple CarPlay на Chevrolet Monza после прошивки?',
        a: 'Да, активируется полноценный Apple CarPlay со стабильным подключением любого iPhone.'
      },
      {
        q: 'Сколько времени занимает прошивка Monza?',
        a: 'Всего 40–50 минут. Автомобиль готов в день обращения.'
      }
    ]
  },
  'hyundai-kia': {
    name: 'Hyundai & Kia',
    title: 'Русификация Hyundai и Kia из Кореи и США в Алматы — GEN5W & ccNC',
    metaDesc: 'Профессиональная русификация корейских и американских Hyundai Palisade, Santa Fe, Tucson и Kia Sorento, Carnival, K5 в Алматы. Перевод приборки, климата, четные частоты FM, карты РК.',
    h1: 'Русификация Hyundai и Kia из Кореи и США в Алматы',
    summary: 'Комплексная адаптация автомобилей Hyundai и Kia, импортированных из Южной Кореи и США. Полноценный перевод цифровой приборной панели, климат-контроля и головного устройства платформ Gen5W и ccNC.',
    models: [
      'Hyundai Palisade / Santa Fe (TM / MX5)',
      'Hyundai Tucson (NX4) / Sonata (DN8) / Elantra (CN7)',
      'Kia Sorento (MQ4) / Carnival (KA4)',
      'Kia K5 (DL3) / Sportage (NQ5) / K8 (GL3)',
      'Kia Seltos / Mohave / Telluride / EV6'
    ],
    chipset: 'Mobis Standard-class Gen5W / ccNC (Корея / США)',
    timeHours: '1 – 1.5 часа',
    basePrice: 50000,
    features: [
      'Полный перевод меню ГУ и цифрового щитка приборов на русский язык',
      'Европейская сетка FM-радио (четные частоты без шума)',
      'Активация Яндекс Навигатора и 2GIS с картами Казахстана',
      'Перевод единиц климат-контроля и давления в шинах',
      '100% заводская стабильность без ошибок по блокам',
      'Официальная гарантия 12 месяцев'
    ],
    faqs: [
      {
        q: 'Переводится ли корейский язык на приборной панели Hyundai Palisade / Kia Carnival?',
        a: 'Да, полностью русифицируются как приборная панель водителя, так и центральный экран мультимедиа и блок климат-контроля.'
      },
      {
        q: 'Будет ли работать FM-радио на четных волнах (100.2, 102.8)?',
        a: 'Да, мы конвертируем радиомодуль под европейский стандарт частот Казахстана.'
      }
    ]
  }
}

const currentBrand = computed(() => {
  const s = slug.value
  return brandMap[s] || brandMap['zeekr']!
})

const whatsappBrandUrl = computed(() => {
  const text = `Здравствуйте! Интересует русификация и прошивка ${currentBrand.value.name} в Алматы. Подскажите, когда ближайшее свободное окно для записи?`
  return `https://wa.me/77772389939?text=${encodeURIComponent(text)}`
})

const schemaService = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: currentBrand.value.title,
  serviceType: 'Русификация и прошивка мультимедиа авто',
  provider: {
    '@type': 'AutoRepair',
    name: 'JUSTNICE AutoTech',
    telephone: '+77772389939',
    url: 'https://www.justnice.me/'
  },
  areaServed: {
    '@type': 'City',
    name: 'Алматы'
  },
  offers: {
    '@type': 'Offer',
    price: currentBrand.value.basePrice,
    priceCurrency: 'KZT',
    availability: 'https://schema.org/InStock'
  },
  description: currentBrand.value.summary
}))

const schemaFaq = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: (currentBrand.value.faqs || []).map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a
    }
  }))
}))

const schemaBreadcrumbs = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
      item: 'https://www.justnice.me/'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: currentBrand.value.name,
      item: `https://www.justnice.me/brands/${slug.value}`
    }
  ]
}))

useHead({
  title: computed(() => currentBrand.value.title),
  meta: [
    {
      name: 'description',
      content: computed(() => currentBrand.value.metaDesc)
    },
    { property: 'og:title', content: computed(() => currentBrand.value.title) },
    { property: 'og:description', content: computed(() => currentBrand.value.metaDesc) },
    { property: 'og:url', content: computed(() => `https://www.justnice.me/brands/${slug.value}`) },
    { property: 'og:image', content: 'https://www.justnice.me/images/hero-car.jpg' },
    { name: 'twitter:title', content: computed(() => currentBrand.value.title) },
    { name: 'twitter:description', content: computed(() => currentBrand.value.metaDesc) }
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://www.justnice.me/brands/${slug.value}`) }
  ],
  script: [
    { type: 'application/ld+json', children: computed(() => JSON.stringify(schemaService.value)) },
    { type: 'application/ld+json', children: computed(() => JSON.stringify(schemaFaq.value)) },
    { type: 'application/ld+json', children: computed(() => JSON.stringify(schemaBreadcrumbs.value)) }
  ]
})
</script>

<template>
  <div class="py-20 bg-white">
    <div class="container-audi">
      <!-- Breadcrumb -->
      <nav aria-label="Хлебные крошки" class="flex items-center gap-2 text-xs color-gray mb-10">
        <NuxtLink to="/" class="hover:text-black transition-colors">Главная</NuxtLink>
        <span>/</span>
        <NuxtLink to="/#models" class="hover:text-black transition-colors">Модельный ряд</NuxtLink>
        <span>/</span>
        <span class="text-black font-medium">{{ currentBrand.name }}</span>
      </nav>

      <!-- Hero for Brand -->
      <div class="border border-black p-8 md:p-14 mb-16 bg-[#fafafa]">
        <div class="max-w-4xl">
          <div class="flex items-center gap-2 mb-3">
            <span class="inline-block h-1.5 w-1.5 bg-[#f50537]"></span>
            <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">
              Специализированная лаборатория • Алматы
            </span>
          </div>
          <h1 class="title-md text-black mt-2 mb-4">
            {{ currentBrand.h1 }}
          </h1>
          <p class="text-lg text-[#555555] font-light leading-relaxed mb-8">
            {{ currentBrand.summary }}
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-[#e5e5e5] text-xs">
            <div>
              <p class="color-gray uppercase font-medium">Чипсет / Платформа</p>
              <p class="text-black font-medium text-sm mt-1">{{ currentBrand.chipset }}</p>
            </div>
            <div>
              <p class="color-gray uppercase font-medium">Время прошивки</p>
              <p class="text-black font-medium text-sm mt-1">{{ currentBrand.timeHours }}</p>
            </div>
            <div>
              <p class="color-gray uppercase font-medium">Стоимость под ключ</p>
              <p class="text-black font-bold text-base mt-1">от {{ currentBrand.basePrice.toLocaleString('ru-RU') }} тг</p>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-4 items-center">
            <a
              :href="whatsappBrandUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-black-primary"
            >
              <span>Записаться в WhatsApp</span>
              <span class="ml-2">→</span>
            </a>
            <a
              href="tel:+77772389939"
              class="btn btn-black-default"
            >
              <span>+7 (777) 238-99-39</span>
            </a>
            <NuxtLink to="/calculator" class="text-xs text-[#555555] hover:text-black underline ml-2">
              Открыть онлайн-калькулятор
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Models & Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div class="border border-[#dedede] p-8 bg-white">
          <h2 class="text-xl font-bold text-black mb-6">Поддерживаемые модели {{ currentBrand.name }}</h2>
          <ul class="space-y-3">
            <li
              v-for="model in currentBrand.models"
              :key="model"
              class="flex items-center justify-between p-3.5 border border-[#eeeeee] text-sm hover:border-black transition-colors"
            >
              <span class="font-medium text-black">{{ model }}</span>
              <span class="text-xs text-[#f50537] font-semibold">В наличии</span>
            </li>
          </ul>
        </div>

        <div class="border border-[#dedede] p-8 bg-white">
          <h2 class="text-xl font-bold text-black mb-6">Что входит в пакет русификации</h2>
          <ul class="space-y-3">
            <li
              v-for="feat in currentBrand.features"
              :key="feat"
              class="flex items-start gap-3 p-3.5 border border-[#eeeeee] text-xs text-[#444444] font-light leading-relaxed"
            >
              <span class="text-[#f50537] font-bold text-sm">✓</span>
              <span>{{ feat }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Technical Standards & SEO Quality Block -->
      <div class="border border-[#e5e5e5] p-8 md:p-12 mb-16 bg-[#fafafa]">
        <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Стандарты качества</span>
        <h2 class="title-sm text-black mt-2 mb-6">Почему для прошивки {{ currentBrand.name }} в Алматы выбирают JUSTNICE</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#555555] font-light leading-relaxed">
          <div>
            <h3 class="text-sm font-bold text-black mb-2">100% Сохранение дилерской гарантии</h3>
            <p>Мы работаем исключительно на уровне мультимедийного блока IVI. Блоки управления тяговой батареей (BMS), моторами и ходовой частью остаются нетронутыми. Перед началом работ обязательно снимается полный резервный бэкап системы.</p>
          </div>
          <div>
            <h3 class="text-sm font-bold text-black mb-2">Казахстанская навигация с «Сергек»</h3>
            <p>Устанавливаются официальные версии 2GIS и Яндекс Навигатора с актуальной базой камер видеофиксации «Сергек», выделенных полос Bus Lane и ограничений скорости по всему Алматы и трассам Казахстана.</p>
          </div>
          <div>
            <h3 class="text-sm font-bold text-black mb-2">Официальная гарантия 12 месяцев</h3>
            <p>Вы получаете гарантийный талон с фиксацией выполненных работ. При выходе обновлений прошивки мы оказываем постоянную клиентскую поддержку и помогаем сохранить русский язык.</p>
          </div>
        </div>
      </div>

      <!-- Brand FAQ Accordion -->
      <div v-if="currentBrand.faqs && currentBrand.faqs.length" class="mb-16">
        <div class="mb-8">
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Вопросы и ответы</span>
          <h2 class="title-sm text-black mt-2">Часто задаваемые вопросы по русификации {{ currentBrand.name }}</h2>
        </div>
        <div class="border-t border-[#e5e5e5]">
          <div
            v-for="(f, i) in currentBrand.faqs"
            :key="i"
            class="border-b border-[#e5e5e5]"
          >
            <button
              @click="toggleBrandFaq(i)"
              type="button"
              class="w-full py-5 flex items-center justify-between text-left text-base font-medium text-black hover:text-[#f50537] transition-colors"
            >
              <span class="pr-6">{{ f.q }}</span>
              <span class="text-2xl font-light text-[#888888] shrink-0">
                {{ openFaq === i ? '−' : '+' }}
              </span>
            </button>
            <div
              v-show="openFaq === i"
              class="pb-5 text-sm text-[#555555] font-light leading-relaxed pr-6"
            >
              {{ f.a }}
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Booking CTA Banner -->
      <div class="bg-[#050608] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span class="text-xs font-semibold tracking-widest text-[#f50537] uppercase">Онлайн-запись</span>
          <h3 class="text-2xl font-bold text-white mt-1">Запишитесь на русификацию {{ currentBrand.name }} в Алматы</h3>
          <p class="text-xs text-[#aaaaaa] font-light mt-2 max-w-xl">
            Прием автомобилей ежедневно с 09:00 до 21:00 по предварительной записи. Фиксация стоимости перед началом работ.
          </p>
        </div>
        <div class="flex flex-wrap gap-4 shrink-0">
          <a
            :href="whatsappBrandUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            <span>Написать в WhatsApp</span>
            <span class="ml-2">→</span>
          </a>
          <a
            href="tel:+77772389939"
            class="btn btn-default"
          >
            <span>+7 (777) 238-99-39</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
