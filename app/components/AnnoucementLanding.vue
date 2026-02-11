<template>
  <div class="announcement-page">
    <!-- Boxes Container -->
    <div class="box-container">
      <!-- Show boxes if available -->
      <div
        class="box"
        v-for="(box, index) in announcements"
        :key="box.id || index"
        @click="openModal(box)"
      >
        <div class="box-content">
          <h3 class="box-title">{{ box.title }}</h3>
          <img v-if="box.image" :src="box.image" :alt="box.title" />
          <p class="box-detail">{{ box.description?.substring(0, 80) }}...</p>
        </div>
      </div>

      <!-- Show message if no announcements -->
      <div v-if="announcements.length === 0" class="no-announcements">
        <div class="empty-icon">📢</div>
        <h3>{{ $t('no-annoucement') }}</h3>
        <p>{{ $t('no-annoucement-message') }}</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2 class="box-title-mobile">{{ selectedBox.title }}</h2>
        <div class="modal-body">
          <img v-if="selectedBox.image" :src="selectedBox.image" :alt="selectedBox.title" />
          <p>{{ selectedBox.description || selectedBox.detail }}</p>
        </div>
        <div class="modal-footer">
          <button class="close-btn" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Announcement = {
  id: number
  title: string
  description?: string
  detail?: string
  image?: string
  createdAt?: string
}

const announcements = ref<Announcement[]>([])
const modalOpen = ref(false)
const selectedBox = ref<Partial<Announcement>>({})

// Fetch announcements from API
async function loadAnnouncements() {
  try {
    const data = await $fetch('/api/boxes')
    announcements.value = data || []
  } catch (error) {
    console.error('Failed to load announcements:', error)
    announcements.value = []
  }
}

function openModal(box: Announcement) {
  selectedBox.value = box
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  selectedBox.value = {}
}

onMounted(() => {
  loadAnnouncements()
})
</script>

<style scoped>
.announcement-page {
  min-height: 100vh;
  padding: 80px 20px 40px;
  background: #f9fafb;
}

.box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 20px auto;
  max-width: 1400px;
}

.box {
  width: 400px;
  height: 400px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.box:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.box-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1a202c;
}

.box-title-mobile {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #1a202c;
  padding: 20px 20px 0;
}

.box-detail {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.box img {
  max-width: 80%;
  max-height: 60%;
  object-fit: contain;
  margin-bottom: 15px;
}

/* Empty State */
.no-announcements {
  width: 100%;
  max-width: 600px;
  text-align: center;
  padding: 80px 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 40px auto;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.no-announcements h3 {
  font-size: 24px;
  color: #1a202c;
  margin-bottom: 12px;
}

.no-announcements p {
  font-size: 16px;
  color: #718096;
  line-height: 1.6;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  border-radius: 10px;
  overflow: hidden;
  animation: slideUp 0.3s ease;
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

.modal-body {
  overflow-y: auto;
  padding: 15px 20px;
}

.modal img {
  max-width: 100%;
  margin-bottom: 15px;
  border-radius: 8px;
}

.modal p {
  color: #666;
  line-height: 1.6;
}

.modal-footer {
  padding: 15px;
  background: #f9f9f9;
  text-align: center;
  flex-shrink: 0;
  border-top: 1px solid #e5e7eb;
}

.close-btn {
  padding: 10px 24px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #555;
}

/* Responsive */
@media (max-width: 768px) {
  .announcement-page {
    padding: 60px 16px 32px;
  }

  .box {
    width: 100%;
    max-width: 400px;
    height: 350px;
  }

  .no-announcements {
    padding: 60px 30px;
  }

  .empty-icon {
    font-size: 48px;
  }

  .no-announcements h3 {
    font-size: 20px;
  }

  .no-announcements p {
    font-size: 14px;
  }

  .modal {
    width: 95%;
    max-height: 90vh;
  }
}

@media (max-width: 480px) {
  .box {
    height: 300px;
  }

  .box-title,
  .box-title-mobile {
    font-size: 16px;
  }

  .box-detail {
    font-size: 13px;
  }

  .no-announcements {
    padding: 40px 20px;
  }
}
</style>