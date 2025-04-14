<template>
  <div class="header">
    <NuxtLink to="/">
      <img 
        src="@/assets/images/logo.png" 
        height="80px" 
        class="header__logo"
      >
    </NuxtLink>
    <el-input 
      class="header__search" 
      v-model="searchMovieStore.searchValue" 
      placeholder="Search" 
      required
    >
      <template #append>
        <el-button :icon="Search" @click="handleSearch" />
      </template>
    </el-input>
    <section class="header__user-block">
      <el-button type="info" @click="openWatchList" text>
        WatchList
      </el-button>
      <el-button @click="loginWithTmdb" text>
        <ElIcon :size="20">
          <User />
        </ElIcon>
      </el-button>
    </section>
  </div>
</template>


<script setup>
import { User, Search } from '@element-plus/icons-vue'

const router = useRouter()
const searchMovieStore = useSearchMovieStore()
const { loginWithTmdb } = useAuth()

const openWatchList = () => {
  router.push('/watchlist')
}

async function handleSearch() {
  const searchMoviesListData = await searchMovieStore.searchMovie(searchMovieStore.searchValue)
  searchMovieStore.searchedMovies = searchMoviesListData
  router.push('/search')
  searchMovieStore.isLoading = true
}
</script>


<style lang="scss" scoped>
$font-stack: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.header {
  height: inherit;
  padding: 0 25px;
  @include flex(row, space-between, center, 0);
  border-bottom: 1px solid #dcdfe6;

  &__search {
    width: 74rem;
  }

  &__user-block {
    @include flex(row, space-between, center, 1rem);
    cursor: pointer;
    width: fit-content;
  }
}
</style>