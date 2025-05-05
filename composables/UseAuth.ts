export const useAuth= () =>{

  const authStore = useAuthStore()

  const getRequestToken = async () => {
    try {
        const res = await instance.get('/authentication/token/new')
        return res.data.request_token
    } catch (error) {
        console.error('Ошибка при получении токена', error)
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
    ElMessage.success('Login successful')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getRequestToken, 
    handleCallback,
    loginWithTmdb
  }
}