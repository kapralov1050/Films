import {defineStore} from 'pinia'

export const UseMoviesStore = defineStore('moviesStore', () => {
    const topMovies = ref({})

    async function getTopMovies() {
        try{
            const response = await instance.get('top250-movies')
            const data = response.data
            return data
         } catch (error) {
            console.log(error)
         }
    }

    return {topMovies, getTopMovies}
})
