<!-- pages/CustomerSlides.vue -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const customers = ref([])

// Load customers from API
async function loadCustomers() {
  try {
    customers.value = await $fetch('/api/customers')
  } catch (error) {
    console.error('Failed to load customers:', error)
    // Fallback to empty array
    customers.value = []
  }
}

// duplicate list so animation can loop seamlessly
const repeatedCustomers = computed(() => [
  ...customers.value,
  ...customers.value
])

const slidesRef = ref(null)
const offset = ref(0)          // current translation in pixels
const speed = 50               // pixels per second (lower = slower, higher = faster)

let animationFrameId = null
let lastTime = 0
let baseWidth = 0              // width of one full sequence of logos

const updateBaseWidth = () => {
  if (slidesRef.value) {
    // total width is 2 * baseWidth because we duplicated the list
    baseWidth = slidesRef.value.scrollWidth / 2
  }
}

const animate = (time) => {
  if (!lastTime) lastTime = time
  const dt = (time - lastTime) / 1000 // seconds since last frame
  lastTime = time

  if (!baseWidth) updateBaseWidth()

  if (baseWidth) {
    offset.value += speed * dt
    if (offset.value >= baseWidth) {
      offset.value -= baseWidth
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

// fixed card width & gap, without changing CSS
const cardStyle = {
  flex: '0 0 200px', // width of each card (adjust as you like)
  margin: '0 16px'   // horizontal gap between cards
}

onMounted(() => {
  loadCustomers()
  updateBaseWidth()
  window.addEventListener('resize', updateBaseWidth)
  animationFrameId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateBaseWidth)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <section class="customers-section">
    <h2>{{ $t('our-customers') }}</h2>

    <div class="slider">
      <div class="slides-window">
        <div
          class="slides"
          ref="slidesRef"
          :style="{
            transform: `translateX(-${offset}px)`,
            transition: 'none' // override CSS transition, do animation via JS
          }"
        >
          <div
            v-for="(customer, index) in repeatedCustomers"
            :key="index"
            class="customer-card"
            :class="{
              'afghan-post-card': customer.country === 'Afghanistan',
              'omega-card': customer.country === 'Pakistan' && customer.logo.includes('omega')
            }"
            :style="cardStyle"
          >
            <img
              v-if="customer.logo"
              :src="`/img/customers/${customer.logo}`"
              :alt="customer.country"
              class="customer-logo"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Base (very large screens, desktops at 100% zoom) */
.customer-logo {
  max-width: 350px;
  max-height: 130px;
  object-fit: contain;
  margin-bottom: 8px;
}

/* <= 1600px */
@media screen and (max-width: 1600px) {
  .customer-logo {
    max-width: 230px;
    max-height: 115px;
  }
}

/* <= 1300px  (this will also usually be hit around 150% zoom on 1920px) */
@media screen and (max-width: 1300px) {
  .customer-logo {
    max-width: 200px;
    max-height: 100px;
  }
}

/* <= 1024px (tablet / small laptop) */
@media screen and (max-width: 1024px) {
  .customer-logo {
    max-width: 170px;
    max-height: 85px;
  }
}

/* <= 768px (tablet portrait / big phones) */
@media screen and (max-width: 768px) {
  .customer-logo {
    max-width: 140px;
    max-height: 70px;
  }
}

/* <= 480px (small phones) */
@media screen and (max-width: 480px) {
  .customer-logo {
    max-width: 120px;
    max-height: 60px;
  }
}

.customers-section {
  margin: 0 auto;
  padding: 40px 16px;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

/* Slider layout */
.slider {
  display: flex;
  align-items: center;
  gap: 8px;
}

.customer-card.afghan-post-card {
  background-color: #115ea4;
  color: #ffffff;
}

.customer-card.omega-card {
  background-color: #8fd400;
}

.nav-button {
  border: none;
  background: #f0f0f0;
  color: #333;
  font-size: 24px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button:hover {
  background: #e0e0e0;
}

.slides-window {
  overflow: hidden;
  width: 100%;
}

.slides {
  display: flex;
  transition: transform 1.5s ease;
}

/* each slide = one "screen set" */
.slide {
  min-width: 100%;
  padding: 12px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

/* customer card */
.customer-card {
  padding: 12px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.customer-name {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
</style>