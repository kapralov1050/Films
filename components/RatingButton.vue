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
    <template v-else>
      <Button @click="toggleRateBlock">
        Rate
      </Button>
      <el-rate 
        v-show="rateBlockVisible"
        v-model="userRating"
        @change="rateMovie(movieId, userRating)"
        :max="10"
        show-score
        score-template="{value} /10"/>
    </template>
  </div>
</template>

 
<script setup lang="ts">
import { StarFilled } from '@element-plus/icons-vue';
import { useRate } from '~/composables/UseRate';

const props = defineProps({
  movieId: {
    type: Number,
    required: true
  }
})

const { getRating, rateMovie, removeRating } = useRate()
const rateBlockVisible = ref(false)
const userRating = ref(0)

const currentRating = computed(() => getRating(props.movieId))

const toggleRateBlock = () => {
  rateBlockVisible.value = !rateBlockVisible.value
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
}
</style>