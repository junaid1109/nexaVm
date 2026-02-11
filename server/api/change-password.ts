import { promises as fs } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, currentPassword, newPassword } = body

    const filePath = resolve('./app/data/admin.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const adminData = JSON.parse(raw)

    if (currentPassword !== adminData.password) {
      throw createError({
        statusCode: 401,
        message: 'Current password is incorrect'
      })
    }

    // Update password
    adminData.password = newPassword

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(adminData, null, 2))

    return { success: true, message: 'Password updated successfully' }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update password'
    })
  }
})