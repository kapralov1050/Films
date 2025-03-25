<template>
<div>
  <el-container>
    <el-header class="header">
      <el-button 
        @click="toggleMenu"
        class="header__side-menu-button"
      >
        <el-icon>
          <Menu />
        </el-icon>
      </el-button>
      <el-drawer
        v-model="isMenuVisible"
        direction="ltr"
        size="250px"
      >
        <el-menu
          :collapse="!isMenuVisible"
          index="1"
        >
              <el-menu-item index="1-1">Top 250 movies</el-menu-item>
              <el-menu-item index="1-2">Top 250 movies</el-menu-item>
              <el-menu-item index="1-3">Most Popular Movies</el-menu-item>
              <el-menu-item index="1-4">Brows Movies by Genre</el-menu-item>
              <el-menu-item index="1-5">Top Box Office</el-menu-item>
              <el-menu-item index="1-6">Showtimes & Tickets</el-menu-item>
              <el-menu-item index="1-7">Movie News</el-menu-item>
              <el-menu-item index="1-8">India Movie Spotlight</el-menu-item>
        </el-menu>
      </el-drawer>
      <NuxtLink 
        to="/" 
        class="imdb-logo-link"
      >
          <img 
          src="@/assets/images/logo.png" 
          height="80px"
          >
      </NuxtLink>
        <div class="header-input-group">
          <el-input 
            class="header__search-input-field" 
            v-model="searchInput" 
            placeholder="Search IMDb"
          >
              <template #prepend>
                <el-select 
                  class="header__select-dropdown"
                  v-model="searchSelectedValue"
                  placeholder="All"
                  size="large"
                  style="width: 120px;"
                >
                <el-option label="All" value="1" />
                <el-option label="Titles" value="1" />
                <el-option label="TV Episodes" value="1" />
                <el-option label="Celebs" value="1" />
                <el-option label="Companies" value="1" />
                <el-option label="Keywords" value="1" />
              </el-select>
              </template>
              <template #append>
                <el-button :icon="Search" />
              </template>
          </el-input>
        </div> 
        <el-divider direction="vertical" />
        <NuxtLink class="header__sign-button sign-button" to="/login"> Sign In</NuxtLink>
    </el-header>
    <el-main class="main">
      <div class="title-group">
        <div class="title-group__subtitle-block">
          <h3 class="title-group__subtitle" >IMDb Charts</h3>
          <span class="title-group__share-button">Share
            <el-icon><Share /></el-icon>
          </span>
        </div>
        <div class="title-group__title-block">
          <h1 class="title-group__title">
            IMDb Top 250 Movies
          </h1>
          <span class="title-group__title-description">As rated by regular IMDb voters.</span>
        </div>
      </div>
      <div class="movies-list">
        <ul>
            <li v-for="(movie, idx) in moviesStore.topMovies" :key="movie.id">
              <div class="movies-list__movie-card-container">
                <div class="movies-list__movie-card-item">
                  <div class="movie-card-item__primary-img-block">
                    <img class="primary-img" src="" :alt="movie.originalTitle">
                  </div>
                  <div class="movie-card-item__info-block">
                    <h3>{{ idx + 1 }}. {{ movie.primaryTitle }}</h3>
                    <div class="movie-card-item__movie-info">
                      <span>{{movie.startYear}}</span>
                      <span>{{ formattedDuration(movie.runtimeMinutes) }}</span>
                      <span>{{ AgeRating[movie.contentRating] }}</span>                                       
                    </div>
                    <div class="movie-card-item__movie-rating">
                      <el-icon><Star /></el-icon>
                      <span>{{ movie.averageRating }}</span>
                      <span>{{  }}</span>
                    </div>
                    
                  </div>
                </div>
              </div>
            </li>
        </ul>
      </div>
    </el-main>
    <el-footer height="80px">Footer</el-footer>
  </el-container>
</div>
</template>



<script setup>
import { Menu, Search, Share, Star, StarFilled } from '@element-plus/icons-vue'
import { AgeRating } from '~/types/ageRatings'

const isMenuVisible = ref(false)
const searchInput = ref('')
const searchSelectedValue = ref()
const moviesStore = UseMoviesStore()

function formattedRating(rating){
  return Math.round(rating/1000000)
}

function formattedDuration(duration){
  const hours = Math.floor(duration / 60)
  const mins = duration % 60
  return `${hours}h ${mins}m`
}

function toggleMenu(){
  isMenuVisible.value = !isMenuVisible.value
}

onMounted( async () => {
  moviesStore.topMovies = await moviesStore.getTopMovies()
})

</script>




<style scoped lang="scss">
@mixin flex($direction: row, $justify: flex-start, $align:stretch, $gap:0) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  gap: $gap;
}

.el-container{
  background-color: black;
}

.imdb-logo-link{
  margin: 5px;
}

.header{
  height: 60px;
  width: 100%;
  background-color: rgb(27, 27, 27);
  @include flex(row, flex-start, center, 0);

  &__side-menu-button{
    margin: 5px;
  }
  
  &__search-input-field{
    width: 500px;
  }

  &__divider{
    border-left: 1px solid gray;
    color: white;
    width: 1px;
    height: 2rem;
    margin: 0 1rem;
  }

  &__sign-button{
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
}

.main{
background-color: rgb(255, 255, 255);
width: 80%;
@include flex(column, flex-start, center, 0);
align-self:center;
}

.title-group{
  @include flex(column, flex-end, center, 0);
  width: 100%;
  
  &__subtitle-block{
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: inherit;
  }
  &__subtitle{
    display: block;
  }
  &__share-button{
    display: block;
  }

  &__title-block{
    width: inherit;
  }
}

.movies-list{
  width: 800px;
  min-height: 300px;
  border: 1px solid rgb(199, 199, 199);
  border-radius: 5px;
  padding: 10px;
  @include flex(column, flex-start,center,0);
  
  &__movie-card-container{
    width: 775px;
    height: 115px;
    border-bottom: 1px solid rgb(199, 199, 199);
  }
}
</style>