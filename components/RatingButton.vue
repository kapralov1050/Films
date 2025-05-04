<template>
  <section class="rating-control">
    <div 
      class="rating-control__item" 
      v-if="currentRating !== null"
    > 
      <el-button 
        @click="handleRemoveRating" 
        text 
        size="small" 
        circle 
        :disabled="isLoading"
      >
        <el-icon 
          :size="30"
          class="rating-control__star"
        >
          <StarFilled color="rgb(50.8, 116.6, 184.5)" />
        </el-icon>
      </el-button>
      <span class="rating-control__value">
        {{ currentRating }} /10
      </span>
    </div>
    <div 
      class="rating-control__item" 
      v-else 
      v-loading="isLoading"
    >
      <el-button 
        class="rating-control__rate-button"
        @click="toggleRateBlock"
        type="info" 
        text 
        :icon="Star" 
        :disabled="isLoading"
        round
      >
        Rate
      </el-button>
      <el-rate 
        v-show="rateBlockVisible"
        v-model="userRating"
        @change="handleRateMovie"
        :max="10"
        show-score
        :loading="isLoading"
        score-template="{value} /10"
      />
    </div>
  </section>
</template>

 
<script setup lang="ts">
import { Star, StarFilled } from '@element-plus/icons-vue';

const props = defineProps({
  movieId: {
    type: Number,
    required: true
  }
})

const ratingStore = useRatingStore()
const authStore = useAuthStore()
const { loginWithTmdb } = useAuth()
const rateBlockVisible = ref(false)
const userRating = ref(0)
const isLoading = ref(false)
const currentRating = computed<number | null>(() => {
  return ratingStore.getRating(props.movieId)
})

const handleRateMovie = async () => {
  isLoading.value = true
  try {
    if(!authStore.userData) return
    const movieWasRated = await ratingStore.rateMovie(props.movieId, userRating.value)
    if(movieWasRated) {
      await ratingStore.getRatedMovies(authStore.userData.id)
    }
    rateBlockVisible.value = false
  } catch (error) {
    console.log('Rating failed', error)
  } finally {
    isLoading.value = false;
  }
}

const toggleRateBlock = () => {
  if(!authStore.sessionId) {
    loginWithTmdb() 
  } else {
    rateBlockVisible.value = !rateBlockVisible.value
  }
}

const handleRemoveRating = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  ratingStore.removeRating(props.movieId)
  isLoading.value = false
}
</script>


<style scoped lang="scss">
.rating-control {
  @include flex(row, center, center, 0);
  padding-left: 1rem;

  &__star {
    color: $star-color;
    padding-right: 0.5rem;
  }

  &__item {
    @include flex(row, center, center, 0)
  }

  &__rate-button {
    font-size: 1rem;
    color: rgb(0, 98, 211);
  }
}
</style>