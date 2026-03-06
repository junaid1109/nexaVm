<template>
  <div class="partners-page">
    <div class="partners-header">
      <div class="banner-background">
        <img src="/img/abstract-2.png" alt="Banner" />
      </div>
      <div class="header-content">
        <h1>Become a Partner</h1>
        <p class="subtitle">Join our network of trusted partners worldwide</p>
      </div>
    </div>
    
    <div class="partners-container">
      <div class="partners-grid">
        <div v-for="partner in partners" :key="partner.id" class="partner-card">
          <div class="logo-container">
            <img :src="`/img/partners/${partner.logo}`" :alt="partner.company" class="partner-logo" />
          </div>
          <h3>{{ partner.company }}</h3>
          <p class="country">{{ partner.country }}</p>
          <span :class="['badge', partner.partnerType === 'Technology partners' ? 'badge-tech' : 'badge-channel']">
            {{ partner.partnerType }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Partner = {
  id: number
  company: string
  country: string
  partnerType: 'Technology partners' | 'Channel partners'
  logo: string
}

const partners = ref<Partner[]>([])

onMounted(async () => {
  try {
    partners.value = await $fetch('/api/partners')
  } catch (error) {
    console.error('Failed to load partners:', error)
  }
})
</script>

<style scoped>
/* Partners Grid */
.partners-page { 
  padding: 0 0 60px 0; 
}

/* Header with Banner */
.partners-header {
  position: relative;
  margin: 0 0 60px 0;
  overflow: hidden;
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.banner-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.banner-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.25;
  filter: brightness(1.2) contrast(1.1);
}

.partners-header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  z-index: 1;
}

.partners-header::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 60px 40px;
  max-width: 900px;
}

.header-content h1 {
  font-size: 52px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 15px;
  letter-spacing: -1px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideInDown 0.8s ease-out;
}

.subtitle {
  font-size: 20px;
  color: #ffffff;
  margin: 0;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
  animation: slideInUp 0.8s ease-out 0.2s both;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.partners-container { 
  max-width: 1200px; 
  margin: 0 auto;
  padding: 60px 20px;
  width: 100%;
}

.partners-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  gap: 30px; 
}

.partner-card { 
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border: 2px solid #e5e7eb; 
  border-radius: 12px; 
  padding: 25px; 
  text-align: center; 
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.partner-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.partner-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.partner-card:hover::before {
  left: 100%;
}

.logo-container { 
  height: 120px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin-bottom: 15px;
  background: #f0f2f9;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.partner-card:hover .logo-container {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
}

.partner-logo { 
  max-width: 100%; 
  max-height: 100%; 
  object-fit: contain;
  transition: transform 0.3s ease;
}

.partner-card:hover .partner-logo {
  transform: scale(1.1);
}

.partner-card h3 { 
  margin: 15px 0 10px; 
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
}

.country { 
  color: #667eea; 
  margin: 0 0 15px; 
  font-size: 14px;
  font-weight: 500;
}

.badge { 
  color: #fff; 
  padding: 6px 14px; 
  border-radius: 20px; 
  font-size: 12px; 
  display: inline-block; 
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}
.badge-tech { background: #3b82f6; }
.badge-channel { background: #8b5cf6; }

/* Responsive Design */

@media (max-width: 1024px) {
  .header-content h1 {
    font-size: 40px;
  }

  .partners-header {
    min-height: 380px;
  }

  .partners-grid { 
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
    gap: 25px; 
  }
}

@media (max-width: 768px) {
  .partners-header {
    margin-bottom: 40px;
    min-height: 320px;
  }

  .header-content {
    padding: 40px 20px;
  }

  .header-content h1 {
    font-size: 32px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  }

  .subtitle {
    font-size: 16px;
  }

  .partners-container {
    padding: 40px 15px;
  }

  .partners-grid { 
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); 
    gap: 12px; 
  }

  .partner-card {
    padding: 12px;
  }

  .logo-container {
    height: 90px;
  }

  .partner-card h3 {
    font-size: 13px;
    margin: 10px 0 5px;
  }

  .country {
    font-size: 12px;
  }

  .badge {
    padding: 4px 10px;
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .header-content h1 {
    font-size: 28px;
  }

  .subtitle {
    font-size: 14px;
  }

  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
