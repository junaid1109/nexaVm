import { promises as fs } from 'fs'
import { unlink } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const blogId = parseInt(getRouterParam(event, 'index')!)

    const jsonPath = './app/data/blogs.json'
    const raw = await fs.readFile(jsonPath, 'utf-8')
    let blogs = raw.trim() ? JSON.parse(raw) : []

    const blogIndex = blogs.findIndex((b: any) => b.id === blogId)
    
    if (blogIndex === -1) {
      return { error: true, message: 'Blog not found' }
    }

    // Delete image file if it exists
    const blog = blogs[blogIndex]
    if (blog.image && blog.image.startsWith('/uploads/blogs/')) {
      const imagePath = join(process.cwd(), 'public', blog.image)
      try {
        await unlink(imagePath)
      } catch (unlinkErr) {
        console.warn('Could not delete image file:', unlinkErr)
      }
    }

    blogs = blogs.filter((b: any) => b.id !== blogId)
    await fs.writeFile(jsonPath, JSON.stringify(blogs, null, 2))

    return { error: false, message: 'Blog deleted successfully' }
  } catch (err: any) {
    return { error: true, message: err.message }
  }
})
