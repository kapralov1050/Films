const authStore = useAuthStore()

export const useListStore = defineStore('listStore', () => {
  const listName = ref('')
  const listDescription = ref('')

   async function createList(){
    await instance.post('list', {
      session_id: authStore.sessionId
    }, {
      data: {
        name: listName.value,
        description: listDescription.value
      }
    })
  }
  return {
    listName,
    listDescription
  }
})