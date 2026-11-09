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
  "font": "outfit",
  "meta": {
    "title": "Заголовок вкладки браузера (SEO title)",
    "description": "SEO-описание сайта для поисковых систем"
  },
  "structure": [
    {
      "component": "ИмяКомпонента",
      "props": { ... }
    }
  ]
}
```

---

## 3. ТЕМЫ (параметр `theme`)

Тема задаёт основной цвет сайта через CSS-переменную `--color-primary`. Класс `.theme-{name}` автоматически вешается на корневой контейнер.

| Значение `theme` | CSS-класс | RGB | Описание |
|---|---|---|---|
| `emerald` | `.theme-emerald` | `16 185 129` | Изумрудный (по умолчанию). Медицина, экология. |
| `blue` | `.theme-blue` | `59 130 246` | Синий. Технологии, IT. |
| `roofmax` | `.theme-roofmax` | `61 68 233` | Индиго. Строительство. |
| `orange` | `.theme-orange` | `249 115 22` | Оранжевый. Энергетика, доставка. |
| `red` | `.theme-red` | `239 68 68` | Красный. Промышленность. |
| `csp` | `.theme-csp` | `42 56 144` | Тёмно-синий. Стройматериалы. |

### Добавить новую тему

Файл: `app/assets/css/main.css` — добавить ВНЕ директивы `@layer`:
```css
.theme-mycompany {
  --color-primary: R G B !important;
}
```

---

## 4. ШРИФТЫ (параметр `font`)

| Значение | Результат |
|---|---|
| `outfit` | Шрифт Outfit (Google Fonts) — современный, геометрический |
| `sans` | Системный шрифт без засечек |

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

### 6.7 Категория `tours` — Туризм (не в library.json, прямые пути)

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
2. Проверить сборку: `npm run build`
3. Задеплоить: `npx vercel --prod`
4. Открыть: `https://conveer-sites.vercel.app/{clientId}`
