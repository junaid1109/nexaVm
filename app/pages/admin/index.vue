<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <button class="btn logout-btn" @click="logout">Logout</button>
    </div>

    <!-- Success/Error Messages -->
    <transition name="fade">
      <div v-if="message" :class="['alert', messageType]">
        {{ message }}
      </div>
    </transition>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📢</div>
        <div class="stat-content">
          <h3>Announcements</h3>
          <p class="stat-number">{{ stats.announcements }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🏢</div>
        <div class="stat-content">
          <h3>Offices</h3>
          <p class="stat-number">{{ stats.offices }}</p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-section">
      <button class="btn primary" @click="openPasswordModal">
        🔒 Update Password
      </button>
      <NuxtLink to="/admin/announcement" class="btn secondary">
        Manage Announcements
      </NuxtLink>
      <NuxtLink to="/admin/office" class="btn secondary">
        Manage Offices
      </NuxtLink>
    </div>

    <!-- Password Change Modal -->
    <div v-if="passwordModalOpen" class="modal-overlay" @click.self="closePasswordModal">
      <div class="modal password-modal">
        <div class="modal-header">
          <h2>Update Admin Password</h2>
          <button class="close-btn" @click="closePasswordModal">×</button>
        </div>
        
        <div class="modal-body">

          <div class="field">
            <label>Current Password</label>
            <input 
              v-model="passwordData.currentPassword" 
              type="password" 
              placeholder="Enter current password"
            />
          </div>
          
          <div class="field">
            <label>New Password</label>
            <input 
              v-model="passwordData.newPassword" 
              type="password" 
              placeholder="Enter new password"
            />
          </div>
          
          <div class="field">
            <label>Confirm New Password</label>
            <input 
              v-model="passwordData.confirmPassword" 
              type="password" 
              placeholder="Confirm new password"
            />
          </div>
          
          <p v-if="passwordError" class="error-msg">{{ passwordError }}</p>
        </div>

        <div class="modal-footer">
          <button class="btn secondary" @click="closePasswordModal">Cancel</button>
          <button 
            class="btn primary" 
            @click="changePassword" 
            :disabled="loading"
          >
            {{ loading ? 'Updating...' : 'Update Password' }}
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
import { useRouter } from 'vue-router'

const router = useRouter()

// Stats
const stats = ref({
  announcements: 0,
  offices: 0
})

// Message system
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

function showMessage(msg: string, type: 'success' | 'error' = 'success') {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

// Load dashboard stats
async function loadStats() {
  try {
    const [announcements, offices] = await Promise.all([
      $fetch('/api/boxes'),
      $fetch('/api/offices')
    ])
    
    stats.value.announcements = Array.isArray(announcements) ? announcements.length : 0
    stats.value.offices = Array.isArray(offices) ? offices.length : 0
  } catch (error) {
    console.error('Failed to load stats:', error)
    stats.value.announcements = 0
    stats.value.offices = 0
  }
}

onMounted(() => {
  loadStats()
})

// Logout
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }
}

// Password change
const passwordModalOpen = ref(false)
const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const passwordError = ref('')
const loading = ref(false)

function openPasswordModal() {
  passwordData.value = { 
    currentPassword: '', 
    newPassword: '', 
    confirmPassword: '' 
  }
  passwordError.value = ''
  passwordModalOpen.value = true
}

function closePasswordModal() {
  passwordModalOpen.value = false
  passwordError.value = ''
}

async function changePassword() {
  // Validation
  if (!passwordData.value.currentPassword || !passwordData.value.newPassword || !passwordData.value.confirmPassword) {
    passwordError.value = 'All fields are required'
    return
  }

  if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    passwordError.value = 'New passwords do not match'
    return
  }

  if (passwordData.value.newPassword.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    return
  }

  loading.value = true
  passwordError.value = ''

  try {
    await $fetch('/api/change-password', {
      method: 'POST',
      body: {
        currentPassword: passwordData.value.currentPassword,
        newPassword: passwordData.value.newPassword
      }
    })

    closePasswordModal()
    showMessage('Password updated successfully!', 'success')
  } catch (err: any) {
    passwordError.value = err.data?.message || 'Failed to change password. Check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

h1 {
  font-size: 32px;
  color: #1a202c;
  margin: 0;
}

.alert {
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-weight: 500;
}

.alert.success {
  background: #d1fae5;
  color: #065f46;
  border-left: 4px solid #10b981;
}

.alert.error {
  background: #fee2e2;
  color: #991b1b;
  border-left: 4px solid #ef4444;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 40px;
  background: #f3f4f6;
  padding: 12px;
  border-radius: 10px;
}

.stat-content h3 {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.stat-number {
  margin: 4px 0 0;
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
}

.action-section {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn.primary {
  background: #1a202c;
  color: #fff;
}

.btn.secondary {
  background: #e5e7eb;
  color: #111827;
}

.logout-btn {
  background: #dc2626;
  color: white;
}

.logout-btn:hover {
  background: #b91c1c;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 999;
}

.modal {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  color: #1a202c;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #f3f4f6;
}

.modal-body {
  padding: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.field label {
  font-size: 14px;
  margin-bottom: 6px;
  color: #374151;
  font-weight: 500;
}

.field input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.field input:focus {
  outline: none;
  border-color: #1a202c;
  box-shadow: 0 0 0 3px rgba(26, 32, 44, 0.1);
}

.error-msg {
  background: #fee2e2;
  color: #991b1b;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 14px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}

@media (max-width: 640px) {
  .admin-dashboard {
    padding: 20px;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-section {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>