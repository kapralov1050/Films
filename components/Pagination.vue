<template>
  <ul class="pagination" v-if="totalresults > 2">
      <li class="pagination__item" @click="currentPage--" :disabled="currentPage === 1">
       < 
      </li>
      <li @click="handleClick(1)" class="pagination__item" :class="{'active': currentPage === 1}"> 1 </li>
      <li v-if="farFromStart" @click="currentPage -= 5" :disabled="currentPage === 1"> . . . </li>
      <ul style="display: flex;" >
          <li v-for="(item, index) in showedPages" class="pagination__item" :class="{'active': item === currentPage}" @click.self="handleClick(item)">
              {{ item }}
          </li>
      </ul>
      <li v-if="farFromEnd" @click="currentPage += 3" :disabled="currentPage >= totalresults"> . . . </li>
      <li @click="handleClick(totalresults)" class="pagination__item" :class="{'active': currentPage === totalresults}"> {{ totalresults }} </li>
      <li class="pagination__item" @click="currentPage++" :disabled="currentPage > totalresults - 1">
       >
      </li>
  </ul>
</template>
  
  
<script setup lang="ts">
import type { paginationParams } from '~/types/common';

const props = defineProps<paginationParams>()
const emit = defineEmits(['update:page']);

const currentPage = ref(props.page)
const from = computed(() => Math.max(2, currentPage.value - 2))
const to = computed(() => Math.min(props.totalresults, currentPage.value + 3))
const farFromEnd = computed(() => currentPage.value + 2 < props.totalresults)
const farFromStart = computed(() => currentPage.value > 4)
const showedPages = computed(() => Array.from({length: to.value - from.value}, ( __, index) => from.value + index))

function handleClick(newPage: number) {
  currentPage.value = newPage
  emit('update:page', newPage);
  console.log(currentPage.value)
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
  }
  
  &__item:hover {
      background-color: rgb(84, 151, 252);
      cursor: pointer;
  }
}

.active {
  color: blue;
  background-color: rgb(231, 231, 231);
  border-radius: 25%;
}
</style>
