<template>
  <el-form>
    <el-form-item label="AddItems" label-position="left">
      <el-input v-model="listStore.movieToAdd" @input="debounce(handleInput, 1000)" placeholder="Search for a movie..."/>
    </el-form-item>
    <p> {{ searchStore.searchedMovies ? searchStore.searchedMovies : 'There are no items added to this list.' }}</p>
  </el-form>
</template>


<script setup lang='ts'>
import { debounce } from '~/helpers/debounce'

const listStore = useListStore()
const searchStore = useSearchMovieStore()

async function handleInput() {
  const searchedMoviesToAdd = await searchStore.searchMovie(listStore.movieToAdd)
  searchStore.searchedMovies = searchedMoviesToAdd.results.slice(0, 20)
}
</script>


<style scoped lang='scss'>
.el-form {
  padding: 2rem;
  border: 1px solid rgb(206, 206, 206);
  box-shadow: 0 2px 5px rgb(209, 209, 209);
  border-radius: 0.5rem;
}

.el-form-item {
  @include flex(column, )
}
</style>