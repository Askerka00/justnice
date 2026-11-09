const fs = require('fs');

// Параметры для парсинга
const QUERY = encodeURIComponent('металлопрокат'); // Твоя ниша
const CITY_CENTER = '76.960763,43.229972'; // Координаты Алматы (из твоего URL)
const KEY = 'c7f1a769-c8a5-4636-b14d-d8c987808a12'; // Публичный ключ 2ГИС
const MAX_PAGES = 10; // Сколько страниц собирать
const CSV_FILENAME = 'almaty_leads.csv';

// Добавил items.contact_groups для получения телефонов и сайтов
const FIELDS = 'items.name_ex,items.address,items.contact_groups,items.reviews,items.rubrics,items.stat';
const BASE_URL = `https://catalog.api.2gis.ru/3.0/items?key=${KEY}&q=${QUERY}&fields=${FIELDS}&page_size=50&locale=ru_KZ&search_device_type=desktop`;

async function fetchLeads() {
  // Создаем CSV файл с BOM (чтобы Excel нормально читал кириллицу)
  fs.writeFileSync(CSV_FILENAME, '\uFEFF' + 'Название;Адрес;Телефон;Сайт/Инста;Рейтинг;Рубрика;Платная реклама\n', 'utf8');

  for (let page = 1; page <= MAX_PAGES; page++) {
    console.log(`Парсим страницу ${page}...`);
    
    try {
      const response = await fetch(`${BASE_URL}&page=${page}`);
      const json = await response.json();

      if (json.meta && json.meta.code !== 200) {
        console.error(`❌ Ошибка API на странице ${page}: ${json.meta.error?.message || 'Неизвестная ошибка'} (${json.meta.error?.type || ''})`);
        if (json.meta.error?.type === 'apiKeyIsBlocked') {
          console.error('API ключ заблокирован 2ГИС. Получите новый ключ на https://dev.2gis.com/');
        }
        break;
      }

      // Если 2ГИС вернул пустой массив или ошибку — останавливаем цикл
      if (!json.result || !json.result.items || json.result.items.length === 0) {
        console.log('✅ База закончилась.');
        break;
      }

      const items = json.result.items;

      items.forEach(item => {
        const name = item.name_ex?.primary || item.name || 'Без названия';
        const address = item.address_name || (item.address && item.address.address_name) || '';
        const rating = item.reviews?.general_rating || 'Нет';
        const category = item.rubrics && item.rubrics.length > 0 ? item.rubrics[0].name : '';
        const isPromoted = item.stat?.is_advertised ? 'Да' : 'Нет'; // Маркер "Жирного" клиента

        let phone = '';
        let website = '';

        // Вытаскиваем контакты (телефон и сайт)
        if (item.contact_groups) {
          item.contact_groups.forEach(group => {
            if (group.contacts) {
              group.contacts.forEach(contact => {
                if (contact.type === 'phone' && !phone) {
                    // Очищаем номер от пробелов и скобок для WhatsApp
                    phone = contact.value.replace(/[^0-9+]/g, ''); 
                }
                if ((contact.type === 'website' || contact.alias === 'instagram') && !website) {
                    website = contact.value || contact.url || contact.text;
                }
              });
            }
          });
        }

        // Экранируем переменные для CSV, чтобы запятые и кавычки в названиях не сломали таблицу
        const csvRow = `"${name}";"${address}";"${phone}";"${website}";"${rating}";"${category}";"${isPromoted}"\n`;
        fs.appendFileSync(CSV_FILENAME, csvRow, 'utf8');
      });

    } catch (error) {
      console.error(`❌ Ошибка на странице ${page}:`, error.message);
    }
    
    // Пауза 1.5 секунды между запросами, чтобы API 2ГИС не выдал бан по IP (Rate Limit)
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log(`\n🚀 Конвейер отработал! Лиды лежат в файле ${CSV_FILENAME}`);
}

fetchLeads();
