export const useClientName = () => {
  const route = useRoute()
  
  // 1. Если мы зашли по динамическому пути /[client] (например, /teny)
  if (route.params.client) {
    return route.params.client as string
  }

  // 2. Если имя клиента передано в query-параметрах (например, ?client=teny)
  if (route.query.client) {
    return route.query.client as string
  }

  // 3. Выделяем поддомен из хоста (для Vercel поддоменов)
  let host = ''
  if (import.meta.server) {
    const headers = useRequestHeaders(['host'])
    host = headers.host || ''
  } else {
    host = window.location.host
  }

  // Убираем порт, если он есть (например, "vitalflow.localhost:3000" -> "vitalflow.localhost")
  const cleanHost = host.split(':')[0]
  const parts = cleanHost.split('.')

  if (parts.length > 2) {
    // Если это Vercel-домен: "vitalflow.vercel.app"
    if (cleanHost.endsWith('.vercel.app')) {
      const subdomain = parts[0]
      // Список системных поддоменов Vercel, которые не являются клиентами
      const isSystemSubdomain = subdomain.startsWith('conveer-sites') || subdomain.startsWith('conveersites')
      if (!isSystemSubdomain) {
        return subdomain
      }
    } else {
      // Для кастомных доменов вида "subdomain.clientdomain.com"
      return parts[0]
    }
  }

  // 4. Если мы зашли на /teny, но это index.vue (редкий случай при сбое SSR)
  const path = route.path
  const pathSegments = path.split('/').filter(Boolean)
  if (pathSegments.length > 0 && pathSegments[0] !== '_nuxt') {
    const potentialClient = pathSegments[0]
    const reserved = ['api', 'admin', 'data', 'favicon.ico', 'docs']
    if (!reserved.includes(potentialClient)) {
      return potentialClient
    }
  }

  // По умолчанию возвращаем bamstroy
  return 'bamstroy'
}
