export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    useHead({
        title: computed(() => `Personal: ${authStore.userData?.username} - ${to.meta.title}`) 
      })
    if (!authStore.sessionId && !authStore.userData) {
        return navigateTo('/')
    }
})