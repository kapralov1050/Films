import type { WatchListResponse } from "~/types/common"

export const useSearchMovieStore = defineStore('searchStore', () => {
const currentPage = ref(1)
const searchValue = ref('')
const searchedMovies = ref<WatchListResponse | null>()

async function searchMovie(queryInput: string) {
  try {
    const response = await instance.get('search/movie', {
      params: {
        query: queryInput,
        page: currentPage.value
      }
    })
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
  }
}

  return {
    searchValue,
    searchMovie,
    searchedMovies,
    currentPage
  }
})