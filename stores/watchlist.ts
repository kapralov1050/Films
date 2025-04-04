import { defineStore } from "pinia";
import type { Film } from "~/server/api/film";

export const UseWatchListStore = defineStore('watchlist', () => {
    const userWatchList = useLocalStorage('user-watchlist-storage', [] as Film[])

    return { userWatchList}
})