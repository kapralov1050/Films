<template>
  <div class="watchlist-page">
    <h1 class="title">WatchList</h1>
    <div 
      v-if="!authStore.watchListMovies.length" 
      class="movies-list-empty"
    >
      <el-icon 
        size="40" 
        color="gold"
      >
        <List />
      </el-icon>
      <p>There are no movies in your watchlist.</p>
      <NuxtLink 
        to="/homepage" 
        class="home-link"
      >
        Back to Home
      </NuxtLink>
    </div>
    <ul 
      v-else
      class="movies-list" 
      v-loading="isLoading"
      element-loading-text="Loading..."
    >
      <li 
        v-for="movie in authStore.watchListMovies"
        :key="movie.id"
        class="movies-list__item"
      >
        <MovieCard 
          :movie="movie"
          @remove="handleRemoveFromWatchlist(movie.id)"
        />
      </li>
    </ul>
  </div>
</template>


<script setup>
import { List } from '@element-plus/icons-vue'

definePageMeta({
  layout: "userpage",
  middleware: 'auth'
})

const authStore = useAuthStore()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    authStore.getWatchList()
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
  height: fit-content;
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
</style>