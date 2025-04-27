<template>
  <article class="movie-card" >
    <NuxtLink class="movie-card__image" :to="`/movie/${movie.id}`">
      <NuxtImg
        class="movie-card__poster"
        :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
        :alt="movie.original_title"
        loading="lazy"
        format="webp"
      />
    </NuxtLink>
    <section class="movie-card__meta">
      <h3 class="movie-card__title">
        {{ movie.original_title }}
      </h3>
      <time 
        class="movie-card__year" 
        :datetime="movie.release_date"
      >
        {{ dateToYear(movie.release_date) }}
      </time>
      <span class="movie-card__rating">
        {{ movie.vote_average.toFixed(1) }}
        <StarFilled color="rgb(255, 217, 0)"/>
      </span>
    </section>
  </article>
</template>


<script setup lang='ts'>
import { StarFilled } from '@element-plus/icons-vue';
import { dateToYear } from '~/helpers/formatDate';
import type { Film } from '~/types/common';

defineProps<{movie: Film}>();
</script>


<style scoped lang='scss'>
.movie-card {
  @include flex(row, flex-start, flex-start, 0);
  width: inherit;

  &__image {
    position: relative;
    height: auto;
    width: auto;
  }

  &__poster {
    align-self: center;
    max-height: 16rem;
    width: 4rem;
    object-fit: cover;
    border-radius: 10px;
  }

  &__meta {
    @include flex(column,center, flex-start, 0);
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

  &__rating {
    display: flex;
  }
}
</style>