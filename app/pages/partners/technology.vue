<template>
  <div class="partners-page">
    <div class="partners-header">
      <div class="banner-background">
        <img src="/img/partner.jpg" alt="Banner" />
      </div>
      <div class="header-content">
        <h1>Technology Partners</h1>
        <p class="subtitle">Leading technology partners driving innovation</p>
      </div>
    </div>

    <!-- Countries and Logos Grid -->
    <div class="countries-container">
      <div v-for="country in uniqueCountries" :key="country" class="country-section">
        <!-- Country Name -->
        <h2 class="country-name">{{ country }}</h2>
        
        <!-- Logos Grid for this country -->
        <div class="logos-grid">
          <div 
            v-for="partner in getPartnersByCountry(country)" 
            :key="partner.id"
            class="logo-card"
          >
            <img 
              :src="`/img/partners/${partner.logo}`" 
              :alt="`${partner.company}`"
              class="partner-logo"
            />
          </div>
        </div>
      </div>

      <!-- No partners message -->
      <div v-if="uniqueCountries.length === 0" class="no-partners">
        <div class="empty-icon">🤝</div>
        <h3>No technology partners yet</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type Partner = {
  id: number
  company: string
  country: string
  partnerType: 'Technology partners' | 'Channel partners'
  logo: string
}

const partners = ref<Partner[]>([])

// Filter only technology partners
const techPartners = computed(() => {
  return partners.value.filter(p => p.partnerType === 'Technology partners')
})

// Get unique countries (sorted, removing duplicates)
const uniqueCountries = computed(() => {
  const countries = [...new Set(techPartners.value.map(p => p.country))]
  return countries.sort()
})

// Get partners by country
function getPartnersByCountry(country: string) {
  return techPartners.value.filter(p => p.country === country)
}

// Fetch partners from API
async function loadPartners() {
  try {
    const data = await $fetch('/api/partners')
    partners.value = data || []
  } catch (error) {
    console.error('Failed to load partners:', error)
    partners.value = []
  }
}

onMounted(() => {
  loadPartners()
})
</script>

<style scoped>
.partners-page {
  min-height: 100vh;
  padding: 0 0 60px 0;
}

/* Header */
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

/* Countries Container */
.countries-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Country Section */
.country-section {
  margin-bottom: 80px;
}

.country-name {
  font-size: 28px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 3px solid #2563eb;
  display: inline-block;
}

/* Logos Grid */
.logos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.logo-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 12px;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 180px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.logo-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(102, 126, 234, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.logo-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.logo-card:hover::before {
  opacity: 1;
}

.partner-logo {
  max-width: 100%;
  max-height: 120px;
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.logo-card:hover .partner-logo {
  transform: scale(1.08);
}

/* No Partners */
.no-partners {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.no-partners h3 {
  font-size: 24px;
  color: #1a202c;
  margin-bottom: 10px;
}

.no-partners p {
  color: #666;
  font-size: 16px;
}

/* Responsive Design */

/* Tablets */
@media screen and (max-width: 1024px) {
  .header-content h1 {
    font-size: 40px;
  }

  .partners-header {
    min-height: 380px;
  }

  .country-name {
    font-size: 24px;
  }

  .logos-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }

  .logo-card {
    padding: 20px 15px;
    min-height: 150px;
  }

  .partner-logo {
    max-height: 100px;
  }
}

/* Mobile Tablets */
@media screen and (max-width: 768px) {
  .partners-page {
    padding: 30px 16px 40px;
  }

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

  .country-section {
    margin-bottom: 60px;
  }

  .country-name {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .logos-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 30px;
  }

  .logo-card {
    padding: 16px 12px;
    min-height: 130px;
  }

  .partner-logo {
    max-height: 80px;
  }
}

/* Small Phones */
@media screen and (max-width: 480px) {
  .partners-page {
    padding: 20px 12px 30px;
  }

  .partners-header h1 {
    font-size: 24px;
  }

  .subtitle {
    font-size: 14px;
  }

  .country-name {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .logos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 25px;
  }

  .logo-card {
    padding: 12px 10px;
    min-height: 110px;
  }

  .partner-logo {
    max-height: 70px;
  }
}
</style>
