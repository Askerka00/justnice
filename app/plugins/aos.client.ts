import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    // Ждем, пока Nuxt полностью загрузит страницу и DOM, чтобы инициализировать AOS
    nuxtApp.hook('app:suspense:resolve', () => {
      AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-out',
        offset: 50
      })
    })

    // Повторно обновляем AOS при переходах между страницами (vue-router)
    const router = useRouter()
    router.afterEach(() => {
      setTimeout(() => {
        AOS.refresh()
      }, 100)
    })
  }
})
