<template>
<div>
    <h1>{{ id }}</h1>
    {{ movieDetailsStore.selectedMovie }}
</div>
</template>



<script setup>
const route = useRoute()
const id = route.params.id

const movieDetailsStore = UseMovieDetailsStore()



onMounted(async () => {
  movieDetailsStore.selectedMovie = await movieDetailsStore.getMovieDetails(id)
})
</script>




<style scoped>

</style>