import { useLocalStorage } from '@vueuse/core'

export const useAuth= () =>{
    const isAuth = useLocalStorage('isAuth', false)
    const username = useLocalStorage('username', 'default')
    const router = useRouter()

    function handleLogOut() {
        router.push('/login')
        setTimeout(() => isAuth.value = false, 1000)
      }

    return {
        isAuth,
        username,
        handleLogOut
    }
}