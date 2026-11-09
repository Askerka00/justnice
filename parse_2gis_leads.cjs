const fs = require('fs');

// ============================================================
// Парсер сырого 2gis.csv → чистый leads_pool.csv
// ============================================================

const INPUT_FILE = '2gis.csv';
const OUTPUT_FILE = 'leads_pool.csv';

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function decodeBase64FromLink(link) {
  // Ссылки link.2gis.com содержат base64-encoded URL после /4.2/XXXX/
  // Формат: https://link.2gis.com/4.2/HASH/BASE64_ENCODED_DATA
  try {
    const match = link.match(/link\.2gis\.com\/[\d.]+\/[A-F0-9]+\/([A-Za-z0-9+/=%\n]+)/);
    if (!match) return '';
    // URL-декодируем и потом base64 декодируем
    let b64 = decodeURIComponent(match[1]);
    // Берём только первую часть до переноса строки (основной URL)
    b64 = b64.split('\n')[0].split('\r')[0];
    // Дополняем padding если нужно
    while (b64.length % 4 !== 0) b64 += '=';
    return Buffer.from(b64, 'base64').toString('utf8');
  } catch (e) {
    return '';
  }
}

function extractPhone(fields) {
  // Ищем поле вида tel:+77007236868
  for (const field of fields) {
    const telMatch = field.match(/^tel:(\+?\d+)/);
    if (telMatch) return telMatch[1];
  }
  return '';
}

function extractWhatsApp(fields) {
  for (const field of fields) {
    // 1. Прямые whatsapp ссылки в тексте
    let waMatch = field.match(/whatsapp\.com\/send\/?\?phone=(\d+)/);
    if (waMatch) return '+' + waMatch[1];
    
    waMatch = field.match(/wa\.me\/(\d+)/);
    if (waMatch) return '+' + waMatch[1];
    
    waMatch = field.match(/wa\.clck\.bar\/(\d+)/);
    if (waMatch) return '+' + waMatch[1];
    
    // 2. Декодируем из link.2gis.com (base64)
    if (field.includes('link.2gis.com')) {
      const decoded = decodeBase64FromLink(field);
      if (decoded) {
        waMatch = decoded.match(/whatsapp\.com\/send\/?\?phone=(\d+)/);
        if (waMatch) return '+' + waMatch[1];
        
        waMatch = decoded.match(/wa\.me\/(\d+)/);
        if (waMatch) return '+' + waMatch[1];
        
        waMatch = decoded.match(/wa\.clck\.bar\/(\d+)/);
        if (waMatch) return '+' + waMatch[1];
      }
    }
  }
  return '';
}

function extractWebsite(fields) {
  for (const field of fields) {
    // 1. Декодируем из link.2gis.com
    if (field.includes('link.2gis.com')) {
      const decoded = decodeBase64FromLink(field);
      if (decoded) {
        // Ищем сайт компании (не whatsapp, не 2gis)
        const siteMatch = decoded.match(/(https?:\/\/[^\s?]+)/);
        if (siteMatch) {
          const url = siteMatch[1];
          if (!url.includes('whatsapp.') && 
              !url.includes('wa.me') && 
              !url.includes('wa.clck') &&
              !url.includes('2gis.') &&
              !url.includes('bss.2gis')) {
            return url;
          }
        }
      }
    }
  }
  
  // 2. Прямые ссылки на сайты (не 2gis, не whatsapp, не tel:)
  for (const field of fields) {
    if (field.startsWith('http') && 
        !field.includes('2gis.') && 
        !field.includes('whatsapp.') && 
        !field.includes('wa.me') &&
        !field.includes('wa.clck') &&
        !field.startsWith('tel:') &&
        !field.includes('link.2gis')) {
      return field;
    }
  }
  return '';
}

// Читаем сырой CSV
const rawData = fs.readFileSync(INPUT_FILE, 'utf8');
const lines = rawData.split('\n').map(l => l.replace(/\r$/, ''));

// Первая строка — заголовки (CSS-классы от расширения)
const headers = parseCSVLine(lines[0]);
console.log(`📋 Заголовки сырого CSV (${headers.length} полей):`);
headers.forEach((h, i) => console.log(`  [${i}] ${h}`));

// Маппинг полей по индексам (на основе анализа данных):
// [0]  _1rehek href    → ссылка на 2gis карточку
// [1]  _lvwrwt         → Название компании
// [2]  _1jvng3r        → Категория/рубрика  
// [3]  _1jvng3r href   → ссылка на категорию
// [4]  _y10azs         → Рейтинг (4.7, 5, ...)
// [5]  _jspzdm         → Кол-во оценок
// [6]  _sfdp8cg        → Адрес (основной)
// [7]  _sfdp8cg 2      → Адрес (доп)
// [8]  _1rehek         → Филиалы
// [9]  _1rehek href 2  → Ссылка на филиалы
// [10] _4cxmw7         → Доставка
// [11] _klarpw         → Статус (Закрыто/Открыто)
// [12] _snijgp         → Описание/слоган
// [13] _sfdp8cg 3      → доп. инфо
// [14] _mprgcc2        → Реклама
// [15] _sfdp8cg 4      → Юр. лицо
// [16] _1yrretd2 href  → Телефон/WhatsApp/Сайт ссылка
// [17] _nacxp7         → CTA текст (Позвонить, Написать в WhatsApp, ...)
// [18] _3yxk2u         → Доп. адрес

const leads = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const fields = parseCSVLine(line);
  
  // Пропускаем пустые строки
  const name = fields[1] || '';
  if (!name) continue;

  const category = fields[2] || '';
  const rating = fields[4] || '';
  const reviewCount = (fields[5] || '').replace(/[^\d]/g, '');
  
  // Адрес — может быть в поле [6] или [18]
  let address = (fields[6] || '').replace(/^​/, '').trim(); // убираем zero-width space
  if (!address && fields[18]) {
    address = fields[18].replace(/^​/, '').trim();
  }
  
  const hasDelivery = (fields[10] || '').includes('Доставка') ? 'Да' : 'Нет';
  const status = fields[11] || '';
  const description = fields[12] || '';
  const isAd = (fields[14] || '').includes('Реклама') ? 'Да' : 'Нет';
  const legalEntity = (fields[15] || '').replace(/^​/, '').trim();
  
  // Контакты
  const phone = extractPhone(fields);
  const whatsapp = extractWhatsApp(fields);
  const website = extractWebsite(fields);
  const ctaText = fields[17] || '';
  
  // 2GIS ссылка
  const gisLink = (fields[0] || '').split('?')[0]; // Убираем stat параметры

  leads.push({
    name,
    category,
    rating,
    reviewCount,
    address,
    phone,
    whatsapp,
    website,
    description,
    hasDelivery,
    status,
    isAd,
    legalEntity,
    ctaText,
    gisLink
  });
}

// Формируем чистый CSV
const csvHeaders = [
  'Название',
  'Категория', 
  'Рейтинг',
  'Кол-во оценок',
  'Адрес',
  'Телефон',
  'WhatsApp',
  'Сайт',
  'Описание',
  'Доставка',
  'Статус',
  'Платная реклама',
  'Юр. лицо',
  'CTA',
  'Ссылка 2GIS'
].join(';');

const csvRows = leads.map(l => {
  return [
    l.name,
    l.category,
    l.rating,
    l.reviewCount,
    l.address,
    l.phone,
    l.whatsapp,
    l.website,
    l.description,
    l.hasDelivery,
    l.status,
    l.isAd,
    l.legalEntity,
    l.ctaText,
    l.gisLink
  ].map(v => `"${(v || '').replace(/"/g, '""')}"`).join(';');
});

const csvContent = '\uFEFF' + csvHeaders + '\n' + csvRows.join('\n') + '\n';
fs.writeFileSync(OUTPUT_FILE, csvContent, 'utf8');

console.log(`\n✅ Готово! Обработано ${leads.length} лидов из ${INPUT_FILE}`);
console.log(`📁 Пулл лидов сохранён в: ${OUTPUT_FILE}\n`);

// Выводим сводку
console.log('📊 Сводка:');
console.log(`  Всего лидов: ${leads.length}`);
console.log(`  С телефоном: ${leads.filter(l => l.phone).length}`);
console.log(`  С WhatsApp: ${leads.filter(l => l.whatsapp).length}`);
console.log(`  С сайтом: ${leads.filter(l => l.website).length}`);
console.log(`  С платной рекламой: ${leads.filter(l => l.isAd === 'Да').length}`);
console.log(`  С доставкой: ${leads.filter(l => l.hasDelivery === 'Да').length}`);
console.log('');
leads.forEach((l, i) => {
  console.log(`  ${i + 1}. ${l.name} | ${l.rating}⭐ (${l.reviewCount}) | ${l.phone || l.whatsapp || '—'} | ${l.isAd === 'Да' ? '💰 Реклама' : ''}`);
});
