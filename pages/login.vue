<template>
<div class="main" @submit.prevent="handleSubmit">
  <div class="logo main__element">
      <h1>
        TMDB
      </h1>
  </div>
  <div class="title main__element">
        Authorization
  </div>
  <div class="login-form main__element">
      <label 
        for="name" 
        class="login-form__input-label"
      >
        Username
      </label>
      <input
        class="login-form__input-field"
        v-model="name"
        name="user"
        type="text"
        required
      >
      <label 
        for="password" 
        class="login-form__input-label"
      >
        Password
      </label>
      <input
        class="login-form__input-field" 
        v-model="password"
        name="password" 
        type="password"
        required
      >
      <el-button 
        class="button login-form__button"
        :disabled="!name || !password || isLoading"
        @click="handleSubmit"
        @keyup.enter="handleSubmit"
      >
        {{ buttonText }}
      </el-button>
      <div 
        v-show="isShowError"
        class="login-form__err-message"
      >
        Authorization failed
      </div>
  </div>
</div>
</template>
    
  
<script setup lang="ts">
const name = ref('')
const password = ref('')

const isLoading = ref(false)
const isShowError = ref(false)

const userStore = UseUserStore()
const router = useRouter()

const buttonText = computed(() => isLoading.value ? 'Loading...' : 'Sign in')
    
async function handleSubmit() {
  try{
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    name.value.trim() === 'user' && password.value === '1111' ? userStore.isAuth = true : isShowError.value = true

    if(userStore.isAuth){
      router.push('/top-movies')
    }
  } catch(error) {
      console.log(error)
  } finally {
      isLoading.value = false
  }
}
</script>


<style lang="scss">
.main{
  background-color:$login-background;
  width:100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__element {
    margin-bottom: 10px;
  }
}

.login-form {
  color: white;
  background-color: $login-form;
  height: 300px;
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid $login-form;
  border-radius: 10px;
  padding-top: 50px;

  &__input-field {
    margin: 5px;
    color: white;
    background-color:$login-background;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 18px;
    width: 300px;
  }

  &__input-label {
    margin: 15px 5px 5px 40px;
    color: white;
    align-self: flex-start;
    font-size: 18px;
  }

  &__button{
    margin-top: 20px;
  }

  &__err-message{
    margin: 15px;
    color: rgb(255, 255, 255);
    background-color:$login-err-background;
    border: 1px solid $login-err-border;
    border-radius: 5px;
    padding: 20px;
  }
}

.button {
  width: 320px;
  font-size: 18px;
  align-self: center;
  padding: 10px;
}

.title {
  padding: 10px;
  text-align: center;
  font-size: 24px;
  color: white;
}

.logo {
  height: 100px;
  width: 100px;
  color: white;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
</style>