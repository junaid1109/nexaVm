import { promises as fs } from 'fs'

export default defineEventHandler(async (event) => {
  try {
    const param = event.context.params?.index
    if (!param) {
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

    const countryField = body.find(f => f.name === 'country')
    const logoFile = body.find(f => f.name === 'logoFile')

    const country = countryField?.data?.toString() || ''

    if (!country) {
      return { error: true, message: 'Country is required' }
    }

    const jsonPath = './app/data/customers.json'
    const raw = await fs.readFile(jsonPath, 'utf-8')
    const customers = raw ? JSON.parse(raw) : []

    // Find the customer by its ID
    const customerIndex = customers.findIndex((c: any) => c.id === id)
    if (customerIndex === -1) {
      return { error: true, message: 'Customer not found' }
    }

    let logoFileName = customers[customerIndex].logo

    // If new file is provided, backup old and save new
    if (logoFile && logoFile.filename) {
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

      // Write the new file
      await fs.writeFile(filePath, logoFile.data)
      
      // Delete old file if it exists
      const oldFilePath = `${uploadDir}/${logoFileName}`
      try {
        await fs.unlink(oldFilePath)
      } catch (e) {
        console.warn('Could not delete old file:', e)
      }

      logoFileName = fileName
    }

    // Update the customer
    customers[customerIndex] = {
      ...customers[customerIndex],
      country,
      logo: logoFileName
    }

    await fs.writeFile(jsonPath, JSON.stringify(customers, null, 2))

    return { success: true }
  } catch (err) {
    console.error(err)
    return { error: true, message: 'Failed to update customer' }
  }
})
