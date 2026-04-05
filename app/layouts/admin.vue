<template>
  <div class="admin-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>NexaVm Admin</h2>

      <ClientOnly>
        <NuxtLink to="/admin" exact-active-class="active">
          Dashboard
        </NuxtLink>

        <NuxtLink to="/admin/announcement" exact-active-class="active">
          Announcements
        </NuxtLink>

        <NuxtLink to="/admin/office" exact-active-class="active">
          Offices
        </NuxtLink>

        <NuxtLink to="/admin/customers" exact-active-class="active">
          Customers
        </NuxtLink>

        <NuxtLink to="/admin/partners" exact-active-class="active">
          Partners
        </NuxtLink>

        <NuxtLink to="/admin/blog" exact-active-class="active">
          Blogs
        </NuxtLink>

        <a href="#" @click.prevent="logout">Logout</a>
      </ClientOnly>
    </aside>

    <!-- Main -->
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})

function logout() {
  localStorage.removeItem('admin_auth')
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-wrapper {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #111827;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.sidebar a {
  color: #fff;
  text-decoration: none;
  margin-bottom: 10px;
}

.sidebar a.active {
  font-weight: bold;
  color: #ffffff;
}

.main {
  flex: 1;
  padding: 20px;
  background: #f3f4f6;
}
</style>

<style>
/* GLOBAL RESET — DO NOT SCOPED */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* LAYOUT */
.admin-wrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* SIDEBAR */
.sidebar {
  width: 240px;
  background: #1f2937;
  color: #fff;
  padding: 20px;
  flex-shrink: 0;
}

.sidebar h2 {
  text-align: center;
  margin-bottom: 30px;
}

.sidebar a {
  display: block;
  padding: 12px;
  color: #cbd5e1;
  text-decoration: none;
  border-radius: 6px;
  margin-bottom: 10px;
}

.sidebar a.active,
.sidebar a:hover {
  background: #374151;
  color: #fff;
}

/* MAIN CONTENT */
.main {
  flex: 1;
  padding: 20px;
  background: #f9fafb;
  overflow-x: hidden;
}
</style>
