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
      <el-input class="header__search-input-field" v-model="searchInput" placeholder="Search IMDb">
        <template #prepend>
          <el-select
            class="header__select-dropdown"
            v-model="selectedMovieList"
            placeholder="Select"
            size="large"
            style="width: 120px;"
          >
            <el-option
              v-for="item in MovieListsSelection"
              :key="item.value"
              :label="item.label"
              :value="item"
            >
            </el-option>
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="searchStart" />
        </template>
      </el-input>
    </div>
    <el-divider direction="vertical" />
    <NuxtLink class="header__sign-button sign-button" to="/login">Sign In</NuxtLink>
</header>
</template>

<script setup>
import { Menu, Search, Share, Star, StarFilled, InfoFilled } from '@element-plus/icons-vue'

const isMenuVisible = ref(false)

const emit = defineEmits(['select-movielist'])

const handleSelect = (list) => {
  emit('select-movielist', list)
  toggleMenu()
}

const selectedMovieList = ref('')
const MovieListsSelection = [
  {
    value: 'top250-movies',
    label: 'Top 250 Movies',
    index: 1
  },
  {
    value: 'top-box-office',
    label: 'Top Box Office (US)',
    index: 2
  },
  {
    value: 'most-popular-movies',
    label: 'Most Popular Movies',
    index: 3
  },
  {
    value: 'top-rated-english-movies',
    label: 'Top Rated English Movies',
    index: 4
  },
  {
    value: 'lowest-rated-movies',
    label: 'Lowest Rated Movies',
    index: 5
  },

]

function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value
}

//Вызов поиска
async function searchStart() {
  const results = await searchMovies({
  type: 'movie'
})

console.log(results)
}

</script>


<style lang="scss" scoped>
$font-stack: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.header {
  height: inherit;
  padding: 0 25px;
  background-color: rgb(27, 27, 27);
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
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
}
</style>