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
.el-header {
  padding: 0;
  height: 4rem;
}

.el-main {
  padding: 2rem;
  width: 100%;
  min-height: auto;
  @include flex(column, center, flex-start, 0);
}
</style>

