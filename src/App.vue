<script setup>
import Sidebar from "@/public/Sidebar.vue";
import ReviewList from "@/review-system/components/reviewList.vue";
import { ref } from "vue";

const reviews = ref([
  { id: 1, author: "Ana", content: "Muy bueno", rating: 5, date: "2024-06-01" },
  { id: 2, author: "Luis", content: "Regular", rating: 3, date: "2024-06-02" }
]);
</script>

<template>
  <main class="container">
    <Sidebar />
    <ReviewList :reviews="reviews" />
  </main>
</template>

<style scoped>
.container {
  background-color: var(--color-cream);
}
</style>