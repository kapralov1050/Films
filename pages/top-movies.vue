<template>
  <div>
    <ul>
        <li v-for="item in data" :key="item.id">
            {{ item.title }}
        </li>
    </ul>
  </div>
</template>



<script setup>
const data = ref([]);

onMounted( async () => {
 try{
    const response = await instance.get('top250-movies')
    data.value = response.data
 } catch (error) {
    console.log(error)
 }
})

</script>




<style scoped>

</style>