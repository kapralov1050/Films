<template>
  <el-container>
    <el-header>
        <Header />
    </el-header>
    <el-main>
      <article class="movie-card">
        <NuxtImg
          class="poster"
          :src="`https://image.tmdb.org/t/p/w500${movieDetailsStore.selectedMovie.poster_path}`"
          :alt="movieDetailsStore.selectedMovie.title"
          format="webp"
        />
        <div class="meta">
          <h1 class="meta__title">
            {{ movieDetailsStore.selectedMovie.title }}
            ({{ dateToYear(movieDetailsStore.selectedMovie.release_date) }})
          </h1>
          <section class="meta__details">
            <h2 class="meta__subtitle"> About film </h2>
            <p> {{ movieDetailsStore.selectedMovie.overview }}</p>
            <span class="meta__details__inline-list">
              <h4> Genres: </h4>
              <ul>
                <li v-for="genre in movieDetailsStore.selectedMovie.genres" :key="genre.id">
                  {{ genre.name }}
                </li>
              </ul>
            </span>
            <span class="meta__details__inline-list">
              <h4> Country: </h4>
              <ul>
                <li v-for="country in movieDetailsStore.selectedMovie.production_countries" :key="country.id">
                  {{ country.name }}
                </li>
              </ul>
            </span>
            <span class="meta__details__inline-list">
              <h4> Language: </h4>
              <ul>
                <li v-for="language in movieDetailsStore.selectedMovie.spoken_languages" :key="language.id">
                  {{ language.name }}
                </li>
              </ul>
            </span>
          </section>
        </div>
        <div class="rating">
          <p class="rating__average">{{ movieDetailsStore.selectedMovie.vote_average }}</p>
          <el-icon :size="30" class="star">
            <StarFilled color="rgb(255, 217, 0)" />
          </el-icon>
          <p class="rating__votes">{{ movieDetailsStore.selectedMovie.vote_count }} ratings</p>
        </div>
      </article>
      <article class="recommendations">
        <h1 class="recommendations__title"> Recommendations </h1>
        <el-scrollbar>
          <section class="scroll-content">
            <div v-for="item in movieDetailsStore.movieRecommendations.results" class="scroll-item">
              <NuxtImg
                :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
                :alt="item.title"
                loading="lazy"
                format="webp"
              />
              <h3>{{ item.title }} ({{ dateToYear(item.release_date) }})</h3>
            </div>
          </section>
        </el-scrollbar>
      </article>
    </el-main>
  </el-container>
</template>


<script setup>
import { StarFilled } from '@element-plus/icons-vue';
import { dateToYear } from '~/helpers/formatDate';

const route = useRoute();
const id = route.params.id;

const movieDetailsStore = UseMovieDetailsStore();

onMounted(async () => {
  await movieDetailsStore.getMovieDetails(id);
  await movieDetailsStore.getRecommendations(id);
});
</script>


<style scoped lang="scss">
.el-main {
  @include flex(column, center, center, 0);
  padding: 0;
  margin: 0;
}

.movie-card {
  height: fit-content;
  width: 70%;
  padding: 3rem;
  @include flex(row, flex-start, flex-start, 0);
}

.poster {
  max-height: 600px;
  height: 40rem;
  border-radius: 5px;
  width: auto;
}

.meta {
  padding: 0 5rem 0 2rem;
  flex:3;

  &__title {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  &__subtitle {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  &__details {

    &__inline-list {
      @include flex(row, flex-start, center, 0.5rem);
      padding-top:1rem;
    }

    &__inline-list li{
      display: inline-block;
      padding-right: 0.5rem;
    }

    &__inline-list li:not(:last-child)::after {
      content: ",";
    }
  }
}

.rating {
  flex:1;
  font-size: 2.5rem;

  &__average {
    font-weight: bold;
    display: inline-block;
  }

  &__votes {
    font-size: 1.5rem;
    color: gray;
  }
}

.recommendations {
  background-color: rgb(235, 180.6, 99);
  color: white;
  padding-bottom: 2rem;

  &__title {
    font-size: 2rem;
    margin: 1rem 0 2rem 2rem;
  }
}

.scroll-content {
  @include flex(row, center, center, 2rem);
  height: auto;
  width: 100vw;
}

.scroll-item{
  @include flex(column, center, center, 1rem);
  padding-bottom: 1rem;
  flex-shrink: 0;
  max-width: 300px;
  height: 400px;
  text-align: center;
}
</style>