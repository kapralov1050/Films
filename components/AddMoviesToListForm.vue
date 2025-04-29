<template>
  <el-form>
    <el-form-item label="Add Movies" label-position="left">
      <el-input v-model="listStore.movieToAdd" @input="deboucedHandleInput" placeholder="Search for a movie..."/>
    </el-form-item>
    <el-scrollbar max-height="40rem">
      <ul 
        element-loading-text="Loading..."
        class="suggestions" 
      >
        <li 
          class="suggestion-item"
          v-for="movie in searchSuggestions" 
          :key="movie.id"
        >
          <MiniMovieCard class="suggestion-movie" :movie="movie"/>
          <el-button 
            circle 
            :icon="CirclePlus" 
            type="info" 
            @click="addMovieToList(movie.id)" 
            :loading="processAdd" 
          />
        </li>
      </ul>
    </el-scrollbar>
  </el-form>
</template>


<script setup lang='ts'>
import { CirclePlus } from '@element-plus/icons-vue'
import { debounce } from '~/helpers/debounce'

const listStore = useListStore()
const searchStore = useSearchMovieStore()
const processAdd = ref(false)

const searchSuggestions = computed(() => {
  if(searchStore.searchedMovies) return searchStore.searchedMovies.results.slice(0, 20)  
})

async function handleInput() {
  const searchedMoviesToAdd = await searchStore.searchMovie(listStore.movieToAdd)
  searchStore.searchedMovies = searchedMoviesToAdd
}

const deboucedHandleInput = debounce(handleInput, 1000)

async function addMovieToList(movieId: number) {
  if(processAdd.value) return

  processAdd.value = true
  try {
    const response = await listStore.addMovieToList(movieId)
    listStore.movieToAdd = ''
    searchStore.searchedMovies = null
    console.log(response)
  } catch (error) {
    console.log('Error while add new movie:', error)
  } finally {
    processAdd.value = false
  }
}

onMounted(async () => {
  if(listStore.listId) await listStore.loadListDetails(listStore.listId)
})
</script>


<style scoped lang='scss'>
.el-form {
  padding: 2rem;
  border: 1px solid rgb(206, 206, 206);
  box-shadow: 0 2px 5px rgb(209, 209, 209);
  border-radius: 0.5rem;
}

.suggestions {
  margin: 1rem 0 0 1rem;
}

.suggestion-item {
  @include flex(row, flex-start, center, 0);
  width: 70%;
}

.suggestion-movie {
  margin-top: 1.5rem;
  padding: 0.5rem;
}
</style>