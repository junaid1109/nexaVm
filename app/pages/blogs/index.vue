<template>
  <div class="blogs-page">
    <div class="container">
      <h1>Our Blogs</h1>
      <p class="subtitle">Stay updated with the latest news and insights</p>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading">Loading blogs...</div>

      <!-- Error State -->
      <div v-else-if="error" class="error">{{ error }}</div>

      <!-- Blogs Content -->
      <div v-else>
        <!-- Category Tabs -->
        <div v-if="categories.length > 0" class="tabs-container">
          <button 
            :class="{ active: activeCategory === 'All' }"
            class="tab-btn"
            @click="activeCategory = 'All'"
          >
            All
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat"
            :class="{ active: activeCategory === cat }"
            class="tab-btn"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Blogs List -->
        <div v-if="filteredBlogs.length > 0" class="blogs-grid">
          <article v-for="blog in filteredBlogs" :key="blog.id" class="blog-card">
            <div v-if="blog.image" class="blog-image">
              <img :src="blog.image" :alt="blog.title" />
            </div>
            <div class="blog-content">
              <div class="blog-header">
                <h2>{{ blog.title }}</h2>
                <span v-if="blog.category" class="category-badge">{{ blog.category }}</span>
              </div>
              <div class="blog-meta">
                <span class="date">{{ formatDate(blog.date) }}</span>
              </div>
              <p class="description">{{ blog.description }}</p>
              <NuxtLink :to="`/blogs/${blog.id}`" class="read-more">
                Read More →
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- No Blogs -->
        <div v-else class="no-blogs">
          <p>No blogs available at the moment. Check back soon!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

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

const blogs = ref<Blog[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const activeCategory = ref<string>('All')
const categories = computed(() => {
  const cats = [...new Set(blogs.value.map(blog => blog.category).filter(cat => cat))]
  return cats.sort()
})

const filteredBlogs = computed(() => {
  let filtered = blogs.value.filter(blog => blog.status === 'published')
  if (activeCategory.value !== 'All') {
    filtered = filtered.filter(blog => blog.category === activeCategory.value)
  }
  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

onMounted(async () => {
  try {
    isLoading.value = true
    blogs.value = await $fetch('/api/blogs')
  } catch (err: any) {
    console.error('Failed to load blogs:', err)
    error.value = 'Failed to load blogs'
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.blogs-page {
  padding: 60px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 48px;
  margin-bottom: 10px;
  color: #1a202c;
}

.subtitle {
  text-align: center;
  font-size: 18px;
  color: #4a5568;
  margin-bottom: 40px;
}

.blogs-grid {
  display: grid;
  gap: 30px;
}

.blog-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.15);
}

.blog-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #e2e8f0;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-content {
  padding: 25px;
}

.blog-content h2 {
  margin: 0 0 12px 0;
  font-size: 24px;
  color: #1a202c;
  line-height: 1.3;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 10px;
  margin-bottom: 12px;
}

.blog-header h2 {
  margin: 0;
  font-size: 24px;
  color: #1a202c;
  line-height: 1.3;
  flex: 1;
}

.category-badge {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
}

.blog-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #718096;
}

.author::before {
  content: '✍️ ';
}

.date::before {
  content: '📅 ';
}

.description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 15px;
}

.read-more {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #1d4ed8;
}

.loading, .error, .no-blogs {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error {
  color: #c53030;
  background: #fed7d7;
}

.no-blogs {
  color: #4a5568;
}

.no-blogs p {
  margin: 0;
  font-size: 18px;
}

.tabs-container {
  display: flex;
  gap: 10px;
  margin: 30px 0;
  border-bottom: 2px solid #e5e7eb;
  overflow-x: auto;
  padding-bottom: 0;
}

.tab-btn {
  background: none;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #374151;
}

.tab-btn.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
}

@media (max-width: 768px) {
  .blogs-page {
    padding: 40px 15px;
  }

  h1 {
    font-size: 36px;
  }

  .blog-image {
    height: 200px;
  }

  .blog-content {
    padding: 20px;
  }

  .blog-content h2 {
    font-size: 20px;
  }
}
</style>
