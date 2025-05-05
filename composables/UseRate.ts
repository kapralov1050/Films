import type { AxiosResponse } from "axios"
import { type RatingResponse } from "~/types/common"


export const useRate = () => {
  const authStore = useAuthStore()

  async function postRating(movieId: number, rating: number): Promise<AxiosResponse<RatingResponse>> {
    try {
      const response = await instance.post(`movie/${movieId}/rating`, 
        { value: rating },
        {
          params: {
            session_id: authStore.sessionId
          }
        })
      return response
    } catch (error) {
      console.error('Error rating movie:', error)
      throw error
    }
  }

  async function clearRating(movieId: number):
  Promise<AxiosResponse<RatingResponse>> {
    try {
      const response = await instance.delete(`movie/${movieId}/rating`, {
        params: {
          session_id: authStore.sessionId
        }
      })
      return response
    } catch (error) {
      console.error('Error delete rating movie:', error)
      throw error
    }
  }
  
  return {
    postRating,
    clearRating,
  }
}