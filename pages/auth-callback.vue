<template>
  <div>
    Authorization...
  </div>
</template>



<script setup>
const { handleCallback } = useAuth()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    await handleCallback()
    const returnPath = localStorage.getItem('return_path') || '/'
    localStorage.removeItem('return_path')
    await router.push(decodeURIComponent(returnPath))
  } catch (error) {
    console.log('Auth callback error:', error)
  }
})
</script>




<style scoped>

</style>