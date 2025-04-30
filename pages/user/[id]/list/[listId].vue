<template>
  <section>
    <section class="list-buttons">
      <h1 class="list-title"> {{ listStore.listDetails?.name }} </h1>
      <div>
        <el-button round :icon="CloseBold" type="primary" @click="handleDeleteList">
          Delete List
        </el-button>
        <el-button round :icon="Finished" type="primary" @click="handleClearList">
          Clear List
        </el-button>
        <el-button round :icon="EditPen" type="primary" @click="showAddMoviesModal = true">
          Add Movies
        </el-button>
        <el-dialog v-model="showAddMoviesModal" @close="handleCloseModal">
              <template #header>
                <h1> Editing List </h1>
              </template>
          <AddMoviesToListForm />
        </el-dialog>
      </div>
    </section>
    <section class="list-info">
      <p class="list-info__description">
        {{ listStore.listDetails?.description || "No description entered." }}
      </p>
      <p v-if="listStore.moviesInList.length">Average Rating: {{ average }}</p>
    </section>
    <ul class="movies-list">
      <li v-for="movie in listStore.moviesInList" class="movies-list__item">
        <div class="movies-list__item-info">
          <h1> {{ movie.original_title }} ( rating: {{ movie.vote_average.toFixed(1) }})</h1>
          <time :datetime="movie.release_date" class="movies-list__item__year">
            {{ dateToYear(movie.release_date) }}
          </time>
        </div>
        <el-button text circle :icon="CloseBold" @click="handleMovieRemove(movie.id)" :disabled="isDeleting" />
      </li>
    </ul>
  </section>
</template>

  
<script setup lang='ts'>
import { CloseBold, EditPen, Finished, StarFilled } from '@element-plus/icons-vue'
import { averageRating } from '~/helpers/averagerating'
import { dateToYear } from '~/helpers/formatDate'

definePageMeta({
  layout: 'userpage',
  middleware: 'auth'
})

const listStore = useListStore()
const authStore = useAuthStore()
const showAddMoviesModal = ref(false)
const isDeleting = ref(false)
const average = computed(() => averageRating(listStore.moviesInList))

const handleMovieRemove = async (movieId: number) => {
  isDeleting.value = true
  try {
    if(listStore.listId) await listStore.deleteMovieFromList(movieId, listStore.listId)
    ElMessage.success('Movie removed from list')
  } catch (error) {
    console.log(error)
  } finally {
    isDeleting.value = false
  }
}

const handleDeleteList = async () => {
  isDeleting.value = true
  try {
    if(listStore.listId) await listStore.deleteList(listStore.listId)
    ElMessage.success('List deleted')
    const username = authStore.userData?.username;
    navigateTo(`/user/${username}/lists`)
  } catch (error) {
    console.log(error)
  } finally {
    isDeleting.value = false
  }
}

const handleClearList = async () => {
  try {
    if(listStore.listId) await listStore.clearList(listStore.listId)
    ElMessage.success('List was successfully cleared')
  } catch(error) {
    console.log(error)
  }
}

const handleCloseModal = async () => {
  try {
    if(listStore.listId) {
    const response = await listStore.loadListDetails(listStore.listId)
    if (response) {
      listStore.moviesInList = response?.items
      }
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  if(listStore.listId) {
    const response = await listStore.loadListDetails(listStore.listId)
    if (response) {
      listStore.moviesInList = response?.items
      listStore.listDetails = response
    }
  }
})
</script>
  
  
<style scoped lang='scss'>
.list-buttons {
  @include flex(row, space-between, flex-end, 2rem)
}

.list-title {
  margin-left: 1rem;
  font-size: 3rem;
  color: rgb(255, 217, 0);
}

.list-info {
  @include flex(row, space-between, center, 1rem);
  width: 100%;
  padding: 2rem 1rem;
  margin: 1.5rem 0 3rem 0;
  color:rgb(50.8, 116.6, 184.5);
  flex-wrap: wrap;
  border: 1px solid rgb(255, 217, 0);
  border-radius: 2rem;
  background-color: rgb(255, 255, 255);

  &__description {
    overflow-wrap: anywhere;
  }
}

.movies-list {
  @include flex(column, flex-start, flex-start, 1rem);
  
  &__item {
    @include flex(row, space-between, center, 1rem);
    box-shadow: 0 2px 5px rgb(209, 209, 209);
    padding: 1rem;
    width: 100%;

    &__year {
      padding-top: 1rem;
      color: rgb(99, 99, 99);
    }
  }

  &__item-info {
    @include flex(column, center, flex-start, 0)
  }
}

.rating {
  width: fit-content;
} 
</style>