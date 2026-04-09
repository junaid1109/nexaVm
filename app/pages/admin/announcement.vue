<template>
  <div class="admin">
    <h1>Announcements Management</h1>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-msg">
      {{ successMessage }}
    </div>

    <!-- Add Announcement Button -->
    <button class="btn primary" @click="openAddModal">Add Announcement</button>

    <!-- Announcements Table -->
    <table class="datatable">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Image</th>
          <th>Detail</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(box, index) in boxes" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ box.title }}</td>
          <td><img :src="box.image" class="table-img" /></td>
          <td>{{ box.detail }}</td>
          <td>
            <button @click="editBox(box, index)" style="margin-right:8px">✏️</button>
            <button @click="deleteBox(index)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal (Add / Edit) -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditMode ? 'Edit Announcement' : 'Add Announcement' }}</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label>Title</label>
            <input v-model="currentBox.title" />
          </div>
          <div class="field">
            <label>Image</label>
            <input type="file" @change="handleFileUpload" />
            <div v-if="currentBox.image" class="preview">
              <img :src="currentBox.image" />
            </div>
          </div>
          <div class="field">
            <label>Detail</label>
            <textarea v-model="currentBox.detail"></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn secondary" @click="closeModal">Cancel</button>
          <button class="btn primary" @click="isEditMode ? saveBox() : addBox()">
            {{ isEditMode ? 'Save' : 'Add' }}
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

type Box = {
  id: number
  title: string
  image: string
  detail: string
}

const boxes = ref<Box[]>([])
const modalOpen = ref(false)
const isEditMode = ref(false)
const selectedIndex = ref<number | null>(null)
const currentBox = ref<Partial<Box>>({ title: '', image: '', detail: '' })
const selectedFile = ref<File | null>(null)

// Success message
const successMessage = ref<string | null>(null)
function showSuccess(msg: string) {
  successMessage.value = msg
  setTimeout(() => (successMessage.value = null), 3000)
}

// Load boxes
async function loadBoxes() {
  boxes.value = await $fetch('/api/boxes')
}
onMounted(loadBoxes)

// File upload
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    if (typeof URL !== 'undefined') {
      currentBox.value.image = URL.createObjectURL(selectedFile.value)
    }
  }
}

// Open Add Modal
function openAddModal() {
  const nextId =
    boxes.value.length > 0
      ? Math.max(...boxes.value.map(b => b.id)) + 1
      : 1

  currentBox.value = {
    id: nextId,
    title: '',
    image: '',
    detail: ''
  }

  selectedFile.value = null
  isEditMode.value = false
  modalOpen.value = true
}

// Close modal
function closeModal() {
  modalOpen.value = false
}

// Add Box
async function addBox() {
  const formData = new FormData()
  formData.append('title', currentBox.value.title || '')
  formData.append('detail', currentBox.value.detail || '')
  if (selectedFile.value) formData.append('file', selectedFile.value)

  await $fetch('/api/boxes', { method: 'POST', body: formData })
  closeModal()
  showSuccess('Announcement added successfully!')
  loadBoxes()
}

// Edit Box
function editBox(box: Box, index: number) {
  currentBox.value = { ...box }
  selectedIndex.value = box.id
  selectedFile.value = null
  isEditMode.value = true
  modalOpen.value = true
}

// Save edited box
async function saveBox() {
  if (selectedIndex.value === null) return
  const formData = new FormData()
  formData.append('title', currentBox.value.title || '')
  formData.append('detail', currentBox.value.detail || '')

  if (selectedFile.value) {
    formData.append('file', selectedFile.value)
  } else {
    formData.append('image', currentBox.value.image || '')
  }
// console.log('index:', selectedIndex.value)

  await $fetch(`/api/boxes/${selectedIndex.value}`, {
    method: 'PUT',
    body: formData
  })

  closeModal()
  showSuccess('Announcement updated successfully!')
  loadBoxes()
}

// Delete box
async function deleteBox(id: number) {
  if (confirm('Are you sure you want to delete this announcement?')) {
    await $fetch(`/api/boxes/${id}`, { method: 'DELETE' })
    showSuccess('Announcement deleted successfully!')
    loadBoxes()
  }
}
</script>

<style scoped>
.admin { padding: 20px; }
.success-msg { background: #4ade80; color: #065f46; padding: 10px; border-radius: 6px; margin-bottom: 15px; }
.btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; margin-right: 5px; }
.btn.primary { background: #2563eb; color: #fff; }
.btn.secondary { background: #e5e7eb; color: #111827; }
.datatable { width: 100%; border-collapse: collapse; margin-top: 20px; }
.datatable th, .datatable td { border: 1px solid #ccc; padding: 8px; }
.table-img { max-width: 80px; max-height: 60px; object-fit: contain; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; padding: 20px; z-index: 999; }
.modal { background: #fff; padding: 20px; border-radius: 8px; width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb; }
.close-btn { background: none; border: none; font-size: 22px; cursor: pointer; color: #6b7280; }
.field { display: flex; flex-direction: column; margin-bottom: 15px; }
.field label { font-size: 13px; margin-bottom: 6px; color: #374151; }
.field input, .field textarea { padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
.field textarea { resize: vertical; min-height: 80px; }
.preview img { max-width: 100px; max-height: 80px; margin-top: 5px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb; }
</style>
