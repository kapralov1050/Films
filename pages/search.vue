<template>
  <article class="search-page">
    <h1 class="search-page__title">Search Results</h1>
    <div 
      v-if="!searchStore.searchedMovies?.results.length"
      class="search-page__empty"
    >
      <el-icon 
        size="40" 
        color="gold"
      >
        <List />
      </el-icon>
      <p>There are no movies that matched your query.</p>
      <NuxtLink 
        to="/homepage" 
        class="search-page__link"
      >
        Back to Home
      </NuxtLink>
    </div>
    <template v-else>
      <ul 
        class="search-page__list"
        v-loading="isLoading"
      >
        <li 
          v-for="movie in searchStore.searchedMovies.results"
          :key="movie.id"
          class="search-page__item"
        >
          <MovieCard :movie="movie" />
        </li>
      </ul>
      <Pagination
        v-if="searchStore.searchedMovies"
        :page="searchStore.currentPage"
        :totalResults="searchStore.searchedMovies.total_pages"
        @update:page="handlePageChange"
        class="pagination"
      />
    </template>
  </article>
</template>


<script setup lang="ts">
import { List } from '@element-plus/icons-vue';

useHead({
  title: 'Search Results'
})

const searchStore = useSearchMovieStore()
const moviesStore = useMoviesStore()

const isLoading = ref(false)

const handlePageChange = async (newPage: number) => {
  searchStore.currentPage = newPage;
}

const fetchData = async() => {
  isLoading.value = true
  try {
    searchStore.searchedMovies = await searchStore.searchMovie(searchStore.searchValue)
  } catch(error) {
  console.error('Error:', error)
  } finally {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    isLoading.value = false
  }
}

watch(() => searchStore.currentPage, fetchData);

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve,1000))
  moviesStore.currentPage = 1
})
</script>


<style scoped lang="scss">
.search-page {
  padding: 2rem;
  width: 70%;
  height: auto;
  @include flex(column, center, flex-start, 0);
  align-self: center;

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

  &__empty {
    align-self: center;
    @include flex(column, center, center, 1rem);
  }

  &__list {
    @include flex(column, center, center, 1.5rem);
    align-self: center;
    min-height: 80vh;
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
}
</style>