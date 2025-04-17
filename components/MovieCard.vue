<template>
  <article class="movie-card" >
    <NuxtLink class="movie-card__image" :to="`/movie/${movie.id}`">
      <NuxtImg
        class="movie-card__poster"
        :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
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
            {{ dateToYear(movie.release_date) }}
          </time>
        </div>
        <WatchListButton :movie="movie"/>
      </header>
      <p class="movie-card__overview">
        {{ movie.overview }}
      </p>
      <section class="movie-card__rating">
        <el-icon :size="30" color="rgb(255, 217, 0)">
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
import { dateToYear } from '~/helpers/formatDate';
import type { Film } from '~/types/common';

defineProps<{movie: Film}>();
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
    @include flex(row, center, center, 0.5rem);
  }
}
</style>