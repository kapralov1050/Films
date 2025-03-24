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
        <div class="header__divider"></div>
        <NuxtLink class="header__sign-button sign-button" to="/login"> Sign In</NuxtLink>
    </el-header>
    <el-main class="main">
      <div class="title-block">
        <div class="title-block__subtitle">
          <div class="title-block__h3-title">
            <h3>IMDb Charts</h3>
          </div>
          <div class="title-block__share-group">
            <span>Share</span>
            <el-button :icon="Share"/>
          </div>
        </div>
        <div class="title-block__main-title">
          <h1>IMDb Top 250 Movies</h1>
          <div>As rated by regular IMDb voters.</div>
        </div>
      </div>
      <!-- <ul>
          <li v-for="movie in moviesStore.data" :key="movie.id">
              {{ movie.originalTitle }}
          </li>
      </ul> -->
    </el-main>
    <el-footer height="80px">Footer</el-footer>
  </el-container>
</div>
</template>



<script setup>
import { Menu, Search, Share } from '@element-plus/icons-vue'
const isMenuVisible = ref(false)
const searchInput = ref('')
const searchSelectedValue = ref()
const moviesStore = UseMoviesStore()

function toggleMenu(){
  isMenuVisible.value = !isMenuVisible.value
}

onMounted( async () => {
 try{
    const response = await instance.get('top250-movies')
    moviesStore.data = response.data
 } catch (error) {
    console.log(error)
 }
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

.imdb-logo-link{
  margin: 5px;
}

.header{
  height: 60px;
  width: 100%;
  background-color: black;
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
background-color: white;
width: 80%;
@include flex(column, flex-start, center, 0);
align-self:center;

}

.title-block{
width: 100%;
height: auto;
@include flex(column, center, center, 0);

    &__subtitle{
      @include flex(row, space-between, center, 0);
      width: 100%;
    }
    &__h3-title{
      width: 20%;
      padding: 5px;
    }
    &__share-group{
      width: auto;
      padding: 5px;
    }
    &__main-title{
      align-self: flex-start;
    }

}
</style>