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
import AddMoviesToListForm from '~/components/AddMoviesToListForm.vue'
import ChooseImageForm from '~/components/ChooseImageForm.vue'
import CreateNewListForm from '~/components/CreateNewListForm.vue'

definePageMeta({
    middleware: 'auth'
})

const listStore = useListStore()
const activeStep = ref(1)
const currentStepForm = ref('CreateNewListForm')
const steps = {
  CreateNewListForm,
  AddMoviesToListForm,
  ChooseImageForm
}

const next = () => {
  if(activeStep.value < 3) {
    switch(activeStep.value) {
      case 1:
        listStore.createdListInfo.value = listStore.createList()
        currentStepForm.value = "AddMoviesToListForm"
        activeStep.value++
        break
      case 2:
        currentStepForm.value = "ChooseImageForm"
        activeStep.value++
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