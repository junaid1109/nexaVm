<template>
  <div class="customers-page">
    <div class="customers-header">
      <h1>{{ $t('our-customers') }}</h1>
      <p class="subtitle">{{ $t('customers-subtitle') || 'Trusted by enterprises worldwide' }}</p>
    </div>

    <!-- Countries and Logos Grid -->
    <div class="countries-container">
      <div v-for="country in uniqueCountries" :key="country" class="country-section">
        <!-- Country Name -->
        <h2 class="country-name">{{ country }}</h2>
        
        <!-- Logos Grid for this country -->
        <div class="logos-grid">
          <div 
            v-for="customer in getCustomersByCountry(country)" 
            :key="customer.id"
            class="logo-card"
          >
            <img 
              :src="`/img/customers/${customer.logo}`" 
              :alt="`${country} logo`"
              class="customer-logo"
            />
          </div>
        </div>
      </div>

      <!-- No customers message -->
      <div v-if="uniqueCountries.length === 0" class="no-customers">
        <div class="empty-icon">🌍</div>
        <h3>Loading....</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type Customer = {
  id: number
  country: string
  logo: string
}

const customers = ref<Customer[]>([])

// Get unique countries (sorted, removing duplicates)
const uniqueCountries = computed(() => {
  const countries = [...new Set(customers.value.map(c => c.country))]
  return countries.sort()
})

// Get customers by country
function getCustomersByCountry(country: string) {
  return customers.value.filter(c => c.country === country)
}

// Fetch customers from API
async function loadCustomers() {
  try {
    const data = await $fetch('/api/customers')
    customers.value = data || []
  } catch (error) {
    console.error('Failed to load customers:', error)
    customers.value = []
  }
}

onMounted(() => {
  loadCustomers()
})
</script>

<style scoped>
.customers-page {
  min-height: 100vh;
  padding: 40px 20px 60px;
}

/* Header */
.customers-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 20px;
}

.customers-header h1 {
  font-size: 42px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin: 0;
  font-weight: 400;
}

/* Countries Container */
.countries-container {
  max-width: 1400px;
  margin: 0 auto;
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
  background: #dddddd;
  border-radius: 12px;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  min-height: 180px;
}

.logo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.customer-logo {
  max-width: 100%;
  max-height: 120px;
  object-fit: contain;
  display: block;
}

/* No Customers */
.no-customers {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.no-customers h3 {
  font-size: 24px;
  color: #1a202c;
  margin-bottom: 10px;
}

.no-customers p {
  color: #666;
  font-size: 16px;
}

/* Responsive Design */

/* Tablets */
@media screen and (max-width: 1024px) {
  .customers-header h1 {
    font-size: 36px;
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

  .customer-logo {
    max-height: 100px;
  }
}

/* Mobile Tablets */
@media screen and (max-width: 768px) {
  .customers-page {
    padding: 30px 16px 40px;
  }

  .customers-header {
    margin-bottom: 40px;
    padding: 20px 10px;
  }

  .customers-header h1 {
    font-size: 28px;
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

  .customer-logo {
    max-height: 80px;
  }
}

/* Small Phones */
@media screen and (max-width: 480px) {
  .customers-page {
    padding: 20px 12px 30px;
  }

  .customers-header h1 {
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

  .customer-logo {
    max-height: 70px;
  }
}
</style>
