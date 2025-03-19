<template>
<<<<<<< HEAD
  <div class="main" @submit.prevent="handleSubmit">
    <div class="logo main__element">
       <h1>TMDB</h1>
=======
    <div class="form" @submit.prevent="handleSubmit">
          <el-form class="form__container">
                <el-form-item label="Login">
                    <el-input v-model="name" name="username" placeholder="Login" required/>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="password" name="password" placeholder="Password" show-password required/>
                </el-form-item>
                <el-button 
                   :disabled="!isFormValid || isLoading" 
                   @click="handleSubmit()" 
                   @keyup.enter="handleSubmit"
                >
                Submit
                </el-button>
            <div v-if="!isFormValid">
                <el-text>
                   *Enter your login. 
                </el-text>
                <br>
                <el-text> 
                   *The password must contain at least one number
                </el-text>
            </div>
            <div v-show="isShowError">
                <el-text >
                    Authorization failed
                </el-text>
            </div>
        </el-form>
>>>>>>> e4181fbc0d3bcc3e84aabff9035e8271182f291b
    </div>
        <p class="title main__element">Authorization</p>
    <div class="login-form main__element">
        <label for="name" class="login-form__input-label">
            Username
        </label>
        <input
            class="login-form__input-field"
            v-model="name"
            name="user"
            type="text"
            >
        <label for="password" class="login-form__input-label">
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
<<<<<<< HEAD
            name.value.trim() === 'user' && password.value === '1111' ? userStore.isAuth = true : isShowError.value = true;
=======
            userStore.isAuth = name.value.trim() === 'user' && password.value === '1111'
            isShowError.value = userStore.isAuth 
>>>>>>> e4181fbc0d3bcc3e84aabff9035e8271182f291b
            } catch(error) {
                console.log(error)
                userStore.isAuth = false
            } finally {
                isLoading.value = false
            }
    }

    watch([name, password], () => {
<<<<<<< HEAD
        isShowError.value = false;
=======
        isShowError.value = false
>>>>>>> e4181fbc0d3bcc3e84aabff9035e8271182f291b
    })
    
    </script>
    
    
    
    
    <style lang="scss" scoped>

* {
  padding: 0;
  margin:0;
}

.main{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color:rgb(23, 24, 29);
  width:100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__element{
  margin-bottom: 10px;
}
}



.login-form {

  color: white;
  background-color: rgb(64, 76, 94);
  height: 300px;
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid rgb(110, 110, 110);
  border-radius: 10px;
  padding-top: 50px;


  &__input-field {
  margin: 5px;
  color: white;
  background-color: rgb(3, 28, 44);
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
margin-top: 15px;
color: red;
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
}

// @media (min-width:750px) {
  
//   .login-form {
//   color: white;
//   background-color: rgb(64, 76, 94);
//   height: 300px;
//   width: 400px;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   border: 1px black;
//   border-radius: 10px;
//     padding-top: 50px;
// }
// }


    </style>