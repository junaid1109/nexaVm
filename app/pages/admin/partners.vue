<template>
  <div class="admin">
    <h1>Partners Management</h1>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-msg">
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-msg">
      {{ errorMessage }}
    </div>

    <!-- Add Partner Button -->
    <button class="btn primary" @click="openAddModal">+ Add Partner</button>

    <!-- Partners Table -->
    <table class="datatable">
      <thead>
        <tr>
          <th>#</th>
          <th>Company</th>
          <th>Country</th>
          <th>Type</th>
          <th>Logo Preview</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(partner, index) in partners" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ partner.company }}</td>
          <td>{{ partner.country }}</td>
          <td><span :class="['badge', partner.partnerType === 'Technology partners' ? 'badge-tech' : 'badge-channel']">{{ partner.partnerType }}</span></td>
          <td class="preview">
            <img v-if="partner.logo" :src="`/img/partners/${partner.logo}`" :alt="partner.company" class="table-img" />
          </td>
          <td>
            <button @click="editPartner(partner, index)" style="margin-right:8px">✏️</button>
            <button @click="deletePartner(partner.id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal (Add / Edit) -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditMode ? 'Edit Partner' : 'Add Partner' }}</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label>Company Name</label>
            <input 
              v-model="currentPartner.company" 
              placeholder="Enter company name"
            />
          </div>

          <div class="field">
            <label>Country</label>
            <input 
              v-model="currentPartner.country" 
              placeholder="Select country"
              list="countries"
            />
            <datalist id="countries">
              <option v-for="country in countryList" :key="country" :value="country">{{ country }}</option>
            </datalist>
          </div>

          <div class="field">
            <label>Partner Type</label>
            <select v-model="currentPartner.partnerType">
              <option value="">Select partner type</option>
              <option v-for="type in partnerTypeOptions" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>

          <div class="field">
            <label>Logo Image</label>
            <input 
              type="file" 
              accept="image/*"
              @change="onLogoFileSelected"
            />
            <small>Supported: PNG, JPG, GIF, WebP</small>
          </div>

          <div v-if="logoPreview" class="preview">
            <label>Current Preview:</label>
            <img :src="logoPreview" :alt="'Preview'" class="preview-img" />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn secondary" @click="closeModal">Cancel</button>
          <button class="btn primary" @click="isEditMode ? savePartner() : addPartner()" :disabled="isLoading">
            {{ isLoading ? 'Saving...' : (isEditMode ? 'Update' : 'Add') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

import { ref, onMounted } from 'vue'

type Partner = {
  id: number
  company: string
  country: string
  partnerType: 'Technology partners' | 'Channel partners'
  logo: string
}

const partners = ref<Partner[]>([])
const modalOpen = ref(false)
const isEditMode = ref(false)
const isLoading = ref(false)
const selectedId = ref<number | null>(null)
const currentPartner = ref<Partial<Partner>>({ company: '', country: '', partnerType: 'Technology partners', logo: '' })
const logoFile = ref<File | null>(null)
const logoPreview = ref<string>('')
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

const partnerTypeOptions = ['Technology partners', 'Channel partners']

const countryList = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Côte d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
  'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
  'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
  'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
  'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
  'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
  'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
  'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
]

function showSuccess(msg: string) {
  successMessage.value = msg
  errorMessage.value = null
  setTimeout(() => (successMessage.value = null), 3000)
}

function showError(msg: string) {
  errorMessage.value = msg
  successMessage.value = null
  setTimeout(() => (errorMessage.value = null), 5000)
}

async function loadPartners() {
  try {
    partners.value = await $fetch('/api/partners')
  } catch (error) {
    console.error('Failed to load partners:', error)
    showError('Failed to load partners')
  }
}

onMounted(loadPartners)

function onLogoFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (file) {
    if (!file.type.startsWith('image/')) {
      showError('Please select a valid image file')
      input.value = ''
      return
    }
    
    logoFile.value = file
    const reader = new FileReader()
    reader.onload = (event) => {
      logoPreview.value = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function openAddModal() {
  const nextId = partners.value.length > 0 ? Math.max(...partners.value.map(p => p.id)) + 1 : 1
  currentPartner.value = { id: nextId, company: '', country: '', partnerType: 'T                        echnology partners', logo: '' }
  logoFile.value = null
  logoPreview.value = ''
  isEditMode.value = false
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  logoFile.value = null
  logoPreview.value = ''
}

async function addPartner() {
  if (!currentPartner.value.company) {
    showError('Please enter company name')
    return
  }
  if (!currentPartner.value.country) {
    showError('Please select a country')
    return
  }
  if (!currentPartner.value.partnerType) {
    showError('Please select partner type')
    return
  }
  if (!logoFile.value) {
    showError('Please select a logo image')
    return
  }

  isLoading.value = true
  const formData = new FormData()
  formData.append('company', currentPartner.value.company)
  formData.append('country', currentPartner.value.country)
  formData.append('partnerType', currentPartner.value.partnerType)
  formData.append('logoFile', logoFile.value)

  try {
    await $fetch('/api/partners', { method: 'POST', body: formData })
    closeModal()
    showSuccess('Partner added successfully!')
    loadPartners()
  } catch (error) {
    console.error('Failed to add partner:', error)
    showError('Failed to add partner')
  } finally {
    isLoading.value = false
  }
}

function editPartner(partner: Partner, index: number) {
  currentPartner.value = { ...partner }
  selectedId.value = partner.id
  logoFile.value = null
  logoPreview.value = `/img/partners/${partner.logo}`
  isEditMode.value = true
  modalOpen.value = true
}

async function savePartner() {
  if (!currentPartner.value.company) {
    showError('Please enter company name')
    return
  }
  if (!currentPartner.value.country) {
    showError('Please select a country')
    return
  }
  if (!currentPartner.value.partnerType) {
    showError('Please select partner type')
    return
  }
  if (selectedId.value === null) return

  isLoading.value = true
  const formData = new FormData()
  formData.append('company', currentPartner.value.company)
  formData.append('country', currentPartner.value.country)
  formData.append('partnerType', currentPartner.value.partnerType)
  if (logoFile.value) {
    formData.append('logoFile', logoFile.value)
  }

  try {
    await $fetch(`/api/partners/${selectedId.value}`, { method: 'PUT', body: formData })
    closeModal()
    showSuccess('Partner updated successfully!')
    loadPartners()
  } catch (error) {
    console.error('Failed to update partner:', error)
    showError('Failed to update partner')
  } finally {
    isLoading.value = false
  }
}

async function deletePartner(id: number) {
  if (confirm('Are you sure you want to delete this partner?')) {
    try {
      await $fetch(`/api/partners/${id}`, { method: 'DELETE' })
      showSuccess('Partner deleted successfully!')
      loadPartners()
    } catch (error) {
      console.error('Failed to delete partner:', error)
      showError('Failed to delete partner')
    }
  }
}
</script>

<style scoped>
.admin { padding: 20px; }
.success-msg { background: #4ade80; color: #065f46; padding: 12px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #22c55e; }
.error-msg { background: #fca5a5; color: #7f1d1d; padding: 12px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #ef4444; }
.btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; margin-right: 5px; font-weight: 500; }
.btn.primary { background: #2563eb; color: #fff; }
.btn.primary:disabled { background: #9ca3af; cursor: not-allowed; }
.btn.secondary { background: #e5e7eb; color: #111827; }
.datatable { width: 100%; border-collapse: collapse; margin-top: 20px; }
.datatable th, .datatable td { border: 1px solid #d1d5db; padding: 12px; text-align: left; }
.datatable th { background: #f3f4f6; font-weight: 600; }
.datatable tbody tr:hover { background: #f9fafb; }
.table-img { max-width: 80px; max-height: 60px; object-fit: contain; }
.preview { text-align: center; }
.preview-img { max-width: 200px; max-height: 150px; object-fit: contain; margin-top: 10px; border-radius: 4px; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; padding: 20px; z-index: 999; }
.modal { background: #fff; padding: 20px; border-radius: 8px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; margin-bottom: 15px; }
.modal-header h2 { margin: 0; font-size: 20px; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280; }
.field { display: flex; flex-direction: column; margin-bottom: 15px; }
.field label { font-size: 14px; margin-bottom: 8px; color: #374151; font-weight: 600; }
.field input { padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
.field select { padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
.field small { font-size: 12px; color: #6b7280; margin-top: 4px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding-top: 15px; border-top: 1px solid #e5e7eb; }
.badge { color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px; display: inline-block; }
.badge-tech { background: #3b82f6; }
.badge-channel { background: #8b5cf6; }
</style>
