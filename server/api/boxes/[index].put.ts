import { promises as fs } from 'fs'
import { resolve, extname } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const param = event.context.params?.index
    if (param === undefined) {
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
    const detail = body.find(f => f.name === 'detail')?.data?.toString() || ''
    const file = body.find(f => f.name === 'file')
    const imageField = body.find(f => f.name === 'image')?.data?.toString() || ''

    const filePath = resolve('./app/data/boxes.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const boxes = raw ? JSON.parse(raw) : []

    // Find the index of the box by ID
    const boxIndex = boxes.findIndex(b => b.id === id)
    if (boxIndex === -1) {
      return { error: true, message: 'Announcement not found' }
    }
    let imageUrl = boxes[boxIndex].image

    if (file) {
      const imgDir = resolve('./public/img')
      await fs.mkdir(imgDir, { recursive: true })

      // Delete old image if exists
      if (boxes[boxIndex].image) {
        const oldImagePath = resolve('./public' + boxes[boxIndex].image)
        try {
          await fs.unlink(oldImagePath)
        } catch (e) {
          // Ignore if file doesn't exist
        }
      }

      const originalName = file.filename || ''
      const ext = originalName ? extname(originalName) : ''
      const filename = `${Date.now()}${ext}`
      await fs.writeFile(resolve(imgDir, filename), file.data)
      imageUrl = `/img/${filename}`
    } else if (imageField) {
      imageUrl = imageField
    }

    // Update the box
    boxes[boxIndex] = {
      ...boxes[boxIndex],
      title,
      detail,
      image: imageUrl
    }

    await fs.writeFile(filePath, JSON.stringify(boxes, null, 2))

    return { success: true }
  } catch (err) {
    console.error(err)
    return { error: true, message: 'Failed to update announcement' }
  }
})
