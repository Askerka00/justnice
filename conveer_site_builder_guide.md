# ConveerSites — Полный справочник для создания JSON-конфигурации сайта

Этот файл содержит ВСЮ необходимую информацию для того, чтобы создать JSON-конфигурацию нового сайта на платформе ConveerSites: архитектуру, компоненты, пропсы, картинки, темы, шрифты и готовые примеры.

---

## 1. АРХИТЕКТУРА

Сайты собираются из JSON-файла, который лежит в `public/data/{clientId}.json`.
Клиент определяется через:
- URL-путь: `https://conveer-sites.vercel.app/roofmax`
- Query-параметр: `?client=roofmax`
- Поддомен Vercel: `roofmax.conveer-sites.vercel.app`

Рендерится динамической страницей `app/pages/[client].vue`, которая загружает JSON и отображает компоненты в порядке, указанном в массиве `structure`.

---

## 2. КОРНЕВАЯ СТРУКТУРА JSON-ФАЙЛА

```json
{
  "theme": "emerald",
  "themeColor": "#15803d", // Произвольный цвет в формате HEX (приоритетнее параметра "theme")
  "font": "outfit",
  "badgeStyle": "pill",
  "meta": {
    "title": "Заголовок вкладки браузера (SEO title)",
    "description": "SEO-описание сайта для поисковых систем",
    "image": "/img/путь-к-og-картинке.png"
  },
  "structure": [
    {
      "component": "ИмяКомпонента",
      "props": { ... }
    }
  ]
}
```

### Поля `meta`:

| Поле | Тип | Описание |
|---|---|---|
| `title` | `String` | Заголовок вкладки + `og:title` + `twitter:title`. Отображается в превью ссылки в WhatsApp/Telegram |
| `description` | `String` | Мета-описание + `og:description` + `twitter:description`. Отображается в превью ссылки |
| `image` | `String` | Путь к OG-картинке (рекомендуемый размер: 1200×630px). Отображается в превью ссылки в WhatsApp/Telegram. Путь может быть абсолютный (`https://...`) или относительный (`/img/...`) — система автоматически добавит домен |

---

## 3. ЦВЕТА И ТЕМЫ (параметры `theme` и `themeColor`)

Задают основной цвет сайта через CSS-переменную `--color-primary`. Вы можете использовать готовые темы или задать свой цвет в формате HEX.

### 3.1 Произвольный HEX-цвет (Рекомендуемый способ)
Используйте параметр `"themeColor": "#HEX_КОД"` в корне JSON-файла. Это позволяет настроить уникальный цвет без изменения исходного кода CSS.
Система автоматически переведет HEX-код в формат RGB и применит его к стилям сайта.

Пример:
```json
"themeColor": "#d97706"
```

### 3.2 Готовые темы (параметр `theme`)
Если параметр `themeColor` не задан, применяется класс темы `.theme-{name}` на корневой контейнер.

| Значение `theme` | CSS-класс | RGB | Описание |
|---|---|---|---|
| `emerald` | `.theme-emerald` | `16 185 129` | Изумрудный (по умолчанию). Медицина, экология. |
| `blue` | `.theme-blue` | `59 130 246` | Синий. Технологии, IT. |
| `roofmax` | `.theme-roofmax` | `61 68 233` | Индиго. Строительство. |
| `orange` | `.theme-orange` | `249 115 22` | Оранжевый. Энергетика, доставка. |
| `red` | `.theme-red` | `239 68 68` | Красный. Промышленность. |
| `csp` | `.theme-csp` | `42 56 144` | Тёмно-синий. Стройматериалы. |

### Добавление новых CSS-тем (при необходимости)
Файл: `app/assets/css/main.css` — добавить ВНЕ директивы `@layer`:
```css
.theme-mycompany {
  --color-primary: R G B !important;
}
```

---

## 4. ШРИФТЫ И БЕЙДЖИ

### 4.1. ШРИФТЫ (параметр `font`)

| Значение | Результат |
|---|---|
| `outfit` | Шрифт Outfit (Google Fonts) — современный, геометрический |
| `sans` | Системный шрифт без засечек |

---

### 4.2. СТИЛИ БЕЙДЖЕЙ (параметр `badgeStyle`)

Задаёт единый стиль для всех секционных бейджей (`tagText`) на сайте. Это позволяет гармонично сочетать блоки из разных дизайн-семейств (например, Struct и Vital) на одной странице.

| Значение | Визуальный стиль | Семейство по умолчанию | Описание |
|---|---|---|---|
| `pill` | Закругленный (pill) c мягким полупрозрачным фоном | `Vital` | Современный, аккуратный скруглённый бэйдж |
| `sharp` | Прямоугольный с рамкой (sharp) | `Struct` | Строгий, индустриальный геометрический бэйдж |
| `dot` | Текст с круглой точкой слева | `Vital` (Services/Contact) | Минималистичный стиль |
| `wavy` | Текст с волнистой линией снизу | `Shine` | Элегантный стиль |

Если параметр `badgeStyle` не указан в корневом JSON, каждый блок использует свой собственный стиль по умолчанию (или стиль по умолчанию своего дизайн-семейства).

---

## 5. КОМПОНЕНТЫ И ИХ PROPS

### 5.1 `VitalHeaderBlock` — Липкая шапка сайта

Навигация, логотип и кнопка контакта. Прижимается к верху при скролле.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `logoText` | `String` | нет | Текстовое название компании |
| `logoImage` | `String` | нет | URL к логотипу (например `/img/logos/my-logo.png`). Если пусто — рендерится иконка + текст |
| `logoClass` | `String` | нет | CSS-класс для img логотипа (например `csp-logo-header` для инверсии цветов) |
| `hideLogoText` | `Boolean` | нет | `true` — скрыть текст логотипа, показывать только картинку |
| `buttonText` | `String` | нет | Текст CTA-кнопки. Если похоже на телефон — автоматически `tel:` ссылка |
| `buttonUrl` | `String` | нет | Принудительный URL кнопки (если не телефон) |
| `links` | `Array` | нет | Навигация: `[{ "label": "О нас", "url": "#about" }]` |

**Пример:**
```json
{
  "component": "VitalHeaderBlock",
  "props": {
    "logoText": "МояКомпания",
    "logoImage": "/img/logos/my-logo.png",
    "buttonText": "+7 777 123-45-67",
    "links": [
      { "label": "Главная", "url": "#" },
      { "label": "Услуги", "url": "#services" },
      { "label": "Контакты", "url": "#contacts" }
    ]
  }
}
```

---

### 5.2 `VitalHeroBlock` — Главный экран (Hero)

Первый экран сайта с УТП, рейтингом, CTA-кнопками, статистикой и большим изображением справа.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `ratingText` | `String` | нет | Оценка (например `"5.0"`) |
| `ratingCount` | `String` | нет | Текст под рейтингом (например `"Более 1500 клиентов"`) |
| `title` | `String` | **да** | Главный заголовок. Поддерживает `<br/>` для переноса строк |
| `subtitle` | `String` | нет | Описание-подзаголовок |
| `buttonText` | `String` | нет | Текст главной CTA-кнопки (WhatsApp) |
| `buttonUrl` | `String` | нет | Кастомный URL для CTA (если пусто — WhatsApp) |
| `whatsappPhone` | `String` | нет | Номер для WhatsApp (`77016404818` — без `+` и пробелов) |
| `watchVideoText` | `String` | нет | Текст второй кнопки |
| `watchVideoUrl` | `String` | нет | Ссылка второй кнопки (якорь `#services` и т.п.) |
| `statsValue` | `String` | нет | Числовая статистика (`"от 5 дней"`) |
| `statsLabel` | `String` | нет | Описание статистики |
| `heroImage` | `String` | нет | Изображение справа. Можно алиас: `"@construction/hero-site"` |

**Пример:**
```json
{
  "component": "VitalHeroBlock",
  "props": {
    "ratingText": "5.0",
    "ratingCount": "Более 10 лет опыта",
    "title": "Ремонт квартир<br/>под ключ в Алматы",
    "subtitle": "Выполняем все виды отделочных работ с гарантией качества.",
    "buttonText": "Рассчитать стоимость",
    "whatsappPhone": "77771234567",
    "watchVideoText": "Смотреть услуги",
    "watchVideoUrl": "#services",
    "statsValue": "от 7 дней",
    "statsLabel": "Сроки выполнения работ",
    "heroImage": "@construction/hero-modern"
  }
}
```

---

### 5.3 `VitalServicesBlock` — Сетка услуг / каталог товаров

Два режима: **карточки с картинками** (если указано `image`) и **иконочные карточки** (если указан `iconType`).

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Бэдж-надзаголовок (`"Каталог"`, `"Услуги"`) |
| `title` | `String` | нет | Заголовок секции |
| `whatsappPhone` | `String` | нет | Номер для заказов через WhatsApp |
| `services` | `Array` | **да** | Массив карточек (см. ниже) |

#### Формат элемента `services[]`:

**Вариант А — Карточка с картинкой:**
```json
{
  "title": "Название товара",
  "text": "Описание товара или услуги",
  "image": "@construction/card-tools",
  "badge": "Хит продаж",
  "linkText": "Заказать"
}
```

**Вариант Б — Иконочная карточка:**
```json
{
  "title": "Педиатрия",
  "text": "Описание услуги",
  "iconType": "pediatrics",
  "linkText": "Подробнее",
  "linkUrl": "#"
}
```

Доступные `iconType`: `"pediatrics"`, `"orthopedics"`, `"gastroenterology"`, `"neurology"`, `"cardiology"`, `"general"`.

---

### 5.4 `VitalContentBlock` — Универсальный текстово-графический блок

Двухколоночный блок: текст + картинка. Идеален для секций «О компании», «О технологии», «Преимущества».

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Бэдж сверху |
| `title` | `String` | нет | Заголовок |
| `text` | `String` | нет | HTML-текст. Поддерживает `<p>`, `<strong>`, `<ul>`, `<li>` и т.д. |
| `image` | `String` | нет | Изображение (алиас или URL) |
| `imagePosition` | `String` | нет | `"left"` или `"right"` (по умолчанию `"right"`) |
| `features` | `Array` | нет | Список преимуществ с галочками |
| `buttonText` | `String` | нет | Текст CTA-кнопки |
| `buttonUrl` | `String` | нет | Ссылка кнопки (если пусто — WhatsApp) |
| `whatsappPhone` | `String` | нет | Номер для WhatsApp |

#### Формат `features[]`:

**Простой (строки):**
```json
"features": ["Быстрый монтаж", "Гарантия 10 лет", "Экологичный материал"]
```

**Расширенный (объекты с кастомными иконками):**
```json
"features": [
  { "text": "Быстрый монтаж", "icon": "lucide:zap" },
  { "text": "Гарантия 10 лет", "icon": "lucide:shield-check" }
]
```

**Пример полного блока:**
```json
{
  "component": "VitalContentBlock",
  "props": {
    "tagText": "О компании",
    "title": "Почему выбирают нас",
    "text": "<p>Мы работаем на рынке <strong>более 15 лет</strong> и выполнили свыше 2000 проектов.</p>",
    "image": "@construction/hero-modern",
    "imagePosition": "left",
    "features": [
      "Собственное производство",
      "Гарантия от 5 лет",
      "Бесплатный замер"
    ],
    "buttonText": "Узнать подробнее",
    "whatsappPhone": "77771234567"
  }
}
```

> **Совет:** чередуйте `imagePosition` между блоками (`"left"` → `"right"` → `"left"`) для визуального разнообразия.

---

### 5.5 `VitalGalleryBlock` — Галерея изображений

Сетка из карточек с фото и hover-эффектами.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `title` | `String` | нет | Заголовок секции |
| `subtitle` | `String` | нет | Подзаголовок |
| `images` | `Array` | **да** | Массив изображений |

#### Формат `images[]`:
```json
{
  "url": "@construction/hero-aerial",
  "title": "Наш объект на ул. Абая"
}
```

**Пример:**
```json
{
  "component": "VitalGalleryBlock",
  "props": {
    "title": "Наши работы",
    "subtitle": "Примеры выполненных проектов",
    "images": [
      { "url": "@construction/hero-aerial", "title": "ЖК Алтын Орда" },
      { "url": "@construction/hero-site", "title": "ТРЦ Mega" },
      { "url": "@construction/hero-modern", "title": "Частный дом" }
    ]
  }
}
```

---

### 5.6 `VitalMapContactBlock` — Контакты с картой

Двухколоночный блок: слева контакты/график, справа — Яндекс.Карты iframe с табами для двух точек.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `title` | `String` | нет | Заголовок секции |
| `phone` | `String` | нет | Телефон для звонков |
| `whatsapp` | `String` | нет | Номер WhatsApp |
| `whatsappMessage` | `String` | нет | Текст первого сообщения в WhatsApp |
| `boutiqueTabName` | `String` | нет | Текст вкладки первой точки |
| `boutiqueTitle` | `String` | нет | Название первой точки |
| `boutiqueAddress` | `String` | нет | Адрес первой точки |
| `boutiqueMapLink` | `String` | нет | Ссылка на 2GIS/Google Maps |
| `boutiqueMapIframe` | `String` | нет | URL виджета Яндекс.Карт (iframe src) |
| `warehouseTabName` | `String` | нет | Текст вкладки второй точки |
| `warehouseTitle` | `String` | нет | Название второй точки |
| `warehouseAddress` | `String` | нет | Адрес второй точки |
| `warehouseMapLink` | `String` | нет | Ссылка на карту второй точки |
| `warehouseMapIframe` | `String` | нет | URL iframe второй точки |
| `workHoursWeekdays` | `String` | нет | Часы Пн-Пт (по умолчанию `"09:00 - 18:00"`) |
| `workHoursSaturday` | `String` | нет | Часы Сб (по умолчанию `"10:00 - 15:00"`) |
| `workHoursSunday` | `String` | нет | Часы Вс (по умолчанию `"Выходной"`) |

**Как получить iframe Яндекс.Карт:**
1. Открой https://yandex.ru/maps
2. Найди адрес
3. Нажми «Поделиться» → «Код для вставки»
4. Из тега `<iframe src="...">` скопируй URL (только значение `src`)

---

### 5.7 `VitalContactBlock` — Форма обратной связи

Форма с полями: Имя, Email, Телефон, Дата, Сообщение + рейтинг снизу.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Бэдж (`"Быстрая связь"`) |
| `title` | `String` | нет | Заголовок формы |
| `subtitle` | `String` | нет | Описание под заголовком |
| `submitText` | `String` | нет | Текст кнопки отправки |
| `ratingText` | `String` | нет | Оценка (`"5.0"`) |
| `ratingCount` | `String` | нет | Текст рейтинга (`"Более 500 клиентов"`) |

---

### 5.8 `VitalFooterBlock` — Подвал сайта

Логотип, описание, колонки ссылок, контакты, копирайт.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `logoText` | `String` | нет | Текст логотипа |
| `logoImage` | `String` | нет | URL картинки логотипа |
| `logoClass` | `String` | нет | CSS-класс для img логотипа |
| `description` | `String` | нет | Описание компании |
| `buttonText` | `String` | нет | Текст кнопки (`"Написать в WhatsApp"`) |
| `copyright` | `String` | нет | Текст копирайта |
| `subscriptionTitle` | `String` | нет | Заголовок блока контактов |
| `subscriptionText` | `String` | нет | Текст контактов/подписки |
| `linkColumns` | `Array` | нет | Колонки ссылок (см. ниже) |

#### Формат `linkColumns[]`:
```json
"linkColumns": [
  {
    "title": "Услуги",
    "links": [
      { "label": "Ремонт кровли", "url": "#services" },
      { "label": "Утепление", "url": "#services" }
    ]
  },
  {
    "title": "Контакты",
    "links": [
      { "label": "+7 777 123-45-67", "url": "tel:+77771234567" },
      { "label": "WhatsApp", "url": "https://wa.me/77771234567" }
    ]
  }
]
```

---

### 5.9 `CoverHeroBlock` — Полноэкранный главный экран (со встроенной шапкой и формой)

Премиальный полноэкранный главный экран со встроенной стеклянной шапкой (Glassmorphism), УТП, рейтингом с аватарами клиентов и формой захвата контактов.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `logoText` | `String` | нет | Название компании в шапке (по умолчанию `"Gardener"`) |
| `logoImage` | `String` | нет | Картинка логотипа. Если задана, отображается вместо/вместе с текстом |
| `logoIcon` | `String` | нет | Иконка (символ вроде `"🌿"` или иконка Iconify, например, `"lucide:wrench"`) |
| `logoClass` | `String` | нет | CSS-класс для логотипа (например, для инверсии цветов) |
| `hideLogoText` | `Boolean` | нет | `true` — скрыть текст логотипа (показывать только картинку) |
| `headerButtonText` | `String` | нет | Текст кнопки действия в шапке |
| `headerButtonUrl` | `String` | нет | Ссылка кнопки шапки. Если пуста — ссылка на WhatsApp |
| `whatsappPhone` | `String` | нет | Номер для WhatsApp кнопок (без `+` и пробелов, например `"77016404818"`) |
| `links` | `Array` | нет | Ссылки навигации: `[{ "label": "О нас", "url": "#about" }]` |
| `title` | `String` | **да** | Главный заголовок (поддерживает `<br/>`) |
| `subtitle` | `String` | нет | Подзаголовок (описание услуг/преимуществ) |
| `backgroundImage` | `String` | нет | Фоновое изображение (алиас или URL, например `"@construction/hero-modern"`) |
| `ratingText` | `String` | нет | Текст оценки рейтинга (например `"Оценка 4.9 на основе 150+ отзывов"`) |
| `avatars` | `Array` | нет | Массив аватарок пользователей для блока рейтинга |
| `showForm` | `Boolean` | нет | `true` — показывать форму обратной связи справа (по умолчанию `true`) |
| `formTitle` | `String` | нет | Заголовок формы захвата |
| `formButtonText` | `String` | нет | Текст кнопки отправки формы |
| `showEmailField` | `Boolean` | нет | Показывать ли поле Email в форме |
| `isEmailFieldRequired` | `Boolean` | нет | Обязательно ли поле Email |
| `showSelectField` | `Boolean` | нет | Показывать ли выпадающий список выбора (select) |
| `formSelectPlaceholder` | `String` | нет | Плейсхолдер селекта (например, `"Выберите услугу..."`) |
| `formSelectOptions` | `Array` | нет | Массив вариантов выбора в селекте |

**Пример:**
```json
{
  "component": "CoverHeroBlock",
  "props": {
    "logoText": "Garant Invest",
    "logoImage": "/img/logos/garant-logo.png",
    "logoClass": "csp-logo-header",
    "headerButtonText": "Заказать звонок",
    "whatsappPhone": "77771234567",
    "links": [
      { "label": "Главная", "url": "#" },
      { "label": "О нас", "url": "#about" },
      { "label": "Услуги", "url": "#services" },
      { "label": "Контакты", "url": "#contacts" }
    ],
    "title": "Инвестиции в недвижимость<br/>с гарантией доходности",
    "subtitle": "Обеспечьте стабильный пассивный доход с надежным партнером на рынке Казахстана.",
    "backgroundImage": "@factory/hero-bright-factory",
    "ratingText": "Более 500 успешных инвесторов",
    "avatars": [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
    ],
    "showForm": true,
    "formTitle": "Получить инвестиционный план",
    "formButtonText": "Получить план бесплатно",
    "showEmailField": true,
    "isEmailFieldRequired": false,
    "showSelectField": true,
    "formSelectPlaceholder": "Сумма инвестиций...",
    "formSelectOptions": [
      "До 5 000 000 ₸",
      "От 5 000 000 до 20 000 000 ₸",
      "Свыше 20 000 000 ₸"
    ]
  }
}
```

---

### 5.10 `StructHeroBlock` — Строительный/структурный главный экран

Строгий промышленно-строительный главный экран с сеткой навигатора (разделители в виде тонких линий), крупным заголовком, теглайном с квадратным маркером и блоком статистики из двух колонок.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `backgroundImage` | `String` | нет | Фоновое изображение (алиас или URL, по умолчанию `/img/construction/hero-site.jpeg`) |
| `hideHeader` | `Boolean` | нет | Скрывает встроенную шапку навигатора, если блок используется совместно с внешним `VitalHeaderBlock` |
| `logoTextMain` | `String` | нет | Название компании (крупный жирный шрифт в логотипе) |
| `logoTextSub` | `String` | нет | Подзаголовок логотипа (мелкий шрифт под основным названием) |
| `buttonText` | `String` | нет | Текст кнопки действия (по умолчанию `"Contact Us"`) |
| `buttonUrl` | `String` | нет | Кастомный URL для кнопки действия. Если пусто — ссылка на WhatsApp |
| `whatsappPhone` | `String` | / | Номер для WhatsApp (без `+` и пробелов, например `"77016404818"`) |
| `tagText` | `String` | нет | Маленький надзаголовок над УТП с квадратным маркером |
| `title` | `String` | **да** | Главный заголовок (поддерживает `<br/>` для переноса строк) |
| `links` | `Array` | нет | Ссылки навигации: `[{ "label": "О нас", "url": "#about", "hasDropdown": false }]` |
| `statsValueLeft` | `String` | нет | Значение первой колонки статистики (например, `"15+"`) |
| `statsLabelLeft` | `String` | нет | Описание первой колонки статистики |
| `statsValueRight` | `String` | / | Значение второй колонки статистики (например, `"300+"`) |
| `statsLabelRight` | `String` | нет | Описание второй колонки статистики |

**Пример:**
```json
{
  "component": "StructHeroBlock",
  "props": {
    "backgroundImage": "@construction/hero-site",
    "logoTextMain": "BuildPro",
    "logoTextSub": "Construction",
    "tagText": "Строительная компания №1 в Казахстане",
    "title": "Строим будущее,<br/>кирпич за кирпичом",
    "buttonText": "Связаться в WhatsApp",
    "whatsappPhone": "77016404818",
    "links": [
      { "label": "О компании", "url": "#about", "hasDropdown": false },
      { "label": "Проекты", "url": "#projects", "hasDropdown": false },
      { "label": "Услуги", "url": "#services", "hasDropdown": false }
    ],
    "statsValueLeft": "15+",
    "statsLabelLeft": "Лет опыта",
    "statsValueRight": "300+",
    "statsLabelRight": "Проектов выполнено"
  }
}
```

---

### 5.11 `StructFeaturesBlock` — Асимметричный блок преимуществ

Минималистичный блок преимуществ с прямоугольным бэджем, крупным заголовком, схематичным линейным артом зданий на фоне и асимметричной сеткой карточек. Фон кружка за иконкой автоматически адаптируется под цвет текущей темы (`bg-primary/15`).

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Текст прямоугольного бэджа в левой колонке (по умолчанию `"About Buildpro"`) |
| `title` | `String` | **да** | Главный заголовок секции преимуществ |
| `features` | `Array` | **да** | Список карточек преимуществ (структура элемента приведена ниже) |

#### Формат элемента `features[]`:
```json
{
  "iconType": "history",
  "title": "Заголовок карточки",
  "text": "Описание преимущества"
}
```

*Доступные `iconType`:*
- `"history"` — иконка здания/истории (встроенный SVG).
- Любое другое строковое значение (например, `"mission"`, `"values"`) — отображает дефолтную иконку здания (встроенный SVG).
- Кастомная иконка Iconify (например, `"lucide:shield-check"` или `"material-symbols:build"`) — рендерит иконку из библиотеки Nuxt Icon.

**Пример:**
```json
{
  "component": "StructFeaturesBlock",
  "props": {
    "tagText": "О компании Buildpro",
    "title": "Строительные услуги экспертного уровня для жилых, коммерческих и промышленных объектов",
    "features": [
      {
        "iconType": "history",
        "title": "Наша история",
        "text": "Основанная в 2015 году, компания Buildpro начиналась как небольшой семейный бизнес."
      },
      {
        "iconType": "mission",
        "title": "Наша миссия",
        "text": "Наша миссия — предоставлять строительные услуги высочайшего качества."
      },
      {
        "iconType": "lucide:shield-check",
        "title": "Наши ценности",
        "text": "Мы стремимся использовать материалы высочайшего качества и самые современные технологии."
      }
    ]
  }
}
### 5.12 `StructProjectsBlock` — Блок портфолио/проектов в индустриальном стиле

Темный блок для демонстрации выполненных проектов, портфолио или кейсов с поддержкой сетки из 3-х колонок, интерактивным эффектом увеличения картинок при наведении и метками местоположения.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Текст бэджа над заголовком (по умолчанию `"Selected Projects"`) |
| `title` | `String` | нет | Главный заголовок секции (по умолчанию `"Explore our valuable clients."`) |
| `seeAllText` | `String` | нет | Текст ссылки перехода ко всем проектам. Если не задан или пуст, ссылка скрывается (по умолчанию `"See All Projects"`) |
| `seeAllUrl` | `String` | нет | URL для ссылки "Смотреть все" (по умолчанию `"#"` ) |
| `projects` | `Array` | да | Массив объектов проектов (структура элемента приведена ниже) |

#### Формат элемента `projects[]`:
```json
{
  "location": "Алматы, Казахстан",
  "name": "Жилой комплекс Алатау",
  "image": "@construction/hero-building",
  "url": "#"
}
```

**Пример:**
```json
{
  "component": "StructProjectsBlock",
  "props": {
    "tagText": "Наши проекты",
    "title": "Реализованные строительные объекты высокого уровня надежности",
    "seeAllText": "Все проекты",
    "seeAllUrl": "#projects",
    "projects": [
      {
        "location": "Алматы, Казахстан",
        "name": "Жилой комплекс Алатау",
        "image": "@construction/hero-building",
        "url": "#"
      },
      {
        "location": "Нур-Султан, Казахстан",
        "name": "Бизнес-центр Премиум",
        "image": "@construction/hero-site",
        "url": "#"
      },
      {
        "location": "Караганда, Казахстан",
        "name": "Промышленный складской терминал",
        "image": "@construction/hero-aerial",
        "url": "#"
      }
    ]
  }
}
```

---

### 5.13 `StructConcretePriceBlock` — Прайс-лист продукции с вкладками (табами)

Специализированный блок прайс-листа строительных смесей (бетона, раствора) и ЖБИ изделий. Позволяет объединить товары по категориям и переключать их с помощью вкладок (табов).

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `title` | `String` | нет | Главный заголовок секции (по умолчанию `"ПРАЙС-ЛИСТ ПРОДУКЦИИ"`) |
| `buttonText` | `String` | нет | Текст на кнопке заказа (по умолчанию `"ЗАКАЗАТЬ"`) |
| `whatsappPhone` | `String` | нет | Телефон для генерации ссылки WhatsApp заказа |
| `categories` | `Array` | да | Список категорий товаров с их карточками (структура ниже) |

#### Формат элемента `categories[]`:
```json
{
  "name": "Название таба (например, 'Бетон')",
  "items": [
    {
      "title": "Марка (например, 'M-300')",
      "subtitle": "Класс прочности (например, 'B22.5')",
      "badge": "Метка (например, 'Хит')",
      "specs": ["Прочность: B22.5", "Морозостойкость: F200"],
      "price": "от 22 500 ₸/м³"
    }
  ]
}
```

---

### 5.14 `StructVehicleListRowsBlock` — Каталог спецтехники/услуг в виде строк

Вертикальный список спецтехники или оборудования, где каждая позиция представлена в виде горизонтальной строки на десктопе (картинка слева, характеристики в центре, цена и кнопка справа) и карточки на мобильных устройствах.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `title` | `String` | нет | Главный заголовок каталога (по умолчанию `"НАШ АВТОПАРК ТЕХНИКИ"`) |
| `buttonText` | `String` | нет | Текст кнопки заказа (по умолчанию `"ЗАКАЗАТЬ"`) |
| `whatsappPhone` | `String` | нет | Телефон WhatsApp для отправки заказа |
| `items` | `Array` | да | Список карточек спецтехники (структура ниже) |

#### Формат элемента `items[]`:
```json
{
  "title": "Название (например, 'Автокран XCMG 25 тонн')",
  "description": "Описание назначения и условий применения",
  "specs": ["Грузоподъемность: 25 т", "Длина стрелы: 39.5 м"],
  "price": "от 15 000 ₸/час",
  "image": "Алиас или URL изображения техники"
}
```

---

### 5.15 `StructStepsBlock` — Цепочка этапов работы (Схема работы)

Блок визуализации процесса работы (шаг за шагом) на фоновом цвете темы или темном фоне. На десктопе шаги объединяются в горизонтальную цепочку с пунктирными стрелками-соединителями, на мобильных выстраиваются вертикально.

| Свойство | Tip | Обязательно | Описание |
|---|---|---|---|
| `title` | `String` | нет | Заголовок схемы работы (по умолчанию `"СХЕМА НАШЕЙ РАБОТЫ"`) |
| `id` | `String` | нет | HTML ID секции (по умолчанию `"steps"`) |
| `isDark` | `Boolean` | нет | Включает темный фон (`true`) вместо основного цвета темы (`false`) |
| `steps` | `Array` | да | Массив шагов работы (структура ниже) |

#### Формат элемента `steps[]`:
```json
{
  "icon": "Имя иконки Iconify (например, 'lucide:phone-call')",
  "title": "Заголовок этапа (например, 'Заявка или звонок')",
  "text": "Описание действий на этапе"
}
```

---

### 5.16 `StructFooterBlock` — Индустриальный подвал сайта с CTA-секцией и лайн-артом

Премиальный темный подвал в индустриальном стиле, содержащий верхнюю CTA-панель с кнопкой действия и векторной иллюстрацией зданий (лайн-арт), а также нижнюю сетку ссылок и контактов на 4 колонки.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `ctaTitle` | `String` | нет | Заголовок CTA-блока (например, `"Looking to expand your long-term<br/>rental business?"`) |
| `ctaButtonText` | `String` | нет | Текст кнопки действия (например, `"GET A QUOTE"`) |
| `ctaButtonUrl` | `String` | нет | Ссылка кнопки (если пусто — WhatsApp) |
| `logoTextMain` | `String` | нет | Название компании в логотипе (крупный шрифт) |
| `logoTextSub` | `String` | нет | Подпись логотипа (мелкий шрифт) |
| `description` | `String` | нет | Краткое описание компании под логотипом |
| `addressTitle` | `String` | нет | Заголовок секции адреса (по умолчанию `"CONTACT INFO"`) |
| `addressText` | `String` | нет | Текст адреса |
| `assistanceTitle` | `String` | нет | Заголовок контактов помощи (по умолчанию `"LOOKING FOR EXPEDITED ASSISTANCE?"`) |
| `email` | `String` | нет | Контактный email |
| `phone` | `String` | нет | Контактный телефон |
| `pagesTitle` | `String` | нет | Заголовок колонки страниц (по умолчанию `"PAGES"`) |
| `pagesLinks` | `Array` | нет | Набор ссылок на страницы: `[{ "label": "About Us", "url": "#about" }]` |
| `utilityTitle` | `String` | нет | Заголовок колонки утилит (по умолчанию `"UNITY"`) |
| `utilityLinks` | `Array` | нет | Набор ссылок на доп. страницы: `[{ "label": "Privacy Policy", "url": "#privacy" }]` |
| `copyright` | `String` | нет | Текст копирайта в самом низу |

**Пример:**
```json
{
  "component": "StructFooterBlock",
  "props": {
    "ctaTitle": "Looking to expand your long-term<br/>rental business?",
    "ctaButtonText": "GET A QUOTE",
    "ctaButtonUrl": "#contacts",
    "logoTextMain": "BUILDPRO",
    "logoTextSub": "CONSTRUCTION",
    "description": "Expert Construction Services for Residential, Commercial, and Industrial Projects.",
    "addressTitle": "CONTACT INFO",
    "addressText": "3517 W. Gray St., Utica, Pennsylvania 57867",
    "assistanceTitle": "LOOKING FOR EXPEDITED ASSISTANCE?",
    "email": "hello@example.io",
    "phone": "(225) 555-0118",
    "pagesTitle": "PAGES",
    "pagesLinks": [
      { "label": "About Us", "url": "#about" },
      { "label": "Projects", "url": "#projects" }
    ],
    "utilityTitle": "UNITY",
    "utilityLinks": [
      { "label": "Privacy Policy", "url": "#privacy" },
      { "label": "Terms & Conditions", "url": "#terms" }
    ]
  }
}
```

---

### 5.17 `StructArticlesBlock` — Сетка последних статей/новостей в минималистичном стиле

Секция с белым фоном для вывода новостей или статей блога. Состоит из верхнего заголовка с бэджем и CTA-кнопкой (на десктопе выстраивается в одну линию) и сетки карточек на 2 колонки.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `bgColor` | `String` | нет | Цвет фона секции (по умолчанию `"#ffffff"`) |
| `textColor` | `String` | нет | Основной цвет текста (по умолчанию `"#09090b"`) |
| `secondaryTextColor` | `String` | нет | Второстепенный цвет текста (по умолчанию `"#71717a"`) |
| `buttonBgColor` | `String` | нет | Цвет фона CTA-кнопки (по умолчанию `"#09090b"`) |
| `buttonTextColor` | `String` | нет | Цвет текста CTA-кнопки (по умолчанию `"#ffffff"`) |
| `tagText` | `String` | нет | Текст прямоугольного бэджа над заголовком (по умолчанию `"NEWS"`) |
| `title` | `String` | нет | Главный заголовок секции (по умолчанию `"Latest Articles"`) |
| `seeAllText` | `String` | нет | Текст CTA-кнопки справа (по умолчанию `"MORE ARTICLES"`) |
| `seeAllUrl` | `String` | нет | Ссылка для CTA-кнопки (по умолчанию `"#"` ) |
| `articles` | `Array` | да | Массив объектов статей (структура элемента ниже) |

#### Формат элемента `articles[]`:
```json
{
  "title": "Заголовок статьи",
  "date": "Дата публикации (например, 'SEP 29, 2025')",
  "category": "Категория статьи (например, 'SUSTAINABILITY')",
  "image": "Путь или медиа-алиас к картинке (например, '@construction/hero-building')",
  "url": "Ссылка на полную статью (по умолчанию '#')"
}
```

**Пример:**
```json
{
  "component": "StructArticlesBlock",
  "props": {
    "tagText": "NEWS",
    "title": "Latest Articles",
    "seeAllText": "MORE ARTICLES",
    "seeAllUrl": "#blog",
    "articles": [
      {
        "title": "The Future of Eco-Friendly Building Practices",
        "date": "SEP 29, 2025",
        "category": "SUSTAINABILITY",
        "image": "@construction/hero-building",
        "url": "#"
      },
      {
        "title": "Pointers for a Flourishing Home Improvement Project",
        "date": "SEP 29, 2025",
        "category": "HOME IMPROVEMENT",
        "image": "@construction/hero-renovation",
        "url": "#"
      }
    ]
  }
}
```

---

### 5.18 `StructContactBlock` — Форма обратной связи на мятном фоне с графическим лайн-артом

Компонент формы генерации лидов. Содержит левую текстовую колонку с бэджем, крупным заголовком и описанием (на заднем плане выводится полупрозрачный лайн-арт строительного крана и конструкции), а также правую колонку с белой карточкой формы, содержащей поля: Имя, Фамилия, Email, Телефон, Сообщение и кнопку отправки.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `bgColor` | `String` | нет | Цвет фона секции (по умолчанию `"#dce8d7"`) |
| `textColor` | `String` | нет | Цвет заголовков и текстов (по умолчанию `"#09090b"`) |
| `secondaryTextColor` | `String` | нет | Цвет описания (по умолчанию `"#4b5563"`) |
| `tagText` | `String` | нет | Текст бэджа над заголовком (по умолчанию `"LET'S WORK TOGETHER"`) |
| `title` | `String` | нет | Заголовок секции (по умолчанию `"Ready to Build Your Dream Project?"`) |
| `description` | `String` | нет | Краткое описание компании под заголовком |
| `cardTitle` | `String` | нет | Заголовок внутри карточки формы (по умолчанию `"Get in touch with us today!"`) |
| `submitButtonText` | `String` | нет | Текст кнопки отправки (по умолчанию `"SEND A MESSAGE"`) |
| `submitButtonBgColor` | `String` | нет | Цвет фона кнопки (по умолчанию `"#09090b"`) |
| `submitButtonTextColor` | `String` | нет | Цвет текста кнопки (по умолчанию `"#ffffff"`) |

**Пример:**
```json
{
  "component": "StructContactBlock",
  "props": {
    "bgColor": "#dce8d7",
    "textColor": "#09090b",
    "secondaryTextColor": "#4b5563",
    "tagText": "LET'S WORK TOGETHER",
    "title": "Ready to Build Your Dream Project?",
    "description": "Whether you have a clear vision or need guidance to bring your ideas to life, Buildpro is here to help. Let's collaborate to create something extraordinary.",
    "cardTitle": "Get in touch with us today!",
    "submitButtonText": "SEND A MESSGES",
    "submitButtonBgColor": "#09090b",
    "submitButtonTextColor": "#ffffff"
  }
}
```

---

### 5.19 `StructFaqBlock` — Секция часто задаваемых вопросов (FAQ) с аккордеоном

Интерактивный блок вопросов и ответов. Содержит левую колонку с бэджем, заголовком секции и дополнительными контактами помощи, а также правую колонку с раскрывающимися вопросами (аккордеоном). При клике на вопрос плавно раскрывается блок с ответом, а иконка `+` поворачивается на 45 градусов.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `bgColor` | `String` | нет | Цвет фона секции (по умолчанию `"#ffffff"`) |
| `textColor` | `String` | нет | Цвет заголовков и текстов (по умолчанию `"#09090b"`) |
| `secondaryTextColor` | `String` | нет | Цвет ответов и описаний (по умолчанию `"#4b5563"`) |
| `borderColor` | `String` | нет | Цвет линий разделителей (по умолчанию `"rgba(9, 9, 11, 0.1)"`) |
| `tagText` | `String` | нет | Текст бэджа над заголовком (по умолчанию `"FAQ"`) |
| `title` | `String` | нет | Заголовок секции (по умолчанию `"Frequently Asked Questions"`) |
| `sidebarTitle` | `String` | нет | Заголовок контактов помощи в левой колонке (по умолчанию `"You have different questions?"`) |
| `sidebarText` | `String` | нет | Описание контактов помощи |
| `sidebarCallText` | `String` | нет | Текст ссылки телефона (по умолчанию `"Call us : +1 (123) 456 7890"`) |
| `sidebarCallUrl` | `String` | нет | Ссылка телефона (например, `"tel:+11234567890"`) |
| `faqItems` | `Array` | да | Массив объектов вопросов/ответов (по умолчанию содержит 9 стандартных элементов) |

#### Формат элемента `faqItems[]`:
```json
{
  "question": "Текст вопроса",
  "answer": "Подробный ответ на вопрос"
}
```

**Пример:**
```json
{
  "component": "StructFaqBlock",
  "props": {
    "tagText": "FAQ",
    "title": "Frequently Asked Questions",
    "sidebarTitle": "You have different questions?",
    "sidebarText": "Our team will answer all your questions; we ensure a quick response.",
    "sidebarCallText": "Call us : +1 (123) 456 7890",
    "sidebarCallUrl": "tel:+11234567890"
  }
}
```

---

### 5.20 `ShineHeaderBlock` — Шапка в стиле ShineEase с верхней контактной полосой

Шапка с верхней контактной полосой яркого цвета и основным меню, логотипом и кнопкой обратной связи.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `phone` | `String` | нет | Номер телефона (по умолчанию `"+65 256-8625"`) |
| `workingHours` | `String` | нет | Часы работы (по умолчанию `"8.00AM - 7.00pm"`) |
| `serviceAreaText` | `String` | нет | Текст ссылки зоны обслуживания (по умолчанию `"Find Service Area"`) |
| `serviceAreaUrl` | `String` | нет | Ссылка на зону обслуживания (по умолчанию `"#locations"`) |
| `bgColor` | `String` | нет | Цвет фона основного меню (по умолчанию `"#0B4A3A"`) |
| `topBarBgColor` | `String` | нет | Цвет фона верхней полосы (по умолчанию `"#b0f53c"`) |
| `topBarTextColor` | `String` | нет | Цвет текста верхней полосы (по умолчанию `"#0B4A3A"`) |
| `logoText` | `String` | нет | Текст логотипа (по умолчанию `"ShineEase"`) |
| `menuItems` | `Array` | нет | Список пунктов меню с дочерними элементами |
| `ctaText` | `String` | нет | Текст кнопки призыва к действию (по умолчанию `"Let's talk"`) |
| `ctaUrl` | `String` | нет | Ссылка для кнопки призыва к действию (по умолчанию `"#contact"`) |

---

### 5.21 `ShineHeroBlock` — Главный экран в стиле ShineEase с карточкой клинера

Главный экран для клинингового сервиса с ярким заголовком, подчеркнутым рукописной линией, кнопками CTA, доверительными бейджами и карточкой сотрудника с оверлеем клиентов.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `bgColor` | `String` | нет | Цвет фона (по умолчанию `"#0B4A3A"`) |
| `textColor` | `String` | нет | Цвет текста (по умолчанию `"#ffffff"`) |
| `accentColor` | `String` | нет | Акцентный цвет (по умолчанию `"#b0f53c"`) |
| `subtitle` | `String` | нет | Текст описания |
| `ctaText` | `String` | нет | Текст кнопки (по умолчанию `"Book an Appointment"`) |
| `ctaUrl` | `String` | нет | Ссылка для кнопки (по умолчанию `"#booking"`) |
| `phoneLabel` | `String` | нет | Подпись телефона (по умолчанию `"Any time call"`) |
| `phoneValue` | `String` | нет | Номер телефона (по умолчанию `"+1-307-285-7290"`) |
| `imageUrl` | `String` | нет | Путь к изображению (по умолчанию `"/img/cleaning/cleaner_hero.png"`) |
| `imageCardBgColor` | `String` | нет | Цвет фона карточки (по умолчанию `"#dbe7d6"`) |
| `statsNumber` | `String` | нет | Число статистики (по умолчанию `"50K+"`) |
| `statsLabel` | `String` | нет | Подпись статистики (по умолчанию `"Satisfied Customer"`) |
| `trustBadgeStyle` | `String` | нет | Стиль отрисовки звездочек: `"squares"` (звезды в цветных квадратах) или `"stars"` (обычные звезды без подложки). По умолчанию `"squares"`. |
| `trustBadges` | `Array` | нет | Массив доверительных бейджей (Trustpilot, Capterra, 2GIS, Google, Yandex) |

#### Формат элемента `trustBadges[]`:
```json
{
  "type": "trustpilot",
  "name": "Trustpilot",
  "label": "Always 4.8 Star",
  "starsCount": 5
}
```
Доступные типы `type`: `"trustpilot"`, `"capterra"`, `"2gis"`, `"google"`, `"yandex"`

---

### 5.22 `ShineClientsBlock` — Бесконечная бегущая строка с логотипами клиентов

Блок отображения логотипов партнеров или клиентов в виде бесконечно движущейся карусели с эффектом размытия краев.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `title` | `String` | нет | Заголовок над строкой (по умолчанию `"Our Exceptional Clients"`) |
| `bgColor` | `String` | нет | Цвет фона (по умолчанию `"#ffffff"`) |
| `textColor` | `String` | нет | Цвет текста заголовка (по умолчанию `"#0B4A3A"`) |
| `speed` | `String` | нет | Скорость прокрутки (по умолчанию `"25s"`) |

---

### 5.23 `ShineWhyChooseUsBlock` — Преимущества с перекрывающимися карточками изображений

Секция преимуществ с заголовком, описанием, списком из 4 иконочных фич (2x2 grid) и двумя перекрывающимися скругленными изображениями на левой стороне.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `bgColor` | `String` | нет | Цвет фона (по умолчанию `"#ffffff"`) |
| `textColor` | `String` | нет | Цвет текстов (по умолчанию `"#0B4A3A"`) |
| `accentColor` | `String` | нет | Акцентный цвет для волнистой линии под бэджем (по умолчанию `"#b0f53c"`) |
| `tagText` | `String` | нет | Текст бэджа (по умолчанию `"WHY CHOOSE US"`) |
| `title` | `String` | нет | Главный заголовок (по умолчанию `"Why Clients Love Our Cleaning Services"`) |
| `description` | `String` | нет | Текст описания под заголовком |
| `learnMoreText` | `String` | нет | Текст ссылки (по умолчанию `"Learn more"`) |
| `learnMoreUrl` | `String` | нет | URL ссылки (по умолчанию `"#about"`) |
| `phoneValue` | `String` | нет | Номер телефона (по умолчанию `"+1-307-285-7290"`) |
| `imageLargeUrl` | `String` | нет | Большая картинка (по умолчанию `"/img/cleaning/why_large.png"`) |
| `imageSmallUrl` | `String` | нет | Маленькая перекрывающая картинка (по умолчанию `"/img/cleaning/why_small.png"`) |
| `featuresList` | `Array` | нет | Массив 4 объектов фич: `{ title, subtitle, iconType }` |

---

### 5.24 `ShineAboutUsBlock` — Раздел о компании в стиле ShineEase со статистикой

Раздел "О нас" с заголовком, описанием, кнопкой, сеткой из 3 элементов статистики на левой стороне и двумя перекрывающимися изображениями на правой стороне.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `bgColor` | `String` | нет | Цвет фона (по умолчанию `"#ffffff"`) |
| `textColor` | `String` | нет | Цвет текстов (по умолчанию `"#0B4A3A"`) |
| `accentColor` | `String` | нет | Акцентный цвет для волнистой линии под бэджем (по умолчанию `"#b0f53c"`) |
| `tagText` | `String` | нет | Текст бэджа (по умолчанию `"WHO WE ARE"`) |
| `title` | `String` | нет | Главный заголовок (по умолчанию `"Why Thousands Trust Us for Spotless Clean"`) |
| `description` | `String` | net | Текст описания под заголовком |
| `aboutText` | `String` | нет | Текст кнопки (по умолчанию `"About us"`) |
| `aboutUrl` | `String` | нет | Ссылка кнопки (по умолчанию `"#about"`) |
| `imageLargeUrl` | `String` | нет | Большая картинка (по умолчанию `"/img/cleaning/about_large.png"`) |
| `imageSmallUrl` | `String` | нет | Маленькая перекрывающая картинка (по умолчанию `"/img/cleaning/about_small.png"`) |
| `stats` | `Array` | нет | Массив 3 объектов статистики: `{ value, label }` |

---

### 5.25 `StructWhyChooseUsBlock` — Раздел преимуществ с иконками, статистикой и изображением справа

Раздел преимуществ с чек-боксами, списком статистики и блоком изображения с правой стороны.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Текст бэджа (по умолчанию `"OUR COMMITMENT"`) |
| `title` | `String` | нет | Главный заголовок (по умолчанию `"Why Choose Us"`) |
| `description` | `String` | нет | Подробное описание под заголовком |
| `features` | `Array` | нет | Массив строк с ключевыми особенностями / преимуществами (показываются с галочкой) |
| `stats` | `Array` | нет | Массив объектов статистики: `{ "value": "100%", "label": "LABEL" }` (макс. 4) |
| `image` | `String` | нет | Путь к изображению справа (по умолчанию `"/img/construction/why_choose_us.png"`) |

**Пример:**
```json
{
  "component": "StructWhyChooseUsBlock",
  "props": {
    "tagText": "ПОЧЕМУ МЫ",
    "title": "Преимущества работы с Cement stroi",
    "description": "Мы предлагаем только сертифицированные строительные материалы напрямую от заводов-производителей с быстрой доставкой по Алматы и области.",
    "features": [
      "Прямые поставки без посредников",
      "Гарантия качества на всю продукцию",
      "Собственный автопарк доставки",
      "Удобные способы оплаты (наличные, Kaspi QR, безналичный расчет)",
      "Гибкая система скидок для оптовиков",
      "Консультация специалистов и точный расчет объема"
    ],
    "stats": [
      { "value": "100%", "label": "СЕРТИФИКАЦИЯ" },
      { "value": "05+", "label": "ЛЕТ НА РЫНКЕ" },
      { "value": "1200+", "label": "ДОВОЛЬНЫХ КЛИЕНТОВ" },
      { "value": "24/7", "label": "ПОДДЕРЖКА В WHATSAPP" }
    ],
    "image": "@construction/hero-site"
  }
}
```

---

### 5.26 `StructFeaturedProjectsBlock` — Анимированная бегущая строка с карточками проектов

Блок для демонстрации выполненных объектов или брендов в виде бесконечно бегущей строки с интерактивными карточками.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Текст бэджа (по умолчанию `"PROJECTS"`) |
| `title` | `String` | нет | Главный заголовок слева (по умолчанию `"Our Featured Projects"`) |
| `description` | `String` | нет | Описание блока справа (по умолчанию короткий текст о проектах) |
| `speed` | `String` | нет | Время одного полного цикла анимации бегущей строки (по умолчанию `"30s"`) |
| `projects` | `Array` | нет | Массив объектов проектов (см. формат ниже) |

#### Формат элемента `projects[]`:
```json
{
  "name": "Название проекта/бренда",
  "location": "Местоположение / подзаголовок",
  "category": "Категория (отображается в углу)",
  "image": "/img/... или @алиас",
  "url": "Ссылка при клике на карточку (например, #)"
}
```

**Пример:**
```json
{
  "component": "StructFeaturedProjectsBlock",
  "props": {
    "tagText": "ПОРТФОЛИО",
    "title": "Наши завершенные проекты",
    "description": "Посмотрите на объекты, которые были построены с использованием наших строительных материалов.",
    "speed": "25s",
    "projects": [
      {
        "name": "Жилой комплекс 'Алатау'",
        "location": "г. Алматы",
        "category": "ЖИЛОЕ СТРОИТЕЛЬСТВО",
        "image": "@construction/hero-building",
        "url": "#"
      },
      {
        "name": "Бизнес-центр 'Dostyk'",
        "location": "пр. Достык",
        "category": "КОММЕРЧЕСКАЯ НЕДВИЖИМОСТЬ",
        "image": "@construction/hero-modern",
        "url": "#"
      },
      {
        "name": "Складской терминал Xiong Feng",
        "location": "Илийский тракт",
        "category": "ПРОМЫШЛЕННЫЙ АНГАР",
        "image": "@construction/hero-site",
        "url": "#"
      }
    ]
  }
}
```

---

### 5.27 `StructIntroBlock` — Раздел интродукции с двухцветным текстом

Минималистичный текстовый блок для УТП или описания миссии компании с контрастным выделением (часть текста темная, часть светлая).

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Текст бэджа (по умолчанию отсутствует) |
| `textDark` | `String` | нет | Темная (основная) часть текста |
| `textLight` | `String` | нет | Светлая (дополнительная/приглушенная) часть текста |
| `ctaLabel` | `String` | нет | Текст кнопки призыва к действию (по умолчанию `"Learn Our Story"`) |
| `ctaUrl` | `String` | нет | Ссылка для кнопки (по умолчанию `"#about"`) |

**Пример:**
```json
{
  "component": "StructIntroBlock",
  "props": {
    "tagText": "О КОМПАНИИ",
    "textDark": "Мы поставляем качественный цемент и сухие строительные смеси напрямую от крупнейших заводов Казахстана. ",
    "textLight": "Наша цель — обеспечить строительные объекты надежными материалами в кратчайшие сроки и по лучшим ценам в регионе.",
    "ctaLabel": "Узнать больше о нас",
    "ctaUrl": "#about"
  }
}
```

---

### 5.28 `StructServicesListBlock` — Вертикальный список услуг с липкой левой колонкой

Двухколонный блок, где левая колонка остается на месте при прокрутке списка услуг справа. Идеально для длинного списка сервисов с сохранением фокуса на CTA.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Текст бэджа (по умолчанию `"WHAT WE DO"`) |
| `title` | `String` | нет | Главный заголовок в левой колонке (по умолчанию `"Comprehensive Construction Services"`) |
| `description` | `String` | нет | Текст описания в левой колонке |
| `buttonText` | `String` | нет | Текст кнопки CTA (по умолчанию `"MORE SERVICES"`) |
| `buttonUrl` | `String` | нет | Ссылка кнопки CTA (по умолчанию `"#services"`) |
| `contactTitle` | `String` | нет | Маленький заголовок блока контактов (по умолчанию `"Contact Us for a Free Consultation"`) |
| `contactPhone` | `String` | нет | Телефон в блоке контактов (по умолчанию `"+1 (123) 456 7890"`) |
| `services` | `Array` | **да** | Список услуг (каждый элемент: `{ num, title, description }`) |

**Пример:**
```json
{
  "component": "StructServicesListBlock",
  "props": {
    "tagText": "УСЛУГИ",
    "title": "Строительные услуги от AlexMart",
    "description": "Помимо продажи строительных материалов, мы осуществляем профессиональные работы по монтажу и отделке.",
    "buttonText": "ВСЕ УСЛУГИ",
    "buttonUrl": "#services",
    "contactTitle": "Нужна консультация?",
    "contactPhone": "+7 701 793 81 35",
    "services": [
      {
        "num": "#01",
        "title": "Доставка день в день",
        "description": "Собственным транспортом доставим любые объемы стройматериалов прямо на ваш объект в Алматы и области в день заказа."
      },
      {
        "num": "#02",
        "title": "Расчет сметы",
        "description": "Наши специалисты бесплатно рассчитают необходимое количество цемента, смесей, гипсокартона и других материалов под ваш проект."
      },
      {
        "num": "#03",
        "title": "Разгрузка и подъем",
        "description": "Предоставляем услуги грузчиков для бережного заноса материалов в квартиру или складские помещения."
      }
    ]
  }
}
```

---

### 5.29 `StructTestimonialsBlock` — Секция отзывов клиентов с аватарами и логотипами брендов

Стильная темная секция с крупной цитатой отзыва, блоком авторитетности клиентов и сеткой партнерских логотипов снизу.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `trustedLabel` | `String` | нет | Заголовок блока доверия (по умолчанию `"TRUSTED BY"`) |
| `trustedText` | `String` | нет | Текст блока доверия (по умолчанию `"Our Clients' Satisfaction"`) |
| `quoteLinkText` | `String` | нет | Текст верхней ссылки (по умолчанию `"GET A QUOTE"`) |
| `quoteLinkUrl` | `String` | нет | Ссылка верхней кнопки (по умолчанию `"#contacts"`) |
| `quoteText` | `String` | нет | Текст крупной цитаты (по умолчанию демо-отзыв) |
| `authorName` | `String` | нет | Имя автора отзыва (по умолчанию `"John D."`) |
| `authorRole` | `String` | нет | Должность / роль автора (по умолчанию `"HOMEOWNER - CO-FOUNDER"`) |
| `clientsLabel` | `String` | нет | Надпись на линии разделения (по умолчанию `"SOME OF OUR CLIENTS"`) |
| `avatars` | `Array` | нет | Массив URL-адресов аватаров (показываются до 4 штук) |

**Пример:**
```json
{
  "component": "StructTestimonialsBlock",
  "props": {
    "trustedLabel": "ОЦЕНКА КЛИЕНТОВ",
    "trustedText": "Более 500 положительных отзывов",
    "quoteLinkText": "ОСТАВИТЬ ОТЗЫВ",
    "quoteLinkUrl": "https://2gis.kz",
    "quoteText": "\"Заказывали партию цемента М400 и гипсокартон Knauf для ремонта офиса. Все привезли через 3 часа после оплаты, цены ниже рыночных в Алматы. Будем сотрудничать дальше!\"",
    "authorName": "Сергей Б.",
    "authorRole": "РУКОВОДИТЕЛЬ СТРОИТЕЛЬНОЙ БРИГАДЫ",
    "clientsLabel": "НАМ ДОВЕРЯЮТ",
    "avatars": [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
    ]
  }
}
```

---

### 5.30 `StructVehicleParkBlock` — Сетка карточек аренды автовышек / спецтехники

Специализированная секция для демонстрации автопарка строительной техники с характеристиками и интерактивным заказом через WhatsApp.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `title` | `String` | нет | Заголовок секции (по умолчанию `"Наш парк техники:"`) |
| `buttonText` | `String` | нет | Текст кнопки заказа (по умолчанию `"ЗАКАЗАТЬ"`) |
| `whatsappPhone` | `String` | нет | Номер WhatsApp для заказа (`77000235555` без `+`) |
| `vehicles` | `Array` | **да** | Массив карточек техники (см. формат ниже) |

#### Формат элемента `vehicles[]`:
```json
{
  "title": "Название спецтехники",
  "image": "Путь к картинке (например, /img/truck.png)",
  "height": "Высота подъема или ключевая характеристика (например, '22 метра')",
  "price": "Текущая цена аренды (например, 'от 7 000 тг/час')",
  "oldPrice": "Старая цена для перечеркивания (например, '8 000 тг/час')",
  "minTime": "Минимальное время заказа (например, 'минимально 2 часа')"
}
```

**Пример:**
```json
{
  "component": "StructVehicleParkBlock",
  "props": {
    "title": "АРЕНДА АВТОВЫШЕК В АЛМАТЫ",
    "buttonText": "АРЕНДОВАТЬ",
    "whatsappPhone": "77782742560",
    "vehicles": [
      {
        "title": "Автовышка Isuzu Elf (Япония)",
        "image": "/img/machinery/isuzu-14m.png",
        "height": "Высота подъема: 14-16 метров",
        "price": "7 000 тг/час",
        "oldPrice": "8 000 тг/час",
        "minTime": "Минимальный заказ: 2 часа"
      },
      {
        "title": "Автовышка Daewoo Novus",
        "image": "/img/machinery/daewoo-28m.png",
        "height": "Высота подъема: 28-30 метров",
        "price": "12 000 тг/час",
        "minTime": "Минимальный заказ: 3 часа"
      }
    ]
  }
}
```

---

### 5.31 `ChemaHeroBlock` — Индустриальный/бизнес главный экран в стиле Chema

Премиальный главный экран с левоориентированным контентом, адаптивной шапкой, затемняющим оверлеем для контрастности белого текста и поддержкой посимвольной анимации.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `logoText` | `String` | нет | Текст логотипа (по умолчанию `"Chema"`) |
| `logoIcon` | `String` | нет | Иконка логотипа (по умолчанию `"lucide:layers"`, `"none"` для скрытия) |
| `logoImage` | `String` | нет | Ссылка на изображение логотипа (если задана, используется вместо иконки) |
| `hideLogoText` | `Boolean` | нет | Скрыть текстовое название логотипа |
| `navLinks` | `Array` | нет | Пункты меню навигации `[{ "label": "Product", "url": "#product" }]` |
| `headerCta` | `Object` | нет | Кнопка действия в шапке `{ "label": "Use for free", "url": "#contact" }` |
| `title` | `String` | **да** | Главный заголовок (поддерживает `<br/>` и универсальную анимацию `TextReveal`) |
| `description` | `String` | нет | Подзаголовок/описание |
| `primaryCta` | `Object` | нет | Главная кнопка действия `{ "label": "View our products", "url": "#products" }` |
| `backgroundImage` | `String` | нет | Путь или алиас к фоновому изображению (по умолчанию `@construction/chema-hero-bg`) |
| `animation` | `String` | нет | Тип анимации заголовка (`"blur-reveal"`, `"fade-up-chars"`, `"fade-up"`, `"none"`) |

**Пример:**
```json
{
  "component": "ChemaHeroBlock",
  "animation": "blur-reveal",
  "props": {
    "logoText": "Chema",
    "backgroundImage": "@construction/chema-hero-bg",
    "title": "Your Trusted Partner for<br/>Chemical Solutions",
    "description": "Trusted experts in tailored chemical solutions for textile, cigarette, rubber, leather, paper, and more.",
    "primaryCta": {
      "label": "View our products",
      "url": "#products"
    }
  }
}
### 5.32 `NavuHeroBlock` — Интерактивный главный экран с Before/After слайдером

Главный экран в стиле Navu с фоновым интерактивным слайдером "До/После", шапкой с навигацией и контрастной левой колонкой для контента.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `logoText` | `String` | нет | Текст логотипа (по умолчанию `"Navu"`) |
| `logoImage` | `String` | нет | Путь к изображению логотипа (по умолчанию `"/img/landscaping/navu-logo.svg"`) |
| `navLinks` | `Array` | нет | Пункты меню навигации `[{ "label": "Services", "url": "#services" }]` |
| `headerCta` | `Object` | нет | Кнопка действия в шапке `{ "label": "Get a quote", "url": "#contact" }` |
| `title` | `String` | **да** | Главный заголовок (поддерживает `<br/>`) |
| `description` | `String` | net | Описание под заголовком |
| `primaryCta` | `Object` | нет | Кнопка действия на экране `{ "label": "Get this result", "url": "#contact" }` |
| `imageBefore` | `String` | нет | Путь или алиас к картинке "До" (по умолчанию `@landscaping/navu-hero-before`) |
| `imageAfter` | `String` | нет | Путь или алиас к картинке "После" (по умолчанию `@landscaping/navu-hero-after`) |
| `whatsappPhone` | `String` | нет | Номер WhatsApp для связи без `+` (по умолчанию `'77016404818'`) |
| `whatsappMessage` | `String` | нет | Текст автоматического WhatsApp сообщения |

**Пример:**
```json
{
  "component": "NavuHeroBlock",
  "props": {
    "logoText": "VerdeScape",
    "logoImage": "/img/landscaping/navu-logo.svg",
    "title": "Создадим сад вашей<br/>мечты за несколько недель",
    "description": "Эстетичные ландшафты, спроектированные для вашего комфорта, функциональности и долгосрочной ценности.",
    "primaryCta": {
      "label": "Получить этот результат",
      "url": "#contacts"
    },
    "imageBefore": "@landscaping/navu-hero-before",
    "imageAfter": "@landscaping/navu-hero-after"
  }
}
```

---

### 5.33 `GrexaHeroBlock` — Главный экран с видео-фоном в стиле Grexa

Премиальный главный экран с фоновым видеороликом, липкой шапкой навигации, логотипом (поддерживает SVG Grexa по умолчанию или картинку), заголовком, описанием, кнопками действия и плавающими бэйджами-показателями внизу (с SVG-иконками).

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `logoText` | `String` | нет | Текст логотипа (по умолчанию `"Grexa"`) |
| `logoImage` | `String` | нет | Путь к картинке логотипа. Если пусто и `logoText` равен `'Grexa'`, рендерится фирменный SVG |
| `navLinks` | `Array` | нет | Пункты меню: `[{ "label": "Home", "url": "#" }]` |
| `headerCtaText` | `String` | нет | Текст кнопки в шапке (по умолчанию `"Contact Us"`) |
| `headerCtaUrl` | `String` | нет | Ссылка кнопки в шапке |
| `title` | `String` | **да** | Главный крупный заголовок |
| `description` | `String` | нет | Текст описания под заголовком |
| `primaryCtaText` | `String` | нет | Текст главной кнопки действия (по умолчанию `"View Our Services"`) |
| `primaryCtaUrl` | `String` | нет | Ссылка главной кнопки действия |
| `videoUrl` | `String` | нет | URL-путь к фоновому видеоролику (mp4) |
| `badges` | `Array` | нет | Массив бейджей внизу: `[{ "text": "Carbon Scan", "icon": "leaf" }]` (доступные иконки: `"leaf"`, `"energy"`, `"lightning"`) |

**Пример:**
```json
{
  "component": "GrexaHeroBlock",
  "props": {
    "logoText": "EcoFuture",
    "title": "Зеленая Энергия для Современных Производств",
    "description": "Мы поставляем надежные и экологически чистые энергетические решения, разработанные под потребности промышленных предприятий.",
    "primaryCtaText": "Наши услуги",
    "videoUrl": "https://framerusercontent.com/assets/0XoBCl56qw9hOzvrVRgPUUMufk.mp4",
    "badges": [
      { "text": "Эко Мониторинг", "icon": "leaf" },
      { "text": "Оптимизация Ресурсов", "icon": "energy" },
      { "text": "Низкие Эмиссии", "icon": "lightning" }
    ]
  }
}
```

---

### 5.34 `GrexaAboutUsBlock` — Раздел «О компании» в стиле Grexa

Секция с описанием компании, содержащая субтитры с точечным SVG-значком, крупное описание-заголовок, подробный текст, CTA-кнопку, аватарки сотрудников (stack), счетчик статистики и анимированное изображение справа.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Маленький надзаголовок (по умолчанию `"About Us"`) |
| `title` | `String` | **да** | Крупный заголовок-заявление |
| `description` | `String` | нет | Подробный текст описания |
| `buttonText` | `String` | нет | Текст кнопки действия (по умолчанию `"About Us"`) |
| `buttonUrl` | `String` | нет | Ссылка кнопки действия |
| `avatars` | `Array` | нет | Массив URL картинок-аватарок для кругляшков |
| `statNumber` | `String` | нет | Число статистики (например, `"10M+"`) |
| `statText` | `String` | нет | Поясняющий текст статистики (например, `"People Powered"`) |
| `image` | `String` | нет | Путь или алиас к основному изображению справа |

**Пример:**
```json
{
  "component": "GrexaAboutUsBlock",
  "props": {
    "tagText": "О компании",
    "title": "Инновации для сокращения выбросов и повышения энергоэффективности.",
    "description": "Наша команда разрабатывает экологически безопасные решения, которые помогают снизить затраты на ресурсы.",
    "buttonText": "Подробнее",
    "statNumber": "500+",
    "statText": "Успешных проектов",
    "image": "@landscaping/navu-hero-after"
  }
}
```

---

### 5.35 `GrexaServicesBlock` — Список услуг с интерактивным Reveal-эффектом

Уникальный бруталистичный список услуг. При наведении на строку услуги на десктопе плавно и плавно сдвигаясь появляется её прямоугольное изображение (эффект Hover Image Reveal). На мобильных картинка отображается статично под тегами.

| Свойство | Тип | Обязательно | Описание |
|---|---|---|---|
| `tagText` | `String` | нет | Надзаголовок (по умолчанию `"What We Do"`) |
| `title` | `String` | **да** | Заголовок раздела |
| `services` | `Array` | **да** | Массив объектов услуг: `[{ "number": "01", "title": "Имя", "tags": ["Тэг1"], "image": "алиас/URL" }]` |
| `ctaText` | `String` | нет | Текст кнопки внизу (по умолчанию `"View All Services"`) |
| `ctaUrl` | `String` | нет | Ссылка кнопки внизу |

**Пример:**
```json
{
  "component": "GrexaServicesBlock",
  "props": {
    "tagText": "Услуги",
    "title": "Эффективные решения для чистого будущего",
    "services": [
      {
        "number": "01",
        "title": "Утилизация отходов",
        "tags": ["Рециклинг", "Сортировка"],
        "image": "https://framerusercontent.com/images/NF5R2UpTY3fTcM6SBhK7v4bfFA.jpg"
      },
      {
        "number": "02",
        "title": "Снижение выбросов",
        "tags": ["CO2 оптимизация", "Энергоаудит"],
        "image": "https://framerusercontent.com/images/rXpcfyDqKwHSAWWGG692BwFUhc.jpg"
      }
    ]
  }
}
```

---

## 6. МЕДИАТЕКА ИЗОБРАЖЕНИЙ (полный каталог)

Вместо внешних URL используй **алиасы** формата `@категория/имя`. Система автоматически заменяет их на реальные пути.

Пример: `"@auto/hero-repair-shop"` → `/img/auto/hero-repair-shop.jpeg`

### 6.1 Категория `auto` — Автосервис и автозапчасти

| Алиас | Тип | Описание |
|---|---|---|
| `@auto/hero-repair-shop` | hero | Чистый автосервис изнутри — баннер |
| `@auto/hero-tools` | hero | Верстак механика с инструментами |
| `@auto/card-air-filter` | card | Воздушный фильтр крупным планом |
| `@auto/card-diagnostics` | card | OBD-сканер, компьютерная диагностика |
| `@auto/card-oil-check` | card | Проверка масла по щупу |
| `@auto/card-spark-plug` | card | Свеча зажигания макро |
| `@auto/card-tire-change` | card | Шиномонтаж, замена колёс |
| `@auto/card-parts-shelf` | card | Полки с запчастями |

### 6.2 Категория `construction` — Строительство и ремонт

| Алиас | Тип | Описание |
|---|---|---|
| `@construction/hero-abstract` | hero | Абстрактный фон, текстура бетона |
| `@construction/hero-aerial` | hero | Аэросъёмка стройплощадки |
| `@construction/hero-building` | hero | Строящееся здание снизу, кран |
| `@construction/hero-modern` | hero | Современный готовый интерьер |
| `@construction/hero-renovation` | hero | Ремонт, минимализм |
| `@construction/hero-site` | hero | Стройплощадка с техникой |
| `@construction/card-tools` | card | Набор строительных инструментов |
| `@construction/card-drill` | card | Дрель на деревянной поверхности |
| `@construction/card-paint` | card | Кисти, палитра, малярные работы |
| `@construction/card-tiles` | card | Образцы плитки, керамика |

### 6.3 Категория `electrical` — Электрика

| Алиас | Тип | Описание |
|---|---|---|
| `@electrical/card-socket` | card | Установка розетки |
| `@electrical/card-circuit-breaker` | card | Автомат в электрощите |
| `@electrical/card-distribution-panel` | card | Распределительный щит |

### 6.4 Категория `factory` — Производство

| Алиас | Тип | Описание |
|---|---|---|
| `@factory/hero-automated` | hero | Автоматизированный хай-тек цех |
| `@factory/hero-bright-factory` | hero | Светлый чистый цех |
| `@factory/hero-workshop` | hero | Мастерская с инструментами |
| `@factory/card-precision` | card | Обработка металлической детали |
| `@factory/card-laser-cutting` | card | Лазерная резка металла |
| `@factory/card-caliper` | card | Штангенциркуль, контроль качества |
| `@factory/card-machined-parts` | card | Серийные алюминиевые детали |
| `@factory/card-pharmaceutical` | card | Фармацевтическое производство |
| `@factory/card-hydraulic` | card | Гидравлика, экскаватор |

### 6.5 Категория `hvac` — Отопление, вентиляция

| Алиас | Тип | Описание |
|---|---|---|
| `@hvac/hero-ventilation-system` | hero | Потолочная система вентиляции |
| `@hvac/hero-boiler-room` | hero | Современная котельная |
| `@hvac/card-underfloor-heating` | card | Тёплый пол, трубы при монтаже |
| `@hvac/card-radiator-valve` | card | Вентиль радиатора |
| `@hvac/card-thermostat` | card | Цифровой термостат |
| `@hvac/card-ventilation-grille` | card | Вентиляционная решётка |

### 6.6 Категория `logistics` — Логистика

| Алиас | Тип | Описание |
|---|---|---|
| `@logistics/card-forklift` | card | Вилочный погрузчик |
| `@logistics/card-truck` | card | Грузовик, фура |
| `@logistics/card-telematics` | card | Телематика, GPS-трекинг |

### 6.7 Категория `cleaning` — Клининг и уборка

| Алиас | Тип | Описание |
|---|---|---|
| `@cleaning/hero-cleaner` | hero | Улыбающийся клинер с ведром моющих средств |

### 6.8 Категория `tours` — Туризм (не в library.json, прямые пути)

| Путь | Описание |
|---|---|
| `/img/tours/hero-mountains.jpeg` | Горы, природа — hero |
| `/img/tours/charyn-canyon.jpeg` | Чарынский каньон |
| `/img/tours/kolsay-lakes.jpeg` | Кольсайские озёра |
| `/img/tours/kok-tobe.jpeg` | Кок-Тобе |

---

## 7. ЛОГОТИПЫ

Логотипы хранятся в `public/img/logos/`. Сейчас доступны:

| Файл | Для кого |
|---|---|
| `/img/logos/csp-logo.png` | Центр Строительных Плит |
| `/img/logos/ost-service.png` | OST Service |
| `/img/logos/qoshqeldin.png` | Qoshqeldin |

### Добавить логотип:
1. Положи PNG/SVG файл в `public/img/logos/`
2. В JSON используй: `"logoImage": "/img/logos/my-logo.png"`
3. Если логотип плохо читается на белом фоне шапки, создай CSS-класс инверсии в `main.css` и укажи его в `logoClass`

---

## 8. ТИПИЧНЫЙ ПОРЯДОК БЛОКОВ В `structure`

### Вариант А: Стандартная структура (Раздельные шапка и главный экран)
```
1. VitalHeaderBlock        — шапка (всегда первый)
2. VitalHeroBlock          — главный экран
3. VitalServicesBlock      — услуги / каталог
4. VitalContentBlock       — о компании / технологии (можно несколько)
5. VitalContentBlock       — преимущества (imagePosition чередовать)
6. VitalGalleryBlock       — галерея работ (опционально)
7. VitalMapContactBlock    — контакты с картой
8. VitalContactBlock       — форма обратной связи
9. VitalFooterBlock        — подвал (всегда последний)
```

### Вариант Б: Премиальная структура (С полноэкранным CoverHeroBlock)
```
1. CoverHeroBlock          — полноэкранный главный экран со встроенной шапкой и лид-формой (заменяет VitalHeaderBlock, VitalHeroBlock и VitalContactBlock)
2. VitalServicesBlock      — услуги / каталог
3. VitalContentBlock       — о компании / технологии (можно несколько)
4. VitalContentBlock       — преимущества (imagePosition чередовать)
5. VitalGalleryBlock       — галерея работ (опционально)
6. VitalMapContactBlock    — контакты с картой
7. VitalFooterBlock        — подвал (всегда последний)
```

---

## 9. ПОЛНЫЙ ШАБЛОН JSON (скопировать и заполнить)

```json
{
  "theme": "emerald",
  "font": "outfit",
  "meta": {
    "title": "",
    "description": ""
  },
  "structure": [
    {
      "component": "VitalHeaderBlock",
      "props": {
        "logoText": "",
        "logoImage": "",
        "buttonText": "+7 XXX XXX-XX-XX",
        "links": [
          { "label": "Главная", "url": "#" },
          { "label": "Услуги", "url": "#services" },
          { "label": "Контакты", "url": "#contacts" }
        ]
      }
    },
    {
      "component": "VitalHeroBlock",
      "props": {
        "ratingText": "5.0",
        "ratingCount": "",
        "title": "",
        "subtitle": "",
        "buttonText": "Заказать в WhatsApp",
        "whatsappPhone": "",
        "watchVideoText": "Смотреть услуги",
        "watchVideoUrl": "#services",
        "statsValue": "",
        "statsLabel": "",
        "heroImage": ""
      }
    },
    {
      "component": "VitalServicesBlock",
      "props": {
        "tagText": "Услуги",
        "title": "",
        "whatsappPhone": "",
        "services": [
          {
            "title": "",
            "text": "",
            "image": "",
            "badge": "",
            "linkText": "Заказать"
          }
        ]
      }
    },
    {
      "component": "VitalContentBlock",
      "props": {
        "tagText": "",
        "title": "",
        "text": "",
        "image": "",
        "imagePosition": "right",
        "features": [],
        "buttonText": "",
        "whatsappPhone": ""
      }
    },
    {
      "component": "VitalMapContactBlock",
      "props": {
        "title": "Наши контакты",
        "phone": "",
        "whatsapp": "",
        "whatsappMessage": "Здравствуйте! Хочу узнать подробнее.",
        "boutiqueTabName": "",
        "boutiqueTitle": "",
        "boutiqueAddress": "",
        "boutiqueMapLink": "",
        "boutiqueMapIframe": "",
        "warehouseTabName": "",
        "warehouseTitle": "",
        "warehouseAddress": "",
        "warehouseMapLink": "",
        "warehouseMapIframe": "",
        "workHoursWeekdays": "09:00 - 18:00",
        "workHoursSaturday": "10:00 - 15:00",
        "workHoursSunday": "Выходной"
      }
    },
    {
      "component": "VitalContactBlock",
      "props": {
        "tagText": "Обратная связь",
        "title": "Оставьте заявку",
        "subtitle": "",
        "submitText": "Отправить",
        "ratingText": "5.0",
        "ratingCount": ""
      }
    },
    {
      "component": "VitalFooterBlock",
      "props": {
        "logoText": "",
        "logoImage": "",
        "description": "",
        "buttonText": "Написать в WhatsApp",
        "copyright": "© 2026 Компания. Все права защищены.",
        "subscriptionTitle": "Свяжитесь с нами",
        "subscriptionText": "",
        "linkColumns": [
          {
            "title": "Услуги",
            "links": [
              { "label": "", "url": "#" }
            ]
          },
          {
            "title": "Контакты",
            "links": [
              { "label": "", "url": "" }
            ]
          }
        ]
      }
    }
  ]
}
```

---

## 10. ДЕПЛОЙ

После создания JSON-файла:

1. Сохранить файл в `public/data/{clientId}.json`
2. **Скопировать файл в `server/assets/data/{clientId}.json`** (обязательно для SSR мета-тегов!)
3. Проверить сборку: `npm run build`
4. Задеплоить: `npx vercel --prod`
5. Открыть: `https://conveer-sites.vercel.app/{clientId}`

> ⚠️ **ВАЖНО:** Шаг 2 обязателен! Без копирования JSON в `server/assets/data/` мета-теги (og:title, og:image и др.) НЕ будут рендериться при SSR, и превью ссылок в WhatsApp/Telegram будет пустым.

Быстрая команда для копирования всех JSON-файлов:
```bash
cp public/data/*.json server/assets/data/
```

---

## 11. SSR МЕТА-ТЕГИ (OG/TWITTER) — КАК ЭТО РАБОТАЕТ

### Зачем нужны SSR мета-теги?

Когда кто-то отправляет ссылку на сайт в **WhatsApp**, **Telegram**, **Facebook** или **Twitter**, мессенджер/соцсеть отправляет бота, который скачивает HTML-страницу и ищет в `<head>` мета-теги:
- `og:title` — заголовок превью
- `og:description` — описание
- `og:image` — картинка превью
- `twitter:card` — тип карточки

Эти теги **должны быть в HTML при первой загрузке** (SSR), потому что боты мессенджеров не выполняют JavaScript.

### Архитектура решения

```
WhatsApp бот → GET /struct-hero-demo
                ↓
          Nuxt SSR (Vercel Serverless Function)
                ↓
          useFetch('/api/config/struct-hero-demo')  ← серверный вызов
                ↓
          server/api/config/[client].get.ts
                ↓
          useStorage('assets:server') → читает из server/assets/data/struct-hero-demo.json
                ↓
          config.meta → useHead() → <meta og:title>, <meta og:image> и т.д.
                ↓
          HTML с мета-тегами возвращается боту
```

### Почему два места хранения JSON?

| Место | Назначение |
|---|---|
| `public/data/` | Статические файлы, раздаются через CDN. Используются клиентом (браузером) |
| `server/assets/data/` | Бандлятся в serverless-функцию Vercel. Доступны при SSR-рендеринге |

На Vercel serverless-функция **не имеет доступа** к файлам из `public/` через файловую систему. Поэтому для SSR нужна отдельная копия в `server/assets/data/`.

### Как проверить, что мета-теги работают?

```bash
# Проверить наличие og-тегов в HTML
curl -s https://conveer-sites.vercel.app/{clientId} | grep 'og:'

# Или через Facebook Sharing Debugger (сбрасывает кэш WhatsApp)
# https://developers.facebook.com/tools/debug/
```

### Как добавить OG-картинку для нового клиента

1. Создай картинку размером **1200×630px** (рекомендуется)
2. Положи в `public/img/` (например, `/img/construction/my-og-image.png`)
3. В JSON добавь поле `meta.image`:
```json
"meta": {
  "title": "Название компании",
  "description": "Описание",
  "image": "/img/construction/my-og-image.png"
}
```
4. Скопируй JSON в `server/assets/data/`
5. Задеплой
