import { type UserLists, type Film, type ListDetailsResponse, type List } from "~/types/common"

export const useListStore = defineStore('listStore', () => {
  const authStore = useAuthStore()
  const listName = ref('')
  const listDescription = ref('')
  const createdListInfo = ref({})
  const listId = ref<number>()
  const moviesInList = ref<Film[]>([])
  const movieToAdd = ref('')
  const userLists = ref<List[]>()

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

  async function fetchUserLists() {
    try {
      const { data: response } = await instance.get<UserLists>(`/account/${authStore.userData?.id}/lists`)
      userLists.value = response.results
      await Promise.all(
      userLists.value.map(async (list) => {
        list.poster_path = await getFirstMoviePoster(list.id) || list.poster_path
        })
      )
      console.log(userLists.value)
      
      return userLists.value
    } catch (error) {
      console.log('error loading userLists',error)
    }
  }

  async function loadListDetails(listId: number) {
    try {
      const { data: results } = await instance.get<ListDetailsResponse>(`/list/${listId}`)
      return results.items
    } catch (error) {
      console.log('error loading list details:', error)
    }
  }

  const getFirstMoviePoster = async (listId: number): Promise<string> => {
    try {
      const movies = await loadListDetails(listId)
      if(!movies?.length) return 'https://cdn-icons-png.flaticon.com/512/16/16410.png'
      return `https://image.tmdb.org/t/p/w342${movies[0].poster_path}`
    } catch (error) {
      throw error
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
    fetchUserLists,
    userLists,
    moviesInList,
    getFirstMoviePoster
  }
})