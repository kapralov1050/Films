import type { Movie, movieRating } from '~/types/common';

export const useRatingStore = defineStore('ratingStore', () => {
  const authStore = useAuthStore()
  const { postRating, clearRating } = useRate()
  const ratings = ref<movieRating[]>([])
  const ratedMovies = ref<Movie[]>([])

  async function rateMovie(movieId: number, rating: number) {
    try {
      const response = await postRating(movieId, rating)
      if (response.data.status_code === 1) {
        await getRatedMovies()
      }
      return response.data.status_code === 1 ? true : false
    } catch (error) {
      throw error
    }
  }

  const getRatedMovies = async () => {
    try {
      if(!authStore.userData) return
      const { data } = await instance.get(`account/${authStore.userData.id}/rated/movies`, {
        params: {
          session_id: authStore.sessionId
        }
      })
      ratings.value = data.results.map((movie: any) => ({
        id: movie.id,
        rating: movie.rating
      }))
      return data.results
    } catch (error) {
      console.error(error)
      return [];
    } 
  }

  async function removeRating(movieId: number) {
    try {
      ratings.value = ratings.value.filter((item: {id: number, rating: number}) => item.id !== movieId);
      const response = await clearRating(movieId)
      if (response.data.status_code === 13) return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const getRating = (id: number, userRating: number) => {
    const ratedMovie = ratings.value.find(item => item.id === id)
    return ratedMovie?.rating ? ratedMovie.rating : userRating > 0 ? userRating : null
  }
  
  return {
    ratings,
    ratedMovies,
    rateMovie,
    getRatedMovies,
    removeRating,
    getRating,
  }
})