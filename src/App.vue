<script setup>
import Sidebar from "@/public/Sidebar.vue";
</script>

<template>
  <main class="container">
    <Sidebar />
    <router-view />
  </main>
</template>

<style scoped>
.container {
  background-color: var(--color-cream);

}
</style>