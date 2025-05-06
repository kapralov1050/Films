<template>
  <article class="movie-card" >
    <NuxtLink 
      class="movie-card__image" 
      :to="{
        path: `/movie/${movie.id}`,
        query: { name: movie.title }
      }" 
    >
      <NuxtImg
        class="movie-card__poster"
        :src="moviePoster_url"
        :alt="movie.original_title"
        loading="lazy"
        format="webp"
      />
    </NuxtLink>
    <section class="movie-card__meta">
      <header class="movie-card__head">
        <div class="movie-card__content">
          <h3 class="movie-card__title">
            {{ movie.original_title }}
          </h3>
          <time 
            class="movie-card__year" 
            :datetime="movie.release_date"
          >
            {{ formatDateToYear(movie.release_date) }}
          </time>
        </div>
        <WatchListButton 
          :isInWatchlist="isInWatchList" 
          @handleWatchListChange="toggleInWatchListStatus" 
          :v-loading="isLoading"
        />
      </header>
      <p class="movie-card__overview">
        {{ movie.overview }}
      </p>
      <section class="movie-card__rating">
        <el-icon 
          :size="30" 
          color="rgb(255, 217, 0)"
        >
          <StarFilled />
        </el-icon>
        {{ movie.vote_average.toFixed(1) }}
        <RatingButton :movieId="movie.id"/>
      </section>
    </section>
  </article>
</template>


<script setup lang="ts">
import { StarFilled } from '@element-plus/icons-vue';
import { formatDateToYear } from '~/helpers/formatDate';
import type { Movie } from '~/types/common';

const authStore = useAuthStore()
const watchlistStore = useWatchlistStore()
const { loginWithTmdb } = useAuth()

const props = defineProps<{movie: Movie}>();

const isLoading = ref(false)

const isInWatchList = computed(() => {
  return watchlistStore.watchListMovies?.some((movie: Movie) => props.movie.id === movie.id) || false
})

const moviePoster_url = computed(() => {
  if(props.movie.poster_path) {
    return `https://image.tmdb.org/t/p/w342${props.movie.poster_path}`
  } else {
    return 'https://cdn-icons-png.flaticon.com/512/16/16410.png'
  }
})

const toggleInWatchListStatus = () => {
  isLoading.value = true
  if(authStore.sessionId) {
    watchlistStore.addToWatchList(props.movie.id, !isInWatchList.value, props.movie.title)
  } else {
    loginWithTmdb()
  }
  isLoading.value = false
}
</script>


<style scoped lang="scss">
.movie-card {
  @include flex(row, space-between, flex-start, 0);
  box-sizing: border-box;
  width: inherit;
  height: 16rem;

  &__image {
    position: relative;
    height: auto;
    width: auto;
  }

  &__poster {
    align-self: center;
    height: 16rem;
    width: 12rem;
    object-fit:contain;
    filter: drop-shadow(2px 3px 5px #333)
  }

  &__head {
    @include flex(row, space-between, flex-start, 1rem);
    width: 100%;
  }

  &__meta {
    @include flex(column, space-between, flex-start, 0.5rem);
    flex: 1;
    height: inherit;
    padding-left: 2rem;
  }

  &__title {
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
  }

  &__year {
    margin-right: 10px;
    color: rgb(99, 99, 99);
  }

  &__overview {
    width: 60%;
  }

  &__rating {
    @include flex(row, center, center, 0.5rem);
  }
}
</style>