<template>
  <article class="movie-card" v-loading="isLoading">
    <NuxtImg
      class="movie-card__poster"
      :src="moviePoster_url"
      :alt="movieDetailsStore.selectedMovie?.title"
      format="webp"
    />
    <div class="movie-card__meta">
      <h1 class="movie-card__meta-title">
        {{ movieDetailsStore.selectedMovie?.title }}
        ({{ formatDateToYear(movieDetailsStore.selectedMovie?.release_date || '0') }})
      </h1>
      <section class="movie-card__details">
        <h2 class="movie-card__details-subtitle">
           About Film 
        </h2>
        <p> {{ movieDetailsStore.selectedMovie?.overview }}</p>
        <div class="movie-card__inline-list">
          <h4> Genres: </h4>
          <ul>
            <li 
              v-for="genre in movieDetailsStore.selectedMovie?.genres" 
              :key="genre.id"
            >
              {{ genre.name }}
            </li>
          </ul>
        </div>
        <div class="movie-card__inline-list">
          <h4> Country: </h4>
          <ul>
            <li 
              v-for="country in movieDetailsStore.selectedMovie?.production_countries" 
              :key="country.id"
            >
              {{ country.name }}
            </li>
          </ul>
        </div>
        <div class="movie-card__inline-list">
          <h4> Language: </h4>
          <ul>
            <li 
              v-for="language in movieDetailsStore.selectedMovie?.spoken_languages" 
              :key="language.id"
            >
              {{ language.name }}
            </li>
          </ul>
        </div>
        <div class="movie-card__inline-list">
          <h4>
            Cast: 
          </h4>
          <ul>
            <li 
              v-for="person in movieDetailsStore.movieCast" 
              :key="person.id"
            >
              <NuxtLink 
                :to="{
                      path: `/person/${person.id}`,
                      query: { name: person.name }
                    }" 
                class="movie-card__person-link"
              >
                {{ person.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <div class="movie-card__rating">
      <p class="movie-card__rating__average">
        {{ movieDetailsStore.selectedMovie?.vote_average }}
      </p>
      <el-icon :size="30" class="star">
        <StarFilled color="rgb(255, 217, 0)" />
      </el-icon>
      <p class="movie-card__rating__votes">
        {{ movieDetailsStore.selectedMovie?.vote_count }} ratings
      </p>
    </div>
  </article>
  <article class="recommendations">
    <h1 class="recommendations__title">
      Recommendations
    </h1>
    <el-scrollbar>
      <section class="recommendations__scroll-content">
        <div 
          v-for="movie in movieDetailsStore.movieRecommendations" 
          class="recommendations__item"
        >
          <NuxtLink 
            :to="{
              path: `/movie/${movie.id}`,
              query: { name: movie.title }
            }"
          >
            <NuxtImg
              :src="movie.poster_path ? `
              https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : 'https://cdn-icons-png.flaticon.com/512/16/16410.png'"
              :alt="movie.title"
              width="300px"
              height="auto"
              format="webp"
            />
          </NuxtLink>
          <h3>
            {{ movie.title }} ({{ formatDateToYear(movie.release_date) }})
          </h3>
        </div>
      </section>
    </el-scrollbar>
  </article>
</template>


<script setup lang="ts">
import { StarFilled } from '@element-plus/icons-vue';
import { formatDateToYear } from '~/helpers/formatDate';

definePageMeta({
  middleware: 'set-page-title'
})

const movieDetailsStore = useMovieDetailsStore();

const isLoading = ref(false)
const route = useRoute();
const id = route.params.id as string;

const moviePoster_url = computed(() => {
  if(movieDetailsStore.selectedMovie?.poster_path) {
    return `https://image.tmdb.org/t/p/w500${movieDetailsStore.selectedMovie?.poster_path}`
  } else {
    return 'https://cdn-icons-png.flaticon.com/512/16/16410.png'
  }
})

onMounted(async () => {
  isLoading.value = true
  try {
    await movieDetailsStore.getMovieDetails(id);
  } catch (error) {
    console.error(`error while loading movie ${id}:`,error)
  } finally {
    isLoading.value = false
  }
});

onUnmounted(() => {
  movieDetailsStore.movieRecommendations = null
  movieDetailsStore.selectedMovie = null
})
</script>


<style scoped lang="scss">
.movie-card {
  align-self: center;
  height: fit-content;
  width: 70%;
  padding: 3rem;
  @include flex(row, flex-start, flex-start, 0);

  &__poster {
    height: 40rem;
    object-fit: contain;
    width: 30rem;
  }

  &__meta {
    padding: 0 5rem 0 2rem;
    flex: 3;
  }

  &__meta-title {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  &__details {
    &-subtitle {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  &__inline-list {
    @include flex(row, flex-start, flex-start, 0.5rem);
    padding-top: 1rem;

    li {
      display: inline-block;
      padding-right: 0.5rem;

      &:not(:last-child)::after {
        content: ",";
      }
    }
  }

  &__rating {
    flex: 1;
    font-size: 2.5rem;
  }

  &__rating__average {
    font-weight: bold;
    display: inline-block;
  }

  &__rating__votes {
    font-size: 1.5rem;
    color: gray;
  }

  &__person-link {
    color: black;

    &:hover {
      color: rgb(68, 68, 68);
    }
  }
}

.recommendations {
  background-color: rgb(235, 180.6, 99);
  color: white;
  min-height: 40rem;
  height: auto;
  padding: 2rem 1rem;
  box-sizing: border-box;
  width: 100%;

  &__title {
    font-size: 2rem;
    margin: 0.5rem 0 1rem 2rem;
  }

  &__scroll-content {
    @include flex(row, flex-start, center, 0);
    height: auto;
    padding-right: 3rem;
    width: fit-content;
  }

  &__item {
    @include flex(column, flex-start, center, 1rem);
    margin: 1.5rem;
    flex-shrink: 0;
    max-height: 32rem;
    max-width: 20rem;
    text-align: center;
    overflow-wrap: anywhere;
    filter: drop-shadow(2px 3px 5px #616161)
  }
}
</style>