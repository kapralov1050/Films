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
      <el-dropdown>
        <span @click="handleAuthClick" text >
          {{ authStore.sessionId ? 'User' : 'login' }}
        </span>
        <template #dropdown v-if="authStore.sessionId">
          <el-dropdown-menu>
            <el-dropdown-item :icon="Plus" @click="navigateTo(`/user/${authStore.userData.username}`)"> Profile </el-dropdown-item>
            <el-dropdown-item :icon="Plus" @click="handleLogout"> Logout </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
  </div>
</template>


<script setup>
import { Search } from '@element-plus/icons-vue'

const searchMovieStore = useSearchMovieStore()
const authStore = useAuthStore()
const ratingStore = useRatingStore()
const { loginWithTmdb } = useAuth()

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
  const searchMoviesListData = await searchMovieStore.searchMovie(searchMovieStore.searchValue)
  searchMovieStore.searchedMovies = searchMoviesListData
  navigateTo('/search')
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