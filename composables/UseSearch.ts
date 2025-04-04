import { Handbag } from "@element-plus/icons-vue"

export const UseSearch = () => {
    const selectedGenre = ref('')
    const searchInput = ref('')

    const genresStore = UseGenresStore()
    const { genres } = storeToRefs(genresStore)

    async function handleSearch() {
      try {
        if(selectedGenre.value && searchInput.value){
        const searchResults = await searchMovies(selectedGenre.value)
        const searchByGenre = searchResults.results.filter((item: any) =>
          item.primaryTitle?.toLowerCase().includes(searchInput.value.toLowerCase()) ||
          item.originalTitle?.toLowerCase().includes(searchInput.value.toLowerCase())
        )
        console.log(searchByGenre)
      }
      } catch(error) {
        console.log(error)
      }
    }
      
    onMounted(async () => {
      await genresStore.getGenres()
    })

    return {
      selectedGenre, 
      genres, 
      searchInput, 
      handleSearch
    }
}