<template>
  <article class="progress">
    <el-steps :active="activeStep" finish-status="success">
      <el-step title="Step 1: List Details" />
      <el-step title="Step 2: Add Items" />
    </el-steps>
    <component :is="steps[currentStepForm]" />
    <el-button 
      type="primary" 
      size="large" 
      class="progress__nextstep-button" 
      @click="next" 
      :disabled="!listStore.listName"
    > 
      {{ activeStep == 1 ? 'Next Step' : 'Done' }} 
    </el-button>
  </article>
</template>


<script setup>
import AddMoviesToListForm from '~/components/AddMoviesToListForm.vue'
import CreateNewListForm from '~/components/CreateNewListForm.vue'

definePageMeta({
    middleware: 'auth'
})

const authStore = useAuthStore()
const listStore = useListStore()
const activeStep = ref(1)
const currentStepForm = ref('CreateNewListForm')
const steps = {
  CreateNewListForm,
  AddMoviesToListForm,
}

const next = () => {
  if(activeStep.value <= 2) {
    switch(activeStep.value) {
      case 1:
        listStore.createList()
        currentStepForm.value = "AddMoviesToListForm"
        activeStep.value++
        break
      case 2: 
        navigateTo(`/user/${authStore.userData.username}/lists`)
        break
    }
  }
}
</script>


<style scoped lang="scss">
.progress {
  width: 70%;
  align-self: center;

  &__nextstep-button {
    margin-top: 12px;
    font-weight: bold;
    font-size: 1.2rem;
  }
}
</style>