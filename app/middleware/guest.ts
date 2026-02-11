export default defineNuxtRouteMiddleware(() => {
  const isAuth = import.meta.client
    ? localStorage.getItem('admin_auth')
    : null

  if (isAuth) {
    return navigateTo('/admin')
  }
})
