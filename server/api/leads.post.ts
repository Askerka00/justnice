import fs from 'fs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  if (!Array.isArray(body)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body: must be an array of leads'
    });
  }
  
  const csvPath = '/Users/aibolat/Projects/ConveerSites/sales_tracker.csv';
  
  const headers = [
    'Название',
    'Рейтинг',
    'Отзывов',
    'Телефон',
    'Ссылка 2ГИС',
    'Дата Msg1',
    'Прочитал',
    'Ответ клиента',
    'Дата Msg3',
    'Дата Msg4',
    'Статус',
    'Заметки'
  ];
  
  try {
    let csv = '\uFEFF'; // BOM
    csv += headers.join(';') + '\n';
    
    body.forEach((lead: Record<string, string>) => {
      const row = headers.map(header => {
        const value = lead[header] || '';
        const escaped = value.replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csv += row.join(';') + '\n';
    });
    
    fs.writeFileSync(csvPath, csv);
    return { success: true, count: body.length };
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to write sales tracker: ${e.message}`
    });
  }
});
