import {defineStore} from 'pinia'
import type { Film } from '~/types/film'

export const useMoviesStore = defineStore('moviesStore', () => {
  const selectedMoviesList = ref<Film[]>([])
  const totalWatched = 0
  const currentPage = ref(1)

  async function getPopularMovieList() {
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

  return {
    getPopularMovieList,
    selectedMoviesList,
    totalWatched,
    currentPage
  }
})
