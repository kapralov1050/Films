import {defineStore} from 'pinia'
import type { Film, genres, languages,  } from '~/types/common'

export const useMoviesStore = defineStore('moviesStore', () => {
  const selectedMoviesList = ref<{results: Film[], total_results: number}>({results: [], total_results: 0})
  const selectedList = ref('popular')
  const currentPage = ref(1)
  const genres = ref<genres[]>([])
  const languages = ref<languages[]>([])
  const filtersChanged = ref(false)
  const filtersForm = reactive({
    sort_by: '',
    genre: [],
    release_date: [
      new Date(1970, 0, 1).toISOString().split('T')[0],
      new Date().toISOString().split('T')[0]        
    ],
    language: 'en-US',
    vote_average: [0,10],
    vote_count: 0,
    runtime: [0, 400],
    })

  async function handleSortChange() {
    try {
      const response = await instance.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          page: currentPage.value,
          'primary_release_date.gte': filtersForm.release_date[0],
          'primary_release_date.lte': filtersForm.release_date[1],
          language: filtersForm.language,
          'vote_average.gte': filtersForm.vote_average[0],
          'vote_average.lte': filtersForm.vote_average[1],
          'vote_count.gte': filtersForm.vote_count,
          'with_runtime.gte': filtersForm.runtime[0],
          'with_runtime.lte': filtersForm.runtime[1],
          with_genres: filtersForm.genre.join(','),
          sort_by: filtersForm.sort_by,
        }
      })
      selectedMoviesList.value = response.data
      filtersChanged.value = false
      console.log(selectedMoviesList.value)
    } catch (error) {
      console.log('Error sort:', error)
    }
  }

  const fetchGenres = async () => {
    const cached = localStorage.getItem('tmdb_genres')
    if(cached) {
      return JSON.parse(cached)
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

  const resetForm = () => {
    Object.assign(filtersForm, {
      genre: [],
      release_date: [
        new Date(1970, 0, 1).toISOString().split('T')[0],
        new Date().toISOString().split('T')[0]        
      ],
      language: 'en-US',
      vote_average: [0, 10],
      vote_count: 0,
      runtime: [0, 400],
      sort_by: 'popularity.desc',
    })
  }

  async function getPopularMovieList() {
      try{
          const response = await instance.get(`movie/${selectedList.value}`, {
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
    selectedList,
    sortOptions,
    handleSortChange,
    genres,
    fetchGenres,
    languages,
    fetchLanguages,
    filtersForm,
    filtersChanged,
    resetForm,
    currentPage
  }
})
