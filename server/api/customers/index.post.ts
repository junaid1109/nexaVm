import { promises as fs } from 'fs'

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event)
    if (!body) return { error: true, message: 'No data received' }

    const countryField = body.find(f => f.name === 'country')
    const logoFile = body.find(f => f.name === 'logoFile')

    const country = countryField?.data?.toString() || ''

    if (!country) {
      return { error: true, message: 'Country is required' }
    }

    if (!logoFile || !logoFile.filename) {
      return { error: true, message: 'Logo file is required' }
    }

    // Save file to public/img/customers folder
    const uploadDir = './public/img/customers'
    // Generate unique filename using timestamp + random number
    const fileExt = logoFile.filename.split('.').pop() || 'png'
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${uploadDir}/${fileName}`

    // Create directory if it doesn't exist
    try {
      await fs.mkdir(uploadDir, { recursive: true })
    } catch (e) {
      console.error('Failed to create directory:', e)
    }

    // Write the file
    await fs.writeFile(filePath, logoFile.data)

    // Add to JSON
    const jsonPath = './app/data/customers.json'
    const raw = await fs.readFile(jsonPath, 'utf-8')
    const customers = raw.trim() ? JSON.parse(raw) : []

    const id =
      customers.length > 0
        ? Math.max(...customers.map((c: any) => c.id)) + 1
        : 1

    customers.push({
      id,
      country,
      logo: fileName
    })

    await fs.writeFile(jsonPath, JSON.stringify(customers, null, 2))
    return { success: true, fileName }
  } catch (e) {
    console.error(e)
    return { error: true, message: 'Failed to add customer' }
  }
})
