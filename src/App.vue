

<script setup>
import BabysitterProfile from '@/registration-services/views/BabysitterProfile.vue'

</script>

<template>
  <main class="container">
  <router-view/>
    <babysitter-profile></babysitter-profile>
  </main>
</template>

<style scoped>
.container {
  background-color: var(--color-cream);
}
</style>
