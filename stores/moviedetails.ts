import {defineStore} from 'pinia'

export const UseMovieDetailsStore = defineStore('MovieDetailsStore', () => {
    const selectedMovie = ref({})
    const movieRecommendations = ref({})

    async function getMovieDetails(id:string) {
        try{
            const response = await instance.get(`movie/${id}`)
            selectedMovie.value = response.data
            console.log(response.data)
         } catch (error) {
            console.log(error)
         } 
    }

    async function getRecommendations(id:string) {
        try{
            const response = await instance.get(`movie/${id}/recommendations`)
            movieRecommendations.value = response.data
            console.log(response.data)
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

    return {getRecommendations, movieRecommendations, selectedMovie, getMovieDetails, formatVotes, formatDuration}
})