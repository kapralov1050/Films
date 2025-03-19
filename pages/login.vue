<template>
<div class="main" @submit.prevent="handleSubmit">
  <div class="logo main__element">
      <h1>
        TMDB
      </h1>
  </div>
  <div class="title main__element">
      <p>
        Authorization
      </p>
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
        :disabled="!isFormValid || isLoading"
        @click="handleSubmit"
        @keyup.enter="handleSubmit"
      >
        Sign in 
      </el-button>
      <div class="login-form__err-message" v-show="isShowError">
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

const isFormValid = computed<boolean>(() => {
    return /\d/.test(password.value) && name.value.trim().length > 0
})
    
async function handleSubmit() {
    try{
        isLoading.value = true
        await new Promise(resolve => setTimeout(resolve, 2000))
        name.value.trim() === 'user' && password.value === '1111' ? userStore.isAuth = true : isShowError.value = true;
        } catch(error) {
            console.log(error)
            userStore.isAuth = false
        } finally {
            isLoading.value = false
        }
}

watch([name, password], () => {
    isShowError.value = false;
})
</script>


<style lang="scss">
@use "~/assets/scss/pages/_login.scss";
</style>