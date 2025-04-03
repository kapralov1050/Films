<template>
<el-dialog class="watch-list" v-model="userStore.isWatchListVisible" title="WatchList" width="fit-content" center>
    <ul class="watch-list__items">
        <li class="watch-list__item" 
            v-for="(movie, idx) in watchlist.userWatchList" 
            :key="movie.id"
        >
            <MovieCard
                class="watch-list__movie-card"
                :movie="movie"
                :index="idx" 
            />
            <el-button class="watch-list__delete-button"></el-button>
        </li>
    </ul>
</el-dialog>
</template>


<script setup>
import MovieCard from './MovieCard.vue';

const userStore = UseUserStore()
const watchlist = UseWatchListStore()


</script>


<style lang="scss" scoped>
.watch-list{

    &__items{
        border: 1px solid gray;
        border-radius: 10px;
        padding: 1rem;
    }

    &__item{
        @include flex(row, center, center,0)
    }
}
</style>