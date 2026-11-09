import fs from 'fs'
import path from 'path'
import { defineEventHandler } from 'h3'

const analyticsPath = path.resolve(process.cwd(), 'server/assets/data/analytics.json')

export default defineEventHandler(() => {
  if (!fs.existsSync(analyticsPath)) {
    return {}
  }
  try {
    const content = fs.readFileSync(analyticsPath, 'utf8')
    return JSON.parse(content)
  } catch (e) {
    return {}
  }
})
