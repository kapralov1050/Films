<template>
    <section class="title">
      <h1> My Lists </h1>
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
  .title {
    @include flex(row, space-between, center, 0);
    padding: 0 1rem;
    font-size: 2rem;
    font-weight: bold;
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