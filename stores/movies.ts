import {defineStore} from 'pinia'
import { compareDates } from '~/helpers/formatDate'
import type { Film, genres, languages,  } from '~/types/common'

export const useMoviesStore = defineStore('moviesStore', () => {
  const selectedMoviesList = ref<{results: Film[], total_results: number}>({results: [], total_results: 0})
  const currentPage = ref(1)
  const sortBy = ref('')
  const genres = ref<genres[]>([])
  const languages = ref<languages[]>([])
  const filtersForm = reactive({
    genre: [],
    release_date: [
      new Date(1970, 0, 1).toISOString().split('T')[0],
      new Date().toISOString().split('T')[0]        
    ],
    language: 'en-US',
    })

  async function handleSortChange() {
    try {
      const response = await instance.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          page: currentPage.value,
          'primary_release_date.gte': filtersForm.release_date[0],
          'primary_release_date.lte': filtersForm.release_date[1],
          language: filtersForm.language,
          with_genres: filtersForm.genre.join(',')
        }
      })
      selectedMoviesList.value = response.data
      console.log(selectedMoviesList.value)
    } catch (error) {
      console.log('Error sort:', error)
    }
  }

  const fetchGenres = async () => {
    const cached = localStorage.getItem('tmdb_genres')
    if(cached) {
      return JSON.parse(cached).genres
    }

    try {
      const response = await instance.get('genre/movie/list')
      const genres = response.data.genres
      localStorage.setItem('tmdb_genres', JSON.stringify(genres))
      return genres
    } catch (error) {
      console.log(error)
    }
  }

  const fetchLanguages = async () => {
    const cached = localStorage.getItem('tmdb_languages')
    if(cached) {
      return JSON.parse(cached)
    }

    try {
      const response = await instance.get('configuration/languages')
      const languages = response.data
      localStorage.setItem('tmdb_languages', JSON.stringify(languages))
      return languages
    } catch (error) {
      console.log(error)
    }
  }

  const sortOptions = [
    { value: 'vote_average.asc', label:'Rating Ascending' },
    { value: 'vote_average.desc', label:'Rating Descending' },
    { value: 'popularity.asc', label:'Popularity Ascending' },
    { value: 'popularity.desc', label:'Popularity Descending' },
    { value: 'primary_release_date.asc', label:'Release Date Ascending' },
    { value: 'primary_release_date.desc', label:'Release Date Descending' },
    { value: 'original_title.asc', label:'Title (A-Z)' },
    { value: 'original_title.desc', label:'Title (Z-A)' },
  ]

  async function getPopularMovieList() {
      try{
          const response = await instance.get('movie/popular', {
            params: {
              language: 'en-US',
              page: currentPage.value
            }
          })
          const data = response.data
          return data
        } catch (error) {
          console.log(error)
        }
  }

  return {
    getPopularMovieList,
    selectedMoviesList,
    sortOptions,
    handleSortChange,
    sortBy,
    genres,
    fetchGenres,
    languages,
    fetchLanguages,
    filtersForm,
    currentPage
  }
})
