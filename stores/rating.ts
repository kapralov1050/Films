import type { Film, movieRating } from '~/types/common';

export const useRatingStore = defineStore('ratingStore', () => {
  const authStore = useAuthStore()
  const { postRatingToServer, deleteRatingFromServer } = useRate()
  const ratings = ref<movieRating[]>([])
  const ratedMovies = ref<Film[]>([])

  async function rateMovie(movieId: number, rating: number) {
    let isRated = true
    try {
      await postRatingToServer(movieId, rating)
      return isRated
    } catch (error) {
      isRated = false
      console.log(error)
      throw error
    } finally {
      return isRated
    }
  }

  const getRatedMovies = async (accountId: number) => {
    try {
      const { data } = await instance.get(`account/${accountId}/rated/movies`, {
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
      console.log(error)
      return [];
    } 
  }

  function removeRating(movieId: number) {
    let isRemoved = true
    try {
      ratings.value = ratings.value.filter((item: {id: number, rating: number}) => item.id !== movieId);
      deleteRatingFromServer(movieId)
      console.log('Ratings after removal:', [...ratings.value])
      return isRemoved
    } catch (error) {
      console.log(error)
      isRemoved = false
    } finally {
      return isRemoved
    }

  }

  const getRating = (id: number) => {
    const ratedMovie = ratings.value.find(item => item.id === id)
    return ratedMovie ? ratedMovie.rating : null
  }

  const logout = () => {
    ratings.value = []
    ratedMovies.value = []
  }
  
  return {
    ratings,
    ratedMovies,
    rateMovie,
    getRatedMovies,
    removeRating,
    getRating,
    logout
  }
})