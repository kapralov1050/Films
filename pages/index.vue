<template>
  <div>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: 'response-tmdb'
})

onMounted(() => { 
  navigateTo('/homepage')
})
</script>

