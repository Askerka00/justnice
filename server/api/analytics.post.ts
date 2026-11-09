import fs from 'fs'
import path from 'path'
import { defineEventHandler, readBody } from 'h3'

const analyticsPath = path.resolve(process.cwd(), 'server/assets/data/analytics.json')

// Ensure folder exists
const dir = path.dirname(analyticsPath)
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body || !body.client || !body.sessionId) {
    return { success: false, error: 'Missing parameters' }
  }

  const { client, sessionId, type, scrollDepth, userAgent } = body
  const normalizedClient = client.toLowerCase().trim()

  let data: Record<string, any[]> = {}
  if (fs.existsSync(analyticsPath)) {
    try {
      const content = fs.readFileSync(analyticsPath, 'utf8')
      data = JSON.parse(content)
    } catch (e) {
      data = {}
    }
  }

  if (!data[normalizedClient]) {
    data[normalizedClient] = []
  }

  const visits = data[normalizedClient]
  let visit = visits.find(v => v.sessionId === sessionId)

  const now = new Date().toISOString()

  if (!visit) {
    visit = {
      sessionId,
      timestamp: now,
      lastUpdated: now,
      scrollDepth: scrollDepth || 0,
      userAgent: userAgent || ''
    }
    visits.push(visit)
  } else {
    visit.lastUpdated = now
    if (scrollDepth !== undefined && scrollDepth > visit.scrollDepth) {
      visit.scrollDepth = scrollDepth
    }
  }

  // Keep only last 50 visits per client to save space
  if (visits.length > 50) {
    data[normalizedClient] = visits.slice(-50)
  }

  fs.writeFileSync(analyticsPath, JSON.stringify(data, null, 2), 'utf8')
  return { success: true, visit }
})
