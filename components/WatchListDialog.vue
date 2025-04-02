<template>
<el-dialog v-model="userStore.isWatchListVisible" title="WatchList" width="fit-content" center>
    <ul>
        <li v-for="movie in watchlist.userWatchListStorage" :key="movie.id">
            {{ movie.primaryTitle }}
        </li>
    </ul>
</el-dialog>
</template>



<script setup>
const userStore = UseUserStore()
const watchlist = UseWatchListStore()


</script>




<style scoped>

</style>