<template>
  <section class="rating-control">
    <div 
      class="rating-control__item" 
      v-if="currentRating !== null"
    >
      <el-icon 
        :size="30"
        class="rating-control__star"
        @click="handleRemove"
      >
        <StarFilled color="rgb(50.8, 116.6, 184.5)" />
      </el-icon>
      <span class="rating-control__value">
        {{ currentRating }} /10
      </span>
    </div>
    <div 
      class="rating-control__item" 
      v-else 
      v-loading="isLoading"
    >
      <Button @click="toggleRateBlock">
        Rate
      </Button>
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
import { StarFilled } from '@element-plus/icons-vue';

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
const currentRating = ref<number | null>(null)

const handleRateMovie = async () => {
  isLoading.value = true
  try {
    const isRated = await ratingStore.rateMovie(props.movieId, userRating.value)
    if (isRated) currentRating.value = userRating.value
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

const handleRemove = () => {
  isLoading.value = true
  const isRemoved = ratingStore.removeRating(props.movieId)
  if(isRemoved) currentRating.value = null
  isLoading.value = false
}

onMounted( async () => {
  currentRating.value = ratingStore.getRating(props.movieId)
})
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
}
</style>