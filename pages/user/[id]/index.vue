<template>

</template>
  
  
<script setup>
definePageMeta({
    layout: 'userpage',
    middleware: 'auth'
})

const authStore = useAuthStore()
const ratingStore = useRatingStore()

onMounted(async () => {
  await authStore.fetchUserData()
  ratingStore.ratedMovies =  await ratingStore.getRatedMovies()
  await authStore.getWatchList()
})  
</script>
  
  
<style scoped lang="scss">

</style>