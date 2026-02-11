import { promises as fs } from 'fs'
import { resolve } from 'path'
import { getQuery, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  // Get index from URL
  const index = parseInt(event.context.params?.index as string)
  if (isNaN(index)) {
    return { error: true, message: 'Invalid index' }
  }

  const filePath = resolve('./app/data/boxes.json')
  const dataRaw = await fs.readFile(filePath, 'utf-8')
  const boxes = JSON.parse(dataRaw)

  if (index < 0 || index >= boxes.length) {
    return { error: true, message: 'Index out of range' }
  }

  // Delete image if exists
  if (boxes[index].image) {
    const imagePath = resolve('./public' + boxes[index].image)
    try {
      await fs.unlink(imagePath)
    } catch (e) {
      // Ignore if file doesn't exist
    }
  }

  // Remove the item
  boxes.splice(index, 1)

  // Write back to file
  await fs.writeFile(filePath, JSON.stringify(boxes, null, 2))

  return { success: true, boxes }
})
