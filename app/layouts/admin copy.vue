<template>
  <div class="admin-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>NexaVm Admin</h2>
      <NuxtLink to="/admin" class="active">Dashboard</NuxtLink>
      <NuxtLink to="/admin/announcement">Announcements</NuxtLink>
      <NuxtLink to="#">Users</NuxtLink>
      <NuxtLink to="#">Settings</NuxtLink>
      <NuxtLink to="#" @click.prevent="logout">Logout</NuxtLink>
    </aside>

    <!-- Main content -->
    <main class="main">
      <!-- <div class="header">
        <h1>{{ pageTitle }}</h1>
        <span>Admin</span>
      </div> -->

      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Dynamic page title
const pageTitle = ref('Dashboard')
if (route.path.includes('announcement')) pageTitle.value = 'Announcements'

// Logout function
function logout() {
  localStorage.removeItem('admin_auth')
  router.push('/admin/login')
}
</script>

<style scoped>
body {
  margin: 0;
}


.admin-wrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 240px;
  min-height: 100vh; /* important */
  background: #1f2937;
  color: #fff;
  padding: 20px;
}
.sidebar h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 20px;
}
.sidebar a {
  display: block;
  padding: 12px;
  color: #cbd5e1;
  text-decoration: none;
  border-radius: 6px;
  margin-bottom: 10px;
}
.sidebar a:hover,
.sidebar a.active {
  background: #374151;
  color: #fff;
}

/* Main content */
.main {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}


/* Header */
.header {
  background: #fff;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
    margin-top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.header h1 {
  font-size: 20px;
}

.page-content > *:first-child {
  margin-top: 0 !important;
}


</style>
