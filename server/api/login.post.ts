import { promises as fs } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    const filePath = resolve('./app/data/admin.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const adminData = JSON.parse(raw)

    // Verify credentials
    if (email === adminData.email && password === adminData.password) {
      return { success: true, message: 'Login successful' }
    } else {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Login failed'
    })
  }
})