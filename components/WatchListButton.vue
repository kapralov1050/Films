<template>
  <el-button @click="addToWatchList(movie)" text circle>
    <el-icon :size="25">
      <CollectionTag :color="isInWatchList(movie) ? 'rgb(255, 217, 0)' : 'rgb(0, 0, 0)'"/>
    </el-icon>
  </el-button>
</template>


<script setup lang="ts">
import { CollectionTag } from '@element-plus/icons-vue';
import type { Film } from "~/types/common"

const props = defineProps<{
  movie: Film | null
}>()

const {isInWatchList, addToWatchList } = useWatchList()
</script>


<style scoped>

</style>