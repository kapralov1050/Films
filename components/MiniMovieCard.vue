<template>
  <article class="movie-card" >
    <NuxtLink class="movie-card__image" :to="`/movie/${movie.id}`">
      <NuxtImg
        class="movie-card__poster"
        :src="backdrop_url"
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
        {{ formatDateToYear(movie.release_date) }}
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
import { formatDateToYear } from '~/helpers/formatDate';
import type { Movie } from '~/types/common';

const props = defineProps<{movie: Movie}>();

const backdrop_url = computed(() => {
  if(props.movie.backdrop_path) {
    return `https://image.tmdb.org/t/p/w92${props.movie.backdrop_path}`
  } else {
    return 'https://cdn-icons-png.flaticon.com/512/16/16410.png'
  }
})
</script>


<style scoped lang='scss'>
.movie-card {
  @include flex(row, flex-start, flex-start, 0);

  &__image {
    display: flex;
    height: 3rem;
    width: 3rem;
    border-radius: 10px;
  }

  &__poster {
    height: auto;
    width: 100%;
    object-fit: cover;
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