import type { userData, Movie } from "~/types/common"

export const useAuthStore = defineStore('authStore', () => {
  const sessionId = ref<string | null>(null)
  const userData = ref<userData | null>(null)

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
      console.error('userData loading error', error)
      return null
    }
  }

  const initAuth = () => {
    const sessionCookie = getSessionCookie()
    if(sessionCookie.value) {
      sessionId.value = sessionCookie.value
      fetchUserData()
    }
  }

  initAuth()

  return {
    getSessionCookie,
    sessionId,
    setSession,
    userData,
    fetchUserData,
    initAuth
  }
})