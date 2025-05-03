import type { userData, Film } from "~/types/common"

export const useAuthStore = defineStore('authStore', () => {
  const sessionId = ref<string | null>(null)
  const userData = ref<userData | null>(null)
  const watchListMovies = ref<Film[] | null>(null)
  const { getWatchListMovies } = useAuth()

  const getSessionCookie = () => useCookie<string | null>('tmdb_session_id')

  const setSession = (newSessionId: string) => {
    const sessionCookie = getSessionCookie()
    sessionCookie.value = newSessionId
    sessionId.value = newSessionId
  }

  const fetchUserData = async () => {
    if(!sessionId) return null;
    try {
      const {data} = await instance.get('/account', {
        params: { session_id: sessionId.value }
      })
      userData.value = data
    } catch (error) {
      console.log('userData error', error)
      return null
    }
  }

  const addToWatchList = async (movieId: number, isWatchlist: boolean) => {
    try {
      await instance.post(`account/${userData.value?.id}/watchlist`, {
        media_type: 'movie',
        media_id: movieId,
        watchlist: isWatchlist
      }, {
        params: {session_id: sessionId.value}
      })
      getWatchList()
      ElMessage(isWatchlist ? 'Added to watchlist' : 'Deleted from watchlist')
    } catch (error) {
        console.log(error)
    }
  }

  const processPendingWatchlist = async (movieId: number) => {
    const pendingAction = JSON.parse(
      localStorage.getItem('pending_watchlist_action') || '{}');
    if(pendingAction[movieId] !== undefined) {
      await addToWatchList(movieId, pendingAction[movieId])
      localStorage.removeItem('pending_watchlist_action')
    } 
  }

  const getWatchList = async () => {
    if(userData.value?.id) {
      const movies = await getWatchListMovies(userData.value.id)
      watchListMovies.value = movies
    } 
  }

  const initAuth = () => {
    const sessionCookie = getSessionCookie()
    if(sessionCookie.value) {
      sessionId.value = sessionCookie.value
      fetchUserData()
      getWatchList()
    }
  }

  const logout = () => {
    const sessionCookie = getSessionCookie()
    sessionCookie.value = null
    sessionId.value = null
    userData.value = null
    watchListMovies.value = null
  }

  initAuth()

  return {
    sessionId,
    setSession,
    userData,
    fetchUserData,
    addToWatchList,
    processPendingWatchlist,
    getWatchList,
    watchListMovies,
    initAuth,
    logout
  }
})