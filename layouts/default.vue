<template>
  <el-container>
    <Header />
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>


<script setup>

</script>


<style scoped lang="scss">
.el-main, .el-container {
  padding: 0;
  margin: 0;
}

.el-container {
  display: flex;
  flex-direction: column;
}

.el-header {
  height: 4rem;
}

.el-main {
  width: 100%;
  min-height: auto;
  @include flex(column, center, flex-start, 0);
}
</style>

