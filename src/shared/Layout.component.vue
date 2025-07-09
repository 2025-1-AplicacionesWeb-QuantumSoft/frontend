<script setup>
import Sidebar from '@/public/Sidebar.vue'
</script>

<template>

    <div class="flex">
      <Sidebar />
      <main class="flex-1 px-4">
        <router-view />
      </main>
    </div>
</template>

<style scoped>

</style>