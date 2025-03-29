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

    const formatVotes = (votes:number) => {
        return votes <= 1000000 
        ? `${(votes/1000).toFixed(0)}K` : votes >= 1000000 
        ? `${(votes/1000000).toFixed(1)}M` : votes
    }

    const formatDuration = (duration: number) => {
        return duration ? `${Math.floor(duration / 60)}h ${duration % 60}m` : 'N/A'
    }

    return {selectedMovie, getMovieDetails, formatVotes, formatDuration}
})