import {defineStore} from 'pinia'
import { type PersonDetails, type PersonInCast } from '~/types/common'

export const UseMovieDetailsStore = defineStore('MovieDetailsStore', () => {
  const selectedMovie = ref({})
  const movieCast = ref<PersonInCast[]>()
  const movieRecommendations = ref({})
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

  async function getPersonDetails(id: string) {
    try {
      const response = await instance.get(`/person/${id}`, {
        params: { append_to_response: 'movie_credits,images'}
      })
      personDetails.value = response.data
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
    getPersonDetails,
    personDetails,
    formatDuration
  }
})