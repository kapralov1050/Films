import {defineStore} from 'pinia'
import { type Film, type PersonDetails, type PersonInCast } from '~/types/common'

export const UseMovieDetailsStore = defineStore('MovieDetailsStore', () => {
  const selectedMovie = ref<Film>()
  const movieCast = ref<PersonInCast[]>()
  const movieRecommendations = ref<Film[]>()
  const personDetails = ref<PersonDetails>()

  async function getMovieDetails(id:string) {
    try {
        const response = await instance.get(`movie/${id}`, {
          params: { append_to_response: 'credits,recommendations'}
        })
        selectedMovie.value = response.data
        movieRecommendations.value = response.data.recommendations.results
        movieCast.value = response.data.credits.cast
      } catch (error) {
        console.log(error)
        throw error
      } 
  }

  const formatDuration = (duration: number) => {
    return duration ? `${Math.floor(duration / 60)}h ${duration % 60}m` : 'N/A'
  }

  return {
    movieRecommendations, 
    selectedMovie, 
    getMovieDetails, 
    movieCast,
    personDetails,
    formatDuration
  }
})