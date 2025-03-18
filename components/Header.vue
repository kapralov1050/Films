<template>
  <div >
    <header class="header">
        <h1 class="header__title title">Заголовок</h1>
        <nav class="header__menu">
            <NuxtLink class="header__menu-path" to="/">
              <el-button>
                Главная
              </el-button>
            </NuxtLink>
            <NuxtLink class="header__menu-path" to="/login" >
              <el-button>
                Вход
              </el-button>
            </NuxtLink>
        </nav>
    </header>
  </div>
</template>



<script setup>

</script>




<style lang="scss" scoped>
$font-stack:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.header {
  height: 10vh;
  width: 100%;
  background: cadetblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;


  &__title {
    align-self: center;
  }


  &__menu {
    align-self: flex-end;
    display: flex;
    justify-content:flex-start;
  }

  &__menu-path {
    margin-right: 30px;
  }

}

.title {
  font: 5ch $font-stack;
  color: white;
  padding: 20px;

}
</style>