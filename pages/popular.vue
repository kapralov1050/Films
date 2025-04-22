<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <h1 class="title">
        Popular Movies 
      </h1>
      <article class="main">
        <section class="filters">
          <el-select
            v-model="moviesStore.sortBy"
            placeholder="Sort"
            size="large"
            style="width: 100%"
          >
            <el-option
              v-for="option in moviesStore.sortOptions"
              :key="option.value"
              :value="option.value"
              :label="option.label"
            />
          </el-select>
          <el-form 
            :model="filtersForm" 
            label-width="auto" 
            style="width: 100%"
          >
            <el-form-item label="genres">
              <el-checkbox-group v-model="filtersForm.genre">
                <el-checkbox-button 
                  v-for="genre in moviesStore.genres" 
                  :key="genre.id" 
                  :value="genre.id"
                >
                  {{ genre.name }}
                </el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Release Dates">
              <el-date-picker 
                type="daterange"
                v-model="filtersForm.release_date"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                range-separator="-"
                start-placeholder="from"
                end-placeholder="To"
                unlink-panels
              />
            </el-form-item>
            <el-form-item label="Language">
              <el-select 
                v-model="filtersForm.language" 
                filterable
                placeholder="None Selected"
              >
                <el-option 
                  v-for="language in moviesStore.languages" 
                  :key="language.english_name" 
                  :label="language.english_name" 
                  :value="language.iso_639_1"
                >
                  {{ language.english_name }}
                </el-option>
              </el-select>
            </el-form-item>
            {{ filtersForm.genre.join('%2C') }}
          </el-form>
          <el-button 
            type="primary"
            @click="moviesStore.handleSortChange()"
          >
            Filter
          </el-button>
        </section>
        <section class="content-wrapper">
          <ul 
            class="movies-list" 
            v-loading="isLoading" 
            element-loading-text="Loading..."
          >
            <li 
              class="movies-list__movie-card-container" 
              v-for="movie in moviesStore.selectedMoviesList.results" 
              :key="movie.id"
            >
              <MovieCard :movie="movie"/>
            </li>
          </ul>
        </section>
      </article>
      <Pagination
        @update:page="handlePageChange" 
        :page="moviesStore.currentPage " 
        :totalresults="moviesStore.selectedMoviesList.total_results" class="pagination"
      />
    </el-main>
  </el-container>
</template>


<script setup>
const moviesStore = useMoviesStore()
const isLoading = ref(false)
const { filtersForm } = storeToRefs(moviesStore)

const handlePageChange = async (newPage) => {
  moviesStore.currentPage = newPage;
};


const fetchData = async() => {
  try {
    moviesStore.selectedMoviesList = await moviesStore.getPopularMovieList()
  } catch(error) {
  console.error('Error:', error)
  } finally {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(() => moviesStore.currentPage, fetchData);

onMounted(async () => {
  isLoading.value = true
  try{
    await new Promise(resolve => setTimeout(resolve, 1000))
    moviesStore.genres = await moviesStore.fetchGenres()
    moviesStore.languages = await moviesStore.fetchLanguages()
    fetchData()
  } catch(error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
  })
</script>


<style scoped lang="scss">
.el-header {
  padding: 0;
  height: 4rem;
}

.el-main {
  padding: 2rem;
  width: 100%;
  min-height: auto;
  @include flex(column, center, flex-start, 0);
}

.main {
  @include flex(row, space-between, flex-start, 2rem)
}

.filters {
  flex: 1;
}

.content-wrapper {
  flex: 5;
}

.title {
  padding-left: 1rem;
  margin-bottom: 2rem;
  font-size: 3rem;
}

.title::before {
  content: "";
  margin-right: 1rem;
  height: 4rem;
  border:  solid gold;
  border-radius: 1rem; 
}

.movies-list {
  @include flex(column, center, center, 1.5rem);
  align-self: center;
  min-height: 80vh;
  width: 95%;
  
  &__movie-card-container {
    width: inherit;
    height: fit-content;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 2px 5px rgb(209, 209, 209);
  }
}

.pagination {
  align-self: center;
  margin: 2rem;
}
</style>