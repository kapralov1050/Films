<template>
  <section class="rating-control">
    <div 
      class="rating-control__item" 
      v-if="currentRating !== null"
      v-loading="isLoading"
    > 
      <el-button 
        @click="handleRatingRemove" 
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
        @click="toggleRate"
        type="info" 
        text 
        :icon="Star" 
        :disabled="isLoading"
        round
      >
        Rate
      </el-button>
      <el-rate 
        v-show="isRateButtonVisible"
        v-model="userRating"
        @change="handleMovieRate"
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

const isRateButtonVisible = ref(false)
const userRating = ref(0)
const isLoading = ref(false)

const currentRating = computed<number | null>(() => {
  return ratingStore.getRating(props.movieId, userRating.value)
})

const handleMovieRate = async () => {
  isLoading.value = true
  
  try {
    if(!authStore.userData) return
    const movieWasRated = await ratingStore.rateMovie(props.movieId, userRating.value)
    console.log(movieWasRated)

    if(movieWasRated) {
      ElMessage.success('Movie was rated successfuly')
    } else {
      userRating.value = 0
      ElMessage.error('Failed rate attempt')
    }
  } catch (error) {
    console.log('error while rate movie', error)
    userRating.value = 0
  }

  isRateButtonVisible.value = false
  isLoading.value = false;
}

const toggleRate = () => {
  if(!authStore.sessionId) {
    loginWithTmdb() 
  } else {
    isRateButtonVisible.value = !isRateButtonVisible.value
  }
}

const handleRatingRemove = async () => {
  isLoading.value = true
  const isRemoved = await ratingStore.removeRating(props.movieId)
  if (isRemoved) {
    ElMessage.success('Rating has been deleted')
    userRating.value = 0
  }
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