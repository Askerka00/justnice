// Реестр мок-данных и описаний для всех 39 блоков
export interface BlockConfig {
  component: string;
  family: 'Vital' | 'Struct' | 'Shine' | 'Grexa' | 'Navu' | 'Cover' | 'Others';
  nameRu: string;
  description: string;
  props: Record<string, any>;
  editableFields: Array<{
    name: string;
    label: string;
    type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'image' | 'color' | 'select';
    options?: string[];
    default?: any;
  }>;
}

export const blockRegistry: BlockConfig[] = [
  // === VITAL FAMILY ===
  {
    component: 'VitalHeaderBlock',
    family: 'Vital',
    nameRu: 'Липкая шапка (Vital)',
    description: 'Навигационная панель с логотипом, ссылками и кнопкой связи. Закрепляется сверху страницы при прокрутке.',
    props: {
      logoText: 'VitalFlow',
      logoImage: '',
      hideLogoText: false,
      buttonText: '+7 701 640 4818',
      links: [
        { label: 'Главная', url: '#' },
        { label: 'Услуги', url: '#services' },
        { label: 'О нас', url: '#about' },
        { label: 'Контакты', url: '#contacts' }
      ]
    },
    editableFields: [
      { name: 'logoText', label: 'Текст логотипа', type: 'string' },
      { name: 'logoImage', label: 'Ссылка на логотип', type: 'image' },
      { name: 'hideLogoText', label: 'Скрыть текст логотипа', type: 'boolean' },
      { name: 'buttonText', label: 'Текст кнопки', type: 'string' }
    ]
  },
  {
    component: 'VitalHeroBlock',
    family: 'Vital',
    nameRu: 'Главный экран (Vital Hero)',
    description: 'Первый экран сайта с УТП, оценкой, кнопками целевого действия (WhatsApp) и фоновым изображением.',
    props: {
      ratingText: '5.0',
      ratingCount: 'Более 1500 довольных клиентов',
      title: 'Монтаж кровли и фасадов<br/>любой сложности в Алматы',
      subtitle: 'Профессиональная укладка металлочерепицы с гарантией качества до 10 лет по договору.',
      buttonText: 'Рассчитать стоимость',
      whatsappPhone: '77016404818',
      watchVideoText: 'Смотреть услуги',
      watchVideoUrl: '#services',
      statsValue: 'от 3 дней',
      statsLabel: 'Средний срок выполнения работ',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
    },
    editableFields: [
      { name: 'ratingText', label: 'Оценка (например, 5.0)', type: 'string' },
      { name: 'ratingCount', label: 'Подпись под рейтингом', type: 'string' },
      { name: 'title', label: 'Главный заголовок (HTML)', type: 'string' },
      { name: 'subtitle', label: 'Подзаголовок / Описание', type: 'string' },
      { name: 'buttonText', label: 'Текст CTA кнопки', type: 'string' },
      { name: 'whatsappPhone', label: 'Телефон WhatsApp (без +)', type: 'string' },
      { name: 'watchVideoText', label: 'Текст второй кнопки', type: 'string' },
      { name: 'statsValue', label: 'Значение статистики', type: 'string' },
      { name: 'statsLabel', label: 'Описание статистики', type: 'string' },
      { name: 'heroImage', label: 'Ссылка на изображение', type: 'image' }
    ]
  },
  {
    component: 'VitalServicesBlock',
    family: 'Vital',
    nameRu: 'Каталог услуг (Vital)',
    description: 'Сетка услуг с поддержкой двух режимов: карточки с изображениями или карточки с иконками.',
    props: {
      tagText: 'УСЛУГИ',
      title: 'Что мы предлагаем нашим клиентам',
      whatsappPhone: '77016404818',
      services: [
        {
          title: 'Монтаж металлочерепицы',
          text: 'Качественная укладка долговечной черепицы от ведущих производителей.',
          image: 'https://images.unsplash.com/photo-1632750444339-0744152418db?auto=format&fit=crop&q=80&w=600',
          badge: 'Популярно',
          linkText: 'Заказать в WhatsApp'
        },
        {
          title: 'Ремонт мягкой кровли',
          text: 'Устранение протечек, гидроизоляция и частичный ремонт покрытия.',
          image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600',
          linkText: 'Заказать в WhatsApp'
        },
        {
          title: 'Водосточные системы',
          text: 'Проектирование и установка надежных водостоков для защиты фасада.',
          iconType: 'general',
          linkText: 'Подробнее',
          linkUrl: '#contacts'
        }
      ]
    },
    editableFields: [
      { name: 'tagText', label: 'Бэйдж сверху', type: 'string' },
      { name: 'title', label: 'Заголовок секции', type: 'string' },
      { name: 'whatsappPhone', label: 'Телефон для заказов', type: 'string' }
    ]
  },
  {
    component: 'VitalContentBlock',
    family: 'Vital',
    nameRu: 'Текст и Картинка (Vital Content)',
    description: 'Универсальный двухколоночный блок для описания компании, преимуществ с галочками или технологий.',
    props: {
      tagText: 'О КОМПАНИИ',
      title: 'Строим крыши, которые служат поколениям',
      text: '<p>Мы работаем на рынке Алматы с 2012 года. За это время мы покрыли более 400 домов и заслужили доверие сотен семей.</p><p>Используем только сертифицированные материалы и даем железную гарантию по договору.</p>',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
      imagePosition: 'right',
      features: [
        'Собственная бригада кровельщиков',
        'Гарантия 5 лет по договору',
        'Бесплатный выезд на замер и составление сметы'
      ],
      buttonText: 'Узнать больше',
      whatsappPhone: '77016404818'
    },
    editableFields: [
      { name: 'tagText', label: 'Бэйдж', type: 'string' },
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'text', label: 'Текст (HTML)', type: 'string' },
      { name: 'image', label: 'Картинка', type: 'image' },
      { name: 'imagePosition', label: 'Положение картинки', type: 'select', options: ['left', 'right'] },
      { name: 'buttonText', label: 'Текст кнопки', type: 'string' }
    ]
  },
  {
    component: 'VitalGalleryBlock',
    family: 'Vital',
    nameRu: 'Галерея (Vital)',
    description: 'Красивая сетка изображений выполненных проектов с эффектами наведения.',
    props: {
      title: 'Наши выполненные объекты',
      subtitle: 'Посмотрите реальные фотографии крыш и фасадов, которые мы сдали в эксплуатацию.',
      images: [
        { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', title: 'Коттедж в мкр. Баганашил' },
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600', title: 'Металлочерепица в ЖК Горный Гигант' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600', title: 'Мягкая кровля, частный дом' }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок галереи', type: 'string' },
      { name: 'subtitle', label: 'Подзаголовок', type: 'string' }
    ]
  },
  {
    component: 'VitalMapContactBlock',
    family: 'Vital',
    nameRu: 'Контакты с картой (Vital)',
    description: 'Информативный блок с телефонами, временем работы и интерактивной картой (вкладки для двух адресов).',
    props: {
      title: 'Свяжитесь с нами',
      phone: '+7 701 640 4818',
      whatsapp: '77016404818',
      boutiqueTabName: 'Офис продаж',
      boutiqueTitle: 'Главный офис в Алматы',
      boutiqueAddress: 'пр. Аль-Фараби, д. 77/7, бизнес-центр Esentai Tower',
      boutiqueMapLink: 'https://2gis.kz',
      boutiqueMapIframe: 'https://yandex.ru/map-widget/v1/?um=constructor%3A395c8621d955faef1f440a33a6ea2d5e23924f76269ba17c5b1c97a5b3a32f6b&source=constructor',
      workHoursWeekdays: '09:00 - 19:00',
      workHoursSaturday: '10:00 - 16:00',
      workHoursSunday: 'Выходной'
    },
    editableFields: [
      { name: 'title', label: 'Заголовок секции', type: 'string' },
      { name: 'phone', label: 'Телефон', type: 'string' },
      { name: 'boutiqueTabName', label: 'Имя вкладки', type: 'string' },
      { name: 'boutiqueTitle', label: 'Название офиса', type: 'string' },
      { name: 'boutiqueAddress', label: 'Адрес', type: 'string' },
      { name: 'boutiqueMapIframe', label: 'Яндекс.Карты URL Iframe', type: 'string' },
      { name: 'workHoursWeekdays', label: 'Будние дни', type: 'string' }
    ]
  },
  {
    component: 'VitalContactBlock',
    family: 'Vital',
    nameRu: 'Форма заявки (Vital Contact)',
    description: 'Форма обратной связи для сбора заявок клиентов с красивым рейтингом под формой.',
    props: {
      tagText: 'БЫСТРЫЙ ЗАКАЗ',
      title: 'Оставьте заявку на бесплатный расчет сметы',
      subtitle: 'Наш кровельный инженер приедет, сделает точные замеры и составит смету.',
      submitText: 'Отправить заявку',
      ratingText: 'Оценка 4.9',
      ratingCount: 'на основе более 300 сданных проектов в Алматы'
    },
    editableFields: [
      { name: 'tagText', label: 'Бэдж над заголовком', type: 'string' },
      { name: 'title', label: 'Заголовок формы', type: 'string' },
      { name: 'subtitle', label: 'Подзаголовок', type: 'string' },
      { name: 'submitText', label: 'Текст кнопки отправки', type: 'string' },
      { name: 'ratingText', label: 'Текст рейтинга', type: 'string' },
      { name: 'ratingCount', label: 'Описание рейтинга', type: 'string' }
    ]
  },
  {
    component: 'VitalFooterBlock',
    family: 'Vital',
    nameRu: 'Подвал сайта (Vital Footer)',
    description: 'Футтер с логотипом, описанием, кнопкой действия в WhatsApp, ссылками на разделы и копирайтом.',
    props: {
      logoText: 'VitalFlow',
      description: 'Строительство и ремонт крыш в Алматы и Алматинской области под ключ с гарантией.',
      buttonText: 'Написать кровельщику',
      copyright: '© 2026 VitalFlow. Все права защищены.',
      subscriptionTitle: 'Контакты',
      subscriptionText: 'Алматы, ул. Розыбакиева, 120. Тел: +7 701 640 4818',
      linkColumns: [
        {
          title: 'Услуги',
          links: [
            { label: 'Монтаж кровли', url: '#services' },
            { label: 'Ремонт крыши', url: '#services' },
            { label: 'Водостоки', url: '#services' }
          ]
        },
        {
          title: 'О компании',
          links: [
            { label: 'О нас', url: '#about' },
            { label: 'Галерея', url: '#gallery' },
            { label: 'Контакты', url: '#contacts' }
          ]
        }
      ]
    },
    editableFields: [
      { name: 'logoText', label: 'Текст логотипа', type: 'string' },
      { name: 'description', label: 'Описание', type: 'string' },
      { name: 'buttonText', label: 'Текст кнопки', type: 'string' },
      { name: 'copyright', label: 'Копирайт', type: 'string' }
    ]
  },

  // === STRUCT FAMILY ===
  {
    component: 'StructHeroBlock',
    family: 'Struct',
    nameRu: 'Строительный главный экран (Struct)',
    description: 'Индустриальный первый экран с разделительными линиями, двумя колонками статистики, меню и бэкграундом.',
    props: {
      backgroundImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200',
      logoTextMain: 'BUILDPRO',
      logoTextSub: 'CONSTRUCTION',
      tagText: 'СТРОИТЕЛЬНАЯ КОМПАНИЯ В КАЗАХСТАНЕ',
      title: 'Строим будущее,<br/>кирпич за кирпичом',
      buttonText: 'Связаться с нами',
      whatsappPhone: '77016404818',
      statsValueLeft: '12+',
      statsLabelLeft: 'Лет опыта в индустрии',
      statsValueRight: '450+',
      statsLabelRight: 'Сданных строительных объектов',
      links: [
        { label: 'О НАС', url: '#about' },
        { label: 'УСЛУГИ', url: '#services' },
        { label: 'ПОРТФОЛИО', url: '#projects' }
      ]
    },
    editableFields: [
      { name: 'logoTextMain', label: 'Главный логотип', type: 'string' },
      { name: 'logoTextSub', label: 'Подпись логотипа', type: 'string' },
      { name: 'tagText', label: 'Бэдж-строка', type: 'string' },
      { name: 'title', label: 'Заголовок (HTML)', type: 'string' },
      { name: 'buttonText', label: 'Текст кнопки', type: 'string' },
      { name: 'statsValueLeft', label: 'Статистика 1 значение', type: 'string' },
      { name: 'statsLabelLeft', label: 'Статистика 1 подпись', type: 'string' },
      { name: 'statsValueRight', label: 'Статистика 2 значение', type: 'string' },
      { name: 'statsLabelRight', label: 'Статистика 2 подпись', type: 'string' },
      { name: 'backgroundImage', label: 'Фоновое изображение', type: 'image' }
    ]
  },
  {
    component: 'StructFeaturesBlock',
    family: 'Struct',
    nameRu: 'Преимущества компании (Struct)',
    description: 'Асимметричный блок карточек с иконками и фоновым линейным артом.',
    props: {
      tagText: 'О КОМПАНИИ BUILDPRO',
      title: 'Строительные услуги экспертного уровня для промышленных и жилых объектов',
      features: [
        { iconType: 'history', title: 'Наша история', text: 'Основанная в 2015 году, компания начиналась как небольшой подрядчик.' },
        { iconType: 'lucide:target', title: 'Наша миссия', text: 'Предоставлять качественные решения и превосходить ожидания клиентов.' },
        { iconType: 'lucide:shield-check', title: 'Наши ценности', text: 'Безопасность на стройплощадке, честность в расчетах и долговечность объектов.' }
      ]
    },
    editableFields: [
      { name: 'tagText', label: 'Бэдж', type: 'string' },
      { name: 'title', label: 'Главный заголовок', type: 'string' }
    ]
  },
  {
    component: 'StructWhyChooseUsBlock',
    family: 'Struct',
    nameRu: 'Почему выбирают нас (Struct)',
    description: 'Секция с описанием преимуществ, списком пунктов с галочками, статистической сеткой и фото справа.',
    props: {
      tagText: 'НАШИ ПРИНЦИПЫ',
      title: 'Почему выбирают BuildPro',
      description: 'Мы понимаем, что выбор строительного партнера — это важнейшее решение. Мы гарантируем надежность на каждом этапе.',
      features: [
        'Опыт и профессионализм',
        'Строго по смете и в срок',
        'Качественные материалы',
        'Полная прозрачность'
      ],
      stats: [
        { value: '100%', label: 'Удовлетворенность' },
        { value: '10+', label: 'Лет на рынке' },
        { value: '200+', label: 'Проектов' }
      ],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600'
    },
    editableFields: [
      { name: 'tagText', label: 'Бэдж', type: 'string' },
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'description', label: 'Описание', type: 'string' },
      { name: 'image', label: 'Картинка', type: 'image' }
    ]
  },
  {
    component: 'StructServicesListBlock',
    family: 'Struct',
    nameRu: 'Список услуг по номерам (Struct)',
    description: 'Сетка услуг с номерами (#01, #02...), описанием и блоком быстрой связи с телефоном снизу.',
    props: {
      tagText: 'ЧТО МЫ ДЕЛАЕМ',
      title: 'Комплексные строительные услуги',
      description: 'От проектирования до финальной отделки. Каждая услуга оказывается профильными специалистами.',
      buttonText: 'ВСЕ УСЛУГИ',
      buttonUrl: '#services',
      contactTitle: 'Нужна консультация кровельщика или сметчика?',
      contactPhone: '+7 701 640 4818',
      services: [
        { num: '#01', title: 'Генеральный подряд', description: 'Полное управление всеми этапами строительства вашего объекта.' },
        { num: '#02', title: 'Проектирование и дизайн', description: 'Разработка архитектурных и инженерных решений.' },
        { num: '#03', title: 'Земляные работы', description: 'Подготовка участка, рытье котлованов, устройство фундамента.' }
      ]
    },
    editableFields: [
      { name: 'tagText', label: 'Бэдж', type: 'string' },
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'description', label: 'Описание', type: 'string' },
      { name: 'contactTitle', label: 'Заголовок консультации', type: 'string' },
      { name: 'contactPhone', label: 'Телефон консультации', type: 'string' }
    ]
  },
  {
    component: 'StructProjectsBlock',
    family: 'Struct',
    nameRu: 'Сетка проектов (Struct Portfolio)',
    description: 'Секция в темных индустриальных тонах для вывода выполненных объектов с увеличением фото при наведении.',
    props: {
      tagText: 'НАШИ ОБЪЕКТЫ',
      title: 'Гордимся нашими сданными проектами',
      seeAllText: 'Все проекты',
      seeAllUrl: '#',
      projects: [
        { location: 'Алматы, Казахстан', name: 'Жилой комплекс "Premium"', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=500' },
        { location: 'Астана, Казахстан', name: 'Бизнес-центр "Гранит"', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=500' },
        { location: 'Караганда, Казахстан', name: 'Логистический центр "Склад-Мастер"', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=500' }
      ]
    },
    editableFields: [
      { name: 'tagText', label: 'Бэдж', type: 'string' },
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'seeAllText', label: 'Текст ссылки "Смотреть все"', type: 'string' }
    ]
  },
  {
    component: 'StructTestimonialsBlock',
    family: 'Struct',
    nameRu: 'Отзывы и бренды (Struct)',
    description: 'Блок с крупным отзывом клиента, автором и логотипом «Доверяют нам».',
    props: {
      trustedLabel: 'НАМ ДОВЕРЯЮТ',
      trustedText: 'Что говорят наши заказчики',
      quoteLinkText: 'ПОЛУЧИТЬ РАСЧЕТ',
      quoteLinkUrl: '#contacts',
      quoteText: '"Компания BuildPro построила для нас заводской цех строго в оговоренные сроки. Ни одного тенге перерасхода сметы, профессиональный подход."',
      authorName: 'Михаил К.',
      authorRole: 'Генеральный директор ТОО "ПромСталь"',
      clientsLabel: 'НАШИ ПАРТНЕРЫ'
    },
    editableFields: [
      { name: 'trustedLabel', label: 'Бэдж слева', type: 'string' },
      { name: 'trustedText', label: 'Подпись отзывов', type: 'string' },
      { name: 'quoteText', label: 'Текст отзыва', type: 'string' },
      { name: 'authorName', label: 'Автор отзыва', type: 'string' },
      { name: 'authorRole', label: 'Должность автора', type: 'string' }
    ]
  },
  {
    component: 'StructFaqBlock',
    family: 'Struct',
    nameRu: 'Аккордеон вопросов FAQ (Struct)',
    description: 'Блок часто задаваемых вопросов в виде раскрывающихся плашек с боковой панелью контактов.',
    props: {
      tagText: 'ЧАВО',
      title: 'Часто задаваемые вопросы',
      sidebarTitle: 'Остались вопросы по строительству?',
      sidebarText: 'Наш технический директор проконсультирует вас лично.',
      sidebarCallText: 'Звонок инженеру: +7 701 640 4818',
      sidebarCallUrl: 'tel:+77016404818',
      bgColor: '#ffffff',
      textColor: '#09090b',
      secondaryTextColor: '#71717a',
      borderColor: 'rgba(9, 9, 11, 0.1)'
    },
    editableFields: [
      { name: 'tagText', label: 'Бэдж', type: 'string' },
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'sidebarTitle', label: 'Заголовок сбоку', type: 'string' },
      { name: 'sidebarText', label: 'Описание сбоку', type: 'string' },
      { name: 'sidebarCallText', label: 'Текст кнопки звонка', type: 'string' }
    ]
  },
  {
    component: 'StructArticlesBlock',
    family: 'Struct',
    nameRu: 'Сетка статей и новостей (Struct)',
    description: 'Минималистичные карточки блогов/статей с датами и категориями.',
    props: {
      tagText: 'БЛОГ',
      title: 'Полезные статьи о строительстве',
      seeAllText: 'ВСЕ СТАТЬИ',
      seeAllUrl: '#',
      articles: [
        { title: 'Как выбрать качественный бетон для фундамента', date: 'Июнь 10, 2026', category: 'СОВЕТЫ', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=400' },
        { title: 'Энергоэффективность современных промышленных зданий', date: 'Май 24, 2026', category: 'ТЕХНОЛОГИИ', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400' }
      ]
    },
    editableFields: [
      { name: 'tagText', label: 'Бэдж', type: 'string' },
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'seeAllText', label: 'Текст кнопки', type: 'string' }
    ]
  },
  {
    component: 'StructContactBlock',
    family: 'Struct',
    nameRu: 'Строительная форма (Struct Contact)',
    description: 'Премиальный блок захвата контактов с мягким фоном, описанием сбоку и формой справа.',
    props: {
      bgColor: '#f4f6f2',
      textColor: '#09090b',
      secondaryTextColor: '#4b5563',
      tagText: 'СВЯЗАТЬСЯ',
      title: 'Готовы обсудить ваш строительный проект?',
      description: 'Оставьте заявку. Мы подготовим предварительный сметный расчет за 1 рабочий день.',
      cardTitle: 'Заполните форму ниже',
      submitButtonText: 'ОТПРАВИТЬ ЗАПРОС',
      submitButtonBgColor: '#09090b',
      submitButtonTextColor: '#ffffff'
    },
    editableFields: [
      { name: 'tagText', label: 'Бэдж', type: 'string' },
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'description', label: 'Описание', type: 'string' },
      { name: 'cardTitle', label: 'Заголовок формы', type: 'string' },
      { name: 'submitButtonText', label: 'Текст кнопки', type: 'string' },
      { name: 'bgColor', label: 'Цвет фона', type: 'color' }
    ]
  },
  {
    component: 'StructFooterBlock',
    family: 'Struct',
    nameRu: 'Строительный подвал (Struct Footer)',
    description: 'Премиальный темный подвал с CTA-блоком, лайн-артом городов и 4 колонками ссылок/контактов.',
    props: {
      bgColor: '#111111',
      textColor: '#ffffff',
      secondaryTextColor: '#a1a1aa',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      ctaTitle: 'Нужен качественный расчет стоимости строительства?',
      ctaButtonText: 'СВЯЗАТЬСЯ В WHATSAPP',
      logoTextMain: 'BUILDPRO',
      logoTextSub: 'CONSTRUCTION',
      description: 'Строительство промышленных зданий, складов, ангаров и коммерческой недвижимости.',
      addressTitle: 'НАШ ОФИС',
      addressText: 'Казахстан, г. Алматы, ул. Жандосова, 58',
      assistanceTitle: 'СРОЧНЫЙ ЗВОНОК',
      email: 'info@buildpro.kz',
      phone: '+7 (701) 640-48-18',
      pagesTitle: 'МЕНЮ',
      pagesLinks: [
        { label: 'О компании', url: '#about' },
        { label: 'Наши проекты', url: '#projects' },
        { label: 'Прайс-лист', url: '#price' }
      ]
    },
    editableFields: [
      { name: 'ctaTitle', label: 'Заголовок CTA секции', type: 'string' },
      { name: 'ctaButtonText', label: 'Кнопка CTA', type: 'string' },
      { name: 'logoTextMain', label: 'Название компании', type: 'string' },
      { name: 'description', label: 'Описание', type: 'string' },
      { name: 'phone', label: 'Телефон', type: 'string' },
      { name: 'email', label: 'Email', type: 'string' }
    ]
  },
  {
    component: 'StructConcretePriceBlock',
    family: 'Struct',
    nameRu: 'Прайс-лист с табами (Struct Concrete)',
    description: 'Специализированная таблица цен с категориями в виде переключающихся вкладок.',
    props: {
      title: 'Прайс-лист на строительные материалы',
      buttonText: 'ЗАКАЗАТЬ ДОСТАВКУ',
      whatsappPhone: '77016404818',
      categories: [
        {
          name: 'Товарный бетон',
          items: [
            { title: 'Бетон М-100', subtitle: 'Класс B7.5 (дорожный)', badge: 'Популярно', specs: ['Подвижность: П3-П4', 'Морозостойкость: F50'], price: 'от 17 500 ₸/м³' },
            { title: 'Бетон М-200', subtitle: 'Класс B15 (фундаментный)', specs: ['Подвижность: П4', 'Морозостойкость: F100'], price: 'от 20 500 ₸/м³' },
            { title: 'Бетон М-300', subtitle: 'Класс B22.5 (прочный)', badge: 'Хит', specs: ['Подвижность: П4', 'Морозостойкость: F200'], price: 'от 23 500 ₸/м³' }
          ]
        },
        {
          name: 'Цементный раствор',
          items: [
            { title: 'Раствор М-150', subtitle: 'Класс M150 кладочный', specs: ['Марка по прочности: M150'], price: 'от 19 000 ₸/м³' },
            { title: 'Раствор М-200', subtitle: 'Класс M200 штукатурный', specs: ['Марка по прочности: M200'], price: 'от 21 000 ₸/м³' }
          ]
        }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок прайс-листа', type: 'string' },
      { name: 'buttonText', label: 'Текст кнопки заказа', type: 'string' }
    ]
  },
  {
    component: 'StructVehicleListRowsBlock',
    family: 'Struct',
    nameRu: 'Строки спецтехники (Struct)',
    description: 'Каталог строительной техники. На десктопе отображается в виде широких горизонтальных строк с ценой.',
    props: {
      title: 'Аренда спецтехники в Алматы',
      buttonText: 'АРЕНДОВАТЬ',
      whatsappPhone: '77016404818',
      items: [
        {
          title: 'Автокран XCMG 25 тонн',
          description: 'Используется для монтажа строительных лесов, погрузки и подъема строительных материалов на высоту до 40м.',
          specs: ['Грузоподъемность: 25 тонн', 'Длина стрелы: 39.5 метров', 'Минимальный заказ: 8 часов'],
          price: 'от 18 000 ₸/час',
          image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400'
        },
        {
          title: 'Гусеничный экскаватор Caterpillar 320',
          description: 'Идеально подходит для рытья глубоких котлованов, сноса старых строений и планировки грунта.',
          specs: ['Объем ковша: 1.2 м³', 'Глубина копания: 6.5 метров'],
          price: 'от 22 000 ₸/час',
          image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901f?auto=format&fit=crop&q=80&w=400'
        }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок каталога', type: 'string' },
      { name: 'buttonText', label: 'Текст кнопки аренды', type: 'string' }
    ]
  },
  {
    component: 'StructVehicleParkBlock',
    family: 'Struct',
    nameRu: 'Сетка спецтехники (Struct Grid)',
    description: 'Карточки спецтехники, расположенные в виде аккуратной сетки с иконками ключевых параметров.',
    props: {
      title: 'Парк строительной техники для аренды',
      buttonText: 'ЗАБРОНИРОВАТЬ',
      whatsappPhone: '77016404818',
      items: [
        { title: 'Манипулятор 10 тонн', description: 'Борт 10т, стрела 5т. Подходит для перевозки бытовок.', specs: ['Стрела: 5т', 'Кузов: 10т'], price: 'от 15 000 ₸/час', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=300' },
        { title: 'Самосвал Shacman 25т', description: 'Доставка бетона, песка, щебня, вывоз строительного мусора.', specs: ['Объем кузова: 20 м³', 'Грузоподъемность: 25т'], price: 'от 12 000 ₸/рейс', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=300' }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок секции', type: 'string' },
      { name: 'buttonText', label: 'Текст кнопки', type: 'string' }
    ]
  },
  {
    component: 'StructIntroBlock',
    family: 'Struct',
    nameRu: 'Короткое введение (Struct Intro)',
    description: 'Простой минималистичный блок: крупная вводная фраза для перехода к основным разделам.',
    props: {
      title: 'Мы создаем надежный фундамент для вашего бизнеса и жизни, сочетая строгие инженерные стандарты и современные технологии.',
      text: 'Уже более 10 лет мы помогаем клиентам реализовывать проекты любой сложности в коммерческом и жилом секторах.'
    },
    editableFields: [
      { name: 'title', label: 'Вводный текст', type: 'string' },
      { name: 'text', label: 'Описание', type: 'string' }
    ]
  },
  {
    component: 'StructStepsBlock',
    family: 'Struct',
    nameRu: 'Схема этапов работы (Struct Steps)',
    description: 'Горизонтальная цепочка шагов работы с пунктирными разделителями и иконками.',
    props: {
      title: 'Схема нашей работы',
      isDark: false,
      steps: [
        { icon: 'lucide:phone-call', title: '1. Заявка и звонок', text: 'Оставляете заявку, наш специалист перезванивает вам за 10 минут.' },
        { icon: 'lucide:map-pin', title: '2. Выезд на замер', text: 'Инженер выезжает на объект, проводит замеры и согласовывает детали.' },
        { icon: 'lucide:file-text', title: '3. Смета и договор', text: 'Составляем детальную смету, подписываем официальный договор.' },
        { icon: 'lucide:shield', title: '4. Сдача объекта', text: 'Выполняем работы точно в срок и предоставляем гарантию.' }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок схемы', type: 'string' },
      { name: 'isDark', label: 'Темный фон блока', type: 'boolean' }
    ]
  },

  // === SHINE FAMILY ===
  {
    component: 'ShineHeaderBlock',
    family: 'Shine',
    nameRu: 'Шапка клининга (Shine Header)',
    description: 'Навигационная панель в стиле клининг-семейства с логотипом и контактами.',
    props: {
      logoText: 'ShineClean',
      buttonText: 'Рассчитать стоимость',
      links: [
        { label: 'О нас', url: '#about' },
        { label: 'Цены', url: '#prices' },
        { label: 'Отзывы', url: '#reviews' }
      ]
    },
    editableFields: [
      { name: 'logoText', label: 'Логотип', type: 'string' },
      { name: 'buttonText', label: 'Кнопка', type: 'string' }
    ]
  },
  {
    component: 'ShineHeroBlock',
    family: 'Shine',
    nameRu: 'Главный экран клининга (Shine Hero)',
    description: 'Эффектный первый экран для клининга/услуг с рукописным подчеркиванием акцентов и круглой карточкой отзывов.',
    props: {
      bgColor: '#0B4A3A',
      textColor: '#ffffff',
      accentColor: '#b0f53c',
      subtitle: 'Превратим уборку в удовольствие. Наведем идеальный порядок в вашей квартире, офисе или коттедже за 3-5 часов.',
      ctaText: 'Заказать уборку',
      ctaUrl: '#booking',
      phoneLabel: 'Круглосуточный вызов клинера',
      phoneValue: '+7 701 640 4818',
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600',
      imageCardBgColor: '#dbe7d6',
      statsNumber: '10K+',
      statsLabel: 'Довольных клиентов в Алматы',
      trustBadgeStyle: 'squares',
      trustBadges: [
        { type: 'trustpilot', name: 'Trustpilot', label: 'Рейтинг 4.9', starsCount: 5 },
        { type: '2gis', name: '2GIS', label: 'Рейтинг 4.8', starsCount: 5 }
      ]
    },
    editableFields: [
      { name: 'bgColor', label: 'Цвет фона (Hex)', type: 'color' },
      { name: 'textColor', label: 'Цвет текста (Hex)', type: 'color' },
      { name: 'accentColor', label: 'Акцентный цвет (Hex)', type: 'color' },
      { name: 'subtitle', label: 'Подзаголовок', type: 'string' },
      { name: 'ctaText', label: 'Текст CTA кнопки', type: 'string' },
      { name: 'phoneValue', label: 'Телефон', type: 'string' },
      { name: 'imageUrl', label: 'Изображение клинера', type: 'image' },
      { name: 'statsNumber', label: 'Значение отзывов', type: 'string' },
      { name: 'statsLabel', label: 'Текст отзывов', type: 'string' }
    ]
  },
  {
    component: 'ShineWhyChooseUsBlock',
    family: 'Shine',
    nameRu: 'Почему выбирают клининг (Shine)',
    description: 'Блок преимуществ с волнистыми линиями и аккуратными скругленными карточками.',
    props: {
      title: 'Наши главные фишки в клининге',
      subtitle: 'Мы тщательно отбираем персонал, используем гипоаллергенную химию и отвечаем за сохранность вещей.',
      features: [
        { title: 'Профессионалы', text: 'Все клинеры проходят обучение и проверку службой безопасности.' },
        { title: 'Эко-химия', text: 'Используем безопасные средства без резких запахов, безвредные для детей и животных.' },
        { title: 'Гарантия', text: 'Если найдете недочет — приедем и бесплатно устраним в течение 24 часов.' }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'subtitle', label: 'Подзаголовок', type: 'string' }
    ]
  },
  {
    component: 'ShineClientsBlock',
    family: 'Shine',
    nameRu: 'Сетка клиентов клининга (Shine Clients)',
    description: 'Интерактивная лента/сетка отзывов или брендов с чистым современным дизайном.',
    props: {
      title: 'Нам доверяют чистоту',
      subtitle: 'Среди наших постоянных клиентов крупные офисы, салоны красоты и тысячи семей.',
      clients: [
        { name: 'Салон красоты Elle', logo: 'lucide:sparkles', text: 'Уборка каждый день перед открытием.' },
        { name: 'Офис ТОО "IT-Force"', logo: 'lucide:laptop', text: 'Генеральная уборка раз в неделю.' }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'subtitle', label: 'Подзаголовок', type: 'string' }
    ]
  },
  {
    component: 'ShineAboutUsBlock',
    family: 'Shine',
    nameRu: 'О компании клининга (Shine About)',
    description: 'Информационный блок с круглыми элементами и мягкой палитрой.',
    props: {
      title: 'Мы наводим блеск и чистоту с 2018 года',
      text: '<p>Наша цель — избавить вас от рутины. Мы берем на себя мытье окон, химчистку диванов и ежедневную уборку.</p>',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=500'
    },
    editableFields: [
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'text', label: 'Текст (HTML)', type: 'string' }
    ]
  },

  // === GREXA FAMILY ===
  {
    component: 'GrexaHeroBlock',
    family: 'Grexa',
    nameRu: 'Главный экран Grexa',
    description: 'Современный высокотехнологичный первый экран с 3D-эффектом и карточкой рейтинга.',
    props: {
      title: 'Энергосберегающие системы для зданий',
      subtitle: 'Снижаем затраты на отопление и электроэнергию до 40% с помощью интеллектуального управления Grexa.',
      buttonText: 'Начать расчет экономии',
      whatsappPhone: '77016404818',
      heroImage: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600'
    },
    editableFields: [
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'subtitle', label: 'Подзаголовок', type: 'string' },
      { name: 'buttonText', label: 'Текст кнопки', type: 'string' }
    ]
  },
  {
    component: 'GrexaAboutUsBlock',
    family: 'Grexa',
    nameRu: 'О нас Grexa',
    description: 'Минималистичный двухколоночный блок с акцентом на экологичность.',
    props: {
      title: 'Инновационные инженерные системы',
      text: '<p>Grexa — лидер в области автоматизации инженерных сетей отопления и вентиляции.</p>'
    },
    editableFields: [
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'text', label: 'Текст', type: 'string' }
    ]
  },
  {
    component: 'GrexaServicesBlock',
    family: 'Grexa',
    nameRu: 'Услуги Grexa',
    description: 'Интерактивная сетка услуг с мягкими тенями и переходами при наведении.',
    props: {
      title: 'Что мы умеем делать лучше всего',
      services: [
        { title: 'Аудит систем отопления', text: 'Выявляем утечки тепла и неэффективность оборудования.' },
        { title: 'Автоматика ИТП', text: 'Установка погодных регуляторов и контроллеров давления.' }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок', type: 'string' }
    ]
  },

  // === NAVU FAMILY ===
  {
    component: 'NavuHeroBlock',
    family: 'Navu',
    nameRu: 'Главный экран Navu',
    description: 'Современный футуристический дизайн главного экрана со стеклянными элементами.',
    props: {
      title: 'Создаем цифровые продукты нового поколения',
      subtitle: 'Разработка продающих сайтов, мобильных приложений и CRM систем для автоматизации.',
      buttonText: 'Обсудить проект',
      whatsappPhone: '77016404818'
    },
    editableFields: [
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'subtitle', label: 'Подзаголовок', type: 'string' }
    ]
  },
  {
    component: 'NavuServicesBlock',
    family: 'Navu',
    nameRu: 'Услуги Navu',
    description: 'Каталог услуг в стиле темной темы с неоновым свечением и иконками.',
    props: {
      title: 'Направления нашей разработки',
      services: [
        { title: 'Разработка Landing Page', text: 'Создание продающих страниц с конверсией до 15%.' },
        { title: 'Интеграция CRM', text: 'Свяжем сайт с amoCRM или Bitrix24 для учета всех лидов.' }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок', type: 'string' }
    ]
  },
  {
    component: 'NavuStatsBlock',
    family: 'Navu',
    nameRu: 'Статистика Navu',
    description: 'Эффектные цифры статистики на темном фоне с точечным паттерном.',
    props: {
      title: 'Наши показатели в цифрах',
      stats: [
        { value: '500+', label: 'Сданных сайтов' },
        { value: '98%', label: 'Довольных клиентов' },
        { value: '15', label: 'Разработчиков в штате' }
      ]
    },
    editableFields: [
      { name: 'title', label: 'Заголовок', type: 'string' }
    ]
  },

  // === COVER FAMILY ===
  {
    component: 'CoverHeroBlock',
    family: 'Cover',
    nameRu: 'Полноэкранный главный экран (Cover Hero)',
    description: 'Премиальный полноэкранный главный экран со стеклянной шапкой, аватарами клиентов и формой захвата контактов.',
    props: {
      logoText: 'Garant Invest',
      headerButtonText: 'Заказать звонок',
      whatsappPhone: '77016404818',
      title: 'Инвестиции в недвижимость<br/>с доходностью от 15% годовых',
      subtitle: 'Обеспечьте стабильный пассивный доход с надежным партнером на рынке Казахстана. Гарантия сохранности капитала.',
      backgroundImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200',
      ratingText: 'Более 500 успешных инвесторов',
      avatars: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
      ],
      showForm: true,
      formTitle: 'Получить инвестиционный план',
      formButtonText: 'Получить план бесплатно',
      showEmailField: true,
      isEmailFieldRequired: false,
      showSelectField: true,
      formSelectPlaceholder: 'Сумма инвестиций...',
      formSelectOptions: [
        'До 5 000 000 ₸',
        'От 5 000 000 до 20 000 000 ₸',
        'Свыше 20 000 000 ₸'
      ]
    },
    editableFields: [
      { name: 'logoText', label: 'Текст логотипа', type: 'string' },
      { name: 'headerButtonText', label: 'Кнопка в шапке', type: 'string' },
      { name: 'title', label: 'Главный заголовок (HTML)', type: 'string' },
      { name: 'subtitle', label: 'Описание', type: 'string' },
      { name: 'backgroundImage', label: 'Фоновая картинка', type: 'image' },
      { name: 'ratingText', label: 'Текст рейтинга', type: 'string' },
      { name: 'formTitle', label: 'Заголовок формы', type: 'string' },
      { name: 'formButtonText', label: 'Текст кнопки формы', type: 'string' },
      { name: 'showForm', label: 'Показывать форму', type: 'boolean' }
    ]
  },

  // === OTHERS FAMILY ===
  {
    component: 'ChemaHeroBlock',
    family: 'Cover', // Относится к премиум-обложкам
    nameRu: 'Главный экран Chema',
    description: 'Премиальный полноэкранный первый экран с видео/фото фоном, крупным заголовком слева и встроенной шапкой.',
    props: {
      logoText: 'Chema',
      logoIcon: 'lucide:layers',
      title: 'Современные химические решения для промышленности',
      description: 'Проверенные эксперты в производстве добавок для текстильной, резинотехнической и бумажной отраслей.',
      backgroundImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      headerCta: { label: 'Связаться с нами', url: '#contacts' },
      primaryCta: { label: 'Посмотреть продукцию', url: '#products' }
    },
    editableFields: [
      { name: 'logoText', label: 'Логотип', type: 'string' },
      { name: 'title', label: 'Заголовок', type: 'string' },
      { name: 'description', label: 'Описание', type: 'string' },
      { name: 'backgroundImage', label: 'Фоновое изображение', type: 'image' }
    ]
  },
  {
    component: 'SectionBadge',
    family: 'Others',
    nameRu: 'Бэйдж секции (SectionBadge)',
    description: 'Вспомогательный компонент для создания небольших меток-надзаголовков в начале разделов.',
    props: {
      text: 'АКТУАЛЬНО',
      defaultStyle: 'pill'
    },
    editableFields: [
      { name: 'text', label: 'Текст бейджа', type: 'string' },
      { name: 'defaultStyle', label: 'Стиль по умолчанию', type: 'select', options: ['pill', 'sharp', 'dot', 'wavy'] }
    ]
  },
  {
    component: 'TextReveal',
    family: 'Others',
    nameRu: 'Анимированный текст (TextReveal)',
    description: 'Вспомогательный компонент для плавного проявления букв или слов при загрузке или скролле.',
    props: {
      text: 'Инновации и надежность в каждой детали',
      animation: 'blur-reveal',
      tag: 'h2'
    },
    editableFields: [
      { name: 'text', label: 'Текст', type: 'string' },
      { name: 'animation', label: 'Тип анимации', type: 'select', options: ['blur-reveal', 'fade-up', 'slide-in'] },
      { name: 'tag', label: 'HTML тег', type: 'select', options: ['h1', 'h2', 'h3', 'p', 'span'] }
    ]
  }
];
