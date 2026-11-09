// Перехватчик запросов (теперь работает непосредственно в контексте страницы через MAIN world)
console.log('2GIS Leads Exporter: Перехватчик запросов инициализирован в MAIN world.');

const handleData = (data) => {
  if (data && data.result && data.result.items) {
    window.dispatchEvent(new CustomEvent('2gis_data_scraped', {
      detail: data.result.items
    }));
  }
};

// Перехват fetch
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const response = await originalFetch.apply(this, args);
  const url = args[0];
  if (typeof url === 'string' && (url.includes('catalog.api.2gis.ru/3.0') || url.includes('catalog.api.2gis.com/3.0'))) {
    try {
      const clone = response.clone();
      const data = await clone.json();
      handleData(data);
    } catch (err) {
      // Игнорируем ошибки
    }
  }
  return response;
};

// Перехват XMLHttpRequest
const originalOpen = XMLHttpRequest.prototype.open;
const originalSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open = function(method, url) {
  this._url = url;
  return originalOpen.apply(this, arguments);
};
XMLHttpRequest.prototype.send = function() {
  this.addEventListener('load', function() {
    if (this._url && (this._url.includes('catalog.api.2gis.ru/3.0') || this._url.includes('catalog.api.2gis.com/3.0'))) {
      try {
        const data = JSON.parse(this.responseText);
        handleData(data);
      } catch (err) {
        // Игнорируем ошибки
      }
    }
  });
  return originalSend.apply(this, arguments);
};

// Основной код сбора лидов
let leads = {};

// Загрузка лидов из sessionStorage
try {
  const savedLeads = sessionStorage.getItem('scraped_2gis_leads');
  if (savedLeads) {
    leads = JSON.parse(savedLeads);
  }
} catch (e) {
  console.error('Ошибка загрузки сохраненных лидов:', e);
}

// Слушаем события от перехватчика
window.addEventListener('2gis_data_scraped', (event) => {
  const items = event.detail;
  let newAdded = 0;

  items.forEach(item => {
    if (!item.id) return;

    const name = item.name_ex?.primary || item.name || 'Без названия';
    const address = item.address_name || (item.address && item.address.address_name) || '';
    const rating = item.reviews?.general_rating || 'Нет';
    const category = item.rubrics && item.rubrics.length > 0 ? item.rubrics[0].name : '';
    const isPromoted = item.stat?.is_advertised ? 'Да' : 'Нет';

    let phone = '';
    let website = '';

    // Вытаскиваем контакты (телефон и сайт)
    if (item.contact_groups) {
      item.contact_groups.forEach(group => {
        if (group.contacts) {
          group.contacts.forEach(contact => {
            if (contact.type === 'phone' && !phone) {
              phone = contact.value.replace(/[^0-9+]/g, '');
            }
            if ((contact.type === 'website' || contact.alias === 'instagram') && !website) {
              website = contact.value || contact.url || contact.text;
            }
          });
        }
      });
    }

    if (!website && item.links) {
      if (Array.isArray(item.links)) {
        const webLink = item.links.find(l => l.type === 'website' || l.type === 'instagram');
        if (webLink) {
          website = webLink.url || webLink.value;
        }
      }
    }

    // Если лид уже существует, обновляем только новые поля
    if (leads[item.id]) {
      const existing = leads[item.id];
      if (phone && !existing.phone) {
        existing.phone = phone;
        newAdded++;
      }
      if (website && !existing.website) {
        existing.website = website;
        newAdded++;
      }
    } else {
      leads[item.id] = {
        name,
        address,
        phone,
        website,
        rating,
        category,
        isPromoted
      };
      newAdded++;
    }
  });

  if (newAdded > 0) {
    sessionStorage.setItem('scraped_2gis_leads', JSON.stringify(leads));
    updateUI();
    flashIndicator();
  }
});

// Создание и обновление интерфейса
let widgetContainer = null;

function createUI() {
  if (widgetContainer) return;

  widgetContainer = document.createElement('div');
  widgetContainer.id = 'exporter-widget-container';
  widgetContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1f2937;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    pointer-events: none;
  `;

  const style = document.createElement('style');
  style.textContent = `
    #exporter-widget-panel {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(229, 231, 235, 0.5);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      width: 280px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: auto;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: bottom right;
    }
    #exporter-widget-panel.minimized {
      transform: scale(0);
      opacity: 0;
      pointer-events: none;
      height: 0;
      padding: 0;
      margin: 0;
      border: none;
    }
    #exporter-widget-badge {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #2563eb;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
      pointer-events: auto;
      transition: all 0.2s ease;
      position: relative;
    }
    #exporter-widget-badge:hover {
      transform: scale(1.05);
      background: #1d4ed8;
    }
    #exporter-widget-badge.hidden {
      display: none;
    }
    .exporter-btn-primary {
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;
      width: 100%;
      text-align: center;
    }
    .exporter-btn-primary:hover {
      background: #1d4ed8;
    }
    .exporter-btn-secondary {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.2s;
      flex: 1;
    }
    .exporter-btn-secondary:hover {
      background: #e5e7eb;
    }
    #exporter-indicator {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      right: 2px;
      display: none;
    }
    #exporter-indicator.active {
      display: block;
      animation: pulse 1s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  document.head.appendChild(style);

  const count = Object.keys(leads).length;

  widgetContainer.innerHTML = `
    <div id="exporter-widget-panel" class="minimized">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(229, 231, 235, 0.5); padding-bottom:8px;">
        <span style="font-weight:700; font-size:14px; color:#111827;">Экспорт лидов 2ГИС</span>
        <span id="exporter-close-btn" style="cursor:pointer; color:#9ca3af; font-size:18px; line-height:1;">&times;</span>
      </div>
      <div style="font-size:13px; color:#4b5563;">
        Собрано компаний: <strong id="exporter-count-val" style="color:#2563eb; font-size:16px;">${count}</strong>
      </div>
      <div style="font-size:11px; color:#6b7280; background:#eff6ff; padding:8px; border-radius:6px; border:1px solid #dbeafe;">
        💡 Лиды собираются автоматически, когда вы ищете на карте и листаете страницы. Открывайте карточки компаний, чтобы получить телефоны и сайты.
      </div>
      <button id="exporter-download-btn" class="exporter-btn-primary">Скачать CSV</button>
      <div style="display:flex; gap:8px; width:100%;">
        <button id="exporter-clear-btn" class="exporter-btn-secondary">Очистить</button>
        <button id="exporter-minimize-btn" class="exporter-btn-secondary">Свернуть</button>
      </div>
    </div>
    <div id="exporter-widget-badge">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top:2px;">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      <div id="exporter-indicator"></div>
      <span id="exporter-badge-count" style="position:absolute; bottom:-5px; right:-5px; background:#ef4444; color:white; font-size:10px; font-weight:700; padding:2px 6px; border-radius:10px; border:2px solid white;">${count}</span>
    </div>
  `;

  document.body.appendChild(widgetContainer);

  // Обработчики кликов
  const badge = document.getElementById('exporter-widget-badge');
  const panel = document.getElementById('exporter-widget-panel');
  const closeBtn = document.getElementById('exporter-close-btn');
  const minimizeBtn = document.getElementById('exporter-minimize-btn');
  const clearBtn = document.getElementById('exporter-clear-btn');
  const downloadBtn = document.getElementById('exporter-download-btn');

  badge.addEventListener('click', () => {
    badge.classList.add('hidden');
    panel.classList.remove('minimized');
  });

  const minimize = () => {
    panel.classList.add('minimized');
    badge.classList.remove('hidden');
  };

  closeBtn.addEventListener('click', minimize);
  minimizeBtn.addEventListener('click', minimize);

  clearBtn.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите очистить собранную базу лидов?')) {
      leads = {};
      sessionStorage.removeItem('scraped_2gis_leads');
      updateUI();
    }
  });

  downloadBtn.addEventListener('click', () => {
    downloadCSV();
  });
}

function updateUI() {
  const count = Object.keys(leads).length;
  const countVal = document.getElementById('exporter-count-val');
  const badgeCount = document.getElementById('exporter-badge-count');

  if (countVal) countVal.textContent = count;
  if (badgeCount) badgeCount.textContent = count;
}

function flashIndicator() {
  const ind = document.getElementById('exporter-indicator');
  if (ind) {
    ind.classList.add('active');
    setTimeout(() => {
      ind.classList.remove('active');
    }, 3000);
  }
}

function downloadCSV() {
  const keys = Object.keys(leads);
  if (keys.length === 0) {
    alert('Нет данных для выгрузки. Сначала найдите компании на карте 2ГИС.');
    return;
  }

  // BOM для корректного отображения кириллицы в Excel
  let csvContent = '\uFEFF' + 'Название;Адрес;Телефон;Сайт/Инста;Рейтинг;Рубрика;Платная реклама\n';

  keys.forEach(id => {
    const item = leads[id];
    
    // Экранируем кавычки
    const name = (item.name || '').replace(/"/g, '""');
    const address = (item.address || '').replace(/"/g, '""');
    const phone = (item.phone || '').replace(/"/g, '""');
    const website = (item.website || '').replace(/"/g, '""');
    const rating = (item.rating || '').replace(/"/g, '""');
    const category = (item.category || '').replace(/"/g, '""');
    const isPromoted = item.isPromoted || 'Нет';

    csvContent += `"${name}";"${address}";"${phone}";"${website}";"${rating}";"${category}";"${isPromoted}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Имя файла с текущей датой
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `2gis_leads_${dateStr}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Запуск при загрузке страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createUI);
} else {
  createUI();
}
