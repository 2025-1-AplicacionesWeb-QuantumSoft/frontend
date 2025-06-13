<script>
import Sidebar from '@/public/Sidebar.vue';
import { ref, onMounted } from 'vue';
import ReviewItem from '@/review-system/components/reviewItem.vue';
import ReviewList from '@/review-system/components/reviewList.vue';
import { ReviewApiService } from '@/review-system/service/review.service.js';

export default {
  name: 'review-management',
  components: {
    Sidebar,
    ReviewItem,
    ReviewList
  },
  setup() {
    const reviews = new ReviewApiService([]);
    onMounted(async () => {
      try {
        reviews.value = await reviews.getReviews();
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    });

    return {
      reviews
    };
  }
};
</script>

<template>
  <div v-for="review in reviews" :key="review.id" class="review-card">
    <pv-card>
      <template #header>
        <h3>Detalle de Reseña</h3>
      </template>
      <template #content>
        <form class="form-grid">
          <label>ID</label>
          <input type="text" :value="review.id" disabled />

          <label>ID del padre</label>
          <input type="text" :value="review.parentId" disabled />

          <label>ID de niñera</label>
          <input type="text" :value="review.babysitterId" disabled />

          <label>Comentario</label>
          <textarea :value="review.comment" disabled></textarea>

          <label>Calificación</label>
          <input type="number" :value="review.rating" disabled />

          <label>Fecha</label>
          <input type="text" :value="review.date" disabled />
        </form>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.review-card {
  background-color: var(--color-primary);
  border-radius: 1rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1.5rem;
  margin: 1rem 0;
}
.form-grid label {
  color: #fff;
  font-weight: bold;
  margin-top: 1rem;
  display: block;
}
.form-grid input,
.form-grid textarea {
  width: 100%;
  border-radius: 0.5rem;
  border: none;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #222;
  color: #fff;
  resize: none;
}
.form-grid input[disabled],
.form-grid textarea[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
