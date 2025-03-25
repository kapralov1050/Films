<template>
  <div>
    <el-container>
      <el-header class="header">
        <el-button @click="toggleMenu" class="header__side-menu-button">
          <el-icon><Menu /></el-icon>
        </el-button>
        <el-drawer v-model="isMenuVisible" direction="ltr" size="250px">
          <el-menu :collapse="!isMenuVisible" index="1">
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
        <NuxtLink to="/" class="imdb-logo-link">
          <img src="@/assets/images/logo.png" height="80px">
        </NuxtLink>
        <div class="header__input-group">
          <el-input class="header__search-input-field" v-model="searchInput" placeholder="Search IMDb">
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
        <NuxtLink class="header__sign-button sign-button" to="/login">Sign In</NuxtLink>
      </el-header>
      <el-main class="main">
        <div class="title-group">
          <div class="title-group__subtitle-block">
            <h3 class="title-group__subtitle">IMDb Charts</h3>
            <span class="title-group__share-button">
              Share <el-icon><Share /></el-icon>
            </span>
          </div>
          <div class="title-group__title-block">
            <h1 class="title-group__title">IMDb Top 250 Movies</h1>
            <span class="title-group__title-description">As rated by regular IMDb voters.</span>
          </div>
        </div>
        <div class="movies-list">
          <ul>
            <li v-for="(movie, idx) in moviesStore.topMovies" :key="movie.id">
              <div class="movies-list__movie-card-container">
                <div class="movie-card-item">
                  <div class="movie-card-item__primary-img-block">
                    <el-link :href="movie.url" target="_blank">
                      <el-image
                        class="movie-card-item__primary-img"
                        :src="movie.primaryImage"
                        :fit="fit"
                        :alt="movie.originalTitle"
                      />
                    </el-link>
                  </div>
                  <div class="movie-card-item__info">
                    <h3 class="movie-card-item__title">{{ idx + 1 }}. {{ movie.primaryTitle }}</h3>
                    <div class="movie-card-item__meta">
                      <span class="movie-card-item__year movie-card-item__meta-item">{{ movie.startYear }}</span>
                      <span class="movie-card-item__duration movie-card-item__meta-item">{{ formattedDuration(movie.runtimeMinutes) }}</span>
                      <span class="movie-card-item__rating-block movie-card-item__meta-item">{{ AgeRating[movie.contentRating] }}</span>
                    </div>
                    <div class="movie-card-item__rating-block">
                      <el-icon class="movie-card-item__rate-icon"><StarFilled /></el-icon>
                      <span class="movie-card-item__average movie-card-item__rating-item">{{ movie.averageRating }}</span>
                      <span class="movie-card-item__votes movie-card-item__meta-item">{{ formatVotesInMillions(movie.numVotes) }}</span>
                      <el-button class="movie-card-item__rate-button" text type="primary">
                        <el-icon><Star /></el-icon>
                        Rate
                      </el-button>
                    </div>
                  </div>
                  <div class="movie-card-item__right-info-button">
                    <el-button text circle>
                      <el-icon><InfoFilled /></el-icon>
                    </el-button>
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
import { Menu, Search, Share, Star, StarFilled, InfoFilled } from '@element-plus/icons-vue'
import { AgeRating } from '~/types/ageRatings'

const isMenuVisible = ref(false)
const searchInput = ref('')
const searchSelectedValue = ref()
const moviesStore = UseMoviesStore()

function formatVotesInMillions(votes) {
  const votesInMillions = votes / 1000000
  const formatted = votesInMillions.toFixed(1)
  return `(${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}M)`
}

function formattedDuration(duration) {
  const hours = Math.floor(duration / 60)
  const mins = duration % 60
  return `${hours}h ${mins}m`
}

function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value
}

onMounted(async () => {
  moviesStore.topMovies = await moviesStore.getTopMovies()
})
</script>


<style scoped lang="scss">
@mixin flex($direction: row, $justify: flex-start, $align: stretch, $gap: 0) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  gap: $gap;
}

.el-container {
  background-color: black;
}

.imdb-logo-link {
  margin: 5px;
}

.header {
  height: 60px;
  width: 100%;
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
    width: 500px;
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

.main {
  background-color: rgb(255, 255, 255);
  width: 60%;
  @include flex(column, flex-start, center, 0);
  align-self: center;
}

.title-group {
  @include flex(column, flex-end, center, 0);
  width: 100%;
  
  &__subtitle-block {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: inherit;
  }

  &__subtitle {
    display: block;
  }

  &__share-button {
    display: block;
  }

  &__title-block {
    width: inherit;
  }
}

.movies-list {
  width: 800px;
  border: 1px solid rgb(199, 199, 199);
  border-radius: 5px;
  padding: 5px;
  @include flex(column, flex-start, center, 0);
  
  &__movie-card-container {
    width: 100%;
    height: 115px;
    padding: 5px;
    border-bottom: 1px solid rgb(199, 199, 199);
    display: flex;
    align-items: center;
  }
}

.movie-card-item {
  display: flex;
  width: inherit;

  &__primary-img-block {
    width: 10%;
    margin-right: 20px;
  }

  &__primary-img {
    width: 72px;
    height: 106px;
    object-fit: cover;
    border-radius: 10px;
  }

  &__info {
    @include flex(column, center, flex-start, 8px);
    flex: 1;
  }

  &__meta {
    display: inline-block;
  }

  &__meta-item {
    margin-right: 10px;
    color: rgb(99, 99, 99);
  }

  &__rating-block {
    display: inline-block;
  }

  &__rating-item {
    margin-right: 5px;
  }
  
  &__rate-icon {
    color: rgb(255, 188, 4);
  }

  &__right-info-button {
    width: 10%;
    @include flex(row, center, center, 0);
  }
}
</style>