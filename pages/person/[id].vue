<template>
  <article class="person-card" v-loading="isLoading">
    <div class="short-info">
      <NuxtImg
        class="poster"
        :src="`https://image.tmdb.org/t/p/w500${movieDetailsStore.personDetails?.profile_path}`"
        :alt="movieDetailsStore.personDetails?.name"
        format="webp"
      />
      <h2> Personal Info </h2>
      <div>
        <h3>Known For:</h3>
        <p> {{ movieDetailsStore.personDetails?.known_for_department }} </p>
      </div>
      <div>
        <h3>Known Credits:</h3>
        <p> {{  }} </p>
      </div>
      <div>
        <h3>Gender:</h3>
        <p> {{ Gender[movieDetailsStore.personDetails?.gender || 0] }} </p>
      </div>
      <div>
        <h3>Birthday:</h3>
        <p> {{ formatDate(movieDetailsStore.personDetails?.birthday || 'unknown')}} ({{ personAge }} years old) </p>
      </div>
      <div>
        <h3>Place of Birth:</h3>
        <p> {{ movieDetailsStore.personDetails?.place_of_birth }} </p>
      </div>
      <div v-if="movieDetailsStore.personDetails?.also_known_as.length">
        <h3>Also known as:</h3>
        <p v-for="(name, index) in movieDetailsStore.personDetails?.also_known_as" :key="index" >
          {{ name }} 
        </p>
      </div>
    </div>
    <div class="info">
      <section class="meta">
        <h1 class="meta__title">
          {{ movieDetailsStore.personDetails?.name}}
        </h1>
        <h2 class="meta__subtitle"> Biography </h2>
        <p class="meta__bio"> {{ movieDetailsStore.personDetails?.biography }}</p>
        <ImageView 
          class="meta__images"
          v-if="movieDetailsStore.personDetails?.images" 
          :images="movieDetailsStore.personDetails?.images.profiles" 
          :is-open="isViewerOpen" 
          @update:is-open="isViewerOpen = $event"
        />
      </section>
      <section class="recommendations">
        <h1 class="recommendations__title">
          Known for
        </h1>
        <el-scrollbar>
          <section class="scroll-content">
            <div 
              v-for="movie in movieDetailsStore.personDetails?.movie_credits.cast" 
              class="scroll-item"
            >
              <NuxtLink :to="`/movie/${movie.id}`">
                <NuxtImg
                  class="scroll-item__image"
                  :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                  :alt="movie.title"
                  width="150px"
                  height="auto"
                  format="webp"
                />
              </NuxtLink>
              <h3>{{ movie.title }} ({{ dateToYear(movie.release_date) }})</h3>
            </div>
          </section>
        </el-scrollbar>
      </section>
    </div>
  </article>
</template>


<script setup lang='ts'>
import { dateToYear, formatDate } from '~/helpers/formatDate';

const movieDetailsStore = UseMovieDetailsStore()
const route = useRoute();
const id = route.params.id as string;
const isLoading = ref(false)
const isViewerOpen = ref(false)

const personAge = computed(() => {
  if (movieDetailsStore.personDetails?.birthday) {
    const currentDate = new Date()
    const birthDate = new Date(movieDetailsStore.personDetails?.birthday)
    let years = currentDate.getFullYear() - birthDate.getFullYear()
    const monthDiff = currentDate.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      years--;
    }
    return years
  }
})

enum Gender {
  Unknown = 0,
  Female = 1,
  Male = 2
}

onMounted(async () => {
  isLoading.value = true
  try {
    await movieDetailsStore.getPersonDetails(id)
    console.log(movieDetailsStore.personDetails)
  } catch (error) {
    console.log(`error while loading person details ${id}:`,error)
  } finally {
    isLoading.value = false
  }

})
</script>


<style scoped lang='scss'>
.person-card {
  align-self: center;
  height: fit-content;
  width: 70%;
  padding: 3rem;
  @include flex(row, flex-start, flex-start, 0);
}

.short-info {
  @include flex(column, flex-start, flex-start, 2rem)

}

.poster {
  max-height: 600px;
  height: 40rem;
  border-radius: 5px;
  width: auto;
}

.info {
  flex: 3;
  max-width: 55rem;
  height: 100vh;
}

.meta {
  padding: 0 5rem 0 2rem;
  margin-bottom: 5rem;

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
}

.recommendations {
  align-self: flex-end;
  height: auto;
  padding: 0 5rem 0 2rem;
  box-sizing: border-box;
  width: auto;

    &__title {
    font-size: 2rem;
  }
}

.scroll-content {
  @include flex(row, flex-start, center, 0);
  width: fit-content;
}

.scroll-item {
  @include flex(column, center, center, 1rem);
  width: 15rem;
  margin: 1.5rem;
  flex-shrink: 0;
  text-align: center;
  overflow-wrap: anywhere;

  &__image {
    border-radius: 0.5rem;
  }
}
</style>