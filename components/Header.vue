<template>
  <div >
    <header class="header">
        <h1 class="header__title title">Заголовок</h1>
        <nav class="header__menu">
            <NuxtLink class="header__menu-path" to="/"> Главная</NuxtLink>
            <NuxtLink class="header__menu-path" to="/login" > Логин</NuxtLink>
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


  &__title {
    align-self: center;
  }


  &__menu {
    display: flex;
    justify-content:flex-start;
    padding: 20px;
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