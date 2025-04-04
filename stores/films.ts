import {defineStore} from 'pinia'

export const UseMoviesStore = defineStore('moviesStore', () => {
    const selectedMoviesList = ref({})

    const moviesListOptions = [
  {
    value: 'top250-movies',
    label: 'Top 250 Movies'
  },
  {
    value: 'top-box-office',
    label: 'Top Top Box Office'
  },
  {
    value: 'most-popular-movies',
    label: 'Most Popular Movies'
  },
  {
    value: 'top-rated-english-movies',
    label: 'Top Rated English Movies'
  },
  {
    value: 'lowest-rated-movies',
    label: 'Lowest Rated Movies'
  },
]

    async function getMoviesList(list: string) {
        try{
            const response = await instance.get(list)
            const data = response.data
            return data
         } catch (error) {
            console.log(error)
         }
    }

    return {selectedMoviesList, getMoviesList, moviesListOptions}
})
