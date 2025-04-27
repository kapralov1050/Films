<template>
  <article class="list-progress">
    <el-steps :active="activeStep" finish-status="success">
      <el-step title="Step 1: List Details" />
      <el-step title="Step 2: Add Items" />
      <el-step title="Step 3: Choose Image" />
    </el-steps>
    <component :is="steps[currentStepForm]" />
    <el-button type="primary" size="large" class="nextstep-button" @click="next" :disabled="!listStore.listName"> Next step </el-button>
  </article>
</template>


<script setup>
import AddMoviesToList from '~/components/AddMoviesToList.vue'
import CreateList from '~/components/CreateNewList.vue'

definePageMeta({
    middleware: 'auth'
})

const listStore = useListStore()
const activeStep = ref(1)
const currentStepForm = ref('CreateList')
const steps = {
  CreateList,
  AddMoviesToList
}

const next = () => {
  if(activeStep.value < 3) {
    switch(activeStep.value) {
      case 1:
        listStore.createdListInfo.value = listStore.createList()
        currentStepForm.value = "AddMoviesToList"
        activeStep.value++
        break
      case 2:
        
    }
  }
}
</script>


<style scoped lang="scss">
.list-progress {
  width: 70%;
  align-self: center;
}

.nextstep-button {
  margin-top: 12px;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>