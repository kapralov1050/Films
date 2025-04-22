<template>
  <div>
  </div>
</template>


<script setup>
const router = useRouter()
const moviesStore = useMoviesStore()

onMounted( async() => { 
  try {
    moviesStore.genres = moviesStore.fetchGenres()
    router.push('/popular')
  } catch (error) {
    console.log('loading genres error:',error)
    return []
  }

  })
</script>

