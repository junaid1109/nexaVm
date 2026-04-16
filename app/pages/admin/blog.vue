<template>
  <div class="admin">
    <h1>Blogs Management</h1>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-msg">
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-msg">
      {{ errorMessage }}
    </div>

    <!-- Add Blog Button -->
    <button class="btn primary" @click="openAddModal">+ Add Blog</button>

    <!-- Tabs -->
    <div class="tabs-container">
      <button 
        v-for="tab in tabs" 
        :key="tab"
        class="tab-btn"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
      </button>
    </div>

    <!-- Blogs Table -->
    <table class="datatable">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(blog, index) in filteredBlogs" :key="blog.id">
          <td>{{ index + 1 }}</td>
          <td>{{ blog.title }}</td>
          <td>{{ blog.date }}</td>
          <td>
            <button @click="editBlog(blog)" style="margin-right:8px">✏️</button>
            <button @click="deleteBlog(blog.id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal (Add / Edit) -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditMode ? 'Edit Blog' : 'Add Blog' }}</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label>Title</label>
            <input 
              v-model="currentBlog.title" 
              placeholder="Enter blog title"
            />
          </div>

          <div class="field">
            <label>Description</label>
            <input 
              v-model="currentBlog.description" 
              placeholder="Enter short description"
            />
          </div>

          <div class="field">
            <label>Content</label>
            <div class="editor-toolbar">
              <button type="button" @click="formatText('bold')" title="Bold"><strong>B</strong></button>
              <button type="button" @click="formatText('italic')" title="Italic"><em>I</em></button>
              <button type="button" @click="formatText('underline')" title="Underline"><u>U</u></button>
              <div class="divider"></div>
              <button type="button" @click="formatText('insertUnorderedList')" title="Bullet List">• List</button>
              <button type="button" @click="formatText('insertOrderedList')" title="Numbered List">1. List</button>
              <div class="divider"></div>
              <button type="button" @click="formatText('createLink')" title="Add Link">Link</button>
              <button type="button" @click="formatText('h2')" title="Heading">H2</button>
              <button type="button" @click="formatText('p')" title="Paragraph">P</button>
            </div>
            <div 
              ref="contentEditor"
              class="content-editor"
              contenteditable="true"
              @input="currentBlog.content = $event.currentTarget.innerHTML"
              @keydown.enter="handleEnter"
              :placeholder="'Enter blog content with formatting'"
            ></div>
          </div>

          <div class="field">
            <label>Blog Image</label>
            <input 
              type="file"
              accept="image/*"
              @change="(e) => { const files = (e.target as HTMLInputElement).files; currentBlog.imageFile = files ? files[0] : undefined }"
            />
            <!-- Image Preview -->
            <div v-if="currentBlog.imageFile || currentBlog.image" class="image-preview">
              <img 
                :src="imagePreviewUrl" 
                :alt="currentBlog.title || 'Blog image'"
                class="preview-img"
              />
            </div>
          </div>

          <div class="field">
            <label>Category</label>
            <input 
              v-model="currentBlog.category" 
              placeholder="e.g., News, Tutorial, Update"
            />
          </div>

          <div class="field">
            <label>Status</label>
            <select v-model="currentBlog.status">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn secondary" @click="closeModal">Cancel</button>
          <button class="btn primary" @click="isEditMode ? saveBlog() : addBlog()" :disabled="isLoading">
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

import { ref, onMounted, computed, nextTick } from 'vue'

type Blog = {
  id: number
  title: string
  description: string
  content: string
  date: string
  image: string
  category: string
  status: 'draft' | 'published'
}

type BlogForm = Blog & {
  imageFile?: File
}

const blogs = ref<Blog[]>([])
const modalOpen = ref(false)
const isEditMode = ref(false)
const isLoading = ref(false)
const selectedId = ref<number | null>(null)
const activeTab = ref<'draft' | 'published'>('published')
const tabs = ref<('draft' | 'published')[]>(['draft', 'published'])
const currentBlog = ref<Partial<BlogForm>>({
  title: '',
  description: '',
  content: '',
  image: '',
  category: '',
  status: 'draft'
})
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const contentEditor = ref<HTMLElement | null>(null)

const filteredBlogs = computed(() => {
  return blogs.value.filter(blog => blog.status === activeTab.value)
})

const imagePreviewUrl = computed(() => {
  if (typeof window !== 'undefined' && currentBlog.value.imageFile) {
    return URL.createObjectURL(currentBlog.value.imageFile)
  }
  return currentBlog.value.image || ''
})

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

// Format text in editor
function formatText(command: string) {
  if (command === 'createLink') {
    const url = prompt('Enter the URL:')
    if (url) {
      document.execCommand('createLink', false, url)
    }
  } else if (command === 'h2') {
    document.execCommand('formatBlock', false, '<h2>')
  } else if (command === 'p') {
    document.execCommand('formatBlock', false, '<p>')
  } else {
    document.execCommand(command, false)
  }
  contentEditor.value?.focus()
}

function handleEnter(e: KeyboardEvent) {
  // Allow normal behavior
}

// Load blogs
async function loadBlogs() {
  try {
    blogs.value = await $fetch('/api/blogs')
  } catch (error) {
    console.error('Failed to load blogs:', error)
    showError('Failed to load blogs')
  }
}

onMounted(loadBlogs)

// Open Add Modal
function openAddModal() {
  const nextId =
    blogs.value.length > 0
      ? Math.max(...blogs.value.map(b => b.id)) + 1
      : 1

  currentBlog.value = {
    id: nextId,
    title: '',
    description: '',
    content: '',
    image: '',
    category: '',
    status: 'draft',
    imageFile: undefined
  }

  isEditMode.value = false
  modalOpen.value = true
  
  nextTick(() => {
    if (contentEditor.value) {
      contentEditor.value.innerHTML = ''
    }
  })
}

// Close modal
function closeModal() {
  modalOpen.value = false
}

// Add Blog
async function addBlog() {
  if (!currentBlog.value.title || !currentBlog.value.description || !currentBlog.value.content) {
    showError('Please fill in all required fields')
    return
  }

  isLoading.value = true

  try {
    const formData = new FormData()
    formData.append('title', currentBlog.value.title || '')
    formData.append('description', currentBlog.value.description || '')
    formData.append('content', currentBlog.value.content || '')
    formData.append('category', currentBlog.value.category || '')
    formData.append('status', currentBlog.value.status || 'draft')
    if (currentBlog.value.imageFile) {
      formData.append('image', currentBlog.value.imageFile)
    }

    await $fetch('/api/blogs', {
      method: 'POST',
      body: formData
    })
    closeModal()
    showSuccess('Blog added successfully!')
    loadBlogs()
  } catch (error) {
    console.error('Failed to add blog:', error)
    showError('Failed to add blog')
  } finally {
    isLoading.value = false
  }
}

// Edit Blog
function editBlog(blog: Blog) {
  currentBlog.value = { ...blog }
  selectedId.value = blog.id
  isEditMode.value = true
  modalOpen.value = true
  
  nextTick(() => {
    if (contentEditor.value) {
      contentEditor.value.innerHTML = blog.content || ''
    }
  })
}

// Save edited blog
async function saveBlog() {
  if (!currentBlog.value.title || !currentBlog.value.description || !currentBlog.value.content) {
    showError('Please fill in all required fields')
    return
  }

  if (selectedId.value === null) return

  isLoading.value = true

  try {
    const formData = new FormData()
    formData.append('title', currentBlog.value.title || '')
    formData.append('description', currentBlog.value.description || '')
    formData.append('content', currentBlog.value.content || '')
    formData.append('category', currentBlog.value.category || '')
    formData.append('status', currentBlog.value.status || 'draft')
    if (currentBlog.value.imageFile) {
      formData.append('image', currentBlog.value.imageFile)
    }

    await $fetch(`/api/blogs/${selectedId.value}`, {
      method: 'PUT',
      body: formData
    })
    closeModal()
    showSuccess('Blog updated successfully!')
    loadBlogs()
  } catch (error) {
    console.error('Failed to update blog:', error)
    showError('Failed to update blog')
  } finally {
    isLoading.value = false
  }
}

// Delete blog
async function deleteBlog(id: number) {
  if (confirm('Are you sure you want to delete this blog?')) {
    try {
      await $fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      showSuccess('Blog deleted successfully!')
      loadBlogs()
    } catch (error) {
      console.error('Failed to delete blog:', error)
      showError('Failed to delete blog')
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
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; padding: 20px; z-index: 999; }
.modal { background: #fff; padding: 20px; border-radius: 8px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; margin-bottom: 15px; }
.modal-header h2 { margin: 0; font-size: 20px; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280; }
.field { display: flex; flex-direction: column; margin-bottom: 15px; }
.field label { font-size: 14px; margin-bottom: 8px; color: #374151; font-weight: 600; }
.field input, .field textarea { padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: inherit; }
.modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding-top: 15px; border-top: 1px solid #e5e7eb; }
.tabs-container { display: flex; gap: 10px; margin: 20px 0; border-bottom: 2px solid #e5e7eb; }
.tab-btn { background: none; border: none; padding: 12px 20px; cursor: pointer; font-size: 14px; font-weight: 600; color: #6b7280; border-bottom: 3px solid transparent; transition: all 0.3s ease; }
.tab-btn:hover { color: #374151; }
.tab-btn.active { color: #2563eb; border-bottom-color: #2563eb; }
.image-preview { margin-top: 12px; padding: 12px; width:100px }
.preview-img { max-width: 100%; max-height: 300px; border-radius: 4px; display: block; object-fit: cover; }
.field select { padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
.editor-toolbar { display: flex; gap: 5px; margin-bottom: 10px; padding: 8px; background: #f9fafb; border: 1px solid #d1d5db; border-radius: 6px 6px 0 0; flex-wrap: wrap; align-items: center; }
.editor-toolbar button { padding: 6px 12px; background: #fff; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600; color: #374151; transition: all 0.2s ease; }
.editor-toolbar button:hover { background: #e5e7eb; border-color: #9ca3af; }
.editor-toolbar .divider { width: 1px; height: 20px; background: #d1d5db; margin: 0 3px; }
.content-editor { padding: 12px; border: 1px solid #d1d5db; border-top: none; border-radius: 0 0 6px 6px; min-height: 300px; max-height: 400px; overflow-y: auto; background: #fff; font-size: 14px; word-wrap: break-word; }
.content-editor:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
.content-editor h2 { margin: 15px 0 10px 0; font-size: 20px; font-weight: 600; }
.content-editor p { margin: 10px 0; }
.content-editor ul, .content-editor ol { margin: 10px 0 10px 20px; }
.content-editor li { margin: 5px 0; }
.content-editor a { color: #2563eb; text-decoration: underline; }
</style>
