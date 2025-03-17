<template>
<div class="form" @submit.prevent="handleSubmit">
  <div class="container">
    <el-form>
        <el-form-item label="Login">
            <el-input v-model="data.name" style="width: 240px;"  name="username" placeholder="Login" required/>
        </el-form-item>
        <el-form-item label="password">
            <el-input v-model="data.password" style="width: 240px;"  name="username" placeholder="Password" show-password required/>
        </el-form-item>
    <el-button :disabled="!isFormValid || !isPasswordValid">Submit</el-button>
    <el-text v-if="!isPasswordValid" size="small">*Пароль должен содержать хотя бы одну цифру</el-text>
    </el-form>
  </div>
</div>
</template>



<script setup>

const data = reactive({
  name: '',
  password: ''
});

const isFormValid = computed(() => {
    return data.name.length !== 0 && data.password.length !== 0
})

const isPasswordValid = computed(() => {
    return  /\d/.test(data.password); 
})

</script>




<style scoped>
.container {
    width: 800px;
    border: 2px solid rgb(112, 112, 112);
    padding: 30px;
    display: flex;
    justify-content: center;

}
.form {
    display: flex;
    justify-content: center;
}
</style>