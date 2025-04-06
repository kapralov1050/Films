export const useSearchMovieStore = defineStore('searchMovieStore', () => {
  const currentPage = ref(1)
  const isLoading = ref(false)
  const searchValue = ref('')
  const searchedMovies = ref({})

  async function searchMovie(queryInput: string) {
    try{
      const response = await instance.get('search/movie', {
        params: {
          query: queryInput,
          page: currentPage.value
        }
      })
      const data = response.data
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return {
          searchValue,
          searchMovie,
          searchedMovies,
          currentPage,
          isLoading
        }
})