import type { AxiosResponse } from "axios"
import type { Movie, WatchListResponse } from "~/types/common"

export const useWatchlistStore = defineStore('watchlistStore', () => {

  const authStore = useAuthStore()
  const watchListMovies = ref<Movie[] | null>(null)

  const getWatchListMovies = async (accountId: number): Promise <Movie[]> => {
    try {
      const response: AxiosResponse <WatchListResponse> = await instance.get(`account/${accountId}/watchlist/movies`, {
        params: { session_id: authStore.sessionId }
      })
      return response.data.results
    } catch (error) {
      console.error('Failed to load watchlist:',error)
      return [];
    }
  }

  const addToWatchList = async (movieId: number, isWatchlist: boolean, movieTitle: string) => {
    try {
      if(!authStore.userData) return 
      await instance.post(`account/${authStore.userData.id}/watchlist`, {
        media_type: 'movie',
        media_id: movieId,
        watchlist: isWatchlist
      }, {
        params: {session_id: authStore.sessionId}
      })
      getWatchList()
      ElMessage.success(`${movieTitle} ${isWatchlist 
        ? 'was added to watchlist' 
        : 'was deleted from watchlist'
      }`)
    } catch (error) {
        console.error(error)
    }
  }

  const getWatchList = async () => {
    if(authStore.userData) {
      const movies = await getWatchListMovies(authStore.userData.id)
      watchListMovies.value = movies
    } 
  }

  return {
    getWatchListMovies,
    watchListMovies,
    addToWatchList,
    getWatchList
  }
    
})