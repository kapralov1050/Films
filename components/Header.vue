<template>
  <header class="header">
    <el-button @click="toggleMenu" class="header__menu-button">
      <el-icon><Menu /></el-icon>
    </el-button>
    <el-drawer v-model="isMenuVisible" direction="ltr" size="250px" class="header__drawer">
      <el-menu class="header__nav-menu">
        <el-menu-item v-for="item in MovieListsSelection" :key="item.value" :index="item.index" @click="handleSelect(item.value)" class="header__nav-item">{{ item.label }}</el-menu-item>
      </el-menu>
    </el-drawer>
    <NuxtLink to="/" class="header__logo-link">
      <img src="@/assets/images/logo.png" height="80px" class="header__logo">
    </NuxtLink>
    <div class="header__search">
      <el-input class="header__search-input" v-model="searchInput" placeholder="Search IMDb" required>
        <template #prepend>
          <el-select
            class="header__search-select"
            v-model="selectedGenre"
            placeholder="Select"
            size="large"
            style="width: 120px;"
          >
            <el-option
              v-for="item in genres"
              :key="item.value"
              :label="item.value"
              :value="item"
              class="header__search-option"
            >
            </el-option>
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="handleSearch" class="header__search-button" />
        </template>
      </el-input>
    </div>
    <WatchListButton v-show="isAuth" @open-watchlist="openWatchlist"/>
    <WatchListDialog />
    <div v-show="isAuth" class="header__user">
      {{ username.toUpperCase() }}
    </div>
    <el-divider class="header__divider" direction="vertical" />
    <el-button @click="handleLogOut" link class="header__auth-button">
      <NuxtLink v-if="!isAuth" to="/login" class="header__auth-link">Sign In</NuxtLink>
      <NuxtLink v-else class="header__auth-link">Log Out</NuxtLink>
    </el-button>
  </header>
  </template>


<script setup>
import { useLocalStorage } from '@vueuse/core'
import { Menu, Search} from '@element-plus/icons-vue'

const isAuth = useLocalStorage('isAuth', false)
const username = useLocalStorage('username', 'default')
const isMenuVisible = ref(false)
const selectedGenre = ref('')
const searchInput = ref(null)
const emit = defineEmits(['select-movielist'])

const genresStore = UseGenresStore()
const { genres } = storeToRefs(genresStore)
const userstore = UseUserStore()
const { isWatchListVisible } = storeToRefs(userstore)

const router = useRouter()

function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value
}

function handleSelect(list) {
  emit('select-movielist', list)
  toggleMenu()
}

async function handleSearch() {
  try {
    if(selectedGenre.value && searchInput.value){
    const searchResults = await searchMovies(selectedGenre.value)
    const searchByGenre = searchResults.results.filter(item =>
      item.primaryTitle?.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      item.originalTitle?.toLowerCase().includes(searchInput.value.toLowerCase())
    )
    console.log(searchByGenre)
  }
  } catch(error) {
    console.log(error)
  }
}

function openWatchlist() {
  isWatchListVisible.value = true;
}

function handleLogOut() {
  router.push('/login')
  setTimeout(() => isAuth.value = false, 1000)
}

onMounted(async () => {
  await genresStore.getGenres()
})
</script>


<style lang="scss" scoped>
$font-stack: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.header {
  height: inherit;
  padding: 0 25px;
  background-color: $login-background;
  @include flex(row, center, center, 0);

  &__menu-button {
    margin: 5px;
  }
  
  &__search {
    flex: 1;
    display: flex;
    justify-content: center;

    &-input {
      width: 50rem;
      font-size: large;
    }

    &-select {
      // стили для селекта, если нужны
    }

    &-button {
      // стили для кнопки поиска, если нужны
    }
  }

  &__divider {
    border-left: 1px solid gray;
    color: white;
    width: 1px;
    height: 2rem;
    margin: 0 1rem;
  }

  &__auth-button {
    padding-left: 1.5rem;
    
    &-link {
      text-decoration: none;
      color: white;
      font-weight: bold;
    }
  }

  &__user {
    color: white;
    font-size: 1.5rem;
    padding: 0 1.5rem;
    text-align: center;
  }


  &__logo {
    &-link {
      // стили для ссылки логотипа, если нужны
    }
  }

  &__drawer {
    // стили для выезжающего меню, если нужны
  }

  &__nav {
    &-menu {
      // стили для меню навигации
    }

    &-item {
      // стили для пунктов меню
    }
  }
}
</style>