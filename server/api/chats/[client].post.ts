import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const clientId = getRouterParam(event, 'client');
  if (!clientId) {
    throw createError({ statusCode: 400, statusMessage: 'Client ID required' });
  }

  const body = await readBody(event);
  if (!Array.isArray(body)) {
    throw createError({ statusCode: 400, statusMessage: 'Body must be an array of messages' });
  }

  const safeClientId = clientId.replace(/[^a-zA-Z0-9_-]/g, '');
  const dirPath = '/Users/aibolat/Projects/ConveerSites/server/assets/chats';
  const chatPath = path.join(dirPath, `${safeClientId}.json`);

  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(chatPath, JSON.stringify(body, null, 2));
    return { success: true };
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to save chat: ${e.message}`
    });
  }
});
