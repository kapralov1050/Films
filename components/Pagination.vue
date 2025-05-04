<template>
  <ul 
    class="pagination" 
    v-if="totalPages > 2"
  >
    <li 
      class="pagination__item" 
      @click="handlePrevClick"
      v-if="currentPage > 1"
    >
      <el-icon><ArrowLeftBold /></el-icon>
    </li>
    <li 
      class="pagination__item" 
      :class="{ 'pagination__item--active': currentPage === 1 }" 
      @click="handleClick(1)"
    >
      1
    </li>
    <li 
      v-if="farFromStart" 
      class="pagination__item" 
      @click="handleJumpBack"
      :disabled="currentPage === 1"
    >
      ...
    </li>
    <ul class="pagination__pages-list">
      <li 
        v-for="item in showedPages" 
        class="pagination__item" 
        :class="{ 'pagination__item--active': item === currentPage }" 
        @click.self="handleClick(item)"
      >
        {{ item }}
      </li>
    </ul>
    <li 
      v-if="farFromEnd" 
      class="pagination__item" 
      @click="handleJumpForward"
      :disabled="currentPage >= totalPages"
    >
      ...
    </li>
    <li 
      class="pagination__item" 
      :class="{ 'pagination__item--active': currentPage === totalPages }" 
      @click="handleClick(totalPages)"
    >
      {{ totalPages }}
    </li>
    <li 
      class="pagination__item" 
      @click="handleNextCLick"
      v-if="currentPage < totalPages"
    >
      <el-icon><ArrowRightBold /></el-icon>
    </li>
  </ul>
</template>
  
  
<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import type { paginationParams } from '~/types/common';

const props = defineProps<paginationParams>()
const emit = defineEmits(['update:page']);

const currentPage = ref(props.page)
const totalPages = computed(() => {
  return props.totalResults >= 500 ? 500 : props.totalResults
})
const from = computed(() => Math.max(2, currentPage.value - 2))
const to = computed(() => Math.min(totalPages.value, currentPage.value + 3))
const farFromEnd = computed(() => currentPage.value + 2 < totalPages.value)
const farFromStart = computed(() => currentPage.value > 4)
const showedPages = computed(() => Array.from({length: to.value - from.value}, ( __, index) => from.value + index))

function handleClick(newPage: number) {
  currentPage.value = newPage
  emit('update:page', newPage);
}

function handlePrevClick()  {
  currentPage.value--
  emit('update:page', currentPage.value);
}

function handleNextCLick() {
  currentPage.value++
  emit('update:page', currentPage.value);
}

function handleJumpBack() {
  currentPage.value = Math.max(1, currentPage.value - 5)
  emit('update:page', currentPage.value);
}

function handleJumpForward() {
  currentPage.value = Math.min(totalPages.value , currentPage.value + 5)
  emit('update:page', currentPage.value);
}
</script>


<style scoped lang="scss">
.pagination {
  height: 20rem;
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &__item {
    padding: 1rem;
    cursor: pointer;

    &:hover {
      background-color: rgb(84, 151, 252);
      border-radius: 1rem;
      cursor: pointer;
    }

    &--active {
      color: rgb(0, 0, 0);
      background-color: rgb(231, 231, 231);
      border-radius: 1rem;
    }
  }

  &__pages-list {
    display: flex;
  }  
}
</style>
