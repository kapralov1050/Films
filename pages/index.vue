<template>
  <div>
  </div>
</template>


<script setup>
definePageMeta({
  middleware: 'auth-callback'
})

onMounted(() => { 
  navigateTo('/popular')
})
</script>

