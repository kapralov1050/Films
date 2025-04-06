<template>
  <div class="movie-card">
    <NuxtLink class="movie-card__image" :to="`/users/${movie.id}`">
      <NuxtImg
        class="movie-card__poster"
        :src="`https://image.tmdb.org/t/p/w342${props.movie.poster_path}`"
        :alt="movie.original_title"
        loading="lazy"
        format="webp"
      />
    </NuxtLink>
    
    <div class="movie-card__meta">
      <div class="movie-card__head">
        <div class="movie-card__content">
          <h3 class="movie-card__title">{{ movie.original_title }}</h3>
          <div class="movie-card__year">
            {{ dateToYear(movie.release_date) }}
          </div>
        </div>
        <el-icon :size="30">
          <CollectionTag />
        </el-icon>
      </div>

      <div class="movie-card__overview">
        {{ movie.overview }}
      </div>
      
      <div class="movie-card__rating">
        <div class="movie-card__watched-button">
          <Button @click="toggleWatched">
            {{ watchedStatus ? 'Watched' : 'Mark as Watched' }}
          </Button>
        </div>
        <el-icon :size="30" class="movie-card__star">
          <StarFilled />
        </el-icon>
        <div>{{ movie.vote_average.toFixed(1) }}</div>
        <div 
          v-if="currentRating !== null" 
          class="movie-card__user-rating" 
          @click="removeRating(movie.id)"
        >
          <el-icon :size="30" class="movie-card__star">
            <StarFilled color="rgb(50.8, 116.6, 184.5)"/>
          </el-icon>
          <span>{{ currentRating }} /10</span>
        </div>
        <div v-else class="movie-card__user-rating">
          <Button @click="toggleRateBlock">Rate</Button>
          <el-rate
            class="movie-card__rate-button"
            v-model="userRating"
            @click="rateMovie(movie.id)"
            v-show="rateBlockVisible"
            :max="10"
            show-score
            score-template="{value} /10"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarFilled, CollectionTag } from '@element-plus/icons-vue';
import { dateToYear } from '~/helpers/formatDate';
import type { movieRating } from '~/types/film';

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  }
});

const moviesStore = useMoviesStore()
const rateBlockVisible = ref(false)
const watchedStatus = ref(false)
const ratings = useLocalStorage<movieRating[]>('movie-ratings',[]);
const userRating = ref(0)
const currentRating = computed(() => {
  return ratings.value.find(item => item.id == props.movie.id)?.rating || null
})

const toggleRateBlock = () => {
  rateBlockVisible.value = !rateBlockVisible.value
}

const toggleWatched = () => {
  watchedStatus.value = !watchedStatus.value
  if (watchedStatus.value) {
    moviesStore.totalWatched++
    console.log(moviesStore.totalWatched)
  } else {
    moviesStore.totalWatched--
    console.log(moviesStore.totalWatched)
  }
}

function rateMovie(movieId: number) {
  const ratings = useLocalStorage<movieRating[]>('movie-ratings', []);
  const existingIndex = ratings.value.findIndex(item => item.id == movieId)

  if(existingIndex !== -1) {
    ratings.value[existingIndex].rating = userRating.value
  } else {
    ratings.value.push({id: movieId, rating: userRating.value})
  }
  rateBlockVisible.value = false
}

function removeRating(movieId: number) {
  const ratings = useLocalStorage<movieRating[]>('movie-ratings', []);
  ratings.value = ratings.value.filter(item => item.id !== movieId);
  userRating.value = 0
}
</script>


<style scoped lang="scss">
.movie-card {
  @include flex(row, space-between, flex-start, 0);
  width: inherit;
  height: 16rem;

  &__image {
    position: relative;
    height: auto;
    width: auto;
  }

  &__poster {
    align-self: center;
    max-height: 16rem;
    width: auto;
    object-fit: cover;
    border-radius: 10px;
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
    @include flex(row, flex-start, center, 0.5rem);
  }

  &__user-rating {
    @include flex(row, center, center, 0);
    padding-left: 1rem;
  }

  &__rate-button {
    z-index: 10;
  }

  &__star {
    color: $star-color;
  }

  &__watchlist-btn {
    position: absolute;
    z-index: 10;
    color: white;
    background-color: rgba(43, 43, 43, 0.5);
    border-radius: 10px 0 10px 0;
    border: none;

    &:hover {
      background-color: rgba(87, 87, 87, 0.5);
    }
  }
}
</style>