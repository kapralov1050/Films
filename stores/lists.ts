import { type UserLists, type Film, type ListDetailsResponse, type List } from "~/types/common"

export const useListStore = defineStore('listStore', () => {
  const authStore = useAuthStore()
  const listForm = reactive({
    name: '',
    description: ''
  })
  const listId = ref<number>()
  const listDetails = ref<ListDetailsResponse>()
  const moviesInList = ref<Film[]>([])
  const movieToAdd = ref('')
  const userLists = ref<List[]>()

  async function createList(){
    try {
      const response = await instance.post( `list?session_id=${authStore.sessionId}`, {
        name: listForm.name,
        description: listForm.description,
        language: 'en'
      })
      console.log(response.data)
      listId.value = response.data.list_id
      if(response.data.success) {
        ElMessage({
          message: `List ${listForm.name} created`,
          type: 'success'
        })
      }
      return response.data
    } catch (error) {
      console.log('Error while create new list:', error)
    }
  }

  async function fetchUserLists() {
    try {
      const { data: response } = await instance.get<UserLists>(`/account/${authStore.userData?.id}/lists`)
      userLists.value = response.results
      await Promise.all(
      userLists.value.map(async (list) => {
        const movies = await loadListDetails(list.id)
        if(movies)  list.poster_path = getFirstMoviePoster(movies)
        })
      )  
      return userLists.value
    } catch (error) {
      console.log('error loading userLists',error)
    }
  }

  async function deleteList(listId: number) {
    try {
      await instance.delete(`/list/${listId}`,
        { params: {session_id: authStore.sessionId}}
      )
    } catch (error) {
      ElMessage.error('Failed to remove list')
      throw error
    }
  }

  async function clearList(listId: number) {
    try {
      await instance.post(`/list/${listId}/clear`,
        null,
        { params: 
          {
            session_id: authStore.sessionId,
            confirm: true
          }
        }
      )

      moviesInList.value = []
    } catch (error) {
      ElMessage.error('Failed to clear list')
      throw error
    }
  }

  const getFirstMoviePoster =  (movies: ListDetailsResponse): string => {
      return movies.items.length
      ? `https://image.tmdb.org/t/p/w342${movies.items[0].poster_path}`
      : 'https://cdn-icons-png.flaticon.com/512/16/16410.png'
  }

  async function addMovieToList(movieId: number) {
    if(listId.value) {
      if(!moviesInList.value.some(item => item.id === movieId)) {
        try {
          await instance.post(`list/${listId.value}/add_item`,
            { 
              media_id: movieId 
            },
            {
              params: {
                session_id: authStore.sessionId
              }
            }
          )
          
          ElMessage({
            message: 'Movie added to list',
            type: 'success'
          })
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
      const { data: results } = await instance.get<ListDetailsResponse>(`/list/${listId}`)
      return results
    } catch (error) {
      console.log('error loading list details:', error)
      throw error
    }
  }

  async function deleteMovieFromList(movieId: number, listId: number) {
    try {
      await instance.post(`list/${listId}/remove_item`, 
        { media_id: movieId },
        { params: {session_id: authStore.sessionId}}
      )
      const updatedList = await loadListDetails(listId)
      moviesInList.value = updatedList?.items || []

    } catch (error) {
      ElMessage.error('Failed to remove movie')
      throw error
    }
  }

  return {
    listForm,
    listId,
    createList,
    movieToAdd,
    addMovieToList,
    loadListDetails,
    fetchUserLists,
    userLists,
    moviesInList,
    listDetails,
    getFirstMoviePoster,
    deleteMovieFromList,
    deleteList,
    clearList
  }
})