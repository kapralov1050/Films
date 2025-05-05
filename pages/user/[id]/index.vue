<script setup lang="ts">
const authStore = useAuthStore()
const ratingStore = useRatingStore()
const watchlistStore = useWatchlistStore()

definePageMeta({
  middleware: 'auth'
})

onMounted(async () => {
  await authStore.fetchUserData()
  if(authStore.userData) {
    ratingStore.ratedMovies = await ratingStore.getRatedMovies(authStore.userData.id)
    await watchlistStore.getWatchList()
    navigateTo(`/user/${authStore.userData.username}/rated`)
    }
})  
</script>
