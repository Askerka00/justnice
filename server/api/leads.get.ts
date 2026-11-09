import fs from 'fs';
import path from 'path';

function parseCSVLine(line: string, delimiter = ';') {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export default defineEventHandler(async (event) => {
  const csvPath = '/Users/aibolat/Projects/ConveerSites/sales_tracker.csv';
  const dataDir = '/Users/aibolat/Projects/ConveerSites/server/assets/data';
  
  if (!fs.existsSync(csvPath)) {
    return [];
  }
  
  function transliterate(str: string): string {
    const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяәғқңөұүһі";
    const lat = ["a","b","v","g","d","e","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","kh","ts","ch","sh","shch","","y","","e","yu","ya","a","g","k","n","o","u","u","h","i"];
    return str.toLowerCase().split('').map(char => {
      const idx = rus.indexOf(char);
      return idx !== -1 ? lat[idx] : char;
    }).join('');
  }

  function normalize(str: string) {
    if (!str) return '';
    const clean = str.toLowerCase().replace(/[^a-z0-9а-яёәғқңөұүһі]/gi, '').trim();
    return transliterate(clean);
  }
  
  try {
    // Сканируем существующие демо-сайты
    const builtFiles = new Map<string, string>();
    if (fs.existsSync(dataDir)) {
      const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
      files.forEach(file => {
        const slug = path.basename(file, '.json');
        builtFiles.set(normalize(slug), slug);
      });
    }

    let content = fs.readFileSync(csvPath, 'utf8');
    // Remove UTF-8 BOM if present
    if (content.startsWith('\uFEFF')) {
      content = content.slice(1);
    }
    
    const lines = content.split('\n').filter(l => l.trim() !== '');
    if (lines.length === 0) {
      return [];
    }
    
    const headers = parseCSVLine(lines[0], ';').map(h => h.replace(/^"|"$/g, ''));
    const leads = [];
    
    for (let i = 1; i < lines.length; i++) {
      const row = parseCSVLine(lines[i], ';').map(cell => cell.replace(/^"|"$/g, '').replace(/""/g, '"'));
      if (row.length === 0 || (row.length === 1 && row[0] === '')) continue;
      
      const lead: Record<string, any> = {};
      headers.forEach((header, index) => {
        lead[header] = row[index] || '';
      });

      // Проверка на наличие демо-сайта
      const name = lead['Название'] || '';
      const normName = normalize(name);
      let clientSlug = '';
      let hasDemo = false;

      if (builtFiles.has(normName)) {
        clientSlug = builtFiles.get(normName) || '';
        hasDemo = true;
      } else {
        for (const [normBuilt, slug] of builtFiles.entries()) {
          if (normBuilt.length > 3 && (normName.includes(normBuilt) || normBuilt.includes(normName))) {
            clientSlug = slug;
            hasDemo = true;
            break;
          }
        }
      }

      lead.hasDemo = hasDemo;
      lead.clientSlug = clientSlug;

      leads.push(lead);
    }
    
    return leads;
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to read sales tracker: ${e.message}`
    });
  }
});
