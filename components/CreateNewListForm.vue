<template>
  <el-form>
    <el-form-item label="Name" label-position="left">
      <el-input v-model="listStore.listForm.name"/>
    </el-form-item>
    <el-form-item label="Description" label-position="left">
      <el-input type="textarea" v-model="listStore.listForm.description" />
    </el-form-item>
  </el-form>
</template>


<script setup lang='ts'>
const listStore = useListStore()
</script>


<style scoped lang='scss'>
.el-form {
  padding: 2rem;
  border: 1px solid rgb(206, 206, 206);
  box-shadow: 0 2px 5px rgb(209, 209, 209);
  border-radius: 0.5rem;
}

.el-form-item {
  display: flex;
  flex-direction: column;
}
</style>