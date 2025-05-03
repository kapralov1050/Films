<template>

</template>
  
  
<script setup>
definePageMeta({
    layout: 'userpage',
    middleware: 'auth'
})

const authStore = useAuthStore()
const ratingStore = useRatingStore()
const username = authStore.userData.username;

onMounted(async () => {
  await authStore.fetchUserData()
  ratingStore.ratedMovies =  await ratingStore.getRatedMovies()
  await authStore.getWatchList()
  navigateTo(`/user/${username}/rated`)
})  
</script>
