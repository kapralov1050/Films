import {defineStore} from 'pinia'

export const UseUserStore = defineStore('user', () => {
    const isAuth = useLocalStorage('isAuth', false)
    const username = useLocalStorage('username', 'default')
    const isWatchListVisible = ref(false)
    const watchlist = ref([])

    return { isAuth, username, watchlist, isWatchListVisible}
})