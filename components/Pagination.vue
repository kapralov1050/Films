<template>
  <vue-awesome-paginate
    :items-per-page="5"
    :max-pages-shown="5"
    v-model="moviesStore.currentPage"
  />
</template>


<script setup lang="ts">
const moviesStore = useMoviesStore()
</script>


<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }

  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(243, 243, 243);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }

  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }

  .active-page {
    background-color:rgb(50.8, 116.6, 184.5);

    border: 1px solid #CFD3DC;

    color: white;
  }

  .active-page:hover {
    background-color: #E5EAF3;
  }
</style>