import type { Film, ListDetailsResponse } from "~/types/common"

const authStore = useAuthStore()

export const useListStore = defineStore('listStore', () => {
  const listName = ref('')
  const listDescription = ref('')
  const createdListInfo = ref({})
  const listId = ref<number>()
  const moviesInList = ref<Film[]>([])
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
      ElMessage({
        message: `List ${listName.value} created`,
        type: 'success'
      })
      return response.data
    } catch (error) {
      console.log('Error while create new list:', error)
    }
  }

  async function addMovieToList(movieId: number) {
    if(listId.value) {
      await loadListDetails(listId.value)
      if(!moviesInList.value.some(item => item.id === movieId)) {
        try {
          const response = await instance.post(`list/${listId.value}/add_item`,
            { media_id: movieId },
            {
              params: {session_id: authStore.sessionId}
            }
          )
          await loadListDetails(listId.value)
          ElMessage({
            message: 'Movie added to list',
            type: 'success'
          })
          return response.data
        } catch (error) {
          console.log('Error while add new movie:', error)
          throw error
        }

      } else {
        ElMessage({
          message: 'Movie is already on the list',
          type: 'warning'
        })
        throw new Error('Movie already in list')
      }

    }
  }

  async function loadListDetails(listId: number) {
    try {
      const { data: results } = await instance.get<ListDetailsResponse>(`list/${listId}`)
      moviesInList.value = results.items
    } catch (error) {
      console.log('error loading list details:', error)
    }
  }

  return {
    listName,
    listDescription,
    listId,
    createList,
    createdListInfo,
    movieToAdd,
    addMovieToList,
    loadListDetails,
    moviesInList
  }
})