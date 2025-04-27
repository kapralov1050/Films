const authStore = useAuthStore()

export const useListStore = defineStore('listStore', () => {
  const listName = ref('')
  const listDescription = ref('')
  const createdListInfo = ref({})
  const listId = ref<number>()
  const movieToAdd = ref('')

  async function createList(){
    try {
      const response = await instance.post( `list?session_id=${authStore.sessionId}`, {
        name: listName.value,
        description: listDescription.value,
        language: 'en'
      })
      console.log(response.data)
      listId.value = response.data.list_id
      return response.data
    } catch (error) {
      console.log('Error while create new list:', error)
    }
  }

  async function addMovieToList(movieId: number) {
    try {
      const response = await instance.post(`list/${listId.value}/add_item`,
        { media_id: movieId },
        {
          params: {session_id: authStore.sessionId}
        }
      );
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log('Error while add new movie:', error)
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