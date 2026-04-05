<template>
  <div class="blog-detail-page">
    <div class="container">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading">Loading blog...</div>

      <!-- Error State -->
      <div v-else-if="error" class="error">{{ error }}</div>

      <!-- Blog Content -->
      <div v-else-if="blog" class="blog-detail">
        <div class="blog-content-wrapper">
          <article class="blog-article">
            <header class="blog-header">
              <h1>{{ blog.title }}</h1>
              <div class="blog-meta">
                <span v-if="blog.category" class="category-badge">{{ blog.category }}</span>
                <span class="date">📅 {{ formatDate(blog.date) }}</span>
              </div>
            </header>

            <div v-if="blog.image" class="blog-image">
              <img :src="blog.image" :alt="blog.title" />
            </div>

            <div class="blog-body" v-html="blog.content"></div>

            <footer class="blog-footer">
              <NuxtLink to="/blogs" class="back-link">← Back to All Blogs</NuxtLink>
            </footer>
          </article>

          <!-- Recent Blogs Sidebar -->
          <aside class="recent-blogs-sidebar">
            <h3>Recent Blogs</h3>
            <div class="recent-blogs-list">
              <NuxtLink 
                v-for="recentBlog in recentBlogs" 
                :key="recentBlog.id"
                :to="`/blogs/${recentBlog.id}`"
                class="recent-blog-item"
              >
                <div v-if="recentBlog.image" class="recent-blog-image">
                  <img :src="recentBlog.image" :alt="recentBlog.title" />
                </div>
                <div class="recent-blog-info">
                  <h4>{{ recentBlog.title }}</h4>
                  <span class="recent-blog-date">{{ formatDate(recentBlog.date) }}</span>
                </div>
              </NuxtLink>
            </div>
          </aside>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="not-found">
        <p>Blog not found</p>
        <NuxtLink to="/blogs">Go back to blogs</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

type Blog = {
  id: number
  title: string
  description: string
  content: string
  date: string
  image: string
  category?: string
  status?: 'draft' | 'published'
}

const route = useRoute()
const blog = ref<Blog | null>(null)
const allBlogs = ref<Blog[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const blogId = computed(() => {
  return route.params.id ? parseInt(route.params.id as string) : null
})

const recentBlogs = computed(() => {
  return allBlogs.value
    .filter(b => b.id !== blogId.value && b.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
})

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

async function loadBlog() {
  if (!blogId.value) {
    error.value = 'Invalid blog ID'
    isLoading.value = false
    return
  }

  try {
    isLoading.value = true
    error.value = null
    const blogs: Blog[] = await $fetch('/api/blogs')
    allBlogs.value = blogs
    
    blog.value = blogs.find(b => b.id === blogId.value) || null
    
    if (!blog.value) {
      error.value = `Blog with ID ${blogId.value} not found`
    }
  } catch (err: any) {
    console.error('Failed to load blog:', err)
    error.value = 'Failed to load blog'
  } finally {
    isLoading.value = false
  }
}

// Watch for route param changes and reload blog
watch(() => blogId.value, () => {
  loadBlog()
}, { immediate: true })
</script>

<style scoped>
.blog-detail-page {
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  margin: 0 auto;
}

.back-button {
  margin-bottom: 30px;
}

.back-button a,
.back-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  font-size: 15px;
}

.back-button a:hover,
.back-link:hover {
  color: #1d4ed8;
}

.blog-detail {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  padding: 0;
}

.blog-content-wrapper {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  padding: 50px;
}

.blog-article {
  padding: 0;
}

.blog-header {
  margin-bottom: 35px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f4f8;
}

.blog-header h1 {
  margin: 0 0 15px 0;
  font-size: 48px;
  color: #1a202c;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.blog-meta {
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #718096;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 12px;
}

.category-badge {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  padding: 8px 18px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
  box-shadow: 0 3px 6px rgba(37, 99, 235, 0.25);
  text-transform: capitalize;
}

.blog-image {
  width: 100%;
  max-width: 600px;
  height: 350px;
  margin: 30px auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.blog-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.blog-body {
  color: #2d3748;
  line-height: 1.9;
  font-size: 18px;
  margin: 40px 0 30px 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-weight: 400;
}

.blog-footer {
  padding-top: 30px;
  margin-top: 40px;
  border-top: 2px solid #f0f4f8;
}

.recent-blogs-sidebar {
  height: fit-content;
  position: sticky;
  top: 20px;
}

.recent-blogs-sidebar h3 {
  font-size: 20px;
  color: #1a202c;
  margin: 0 0 20px 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.recent-blogs-sidebar h3::before {
  content: '📰';
  font-size: 24px;
}

.recent-blogs-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.recent-blog-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.recent-blog-item:hover {
  background: #f3f4f6;
  border-color: #2563eb;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
}

.recent-blog-image {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #e2e8f0;
}

.recent-blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recent-blog-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.recent-blog-info h4 {
  margin: 0 0 6px 0;
  font-size: 14px;
  color: #1a202c;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recent-blog-date {
  font-size: 12px;
  color: #718096;
}

.loading, .error, .not-found {
  background: white;
  padding: 60px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 40px;
}

.error {
  color: #c53030;
  background: #fed7d7;
}

.not-found {
  color: #4a5568;
}

.not-found p {
  margin: 0 0 20px 0;
  font-size: 18px;
}

.not-found a {
  display: inline-block;
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  background: #e0e7ff;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.not-found a:hover {
  background: #c7d2fe;
}

@media (max-width: 768px) {
  .blog-detail-page {
    padding: 20px 15px;
  }

  .blog-content-wrapper {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 30px 20px;
  }

  .recent-blogs-sidebar {
    position: static;
  }

  .blog-article {
    padding: 0;
  }

  .blog-header h1 {
    font-size: 32px;
  }

  .blog-image {
    max-width: 100%;
    height: 250px;
    margin: 20px auto;
  }

  .blog-body {
    font-size: 16px;
    line-height: 1.8;
  }
}
</style>
