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
    if (!body) return { error: true, message: 'No data received' }

    const companyField = body.find(f => f.name === 'company')
    const countryField = body.find(f => f.name === 'country')
    const typeField = body.find(f => f.name === 'partnerType')
    const logoFile = body.find(f => f.name === 'logoFile')

    const company = companyField?.data?.toString() || ''
    const country = countryField?.data?.toString() || ''
    const partnerType = typeField?.data?.toString() || ''

    if (!company) {
      return { error: true, message: 'Company name is required' }
    }

    if (!country) {
      return { error: true, message: 'Country is required' }
    }

    if (!partnerType) {
      return { error: true, message: 'Partner type is required' }
    }

    const filePath = './app/data/partners.json'
    const dataRaw = await fs.readFile(filePath, 'utf-8')
    const partners = JSON.parse(dataRaw)

    // Find the partner
    const partner = partners.find((p: any) => p.id === id)
    if (!partner) {
      return { error: true, message: 'Partner not found' }
    }

    // Update fields
    partner.company = company
    partner.country = country
    partner.partnerType = partnerType

    // Handle logo update if provided
    if (logoFile && logoFile.filename) {
      // Delete old logo
      if (partner.logo) {
        try {
          const uploadDir = './public/img/partners'
          const oldImagePath = `${uploadDir}/${partner.logo}`
          await fs.unlink(oldImagePath)
        } catch (err) {
          console.warn('Could not delete old image:', err)
        }
      }

      // Save new logo
      const uploadDir = './public/img/partners'
      const fileExt = logoFile.filename.split('.').pop() || 'png'
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const newFilePath = `${uploadDir}/${fileName}`

      try {
        await fs.mkdir(uploadDir, { recursive: true })
      } catch (e) {
        console.error('Failed to create directory:', e)
      }

      await fs.writeFile(newFilePath, logoFile.data)
      partner.logo = fileName
    }

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(partners, null, 2))

    return { success: true, partners }
  } catch (err) {
    console.error(err)
    return { error: true, message: 'Failed to update partner' }
  }
})
