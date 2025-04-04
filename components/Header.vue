<template>
  <header class="header">
    <div class="header__side-menu">
      <el-button @click="toggleMenu" class="header__menu-button">
        <el-icon><Menu /></el-icon>
      </el-button>
      <el-drawer v-model="isMenuVisible" direction="ltr" size="250px" class="header__drawer">
        <el-menu class="header__nav-menu">
          <el-menu-item 
            class="header__nav-item"
            v-for="option in moviesListOptions" 
            :key="option.value" 
            :index="option.index" 
            @click="handleSelect(option.value)" 
          >
            {{ option.label }}
          </el-menu-item>
        </el-menu>
      </el-drawer>
      <NuxtLink to="/" class="header__logo-link">
        <img src="@/assets/images/logo.png" height="80px" class="header__logo">
      </NuxtLink>
    </div>
    <div class="header__search">
      <el-autocomplete 
        class="header__search-input" 
        :fetch-suggestions="querySearch"
        v-model="searchInput" 
        placeholder="Search IMDb" 
        required
      >
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
      </el-autocomplete>
    </div>
    <div class="header__user-block">
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
    </div>
  </header>
  </template>


<script setup>
import { Menu, Search} from '@element-plus/icons-vue'

const { isAuth, username, handleLogOut } = useAuth()
const { isMenuVisible, handleSelect, toggleMenu, moviesListOptions } = UseMovieList()
const { openWatchlist } = UseWatchList()
const { selectedGenre, genres, searchInput, handleSearch } = UseSearch()
</script>


<style lang="scss" scoped>
$font-stack: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.header {
  height: inherit;
  padding: 0 25px;
  background-color: $login-background;
  @include flex(row, center, center, 0);


  &__side-menu {
    @include flex(row, flex-start, center, 1rem);
    flex:1;

    &__menu-button {
      margin: 5px;
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
  
  &__search {

    flex: 3;
    display: flex;
    justify-content: center;

    &-input {
      width: auto;
      font-size: 2rem;
    }

    &-select {
      // стили для селекта, если нужны
    }

    &-button {
      // стили для кнопки поиска, если нужны
    }
  }

  &__user-block {
    @include flex(row, flex-end, center, 1.5rem);
    flex:1;

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
}
}
</style>