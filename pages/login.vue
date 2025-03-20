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

const buttonText = computed(() => isLoading.value ? 'Loading...' : 'Sign in')
    
async function handleSubmit() {
  try{
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    name.value.trim() === 'user' && password.value === '1111' ? userStore.isAuth = true : isShowError.value = true
  } catch(error) {
      console.log(error)
  } finally {
      isLoading.value = false
  }
}
</script>


<style lang="scss">
@use "~/assets/scss/pages/_login.scss";
</style>