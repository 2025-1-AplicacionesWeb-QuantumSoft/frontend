<script setup>
import Button from 'primevue/button'
const props = defineProps(['sitter'])
</script>

<template>
  <div class="p-3 border-round shadow-1 max-w-15rem text-center  m-2"
       :style="{ backgroundColor: 'var(--color-blue-light)' }">
    <img src="@/assets/profile1.jpg" class="border-circle mb-3" width="80" />
    <h4>{{ sitter.name }}</h4>
    <p class="text-500 mb-2">{{ sitter.location }}</p>
    <p class="text-sm mb-3">{{ sitter.description }}</p>
    <div class="flex justify-content-center align-items-center mb-2">
      <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
      {{ sitter.rating }}
    </div>
    <Button label="See more" class="p-button-sm bg-black-alpha-50" />
  </div>
</template>

<style scoped>

</style>


