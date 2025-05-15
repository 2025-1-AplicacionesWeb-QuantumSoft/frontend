<script setup>
import { computed } from "vue";
//import { Review } from "@/review-system/models/review.model";

const props = defineProps({
  review: { type: Object, required: true }
});

const reviewImage = computed(() => props.review.image_url || "https://via.placeholder.com/150");
</script>

<template>
  <pv-card class="review-card">
    <template #header>
      <h3 class="review-author">{{ review.author }}</h3>
      <img :src="reviewImage" :alt="`Imagen de ${review.author}`" v-if="review.image_url" class="review-img"/>
    </template>
    <template #content>
      <h6 class="review-rating">Calificación: {{ review.rating }}</h6>
      <p class="review-content">{{ review.content }}</p>
      <small class="review-date">Fecha: {{ review.date }}</small>
    </template>
    <template #footer>
      <span class="footer-link">ID de reseña: {{ review.id }}</span>
    </template>
  </pv-card>
</template>

<style scoped>
.review-card {
  background-color: var(--color-primary);
  border-radius: 1rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.review-author {
  color: #fff;
}
.review-img {
  width: 100%;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}
.review-rating,
.review-content,
.review-date {
  color: #fff;
}
.footer-link {
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #ffd700;
  font-weight: bold;
}
</style>