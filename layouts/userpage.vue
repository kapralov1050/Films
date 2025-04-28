<template>
  <el-container>
    <el-header>
    <Header />
    </el-header>
    <el-main>
      <section class="info-header">
        <div class="logo">
          <span>
            {{ username[0] }}
          </span>
        </div>
        <h1 class="username-title"> {{ username }} </h1>
      </section>
      <section>
        <el-menu class="menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" class="menu__option"> Rated Films </el-menu-item>
        <el-menu-item index="2" class="menu__option"> WatchList </el-menu-item>
        <el-menu-item index="3" class="menu__option"> Lists </el-menu-item>
        </el-menu>
      </section>
      <section class="page-content">
        <slot />
      </section>
    </el-main>
  </el-container>
</template>


<script setup>
const authStore = useAuthStore()
const username = authStore.userData.username;
const router = useRouter()

function handleSelect(key) {
  switch(key) {
    case "1":
    router.push(`/user/${username}/rated`)
    break
    case "2":
    router.push(`/user/${username}/watchlist`)
    break
    case "3":
    router.push(`/user/${username}/lists`)
  }
}

onMounted(async () => {
  await authStore.fetchUserData()
})  
</script>


<style scoped lang="scss">
.el-main, .el-header, .el-container {
  padding: 0;
  margin: 0;
}

.el-main {
  @include flex(column, center, center, 0)
}

.info-header {
  @include flex(row, flex-start, center, 0);
  width: 100%;
  background-color: rgb(234, 234, 234);
  height: 25vh;
  box-sizing: border-box;
  padding-left: 4rem;
}

.logo {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  @include flex(row, center, center,0);
  background-color: rgb(102.2, 177.4, 255);
  color: white;
  font-size: 4rem;
}

.username-title {
  color: rgb(50.8, 116.6, 184.5);
  font-size: 4rem;
  margin-left: 2rem;
}

.menu {
  @include flex(row, center, center, 3rem);
  &__option {
    font-size: 1.5rem;
    font-weight: 500;
  }
}

.page-content {
  padding-top: 2rem ;
  width: 60vw;
}

</style>