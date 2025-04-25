<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-steps :active="activeStep" finish-status="success">
        <el-step title="Step 1: List Details" />
        <el-step title="Step 2: Add Movies" />
        <el-step title="Step 3: Choose Image" />
      </el-steps>
      <el-button @click="next"> Next Step</el-button>
      <component :is="steps[currentStep]"></component>
    </el-main>
  </el-container>
</template>


<script setup>
const activeStep = ref(0)
const currentStep = ref('CreateList')

const next = () => {
  if(activeStep.value < 3) activeStep.value++
}

const steps = {
  CreateList,
  AddMovies,
  ChooseImage
}

definePageMeta({
  layout: 'default'
})
</script>


<style scoped lang="scss">
.el-main {
  width: 70%;
  align-self: center;
}

</style>