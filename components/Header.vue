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
    <ElIcon 
      class="header__user-block"
      :size="20" 
    >
      <User />
    </ElIcon>
  </div>
</template>

<script setup>
import { User, Search } from '@element-plus/icons-vue'

const searchMovieStore = useSearchMovieStore()
const router = useRouter()

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
    cursor: pointer;
  }
}
</style>