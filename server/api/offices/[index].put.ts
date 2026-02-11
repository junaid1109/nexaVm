import { promises as fs } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const param = event.context.params?.index
    if (!param) {
      return { error: true, message: 'ID is required' }
    }

    const id = Number(param)
    if (Number.isNaN(id)) {
      return { error: true, message: 'Invalid ID' }
    }

    const body = await readMultipartFormData(event)
    if (!body) {
      return { error: true, message: 'No data received' }
    }

    const title = body.find(f => f.name === 'title')?.data?.toString() || ''
    const address = body.find(f => f.name === 'address')?.data?.toString() || ''

    const filePath = resolve('./app/data/offices.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const offices = raw ? JSON.parse(raw) : []

    // Find the office by its ID
    const officeIndex = offices.findIndex(o => o.id === id)
    if (officeIndex === -1) {
      return { error: true, message: 'Office not found' }
    }

    // Update the office
    offices[officeIndex] = {
      ...offices[officeIndex],
      title,
      address
    }

    await fs.writeFile(filePath, JSON.stringify(offices, null, 2))

    return { success: true }
  } catch (err) {
    console.error(err)
    return { error: true, message: 'Failed to update office' }
  }
})
