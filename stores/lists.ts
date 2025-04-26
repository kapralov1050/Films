const authStore = useAuthStore()

export const useListStore = defineStore('listStore', () => {
  const listName = ref('')
  const listDescription = ref('')
  const createdListInfo = ref({})
  const movieToAdd = ref('')

  async function createList(){
    try {
      const response = await instance.post('list', {
        session_id: authStore.sessionId
      }, {
        data: {
          name: listName.value,
          description: listDescription.value
        }
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log('Error while create new list:', error)
    }
  }

  async function addMovieToList(listId: number, movieId: number) {
    try {
      const response = await instance.post(`list/${listId}/add_item`, {
        session_id: authStore.sessionId
      }, {
        data: {
          media_id: movieId
        }
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log('Error while create new list:', error)
    }
  }

  return {
    listName,
    listDescription,
    createList,
    createdListInfo,
    movieToAdd,
    addMovieToList
  }
})