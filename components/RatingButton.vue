<template>
<section class="rating-group">
    <div class="rating-block">
        <span class="user-rate__title">IMDb RATING</span>
        <div class="rating-stat">
            <el-icon :size="50" class="rating-stat__star-item">
                <StarFilled />
            </el-icon>
            <div class="rating-stat__info">
                <span>
                    <span class="rating-stat__rating">{{ rating }}</span>
                    <span>/10</span>
                </span>
                <span class="rating-stat__votes">{{ votes }}</span>
            </div>
        </div>
    </div>
    <div class="user-rate">
        <span class="user-rate__title">YOUR RATING</span>
        <div v-if="rated == 0" >
            <el-button class="user-rate__button" type="info" text :icon="Star" round>
                Rate
            </el-button>
        </div>
    </div>
</section>
</template>



<script setup>
import { StarFilled, Star } from '@element-plus/icons-vue';

const rated = ref(0)
const props = defineProps({rating: Number, votes: Number})
</script>




<style scoped lang="scss">
@mixin flex($direction: row, $justify: flex-start, $align: stretch, $gap: 0) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  gap: $gap;
}

.rating-group{
    @include flex(row, space-between, flex-start, 2rem)
}

.rating-block{
    @include flex(column, center, flex-end, 0.5rem);
}

.rating-stat{
    @include flex(row, space-between, center, 1rem);
    font-size: 1.5rem;
    color:rgb(199, 199, 199);

    &__star-item{
        color: rgb(255, 217, 0);
    }

    &__info{
        @include flex(column, space-around, flex-start, 0.3rem);
    }
    
    &__rating{
        font-size: 2rem;
        color: white;
    }

    &__votes{
        font-size: 1rem;
        color: rgb(199, 199, 199);
    }
}

.user-rate{
    @include flex(column, center, center, 1rem);
    &__title{
        display: block;
    }
    
    &__button{
        font-size: 1.5rem;
        color:rgb(0, 98, 211)
    }

    &__button:hover{
        color:rgb(44, 44, 44);
    }

}
</style>