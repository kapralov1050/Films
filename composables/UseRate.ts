import type { movieRating } from '~/types/common';

export const useRate = () => {
  const ratings = useLocalStorage<movieRating[]>('movie-ratings',[]);

  const getRating = (movieId: number) => {
    return ratings.value.find(item => item.id == movieId)?.rating || null
  }
  
  function rateMovie(movieId: number, rating: number) {
    const existingIndex = ratings.value.findIndex(item => item.id == movieId)
    if(existingIndex !== -1) {
      ratings.value[existingIndex].rating = rating
    } else {
      ratings.value.push({id: movieId, rating: rating})
    }
  }
  
  function removeRating(movieId: number) {
    ratings.value = ratings.value.filter(item => item.id !== movieId);
  }

  return {
    getRating,
    rateMovie,
    removeRating,
    ratings
  }
}