<template>
    <section class="title-block">
      <h1 class="title"> My Lists </h1>
      <el-button 
        @click="handleCreateList()"
        type="primary" 
        size="large" 
        color="#ffd900" 
        style="color: white; font-weight: bold; font-size: 1.2rem;"
      > 
        Create List 
      </el-button>
    </section>
    <div class="empty-list" v-if="!listStore.userLists?.length">
      <el-icon size="40" color="gold">
        <List />
      </el-icon>
      There are no lists.
      <NuxtLink to="/popular" style="color: black"> 
        Back to Home
      </NuxtLink>
    </div>
    <section class="user-lists">
      <div v-for="list in listStore.userLists" :key="list.id" class="user-lists__item" @click="handleListSelect(list.id)">
        <NuxtImg
          class="user-lists__background"
          :src="list.poster_path || 'https://cdn-icons-png.flaticon.com/512/16/16410.png'"
          loading="lazy"
          format="webp"
        />
        <div class="user-lists__info">
          <h3> {{ list.name }} </h3>
          <p> {{ list.item_count || 0 }} {{ list.item_count > 1 ? 'items' : 'item' }}</p>
        </div>
      </div>
  </section>
</template>
  
  
<script setup lang="ts">
import { List } from '@element-plus/icons-vue'

const authStore = useAuthStore()
const listStore = useListStore()

function handleCreateList() {
  navigateTo(`/user/${authStore.userData?.username}/createList`)
}

const handleListSelect = (id: number) => {
  navigateTo(`/user/${authStore.userData?.username}/list/${id}`)
  listStore.listId = id
}

definePageMeta({
    layout: "userpage",
    middleware: 'auth'
})

onMounted(async () => {
  if(authStore.userData?.id) 
  await listStore.fetchUserLists()
})
</script>
  
  
<style scoped lang="scss">
.title-block {
  display: flex;
  justify-content: space-between;
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

.empty-list {
  margin-top: 3rem;
  align-self: center;
  @include flex(column, center, center, 1rem);
}
  
.user-lists {
    @include flex(row, flex-start, center, 2rem);
    margin-top: 2rem;
    flex-wrap: wrap;
  
  &__item {
    @include flex(row, center, center, 0);
    position: relative;
    box-sizing: border-box;
    height: 300px;
    width: 300px;
  }

  &__background {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    border-radius: 1rem;
    filter: drop-shadow(2px 6px 5px #aaaaaa) brightness(0.7);
    transition: filter 0.2s ease;
  }

  &__background:hover  {
    filter: drop-shadow(2px 6px 5px #dbdbdb) brightness(0.9) ;
  }

  &__info {
    position: relative;
    z-index: 1;
    @include flex(column, center, center, 0);
    color: white;
    cursor:default;
  }
}
</style>