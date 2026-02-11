import { promises as fs } from 'fs'
import { resolve, extname } from 'path'

type Box = {
  id: number
  title: string
  image: string
  detail: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event)

    if (!body) {
      return { error: true, message: 'No data received' }
    }

    const title = body.find(f => f.name === 'title')?.data?.toString() || ''
    const detail = body.find(f => f.name === 'detail')?.data?.toString() || ''
    const fileField = body.find(f => f.name === 'file')

    if (!title || !detail) {
      return { error: true, message: 'Title & detail are required' }
    }

    let imageUrl = ''
    if (fileField) {
      const publicDir = resolve('./public/img')
      await fs.mkdir(publicDir, { recursive: true })

      const originalName = fileField.filename || ''
      const ext = originalName ? extname(originalName) : ''
      const fileName = `${Date.now()}${ext}`
      const filePath = resolve(publicDir, fileName)
      await fs.writeFile(filePath, fileField.data)

      imageUrl = `/img/${fileName}`
    }

    const filePath = resolve('./app/data/boxes.json')
    const dataRaw = await fs.readFile(filePath, 'utf-8')
    const boxes: Box[] = JSON.parse(dataRaw)

    // Create unique id
    const newId = boxes.length ? Math.max(...boxes.map(b => b.id)) + 1 : 1
    
    boxes.push({ id: newId, title, detail, image: imageUrl })
    await fs.writeFile(filePath, JSON.stringify(boxes, null, 2))

    return { success: true, boxes }
  } catch (err) {
    console.error(err)
    return { error: true, message: 'Failed to add announcement' }
  }
})