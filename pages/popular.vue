<template>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main class="main">
        <div class="title-group">
            <div class="title-divider"></div>
            <h1 class="title">Popular Movies</h1>
        </div>
        <ul class="movies-list">
          <li class="movies-list__movie-card-container" v-for="(movie, idx) in moviesStore.selectedMoviesList.results" :key="movie.id">
              <MovieCard
              :movie="movie"
              :index="idx"
            />
          </li>
        </ul>
        <Pagination class="pagination"/>
      </el-main>
    </el-container>
</template>


<script setup>
const moviesStore = useMoviesStore()

watch(() => moviesStore.currentPage, async (newpage) => {
    try {
    moviesStore.selectedMoviesList = await moviesStore.getMoviesList()
    } catch(error) {
    console.error('Error:', error)
    }
})

onMounted(async () => {
  try{
    moviesStore.selectedMoviesList = await moviesStore.getMoviesList()
  } catch(error) {
    console.error('Error:', error)
  }
})
</script>


<style scoped lang="scss">
.el-header{
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

.title-group {
  @include flex(row, flex-start, center, 0);
  width: 100%;
  height: inherit;
  margin-bottom: 1rem;
  margin-left: 10rem;
}

.title {
  padding-left: 1rem;
  font-size: 3rem;
}

.title-divider {
  height: 4rem;
  border:  solid gold;
  border-radius: 1rem; 
}


.movies-list {
  @include flex(column, center, center, 0);
  align-self: center;
  width: 70%;
  
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