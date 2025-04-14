<template>
  <el-button @click="addorRemoveMovie" text circle>
    <el-icon :size="25">
      <CollectionTag :color="isInWatchList ? 'rgb(255, 217, 0)' : 'rgb(0, 0, 0)'"/>
    </el-icon>
  </el-button>
</template>


<script setup lang="ts">
import { CollectionTag } from '@element-plus/icons-vue';
import type { Film } from "~/types/common"

const props = defineProps<{
  movie: Film
}>()

const authStore = useAuthStore()
const isInWatchList = ref(false)
const { loginWithTmdb } = useAuth()

const addorRemoveMovie = () => {
  if(authStore.sessionId) {
    isInWatchList.value = !isInWatchList.value
    authStore.addToWatchList(props.movie.id, isInWatchList.value)
  } else {
    const returnPath = encodeURIComponent(useRoute().path)
    localStorage.setItem('return_path', returnPath)
    localStorage.setItem('pending_watchlist_action', JSON.stringify({
      [props.movie.id]: !isInWatchList.value
    }))
    loginWithTmdb()
  }
}



onMounted( async () => {
  await authStore.processPendingActions(props.movie.id)
  if(authStore.watchListMovies) {
    isInWatchList.value = authStore.watchListMovies.some( item => item.id === props.movie.id)
  }
})

</script>


<style scoped>

</style>