export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.query.approved) {
    try {
      const { handleCallback } = useAuth()
      await handleCallback()
      const returnPath = localStorage.getItem('return_path') || '/'
      localStorage.removeItem('return_path')
      return navigateTo(decodeURIComponent(returnPath), { replace: true })
    } catch (error) {
      console.log('Auth callback error:', error)
    }
  }
})