<template>
  <h1> {{ listStore.listName }} </h1>
  <ul>
    <li v-for="movie in listStore.moviesInList">
      <NuxtImg
        class="movie-card__poster"
        :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
        :alt="movie.original_title"
        loading="lazy"
        format="webp"
      />
    </li>
  </ul>
</template>


<script setup lang='ts'>
const listStore = useListStore()
</script>


<style scoped lang='scss'>

</style>