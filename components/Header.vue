<template>
  <el-header class="header">
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
            <el-dropdown-item 
              v-for="(item, index) in menuItems" 
              :key="index"  
              @click="selectList(item)"
            >
              {{ formatTitle(item) }}
            </el-dropdown-item>
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
        <el-button 
          :icon="Search" 
          @click="deboucedHandleSearch" 
          :disabled="isLoading" 
          :loading="isLoading" 
        />
      </template>
    </el-input>
    <section class="header__user-block">
      <el-dropdown>
        <span 
          @click="handleLogin" 
          style="outline: none; border: none;"
        >
          {{ authStore.sessionId ? 'User' : 'login' }}
        </span>
        <template #dropdown v-if="authStore.sessionId">
          <el-dropdown-menu>
            <el-dropdown-item 
              @click="navigateTo(
                `/user/${authStore.userData?.username}`
                )"
            >
              Profile
            </el-dropdown-item>
            <el-dropdown-item @click="handleLogout">
              Logout
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
  </el-header>
</template>


<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { debounce } from '~/helpers/debounce'
import { formatTitle } from '~/helpers/formatTitle'

const searchMovieStore = useSearchMovieStore()
const watchlistStore = useWatchlistStore()
const moviesStore = useMoviesStore()
const authStore = useAuthStore()
const ratingStore = useRatingStore()
const { loginWithTmdb } = useAuth()
const route = useRoute()

const isLoading = ref(false)

const menuItems = [
  'popular',
  'now_playing',
  'top_rated',
  'upcoming'
]

function handleLogin() {
  if (!authStore.sessionId) {
    loginWithTmdb()
  }
}

const handleLogout = () => {
  authStore.sessionId = null
  authStore.userData = null
  watchlistStore.watchListMovies = null
  ratingStore.ratings = []
  ratingStore.ratedMovies = []
  const sessionCookie = authStore.getSessionCookie()
  sessionCookie.value = null
  ElMessage.success('You have been logged out')
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

const selectList = (listName: string) => {
  moviesStore.selectedList = listName
  const currentRoute = route.path
  if (currentRoute !== "/homepage") {
    navigateTo('/')
  }
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