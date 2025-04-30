<template>
  <el-container>
    <el-header>
    <Header />
    </el-header>
    <el-main>
      <section class="info-header">
        <div class="user-title">
          <div class="user-title__logo">
            {{ username[0] }}
          </div>
          <h1 class="user-title__name"> {{ username }} </h1>
        </div>
        <div class="user-stats">
          <h2>Stats:</h2>
          <ul class="user-stats__list">
            <li>
              <h3>Total Ratings</h3>
              <p> {{ ratingStore.ratedMovies?.length }} </p>
            </li>
            <li>
              <h3>Movies in WatchList</h3>
              <p> {{ authStore.watchListMovies?.length }} </p>
            </li>
            <li>
              <h3>Most Watched Genres</h3>
              <p v-for="genre in mostWatchedGenres" :key="genre.id"> {{ genre }} </p>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <el-menu class="menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" class="menu__option"> Rated Films </el-menu-item>
        <el-menu-item index="2" class="menu__option"> WatchList </el-menu-item>
        <el-menu-item index="3" class="menu__option"> Lists </el-menu-item>
        </el-menu>
      </section>
      <section class="page-content">
        <slot />
      </section>
    </el-main>
  </el-container>
</template>


<script setup>
const authStore = useAuthStore()
const ratingStore = useRatingStore()
const username = authStore.userData.username;

function handleSelect(key) {
  switch(key) {
    case "1":
    navigateTo(`/user/${username}/rated`)
    break
    case "2":
    navigateTo(`/user/${username}/watchlist`)
    break
    case "3":
    navigateTo(`/user/${username}/lists`)
  }
}

const mostWatchedGenres = computed(() => {
  const moviesGenres = ratingStore.ratedMovies.map(movie => movie.genre_ids)
  const genreCounts = moviesGenres.flat().reduce((acc, genreId) => {
    if(acc[genreId]) {
      acc[genreId]++
    } else {
      acc[genreId] = 1
    }
    return acc
  }, {})
  const sortedGenres = Object.entries(genreCounts).sort((a,b) => b[1] - a[1]).slice(0,3)
  const genresFromStorage = JSON.parse(localStorage.getItem('tmdb_genres'))
  const topGenres = sortedGenres.map(([genreId, count]) => {
    const genre = genresFromStorage.find((g) => g.id === Number(genreId))
    return genre.name
  })
  return topGenres
})
</script>


<style scoped lang="scss">
.el-main, .el-header, .el-container {
  padding: 0;
  margin: 0;
}

.el-main {
  @include flex(column, center, center, 0);
}

.info-header {
  @include flex(row, flex-start, center, 1rem);
  width: 100%;
  height: 15vh;
  box-sizing: border-box;
  padding-left: 4rem;
}

.user-title {
  display: flex;
  flex: 1;

  &__logo {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    @include flex(row, center, center,0);
    background-color: rgb(102.2, 177.4, 255);
    color: white;
    font-size: 3rem;
    text-align: center;
  }

  &__name {
    color: rgb(50.8, 116.6, 184.5);
    font-size: 4rem;
    margin-left: 2rem;
  }
}

.user-stats {
  @include flex(column, flex-start, space-around);
  padding: 2rem;
  flex: 3;

  &__list {
    @include flex(row, space-between, center, 0)
  }
}


.menu {
  @include flex(row, center, center, 3rem);
  width: 100vw;
  background-color: rgb(245, 245, 245);
  &__option {
    font-size: 1.5rem;
    font-weight: 500;
  }
}

.page-content {
  padding: 2rem 0 ;
  width: 60vw;

}

</style>