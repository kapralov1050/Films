import {defineStore} from 'pinia'
import type { Film } from '~/server/api/film'

export const useMoviesStore = defineStore('moviesStore', () => {
  const selectedMoviesList = ref<Film[]>([])
  const totalWatched = 0
  const currentPage = ref(1)
  const searchedMovies = ref({})

  async function getMoviesList() {
      try{
          const response = await instance.get('movie/popular', {
            params: {
              language: 'en-US',
              page: currentPage.value
            }
          })
          const data = response.data
          return data
        } catch (error) {
          console.log(error)
        }
  }

  async function searchMovie(queryInput: string) {
    try{
      const response = await instance.get('search/movie', {
        params: {
          query: queryInput
        }
      })
      const data = response.data
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return {
          getMoviesList,
          searchMovie,
          selectedMoviesList,
          searchedMovies,
          totalWatched,
          currentPage
        }
})
