import { promises as fs } from 'fs'

export default defineEventHandler(async (event) => {
  try {
    // Get ID from URL
    const param = event.context.params?.index
    if (!param) {
      return { error: true, message: 'ID is required' }
    }

    const id = Number(param)
    if (Number.isNaN(id)) {
      return { error: true, message: 'Invalid ID' }
    }

    const filePath = './app/data/customers.json'
    const dataRaw = await fs.readFile(filePath, 'utf-8')
    const customers = JSON.parse(dataRaw)

    // Find and remove the customer by ID
    const customerIndex = customers.findIndex((c: any) => c.id === id)
    if (customerIndex === -1) {
      return { error: true, message: 'Customer not found' }
    }

    // Get the logo filename before deleting
    const logoFileName = customers[customerIndex].logo

    // Remove from array
    customers.splice(customerIndex, 1)

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(customers, null, 2))

    // Delete the image file
    if (logoFileName) {
      try {
        const uploadDir = './public/img/customers'
        const imagePath = `${uploadDir}/${logoFileName}`
        await fs.unlink(imagePath)
      } catch (err) {
        console.warn('Could not delete image file:', err)
      }
    }

    return { success: true, customers }
  } catch (err) {
    console.error(err)
    return { error: true, message: 'Failed to delete customer' }
  }
})
