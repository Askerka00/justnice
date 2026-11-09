export default defineEventHandler(async (event) => {
  const clientId = getRouterParam(event, 'client')
  
  if (!clientId) {
    throw createError({ statusCode: 400, statusMessage: 'Client ID required' })
  }

  // Безопасность: не допускаем path traversal
  const safeClientId = clientId.replace(/[^a-zA-Z0-9_-]/g, '')

  try {
    // Читаем из server assets (bundled в serverless function)
    // Ключи хранятся как "server:data:filename.json" → useStorage('assets:server') + getItem('data:filename.json')
    const storage = useStorage('assets:server')
    const content = await storage.getItem(`data:${safeClientId}.json`)
    
    if (!content) {
      throw new Error('Not found')
    }
    
    // content может быть строкой JSON — парсим если нужно
    if (typeof content === 'string') {
      return JSON.parse(content)
    }
    
    return content
  } catch (e: any) {
    throw createError({ 
      statusCode: 404, 
      statusMessage: `Config not found: ${safeClientId}` 
    })
  }
})
