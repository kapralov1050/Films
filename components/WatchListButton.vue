<template>
  <el-button @click="$emit('handleWatchListClick')" text circle>
    <el-icon :size="25">
      <CollectionTag 
        :color="props.isInWatchlist ? 'rgb(255, 217, 0)' : 'rgb(0, 0, 0)'"
      />
    </el-icon>
  </el-button>
</template>


<script setup lang="ts">
import { CollectionTag } from '@element-plus/icons-vue';

const props = defineProps<{
  isInWatchlist: boolean
}>()
</script>
