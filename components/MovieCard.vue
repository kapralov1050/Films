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
        <div class="movie-card-item__rating-block">
            <el-icon class="movie-card-item__rate-icon"><StarFilled /></el-icon>
            <span class="movie-card-item__average movie-card-item__rating-item">{{ movie.averageRating }}</span>
            <span class="movie-card-item__votes movie-card-item__meta-item">{{ formattedVotes }}</span>
            <el-button class="movie-card-item__rate-button" @click="rateMovie" text type="primary">
            <el-icon><Star /></el-icon>
            Rate
            <RatingWindow :movie-title="movie.primaryTitle"/>
            </el-button>
        </div>
    </div>
    <div class="movie-card-item__right-info-button">
    <el-button text circle>
        <el-icon><InfoFilled /></el-icon>
    </el-button>
    </div>
</div>
</template>



<script setup>
import { computed } from 'vue';
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

const emit = defineEmits(['rate', 'showDetails']);

const formattedVotes = computed(() => {
    const votes = props.movie.numVotes
    return votes <= 1000000 
    ? `(${(votes/1000).toFixed(0)}K)` : votes >= 1000000 
    ? `(${(votes/1000000).toFixed(1)}M)` : votes
})

const formattedDuration = computed(() => {
    const duration = props.movie.runtimeMinutes
    return duration ? `${Math.floor(duration / 60)}h ${duration % 60}m` : 'N/A'
})

const rateMovie = () => {
    ratingStore.isModalOpen = !ratingStore.isModalOpen
}
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
  display: flex;
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
    display: inline-block;
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