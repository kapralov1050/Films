import {defineStore} from 'pinia'

export const UseMovieDetailsStore = defineStore('MovieDetailsStore', () => {
    const selectedMovie = ref({})

    async function getMovieDetails(id:string) {
        try{
            const response = await instance.get(id)
            const data = response.data
            return data
         } catch (error) {
            console.log(error)
         }
    }

    return {selectedMovie, getMovieDetails}
})