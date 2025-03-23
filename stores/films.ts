import {defineStore} from 'pinia'

export const UseMoviesStore = defineStore('moviesStore', () => {
    const data = ref({})
    return {data}
})