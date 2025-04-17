import type { Film, movieRating } from '~/types/common';

export const useRatingStore = defineStore('ratingStore', () => {
  const authStore = useAuthStore()
  const { loginWithTmdb } = useAuth()
  const { postRatingToServer, deleteRatingFromServer } = useRate()
  const ratings = ref<movieRating[]>([])
  const ratedMovies = ref<Film[]>([])

  async function rateMovie(movieId: number, rating: number) {
    if(!authStore.sessionId) {
      localStorage.setItem('pending_rating_action', JSON.stringify({
        [movieId]: rating
      }))
      const returnPath = encodeURIComponent(useRoute().path)
      localStorage.setItem('return_path', returnPath)

      loginWithTmdb()
      return
    }

    let existingIndex = -1
    let previousRating: number | null = null

    try {
      existingIndex = ratings.value.findIndex(item => item.id === movieId)

      previousRating = existingIndex !== -1
      ? ratings.value[existingIndex].rating : null

      if(existingIndex !== -1) {
        ratings.value[existingIndex].rating = rating
      } else {
        ratings.value.push({id:movieId, rating})
      }

      await postRatingToServer(movieId, rating)
    } catch (error) {
      if(previousRating !== null) {
        ratings.value[existingIndex].rating = previousRating
      } else {
        ratings.value = ratings.value.filter(item => item.id !== movieId)
      }
      throw error
    }
  }

  const getRatedMovies = async (accountId: number) => {
    if(!authStore.sessionId) {
      console.log('session Id is not available')
      return []
    }
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
    if(authStore.sessionId) {
      ratings.value = ratings.value.filter((item: {id: number, rating: number}) => item.id !== movieId);
      deleteRatingFromServer(movieId)
      console.log('Ratings after removal:', [...ratings.value])
    }
  }

  const getRating = (id: number) => {
    const ratedMovie = ratings.value.find(item => item.id === id)
    return ratedMovie ? ratedMovie.rating : null
  }

  
  return {
    ratings,
    ratedMovies,
    rateMovie,
    getRatedMovies,
    removeRating,
    getRating
  }
})