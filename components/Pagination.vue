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
  const props = defineProps({
    page: {type: Number, default: true},
    totalresults: {type: Number, default: true}
  })
  const emit = defineEmits(['update:page']);
  
  const handlePageChange = (newPage: number) => {
    emit('update:page', newPage);
  };
</script>


<style>

</style>