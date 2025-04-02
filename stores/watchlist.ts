import { defineStore } from "pinia";
import type { Film } from "~/server/api/film";

export const UseWatchListStore = defineStore('watchlist', () => {
    const userWatchList = ref([{} as Film]);
    const userWatchListStorage = useLocalStorage('user-watchlist-storage', userWatchList.value)

    return { userWatchList, userWatchListStorage }
})