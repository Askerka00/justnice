import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const clientId = getRouterParam(event, 'client');
  if (!clientId) {
    throw createError({ statusCode: 400, statusMessage: 'Client ID required' });
  }

  const safeClientId = clientId.replace(/[^a-zA-Z0-9_-]/g, '');
  const chatPath = `/Users/aibolat/Projects/ConveerSites/server/assets/chats/${safeClientId}.json`;

  try {
    if (!fs.existsSync(chatPath)) {
      return [];
    }
    const content = fs.readFileSync(chatPath, 'utf8');
    return JSON.parse(content);
  } catch (e: any) {
    return [];
  }
});
