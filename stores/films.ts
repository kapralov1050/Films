import {defineStore} from 'pinia'

export const UseMoviesStore = defineStore('moviesStore', () => {
    const selectedMoviesList = ref({})

    async function getMoviesList(list: string) {
        try{
            const response = await instance.get(list)
            const data = response.data
            return data
         } catch (error) {
            console.log(error)
         }
    }

    return {selectedMovieList, getMoviesList}
})
