<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>


<script setup>

</script>


<style scoped lang="scss">
.el-main, .el-header, .el-container {
  padding: 0;
  margin: 0;
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

