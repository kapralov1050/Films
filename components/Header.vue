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
      v-model="searchValue" 
      placeholder="Search" 
      required
    >
      <template #append>
        <el-button :icon="Search" @click="searchMovies" />
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

const moviesStore = useMoviesStore()
const searchValue = ref('')
const router = useRouter()

async function searchMovies() {
  const searchMoviesListData = await moviesStore.searchMovie(searchValue.value)
  moviesStore.searchedMovies = searchMoviesListData
  console.log(moviesStore.searchedMovies)
  router.push('/search')
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