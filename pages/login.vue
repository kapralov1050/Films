<template>
    <div class="form" @submit.prevent="handleSubmit">
          <el-form class="container">
            <el-form-item label="Login">
                <el-input v-model="name"  name="username" placeholder="Login" required/>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="password"  name="password" placeholder="Password" show-password required/>
            </el-form-item>
        <el-button :disabled="!isFormValid || isLoading" @click="handleSubmit()">Submit</el-button>
    <div v-if="!isFormValid">
        <el-text>*Enter your login</el-text> <br>
        <el-text>
            *The password must contain at least one number.</el-text>
    </div>
    <div>
        <el-text v-if="isLoading">Loading...</el-text> <br>
        <el-text> {{ isAuth }} </el-text>
    </div>
        </el-form>
    </div>
    </template>
    
    
    
    <script setup>
    
    const name = ref('')
    const password = ref('')
    const isLoading = ref()
    const isAuth = ref('')
    
    const isFormValid = computed(() => {
        return /\d/.test(password.value) && name.value.trim()
    })
    
   async function handleSubmit() {
        try{
            isLoading.value = true
            await new Promise(resolve => setTimeout(resolve, 2000))
            if (name.value.trim() === 'user' && password.value === '1111') {
            isAuth.value = 'authorization successful';
            } else {
            isAuth.value = 'authorization false';
            }
            } catch(error) {
                console.log(error)
            } finally {
                isLoading.value = false
            }
    }

    watch([name, password], () => {
        isAuth.value = ''
    })
    
    </script>
    
    
    
    
    <style scoped>
    .container {
        width: 800px;
        border: 2px solid rgb(112, 112, 112);
        padding: 30px;
    
    }
    .form {
        display: flex;
        justify-content: center;
    }
    </style>