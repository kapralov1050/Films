<template>
  <div>
    <el-container>
      <el-header>
        <Header @select-movielist="HandleMovieList"/>
      </el-header>
      <el-main class="main">
        <div class="title-group">
          <!-- <div class="title-group__subtitle-block">
            <h3 class="title-group__subtitle">IMDb Charts</h3>
            <span class="title-group__share-button">
              Share <el-icon><Share /></el-icon>
            </span>
          </div>
          <div class="title-group__title-block">
            <h1 class="title-group__title">IMDb Top 250 Movies</h1>
            <span class="title-group__title-description">As rated by regular IMDb voters.</span>
          </div> -->
        </div>
        <ul class="movies-list">
          <li class="movies-list__movie-card-container" v-for="(movie, idx) in moviesStore.topMovies" :key="movie.id">
              <MovieCard
              :movie="movie"
              :index="idx"
              @addToWatchList = "addToUserWatchList(idx)"
            />
          </li>
        </ul>
      </el-main>
      <el-footer height="80px">Footer</el-footer>
    </el-container>
  </div>
</template>


<script setup>
import MovieCard from '@/components/MovieCard.vue';

const moviesStore = UseMoviesStore()
const watchlist = UseWatchListStore()
const {userWatchList} = storeToRefs(watchlist)
const selectedMovieList = ref('top250-movies')

function HandleMovieList(list) {
  selectedMovieList.value = list
}

function addToUserWatchList(index) {
  const movieToPush = moviesStore.topMovies[index]
  if(!userWatchList.value.some(movie => movie.id === movieToPush.id)) {
    userWatchList.value.push(movieToPush);
  } 
}

watch(selectedMovieList, async(newValue) => {
  moviesStore.topMovies = await moviesStore.getTopMovies(newValue)
})

onMounted(async () => {
  moviesStore.topMovies = await moviesStore.getTopMovies(selectedMovieList.value)
})
</script>


<style scoped lang="scss">
.el-container {
  background-color: black;
}

.imdb-logo-link {
  margin: 5px;
}
.el-header{
  padding: 0;
  height: 5rem;
}
.main {
  background-color: rgb(255, 255, 255);
  width: 60%;
  height: auto;
  @include flex(column, flex-start, center, 0);
  align-self: center;
}

.title-group {
  @include flex(column, flex-end, center, 0);
  width: 100%;
  
  &__subtitle-block {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: inherit;
  }

  &__subtitle {
    display: block;
  }

  &__share-button {
    display: block;
  }

  &__title-block {
    width: inherit;
  }
}

.movies-list {
  width: 800px;
  border: 1px solid rgb(199, 199, 199);
  border-radius: 5px;
  padding: 2rem;
  @include flex(column, flex-start, center, 0);
  
  &__movie-card-container {
    width: 100%;
    height: fit-content;
    padding: 1rem;
    border-bottom: 1px solid rgb(199, 199, 199);
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>