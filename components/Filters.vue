<template>
  <section>
    <el-select
      v-model="filtersForm.sort_by"
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
    <el-form :model="filtersForm">
      <el-form-item label="Genres" label-position="left">
        <el-checkbox-group v-model="filtersForm.genres">
          <el-checkbox-button
            v-for="genre in moviesStore.genres"
            :key="genre.id"
            :value="genre.id"
          >
            {{ genre.name }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Release Dates" label-position="left">
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
      <el-form-item label="Language" label-position="left">
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
      <el-form-item label="User Score" label-position="left">
        <el-slider
          v-model="filtersForm.vote_average"
          range
          show-stops
          :max="10"
          :marks="scoreMarks"
        />
      </el-form-item>
      <el-form-item label="Minimum User Votes" label-position="left">
        <el-slider
          v-model="filtersForm.vote_count"
          show-stops
          :step="100"
          :max="500"
          :marks="votesMarks"
        />
      </el-form-item>
      <el-form-item label="Runtime" label-position="left">
        <el-slider
          v-model="filtersForm.runtime"
          range
          show-stops
          :step="15"
          :max="400"
          :marks="runtimeMarks"
        />
      </el-form-item>
      <el-button
        round
        text
        bg
        @click="$emit('reset')"
      >
        Clear Form
      </el-button>
    </el-form>
    <el-button
      class="filter-button"
      type="primary"
      :disabled="!isFiltersChanged"
      @click="$emit('sort')"
    >
      Filter
    </el-button>
  </section>
</template>


<script setup lang="ts">
const moviesStore = useMoviesStore()
const { filtersForm } = storeToRefs(moviesStore)
const isFiltersChanged = ref(false)

watch(
  () => moviesStore.filtersForm,
  () => {
    isFiltersChanged.value = true
  },
  { deep: true }
)

const scoreMarks = {
  0: '0',
  2: '2',
  4: '4',
  6: '6',
  8: '8',
  10: '10'
}

const votesMarks = {
  0: '0',
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500'
}

const runtimeMarks = {
  0: '0',
  120: '120',
  240: '240',
  360: '360',
}
</script>


<style scoped lang="scss">
.el-form {
  @include flex(column, flex-start, center, 0);
  border: 1px solid rgb(190, 190, 190);
  box-shadow: 0 2px 5px rgb(209, 209, 209);
  margin: 1rem 0;
  padding: 1.5rem;
  border-radius: 5px;
}

.el-form-item {
  padding: 1rem;
  width: 100%;
  @include flex(column, flex-start, space-between, 0);
}

.el-checkbox-button {
  margin: 0.3rem;
}

.filter-button {
  width: 100%;
  padding: 1.5rem;
  font-size: large;
  border-radius: 3rem;
}
</style>