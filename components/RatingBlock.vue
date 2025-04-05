<template>
    <section class="rating-group">
      <div class="rating-block">
        <span class="user-rate__title">IMDb RATING</span>
        <div class="rating-stat">
          <el-icon :size="50" class="rating-stat__star-item">
            <StarFilled />
          </el-icon>
          <div class="rating-stat__info">
            <span>
              <span class="rating-stat__rating">{{ rating }}</span>
              <span>/10</span>
            </span>
            <span class="rating-stat__votes">{{ votes }}</span>
          </div>
        </div>
      </div>
      <div class="user-rate">
        <span class="user-rate__title">YOUR RATING</span>
        <div v-if="!rated" class="user-rate__meta">
          <el-button 
            class="user-rate__button" 
            @click="centerDialogVisible = true" 
            type="info" 
            text 
            :icon="Star" 
            round
          >
            Rate
          </el-button>
          <el-dialog 
            v-model="centerDialogVisible" 
            title="Rate" 
            width="fit-content" 
            center
          >
            <el-button 
              v-for="(star, index) in 10" 
              @click="handleRate(index)" 
              @mouseover="hoveredIndex = index" 
              @mouseleave="hoveredIndex = -1" 
              link
            >
              <el-icon :size="50" class="rating-stat__star-item">
                <transition name="fade-star" mode="out-in">
                  <StarFilled v-if="index <= hoveredIndex" key="filled"/>
                  <Star v-else key="regular"/>
                </transition>
              </el-icon>
            </el-button>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">
                  Cancel
                </el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                  Confirm
                </el-button>
              </div>
            </template>
          </el-dialog>
        </div>
        <div v-if="rated" class="user-rate__meta">
          <el-icon :size="50" class="rating-stat__star-item">
            <StarFilled />
          </el-icon>
          <div class="rating-stat__info">
            <span>
              <span class="rating-stat__rating">{{ rated }}</span>
              <span>/10</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  </template>


<script setup>
import { StarFilled, Star } from '@element-plus/icons-vue';

const props = defineProps({
  rating: Number,
  votes: Number,
  id: String,
});

const centerDialogVisible = ref(false);
const hoveredIndex = ref(0);

const rated = useLocalStorage(`movie-rating-${props.id}`, 0);

const handleRate = (index) => {
  rated.value = index + 1;
};
</script>


<style scoped lang="scss">
.rating-group {
  @include flex(row, space-between, flex-start, 2rem);
}

.rating-block {
  @include flex(column, center, flex-end, 0.5rem);
}

.rating-stat {
  @include flex(row, space-between, center, 1rem);
  font-size: 1.5rem;
  color: rgb(199, 199, 199);

  &__star-item {
    color: $star-color;
  }

  &__info {
    @include flex(column, space-around, flex-start, 0);
  }
  
  &__rating {
    font-size: 2rem;
    color: $star-color;
  }

  &__votes {
    font-size: 1rem;
    color: rgb(199, 199, 199);
  }
}

.user-rate {
  @include flex(column, center, center, 0.5rem);

  &__title {
    display: block;
  }
  
  &__button {
    font-size: 1.5rem;
    color: rgb(0, 98, 211);
  }

  &__button:hover {
    color: rgb(44, 44, 44);
  }

  &__meta {
    @include flex(row, space-around, center, 1rem);
    font-size: 1.5rem;
    color: rgb(199, 199, 199);
  }
}

.el-icon {
  transition: all 0.1s ease-in-out;
}

.el-icon:hover {
  transform: scale(1.1);
}

.fade-star-enter-active,
.fade-star-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}

.fade-star-enter-from,
.fade-star-leave-to {
  transform: scale(1.2);
}
</style>