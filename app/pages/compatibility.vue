<template>
  <section class="cpuTab compatibility-container">
    <CompatibilityList />
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"

// SEO
useHead({
  meta: [
    { name: "description", content: "NexaVM is revolutionising enterprise infrastructure with cutting-edge virtualisation technology." },
    { property: "og:title", content: "NexaVM | Compatibility" },
    { property: "og:description", content: "NexaVM is revolutionising enterprise infrastructure with cutting-edge virtualisation technology." },
    { property: "og:image", content: "/img/default.jpg" },
    { property: "og:url", content: "https://nexavm.com/compatibility" }
  ],

  // CDN Links
  link: [
    // Optional Bootstrap grid & utilities only, no _reboot.scss
    { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap-grid.min.css" },
    { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap-utilities.min.css" },
    

    // DataTables default style
    { rel: "stylesheet", href: "https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css" }
  ],

  script: [
    { src: "https://code.jquery.com/jquery-3.7.1.min.js", defer: true },
    // Only DataTables JS (no Bootstrap JS needed)
    { src: "https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js", defer: true }
  ]
})

onMounted(() => {
  const interval = setInterval(() => {
    if (window.$ && window.jQuery) {
      clearInterval(interval)
      window.$("#compatibilityTable").DataTable()
    }
  }, 50)
})
</script>

<style lang="postcss" scoped>
.light-gray {
  background-color: var(--light-gray);
}

.cpuTab {
  display: block;
  padding: 50px;
}

/* Only target links inside the table */
.compatibility-container a {
  text-decoration: none;
  color: inherit;
}
</style>
