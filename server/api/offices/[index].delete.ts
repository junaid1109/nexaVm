import { promises as fs } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  // Get index from URL
  const index = parseInt(event.context.params?.index as string)
  if (isNaN(index)) {
    return { error: true, message: 'Invalid index' }
  }

  const filePath = resolve('./app/data/offices.json')
  const dataRaw = await fs.readFile(filePath, 'utf-8')
  const boxes = JSON.parse(dataRaw)

  if (index < 0 || index >= boxes.length) {
    return { error: true, message: 'Index out of range' }
  }

  // Remove the item
  boxes.splice(index, 1)

  // Write back to file
  await fs.writeFile(filePath, JSON.stringify(boxes, null, 2))

  return { success: true, boxes }
})
