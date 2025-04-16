import { useRatingStore } from "~/stores/rating"


export const useRate = () => {
  const authStore = useAuthStore()
  const ratingStore = useRatingStore()

  async function postRatingToServer(movieId: number, rating: number) {
    try {
      await instance.post(`movie/${movieId}/rating`, 
        { value: rating },
        {
          params: {
            session_id: authStore.sessionId
          }
        }
      )
    } catch (error) {
      console.log('Error rating movie:', error)
      throw error
    }
  }

  async function deleteRatingFromServer(movieId: number) {
    try {
      await instance.delete(`movie/${movieId}/rating`, {
        params: {
          session_id: authStore.sessionId
        }
      })
    } catch (error) {
      console.log('Error delete rating movie:', error)
    }
  }

  const processPendingRating = async (movieId: number) => {
    const pendingAction = JSON.parse(
      localStorage.getItem('pending_rating_action') || '{}');
    if(pendingAction[movieId] !== undefined) {
      await ratingStore.rateMovie(movieId, pendingAction[movieId])
      localStorage.removeItem('pending_rating_action')
    } 
  }
  


  return {
    postRatingToServer,
    deleteRatingFromServer,
    processPendingRating
  }
}