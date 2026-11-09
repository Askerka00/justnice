<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

const leads = ref([])
const pending = ref(true)
const error = ref(null)

const searchQuery = ref('')
const selectedStatusFilter = ref('All')
const selectedLead = ref(null)
const selectedOffer = ref('offer_1')
const showToast = ref(false)
const toastMessage = ref('')
const bypassWhatsAppCache = ref(true)
const cacheBuster = ref(Math.floor(Date.now() / 1000).toString())

function updateCacheBuster() {
  cacheBuster.value = Math.floor(Date.now() / 1000).toString()
}

// Tabs in sidebar
const sidebarTab = ref('info') // 'info' or 'chat'

// Multi-select leads state
const selectedLeadNames = ref([])

// Chat history state
const messages = ref([])
const chatInput = ref('')
const isTranscribing = ref(false)
const activeAudioIndex = ref(null)
const rawImportText = ref('')
const audioFileInput = ref(null)
const isDraggingAudio = ref(false)
const showImportModal = ref(false)

// Analytics tracking state
const analytics = ref({})
const pendingAnalytics = ref(false)

async function fetchAnalytics() {
  pendingAnalytics.value = true
  try {
    const data = await $fetch('/api/analytics')
    analytics.value = data || {}
  } catch (e) {
    console.error('Failed to load analytics', e)
  } finally {
    pendingAnalytics.value = false
  }
}

const selectedLeadAnalytics = computed(() => {
  if (!selectedLead.value || !selectedLead.value.clientSlug) return []
  const slugKey = selectedLead.value.clientSlug.toLowerCase().trim()
  return analytics.value[slugKey] || []
})

function formatAnalyticsTime(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleString('ru-RU', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getDeviceType(ua) {
  if (!ua) return 'Неизвестно'
  const lower = ua.toLowerCase()
  if (lower.includes('mobi') || lower.includes('android') || lower.includes('iphone')) {
    return 'Мобильный 📱'
  }
  return 'Компьютер 💻'
}

// Fetch leads from server on load
async function fetchLeads() {
  pending.value = true
  try {
    const data = await $fetch('/api/leads')
    leads.value = data || []
  } catch (e) {
    error.value = 'Не удалось загрузить лидов. Проверьте sales_tracker.csv.'
    console.error(e)
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  fetchLeads()
  fetchAnalytics()
  const interval = setInterval(fetchAnalytics, 8000)
  onBeforeUnmount(() => clearInterval(interval))
})

// Watch selectedLead changes to load its specific chat history
watch(selectedLead, async (newVal) => {
  if (newVal) {
    sidebarTab.value = 'info' // Reset tab to info on change
    const clientSlug = newVal.clientSlug || newVal['Название'].toLowerCase().replace(/[^a-z0-9а-яё]/gi, '')
    try {
      messages.value = await $fetch(`/api/chats/${clientSlug}`)
    } catch (e) {
      messages.value = []
    }
  } else {
    messages.value = []
  }
})

// Save leads back to server CSV
const saving = ref(false)
async function saveLeads() {
  saving.value = true
  try {
    await $fetch('/api/leads', {
      method: 'POST',
      body: leads.value
    })
    triggerToast('Изменения успешно сохранены в sales_tracker.csv')
  } catch (e) {
    console.error(e)
    triggerToast('Ошибка при сохранении файла!', 'error')
  } finally {
    saving.value = false
  }
}

// Save current chat history
async function saveChat() {
  if (!selectedLead.value) return
  const clientSlug = selectedLead.value.clientSlug || selectedLead.value['Название'].toLowerCase().replace(/[^a-z0-9а-яё]/gi, '')
  try {
    await $fetch(`/api/chats/${clientSlug}`, {
      method: 'POST',
      body: messages.value
    })
  } catch (e) {
    console.error(e)
  }
}

function triggerToast(message, type = 'success') {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Offers template system
const offers = {
  offer_1: {
    name: 'Оффер #1 (50,000 ₸ - Базовый)',
    text: `Здравствуйте! Увидел вашу компанию {name} в 2ГИС — рейтинг {rating}, {reviews} отзывов 👏

Заметил, что у вас нет сайта. Я делаю сайты для металлобаз в Алматы — набросал вариант специально для вас:

{demoUrl}

Откройте с телефона, там 30 секунд.

Запуск под ключ — 50 000 тг за 1 день.
Не понравится — верну деньги.`
  },
  offer_2: {
    name: 'Оффер #2 (35,000 ₸ - Скидка/Дорого)',
    text: `Понимаю вас. Сейчас я активно нарабатываю портфолио именно в вашей нише, поэтому готов сделать специальное предложение — запуск за 35 000 тг под ключ. 

Сюда также входит хостинг и домен. Предложение актуально до конца недели. Что думаете?`
  },
  offer_3: {
    name: 'Оффер #3 (Повторный дожим 24ч)',
    text: `Добрый день! Удалось глянуть сайт, который я отправлял? 

Если что-то не понравилось — скажите честно, мне важна обратная связь 🙏`
  },
  offer_4: {
    name: 'Оффер #4 (Если прошлый плохой опыт)',
    text: `Понимаю ваше недоверие. Именно поэтому я сначала сделал рабочий демо-сайт бесплатно, чтобы вы увидели результат до оплаты. 

Давайте так: вы платите только когда сайт будет полностью готов и вам понравится. Никаких предоплат и рисков с вашей стороны. Договорились?`
  }
}

// Helper to normalize phone numbers for WhatsApp Link
function formatPhoneForWhatsApp(phone) {
  if (!phone) return ''
  return phone.replace(/[^0-9]/g, '')
}

// Helper to get formatted message
const formattedMessage = computed(() => {
  if (!selectedLead.value) return ''
  const template = offers[selectedOffer.value]?.text || ''
  
  const safeName = selectedLead.value['Название']
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  let demoUrl = `https://conveer-sites.vercel.app/${encodeURIComponent(safeName)}`
  if (bypassWhatsAppCache.value && cacheBuster.value) {
    demoUrl += `?v=${cacheBuster.value}`
  }
  
  return template
    .replace(/{name}/g, selectedLead.value['Название'] || '')
    .replace(/{rating}/g, selectedLead.value['Рейтинг'] || '5.0')
    .replace(/{reviews}/g, selectedLead.value['Отзывов'] || '0')
    .replace(/{demoUrl}/g, demoUrl)
})

// Copy message to clipboard
function copyMessage() {
  updateCacheBuster()
  nextTick(() => {
    navigator.clipboard.writeText(formattedMessage.value)
    triggerToast('Текст скопирован в буфер обмена!')
  })
}

// Open WhatsApp link
function openWhatsApp() {
  if (!selectedLead.value) return
  const rawPhone = selectedLead.value['Телефон'] || ''
  const cleanPhone = formatPhoneForWhatsApp(rawPhone)
  
  if (!cleanPhone) {
    triggerToast('Номер телефона отсутствует!', 'error')
    return
  }
  
  updateCacheBuster()
  nextTick(() => {
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage.value)}`
    window.open(url, '_blank')
  })
}

// Determine if lead needs follow-up
function getFollowUpStatus(lead) {
  const status = lead['Статус'] || ''
  const dateMsg1 = lead['Дата Msg1']
  const dateMsg3 = lead['Дата Msg3']
  const dateMsg4 = lead['Дата Msg4']
  
  if (status === 'Написал' && dateMsg1 && !dateMsg3) {
    return { required: true, type: 'Msg3 (24ч)' }
  }
  if (status === 'Интерес' && !dateMsg3) {
    return { required: true, type: 'Msg3 (Дожим)' }
  }
  if (status === 'Написал' && dateMsg3 && !dateMsg4) {
    return { required: true, type: 'Msg4 (48ч)' }
  }
  return { required: false, type: '' }
}

// Filtering and Searching
const filteredLeads = computed(() => {
  let list = leads.value
  
  if (selectedStatusFilter.value !== 'All') {
    if (selectedStatusFilter.value === 'Follow-up') {
      list = list.filter(l => getFollowUpStatus(l).required)
    } else {
      list = list.filter(l => (l['Статус'] || '') === selectedStatusFilter.value)
    }
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(l => 
      (l['Название'] || '').toLowerCase().includes(q) ||
      (l['Телефон'] || '').toLowerCase().includes(q) ||
      (l['Заметки'] || '').toLowerCase().includes(q)
    )
  }
  
  return list
})

// Lead stats helper
const stats = computed(() => {
  const total = leads.value.length
  const contacted = leads.value.filter(l => l['Дата Msg1']).length
  const interested = leads.value.filter(l => l['Статус'] === 'Интерес').length
  const paid = leads.value.filter(l => l['Статус'] === 'Оплата').length
  const followups = leads.value.filter(l => getFollowUpStatus(l).required).length
  const convRate = total > 0 ? ((paid / total) * 100).toFixed(1) : 0
  
  return { total, contacted, interested, paid, followups, convRate }
})

// Select lead for sidebar panel
function selectLeadRow(lead) {
  selectedLead.value = lead
}

// Мульти-выбор лидов
const isAllSelected = computed({
  get() {
    return filteredLeads.value.length > 0 && selectedLeadNames.value.length === filteredLeads.value.length
  },
  set(value) {
    if (value) {
      selectedLeadNames.value = filteredLeads.value.map(l => l['Название'])
    } else {
      selectedLeadNames.value = []
    }
  }
})

// Массовое удаление выбранных лидов
function deleteSelectedLeads() {
  if (selectedLeadNames.value.length === 0) return
  if (!confirm(`Вы действительно хотите удалить выбранные лиды (${selectedLeadNames.value.length} шт.) из таблицы и стереть их из sales_tracker.csv?`)) return
  
  leads.value = leads.value.filter(l => !selectedLeadNames.value.includes(l['Название']))
  selectedLeadNames.value = []
  selectedLead.value = null
  saveLeads() // Авто-сейв изменений в CSV
  triggerToast('Выбранные лиды успешно удалены!')
}

// Quick action: toggle touch date (support reset/clear if clicked accidentally)
function markAction(type) {
  if (!selectedLead.value) return
  const today = new Date().toLocaleDateString('ru-RU')
  
  if (type === 'Msg1') {
    if (selectedLead.value['Дата Msg1']) {
      selectedLead.value['Дата Msg1'] = ''
      selectedLead.value['Статус'] = ''
    } else {
      selectedLead.value['Дата Msg1'] = today
      selectedLead.value['Статус'] = 'Написал'
    }
  } else if (type === 'Msg3') {
    if (selectedLead.value['Дата Msg3']) {
      selectedLead.value['Дата Msg3'] = ''
      selectedLead.value['Статус'] = 'Написал'
    } else {
      selectedLead.value['Дата Msg3'] = today
      selectedLead.value['Статус'] = 'Написал'
    }
  } else if (type === 'Msg4') {
    if (selectedLead.value['Дата Msg4']) {
      selectedLead.value['Дата Msg4'] = ''
      selectedLead.value['Статус'] = 'Написал'
    } else {
      selectedLead.value['Дата Msg4'] = today
      selectedLead.value['Статус'] = 'Игнор'
    }
  }
  
  saveLeads()
}

// Следующий шаг (расчет по системе офферов)
const nextAction = computed(() => {
  if (!selectedLead.value) return { required: false }
  
  const dateMsg1 = selectedLead.value['Дата Msg1']
  const dateMsg3 = selectedLead.value['Дата Msg3']
  const dateMsg4 = selectedLead.value['Дата Msg4']
  const status = selectedLead.value['Статус'] || ''
  
  function addOneDay(dateStr) {
    if (!dateStr) return 'Завтра'
    const parts = dateStr.split('.')
    if (parts.length !== 3) return 'Через 24 часа'
    const date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
    date.setDate(date.getDate() + 1)
    return date.toLocaleDateString('ru-RU')
  }
  
  const safeName = selectedLead.value['Название']
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  const demoUrl = `https://conveer-sites.vercel.app/${encodeURIComponent(safeName)}`
  
  if (!dateMsg1) {
    return {
      required: true,
      title: 'Отправить первое демо-сайт (Msg 1)',
      type: 'Msg1',
      time: 'Прямо сейчас',
      previewText: offers.offer_1.text
        .replace(/{name}/g, selectedLead.value['Название'])
        .replace(/{rating}/g, selectedLead.value['Рейтинг'] || '5.0')
        .replace(/{reviews}/g, selectedLead.value['Отзывов'] || '0')
        .replace(/{demoUrl}/g, demoUrl)
    }
  }
  
  if (dateMsg1 && !dateMsg3) {
    const nextDate = addOneDay(dateMsg1)
    const isInterest = status === 'Интерес'
    return {
      required: true,
      title: isInterest ? 'Ответить теплому лиду (Оффер #2)' : 'Отправить дожим (Msg 3)',
      type: 'Msg3',
      time: `${nextDate} в 10:00`,
      previewText: (isInterest ? offers.offer_2.text : offers.offer_3.text)
        .replace(/{name}/g, selectedLead.value['Название'])
        .replace(/{rating}/g, selectedLead.value['Рейтинг'] || '5.0')
        .replace(/{reviews}/g, selectedLead.value['Отзывов'] || '0')
        .replace(/{demoUrl}/g, demoUrl)
    }
  }
  
  if (dateMsg3 && !dateMsg4) {
    const nextDate = addOneDay(dateMsg3)
    return {
      required: true,
      title: 'Отправить финальный оффер (Msg 4)',
      type: 'Msg4',
      time: `${nextDate} в 10:00`,
      previewText: offers.offer_4.text
        .replace(/{name}/g, selectedLead.value['Название'])
        .replace(/{rating}/g, selectedLead.value['Рейтинг'] || '5.0')
        .replace(/{reviews}/g, selectedLead.value['Отзывов'] || '0')
        .replace(/{demoUrl}/g, demoUrl)
    }
  }
  
  return { required: false }
})

// Написать по следующему действию
function sendNextActionMessage() {
  if (!selectedLead.value || !nextAction.value.required) return
  const rawPhone = selectedLead.value['Телефон'] || ''
  const cleanPhone = formatPhoneForWhatsApp(rawPhone)
  
  if (!cleanPhone) {
    triggerToast('Номер телефона отсутствует!', 'error')
    return
  }
  
  const today = new Date().toLocaleDateString('ru-RU')
  if (nextAction.value.type === 'Msg1') {
    selectedLead.value['Дата Msg1'] = today
    selectedLead.value['Статус'] = 'Написал'
  } else if (nextAction.value.type === 'Msg3') {
    selectedLead.value['Дата Msg3'] = today
    selectedLead.value['Статус'] = 'Написал'
  } else if (nextAction.value.type === 'Msg4') {
    selectedLead.value['Дата Msg4'] = today
    selectedLead.value['Статус'] = 'Игнор'
  }
  saveLeads()
  
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(nextAction.value.previewText)}`
  window.open(url, '_blank')
}

// Add message to chat list manually
function addMessage(sender, text, isAudio = false) {
  if (!text.trim()) return
  const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  messages.value.push({
    sender,
    text,
    time: now,
    isAudio
  })
  saveChat()
}

// Send user message from chat input
function sendMessageFromInput() {
  addMessage('user', chatInput.value)
  chatInput.value = ''
}

// Web Speech API for real-time Russian voice dictation
const recognition = ref(null)
const isDictating = ref(false)

function startDictation() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    triggerToast('Голосовой ввод не поддерживается вашим браузером!', 'error')
    return
  }

  if (isDictating.value) {
    recognition.value.stop()
    isDictating.value = false
    return
  }

  recognition.value = new SpeechRecognition()
  recognition.value.lang = 'ru-RU'
  recognition.value.interimResults = false
  recognition.value.maxAlternatives = 1

  recognition.value.onstart = () => {
    isDictating.value = true
    triggerToast('Запись голоса... Говорите в микрофон')
  }

  recognition.value.onresult = (event) => {
    const text = event.results[0][0].transcript
    chatInput.value = (chatInput.value + ' ' + text).trim()
    triggerToast('Голос успешно распознан!')
  }

  recognition.value.onerror = (e) => {
    console.error(e)
    isDictating.value = false
    triggerToast('Ошибка распознавания голоса', 'error')
  }

  recognition.value.onend = () => {
    isDictating.value = false
  }

  recognition.value.start()
}

// Real whisper.cpp voice message transcriber via server API
async function transcribeVoiceMessage(index) {
  const msg = messages.value[index]
  if (!msg || !msg.isAudio) return
  
  activeAudioIndex.value = index
  isTranscribing.value = true
  
  // If message has a stored file blob, transcribe it
  if (msg.audioBlob) {
    try {
      const formData = new FormData()
      formData.append('audio', msg.audioBlob, msg.audioFileName || 'voice.ogg')
      formData.append('lang', 'ru')
      
      const result = await $fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      })
      
      msg.text = result.text || '(не удалось распознать)'
      msg.isAudio = false
      msg.transcribed = true
      delete msg.audioBlob
      delete msg.audioFileName
      saveChat()
      triggerToast('Голосовое сообщение транскрибировано!')
    } catch (e) {
      console.error('Transcription error:', e)
      triggerToast('Ошибка транскрибации: ' + (e.data?.statusMessage || e.message), 'error')
    }
  } else {
    triggerToast('Аудиофайл не прикреплён к этому сообщению', 'error')
  }
  
  isTranscribing.value = false
  activeAudioIndex.value = null
}

// Upload audio file and insert as client message in chat
async function handleAudioUpload(file) {
  if (!file) return
  if (!selectedLead.value) {
    triggerToast('Сначала выберите лид из таблицы!', 'error')
    return
  }
  
  // Switch to chat tab
  sidebarTab.value = 'chat'
  
  const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  
  // Add audio message bubble first
  const audioMsg = {
    sender: 'client',
    text: `🎤 Голосовое (${file.name})`,
    time: now,
    isAudio: true,
    audioBlob: file,
    audioFileName: file.name
  }
  messages.value.push(audioMsg)
  
  // Auto-transcribe immediately
  const msgIndex = messages.value.length - 1
  activeAudioIndex.value = msgIndex
  isTranscribing.value = true
  
  try {
    const formData = new FormData()
    formData.append('audio', file, file.name)
    formData.append('lang', 'ru')
    
    const result = await $fetch('/api/transcribe', {
      method: 'POST',
      body: formData
    })
    
    const transcribedText = result.text || '(не удалось распознать)'
    
    // Replace audio message with transcribed text as client message
    messages.value[msgIndex] = {
      sender: 'client',
      text: transcribedText,
      time: now,
      isAudio: false,
      transcribed: true
    }
    saveChat()
    triggerToast('✅ Аудио транскрибировано и добавлено как сообщение клиента!')
  } catch (e) {
    console.error('Transcription error:', e)
    messages.value[msgIndex].text = '❌ Ошибка транскрибации'
    triggerToast('Ошибка транскрибации: ' + (e.data?.statusMessage || e.message), 'error')
  } finally {
    isTranscribing.value = false
    activeAudioIndex.value = null
  }
}

// Handle file input change
function onAudioFileSelected(event) {
  const file = event.target.files?.[0]
  if (file) handleAudioUpload(file)
  // Reset input so same file can be selected again
  if (audioFileInput.value) audioFileInput.value.value = ''
}

// Drag and drop handlers for chat area
function onChatDragOver(e) {
  e.preventDefault()
  isDraggingAudio.value = true
}
function onChatDragLeave(e) {
  e.preventDefault()
  isDraggingAudio.value = false
}
function onChatDrop(e) {
  e.preventDefault()
  isDraggingAudio.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file && (file.type.startsWith('audio/') || /\.(ogg|opus|mp3|m4a|wav|aac|weba)$/i.test(file.name))) {
    handleAudioUpload(file)
  } else {
    triggerToast('Перетащите аудиофайл (.ogg, .mp3, .m4a, .wav)', 'error')
  }
}

// AI suggested replies builder (based on chat history)
const suggestedReplies = computed(() => {
  if (messages.value.length === 0) return []
  
  const lastMsg = messages.value[messages.value.length - 1]
  if (lastMsg.sender === 'user') return []
  
  const text = lastMsg.text.toLowerCase()
  
  if (text.includes('цена') || text.includes('сколько стоит') || text.includes('почем')) {
    return [
      'Сайт под ключ стоит 50 000 тг. Запуск за 1 день. Хостинг и домен .kz на год включены.',
      'Обычная цена 80 000 тг, но сейчас акция для металлопроката — сделаю за 50 000 тг под ключ.',
      'У вас большой каталог, можем сделать полный сайт-визитку за 50 000 тг.'
    ]
  }
  
  if (text.includes('дорого') || text.includes('скидк') || text.includes('уступи')) {
    return [
      'Я вас понял. Готов сделать скидку в честь открытия — отдаю за 35 000 тг под ключ. Договорились?',
      'Цена 50 000 тг включает в себя год хостинга и домен. Дешевле уже просто некуда за индивидуальный дизайн.',
      'Можем разделить оплату на 2 части по 25 000 тг. Так вам будет комфортнее?'
    ]
  }
  
  if (text.includes('кид') || text.includes('обман') || text.includes('гарант')) {
    return [
      'Никаких предоплат. Вы платите только после того, как сайт готов, подключен домен и вы проверите его работу со своего телефона.',
      'Даю 100% гарантию возврата средств в течение 3 дней после запуска, если сайт вам не понравится.',
      'Можем заключить официальный договор на ТОО/ИП с предоставлением закрывающих документов.'
    ]
  }
  
  return [
    'Давайте начнем с регистрации домена. Какой адрес для сайта вы хотите? Например, ' + selectedLead.value['Название'].toLowerCase().replace(/[^a-z]/g, '') + '.kz?',
    'Хорошо, я подготовлю договор и скину реквизиты для Kaspi-перевода.',
    'Спасибо! Напишите, пожалуйста, точный адрес вашей базы и контакты, чтобы я добавил на сайт.'
  ]
})

function selectSuggestion(replyText) {
  chatInput.value = replyText
}

// Parse pasted WhatsApp text history
function importChatHistory() {
  if (!rawImportText.value.trim()) return
  
  const lines = rawImportText.value.split('\n')
  const parsedMessages = []
  
  lines.forEach(line => {
    const cleanLine = line.trim()
    if (!cleanLine) return
    
    let sender = 'client'
    let text = ''
    let time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    
    // Parse formats: "+7 701 123 4567: Текст" or "Клиент: Текст"
    const match = cleanLine.match(/^(?:\[?[\d:.,\s]+\]?\s*-\s*)?([^:]+):\s*(.*)$/)
    if (match) {
      const rawSender = match[1].toLowerCase()
      text = match[2]
      
      if (rawSender.includes('я') || rawSender.includes('вы') || rawSender.includes('me') || rawSender.includes('conveer') || rawSender.includes('вы')) {
        sender = 'user'
      }
    } else {
      text = cleanLine
    }
    
    const isAudio = text.toLowerCase().includes('голосовое сообщение') || text.toLowerCase().includes('аудио')
    if (isAudio) {
      text = '🎤 Голосовое сообщение'
    }
    
    if (text) {
      parsedMessages.push({
        sender,
        text,
        time,
        isAudio
      })
    }
  })
  
  if (parsedMessages.length > 0) {
    messages.value = [...messages.value, ...parsedMessages]
    saveChat()
    rawImportText.value = ''
    showImportModal.value = false
    triggerToast(`Импортировано сообщений: ${parsedMessages.length}`)
  } else {
    triggerToast('Не удалось распознать переписку', 'error')
  }
}

// Удалить лид из таблицы и перезаписать CSV
function deleteLead(lead) {
  if (!lead) return
  if (!confirm(`Вы действительно хотите удалить лид "${lead['Название']}" и стереть его из sales_tracker.csv?`)) return
  
  const index = leads.value.findIndex(l => l['Название'] === lead['Название'])
  if (index !== -1) {
    leads.value.splice(index, 1)
    selectedLead.value = null
    saveLeads() // Авто-сейв в CSV
    triggerToast('Лид успешно удален!')
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 font-sans p-6">
    <!-- Header with statistics -->
    <header class="max-w-7xl mx-auto mb-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 class="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Icon name="logos:airtable" class="w-8 h-8" />
            Website Leads CRM
          </h1>
          <p class="text-slate-400 mt-1">Мини-панель Airtable для ведения и закрытия лидов на ConveerSites</p>
        </div>
        <div class="flex gap-3">
          <button 
            @click="fetchLeads" 
            class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-2 border border-slate-700 transition"
          >
            <Icon name="lucide:rotate-cw" class="w-4 h-4" />
            Обновить
          </button>
          <button 
            @click="saveLeads" 
            :disabled="saving"
            class="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg shadow-blue-500/20 transition"
          >
            <Icon v-if="saving" name="lucide:loader" class="w-4 h-4 animate-spin" />
            <Icon v-else name="lucide:save" class="w-4 h-4" />
            Сохранить таблицу
          </button>
        </div>
      </div>
      
      <!-- Motivation Progress Banner -->
      <div class="bg-gradient-to-r from-slate-800 via-indigo-950/40 to-slate-800 border border-slate-700/80 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 mb-6 shadow-xl">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
            <Icon name="material-symbols:local-fire-department" class="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h3 class="text-base font-bold text-white">Путь к первой сделке 💰</h3>
            <p class="text-xs text-slate-400 mt-0.5">
              По закону конверсии, отправив 100 демо-сайтов, вы закроете первого клиента на <span class="text-emerald-400 font-bold">50 000+ ₸</span>.
            </p>
          </div>
        </div>
        <div class="w-full md:w-72 flex flex-col gap-2">
          <div class="flex justify-between text-xs font-semibold">
            <span class="text-slate-400">Прогресс: {{ stats.contacted }} / 100 демо</span>
            <span class="text-indigo-400 font-bold">Осталось: {{ Math.max(0, 100 - stats.contacted) }}</span>
          </div>
          <div class="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
            <div 
              class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500" 
              :style="{ width: `${Math.min(100, Math.round((stats.contacted / 100) * 100))}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Всего лидов</span>
          <span class="text-2xl font-bold text-white block mt-1">{{ stats.total }}</span>
        </div>
        <div class="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Отправлено демо</span>
          <span class="text-2xl font-bold text-blue-400 block mt-1">{{ stats.contacted }}</span>
        </div>
        <div class="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Интерес (Лиды)</span>
          <span class="text-2xl font-bold text-yellow-400 block mt-1">{{ stats.interested }}</span>
        </div>
        <div class="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Оплаты</span>
          <span class="text-2xl font-bold text-emerald-400 block mt-1">{{ stats.paid }}</span>
        </div>
        <div class="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl col-span-2 md:col-span-1">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Конверсия</span>
          <span class="text-2xl font-bold text-indigo-400 block mt-1">{{ stats.convRate }}%</span>
        </div>
      </div>
    </header>

    <!-- Main Workspace -->
    <main class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Table & Filters Area -->
      <section class="lg:col-span-2 bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col">
        <!-- Filter Bar -->
        <div class="p-4 border-b border-slate-700/50 bg-slate-800/40 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
          <div class="relative flex-1">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Icon name="lucide:search" class="w-4 h-4" />
            </span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Поиск по названию, телефону, заметкам..."
              class="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-sm"
            />
          </div>
          
          <!-- Filter Tabs -->
          <div class="flex gap-1 overflow-x-auto p-1 bg-slate-900 border border-slate-700 rounded-lg">
            <button 
              v-for="filter in ['All', 'Написал', 'Интерес', 'Оплата', 'Отказ', 'Игнор', 'Follow-up']" 
              :key="filter"
              @click="selectedStatusFilter = filter"
              :class="[
                'px-3 py-1 text-xs font-medium rounded-md transition whitespace-nowrap',
                selectedStatusFilter === filter 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-slate-200'
              ]"
            >
              <span v-if="filter === 'Follow-up'" class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"></span>
                Фоллоуап
              </span>
              <span v-else>{{ filter === 'All' ? 'Все' : filter }}</span>
            </button>
          </div>
        </div>

        <!-- Bulk Action Bar -->
        <div v-if="selectedLeadNames.length > 0" class="p-3 border-b border-slate-700 bg-indigo-950/20 flex items-center justify-between transition-all duration-300">
          <span class="text-xs text-indigo-300 font-semibold flex items-center gap-2">
            <Icon name="lucide:check-square" class="w-4 h-4" />
            Выбрано лидов: {{ selectedLeadNames.length }}
          </span>
          <div class="flex gap-2">
            <button 
              @click="selectedLeadNames = []" 
              class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition"
            >
              Сбросить выбор
            </button>
            <button 
              @click="deleteSelectedLeads" 
              class="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg border border-red-500/30 shadow-lg shadow-red-500/15 transition flex items-center gap-1.5"
            >
              <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
              Удалить выбранные ({{ selectedLeadNames.length }})
            </button>
          </div>
        </div>

        <!-- Table View -->
        <div class="overflow-x-auto flex-1 max-h-[600px] overflow-y-auto">
          <table class="w-full text-left border-collapse text-sm">
            <thead>
              <tr class="border-b border-slate-700 bg-slate-800/80 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 z-10">
                <th class="py-3 px-4 w-12 text-center">
                  <input type="checkbox" v-model="isAllSelected" class="w-5 h-5 rounded border-slate-750 bg-slate-900 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </th>
                <th class="py-3 px-4">Компания</th>
                <th class="py-3 px-4">Рейтинг</th>
                <th class="py-3 px-4">Телефон</th>
                <th class="py-3 px-4 text-center">Фоллоуап</th>
                <th class="py-3 px-4">Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="pending" class="border-b border-slate-700/30">
                <td colspan="6" class="py-12 text-center text-slate-500">
                  <Icon name="lucide:loader" class="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
                  Загрузка лидов из базы...
                </td>
              </tr>
              <tr v-else-if="filteredLeads.length === 0" class="border-b border-slate-700/30">
                <td colspan="6" class="py-12 text-center text-slate-500">
                  По вашему запросу ничего не найдено.
                </td>
              </tr>
              <tr 
                v-for="lead in filteredLeads" 
                :key="lead['Название']"
                @click="selectLeadRow(lead)"
                :class="[
                  'border-b border-slate-700/30 hover:bg-slate-700/30 transition cursor-pointer',
                  selectedLead && selectedLead['Название'] === lead['Название'] ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : ''
                ]"
              >
                <td class="py-3 px-4 w-12 text-center" @click.stop>
                  <input 
                    type="checkbox" 
                    :value="lead['Название']" 
                    v-model="selectedLeadNames"
                    class="w-5 h-5 rounded border-slate-750 bg-slate-900 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                  />
                </td>
                <td class="py-3 px-4 font-semibold text-white">
                  <div class="flex items-center gap-2">
                    <span>{{ lead['Название'] }}</span>
                    <span v-if="lead.hasDemo" class="px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-extrabold rounded uppercase tracking-wider">демо</span>
                  </div>
                  <span class="block text-xs font-normal text-slate-500 mt-0.5">{{ lead['Адрес'] ? lead['Адрес'].substring(0, 35) + '...' : '' }}</span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-1.5">
                    <Icon name="material-symbols:star" class="w-4 h-4 text-yellow-400" />
                    <span>{{ lead['Рейтинг'] }}</span>
                    <span class="text-xs text-slate-500">({{ lead['Отзывов'] }})</span>
                  </div>
                </td>
                <td class="py-3 px-4 text-slate-300 font-mono text-xs">{{ lead['Телефон'] || '—' }}</td>
                <td class="py-3 px-4 text-center">
                  <span 
                    v-if="getFollowUpStatus(lead).required"
                    class="px-2 py-0.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-[10px] font-bold rounded-full uppercase tracking-wider inline-flex items-center gap-1"
                  >
                    <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                    {{ getFollowUpStatus(lead).type }}
                  </span>
                  <span v-else class="text-slate-600">—</span>
                </td>
                <td class="py-3 px-4">
                  <span 
                    :class="[
                      'px-2.5 py-1 text-[11px] font-bold rounded-md uppercase tracking-wider',
                      lead['Статус'] === 'Оплата' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : '',
                      lead['Статус'] === 'Интерес' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : '',
                      lead['Статус'] === 'Написал' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : '',
                      lead['Статус'] === 'Отказ' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : '',
                      lead['Статус'] === 'Игнор' ? 'bg-slate-700/60 text-slate-400' : '',
                      !lead['Статус'] ? 'bg-slate-800 text-slate-500' : ''
                    ]"
                  >
                    {{ lead['Статус'] || 'НОВЫЙ' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-3 border-t border-slate-700/50 bg-slate-800/40 text-xs text-slate-500 flex justify-between">
          <span>Показано лидов: {{ filteredLeads.length }}</span>
          <span>Оригинальная база: sales_tracker.csv</span>
        </div>
      </section>

      <!-- Sidebar / Offer & Message generator -->
      <section class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-5 h-fit">
        <div v-if="!selectedLead" class="text-center py-16 text-slate-500">
          <Icon name="lucide:info" class="w-10 h-10 mx-auto mb-3 text-slate-600" />
          <h3 class="text-white font-semibold mb-1">Детали контакта</h3>
          <p class="text-xs">Выберите любую компанию из таблицы слева, чтобы сформировать оффер и открыть диалог.</p>
        </div>
        
        <div v-else class="flex flex-col gap-4">
          <!-- Lead summary info -->
          <div class="flex justify-between items-start pb-4 border-b border-slate-700/50">
            <div>
              <span class="text-[10px] font-bold text-blue-500 uppercase tracking-widest block">Компания</span>
              <h2 class="text-xl font-bold text-white mt-0.5">{{ selectedLead['Название'] }}</h2>
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 w-full">
                <a :href="selectedLead['Ссылка 2ГИС']" target="_blank" class="text-xs text-slate-400 hover:text-blue-400 underline inline-flex items-center gap-1">
                  Открыть в 2ГИС
                  <Icon name="lucide:external-link" class="w-3 h-3" />
                </a>
                <a v-if="selectedLead.hasDemo" :href="`/${selectedLead.clientSlug}`" target="_blank" class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline inline-flex items-center gap-1">
                  <Icon name="lucide:eye" class="w-3.5 h-3.5" />
                  Посмотреть демо-сайт
                </a>
                <button 
                  @click="deleteLead(selectedLead)"
                  class="text-xs text-red-400 hover:text-red-300 font-semibold underline inline-flex items-center gap-1 md:ml-auto"
                >
                  <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                  Удалить
                </button>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Рейтинг</span>
              <div class="flex items-center gap-1 justify-end mt-1 text-white font-bold">
                <Icon name="material-symbols:star" class="w-4 h-4 text-yellow-400" />
                {{ selectedLead['Рейтинг'] }}
              </div>
            </div>
          </div>

          <!-- Sidebar Tabs -->
          <div class="flex border-b border-slate-700 bg-slate-900/40 p-1 rounded-lg">
            <button 
              @click="sidebarTab = 'info'" 
              :class="[
                'flex-1 py-1.5 text-xs font-semibold text-center rounded-md transition', 
                sidebarTab === 'info' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              ]"
            >
              Офферы & Инфо
            </button>
            <button 
              @click="sidebarTab = 'chat'" 
              :class="[
                'flex-1 py-1.5 text-xs font-semibold text-center rounded-md transition flex items-center justify-center gap-1.5', 
                sidebarTab === 'chat' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              ]"
            >
              Диалог (Переписка)
              <span v-if="messages.length > 0" class="px-1.5 py-0.5 bg-blue-650 text-white text-[9px] font-bold rounded-full">
                {{ messages.length }}
              </span>
            </button>
          </div>

          <!-- TAB 1: INFO & OFFERS -->
          <div v-if="sidebarTab === 'info'" class="flex flex-col gap-4">
            <!-- Next Action Suggestion Widget -->
            <div v-if="nextAction.required" class="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-4 flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Следующее действие</span>
                <span class="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 text-[9px] font-bold rounded-full uppercase tracking-wider">Напоминание</span>
              </div>
              
              <div class="flex items-start gap-3">
                <Icon name="lucide:bell-ring" class="w-5 h-5 text-indigo-400 mt-0.5 animate-pulse" />
                <div>
                  <h4 class="text-sm font-bold text-white leading-tight">{{ nextAction.title }}</h4>
                  <p class="text-xs text-slate-400 mt-1">
                    Связаться: <span class="text-yellow-400 font-semibold font-mono">{{ nextAction.time }}</span>
                  </p>
                </div>
              </div>

              <!-- Previews customized script -->
              <div class="bg-slate-900/60 border border-slate-700/60 rounded-lg p-2.5 text-xs text-slate-300">
                <div class="text-[9px] text-slate-500 font-bold uppercase mb-1">Рекомендуемый текст:</div>
                <p class="line-clamp-3 italic text-slate-400">"{{ nextAction.previewText }}"</p>
              </div>

              <button 
                @click="sendNextActionMessage"
                class="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition"
              >
                <Icon name="logos:whatsapp-icon" class="w-3.5 h-3.5" />
                Отправить и отметить
              </button>
            </div>

            <!-- Edit status / Notes -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Статус лида</label>
                <select 
                  v-model="selectedLead['Статус']"
                  @change="saveLeads"
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="">НОВЫЙ</option>
                  <option value="Написал">Написал</option>
                  <option value="Интерес">Интерес</option>
                  <option value="Оплата">Оплата</option>
                  <option value="Отказ">Отказ</option>
                  <option value="Игнор">Игнор</option>
                </select>
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Телефон</label>
                <input 
                  v-model="selectedLead['Телефон']"
                  @change="saveLeads"
                  type="text" 
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <!-- Edit Client Answer & Notes -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Ответ клиента</label>
              <input 
                v-model="selectedLead['Ответ клиента']"
                @change="saveLeads"
                type="text" 
                placeholder="«подумаем», «дорого»..."
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Заметки / Ссылка на логотип</label>
              <textarea 
                v-model="selectedLead['Заметки']"
                @change="saveLeads"
                rows="2"
                placeholder="Путь к логотипу или примечание..."
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              ></textarea>
            </div>

            <!-- Quick Actions / Msg Flags -->
            <div class="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Этапы касаний (Дата)</span>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  @click="markAction('Msg1')"
                  :class="[
                    'py-1.5 px-2 rounded-lg text-[10px] font-bold transition flex flex-col items-center gap-1 border',
                    selectedLead['Дата Msg1'] ? 'bg-blue-600/10 text-blue-400 border-blue-500/30 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 group' : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-750'
                  ]"
                >
                  <span>Msg 1 (Демо)</span>
                  <span class="text-[8px] font-normal font-mono opacity-80 group-hover:hidden">{{ selectedLead['Дата Msg1'] || 'Отметить' }}</span>
                  <span class="text-[8px] font-normal font-mono opacity-80 hidden group-hover:inline text-red-400">Убрать ❌</span>
                </button>
                
                <button 
                  @click="markAction('Msg3')"
                  :class="[
                    'py-1.5 px-2 rounded-lg text-[10px] font-bold transition flex flex-col items-center gap-1 border',
                    selectedLead['Дата Msg3'] ? 'bg-blue-600/10 text-blue-400 border-blue-500/30 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 group' : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-750'
                  ]"
                >
                  <span>Msg 3 (Дожим)</span>
                  <span class="text-[8px] font-normal font-mono opacity-80 group-hover:hidden">{{ selectedLead['Дата Msg3'] || 'Отметить' }}</span>
                  <span class="text-[8px] font-normal font-mono opacity-80 hidden group-hover:inline text-red-400">Убрать ❌</span>
                </button>
                
                <button 
                  @click="markAction('Msg4')"
                  :class="[
                    'py-1.5 px-2 rounded-lg text-[10px] font-bold transition flex flex-col items-center gap-1 border',
                    selectedLead['Дата Msg4'] ? 'bg-blue-600/10 text-blue-400 border-blue-500/30 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 group' : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-750'
                  ]"
                >
                  <span>Msg 4 (Финал)</span>
                  <span class="text-[8px] font-normal font-mono opacity-80 group-hover:hidden">{{ selectedLead['Дата Msg4'] || 'Отметить' }}</span>
                  <span class="text-[8px] font-normal font-mono opacity-80 hidden group-hover:inline text-red-400">Убрать ❌</span>
                </button>
              </div>
            </div>

            <!-- Visit Analytics Panel -->
            <div class="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Активность на демо-сайте</span>
                <span 
                  v-if="selectedLead.hasDemo && selectedLeadAnalytics.length > 0"
                  class="flex h-2 w-2 relative"
                >
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              
              <!-- If no demo -->
              <div v-if="!selectedLead.hasDemo" class="text-xs text-slate-400 flex items-center gap-2">
                <Icon name="lucide:globe" class="w-4 h-4 text-slate-500 animate-pulse" />
                <span>Демо-сайт еще не создан. Добавьте JSON-конфиг для активации.</span>
              </div>
              
              <!-- If has demo but no visits yet -->
              <div v-else-if="selectedLeadAnalytics.length === 0" class="text-xs text-slate-400 flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:clock" class="w-4 h-4 text-yellow-500/80" />
                  <span>Просмотров пока нет.</span>
                </div>
                <p class="text-[10px] text-slate-500">Отправьте ссылку с cache-buster (?v=...) клиенту в WhatsApp.</p>
              </div>
              
              <!-- Visits list -->
              <div v-else class="flex flex-col gap-2">
                <div class="grid grid-cols-3 gap-2 text-[10px] font-semibold text-slate-500 pb-1.5 border-b border-slate-800">
                  <span>Время визита</span>
                  <span class="text-center">Скролл (глубина)</span>
                  <span class="text-right">Устройство</span>
                </div>
                
                <div class="max-h-[140px] overflow-y-auto flex flex-col gap-1.5 pr-1">
                  <div 
                    v-for="visit in [...selectedLeadAnalytics].reverse()" 
                    :key="visit.sessionId" 
                    class="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0"
                  >
                    <span class="font-mono text-slate-300 text-[11px]">{{ formatAnalyticsTime(visit.timestamp) }}</span>
                    
                    <div class="flex flex-col items-center">
                      <span 
                        :class="[
                          'px-1.5 py-0.5 rounded text-[10px] font-bold',
                          visit.scrollDepth >= 75 ? 'bg-emerald-500/10 text-emerald-400' :
                          visit.scrollDepth >= 25 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-800 text-slate-400'
                        ]"
                      >
                        {{ visit.scrollDepth }}%
                      </span>
                      <span class="text-[8px] text-slate-500 mt-0.5 font-medium">
                        {{ visit.scrollDepth >= 75 ? 'Прочитал' : visit.scrollDepth >= 25 ? 'Частично' : 'Открыл' }}
                      </span>
                    </div>
                    
                    <span class="text-slate-400 text-[10px] text-right truncate max-w-[80px]" :title="visit.userAgent">
                      {{ getDeviceType(visit.userAgent) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Offer System Selector -->
            <div class="border-t border-slate-700/50 pt-4 mt-1">
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Выбрать оффер/скрипт</label>
              <div class="grid grid-cols-2 gap-2 mb-3">
                <button 
                  v-for="(off, key) in offers" 
                  :key="key"
                  @click="selectedOffer = key"
                  :class="[
                    'py-1.5 px-2 rounded-lg text-[10px] font-semibold text-left transition truncate',
                    selectedOffer === key ? 'bg-blue-600 text-white font-bold' : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800'
                  ]"
                >
                  {{ off.name.split(' (')[0] }}
                </button>
              </div>

              <!-- Message Preview -->
              <div class="relative bg-slate-900 border border-slate-700 rounded-lg p-3">
                <span class="text-[8px] font-bold text-slate-500 uppercase tracking-wider absolute top-2 right-2">Kaspi / 50k template</span>
                <pre class="text-xs text-slate-300 whitespace-pre-wrap font-sans pr-10 max-h-[160px] overflow-y-auto">{{ formattedMessage }}</pre>
              </div>

              <!-- Cache Buster Options -->
              <div class="flex items-center gap-2 mt-2 select-none">
                <input 
                  type="checkbox" 
                  id="bypassCache" 
                  v-model="bypassWhatsAppCache" 
                  class="w-3.5 h-3.5 rounded border-slate-700 text-blue-600 bg-slate-900 focus:ring-blue-600 focus:ring-offset-slate-900 cursor-pointer"
                />
                <label for="bypassCache" class="text-[10px] font-semibold text-slate-400 cursor-pointer flex items-center gap-1.5">
                  Сбросить кэш превью в WhatsApp Web ♻️ <span class="text-[8px] font-mono text-slate-500">(добавит ?v={{ cacheBuster.substring(0, 6) }})</span>
                </label>
              </div>

              <!-- Action buttons -->
              <div class="grid grid-cols-2 gap-3 mt-3">
                <button 
                  @click="copyMessage"
                  class="py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition"
                >
                  <Icon name="lucide:copy" class="w-4 h-4" />
                  Скопировать
                </button>
                
                <button 
                  @click="openWhatsApp"
                  class="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/10"
                >
                  <Icon name="logos:whatsapp-icon" class="w-4 h-4" />
                  Отправить в WhatsApp
                </button>
              </div>
            </div>
          </div>

          <!-- TAB 2: DIALOGUE (CHAT HISTORY) -->
          <div v-else-if="sidebarTab === 'chat'" class="flex flex-col gap-4">
            <!-- Chat Header -->
            <div class="flex justify-between items-center bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
              <span class="text-xs text-slate-400">Диалог в реальном времени</span>
              <button 
                @click="showImportModal = true"
                class="px-2 py-1 bg-slate-850 hover:bg-slate-800 text-[10px] text-blue-400 font-bold border border-slate-700/80 rounded transition flex items-center gap-1"
              >
                <Icon name="lucide:import" class="w-3 h-3" />
                Импорт чата
              </button>
            </div>

            <!-- Chat Message Bubbles List (with drag-and-drop) -->
            <div 
              class="flex flex-col gap-3 min-h-[250px] max-h-[380px] overflow-y-auto p-2 border rounded-xl transition-all duration-200"
              :class="isDraggingAudio ? 'bg-indigo-950/30 border-indigo-500/50 ring-2 ring-indigo-500/20' : 'bg-slate-950/40 border-slate-800'"
              @dragover="onChatDragOver"
              @dragleave="onChatDragLeave"
              @drop="onChatDrop"
            >
              <!-- Drag overlay -->
              <div v-if="isDraggingAudio" class="flex flex-col items-center justify-center py-12 text-indigo-400">
                <Icon name="lucide:upload" class="w-10 h-10 mb-2 animate-bounce" />
                <span class="text-sm font-bold">Отпустите аудиофайл для транскрибации</span>
                <span class="text-xs text-indigo-500 mt-1">.ogg, .opus, .mp3, .m4a, .wav</span>
              </div>
              <div v-if="messages.length === 0 && !isDraggingAudio" class="text-center py-16 text-slate-600 text-xs">
                История пуста. Введите сообщение, перетащите аудио или импортируйте чат из WhatsApp.
              </div>
              
              <div 
                v-for="(msg, index) in messages" 
                :key="index"
                :class="[
                  'max-w-[85%] rounded-2xl p-3 flex flex-col gap-1 text-xs relative group',
                  msg.sender === 'user' ? 'bg-indigo-650 text-white rounded-br-none self-end' : 'bg-slate-800 text-slate-200 rounded-bl-none self-start'
                ]"
              >
                <!-- Message Body -->
                <div>
                  <!-- Voice message block -->
                  <div v-if="msg.isAudio" class="flex items-center gap-3 py-1">
                    <Icon name="lucide:mic" class="w-5 h-5 text-indigo-400 animate-pulse" />
                    <div>
                      <span class="font-bold block text-[10px] text-slate-400 uppercase tracking-wider">Голосовое сообщение</span>
                      <button 
                        @click="transcribeVoiceMessage(index)"
                        :disabled="isTranscribing && activeAudioIndex === index"
                        class="text-[9px] text-indigo-400 hover:text-indigo-300 font-bold underline mt-0.5 inline-flex items-center gap-1"
                      >
                        <Icon v-if="isTranscribing && activeAudioIndex === index" name="lucide:loader" class="w-3.5 h-3.5 animate-spin" />
                        <Icon v-else name="lucide:languages" class="w-3.5 h-3.5" />
                        Транскрибировать
                      </button>
                    </div>
                  </div>
                  <!-- Standard text message -->
                  <span v-else class="whitespace-pre-line">{{ msg.text }}</span>
                </div>
                
                <!-- Time and Delete toggle -->
                <div class="flex justify-between items-center text-[8px] text-slate-400 mt-1 opacity-70">
                  <span>{{ msg.time }}</span>
                  <button 
                    @click="messages.splice(index, 1); saveChat()"
                    class="hidden group-hover:inline text-red-400 hover:underline"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>

            <!-- AI dialogue suggested builder replies -->
            <div v-if="suggestedReplies.length > 0" class="flex flex-col gap-1.5 bg-slate-900/60 border border-slate-700/60 rounded-xl p-3">
              <span class="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Icon name="lucide:sparkles" class="w-3 h-3 text-indigo-400 animate-pulse" />
                Диалог строит ИИ — варианты ответа:
              </span>
              <div class="flex flex-col gap-1 max-h-[100px] overflow-y-auto">
                <button 
                  v-for="(reply, rIdx) in suggestedReplies" 
                  :key="rIdx"
                  @click="selectSuggestion(reply)"
                  class="p-2 bg-slate-800 hover:bg-slate-750 text-[11px] text-left text-slate-300 rounded border border-slate-700/60 transition truncate"
                >
                  {{ reply }}
                </button>
              </div>
            </div>

            <!-- Input area with Dictation, Audio Upload & Send -->
            <div class="flex gap-2">
              <button 
                @click="startDictation"
                :class="[
                  'p-2.5 rounded-lg border transition flex items-center justify-center',
                  isDictating ? 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                ]"
                title="Голосовой ввод на русском"
              >
                <Icon name="lucide:mic" class="w-4 h-4" />
              </button>

              <!-- Audio file upload button -->
              <input 
                ref="audioFileInput"
                type="file"
                accept="audio/*,.ogg,.opus,.mp3,.m4a,.wav,.aac,.weba"
                class="hidden"
                @change="onAudioFileSelected"
              />
              <button 
                @click="audioFileInput?.click()"
                :disabled="isTranscribing"
                :class="[
                  'p-2.5 rounded-lg border transition flex items-center justify-center',
                  isTranscribing ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30 animate-pulse' : 'bg-slate-800 border-slate-700 text-indigo-400 hover:bg-indigo-950/40 hover:border-indigo-500/40'
                ]"
                :title="isTranscribing ? 'Идёт транскрибация...' : 'Загрузить аудио клиента (WhatsApp голосовое)'"
              >
                <Icon v-if="isTranscribing" name="lucide:loader" class="w-4 h-4 animate-spin" />
                <Icon v-else name="lucide:headphones" class="w-4 h-4" />
              </button>
              
              <input 
                v-model="chatInput"
                type="text" 
                placeholder="Напишите ответ..."
                @keyup.enter="sendMessageFromInput"
                class="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
              />
              
              <button 
                @click="sendMessageFromInput"
                class="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition shadow-lg shadow-blue-500/10"
              >
                <Icon name="lucide:send" class="w-4 h-4" />
              </button>
            </div>

            <!-- Transcription status -->
            <div v-if="isTranscribing" class="flex items-center gap-2 p-2 bg-indigo-950/20 border border-indigo-500/20 rounded-lg">
              <Icon name="lucide:loader" class="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span class="text-[10px] text-indigo-300 font-semibold">Транскрибация через Whisper (локально)...</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Global Paste Import Modal -->
    <div 
      v-if="showImportModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div class="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl flex flex-col gap-4 animate-scaleUp">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-bold text-white">Импортировать переписку из WhatsApp</h3>
            <p class="text-xs text-slate-400 mt-1">Скопируйте сообщения из WhatsApp Web и вставьте в поле ниже</p>
          </div>
          <button @click="showImportModal = false" class="p-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-400 hover:text-slate-200">
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>
        
        <textarea 
          v-model="rawImportText"
          rows="10"
          placeholder="Пример:
[10:14] +7 775 309 8878: Здравствуйте, сколько стоит сайт?
[10:15] Я: Добрый день! 50 000 тг..."
          class="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500"
        ></textarea>
        
        <div class="flex justify-end gap-3">
          <button 
            @click="showImportModal = false"
            class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-semibold"
          >
            Отмена
          </button>
          
          <button 
            @click="importChatHistory"
            class="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/10"
          >
            Распознать и вставить
          </button>
        </div>
      </div>
    </div>

    <!-- Global Toast Alert -->
    <div 
      v-if="showToast"
      class="fixed bottom-6 right-6 px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce"
    >
      <Icon name="lucide:check-circle" class="w-5 h-5 text-emerald-400" />
      <span class="text-xs font-semibold">{{ toastMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbars for spreadsheet style */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.3);
}
::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.2);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.4);
}
</style>
