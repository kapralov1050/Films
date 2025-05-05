<template>
  <el-form>
    <el-form-item label="Add Movies" label-position="left">
      <el-input 
        v-model="listStore.movieToAddToList" 
        @input="deboucedHandleInput" 
        placeholder="Search for a movie..."
      />
    </el-form-item>
    <el-scrollbar max-height="30rem">
      <ul 
        element-loading-text="Loading..."
        class="suggestions-list" 
      >
        <li 
          class="suggestions-list__item"
          v-for="movie in searchSuggestions" 
          :key="movie.id"
        >
          <MiniMovieCard 
            class="suggestions-list__movie" 
            :movie="movie"
          />
          <el-button 
            circle 
            :icon="Plus" 
            @click="addMovieToList(movie.id)" 
            :loading="isInAddingState" 
            :disabled="isInAddingState"
          />
        </li>
      </ul>
    </el-scrollbar>
  </el-form>
</template>


<script setup lang='ts'>
import { Plus } from '@element-plus/icons-vue'
import { debounce } from '~/helpers/debounce'

const listStore = useListStore()
const searchStore = useSearchMovieStore()
const isInAddingState = ref(false)

const searchSuggestions = computed(() => {
  if (searchStore.searchedMovies) 
    return searchStore.searchedMovies.results.slice(0, 20)  
})

async function handleInput() {
  const searchedMoviesToAdd = await searchStore.searchMovie(listStore.movieToAddToList)
  searchStore.searchedMovies = searchedMoviesToAdd
}

const deboucedHandleInput = debounce(handleInput, 1000)

async function addMovieToList(movieId: number) {
  isInAddingState.value = true
  try {
    const response = await listStore.addMovieToList(movieId)
    listStore.movieToAddToList = ''
    searchStore.searchedMovies = null
  } catch (error) {
    console.error('Error while add new movie:', error)
  } finally {
    isInAddingState.value = false
  }
}
</script>


<style scoped lang='scss'>
.el-form {
  padding: 2rem;
  border: 1px solid rgb(206, 206, 206);
  box-shadow: 0 2px 5px rgb(209, 209, 209);
  border-radius: 0.5rem;
}

.suggestions-list {
  margin: 1rem 0 0 1rem;
  width: inherit;

  &__item {
    @include flex(row, space-between, center, 0);
    width: inherit;
    padding-right: 2rem;
  }

  &__movie {
    margin-top: 1.5rem;
    padding: 0.5rem;
  }
}
</style>