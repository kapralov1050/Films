<template>
  <div>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main class="main">
        <div class="title-group">
          <div class="title-group__subtitle-block">
            <h3 class="title-group__subtitle">IMDb Charts</h3>
          </div>
          <div class="title-group__title-block">
            <div class="title-group__title-divider" direction="vertical"></div>
            <h1 class="title-group__title">IMDb Top 250 Movies</h1>
          </div>
        </div>
        <ul class="movies-list">
          <li class="movies-list__movie-card-container" v-for="(movie, idx) in moviesStore.selectedMoviesList.results" :key="movie.id">
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

onMounted(async () => {
  try{
    moviesStore.selectedMoviesList = await moviesStore.getMoviesList()
  } catch(error) {
    console.error('Error:', error)
  }
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
  padding: 2rem;
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
    font-size: 2rem;
    font-weight: bold;
  }

  &__share-button {
    display: block;
  }

  &__title-block {
    width: inherit;
    display: flex;
  }

  &__title {
    padding-left: 1rem;
    font-size: 3rem;
  }

  &__title-divider {
    height: inherit;
    border: 0.2rem solid gold;
    border-radius: 1rem;
    
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