<template>
  <div class="grid gap-3">
    <el-button class="view-button" text :icon="Picture" @click="$emit('update:is-open', true)">
      Images
    </el-button>
    <el-image-viewer
      v-if="isOpen"
      :url-list="srcList"
      show-progress
      :initial-index="1"
      :preview-src-list="srcList"
      @close="$emit('update:is-open', false)"
    />
  </div>
</template>


<script setup lang='ts'>
import { Picture } from '@element-plus/icons-vue';
import type { PersonImages } from '~/types/common';

const props = defineProps<{
  images: PersonImages[]
  isOpen: boolean
}>()

const srcList = computed(() => props.images.map(image => `https://image.tmdb.org/t/p/w500${image.file_path}`))


onMounted(() => {
  console.log(srcList)
})
</script>


<style scoped lang='scss'>
.view-button {
  font-size: 2rem;
}
</style>