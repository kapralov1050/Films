import type { AxiosResponse } from "axios"
import type { Film, WatchListResponse } from "~/types/common"

export const useAuth= () =>{

  const authStore = useAuthStore()

  const getRequestToken = async () => {
    try {
        const res = await instance.get('/authentication/token/new')
        return res.data.request_token
    } catch (error) {
        console.log('Ошибка при получении токена', error)
        return createError({statusCode: 500, statusMessage:'ошибка при получении токена'})
    }
  }

  const loginWithTmdb = async () => {
    const requestToken =await getRequestToken()
    localStorage.setItem('return_path', window.location.pathname)
    localStorage.setItem('tmdb_request_token', requestToken)
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/`
  }

  const handleCallback = async () => {
    try {
    const requestToken = localStorage.getItem('tmdb_request_token')
    
    if(!requestToken) throw new Error('Request token not found!')

    const { data } = await instance.post('/authentication/session/new', {
      request_token: requestToken
    })
    authStore.setSession(data.session_id)
    await authStore.fetchUserData();
    localStorage.removeItem('tmdb_request_token')

    } catch (error) {
      console.log(error)
    }
  }

  const getWatchListMovies = async (accountId: number): Promise <Film[]> => {
    try {
      const response: AxiosResponse <WatchListResponse> = await instance.get(`account/${accountId}/watchlist/movies`, {
        params: { session_id: authStore.sessionId }
      })
      return response.data.results
    } catch (error) {
      console.log('Failed to load watchlist:',error)
      return [];
    }
  }

  return {
    getRequestToken, 
    handleCallback,
    getWatchListMovies,
    loginWithTmdb
  }
}