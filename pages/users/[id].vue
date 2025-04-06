<template>
  <el-container>
    <el-main>
      <section class="movie">
        <div class="movie__short-info">
          <div class="movie__short-info__header">
            <h3 class="movie__short-info__title">{{ selectedMovie.primaryTitle }}</h3>
            <div class="movie__short-info__meta">
              <span class="movie__short-info__release-date">{{ selectedMovie.startYear }}</span>
              <span class="movie__short-info__age-rating">{{ AgeRating[selectedMovie.contentRating] }}</span>
              <span class="movie__short-info__duration">{{ movieDuration }}</span>
            </div>
          </div>

          <div class="movie__short-info__score">
            <div class="rating">
              <RatingButton :rating="selectedMovie.averageRating" :votes="movieVotes" :id="id"/>
            </div>
          </div>
        </div>

        <div class="movie__main-info">
          <div class="movie__main-info__poster">
            <img class="movie__main-info__image" height="900px" :src="selectedMovie.primaryImage">
          </div>
          <section class="movie__main-info__details">
            <div>
              <ul class="movie__main-info__genres">
                <li 
                  class="movie__main-info__genre" 
                  v-for="interest in selectedMovie.interests" 
                  :key="interest.id"
                >
                  {{ interest }}
                </li>
              </ul>
            </div>
            <div class="movie__main-info__description">
              {{ selectedMovie.description }}
            </div>
            <el-divider />
            <div class="movie__main-info__creators">
              <span class="movie__main-info__person">
                Director(s):
                <span v-for="director in selectedMovie.directors" :key="director.id">
                  <el-link 
                    class="movie__main-info__person-link" 
                    type="primary" 
                    :href="director.url"
                  >
                    {{ director.fullName }}
                  </el-link>
                </span>
              </span>

              <span class="movie__main-info__person">
                Writer(s):
                <span v-for="writer in selectedMovie.writers" :key="writer.id">
                  <el-link 
                    class="movie__main-info__person-link" 
                    type="primary" 
                    :href="writer.url"
                  >
                    {{ writer.fullName }}
                  </el-link>
                </span>
              </span>

              <span class="movie__main-info__person">
                Cast:
                <span v-for="actor in selectedMovie.cast" :key="actor.id">
                  <el-popover
                    :disabled="!actor.characters?.length"
                    :content="actor.characters?.[0] || ''"
                    placement="top"
                    effect="dark"
                    show-after="200"
                  >
                    <template #reference>
                      <el-link 
                        class="movie__main-info__person-link" 
                        type="primary" 
                        :href="actor.url"
                      >
                        {{ actor.fullName }}
                      </el-link>
                    </template>
                  </el-popover>
                </span>
              </span>
            </div>
          </section>
        </div>
      </section>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script setup>
import RatingButton from '~/components/RatingBlock.vue';

const route = useRoute();
const id = route.params.id;

const movieDetailsStore = UseMovieDetailsStore();
const { selectedMovie } = storeToRefs(movieDetailsStore);

const movieVotes = computed(() => {
  return movieDetailsStore.formatVotes(movieDetailsStore.selectedMovie.numVotes);
});

const movieDuration = computed(() => {
  return movieDetailsStore.formatDuration(movieDetailsStore.selectedMovie.runtimeMinutes);
});

onMounted(async () => {
  movieDetailsStore.selectedMovie = await movieDetailsStore.getMovieDetails(id);
});
</script>

<style scoped lang="scss">
.el-main {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: rgb(34, 34, 34);
  @include flex(row, center, center, 0);
}

.movie {
  padding: 30px;
  width: 1280px;
  min-height: 50vh;
  background-color: black;
  @include flex(column, center, center, 0);

  &__short-info {
    color: white;
    width: 100%;
    min-height: 100px;
    flex-grow: 1;
    @include flex(row, space-between, center, 0);

    &__header {
      @include flex(column, center, flex-start, 10px);
    }

    &__title {
      font-size: 2rem;
      font-weight: bold;
    }

    &__meta {
      display: inline-block;
    }

    &__age-rating {
      margin-left: 10px;
    }

    &__duration {
      margin-left: 10px;
    }
  }

  &__main-info {
    color: white;
    flex-grow: 5;
    height: 60vh;
    @include flex(row, space-between, center, 0);

    &__poster {
      height: inherit;
      width: auto;
    }

    &__image {
      height: inherit;
      border-radius: 10px;
    }

    &__details {
      height: inherit;
      padding: 1.5rem;
    }

    &__genre {
      display: inline-block;
      margin: 0.2rem;
      padding: 8px 15px;
      font-weight: 400;
      border: 1px solid rgb(255, 217, 0);
      border-radius: 10px;
    }

    &__description {
      font-size: 1.3rem;
      line-height: 1.5rem;
      margin: 3rem 0;
    }

    &__creators {
      @include flex(column, center, flex-start, 2rem);
    }

    &__person {
      @include flex(row, space, flex-start, 1rem);
      flex-wrap: wrap;
    }
  }
}

.custom-black-popover {
  background-color: black;
}
</style>