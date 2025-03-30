<template>
<div class="movie-card-item">
    <div class="movie-card-item__primary-img-block">
    <NuxtLink :to="`/users/${movie.id}`">
        <el-image
        class="movie-card-item__primary-img"
        :src="movie.primaryImage"
        :fit="fit"
        :alt="movie.originalTitle"
        />
    </NuxtLink>
    </div>
    <div class="movie-card-item__info">
        <h3 class="movie-card-item__title">{{ index + 1 }}. {{ movie.primaryTitle }}</h3>
        <div class="movie-card-item__meta">
            <span class="movie-card-item__year movie-card-item__meta-item">{{ movie.startYear }}</span>
            <span class="movie-card-item__duration movie-card-item__meta-item">{{ formattedDuration }}</span>
            <span class="movie-card-item__rating-block movie-card-item__meta-item">{{ AgeRating[movie.contentRating] }}</span>
        </div>
    </div>
    <div class="movie-card-item__rating-block">
      <RatingButton :rating="movie.averageRating" :votes="movie.numVotes" :id="movie.id"/>
    </div>
</div>
</template>



<script setup>
import { computed } from 'vue';
import RatingButton from '~/components/RatingButton.vue'
import { StarFilled, Star, InfoFilled } from '@element-plus/icons-vue';
import { AgeRating } from '~/types/ageRatings'

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['showDetails']);

const movieDetailsStore = UseMovieDetailsStore()

const formattedVotes = computed(() => {
 return movieDetailsStore.formatVotes(props.movie.numVotes)
})

const formattedDuration = computed(() => {
  return movieDetailsStore.formatVotes(props.movie.runtimeMinutes)
})
</script>




<style scoped lang="scss">
@mixin flex($direction: row, $justify: flex-start, $align: stretch, $gap: 0) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  gap: $gap;
}


.movie-card-item {
  @include flex(row, space-between, center,0);
  width: inherit;

  &__primary-img-block {
    width: 10%;
    margin-right: 20px;
  }

  &__primary-img {
    width: 72px;
    height: 106px;
    object-fit: cover;
    border-radius: 10px;
  }

  &__info {
    @include flex(column, center, flex-start, 8px);
    flex: 1;
  }

  &__meta {
    display: inline-block;
  }

  &__meta-item {
    margin-right: 10px;
    color: rgb(99, 99, 99);
  }

  &__rating-block {
    transform-origin: right top;
    padding-right: 20px;
  }

  &__rating-item {
    margin-right: 5px;
  }
  
  &__rate-icon {
    color: rgb(255, 188, 4);
  }

  &__right-info-button {
    width: 10%;
    @include flex(row, center, center, 0);
  }
}
</style>