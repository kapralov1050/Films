import {defineStore} from 'pinia'

export const UseUserStore = defineStore('user', () => {

const isAuth = ref<boolean | null>(null)


return { isAuth}
})