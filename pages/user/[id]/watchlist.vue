<template>
  <h1 class="title">WatchList</h1>
  <ul 
    class="movies-list" 
    v-loading="isLoading" 
    element-loading-text="Loading..."
  >
    <li 
      class="movies-list__movie-card-container" 
      v-for="movie in authStore.watchListMovies" 
      :key="movie.id"
    >
      <MovieCard :movie="movie"/>
    </li>
  </ul>
</template>



<script setup>
definePageMeta({
    layout: "userpage"
})

const authStore = useAuthStore()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    authStore.setWatchList()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>




<style scoped lang="scss">
.title {
  padding-left: 1rem;
  margin-bottom: 1rem;
  font-size: 3rem;
}

.title::before {
  content: "";
  margin-right: 1rem;
  height: 4rem;
  border:  solid gold;
  border-radius: 1rem; 
}

.movies-list {
  @include flex(column, flex-start, center, 0);
  height: fit-content;
  width: 95%;
  
  &__movie-card-container {
    width: inherit;
    height: fit-content;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}

.pagination {
  align-self: center;
  margin: 2rem;
}
</style>