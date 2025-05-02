<template>
  <div class="header">
    <NuxtLink to="/">
      <el-dropdown>
        <img 
          src="@/assets/images/logo.png" 
          height="80px" 
          class="header__logo"
          style="outline: none; border: none;"
        >
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleListSelect('popular')"> Popular </el-dropdown-item>
            <el-dropdown-item @click="handleListSelect('now_playing')"> Now Playing </el-dropdown-item>
            <el-dropdown-item @click="handleListSelect('top_rated')"> Top Rated </el-dropdown-item>
            <el-dropdown-item @click="handleListSelect('upcoming')"> Upcoming </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </NuxtLink>
    <el-input 
      class="header__search" 
      v-model="searchMovieStore.searchValue" 
      @keyup.enter="deboucedHandleSearch"
      placeholder="Search for a movie..." 
      required
      clearable
    >
      <template #append>
        <el-button :icon="Search" @click="deboucedHandleSearch" :disabled="isLoading" :loading="isLoading" />
      </template>
    </el-input>
    <section class="header__user-block">
      <el-dropdown>
        <span @click="handleAuthClick" style="outline: none; border: none;">
          {{ authStore.sessionId ? 'User' : 'login' }}
        </span>
        <template #dropdown v-if="authStore.sessionId">
          <el-dropdown-menu>
            <el-dropdown-item @click="navigateTo(`/user/${authStore.userData.username}`)"> Profile </el-dropdown-item>
            <el-dropdown-item @click="handleLogout"> Logout </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
  </div>
</template>


<script setup>
import { Search } from '@element-plus/icons-vue'
import { debounce } from '~/helpers/debounce'

const searchMovieStore = useSearchMovieStore()
const moviesStore = useMoviesStore()
const authStore = useAuthStore()
const ratingStore = useRatingStore()
const { loginWithTmdb } = useAuth()
const isLoading = ref(false)

function handleAuthClick() {
  if(!authStore.sessionId) {
    loginWithTmdb()
  }
}

const handleLogout = () => {
  authStore.logout()
  ratingStore.logout()
  navigateTo('/')
}

async function handleSearch() {
  if (searchMovieStore.searchValue) {
    isLoading.value = true
    const searchMoviesListData = await searchMovieStore.searchMovie(searchMovieStore.searchValue)
    searchMovieStore.searchedMovies = searchMoviesListData
    navigateTo('/search')
    isLoading.value = false
  } else {
    ElMessage('Search field is empty')
  }
}

const handleListSelect = (listName) => {
  moviesStore.selectedList = listName
}

const deboucedHandleSearch = debounce(handleSearch, 300)
</script>


<style lang="scss" scoped>
$font-stack: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.header {
  height: inherit;
  padding: 0 2rem;
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

.el-dropdown .header__logo:hover {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
</style>