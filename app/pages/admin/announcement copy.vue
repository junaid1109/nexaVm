<template>
  <div class="admin">
    <h1>Annoucements Management</h1>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-msg">
      {{ successMessage }}
    </div>

    <!-- Add Box Button -->
    <button class="btn primary" @click="openAddModal">Add Annoucement</button>

    <!-- Boxes Table -->
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
            <button @click="editBox(box, index)">✏️</button>
            <button @click="deleteBox(index)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal (Add / Edit) -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditMode ? 'Edit Annoucement' : 'Add Annoucement' }}</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>

        <div class="modal-body">
          <div class="field">
            <label>Title</label>
            <input v-model="currentBox.title" />
          </div>
          <div class="field">
            <label>Image URL</label>
            <input v-model="currentBox.image" />
          </div>
          <div class="field">
            <label>Detail</label>
            <textarea v-model="currentBox.detail"></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn secondary" @click="closeModal">Cancel</button>
          <button class="btn primary" @click="isEditMode ? saveBox() : addBox()">
            {{ isEditMode ? 'Save' : 'Add Box' }}
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
  title: string
  image: string
  detail: string
}

const boxes = ref<Box[]>([])
const modalOpen = ref(false)
const isEditMode = ref(false)
const selectedIndex = ref<number | null>(null)
const currentBox = ref<Box>({ title: '', image: '', detail: '' })

// Success message
const successMessage = ref<string | null>(null)
function showSuccess(msg: string) {
  successMessage.value = msg
  setTimeout(() => (successMessage.value = null), 3000) // hide after 3 seconds
}

// Load boxes
async function loadBoxes() {
  boxes.value = await $fetch('/api/boxes')
}
onMounted(loadBoxes)

// Open Add Modal
function openAddModal() {
  currentBox.value = { title: '', image: '', detail: '' }
  isEditMode.value = false
  modalOpen.value = true
}

// Close modal
function closeModal() {
  modalOpen.value = false
}

// Add Box
async function addBox() {
  await $fetch('/api/boxes', { method: 'POST', body: currentBox.value })
  closeModal()
  showSuccess('Annoucement added successfully!')
  loadBoxes()
}

// Edit Box
function editBox(box: Box, index: number) {
  currentBox.value = { ...box }
  selectedIndex.value = index
  isEditMode.value = true
  modalOpen.value = true
}

// Save edited box
async function saveBox() {
  if (selectedIndex.value !== null) {
    await $fetch(`/api/boxes/${selectedIndex.value}`, {
      method: 'PUT',
      body: currentBox.value
    })
    closeModal()
    showSuccess('Annoucement updated successfully!')
    loadBoxes()
  }
}

// Delete box
async function deleteBox(index: number) {
  if (confirm('Are you sure you want to delete this Annoucement?')) {
    await $fetch(`/api/boxes/${index}`, { method: 'DELETE' })
    showSuccess('Annoucement deleted successfully!')
    loadBoxes()
  }
}
</script>

<style scoped>
.admin {
  padding: 20px;
}

/* Success message */
.success-msg {
  background: #4ade80;
  color: #065f46;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-weight: 500;
  transition: all 0.3s;
}

/* Buttons */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.btn.primary {
  background: #2563eb;
  color: #fff;
}
.btn.primary:hover {
  background: #1d4ed8;
}
.btn.secondary {
  background: #e5e7eb;
  color: #111827;
}

/* Table */
.datatable {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.datatable th, .datatable td {
  border: 1px solid #ccc;
  padding: 8px;
}
.table-img {
  max-width: 80px;
  max-height: 60px;
  object-fit: contain;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 999;
}
.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
}
.close-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #6b7280;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.field label {
  font-size: 13px;
  margin-bottom: 6px;
  color: #374151;
}
.field input, .field textarea {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}
.field textarea {
  resize: vertical;
  min-height: 80px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid #e5e7eb;
  padding-top: 10px;
}
</style>
