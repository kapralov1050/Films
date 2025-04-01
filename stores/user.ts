import {defineStore} from 'pinia'

export const UseUserStore = defineStore('user', () => {
    const isAuth = useLocalStorage('isAuth', false)
    const username = useLocalStorage('username', 'default')
    return { isAuth, username}
})