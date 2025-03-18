<template>
    <div class="form" @submit.prevent="handleSubmit">
          <el-form class="form__container">
                <el-form-item label="Login">
                    <el-input v-model="name"  name="username" placeholder="Login" required/>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="password"  name="password" placeholder="Password" show-password required/>
                </el-form-item>
                <el-button :disabled="!isFormValid || isLoading" @click="handleSubmit()" @keyup.enter="handleSubmit">Submit</el-button>
            <div v-if="!isFormValid">
                <el-text>*Enter your login</el-text> <br>
                <el-text>
                    *The password must contain at least one number.</el-text>
            </div>
            <div v-show="userStore.isAuth !== null">
                <el-text v-if="userStore.isAuth" >Authorization successful</el-text>
                <el-text v-else >Authorization failed</el-text>
            </div>
        </el-form>
    </div>
    </template>
    
    
    
    <script setup lang="ts">
    

    const name = ref<string>()
    const password = ref<string>()
    const isLoading = ref<boolean>()
    const userStore = UseUserStore()
    
    
    const isFormValid: boolean = computed(() => {
        return /\d/.test(password.value) && name.value.trim().length > 0
    })
    
   async function handleSubmit() {
        try{
            isLoading.value = true
            await new Promise(resolve => setTimeout(resolve, 2000))
            if (name.value.trim() === 'user' && password.value === '1111') {
            userStore.isAuth = true;
            } else {
            userStore.isAuth = false;
            }
            } catch(error) {
                console.log(error)
                userStore.isAuth = false
            } finally {
                isLoading.value = false
            }
    }

    watch([name, password], () => {
        userStore.isAuth = null
    })
    
    </script>
    
    
    
    
    <style lang="scss" scoped>
        .form {
        display: flex;
        justify-content: center;
        align-items:center;
        height: 80vh;
            &__container {
            border: 2px solid rgb(112, 112, 112);
            padding: 30px;
            width: fit-content;
            height: fit-content;
        }

    }


    </style>