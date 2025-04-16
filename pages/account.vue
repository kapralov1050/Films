<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <article class="user-info-header">
        <figure>
          <el-image :src="avatarUrl">

          </el-image>
        </figure>  
        {{ authStore.userData }}
      </article>
    </el-main>
  </el-container>
</template>


<script setup>
const authStore = useAuthStore()

const avatarData = ref(authStore.userData.avatar)

const getAvatarUrl = (user) => {
  if (user.tmdb.avatar_path) {
    return `https://image.tmdb.org/t/p/original${user.tmdb.avatar_path}`;
  } else if (user.gravatar.hash) {
    return `https://www.gravatar.com/avatar/${user.gravatar.hash}?s=200&d=identicon`;
  }
  return "URL_дефолтного_аватара";
};

const avatarUrl = getAvatarUrl(avatarData.value);
console.log(avatarUrl); // Выведет Gravatar-ссылку



</script>


<style scoped>

</style>