import {defineStore} from 'pinia'

export const UseUserStore = defineStore('user', () => {
    const isWatchListVisible = ref(false)
    const watchlist = ref([])

    return { watchlist, isWatchListVisible}
})