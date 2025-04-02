<template>
<div class="watchlist">
    <el-button link class="watchlist-link" @click="$emit('open-watchlist')">
        <el-icon :size="30" color="white" class="watchlist-icon">
            <CollectionTag />
        </el-icon>
        WatchList
    </el-button>
</div>
</template>



<script setup>
import { CollectionTag } from '@element-plus/icons-vue';

</script>




<style lang="scss" scoped>

.watchlist {
    @include flex(row, center, center, 0);

    &-icon:hover {

    }

    &-link {
      font-size: large;
    }
  }

  .watchlist:hover .watchlist-icon {
    color: $star-color;
  }
</style>