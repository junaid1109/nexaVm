import { promises as fs } from 'fs'

export default defineEventHandler(async (event) => {
  try {
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

    if (!logoFile || !logoFile.filename) {
      return { error: true, message: 'Logo file is required' }
    }

    // Save file to public/img/partners folder
    const uploadDir = './public/img/partners'
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
    const jsonPath = './app/data/partners.json'
    const raw = await fs.readFile(jsonPath, 'utf-8')
    const partners = raw.trim() ? JSON.parse(raw) : []

    const id =
      partners.length > 0
        ? Math.max(...partners.map((p: any) => p.id)) + 1
        : 1

    partners.push({
      id,
      company,
      country,
      partnerType,
      logo: fileName
    })

    // Write back to file
    await fs.writeFile(jsonPath, JSON.stringify(partners, null, 2))

    return { success: true, partners }
  } catch (error: any) {
    console.error('Error:', error)
    return { error: true, message: error.message || 'Failed to add partner' }
  }
})
