<script setup lang="ts">
const authStore = useAuthStore()
const ratingStore = useRatingStore()

definePageMeta({
  middleware: 'auth'
})

onMounted(async () => {
  await authStore.fetchUserData()
  if(authStore.userData) {
    ratingStore.ratedMovies = await ratingStore.getRatedMovies(authStore.userData.id)
    await authStore.getWatchList()
    console.log(ratingStore.ratedMovies)
    navigateTo(`/user/${authStore.userData.username}/rated`)
    }
})  
</script>
