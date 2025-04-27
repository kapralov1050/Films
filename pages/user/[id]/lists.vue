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
  <section class="meta">

  </section>
</template>


<script setup>
const router = useRouter()
const authStore = useAuthStore()

function handleCreateList() {
  router.push(`/user/${authStore.userData.username}/createList`)
}

definePageMeta({
    layout: "userpage"
})
</script>


<style scoped lang="scss">
.title {
  @include flex(row, space-between, center, 0);
  font-size: 2rem;
  font-weight: bold;
}
</style>