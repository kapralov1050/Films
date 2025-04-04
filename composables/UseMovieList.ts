export const UseMovieList = () => {
    const moviesStore = UseMoviesStore()
    const { moviesListOptions } = storeToRefs(moviesStore)
    const isMenuVisible = ref(false)
    
    function toggleMenu() {
    isMenuVisible.value = !isMenuVisible.value
    }

    function handleSelect(option: string) {
        moviesStore.MovieListOption = option 
        toggleMenu()
      }
  
    return {
        isMenuVisible,
        handleSelect,
        toggleMenu,
        moviesListOptions
    }
}