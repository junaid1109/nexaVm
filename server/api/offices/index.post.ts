import { promises as fs } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event)
    if (!body) return { error: true, message: 'No data received' }

    const title = body.find(f => f.name === 'title')?.data?.toString() || ''
    const address = body.find(f => f.name === 'address')?.data?.toString() || ''

    if (!title || !address) {
      return { error: true, message: 'Title & address required' }
    }

    const filePath = resolve('./app/data/offices.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const offices = raw.trim() ? JSON.parse(raw) : []

    const id =
      offices.length > 0
        ? Math.max(...offices.map((o: any) => o.id)) + 1
        : 1

    offices.push({
      id,
      title,
      address
    })

    await fs.writeFile(filePath, JSON.stringify(offices, null, 2))
    return { success: true }
  } catch (e) {
    console.error(e)
    return { error: true, message: 'Failed to add office' }
  }
})
