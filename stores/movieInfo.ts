import {defineStore} from 'pinia'
import { type Movie, type PersonDetails, type PersonInCast } from '~/types/common'

export const useMovieDetailsStore = defineStore('MovieDetailsStore', () => {
  const selectedMovie = ref<Movie>()
  const movieCast = ref<PersonInCast[]>()
  const movieRecommendations = ref<Movie[]>()
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
        console.error('error while loading movie details', error)
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