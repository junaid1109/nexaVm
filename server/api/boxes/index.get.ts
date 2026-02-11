import { promises as fs } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async () => {
  const filePath = resolve('./app/data/boxes.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
})
