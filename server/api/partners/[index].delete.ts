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

    const filePath = './app/data/partners.json'
    const dataRaw = await fs.readFile(filePath, 'utf-8')
    const partners = JSON.parse(dataRaw)

    // Find and remove the partner by ID
    const partnerIndex = partners.findIndex((p: any) => p.id === id)
    if (partnerIndex === -1) {
      return { error: true, message: 'Partner not found' }
    }

    // Get the logo filename before deleting
    const logoFileName = partners[partnerIndex].logo

    // Remove from array
    partners.splice(partnerIndex, 1)

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(partners, null, 2))

    // Delete the image file
    if (logoFileName) {
      try {
        const uploadDir = './public/img/partners'
        const imagePath = `${uploadDir}/${logoFileName}`
        await fs.unlink(imagePath)
      } catch (err) {
        console.warn('Could not delete image file:', err)
      }
    }

    return { success: true, partners }
  } catch (err) {
    console.error(err)
    return { error: true, message: 'Failed to delete partner' }
  }
})
