import { promises as fs } from 'fs'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
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
    const blogs = raw.trim() ? JSON.parse(raw) : []

    const id = blogs.length > 0 ? Math.max(...blogs.map((b: any) => b.id)) + 1 : 1

    let imagePath = ''

    // Save image if provided
    if (imageFile && imageFile.filename) {
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'blogs')
      await mkdir(uploadDir, { recursive: true })
      
      const filename = `${id}-${Date.now()}-${imageFile.filename}`
      const filepath = join(uploadDir, filename)
      
      await writeFile(filepath, imageFile.data)
      imagePath = `/uploads/blogs/${filename}`
    }

    const newBlog = {
      id,
      title: fields.title,
      description: fields.description,
      content: fields.content,
      date: new Date().toISOString().split('T')[0],
      image: imagePath,
      category: fields.category || 'General',
      status: fields.status || 'draft'
    }

    blogs.push(newBlog)
    await fs.writeFile(jsonPath, JSON.stringify(blogs, null, 2))

    return { error: false, message: 'Blog created successfully', blog: newBlog }
  } catch (err: any) {
    console.error('Error creating blog:', err)
    return { error: true, message: err.message }
  }
})
