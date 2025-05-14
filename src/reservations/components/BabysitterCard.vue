<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['babysitter'])

const goToDetail = () => {
  router.push(`/babysitter/${props.babysitter.id}`)
}
</script>

<template>
  <div class="p-3 border-round shadow-1 max-w-15rem text-center  m-2"
       :style="{ backgroundColor: 'var(--color-blue-light)' }">
    <img src="@/assets/profile1.jpg" class="border-circle mb-3" width="80" />
    <h4>{{ babysitter.name }}</h4>
    <p class="text-500 mb-2">{{ babysitter.location }}</p>
    <p class="text-sm mb-3">{{ babysitter.description }}</p>
    <div class="flex justify-content-center align-items-center mb-2">
      <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
      {{ babysitter.rating }}
    </div>
    <pv-button @click="goToDetail" label="See more" class="p-button-sm bg-black-alpha-50" />
  </div>
</template>

<style scoped>

</style>