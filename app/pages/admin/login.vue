<template>
  <div class="login-page">
    <form class="login-box" @submit.prevent="login">
      <div class="logo">
        <span class="logo-icon">🚀</span>
        <h2>NexaVm Admin</h2>
        <p class="subtitle">Sign in to your dashboard</p>
      </div>

      <div class="input-group">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email address"
          :class="{ 'input-error': error }"
          required 
        />
        <span class="input-icon">📧</span>
      </div>

      <div class="input-group">
        <input 
          v-model="password" 
          :type="showPassword ? 'text' : 'password'" 
          placeholder="Password"
          :class="{ 'input-error': error }"
          required 
        />
        <span class="input-icon">🔒</span>
        <button 
          type="button" 
          class="toggle-password" 
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? '👁️‍🗨️' : '👁️' }}
        </button>
      </div>

      <button type="submit" :disabled="loading" class="login-btn">
        <span v-if="!loading">Login</span>
        <span v-else class="loading-spinner"></span>
      </button>

      <transition name="fade">
        <p v-if="error" class="error-message">
          <span class="error-icon">⚠️</span>
          {{ error }}
        </p>
      </transition>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin-login',
  middleware: 'guest'
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const router = useRouter()

async function login() {
  loading.value = true
  error.value = ''
  
  try {
    // Call API to verify credentials from file
    await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })
    
    localStorage.setItem('admin_auth', 'true')
    router.push('/admin')
  } catch (err: any) {
    error.value = err.data?.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo {
  text-align: center;
  margin-bottom: 40px;
}

.logo-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

h2 {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.subtitle {
  color: #718096;
  font-size: 14px;
  margin-top: 8px;
}

.input-group {
  position: relative;
  margin-bottom: 24px;
}

input {
  width: 100%;
  padding: 14px 45px 14px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8fafc;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input.input-error {
  border-color: #e53e3e;
}

.input-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  pointer-events: none;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #718096;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #2d3748;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: #1a202c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(26, 32, 44, 0.4);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  background: #fed7d7;
  border-left: 4px solid #e53e3e;
  border-radius: 4px;
  color: #c53030;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .login-box {
    padding: 30px 20px;
  }
  
  h2 {
    font-size: 24px;
  }
}
</style>