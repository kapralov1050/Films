<template>
  <div class="rating-control">
    <template v-if="currentRating !== null">
    <el-icon 
      :size="30"
      class="rating-control__star"
      @click="removeRating(movieId)"
    >
      <StarFilled color="rgb(50.8, 116.6, 184.5)" />
    </el-icon>
    <span class="rating-control__value">
      {{ currentRating }} /10
    </span>
    </template>
    <template v-else v-loading="isLoading">
      <Button @click="toggleRateBlock">
        Rate
      </Button>
      <el-rate 
        v-show="rateBlockVisible"
        v-model="userRating"
        @input="handleRateMovie"
        :max="10"
        show-score
        score-template="{value} /10"/>
    </template>
  </div>
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
const { sessionId, userData } = storeToRefs(authStore)
const { getRating, rateMovie, removeRating } = ratingStore
const rateBlockVisible = ref(false)
const userRating = ref(0)
const isLoading = ref(false)

const currentRating = ref<number | null>(null)
watchEffect(() => {
  currentRating.value = getRating(props.movieId)
})

const handleRateMovie = async () => {
  isLoading.value = true
  try {
    await rateMovie(props.movieId, userRating.value)
    await loadRating()
    rateBlockVisible.value = false
  } catch (error) {
    console.log('Rating failed', error)
  } finally {
    isLoading.value = false;
  }
}

async function loadRating() {
  try {
    if(userData.value?.id && sessionId.value) {
      await ratingStore.getRatedMovies(userData.value.id)
    }
  } catch (error) {
    console.log('error loading rating', error)
  }
}

const toggleRateBlock = () => {
  rateBlockVisible.value = !rateBlockVisible.value
}

onMounted(() => {
  loadRating()
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
}
</style>