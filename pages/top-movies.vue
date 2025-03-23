<template>
<div>
  <el-container>
    <el-header height="80px">
      <el-checkbox-button 
        v-model="isMenuVisible"
        class="side-menu-button"
        >
        <el-icon>
          <Menu />
        </el-icon>
      </el-checkbox-button>
      <div class="menu-container" :class="{ 'menu-hidden': !isMenuVisible }">
        <el-menu
          :collapse="!isMenuVisible"
          index="1">
        <template #title>
          <el-icon><Film /></el-icon>
          <span>Movies</span>
        </template>
          <el-menu-item-group>
            <div index="1-1">
              <el-checkbox-button class="side-menu-button--close" v-model="isMenuVisible">X</el-checkbox-button>
            </div>
            <el-menu-item index="1-2">Top 250 movies</el-menu-item>
            <el-menu-item index="1-3">Most Popular Movies</el-menu-item>
            <el-menu-item index="1-4">Brows Movies by Genre</el-menu-item>
            <el-menu-item index="1-5">Top Box Office</el-menu-item>
            <el-menu-item index="1-6">Showtimes & Tickets</el-menu-item>
            <el-menu-item index="1-7">Movie News</el-menu-item>
            <el-menu-item index="1-8">India Moive Spotlight</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <ul>
          <li v-for="movie in moviesStore.data" :key="movie.id">
              {{ movie.originalTitle }}
          </li>
      </ul>
    </el-main>
    <el-footer height="80px">Footer</el-footer>
  </el-container>
</div>
</template>



<script setup>
import { Menu, Film } from '@element-plus/icons-vue'
const isMenuVisible = ref(true)
const moviesStore = UseMoviesStore()

onMounted( async () => {
 try{
    const response = await instance.get('top250-movies')
    moviesStore.data = response.data
 } catch (error) {
    console.log(error)
 }
})

</script>




<style scoped lang="scss">
.side-menu-button{
  border: none;
  background-color: white;
}

.menu-container{
  transform: translateY(-50px);
  width: 200px;
  transition: transform 0.2s ease-in-out;
}
.menu-hidden{
  transform: translateX(-200px) translateY(-50px);
}
.side-menu-button--close{
  display: flex;
  justify-content: end;
  margin: 5px;
}
</style>