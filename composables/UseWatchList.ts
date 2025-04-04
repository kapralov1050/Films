export const UseWatchList = () => {
    const isWatchListVisible = ref(false)
    const watchlist = UseWatchListStore()
    const {userWatchList} = storeToRefs(watchlist)
    const moviesStore = UseMoviesStore()


    function openWatchlist() {
        isWatchListVisible.value = true;
      }

    function addToUserWatchList(index: number) {
        const movieToPush = moviesStore.selectedMoviesList[index]
        if(!userWatchList.value.some(movie => movie.id === movieToPush.id)) {
            userWatchList.value.push(movieToPush);
        } 
    }

    return {
        isWatchListVisible,
        userWatchList,
        openWatchlist,
        addToUserWatchList
    }
}