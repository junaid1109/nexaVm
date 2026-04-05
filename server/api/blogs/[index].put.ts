import { promises as fs } from 'fs'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const blogId = parseInt(getRouterParam(event, 'index')!)
    const form = await readMultipartFormData(event)
    
    if (!form) {
      return { error: true, message: 'No form data received' }
    }

    const fields: any = {}
    let imageFile: any = null

    for (const field of form) {
      if (field.name === 'image' && field.filename) {
        imageFile = field
      } else {
        fields[field.name] = field.data.toString('utf-8')
      }
    }

    if (!fields.title || !fields.description || !fields.content) {
      return { error: true, message: 'Title, description, and content are required' }
    }

    const jsonPath = './app/data/blogs.json'
    const raw = await fs.readFile(jsonPath, 'utf-8')
    let blogs = raw.trim() ? JSON.parse(raw) : []

    const blogIndex = blogs.findIndex((b: any) => b.id === blogId)
    if (blogIndex === -1) {
      return { error: true, message: 'Blog not found' }
    }

    let imagePath = blogs[blogIndex].image
    const oldImagePath = blogs[blogIndex].image

    // Save image if provided
    if (imageFile && imageFile.filename) {
      // Delete old image if it exists and a new image is provided
      if (oldImagePath && oldImagePath.startsWith('/uploads/blogs/')) {
        const oldFilePath = join(process.cwd(), 'public', oldImagePath)
        try {
          await unlink(oldFilePath)
        } catch (unlinkErr) {
          console.warn('Could not delete old image:', unlinkErr)
        }
      }

      const uploadDir = join(process.cwd(), 'public', 'uploads', 'blogs')
      await mkdir(uploadDir, { recursive: true })
      
      const filename = `${blogId}-${Date.now()}-${imageFile.filename}`
      const filepath = join(uploadDir, filename)
      
      await writeFile(filepath, imageFile.data)
      imagePath = `/uploads/blogs/${filename}`
    }

    blogs[blogIndex] = {
      ...blogs[blogIndex],
      title: fields.title,
      description: fields.description,
      content: fields.content,
      image: imagePath,
      category: fields.category || blogs[blogIndex].category || 'General',
      status: fields.status || blogs[blogIndex].status || 'draft'
    }

    await fs.writeFile(jsonPath, JSON.stringify(blogs, null, 2))

    return { error: false, message: 'Blog updated successfully', blog: blogs[blogIndex] }
  } catch (err: any) {
    console.error('Error updating blog:', err)
    return { error: true, message: err.message }
  }
})
