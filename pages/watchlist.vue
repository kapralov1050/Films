<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main class="main">
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
      <Pagination 
      />
    </el-main>
  </el-container>
</template>


<script setup>
const authStore = useAuthStore()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    authStore.setWatchList()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>


<style scoped lang='scss'>
.el-header {
  padding: 0;
  height: 4rem;
}

.main {
  padding: 2rem;
  width: 60%;
  height: auto;
  @include flex(column, center, flex-start, 0);
  align-self: center;
}

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
  @include flex(column, center, center, 0);
  align-self: center;
  min-height: 60vh;
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