<template>
  <h1 class="title">
    Popular Movies 
  </h1>
  <article class="main">
    <Filters class="filters"/>
    <section class="content-wrapper">
      <ul 
        class="movies-list" 
        v-loading="isLoading" 
        element-loading-text="Loading..."
      >
        <li 
          class="movies-list__movie-card-container" 
          v-for="movie in moviesStore.selectedMoviesList.results" 
          :key="movie.id"
        >
          <MovieCard :movie="movie"/>
        </li>
      </ul>
    </section>
  </article>
  <Pagination
    @update:page="handlePageChange" 
    :page="moviesStore.currentPage " 
    :totalresults="moviesStore.selectedMoviesList.total_results" class="pagination"
  />
</template>


<script setup>
const moviesStore = useMoviesStore()
const isLoading = ref(false)

const handlePageChange = async (newPage) => {
  moviesStore.currentPage = newPage;
};

const fetchData = async() => {
  try {
    moviesStore.selectedMoviesList = await moviesStore.getPopularMovieList()
  } catch(error) {
  console.error('Error:', error)
  } finally {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(() => moviesStore.currentPage, fetchData);

onMounted(async () => {
  isLoading.value = true
  moviesStore.resetForm
  try{
    moviesStore.genres = await moviesStore.fetchGenres()
    moviesStore.languages = await moviesStore.fetchLanguages()
    await new Promise(resolve => setTimeout(resolve, 1000))
    fetchData()
  } catch(error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
  })
</script>


<style scoped lang="scss">
.main {
  @include flex(row, space-between, flex-start, 2rem)
}

.filters {
  flex: 1;
}

.content-wrapper {
  flex: 5;
}

.title {
  padding-left: 1rem;
  margin-bottom: 2rem;
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
  @include flex(column, center, center, 1.5rem);
  align-self: center;
  min-height: 80vh;
  width: 95%;
  
  &__movie-card-container {
    width: inherit;
    height: fit-content;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 2px 5px rgb(209, 209, 209);
  }
}

.pagination {
  align-self: center;
  margin: 2rem;
}
</style>