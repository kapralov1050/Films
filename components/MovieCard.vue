<template>
  <div class="movie-card-item">
    <div class="movie-card-item__primary-img-block primary-img-block">
      <el-button class="primary-img-block__watchlist-button" @click="$emit('addToWatchList')" :icon="View" link></el-button>
      <NuxtLink :to="`/users/${movie.id}`">
        <NuxtImg
          class="primary-img-block__primary-img"
          :src= "posterSmall"
          :alt="movie.original_title"
          loading="lazy"
          format="webp"
        />
      </NuxtLink>
    </div>
    <div class="movie-card-item__info">
      <h3 class="movie-card-item__title">{{ index + 1 }}. {{ movie.original_title }}</h3>
      <div class="movie-card-item__meta">
        <span class="movie-card-item__year movie-card-item__meta-item">{{ movie.startYear }}</span>
        <span class="movie-card-item__duration movie-card-item__meta-item">{{ formattedDuration }}</span>
        <span class="movie-card-item__rating-block movie-card-item__meta-item">{{ AgeRating[movie.contentRating] }}</span>
      </div>
    </div>
    <div class="movie-card-item__rating-block">
      <RatingButton :rating="movie.averageRating" :votes="movie.numVotes" :id="movie.id"/>
    </div>
  </div>
</template>

<script setup>
import { View } from '@element-plus/icons-vue';
import { computed } from 'vue';
import RatingButton from '~/components/RatingButton.vue';
import { AgeRating } from '~/types/ageRatings';

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const movieDetailsStore = UseMovieDetailsStore();

const formattedVotes = computed(() => {
  return movieDetailsStore.formatVotes(props.movie.numVotes);
});

const formattedDuration = computed(() => {
  return movieDetailsStore.formatVotes(props.movie.runtimeMinutes);
});

const posterSmall = `https://image.tmdb.org/t/p/w185${props.movie.poster_path}`;
</script>


<style scoped lang="scss">
.movie-card-item {
  @include flex(row, space-between, flex-start, 0);
  width: inherit;

  &__primary-img-block {
    margin-right: 1rem;
  }

  &__title{
    font-size: 1.5rem;
  }

  &__info {
    @include flex(column, center, flex-start, 8px);
    flex: 1;
    padding: 1rem;
  }

  &__meta {
    display: inline-block;
  }

  &__meta-item {
    margin-right: 10px;
    color: rgb(99, 99, 99);
  }

  &__rating-block {
    transform-origin: right top;
    padding-top: 1.5rem;
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

.primary-img-block {
  position: relative;
  width: 100%;
  max-width: 120px;

  &__primary-img {
    width: 100%;
    max-width: 120px;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
  }

  &__watchlist-button{
    position: absolute;
    z-index: 10;
    color: white;
    top: 0.5rem;
    left: 0.5rem;
  }
}
</style>