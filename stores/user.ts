import {defineStore} from 'pinia'

export const UseUserStore = defineStore('user', {
    state: () =>({
        isAuth: null as boolean | null
    })
})