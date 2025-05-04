import type { AxiosResponse } from "axios"
import { useRatingStore } from "~/stores/rating"
import { type RatingResponse } from "~/types/common"


export const useRate = () => {
  const authStore = useAuthStore()

  async function postRatingToServer(movieId: number, rating: number): Promise<AxiosResponse<RatingResponse>> {
    try {
      const response = await instance.post(`movie/${movieId}/rating`, 
        { value: rating },
        {
          params: {
            session_id: authStore.sessionId
          }
        }
      )
      return response
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
      throw error
    }
  }
  
  return {
    postRatingToServer,
    deleteRatingFromServer,
  }
}