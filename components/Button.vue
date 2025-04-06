<template>
  <div>
    <el-button 
      class="rate-button" 
      type="info" 
      text 
      :icon="Star" 
      round
    >
    <slot></slot>
    </el-button>
  </div>
</template>

<script setup>
import { Star} from '@element-plus/icons-vue';
</script>


<style scoped>
.rate-button {
    font-size: 1rem;
    color: rgb(0, 98, 211);
    }
</style>