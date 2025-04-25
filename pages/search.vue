<template>
  <el-container>
    <el-header>
    <Header />
    </el-header>
    <el-main class="main">
    <h1 class="title">Search Results</h1>
    <ul class="movies-list" v-loading="searchStore.isLoading">
      <li 
        v-for="(movie, idx) in searchStore.searchedMovies.results" 
        :key="movie.id"
        class="movies-list__movie-card-container"
      >
      <MovieCard :movie="movie" />
      </li>
    </ul>
    <Pagination 
      @update:page="handlePageChange" 
      :page="searchStore.currentPage" 
      :totalresults="searchStore.searchedMovies.total_results / 2" class="pagination"
    />
    </el-main>
  </el-container>
</template>


<script setup>
const searchStore = useSearchMovieStore()

const handlePageChange = async (newPage) => {
  searchStore.currentPage = newPage;
}

const fetchData = async() => {
  try {
    searchStore.searchedMovies = await searchStore.searchMovie(searchStore.searchValue)
    console.log(searchStore.searchedMovies)
  } catch(error) {
  console.error('Error:', error)
  } finally {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(() => searchStore.currentPage, fetchData);

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve,1000))
    searchStore.isLoading = false
})
</script>


<style scoped lang="scss">
.el-header {
  padding: 0;
  height: 4rem;
}

.main {
  padding: 2rem;
  width: 70%;
  height: auto;
  @include flex(column, center, flex-start, 0);
  align-self: center;
}

.title {
  padding-left: 1rem;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.title::before {
  content: "";
  margin-right: 1rem;
  height: 4rem;
  border: solid gold;
  border-radius: 1rem;
}

.movies-list {
  @include flex(column, center, center, 0);
  align-self: center;
  width: 70%;
  min-height: 60vh;

  &__movie-card-container {
    width: 100%;
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