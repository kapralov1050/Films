import type { Film } from "~/types/common"

export const useWatchList = () => {
  const userWatchList = useLocalStorage<Film[]>('user-watchlist-storage', [])
  userWatchList.value = userWatchList.value.filter(item => item !== null)

  function addToWatchList(movie: Film | null) {
    if (!movie) return

    const existingId = userWatchList.value.findIndex(item => item.id == movie.id)
    if(existingId == -1) {
      userWatchList.value.push(movie)
      console.log(userWatchList.value)
    } else {
      userWatchList.value.splice(existingId, 1)
      console.log(userWatchList.value)
    }
  }

  const getWatchList = (): Film[] => {
    return userWatchList.value
  }

  function isInWatchList(movie: Film | null) {
    if(!movie) return false
    return userWatchList.value.some(item => item.id === movie.id)
  }

  return {
    addToWatchList,
    getWatchList,
    isInWatchList,
  }
}