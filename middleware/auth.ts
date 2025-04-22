export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    if (!authStore.sessionId) {
        return navigateTo('/')
    }
})