<template>
  <article class="list-progress">
    <el-steps :active="activeStep" finish-status="success">
      <el-step title="Step 1: List Details" />
      <el-step title="Step 2: Add Items" />
      <el-step title="Step 3: Choose Image" />
    </el-steps>
    <el-form>
        <el-form-item label="Name" label-position="left">
            <el-input v-model="listStore.listName"/>
        </el-form-item>
        <el-form-item label="Description" label-position="left">
            <el-input type="textarea" v-model="listStore.listDescription" />
        </el-form-item>
    </el-form>
    <el-button type="alert" size="large" class="nextstep-button" @click="next" :disabled="!listStore.listName"> Next step </el-button>
  </article>
</template>


<script setup>
definePageMeta({
    middleware: 'auth'
})

const listStore = useListStore()
const activeStep = ref(0)


const next = () => {
  if(activeStep.value < 3) {
    switch(activeStep.value) {
      
    }
  }
}

</script>


<style scoped lang="scss">
.list-progress {
  width: 70%;
  align-self: center;
}

.el-form {
  padding: 2rem;
  border: 1px solid rgb(206, 206, 206);
  box-shadow: 0 2px 5px rgb(209, 209, 209);
  border-radius: 0.5rem;
}

.el-form-item {
  @include flex(column, )
}

.nextstep-button {
  margin-top: 12px;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>