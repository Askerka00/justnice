const puppeteer = require('puppeteer');
const fs = require('fs');

const SEARCH_QUERY = 'металлопрокат';
const CITY = 'almaty';
const OUTPUT_FILE = 'leads_pool.csv';
const MAX_PAGES = 30; // Лимит безопасности

async function scrape2GIS() {
  console.log('🚀 Запускаю браузер...');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1400, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  const allLeads = [];
  const seenLinks = new Set();

  console.log('\n🔎 Фаза 1: Сбор ссылок на компании...');

  for (let pageNum = 1; pageNum <= MAX_PAGES; pageNum++) {
    const url = pageNum === 1
      ? `https://2gis.kz/${CITY}/search/${encodeURIComponent(SEARCH_QUERY)}`
      : `https://2gis.kz/${CITY}/search/${encodeURIComponent(SEARCH_QUERY)}/page/${pageNum}`;
    
    console.log(`\n📄 Страница ${pageNum}: ${url}`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await sleep(3000);

      // Обходим предупреждение о браузере
      const acceptBtn = await page.$('#acceptRiskButton');
      if (acceptBtn) {
        console.log('  ⚠️ Предупреждение о браузере! Обходим...');
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }),
          page.evaluate(() => document.getElementById('acceptRiskButton').click())
        ]);
        await sleep(3000);
      }
      
      // Скроллим вниз чтобы подгрузились все карточки
      await autoScrollResults(page);
      await sleep(2000);

      // Собираем ссылки на фирмы со страницы
      const firmLinks = await page.evaluate(() => {
        const links = [];
        const seen = new Set();
        
        document.querySelectorAll('a[href*="/firm/"]').forEach(a => {
          let href = a.href.split('?')[0]; // Убираем stat параметры
          if (seen.has(href)) return;
          seen.add(href);
          
          const name = a.textContent.trim();
          if (name && name.length > 1 && name.length < 200) {
            links.push({ name, gisLink: href });
          }
        });
        
        return links;
      });

      if (firmLinks.length === 0) {
        console.log('  ⏹️ На странице не найдено компаний. Завершаем сбор ссылок.');
        break;
      }

      // Проверяем, есть ли новые компании на этой странице
      let newCount = 0;
      for (const lead of firmLinks) {
        if (!seenLinks.has(lead.gisLink)) {
          seenLinks.add(lead.gisLink);
          allLeads.push(lead);
          newCount++;
        }
      }

      console.log(`  ✅ Найдено компаний: ${firmLinks.length} (новых: ${newCount})`);
      
      // Если на странице нет вообще новых компаний (пошел повторный круг), выходим
      if (newCount === 0) {
        console.log('  ⏹️ Все компании на странице уже были собраны ранее. Завершаем сбор ссылок.');
        break;
      }

    } catch (e) {
      console.log(`  ❌ Ошибка загрузки страницы ${pageNum}: ${e.message}`);
      break;
    }
  }

  console.log(`\n📊 Всего уникальных компаний собрано: ${allLeads.length}`);
  console.log('\n🔍 Фаза 2: Сбор деталей (телефоны, сайты, адреса) по каждой компании...\n');

  // Проходим по каждой карточке и собираем детали
  for (let i = 0; i < allLeads.length; i++) {
    const lead = allLeads[i];
    if (!lead.gisLink) continue;
    
    try {
      process.stdout.write(`  [${i + 1}/${allLeads.length}] ${lead.name}...`);
      await page.goto(lead.gisLink, { waitUntil: 'networkidle2', timeout: 15000 });
      await sleep(2000);

      // Обходим предупреждение о браузере, если появилось на карточке
      const acceptBtn = await page.$('#acceptRiskButton');
      if (acceptBtn) {
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }),
          page.evaluate(() => document.getElementById('acceptRiskButton').click())
        ]);
        await sleep(2000);
      }
      
      const details = await page.evaluate(() => {
        let phone = '';
        let phones = [];
        let website = '';
        let address = '';
        let rating = '';
        let reviewCount = '';
        let category = '';
        let description = '';

        // Вспомогательная функция для декодирования маскированных ссылок 2GIS
        function decodeGisLink(href) {
          try {
            const parts = href.split('/');
            const b64Part = parts.find(p => p.length > 20 && /^[a-zA-Z0-9+\/=]+$/.test(p));
            if (b64Part) {
              const decoded = atob(b64Part);
              return decoded.split('\n')[0].trim();
            }
          } catch (e) {
            // игнорируем
          }
          return null;
        }
        
        // Телефоны — все ссылки tel:
        document.querySelectorAll('a[href^="tel:"]').forEach(a => {
          const num = a.href.replace('tel:', '').replace(/[^0-9+]/g, '');
          if (num && !phones.includes(num)) phones.push(num);
        });
        phone = phones[0] || '';
        
        // Сайт — декодируем ссылки link.2gis.com или ищем прямые
        document.querySelectorAll('a[href]').forEach(a => {
          const href = a.href;
          let realUrl = '';
          
          if (href.includes('link.2gis.com')) {
            realUrl = decodeGisLink(href) || '';
          } else if (href.startsWith('http') && !href.includes('2gis')) {
            realUrl = href;
          }
          
          if (realUrl && !website) {
            const lowUrl = realUrl.toLowerCase();
            if (!lowUrl.includes('whatsapp') && !lowUrl.includes('wa.me') && 
                !lowUrl.includes('tel:') && !lowUrl.includes('mailto:') &&
                !lowUrl.includes('google.com') && !lowUrl.includes('yandex') && 
                !lowUrl.includes('facebook.com') && !lowUrl.includes('vk.com') && 
                !lowUrl.includes('t.me') && !lowUrl.includes('instagram.com') &&
                !lowUrl.includes('ok.ru') && !lowUrl.includes('youtube.com') &&
                !lowUrl.includes('twitter.com')) {
              website = realUrl;
            }
          }
        });
        
        // Рейтинг
        const ratingEl = document.querySelector('[class*="_y10az"]') 
                      || document.querySelector('[itemprop="ratingValue"]');
        if (ratingEl) rating = ratingEl.textContent.trim();
        
        // Кол-во оценок
        const reviewEl = document.querySelector('[class*="_jspzd"]');
        if (reviewEl) reviewCount = reviewEl.textContent.replace(/[^\d]/g, '');
        
        // Категория
        const catEl = document.querySelector('[class*="_1jvng"]');
        if (catEl) category = catEl.textContent.trim();
        
        // Адрес
        const addrEl = document.querySelector('[class*="_49kxl"]')
                    || document.querySelector('[class*="_er2xx"]');
        if (addrEl) address = addrEl.textContent.trim()
          .replace(/Показать вход.*/, '')
          .replace(/Рассмотреть.*/, '')
          .replace(/\s+/g, ' ')
          .trim();
        
        return { phone, phones: phones.join(', '), website, address, rating, reviewCount, category, description };
      });
      
      Object.assign(lead, details);
      console.log(` ☎️ ${details.phone || '—'} | 🌐 ${details.website || '—'}`);
      
    } catch (e) {
      console.log(` ⚠️ Ошибка сбора деталей: ${e.message}`);
    }
    
    await sleep(500);
  }

  // Сохраняем CSV
  const csvHeaders = [
    'Название', 'Категория', 'Рейтинг', 'Кол-во оценок', 'Адрес',
    'Телефон', 'Все телефоны', 'Сайт', 'Описание', 'Ссылка 2GIS'
  ].join(';');

  const csvRows = allLeads.map(l => {
    return [
      l.name || '',
      l.category || '',
      l.rating || '',
      l.reviewCount || '',
      l.address || '',
      l.phone || '',
      l.phones || '',
      l.website || '',
      l.description || '',
      l.gisLink || ''
    ].map(v => `"${(v || '').replace(/"/g, '""')}"`).join(';');
  });

  const csvContent = '\uFEFF' + csvHeaders + '\n' + csvRows.join('\n') + '\n';
  fs.writeFileSync(OUTPUT_FILE, csvContent, 'utf8');

  console.log(`\n✅ Готово! Собрано ${allLeads.length} лидов → ${OUTPUT_FILE}`);
  console.log(`  📞 С телефоном: ${allLeads.filter(l => l.phone).length}`);
  console.log(`  🌐 С сайтом: ${allLeads.filter(l => l.website).length}`);
  
  await browser.close();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoScrollResults(page) {
  for (let i = 0; i < 15; i++) {
    const scrolled = await page.evaluate(() => {
      const containers = document.querySelectorAll('div');
      let scrollable = null;
      for (const el of containers) {
        const style = window.getComputedStyle(el);
        if ((style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
          if (el.clientHeight > 200) {
            scrollable = el;
            break;
          }
        }
      }
      if (scrollable) {
        scrollable.scrollTop += 450;
        return true;
      }
      return false;
    });
    if (!scrolled) break;
    await sleep(500);
  }
}

scrape2GIS().catch(err => {
  console.error('❌ Ошибка:', err.message);
  process.exit(1);
});
