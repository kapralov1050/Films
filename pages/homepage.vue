<template>
  <h1 class="movies-page__title">
    {{ moviesStore.selectedListTitle }}
  </h1>
  <article class="movies-page">
    <Filters 
      class="movies-page__filters" 
      @reset="moviesStore.resetForm" 
      @sort="moviesStore.handleSortChange()"
    />
    <section class="movies-page__content">
      <ul 
        class="movies-page__list" 
        v-loading="isLoading" 
        element-loading-text="Loading..."
      >
        <li 
          class="movies-page__item" 
          v-for="movie in moviesStore.selectedMoviesList.results" 
          :key="movie.id"
        >
          <MovieCard :movie="movie" />
        </li>
      </ul>
    </section>
  </article>
  <Pagination
    @update:page="handlePageChange" 
    :page="moviesStore.currentPage" 
    :totalResults="moviesStore.selectedMoviesList.total_results" 
    class="movies-page__pagination"
  />
</template>


<script setup>
const moviesStore = useMoviesStore()
const authStore = useAuthStore()
const ratingStore = useRatingStore()
const watchlistStore = useWatchlistStore()

const isLoading = ref(false)

const handlePageChange = async (newPage) => {
  moviesStore.currentPage = newPage;
};

const fetchData = async() => {
  isLoading.value = true
  try {
    moviesStore.selectedMoviesList = await moviesStore.getPopularMovieList()
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch(error) {
  console.error('Error:', error)
  } finally {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    isLoading.value = false
  }
}

watch(() => [moviesStore.currentPage, moviesStore.selectedList], fetchData);

onMounted(async () => {
  try{
    moviesStore.genres = await moviesStore.fetchGenres()
    moviesStore.languages = await moviesStore.fetchLanguages()
    await fetchData()
    if(authStore.sessionId) {
      await Promise.all ([
        authStore.fetchUserData(),
        ratingStore.getRatedMovies(authStore.userData.id),
        watchlistStore.getWatchList()
      ])
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch(error) {
    console.error('Error:', error)
  } 
})

onBeforeUnmount(() => {
  moviesStore.resetForm
})
</script>


<style scoped lang="scss">
.movies-page {
  @include flex(row, space-between, flex-start, 2rem);
  padding: 2rem;

  &__title {
    padding: 2rem;
    font-size: 3rem;

    &::before {
      content: "";
      margin-right: 1rem;
      height: 4rem;
      border: solid gold;
      border-radius: 1rem; 
    }
  }

  &__filters {
    flex: 1;
  }

  &__content {
    flex: 5;
  }

  &__list {
    @include flex(column, center, center, 1.5rem);
    align-self: center;
    min-height: 60vh;
    width: 95%;
  }

  &__item {
    width: inherit;
    height: fit-content;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 2px 5px rgb(209, 209, 209);
  }

  &__pagination {
    align-self: center;
    margin: 2rem;
  }
}
</style>