import {defineStore} from 'pinia'

export const UseUserStore = defineStore('user', () => {

const isAuth = ref(false)


return { isAuth}
})