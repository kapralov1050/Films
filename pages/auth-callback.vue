<template>
  <div>
    Authorization...
  </div>
</template>



<script setup>
const { handleCallback } = useAuth()

onMounted(async () => {
  try {
    await handleCallback()
    const returnPath = localStorage.getItem('return_path') || '/'
    localStorage.removeItem('return_path')
    await navigateTo(decodeURIComponent(returnPath))
  } catch (error) {
    console.log('Auth callback error:', error)
  }
})
</script>




<style scoped>

</style>