import {defineStore} from 'pinia'
import type { Film } from '~/server/api/film'

export const UseMoviesStore = defineStore('moviesStore', () => {
    const selectedMoviesList = ref<Film[]>([])


  async function getMoviesList() {
      try{
          const response = await instance.get('popular', {
            params: {
              language: 'en-US',
              page: 1
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
          selectedMoviesList
        }
})
