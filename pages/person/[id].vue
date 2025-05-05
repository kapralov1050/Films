<template>
  <article class="person-card" v-loading="isLoading">
    <div class="person-card__bio">
      <NuxtImg
        class="person-card__poster"
        :src="moviePoster_url"
        :alt="movieDetailsStore.personDetails?.name"
        format="webp"
      />
      <div class="person-card__short-info">
        <h2>Personal Info</h2>
        <div v-if="movieDetailsStore.personDetails?.known_for_department">
          <h3>Known For:</h3>
          <p>{{ movieDetailsStore.personDetails?.known_for_department }}</p>
        </div>
        <div>
          <h3>Gender:</h3>
          <p>{{ Gender[movieDetailsStore.personDetails?.gender || 0] }}</p>
        </div>
        <div v-if="movieDetailsStore.personDetails?.birthday">
          <h3>Birthday:</h3>
          <p>
            {{ formatDateToYear(movieDetailsStore.personDetails?.birthday || 'unknown') }}
            ({{ personAge }} years old)
          </p>
        </div>
        <div v-if="movieDetailsStore.personDetails?.place_of_birth">
          <h3>Place of Birth:</h3>
          <p>{{ movieDetailsStore.personDetails?.place_of_birth }}</p>
        </div>
        <div v-if="movieDetailsStore.personDetails?.also_known_as.length">
          <h3>Also known as:</h3>
          <p 
            v-for="(name, index) in movieDetailsStore.personDetails?.also_known_as"
            :key="index"
          >
            {{ name }}
          </p>
        </div>
      </div>
    </div>
    <div class="person-card__info">
      <section class="person-card__meta">
        <h1 class="person-card__title">
          {{ movieDetailsStore.personDetails?.name }}
        </h1>
        <h2 class="person-card__subtitle">Biography</h2>
        <p class="person-card__bio">
          {{ movieDetailsStore.personDetails?.biography }}
        </p>
        <ImageView
          class="person-card__images"
          v-if="movieDetailsStore.personDetails?.images"
          :images="movieDetailsStore.personDetails?.images.profiles"
          :is-open="isViewerOpen"
          @update:is-open="isViewerOpen = $event"
        />
      </section>
      <section class="person-card__recommendations">
        <h1 class="person-card__title">Known for</h1>
        <el-scrollbar>
          <section class="person-card__scroll-content">
            <div
              v-for="movie in movieDetailsStore.personDetails?.movie_credits.cast"
              class="person-card__scroll-item"
              :key="movie.id"
            >
              <NuxtLink :to="`/movie/${movie.id}`">
                <NuxtImg
                  class="person-card__image"
                  :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                  :alt="movie.title"
                  width="150px"
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
      </section>
    </div>
  </article>
</template>


<script setup lang='ts'>
import { formatDateToYear } from '~/helpers/formatDate';
import { Gender } from '~/types/common';
import dayjs from 'dayjs'

const movieDetailsStore = UseMovieDetailsStore()
const route = useRoute();
const id = route.params.id as string;
const isLoading = ref(false)
const isViewerOpen = ref(false)

const personAge = computed(() => {
  const today = dayjs()
  const birthday = dayjs(movieDetailsStore.personDetails?.birthday)
  const age = today.diff(birthday,'year')
  return age
 })

 const moviePoster_url = computed(() => {
  if(movieDetailsStore.personDetails?.profile_path) {
    return `https://image.tmdb.org/t/p/w500${movieDetailsStore.personDetails?.profile_path}`
  } else {
    return 'https://cdn-icons-png.flaticon.com/512/16/16410.png'
  }
})

async function getPersonDetails(id: string) {
    try {
      const response = await instance.get(`/person/${id}`, {
        params: { append_to_response: 'movie_credits,images'}
      })
      return response.data
    } catch (error) {
      console.error('error while loading person information',error)
      throw error
    }
  }

onMounted(async () => {
  isLoading.value = true
  try {
    movieDetailsStore.personDetails = await getPersonDetails(id)
  } catch (error) {
    console.error(`error while loading person details ${id}:`,error)
  } finally {
    isLoading.value = false
  }
})

onUnmounted(() => {
  movieDetailsStore.personDetails = undefined
})
</script>


<style scoped lang='scss'>
.person-card {
  align-self: center;
  height: fit-content;
  width: 70%;
  padding: 3rem;
  @include flex(row, flex-start, flex-start, 0);

  &__bio {
    @include flex(column, flex-start, flex-start, 2rem);
  }

  &__short-info {
    @include flex(column, center, flex-start, 2rem);
    padding-left: 2rem;
  }

  &__poster {
    height: 40rem;
    object-fit: contain;
    width: 30rem;
  }

  &__info {
    flex: 3;
    max-width: 55rem;
    height: 100vh;
  }

  &__meta {
    padding: 0 5rem 0 2rem;
    margin-bottom: 5rem;
  }

  &__title {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  &__subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  &__bio {
    max-width: 50rem;
    height: auto;
    padding-bottom: 1rem;
  }

  &__images {
    padding: 1rem;
    justify-self: flex-end;
  }

  &__recommendations {
    align-self: flex-end;
    height: auto;
    padding: 0 5rem 0 2rem;
    box-sizing: border-box;
    width: auto;
    border: 1px solid gold;
    border-radius: 2rem;
  }

  &__scroll-content {
    @include flex(row, flex-start, center, 0);
    width: fit-content;
  }

  &__scroll-item {
    @include flex(column, center, center, 1rem);
    width: 15rem;
    margin: 1.5rem;
    flex-shrink: 0;
    text-align: center;
    overflow-wrap: anywhere;
  }

  &__image {
    border-radius: 0.5rem;
  }
}
</style>