<template>
  <div class="rated-movies-container">
    <h1 class="title">Rated Movies</h1>
    <div 
      class="movies-list-empty" 
      v-if="!ratingStore.ratedMovies.length"
    >
      <el-icon size="40" color="gold">
        <List />
      </el-icon>
      There are no rated movies.
      <NuxtLink 
        to="/homepage" 
        style="color: black"
      >
        Back to Home
      </NuxtLink>
    </div>
    <ul 
      class="movies-list" 
      v-loading="isLoading"
      element-loading-text="Loading..."
    >
      <li 
        class="movies-list__movie-card-container"
        v-for="movie in ratingStore.ratedMovies"
        :key="movie.id"
      >
        <MovieCard :movie="movie" />
      </li>
    </ul>
  </div>
</template>


<script setup>
import { List } from '@element-plus/icons-vue'

definePageMeta({
  layout: 'userpage',
  middleware: 'auth'
})

const ratingStore = useRatingStore()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    ratingStore.ratedMovies = await ratingStore.getRatedMovies()
    console.log(ratingStore.ratedMovies)
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
  margin-bottom: 2rem;
  font-size: 3rem;

  &::before {
    content: "";
    margin-right: 1rem;
    height: 4rem;
    border:  solid gold;
    border-radius: 1rem; 
  }
}

.movies-list-empty {
  margin-top: 3rem;
  align-self: center;
  @include flex(column, center, center, 1rem);
}

.movies-list {
  @include flex(column, flex-start, center, 2rem);
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
    box-shadow: 0 2px 5px rgb(209, 209, 209);
  }
}

.pagination {
  align-self: center;
  margin: 2rem;
}
</style>