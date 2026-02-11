export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return

  const isAuth = localStorage.getItem('admin_auth')
  if (!isAuth) {
    return navigateTo('/admin/login')
  }
})
