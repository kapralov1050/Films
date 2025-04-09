<template>
  <el-pagination
    background
    :current-page="props.page"
    :total="props.totalresults"
    layout="prev, pager, next"
    @current-change="handlePageChange"
  />
</template>


<script setup lang="ts">
import type {paginationParams} from "~/types/common"

const props = defineProps<paginationParams>()
const emit = defineEmits(['update:page']);

const handlePageChange = (newPage: number) => {
  emit('update:page', newPage);
};
</script>


<style>
</style>