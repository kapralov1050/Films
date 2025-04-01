import {defineStore} from 'pinia'

export const UseGenresStore = defineStore('genresStore', () => {
    const genres = ref<string[]>()

    async function getGenres() {
        try{
            const response = await instance.get('genres')
            genres.value = response.data
            return genres
        } catch(error) {
            console.log(error)
        }
    }

    return {genres, getGenres}
})