<template>
<header class="header">
  <el-button @click="toggleMenu" class="header__side-menu-button">
    <el-icon><Menu /></el-icon>
  </el-button>
  <el-drawer v-model="isMenuVisible" direction="ltr" size="250px">
    <el-menu>
      <el-menu-item v-for="item in MovieListsSelection" :key="item.value" :index="item.index" @click="handleSelect(item.value)">{{ item.label }}</el-menu-item>
    </el-menu>
  </el-drawer>
  <NuxtLink to="/" class="imdb-logo-link">
    <img src="@/assets/images/logo.png" height="80px">
  </NuxtLink>
  <div class="header__input-group">
    <el-input class="header__search-input-field" v-model="searchInput" placeholder="Search IMDb" required>
      <template #prepend>
        <el-select
          class="header__select-dropdown"
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
          >
          </el-option>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" @click="handleSearch" />
      </template>
    </el-input>
  </div>
  <div v-show="isAuth" class="header__watchlist">
    <el-icon :size="30" color="white">
      <CollectionTag />
    </el-icon>
    <el-button link class="header__watchlist-button">
      WatchList
    </el-button>
  </div>
  <div v-show="isAuth" class="header__user-label">
    {{ username }}
  </div>
  <el-divider class="header__divider" direction="vertical" />
  <el-button @click="handleLogOut" link>
    <NuxtLink v-if="!isAuth" to="/login">Sign In</NuxtLink>
    <NuxtLink v-else >Log Out</NuxtLink>
  </el-button>
</header>
</template>


<script setup>
import { CollectionTag, Menu, Search} from '@element-plus/icons-vue'

const isMenuVisible = ref(false)
const selectedGenre = ref('')
const searchInput = ref(null)
const emit = defineEmits(['select-movielist'])

const genresStore = UseGenresStore()
const { genres } = storeToRefs(genresStore)
const user = UseUserStore()
const { isAuth, username } = storeToRefs(user)

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

function handleLogOut() {
  router.push('/login')
  setTimeout(() => isAuth = false, 1000)
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

  &__side-menu-button {
    margin: 5px;
  }
  
  &__input-group {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  &__search-input-field {
    width: 50rem;
    font-size: large;
  }

  &__divider {
    border-left: 1px solid gray;
    color: white;
    width: 1px;
    height: 2rem;
    margin: 0 1rem;
  }

  &__sign-button {
    padding-left: 1.5rem;
    text-decoration: none;
    color: white;
    font-weight: bold;
  }

  &__user-label{
    color: white;
    font-size: 2rem;
    padding: 0 1.5rem;
  }

  &__watchlist{
    @include flex(row, center, center,0)
  }

  &__watchlist-button{
    font-size: 1.5rem;
  }
}
</style>